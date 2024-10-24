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
import os
import re

os.environ['KMP_DUPLICATE_LIB_OK'] = 'True'
warnings.filterwarnings('ignore')
app = Flask(__name__)

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

    def show_img(self):
        plt_imshow(img=self.img_path)

    def show_img_with_ocr(self, bounding, description, vertices, point):
        img = cv2.imread(self.img_path) if isinstance(self.img_path, str) \
            else self.img_path
        roi_img = img.copy()
        color = (0, 200, 0)

        x, y = point
        ocr_result = self.ocr_result if bounding is None \
            else self.ocr_result[bounding]
        for text_result in ocr_result:
            text = text_result[description]
            rect = text_result[vertices]

            topLeft, topRight, bottomRight, bottomLeft = [
                (round(point[x]), round(point[y])) for point in rect
            ]

            cv2.line(roi_img, topLeft, topRight, color, 2)
            cv2.line(roi_img, topRight, bottomRight, color, 2)
            cv2.line(roi_img, bottomRight, bottomLeft, color, 2)
            cv2.line(roi_img, bottomLeft, topLeft, color, 2)
            roi_img = put_text(roi_img, text, topLeft[0], topLeft[1] - 20, color=color)

        plt_imshow(["Original", "ROI"], [img, roi_img], figsize=(16, 10))

    @abstractmethod
    def run_ocr(self, img_path: str, debug: bool = False):
        pass


class PororoOcr(BaseOcr):
    def __init__(self, model: str = "brainocr", lang: str = "ko", **kwargs):
        super().__init__()
        self._ocr = Pororo(task="ocr", lang=lang, model=model, **kwargs)

    def run_ocr(self, img_path: str, debug: bool = False):
        self.img_path = img_path
        self.ocr_result = self._ocr(img_path, detail=True)

        if self.ocr_result['description']:
            ocr_text = self.ocr_result["description"]
        else:
            ocr_text = "No text detected."

        if debug:
            self.show_img_with_ocr("bounding_poly", "description", "vertices", ["x", "y"])

        return ocr_text

    @staticmethod
    def get_available_langs():
        return SUPPORTED_TASKS["ocr"].get_available_langs()

    @staticmethod
    def get_available_models():
        return SUPPORTED_TASKS["ocr"].get_available_models()


# https://www.jaided.ai/easyocr/documentation/
class EasyOcr(BaseOcr):
    def __init__(self, lang: List[str] = ["ko", "en"], gpu=True, **kwargs):
        super().__init__()
        self._ocr = Reader(lang_list=lang, gpu=gpu, **kwargs).readtext

    def run_ocr(self, img_path: str, debug: bool = False):
        self.img_path = img_path
        self.ocr_result = self._ocr(img_path, detail=1)

        if len(self.ocr_result) != 0:
            ocr_text = list(map(lambda result: result[1], self.ocr_result))
        else:
            ocr_text = "No text detected."

        if debug:
            self.show_img_with_ocr(None, 1, 0, [0, 1])

        return ocr_text


class EasyPororoOcr(BaseOcr):
    def __init__(self, lang: List[str] = ["ko", "en"], gpu=True, **kwargs):
        super().__init__()
        self._detector = Reader(lang_list=lang, gpu=gpu, **kwargs).detect
        self.detect_result = None

    def create_result(self, points):
        roi = crop(self.img, points)
        result = self._ocr(roi_filter(roi))
        text = " ".join(result)

        return [points, text]

    def run_ocr(self, img_path: str, debug: bool = False, **kwargs):
        self.img_path = img_path
        self.img = cv2.imread(img_path) if isinstance(img_path, str) \
            else self.img_path
        self._ocr = Pororo(task="ocr", lang="ko", model="brainocr", **kwargs)

        self.detect_result = self._detector(self.img, slope_ths=0.3, height_ths=1)
        if debug:
            print(self.detect_result)

        horizontal_list, free_list = self.detect_result

        rois = [convert_coord(point) for point in horizontal_list[0]] + free_list[0]

        self.ocr_result = list(filter(
            lambda result: len(result[1]) > 0,
            [self.create_result(roi) for roi in rois]
        ))

        if len(self.ocr_result) != 0:
            ocr_text = list(map(lambda result: result[1], self.ocr_result))
        else:
            ocr_text = "No text detected."

        if debug:
            self.show_img_with_ocr(None, 1, 0, [0, 1])

        return ocr_text

    # 반환 리스트에서 특정 단어 사이만 추출
    def extract_between_keywords(self, text, start_keyword, end_keyword):
        pattern = re.compile(rf'{start_keyword}(.*?){end_keyword}', re.DOTALL)
        matches = pattern.findall(text)
        return matches


# 특정 데이터 추출 함수
def extract_stock_data(data):
    domestic_stocks = []
    foreign_stocks = []

    # 첫 번째 "일간 수익금" 찾기
    first_index = data.index("일간 수익금") + 1
    # 두 번째 "일간 수익금" 찾기
    second_index = data.index("일간 수익금", first_index) + 1
    # "해외주식" 찾기
    end_index = data.index("해외주식")

    #국장 끝나는 시간의 경우 추가해야함

    # 국내 주식 데이터 추출 (첫 번째 "일간 수익금"부터 "해외주식"까지)
    for i in range(first_index, end_index):
        if data[i] not in ["종목명", "일간 수익률", "일간 수익금"] and data[i] != "의견":
            # 실수 + 주만 살림 ex)1234원, $1234
            if not re.match(r'^\$\d+(\.\d+)?', data[i]) and not re.search(r'\d+(\.\d+)?\s*[원$%]', data[i])and not re.match(r'^\d+(\.\d+)?$', data[i]):
                cleaned_stock_name = re.sub(r'(\d+(\.\d+)?)\s+주', r'\1주', data[i])
                domestic_stocks.append(cleaned_stock_name)

    # 해외 주식 데이터 추출 (두 번째 "일간 수익금" 이후부터 "개인정보 처리방침")
    start_index = second_index
    end_index = data.index("개인정보 처리방침")
    for i in range(start_index, end_index):
        if data[i] not in ["종목명", "일간 수익률", "일간 수익금"] and data[i] != "의견":
            # 실수 + 주만 살림 ex)1234원, $1234
            if not re.match(r'^\$\d+(\.\d+)?', data[i]) and not re.search(r'\d+(\.\d+)?\s*[원$%]', data[i])and not re.match(r'^S\d+', data[i]) and not re.match(r'^\d+(\.\d+)?$', data[i]):
                cleaned_stock_name = re.sub(r'(\d+(\.\d+)?)\s+주', r'\1주', data[i])
                foreign_stocks.append(cleaned_stock_name)

    return {"국장": domestic_stocks, "해외장": foreign_stocks}


# 플라스크 서버
@app.route('/upload', methods=['POST'])
def upload_file():
    # 파일 오류
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

        # 경로에서 이미지 불러와서 ocr 실행
        m_ocr = EasyPororoOcr()
        image = load_with_filter(image_path)
        ocr_texts = m_ocr.run_ocr(image, debug=True)

        # 텍스트 추출 실패
        if ocr_texts == "No text detected.":
            return jsonify({'error': 'No text detected from image'}), 400

        # 국장 해외장 리스트에 넣기
        response_data = extract_stock_data(ocr_texts)

        print('EasyPororoOCR:', ocr_texts)
        print('dome && fore:', response_data)
        return jsonify(response_data), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

    finally:
        # 이미지 삭제
        if os.path.exists(image_path):
            os.remove(image_path)


if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5000)
