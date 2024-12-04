from flask import Flask, request, jsonify
import pandas as pd
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# 리밸런싱 데이터 로드
rebalance_data = pd.read_csv('rebalance_data.csv')

# 주식명에 대한 리밸런싱 비율을 검색
def search_rebalance_ratios(stock_names):
    results = {}
    for stock_name in stock_names:
        stock_name = stock_name.strip()  
        if stock_name in rebalance_data['주식명'].values:
            ratio = rebalance_data.loc[rebalance_data['주식명'] == stock_name, '리밸런싱비율'].values[0]
            results[stock_name] = ratio
        else:
            results[stock_name] = None  # 데이터에 없는 경우 None 저장

    return results

# 비율을 백분율로 변환
def convert_to_percentage(ratios):
    total = sum(r for r in ratios.values() if r is not None)
    if total > 0:
        return {stock: (ratio / total) * 100 for stock, ratio in ratios.items() if ratio is not None}
    return {stock: 0 for stock in ratios}

# 라우트 설정
@app.route('/', methods=['GET'])
def index():
    # 쿼리 파라미터에서 stock_names 값을 가져옴
    stock_names_input = request.args.get('stock_names', '')
    stock_names = stock_names_input.split(',')

    if stock_names_input:
        # 리밸런싱 비율 검색
        ratios = search_rebalance_ratios(stock_names)
        # print(ratios)

        # 비율을 백분율로 변환
        percentage_ratios = convert_to_percentage(ratios)
        # percentage_ratios = (ratios) * 100
        # print(percentage_ratios)
        # 결과 출력
        response = {}
        for stock_name, percentage in percentage_ratios.items():
            if percentage > 0:
                response[stock_name] = f"{percentage:.2f}"
            else:
                response[stock_name] = "데이터에 없음"

        # JSON 형식으로 결과 반환
        return jsonify(response)
    else:
        return jsonify({"message": "주식명을 'stock_names' 쿼리 파라미터에 제공해 주세요."})

if __name__ == "__main__":
    app.run(debug=True, host='localhost', port=5004)

#ex) http://localhost:5004/?stock_names=telecom,utility