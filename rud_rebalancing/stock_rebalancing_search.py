import pandas as pd

# 주식명에 대한 리밸런싱 비율을 읽고 출력
def search_rebalance_ratios(stock_names):
    rebalance_data = pd.read_csv('rebalance_data.csv')
    
    results = {}
    for stock_name in stock_names:
        stock_name = stock_name.strip()  # 공백 제거
        if stock_name in rebalance_data['주식명'].values:
            ratio = rebalance_data[rebalance_data['주식명'] == stock_name]['리밸런싱비율'].values[0]
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

# 메인 함수
def main():
    user_input = input("리밸런싱 비율을 알고 싶은 주식명을 입력하세요 (쉼표로 구분): ")
    user_stock_names = user_input.split(',')

    # 리밸런싱 비율 검색
    ratios = search_rebalance_ratios(user_stock_names)

    # 비율을 백분율로 변환
    percentage_ratios = convert_to_percentage(ratios)

    # 결과 출력
    print("")
    for stock_name, percentage in percentage_ratios.items():
        if percentage > 0:
            print(f"주식명: {stock_name.ljust(15)} 리밸런싱 비율: {percentage:.2f}%")
        else:
            print(f"입력한 주식명 '{stock_name}'은 데이터에 없습니다.")

# 실행
if __name__ == "__main__":
    main()
