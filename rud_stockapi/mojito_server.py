import mojito
from flask import Flask, request, jsonify
import pandas as pd
import time
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# 주식명 -> 주식 코드 csv 파일
df = pd.read_csv('stock_codes_combined.csv')

app.route('/kospi', methods=['POST'])


# 주식명 -> 주식 코드 part
def get_stock_code(stock_name):
    try:
        # 주어진 주식명으로 데이터프레임 검색
        result = df[df['한글종목명'] == stock_name]

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


def get_kospicode(name):
    try:
        if not name:
            return {"error": "주식명을 제공해야 합니다."}

        code = get_stock_code(name)

        if code is not None:
            return code
        else:
            return {"error": "일치하는 주식명이 없습니다."}

    except Exception as e:
        # 에러 메시지 출력
        print(f"에러 발생: {e}")
        return {"error": str(e)}


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
    code = get_kospicode(request.args.get('name'))
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
        symbol=get_stock_code(request.args.get('name')),
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
@app.route('/getmonthlykos', methods=['GET'])
def get_monthly_kospi():
    broker = mojito.KoreaInvestment(
        api_key=key,
        api_secret=secret,
        acc_no=acc_no
    )
    resp = broker.fetch_ohlcv(
        symbol=get_stock_code(request.args.get('name')),
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


# 나스닥 시세 구하는 메소드
@app.route('/getnas', methods=['GET'])
def get_nasdaq():
    exchanges = ['나스닥', '아멕스', '뉴욕']

    for exchange in exchanges:
        broker = mojito.KoreaInvestment(
            api_key=key,
            api_secret=secret,
            acc_no=acc_no,
            exchange=exchange
        )
        resp = broker.fetch_price(request.args.get('name'))

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
@app.route('/getdailynas', methods=['GET'])
def get_daily_nasdaq():
    exchanges = ['나스닥', '아멕스', '뉴욕']
    result = {}

    for exchange in exchanges:
        broker = mojito.KoreaInvestment(
            api_key=key,
            api_secret=secret,
            acc_no=acc_no,
            exchange=exchange
        )
        resp = broker.fetch_ohlcv(
            symbol=request.args.get('name'),
            timeframe='D',
            adj_price=True
        )

        if resp and resp.get('rt_cd') == "0":
            data = resp.get('output2', [])
            if data:  # output2가 비어있지 않은 경우
                for entry in data:
                    date = entry['xymd']  # 날짜
                    result[date] = {
                        'open': entry['open'],  # 시작가
                        'high': entry['high'],   # 고가
                        'low': entry['low'],    # 저가
                        'close': entry['clos']    # 종가
                    }
                break  # 데이터를 찾으면 루프 종료
            else:
                print(
                    f"No data found for {exchange} on {request.args.get('name')}")
        else:
            print(f"Error in response for {exchange}: {resp.get('msg1')}")
        # 호출을 다라락 하면 한투 서버가 막음 많이 터지면 시간 늘리기
        time.sleep(0.5)

    else:
        print(f"Error in response for {exchange}: {resp.get('msg1')}")

    if not result:
        return jsonify({"error": "가격 정보를 찾을 수 없습니다."}), 404

    return jsonify(result), 200


# 나스닥 월봉 구하는 메소드
@app.route('/getmonthlynas', methods=['GET'])
def get_monthly_nasdaq():
    exchanges = ['나스닥', '아멕스', '뉴욕']
    result = {}

    for exchange in exchanges:
        broker = mojito.KoreaInvestment(
            api_key=key,
            api_secret=secret,
            acc_no=acc_no,
            exchange=exchange
        )
        resp = broker.fetch_ohlcv(
            symbol=request.args.get('name'),
            timeframe='M',
            adj_price=True
        )

        if resp and resp.get('rt_cd') == "0":
            data = resp.get('output2', [])
            if data:  # output2가 비어있지 않은 경우
                for entry in data:
                    date = entry['xymd']  # 날짜
                    result[date] = {
                        'open': entry['open'],  # 시작가
                        'high': entry['high'],   # 고가
                        'low': entry['low'],    # 저가
                        'close': entry['clos']    # 종가
                    }
                break  # 데이터를 찾으면 루프 종료
            else:
                print(
                    f"No data found for {exchange} on {request.args.get('name')}")
        else:
            print(f"Error in response for {exchange}: {resp.get('msg1')}")
        # 호출을 다라락 하면 한투 서버가 막음 많이 터지면 시간 늘리기
        time.sleep(0.5)

    else:
        print(f"Error in response for {exchange}: {resp.get('msg1')}")

    if not result:
        return jsonify({"error": "가격 정보를 찾을 수 없습니다."}), 404

    return jsonify(result), 200


if __name__ == "__main__":
    app.run(debug=True, host='localhost', port=5001)
