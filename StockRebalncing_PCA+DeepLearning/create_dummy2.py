import pandas as pd
import numpy as np

# 주식명 리스트
stock_names = ['드래곤플라이', '디알텍', '삼보산업', '상보', '셀루메드', '소니드',
               '아이비젼웍스', '압타머사이언스', '인스코비', '한일단조', 'KIB플러그에너지',
               'SH에너지화학', '삼성전자', 'CONY', 'CURE', 'SCHD', 'AAPL', 'NVDA'
               ]

def generate_dummy_data(num_samples=20000):
    # 랜덤 시드 설정
    np.random.seed(42)
    
    # 더미 데이터 생성
    data = {
        '주식명': np.random.choice(stock_names, num_samples),
        '주가': np.random.uniform(100, 500, num_samples),
        '보유수량': np.random.randint(1, 100, num_samples),
        '연간하락확률': np.random.uniform(0, 0.5, num_samples),
        '연간성장률': np.random.uniform(0, 0.5, num_samples),
        '총자산': np.random.uniform(10000, 1000000, num_samples)
    }
    
    df = pd.DataFrame(data)
    
    # CSV 파일로 저장
    df.to_csv('data2.csv', index=False)
    print("더미 데이터가 data2.csv 파일로 저장되었습니다.")

def dummy_data(num_samples=2000):
    np.random.seed(42)

    data = {
        '주식명': np.random.choice(['원화', '달러'], num_samples),
        '주가': np.random.uniform(1000, 100000, num_samples),
        '보유수량': 1,
        '연간하락확률': 0,
        '연간성장률': 0.2,
        '총자산': np.random.uniform(10000, 1000000, num_samples)
    }

    # DataFrame 생성
    df = pd.DataFrame(data)

    # csv 파일에 추가
    df.to_csv('data2.csv', mode='a', header=False, index=False)
    print(f"{num_samples}개의 더미 데이터가 data2.csv 파일에 추가되었습니다.")


if __name__ == "__main__":
    generate_dummy_data()
    dummy_data()
