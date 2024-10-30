import os
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

os.environ['KMP_DUPLICATE_LIB_OK'] = 'True'
warnings.filterwarnings('ignore')

app = Flask(__name__)

# 이미지 저장 디렉토리 설정
IMAGE_DIR = 'images'
os.makedirs(IMAGE_DIR, exist_ok=True)

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
        return jsonify({'error': '파일이 없습니다'}), 400

    file = request.files['file']
    print("Received file:", file.filename)  # 추가된 로그

    if file.filename == '':
        return jsonify({'error': '파일이 선택되지 않았습니다'}), 400

    # 파일 경로 설정
    file_path = os.path.join(IMAGE_DIR, file.filename)
    print(f"Saving file to: {file_path}")  # 추가된 로그

    # 이미지 파일 저장
    file.save(file_path)

    # 이미지 읽기
    img = cv2.imread(file_path)

    # time.sleep(10)
    if img is None:
        os.remove(file_path)
        return jsonify({'error': '이미지 디코딩 실패'}), 400

    # OCR 실행
    ocr_model = PororoOcr()
    ocr_text = ocr_model.run_ocr(img)

    # 응답 보내기
    response = jsonify({'text': ocr_text})
    response.headers.add('Access-Control-Allow-Origin', '*')  # CORS 설정

    #파일 삭제
    os.remove(file_path)
    return response, 200


if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5000)
