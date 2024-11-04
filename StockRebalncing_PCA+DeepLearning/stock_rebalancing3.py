'''
ver.3
<변경사항>
- 모델 평가 및 예측 방식 변경: 여러 모델의 예측 결과를 평균내어 최종 예측값을 도출하도록 수정.
- 리밸런싱 비율 조정 기능 추가: 총 투자 금액에 맞게 리밸런싱 비율을 조정하는 `adjust_ratios_to_sum_investment` 함수 추가.
- 결과 출력 방식 변경: 주식명을 입력 순서대로 정렬하여 출력하도록 수정.
- 입력된 주식명에 대한 데이터가 없을 경우 처리: 주식 데이터가 없을 경우 해당 메시지를 출력하도록 수정.
- 변수명 및 함수명 일부 변경: 가독성을 높이기 위해 변수명 및 함수명을 정리.
'''

import numpy as np
import pandas as pd
from sklearn.decomposition import PCA
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from keras.models import Sequential
from keras.layers import Dense

# 데이터 로드
def load_data(file_path):
    return pd.read_csv(file_path)

# 데이터 전처리
def preprocess_data(data):
    features = data[['주가', '보유수량', '연간하락률', '연간성장률', '총자산']]
    target = (data['주가'] * data['보유수량'] * data['연간성장률']) / data['총자산']
    
    scaler = StandardScaler()
    scaled_features = scaler.fit_transform(features)
    
    return scaled_features, target

# PCA 적용
def apply_pca(features, n_components=3):
    pca = PCA(n_components=n_components)
    return pca.fit_transform(features)

# 신경망 모델 생성
def create_model(input_dim):
    model = Sequential([
        Dense(64, input_dim=input_dim, activation='relu'),
        Dense(32, activation='relu'),
        Dense(1, activation='linear')
    ])
    model.compile(optimizer='adam', loss='mean_absolute_error', metrics=['mae'])
    return model

# 모델 학습
def train_model(model, X_train, y_train, X_val, y_val, epochs=50, batch_size=32):
    model.fit(X_train, y_train, validation_data=(X_val, y_val), epochs=epochs, batch_size=batch_size)

# 모델 평가 및 예측
def evaluate_and_predict(models, X_val, y_val):
    predictions = np.zeros((X_val.shape[0], len(models)))
    
    for i, model in enumerate(models):
        model.evaluate(X_val, y_val, verbose=0)
        predictions[:, i] = model.predict(X_val).ravel()

    return predictions.mean(axis=1)

# 리밸런싱 비율 계산
def calculate_rebalance_ratio(predictions, total_investment):
    return predictions / np.sum(predictions) * total_investment

# 리밸런싱 비율 조정
def adjust_ratios_to_sum_investment(ratios, total_investment):
    total = np.sum(ratios)
    return (ratios / total) * total_investment if total > 0 else ratios

# 결과 출력
def print_rebalance_ratios(target_ratios, total_investment):
    for stock, ratio in target_ratios.items():
        print(f"주식: {stock}, 리밸런싱 비율: {ratio:.2f} 원 ({(ratio / total_investment) * 100:.2f}%)")

# 메인 함수
def main(file_path, target_stocks):
    data = load_data(file_path)
    features, target = preprocess_data(data)

    pca_features = apply_pca(features)
    X_train, X_val, y_train, y_val, indices_train, indices_val = train_test_split(
        pca_features, target, data.index, test_size=0.2, random_state=42
    )

    models = [create_model(input_dim=X_train.shape[1]) for _ in range(10)]
    for model in models:
        train_model(model, X_train, y_train, X_val, y_val)

    predictions = evaluate_and_predict(models, X_val, y_val)
    print("예측 완료.")

    total_investment = 1_000_000  # 1,000,000원
    rebalance_ratios = calculate_rebalance_ratio(predictions, total_investment)

    stock_names = data['주식명'].values[indices_val]
    target_ratios = {name: ratio for name, ratio in zip(stock_names, rebalance_ratios) if name in target_stocks}

    if target_ratios:
        ratios = np.array(list(target_ratios.values()))
        adjusted_ratios = adjust_ratios_to_sum_investment(ratios, total_investment)
        
        # 주식명을 입력 순서대로 정렬하여 출력
        sorted_ratios = {stock: adjusted_ratios[list(target_ratios.keys()).index(stock)] for stock in target_stocks if stock in target_ratios}
        print_rebalance_ratios(sorted_ratios, total_investment)
    else:
        print("입력된 주식 중 데이터가 없습니다.")

# 실행
if __name__ == "__main__":
    file_path = 'data2.csv'  # 데이터 파일 경로
    target_stocks = ['energy', 'food', 'cloud']  # 찾고자 하는 주식명 리스트
    main(file_path, target_stocks)
