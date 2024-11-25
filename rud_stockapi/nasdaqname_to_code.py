import os
import pandas as pd
import urllib.request
import ssl
import zipfile
from flask import Flask, jsonify
import csv
from googletrans import Translator

app = Flask(__name__)

base_dir = os.getcwd()


# 해외 종목 데이터 다운로드 및 처리 함수
def get_overseas_master_dataframe(base_dir, val):
    ssl._create_default_https_context = ssl._create_unverified_context
    urllib.request.urlretrieve(f"https://new.real.download.dws.co.kr/common/master/{val}mst.cod.zip",
                               base_dir + f"\\{val}mst.cod.zip")
    os.chdir(base_dir)

    overseas_zip = zipfile.ZipFile(f'{val}mst.cod.zip')
    overseas_zip.extractall()
    overseas_zip.close()

    file_name = base_dir + f"\\{val}mst.cod"

    # 파일을 읽어서 열 수 확인
    try:
        df = pd.read_table(
            base_dir + f"\\{val}mst.cod", sep='\t', encoding='cp949')
    except Exception as e:
        return None, f"Error reading file {val}mst.cod: {str(e)}"

    # 실제 데이터프레임의 열 수를 확인하여 처리
    actual_columns_count = df.shape[1]
    print(f"{val}mst.cod file has {actual_columns_count} columns")

    # 24개의 열을 기대하고 있지만 실제 열 수가 다를 수 있으므로 열 이름을 동적으로 설정
    expected_columns = ['National code', 'Exchange id', 'Exchange code', 'Exchange name', 'Symbol', 'realtime symbol',
                        'Korea name', 'English name', 'Security type(1:Index,2:Stock,3:ETP(ETF),4:Warrant)', 'currency',
                        'float position', 'data type', 'base price', 'Bid order size', 'Ask order size',
                        'market start time(HHMM)', 'market end time(HHMM)', 'DR 여부(Y/N)', 'DR 국가코드', '업종분류코드',
                        '지수구성종목 존재 여부(0:구성종목없음,1:구성종목있음)', 'Tick size Type',
                        '구분코드(001:ETF,002:ETN,003:ETC,004:Others,005:VIX Underlying ETF,006:VIX Underlying ETN)']

    # 열 수가 다를 경우 열 이름을 실제 데이터에 맞게 조정
    if actual_columns_count == len(expected_columns):
        df.columns = expected_columns
    else:
        # 만약 열 수가 다르면 동적으로 열 이름을 할당
        df.columns = [f"Column_{i + 1}" for i in range(actual_columns_count)]
    return df, None


# 파일 확장자 변경, CSV 파일 처리 및 삭제 작업
def process_files():
    # 확장자 변경: .cod 파일을 .csv로 변경
    b = ['AMSMST.COD', 'NASMST.COD', 'NYSMST.COD']
    for i in b:
        if os.path.exists(i):
            new_file = os.path.splitext(i)[0] + '.csv'
            if os.path.exists(new_file):
                os.remove(new_file)
            os.rename(i, new_file)
            print(f"파일의 확장자가 {i}에서 '{new_file}'로 변경되었습니다.")
        else:
            print(f"'{i}' 파일이 존재하지 않습니다.")

    # CSV 파일 처리
    c = ['AMSMST.csv', 'NASMST.csv', 'NYSMST.csv']
    for i in c:
        try:
            aa = pd.read_csv(f'{i}', encoding='euc-kr',
                             header=None, sep='\t')  # 탭 구분자

            # 삭제할 열 이름 리스트
            columns_to_delete = [0, 1, 2, 3, 5, 7, 8, 9, 10, 11,
                                 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]

            # 열 삭제
            aa = aa.drop(columns=columns_to_delete, errors='ignore')

            # 변경된 데이터프레임을 새로운 CSV 파일로 저장
            aa.to_csv(f'{i}', index=False, encoding='EUC-KR', header=False)
            print(f"파일 {i}의 처리 완료!")
        except Exception as e:
            print(f"파일 {i} 처리 중 오류 발생: {e}")

    # 다운로드한 .zip 파일 삭제
    d = ['amsmst.cod.zip', 'nasmst.cod.zip', 'nysmst.cod.zip']
    for i in d:
        if os.path.exists(i):
            os.remove(i)
            print(f"파일 '{i}' 삭제되었습니다.")
        else:
            print(f"파일 '{i}'이 존재하지 않습니다.")


# 웹 API에서 다운로드 및 처리 요청 처리 (cmd=2만 실행)
@app.route('/download_data', methods=['GET'])
def download_data():
    # cmd=2만 실행하도록 강제
    a = ['nas', 'nys', 'ams']
    for i in a:
        df, error = get_overseas_master_dataframe(base_dir, i)
        if error:
            return jsonify({"error": error}), 500

    # 파일 확장자 변경, CSV 파일 처리 및 삭제 작업 수행
    process_files()

    return jsonify({"message": "Data downloaded and processed successfully!", "files": a})


# Google Translate API를 사용한 번역 함수
def translate_text(text, src_lang='ko', dest_lang='en'):
    translator = Translator()
    translated = translator.translate(text, src=src_lang, dest=dest_lang)
    return translated.text


# CSV 파일을 처리하고 저장하는 함수
def process_and_save_translated_csv(input_file, output_file):
    if not os.path.exists(input_file):
        return {'error': f'파일을 찾을 수 없습니다: {input_file}'}, 400

    # 출력 디렉토리가 없다면 생성
    output_dir = os.path.dirname(output_file)
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    # CSV 파일 열기
    translated_rows = []
    with open(input_file, 'r', encoding='EUC-KR') as infile:
        reader = csv.reader(infile)
        for row in reader:
            if len(row) >= 2:  # 두 번째 열이 있는 경우
                korean_text = row[1]  # 두 번째 열 텍스트 가져오기
                # 첫 번째 번역: 한글 -> 영어
                english_text = translate_text(
                    korean_text, src_lang='ko', dest_lang='en')
                # 두 번째 번역: 영어 -> 한글
                translated_korean_text = translate_text(
                    english_text, src_lang='en', dest_lang='ko')
                # 번역된 텍스트를 두 번째 열에 반영
                row[1] = translated_korean_text
            translated_rows.append(row)

    # 번역된 내용 저장
    with open(output_file, 'w', encoding='EUC-KR', newline='') as outfile:
        writer = csv.writer(outfile)
        writer.writerows(translated_rows)

    return {'message': f'파일이 성공적으로 저장되었습니다: {output_file}'}, 200


# API 엔드포인트
# 이?건 모?죠???
@app.route('/translate_csv', methods=['POST'])
def translate_csv():
    # 업로드할 파일들 (예시: 파일명 리스트)
    csv_files = ['AMSMST.csv', 'NASMST.csv', 'NYSMST.csv']

    for csv_file in csv_files:
        input_file_path = f'./{csv_file}'  # 현재 폴더에 있는 파일
        # 번역된 파일을 저장할 경로
        output_file_path = f'./translated_files/translated_{csv_file}'

        # 번역 및 저장
        result, status_code = process_and_save_translated_csv(
            input_file_path, output_file_path)
        if status_code != 200:
            return jsonify(result), status_code

    return jsonify({'message': '모든 파일이 성공적으로 번역되었습니다.'}), 200


# 서버 실행
if __name__ == "__main__":
    app.run(debug=True, host='localhost', port=5003)
