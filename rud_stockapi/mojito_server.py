import mojito
from flask import Flask, request, jsonify
import pandas as pd
import time
from flask_cors import CORS
from googletrans import Translator

app = Flask(__name__)
CORS(app)

app.route('/kospi', methods=['POST'])

# kos 주식 데이터 CSV 파일 로드
kos_stock_data = pd.read_csv('Stock_List/Kos_stock_list.csv')
# Nas 주식 데이터 CSV 파일 로드
nas_stock_data = pd.read_csv(
    'Stock_List/Nas_stock_list.csv', header=None, names=['symbol', 'name'])

# 주식명 -> 주식 코드 part


def get_kos_stock_code(stock_name):
    try:
        # 주어진 주식명으로 데이터프레임 검색
        result = kos_stock_data[kos_stock_data['한글종목명'] == stock_name]

        if not result.empty:
            # 일치하는 결과가 있으면 주식코드 반환
            return result['단축코드'].values[0]
        else:
            # 일치하는 결과가 없으면 None 반환
            return None

    except Exception as e:
        # 에러 메시지 출력
        print(f"에러 발생: {e}")
        return None


def get_kospicode(input_value):
    try:
        if not input_value:
            return {"error": "주식명 또는 주식코드를 제공해야 합니다."}

        # 입력값이 6자리 숫자인 경우 주식코드로 간주
        if input_value.isdigit() and len(input_value) == 6:
            return input_value

        # 주식명으로 코드 검색
        code = get_kos_stock_code(input_value)
        if code is not None:
            return code
        else:
            return {"error": "일치하는 주식명이 없습니다."}
    except Exception as e:
        print(f"에러 발생: {e}")
        return {"error": str(e)}


# 주식 이름을 코드로 변환하는 함수
def get_nas_stock_code(stock_name):
    stock_name = stock_name.strip().lower()
    matched_row = nas_stock_data[nas_stock_data['name'].str.lower(
    ).str.contains(stock_name)]

    if matched_row.empty:
        return None  # 찾지 못한 경우
    return matched_row.iloc[0]['symbol']  # 첫 번째 매칭된 주식 코드 반환


# Google Translate API를 사용한 번역 함수
def translate_text(text, src_lang='ko', dest_lang='en'):
    translator = Translator()
    translated = translator.translate(text, src=src_lang, dest=dest_lang)
    return translated.text


def translate_input(stock_input):
    # 첫 번째 번역: 한글 -> 영어
    temp = translate_text(stock_input, src_lang='ko', dest_lang='en')
    # 두 번째 번역: 영어 -> 한글
    translated_stock_input = translate_text(
        temp, src_lang='en', dest_lang='ko')
    return translated_stock_input


# 주식 시세 확인 part
# 앱키, 시크릿키, 모의투자 계좌
f = open(".\\koreainvestment.key")
lines = f.readlines()
key = lines[0].strip()
secret = lines[1].strip()
acc_no = lines[2].strip()
f.close()


# 국장 시세 구하는 메소드
@ app.route('/getkos', methods=['GET'])
def get_kospi():
    broker = mojito.KoreaInvestment(
        api_key=key,
        api_secret=secret,
        acc_no=acc_no,
    )

    # 특정 종목 코드를 이용해 시세 확인
    # get_kospicode 메소드로 코드 확인

    # name이 정수라면 code는 그대로 정수가 아니라면 국장 코드 구하는 메소드로 구함
    code = get_kospicode(request.args.get('name')) if not isinstance(
        request.args.get('name'), int) else request.args.get('name')

    print(code)
    resp = broker.fetch_price(code)

    return jsonify(resp['output']['stck_prpr']), 200


