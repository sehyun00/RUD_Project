from datetime import datetime, timedelta
import mojito
from flask import Flask, request, jsonify
import time

app = Flask(__name__)

# 앱키, 시크릿키, 모의투자 계좌
f = open(".\\koreainvestment.key")
lines = f.readlines()
key = lines[0].strip()
secret = lines[1].strip()
acc_no = lines[2].strip()
f.close()

# 상승 및 하락 확률 계산 함수
def calculate_decline_and_increase_probability(data, start_date, end_date):
    months = list(data.keys())
    decline_count = 0
    increase_count = 0
    previous_close = None

    start_date = datetime.strptime(start_date, '%Y%m%d')
    end_date = datetime.strptime(end_date, '%Y%m%d')

    total_months = (end_date.year - start_date.year) * 12 + (end_date.month - start_date.month) + 1

    # 데이터를 오름차순으로 정렬하여, 이전 가격을 올바르게 비교하도록 함
    months.sort()

    for month in months:
        current_date = datetime.strptime(month, '%Y%m%d')

        if start_date <= current_date <= end_date:
            current_close = float(data[month]['close'])  # 소수점을 포함할 수 있으므로 float로 처리

            if previous_close is not None:
                if current_close < previous_close:
                    decline_count += 1
                elif current_close > previous_close:
                    increase_count += 1

            previous_close = current_close

    annual_decline_probability = (decline_count / total_months) * 100 if total_months > 0 else 0
    annual_increase_probability = (increase_count / total_months) * 100 if total_months > 0 else 0
    return annual_decline_probability, annual_increase_probability

# 코스피 데이터 가져오는 함수
def get_kospi_data(symbol, start_date, end_date):
    broker = mojito.KoreaInvestment(
        api_key=key,
        api_secret=secret,
        acc_no=acc_no
    )

    # 코스피 데이터를 가져옵니다
    resp = broker.fetch_ohlcv(
        symbol=symbol,
        timeframe='M',  # 월별 데이터
        start_day=start_date,
        end_day=end_date,
        adj_price=True  # 조정된 가격
    )

    data = resp['output2']
    result = {}

    for entry in data:
        date = entry['stck_bsop_date']  # 날짜
        result[date] = {
            'close': entry['stck_clpr']  # 종가
        }

    return result

# 나스닥, 아멕스, 뉴욕 증시에 대한 데이터를 가져오는 함수
def get_nasdaq_data(symbol, start_date, end_date):
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
            symbol=symbol,
            timeframe='M',
            adj_price=True
        )

        if resp and resp.get('rt_cd') == "0":  # 응답 코드가 0이면 성공
            data = resp.get('output2', [])
            if data:  # output2가 비어있지 않은 경우
                # 전월 마지막 날부터 60개월의 데이터만 필터링
                filtered_data = [
                    entry for entry in data
                    if start_date <= entry.get('xymd', '') <= end_date
                ]

                for entry in filtered_data:
                    date = entry.get('xymd', '')  # 날짜
                    close_price = entry.get('clos', None)  # 종가
                    if date and close_price is not None:
                        result[date] = {
                            'close': close_price  # 종가
                        }
                break  # 데이터를 찾으면 루프 종료

        # 호출 간 시간 간격 조정 (0.5초)
        time.sleep(0.5)

    return result

# /getcalprobability 엔드포인트 추가
@app.route('/getcalprobability', methods=['GET'])
def get_cal_probability():
    # 쿼리 파라미터
    stock_type = request.args.get('type')  # kos 또는 nas
    symbol = request.args.get('name')  # 종목 코드

    if stock_type not in ['kos', 'nas']:
        return jsonify({"error": "Invalid stock type. Use 'kos' for Korea stocks or 'nas' for Nasdaq stocks."}), 400

    # 현재 날짜 기준으로 전월 마지막 날 계산
    today = datetime.now()
    first_day_of_current_month = today.replace(day=1)
    last_day_of_last_month = first_day_of_current_month - timedelta(days=1)

    # 60개월 전 날짜 계산
    start_date = (last_day_of_last_month - timedelta(days=60 * 30)).strftime('%Y%m%d')
    end_date = last_day_of_last_month.strftime('%Y%m%d')

    # 데이터 가져오기
    if stock_type == 'kos':  # 국내주식
        result = get_kospi_data(symbol, start_date, end_date)
    elif stock_type == 'nas':  # 해외주식
        result = get_nasdaq_data(symbol, start_date, end_date)

    # 결과가 없으면 오류 메시지
    if not result:
        return jsonify({"error": "가격 정보를 찾을 수 없습니다."}), 404

    # 상승/하락 확률 계산
    annual_decline_probability, annual_increase_probability = calculate_decline_and_increase_probability(result, start_date, end_date)

    # 연간 상승/하락 확률만 반환
    return jsonify({
        "annual_decline_probability": round(annual_decline_probability, 2),
        "annual_increase_probability": round(annual_increase_probability, 2)
    }), 200


if __name__ == "__main__":
    app.run(debug=True, host='localhost', port=5002)
