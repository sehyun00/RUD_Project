import mojito
from flask import Flask, request, jsonify
import pandas as pd

app = Flask(__name__)

app.route('/kospi', methods=['POST'])

# 앱키, 시크릿키, 모의투자 계좌
f = open(".\\koreainvestment.key")
lines = f.readlines()
key = lines[0].strip()
secret = lines[1].strip()
acc_no = lines[2].strip()
f.close()


# 국장 시세 구하는 메소드
@app.route('/getkospi', methods=['GET'])
def get_kospi():
    broker = mojito.KoreaInvestment(
        api_key=key,
        api_secret=secret,
        acc_no=acc_no,
    )

    # 특정 종목 코드를 이용해 시세 확인
    resp = broker.fetch_price(request.args.get('name'))

    return jsonify(resp['output']['stck_prpr']), 200


# 국장 일봉 구하는 메소드
@app.route('/getdailykospi', methods=['GET'])
def get_daily_kospi():
    broker = mojito.KoreaInvestment(
        api_key=key,
        api_secret=secret,
        acc_no=acc_no
    )
    resp = broker.fetch_ohlcv(
        symbol=request.args.get('name'),
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


# 나스닥 시세 구하는 메소드
@app.route('/getnasdaq', methods=['GET'])
def get_nasdaq():
    broker = mojito.KoreaInvestment(
        api_key=key,
        api_secret=secret,
        acc_no=acc_no,
        exchange='아멕스'
    )
    resp = broker.fetch_price(request.args.get('name'))

    return jsonify(resp['output']['last']), 200


# 나스닥 일봉 구하는 메소드
@app.route('/getdailynasdaq', methods=['GET'])
def get_daily_nasdaq():
    broker = mojito.KoreaInvestment(
        api_key=key,
        api_secret=secret,
        acc_no=acc_no,
        exchange='나스닥'
    )

    return 0


if __name__ == "__main__":
    app.run(debug=True, host='localhost', port=5001)