# 국장 일봉 구하는 메소드
@ app.route('/getdailykos', methods=['GET'])
def get_daily_kospi():
    broker = mojito.KoreaInvestment(
        api_key=key,
        api_secret=secret,
        acc_no=acc_no
    )
    resp = broker.fetch_ohlcv(
        symbol=get_kospicode(request.args.get('name')) if not isinstance(
            request.args.get('name'), int) else request.args.get('name'),
        # D = 일봉, W = 주봉, M = 월봉
        timeframe='D',
        adj_price=True
    )

    data = resp['output2']
    result = {}

    for entry in data:
        date = entry['stck_bsop_date']  # 날짜
        result[date] = {
            'open': entry['stck_oprc'],  # 시가
            'high': entry['stck_hgpr'],   # 고가
            'low': entry['stck_lwpr'],    # 저가
            'close': entry['stck_clpr']    # 종가
        }

    return jsonify(result), 200


# 국장 월봉 구하는 메소드 응애 종목들은 조회 안됨
@ app.route('/getmonthlykos', methods=['GET'])
def get_monthly_kospi():
    broker = mojito.KoreaInvestment(
        api_key=key,
        api_secret=secret,
        acc_no=acc_no
    )
    resp = broker.fetch_ohlcv(
        symbol=get_kospicode(request.args.get('name')) if not isinstance(
            request.args.get('name'), int) else request.args.get('name'),
        # D = 일봉, W = 주봉, M = 월봉
        timeframe='M',
        adj_price=True
    )

    data = resp['output2']
    result = {}

    for entry in data:
        date = entry['stck_bsop_date']  # 날짜
        result[date] = {
            'open': entry['stck_oprc'],  # 시가
            'high': entry['stck_hgpr'],   # 고가
            'low': entry['stck_lwpr'],    # 저가
            'close': entry['stck_clpr']    # 종가
        }

    return jsonify(result), 200


@ app.route('/getnas', methods=['GET'])
def get_nasdaq():
    stock_input = request.args.get('name')  # 주식 코드 또는 주식 이름을 입력받음

    # 입력값이 주식 코드인 경우 바로 조회 시도
    stock_code = stock_input

    exchanges = ['나스닥', '아멕스', '뉴욕']
    for exchange in exchanges:
        broker = mojito.KoreaInvestment(
            api_key=key,
            api_secret=secret,
            acc_no=acc_no,
            exchange=exchange
        )

        # 먼저 주식 코드로 조회 시도
        resp = broker.fetch_price(stock_code)

        if resp and resp.get('rt_cd') == "0":
            if 'output' in resp and 'last' in resp['output']:
                result = resp['output']['last']
                if result != "":
                    return jsonify(result), 200

        # 주식 코드로 조회가 실패했을 때 주식 이름으로 코드 변환 후 재시도
        # 주식 코드가 아니라면, 이름으로 코드를 변환하여 조회
        if not resp or resp.get('rt_cd') == "1":  # 주식 코드로 조회가 실패한 경우
            stock_code = get_nas_stock_code(
                translate_input(stock_input))  # 주식 이름을 코드로 변환
            if stock_code:
                resp = broker.fetch_price(stock_code)
                if resp and resp.get('rt_cd') == "0":
                    if 'output' in resp and 'last' in resp['output']:
                        result = resp['output']['last']
                        if result != "":
                            return jsonify(result), 200

        # 호출을 다라락 하면 한투 서버가 막음
        time.sleep(0.4)

    # 모든 거래소에서 가격 정보를 찾지 못한 경우
    return jsonify({"error": "가격 정보를 찾을 수 없습니다."}), 404


