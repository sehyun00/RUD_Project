from flask import Flask, request, jsonify
import cv2
import os
from pororo import Pororo
from flask_cors import CORS
import warnings
import time

os.environ["KMP_DUPLICATE_LIB_OK"] = "TRUE"
warnings.filterwarnings('ignore')

app = Flask(__name__)
CORS(app)  # CORS 설정 추가

# 이미지 저장 디렉토리 설정
IMAGE_DIR = 'images'
os.makedirs(IMAGE_DIR, exist_ok=True)


class PororoOcr:
    def __init__(self, model='brainocr', lang='ko'):
        self.ocr = Pororo(task='ocr', lang=lang, model=model)

    def run_ocr(self, img):
        result = self.ocr(img, detail=True)
        return result['description'] if result['description'] else "No text detected."


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

    # 파일 삭제
    os.remove(file_path)
    return response, 200


if __name__ == "__main__":
    app.run(debug=True, host='localhost', port=5000)
