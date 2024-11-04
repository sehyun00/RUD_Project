import pandas as pd
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler

# 데이터 로드 및 전처리
def load_and_preprocess_data(file_path):
    data = pd.read_csv(file_path)
    data.dropna(inplace=True)

    X = data[['주식명', '연간 마이너스 확률', '리밸런싱 비율']]
    y = data['수익률총자산']

    X = pd.get_dummies(X, columns=['주식명'])
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)
    
    # y 값 정규화 (optional)
    y = (y - y.mean()) / y.std()  # 표준화

    return train_test_split(X_scaled, y, test_size=0.2, random_state=42), scaler, data

# 모델 구축
def build_model(input_shape):
    model = keras.Sequential([
        layers.Dense(256, activation='relu', input_shape=(input_shape,)),  # 뉴런 수 증가
        layers.BatchNormalization(),
        layers.Dropout(0.1),  # 드롭아웃 비율 조정
        layers.Dense(128, activation='relu'),  # 뉴런 수 증가
        layers.BatchNormalization(),
        layers.Dropout(0.1),  # 드롭아웃 비율 조정
        layers.Dense(2, activation='softmax')  # 선형 활성화 함수 사용
    ])
    
    optimizer = keras.optimizers.Adam(learning_rate=0.0001)  # 학습률 조정
    model.compile(optimizer=optimizer, loss='mean_squared_error', metrics=['mae'])
    return model

# 예측 함수
def predict_rebalance_ratio(model, scaler, stock_name, minus_probability):
    input_data = [[stock_name, minus_probability, 0.0]]
    input_df = pd.DataFrame(input_data, columns=['주식명', '연간 마이너스 확률', '리밸런싱 비율'])
    
    input_df = pd.get_dummies(input_df)
    
    for col in scaler.get_feature_names_out():
        if col not in input_df.columns:
            input_df[col] = 0
    input_df = input_df[scaler.get_feature_names_out()]

    input_scaled = scaler.transform(input_df)
    predicted_return = model.predict(input_scaled)

    # 0에서 1 사이로 클리핑
    optimal_ratio = max(min(predicted_return[0][0], 1), 0)

    return optimal_ratio

def main():
    # 데이터 파일 경로
    file_path = 'data.csv'
    
    # 데이터 로드 및 전처리
    (X_train, X_test, y_train, y_test), scaler, data = load_and_preprocess_data(file_path)

    stock_name = 'cony'
    stock_name2 = 'schd'
    minus_probability = 0.23  # 연간 마이너스 확률
    minus_probability2 = 0.28  # 연간 마이너스 확률2

    # 모델 구축 및 학습
    model = build_model(X_train.shape[1])
    
    # 모델 학습
    history = model.fit(X_train, y_train, epochs=2000, validation_split=0.2, batch_size=32, verbose=1)  # epochs 수 증가

    # 모델 평가
    loss, mae = model.evaluate(X_test, y_test)
    print(f'Loss: {loss:.4f}, MAE: {mae:.4f}')  # MAE 출력

    # 예측 예시
    optimal_ratio = predict_rebalance_ratio(model, scaler, stock_name, minus_probability)
    optimal_ratio2 = predict_rebalance_ratio(model, scaler, stock_name2, minus_probability2)

    # 백분율로 출력
    optimal_ratio_percentage = optimal_ratio * 100
    optimal_ratio_percentage2 = optimal_ratio2 * 100
    print(f'종목 {stock_name} 비율: {optimal_ratio_percentage:.2f}%')
    print(f'종목 {stock_name2} 비율: {optimal_ratio_percentage2:.2f}%')

if __name__ == '__main__':
    main()
