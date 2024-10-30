# koreainvestment.key에 앱키, 시크릿키, 계좌번호를 넣고 실행시켜야함
import mojito
import pandas as pd
import pprint  # json 정리돼서 출력

# 모히또 버전확인
# print(mojito.__version__)

# 앱키, 시크릿키, 모의투자 계좌
f = open(".\\koreainvestment.key")
lines = f.readlines()
key = lines[0].strip()
secret = lines[1].strip()
acc_no = lines[2].strip()
f.close()

# 국장은 비워둠 해외장은 나스닥 추가
broker = mojito.KoreaInvestment(
    api_key=key,
    api_secret=secret,
    acc_no=acc_no,
    # exchange='나스닥'
)
# 토큰 출력
# print(broker)

# 코스피, 코스닥 종목 정보 파일 생성
# 하루 한번씩 생성해야할듯요
# symbols = broker.fetch_symbols()
# symbols

# 특정 종목 코드를 이용해 시세 확인
# resp = broker.fetch_price("005930")
# # print(resp)  # 전체
# print("Open:  ", resp['output']['stck_oprc'])   # 시작가
# # print("High : ", resp['output']['stck_hgpr'])    # 고가
# # print("Low  : ", resp['output']['stck_lwpr'])     # 저가
# print("Close: ", resp['output']['stck_prpr'])    # 종가

# 일봉 데이터 조회
resp = broker.fetch_ohlcv(
    symbol="005930",
    timeframe='D',
    adj_price=True
)
# pprint.pprint(resp)

# 판다스 표로 출력
df = pd.DataFrame(resp['output2'])
dt = pd.to_datetime(df['stck_bsop_date'], format="%Y%m%d")
df.set_index(dt, inplace=True)
df = df[['stck_oprc', 'stck_hgpr', 'stck_lwpr', 'stck_clpr']]
df.columns = ['open', 'high', 'low', 'close']
df.index.name = "date"

print(df)


# resp = broker.fetch_price("TSLA")
# print(resp)
# print("last:  ", resp['output']['last'])   # 시가

# ohlcv = broker.fetch_ohlcv(
#     symbol="TSLA",
#     timeframe='D',
#     adj_price=True
# )
# pprint.pprint(ohlcv)
# print("Open:  ", ohlcv['output']['open'])    # 시가
# print("High : ", ohlcv['output']['high'])    # 고가
# print("Low  : ", ohlcv['output']['low'])    # 저가
# print("Close: ", ohlcv['output']['clos'])    # 종가
# print("Close: ", ohlcv['output']['tvol'])    # 거래량
# print("Close: ", ohlcv['output']['tamt'])    # 거래대금
