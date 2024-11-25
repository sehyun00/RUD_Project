import pandas as pd
from flask import Flask, request, jsonify

app = Flask(__name__)

# Excel 파일 읽기
df = pd.read_csv('stock_codes_combined.csv')


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


@app.route('/getcode', methods=['GET'])
def get_code():
    try:
        name = request.args.get('name')

        if not name:
            return jsonify({"error": "주식명을 제공해야 합니다."}), 400

        code = get_stock_code(name)

        if code is not None:
            return jsonify({"stockcode": code}), 200
        else:
            return jsonify({"error": "일치하는 주식명이 없습니다."}), 404

    except Exception as e:
        # 에러 메시지 출력
        print(f"에러 발생: {e}")
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True, host='localhost', port=5000)
