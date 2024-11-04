import pandas as pd
import random

# 기본 데이터 설정
user_ids = ['sehyun', 'jonghyun', 'minji', 'kyungsoo', 'soojin', 'jinho', 
            'yuna', 'seungri', 'jisoo', 'sumin', 'sunghoon', 'jihoon', 
            'nari', 'hwan', 'minseok']
stock_names = ['cony', 'cure', 'schd', 'magx', 'tech', 'health', 
               'energy', 'finance', 'consumer', 'utility', 'realestate', 
               'transport', 'auto', 'biotech', 'aerospace', 'retail', 
               'pharma', 'media', 'telecom', 'food', 'chemicals', 
               'metals', 'construction', 'travel', 'software', 'ecommerce', 
               'semiconductors', 'healthtech', 'cloud']

# 더미 데이터 생성
data = []
for _ in range(1000):
    user_id = random.choice(user_ids)
    stock_name = random.choice(stock_names)
    minus_probability = round(random.uniform(0.1, 0.7), 2)
    rebalance_ratio = round(random.uniform(0, 1), 2)  # 0.1 ~ 0.7 사이의 랜덤한 값
    return_asset = round(random.uniform(-0.5, 0.5), 2)  # 0.04 ~ 0.15 사이의 랜덤한 값
    
    data.append([user_id, stock_name, minus_probability, rebalance_ratio, return_asset])

# DataFrame으로 변환
df = pd.DataFrame(data, columns=['유저ID', '주식명', '연간 마이너스 확률', '리밸런싱 비율', '수익률/총자산'])

# CSV 파일로 저장
df.to_csv('data.csv', index=False, encoding='utf-8-sig')

print("더미 데이터가 'data.csv' 파일로 저장되었습니다.")
