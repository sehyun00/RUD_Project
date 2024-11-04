import numpy as np
import pandas as pd
from sklearn.decomposition import PCA
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from keras.models import Sequential
from keras.layers import Dense

# 데이터 로드 (예시로 CSV 파일을 사용)
def load_data(file_path):
    data = pd.read_csv(file_path)
    return data

# 데이터 전처리
def preprocess_data(data):
    features = data[['주가', '보유수량', '연간하락률', '연간성장률', '총자산']]
    target = (data['주가'] * data['보유수량'] * data['연간성장률']) / data['총자산']
    
    scaler = StandardScaler()
    scaled_features = scaler.fit_transform(features)
    
    return scaled_features, target

# PCA 적용
def apply_pca(features, n_components):
    pca = PCA(n_components=n_components)
    pca_features = pca.fit_transform(features)
    return pca_features

# 신경망 모델 생성
def create_model(input_dim):
    model = Sequential()
    model.add(Dense(64, input_dim=input_dim, activation='relu'))
    model.add(Dense(32, activation='relu'))
    model.add(Dense(1, activation='linear'))
    
    model.compile(optimizer='adam', loss='mean_absolute_error', metrics=['mae'])
    return model

# 모델 학습
def train_model(model, X_train, y_train, X_val, y_val, epochs=1000, batch_size=32):
    model.fit(X_train, y_train, validation_data=(X_val, y_val), epochs=epochs, batch_size=batch_size)

# 모델 평가 및 예측
def evaluate_and_predict(model, X_val, y_val):
    loss, mae = model.evaluate(X_val, y_val)
    predictions = model.predict(X_val)
    return loss, mae, predictions

# 리밸런싱 비율 계산
def calculate_rebalance_ratio(predictions, total_investment):
    ratios = predictions / np.sum(predictions) * total_investment
    return ratios.flatten()  # 1차원 배열로 변환

# 메인 함수
def main(file_path, target_stock):
    # 데이터 로드
    data = load_data(file_path)
    
    # 데이터 전처리
    features, target = preprocess_data(data)
    
    # PCA 적용
    pca_features = apply_pca(features, n_components=3)
    
    # 데이터 분할
    X_train, X_val, y_train, y_val, indices_train, indices_val = train_test_split(
        pca_features, target, data.index, test_size=0.2, random_state=42)  # 인덱스도 함께 분할
    
    # 모델 생성
    model = create_model(input_dim=X_train.shape[1])
    
    # 모델 학습
    train_model(model, X_train, y_train, X_val, y_val)
    
    # 모델 평가 및 예측
    loss, mae, predictions = evaluate_and_predict(model, X_val, y_val)
    
    print(f"Loss: {loss}, MAE: {mae}")
    
    # 리밸런싱 비율 계산
    total_investment = 1000000  # 예시로 1,000,000원을 투자한다고 가정
    rebalance_ratios = calculate_rebalance_ratio(predictions, total_investment)
    
    # 주식명과 리밸런싱 비율 출력
    stock_names = data['주식명'].values[indices_val]  # 인덱스를 사용하여 주식명을 가져옴
    
    # 특정 주식명으로 필터링
    target_ratios = []
    for name, ratio in zip(stock_names, rebalance_ratios):
        if name == target_stock:
            target_ratios.append(ratio)
    
    # 가장 높은 리밸런싱 비율 출력
    if target_ratios:
        max_ratio = max(target_ratios)
        investment_amount = max_ratio  # 해당 주식의 투자금
        percentage = (investment_amount / total_investment) * 100  # 비율 계산
        print(f"주식: {target_stock}, 최적의 리밸런싱 비율: {investment_amount:.2f} 원 ({percentage:.2f}%)")
    else:
        print(f"주식 '{target_stock}'에 대한 데이터가 없습니다.")

# 실행
if __name__ == "__main__":
    # CSV 파일 경로를 입력하세요
    file_path = 'data2.csv'  # 데이터 파일 경로
    target_stock = 'energy'  # 찾고자 하는 주식명
    main(file_path, target_stock)
