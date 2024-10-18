import os
os.environ['KMP_DUPLICATE_LIB_OK'] = 'True'

from flask import Flask, request, jsonify
import cv2
from abc import ABC, abstractmethod
from pororo import Pororo
from pororo.pororo import SUPPORTED_TASKS
from utils.image_util import plt_imshow, put_text
from utils.image_convert import convert_coord, crop
from utils.pre_processing import load_with_filter, roi_filter
from easyocr import Reader
import warnings
from typing import List
import numpy as np
warnings.filterwarnings('ignore')

app = Flask(__name__)


class BaseOcr(ABC):
    def __init__(self):
        self.img_path = None
        self.ocr_result = {}

    def get_ocr_result(self):
        return self.ocr_result

    def get_img_path(self):
        return self.img_path

    @abstractmethod
    def run_ocr(self, img, debug: bool = False):
        pass


class PororoOcr(BaseOcr):
    def __init__(self, model: str = "brainocr", lang: str = "ko", **kwargs):
        super().__init__()
        self._ocr = Pororo(task="ocr", lang=lang, model=model, **kwargs)

    def run_ocr(self, img, debug: bool = False):
        self.ocr_result = self._ocr(img, detail=True)
        if self.ocr_result['description']:
            return self.ocr_result["description"]
        return "No text detected."


class EasyOcr(BaseOcr):
    def __init__(self, lang: List[str] = ["ko", "en"], gpu=False, **kwargs):
        super().__init__()
        self._ocr = Reader(lang_list=lang, gpu=gpu, **kwargs).readtext

    def run_ocr(self, img, debug: bool = False):
        self.ocr_result = self._ocr(img, detail=1)
        if self.ocr_result:
            return list(map(lambda result: result[1], self.ocr_result))
        return "No text detected."


class EasyPororoOcr(BaseOcr):
    def __init__(self, lang: List[str] = ["ko", "en"], gpu=False, **kwargs):
        super().__init__()
        self._detector = Reader(lang_list=lang, gpu=gpu, **kwargs).detect
        self._ocr = Pororo(task="ocr", lang="ko", model="brainocr", **kwargs)
        self.detect_result = None

    def run_ocr(self, img, debug: bool = False, **kwargs):
        self.img = img
        self.detect_result = self._detector(self.img, slope_ths=0.3, height_ths=1)
        horizontal_list, free_list = self.detect_result
        rois = [convert_coord(point) for point in horizontal_list[0]] + free_list[0]

        self.ocr_result = [self.create_result(roi) for roi in rois if len(self.create_result(roi)[1]) > 0]
        if self.ocr_result:
            return list(map(lambda result: result[1], self.ocr_result))
        return "No text detected."

    def create_result(self, points):
        roi = crop(self.img, points)
        result = self._ocr(roi_filter(roi))
        text = " ".join(result)
        return [points, text]


@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['file']

    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    # 이미지 파일을 OpenCV 포맷으로 변환
    in_memory_file = np.frombuffer(file.read(), np.uint8)
    img = cv2.imdecode(in_memory_file, cv2.IMREAD_COLOR)

    # OCR 실행
    m_ocr = EasyPororoOcr()
    ocr_text = m_ocr.run_ocr(img)

    return jsonify({'text': ocr_text}), 200


if __name__ == "__main__":
    app.run(debug=True)
