'''
ver.4
<변경사항>
- 모델 평가 및 예측 방식 개선: 여러 모델의 예측값 중 오차가 가장 큰 예측값을 NaN으로 설정한 후, NaN이 아닌 예측값의 평균을 계산하여 최종 예측값으로 사용.
- 예측 오류 처리 기능 추가: 각 샘플에서 가장 큰 오차를 가진 모델의 예측값을 NaN으로 설정하여 예측의 신뢰성을 높임.
- 코드 가독성 및 주석 추가: 각 함수의 역할 및 변경 사항에 대한 주석을 추가하여 코드의 가독성을 높임.
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
    errors = np.zeros((X_val.shape[0], len(models)))

    for i, model in enumerate(models):
        pred = model.predict(X_val)
        predictions[:, i] = pred.ravel()
        errors[:, i] = np.abs(pred.ravel() - y_val)

    # 각 샘플에서 가장 큰 오차를 가진 모델의 인덱스를 찾음
    max_error_indices = np.argmax(errors, axis=1)  # 각 샘플에서 가장 큰 오차를 가진 모델의 인덱스

    # 가장 큰 오차를 가진 예측값을 NaN으로 설정
    for idx in range(predictions.shape[0]):
        model_index = max_error_indices[idx]
        if model_index < predictions.shape[1]:  # 인덱스가 범위 내에 있는지 확인
            predictions[idx, model_index] = np.nan

    # NaN이 아닌 예측값의 평균을 계산
    mean_predictions = np.nanmean(predictions, axis=1)

    return mean_predictions

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

        sorted_ratios = {stock: adjusted_ratios[list(target_ratios.keys()).index(stock)] for stock in target_stocks if stock in target_ratios}
        print_rebalance_ratios(sorted_ratios, total_investment)
    else:
        print("입력된 주식 중 데이터가 없습니다.")

# 실행
if __name__ == "__main__":
    file_path = 'data2.csv'  # 데이터 파일 경로
    target_stocks = ['energy', 'food', 'cloud']  # 찾고자 하는 주식명 리스트
    main(file_path, target_stocks)
