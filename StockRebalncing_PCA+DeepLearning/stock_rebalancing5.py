'''
ver.5
<변경사항>
- 모델 평가 및 예측 방식 개선: 여러 모델의 예측값을 평균으로 계산하여 최종 예측값으로 사용하도록 수정.
- 리밸런싱 비율 계산 방식 변경: 리밸런싱 비율을 확률로 변환하고 음수 값을 처리하는 기능 추가.
- CSV 저장 기능 추가: 최종 리밸런싱 비율을 CSV 파일로 저장하는 기능 추가.
- 주식명이 겹치는 경우 하나로 합산: 동일한 주식명의 리밸런싱 비율을 합산하여 저장하도록 수정.
- 불필요한 코드 제거 및 코드 정리: 가독성을 높이기 위해 불필요한 코드 및 주석을 제거하고 정리.
'''

import numpy as np
import pandas as pd
from sklearn.decomposition import PCA
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from keras.models import Sequential
from keras.layers import Dense
import tensorflow as tf
from tensorflow.keras.callbacks import TensorBoard
import os

# GPU 설정
gpus = tf.config.experimental.list_physical_devices('GPU')
if gpus:
    try:
        for gpu in gpus:
            tf.config.experimental.set_memory_growth(gpu, True)
        print(f"사용 가능한 GPU: {gpus}")
    except RuntimeError as e:
        print(e)
else:
    print("사용 가능한 GPU가 없습니다.")

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
        Dense(1, activation='sigmoid')
    ])
    model.compile(optimizer='adam', loss='mean_absolute_error', metrics=['mae'])
    return model

# 모델 학습
def train_model(model, X_train, y_train, X_val, y_val, epochs=200, batch_size=32):
    # TensorBoard 콜백 설정
    log_dir = os.path.join("logs", "fit", "model")
    tensorboard_callback = TensorBoard(log_dir=log_dir, histogram_freq=1)

    model.fit(X_train, y_train, validation_data=(X_val, y_val),
              epochs=epochs, batch_size=batch_size, callbacks=[tensorboard_callback])

# 모델 평가 및 예측
def evaluate_and_predict(models, X_val):
    predictions = np.zeros((X_val.shape[0], len(models)))

    for i, model in enumerate(models):
        pred = model.predict(X_val)
        predictions[:, i] = pred.ravel()

    mean_predictions = np.mean(predictions, axis=1)
    return mean_predictions

# 리밸런싱 비율 계산 (확률로 변환, 음수 값 처리)
def calculate_rebalance_ratio(predictions):
    total = np.sum(predictions)
    probabilities = predictions / total if total > 0 else predictions
    return np.clip(probabilities, 0, None)  # 음수 값은 0으로 대체

# 결과를 CSV로 저장
def save_to_csv(stock_names, rebalance_ratios, filename='rebalance_data.csv'):
    df = pd.DataFrame({'주식명': stock_names, '리밸런싱비율': rebalance_ratios})
    df_grouped = df.groupby('주식명', as_index=False).sum()
    df_grouped.to_csv(filename, index=False)
    print(f"리밸런싱 비율이 {filename} 파일로 저장되었습니다.")

# 메인 함수
def main(file_path):
    print("Num GPUs Available: ", len(tf.config.experimental.list_physical_devices('GPU')))

    data = load_data(file_path)
    features, target = preprocess_data(data)

    pca_features = apply_pca(features)
    X_train, X_val, y_train, y_val, indices_train, indices_val = train_test_split(
        pca_features, target, data.index, test_size=0.2, random_state=42
    )

    models = [create_model(input_dim=X_train.shape[1]) for _ in range(5)]
    for model in models:
        train_model(model, X_train, y_train, X_val, y_val)

    predictions = evaluate_and_predict(models, X_val)
    rebalance_ratios = calculate_rebalance_ratio(predictions)

    stock_names = data['주식명'].values[indices_val]
    save_to_csv(stock_names, rebalance_ratios)

# 실행
if __name__ == "__main__":
    file_path = 'data2.csv'  # 데이터 파일 경로
    main(file_path)
