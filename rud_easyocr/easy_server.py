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
import os
import re

os.environ['KMP_DUPLICATE_LIB_OK'] = 'True'
warnings.filterwarnings('ignore')
app = Flask(__name__)

# 이미지 저장 경로
IMAGE_FOLDER = 'images'
if not os.path.exists(IMAGE_FOLDER):
    os.makedirs(IMAGE_FOLDER)

# 이미지 저장 경로
IMAGE_FOLDER = 'images'
if not os.path.exists(IMAGE_FOLDER):
    os.makedirs(IMAGE_FOLDER)

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

    # 반환 리스트에서 특정 단어 사이만 추출
    def extract_between_keywords(self, text, start_keyword, end_keyword):
        pattern = re.compile(rf'{start_keyword}(.*?){end_keyword}', re.DOTALL)
        matches = pattern.findall(text)
        return matches


@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['file']

    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    # 파일 저장 경로 설정
    image_path = os.path.join(IMAGE_FOLDER, file.filename)
    try:
        # 이미지 파일을 /images 폴더에 저장
        file.save(image_path)

        # 이미지 파일을 OpenCV 포맷으로 변환
        img = cv2.imread(image_path)

        # OCR 실행
        m_ocr = EasyPororoOcr()
        ocr_texts = m_ocr.run_ocr(img)

        if ocr_texts == "No text detected.":
            return jsonify({'error': 'No text detected from image'}), 400

        # 전체 텍스트 결합
        full_text = " ".join(ocr_texts)

        # "일간 수익금"부터 "해외주식"까지의 값 추출
        domestic_section = m_ocr.extract_between_keywords(full_text, "일간 수익금", "해외주식")
        foreign_section_start = full_text.split("해외주식", 1)[-1]
        foreign_section = m_ocr.extract_between_keywords(foreign_section_start, "일간 수익금", "개인정보 처리방침")

        # 국내주식 데이터 가공
        domestic_data = re.split(r'\s+', domestic_section[0].strip()) if domestic_section else []
        # 해외주식 데이터 가공
        foreign_data = re.split(r'\s+', foreign_section[0].strip()) if foreign_section else []

        # 최종 응답 데이터 구성
        response_data = {
            '국내주식': domestic_data,
            '해외주식': foreign_data
        }

        return jsonify(response_data), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

    # finally:
    #     # 이미지 삭제
    #     if os.path.exists(image_path):
    #         os.remove(image_path)


if __name__ == "__main__":
    app.run(debug=True)