# 나스닥 일봉 구하는 메소드
@ app.route('/getdailynas', methods=['GET'])
def get_daily_nasdaq():
    stock_input = request.args.get('name')  # 주식 코드 또는 주식 이름을 입력받음
    exchanges = ['나스닥', '아멕스', '뉴욕']
    result = {}

    # 주식 코드로 바로 조회 시도
    stock_code = stock_input

    for exchange in exchanges:
        broker = mojito.KoreaInvestment(
            api_key=key,
            api_secret=secret,
            acc_no=acc_no,
            exchange=exchange
        )

        # 주식 코드로 조회 시도
        resp = broker.fetch_ohlcv(
            symbol=stock_code,
            timeframe='D',
            adj_price=True
        )

        # 조회가 실패했으면, 주식 이름을 코드로 변환하여 재시도
        if not resp or resp.get('rt_cd') != "0":  # 주식 코드로 조회가 실패한 경우
            stock_code = get_nas_stock_code(
                translate_input(stock_input))  # 주식 이름을 코드로 변환
            if stock_code:
                resp = broker.fetch_ohlcv(
                    symbol=stock_code,
                    timeframe='D',
                    adj_price=True
                )
            else:
                print(f"Failed to find stock code for {stock_input}")

        if resp and resp.get('rt_cd') == "0":
            data = resp.get('output2', [])
            if data:  # output2가 비어있지 않은 경우
                for entry in data:
                    date = entry['xymd']  # 날짜
                    result[date] = {
                        'open': entry['open'],  # 시작가
                        'high': entry['high'],  # 고가
                        'low': entry['low'],  # 저가
                        'close': entry['clos']  # 종가
                    }
                break  # 데이터를 찾으면 루프 종료
            else:
                print(f"No data found for {exchange} on {stock_code}")
        else:
            print(f"Error in response for {exchange}: {resp.get('msg1')}")

        # 호출을 다라락 하면 한투 서버가 막음 많이 터지면 시간 늘리기
        time.sleep(0.5)

    if not result:
        return jsonify({"error": "가격 정보를 찾을 수 없습니다."}), 404

    return jsonify(result), 200


# 나스닥 월봉 구하는 메소드
@ app.route('/getmonthlynas', methods=['GET'])
def get_monthly_nasdaq():
    stock_input = request.args.get('name')  # 주식 코드 또는 주식 이름을 입력받음
    exchanges = ['나스닥', '아멕스', '뉴욕']
    result = {}

    # 주식 코드로 바로 조회 시도
    stock_code = stock_input

    for exchange in exchanges:
        broker = mojito.KoreaInvestment(
            api_key=key,
            api_secret=secret,
            acc_no=acc_no,
            exchange=exchange
        )

        # 주식 코드로 조회 시도
        resp = broker.fetch_ohlcv(
            symbol=stock_code,
            timeframe='M',
            adj_price=True
        )

        # 조회가 실패했으면, 주식 이름을 코드로 변환하여 재시도
        if not resp or resp.get('rt_cd') != "0":  # 주식 코드로 조회가 실패한 경우
            stock_code = get_nas_stock_code(
                translate_input(stock_input))  # 주식 이름을 코드로 변환
            if stock_code:
                resp = broker.fetch_ohlcv(
                    symbol=stock_code,
                    timeframe='M',
                    adj_price=True
                )
            else:
                print(f"Failed to find stock code for {stock_input}")

        if resp and resp.get('rt_cd') == "0":
            data = resp.get('output2', [])
            if data:  # output2가 비어있지 않은 경우
                for entry in data:
                    date = entry['xymd']  # 날짜
                    result[date] = {
                        'open': entry['open'],  # 시작가
                        'high': entry['high'],  # 고가
                        'low': entry['low'],  # 저가
                        'close': entry['clos']  # 종가
                    }
                break  # 데이터를 찾으면 루프 종료
            else:
                print(f"No data found for {exchange} on {stock_code}")
        else:
            print(f"Error in response for {exchange}: {resp.get('msg1')}")

        # 호출을 다라락 하면 한투 서버가 막음 많이 터지면 시간 늘리기
        time.sleep(0.5)

    if not result:
        return jsonify({"error": "가격 정보를 찾을 수 없습니다."}), 404

    return jsonify(result), 200


if __name__ == "__main__":
    app.run(debug=True, host='localhost', port=5001)
