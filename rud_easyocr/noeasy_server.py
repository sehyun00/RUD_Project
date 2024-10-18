from flask import Flask, request, jsonify
import cv2
from abc import ABC, abstractmethod
from pororo import Pororo
from pororo.pororo import SUPPORTED_TASKS
from utils.image_util import plt_imshow, put_text
from utils.image_convert import convert_coord, crop
from utils.pre_processing import load_with_filter, roi_filter
import warnings
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
        self.img_path = img
        self.ocr_result = self._ocr(img, detail=True)

        if self.ocr_result['description']:
            ocr_text = self.ocr_result["description"]
        else:
            ocr_text = "No text detected."

        return ocr_text


@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': '파일이 없습니다'}), 400

    file = request.files['file']

    if file.filename == '':
        return jsonify({'error': '파일이 선택되지 않았습니다'}), 400

    # 이미지 파일을 OpenCV 포맷으로 변환
    in_memory_file = np.frombuffer(file.read(), np.uint8)
    img = cv2.imdecode(in_memory_file, cv2.IMREAD_COLOR)

    # OCR 실행
    ocr_model = PororoOcr()
    ocr_text = ocr_model.run_ocr(img)

    return jsonify({'text': ocr_text}), 200


if __name__ == "__main__":
    app.run(debug=True)
