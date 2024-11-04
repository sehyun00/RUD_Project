import pandas as pd
import numpy as np

# 주식명 리스트
stock_names = ['cony', 'cure', 'schd', 'magx', 'tech', 'health', 
               'energy', 'finance', 'consumer', 'utility', 'realestate', 
               'transport', 'auto', 'biotech', 'aerospace', 'retail', 
               'pharma', 'media', 'telecom', 'food', 'chemicals', 
               'metals', 'construction', 'travel', 'software', 'ecommerce', 
               'semiconductors', 'healthtech', 'cloud']

def generate_dummy_data(num_samples=2000):
    # 랜덤 시드 설정
    np.random.seed(42)
    
    # 더미 데이터 생성
    data = {
        '주식명': np.random.choice(stock_names, num_samples),
        '주가': np.random.uniform(100, 500, num_samples),
        '보유수량': np.random.randint(1, 100, num_samples),
        '연간하락률': np.random.uniform(0, 0.2, num_samples),
        '연간성장률': np.random.uniform(0, 0.3, num_samples),
        '총자산': np.random.uniform(10000, 1000000, num_samples)
    }
    
    df = pd.DataFrame(data)
    
    # CSV 파일로 저장
    df.to_csv('data2.csv', index=False)
    print("더미 데이터가 data2.csv 파일로 저장되었습니다.")

if __name__ == "__main__":
    generate_dummy_data()
