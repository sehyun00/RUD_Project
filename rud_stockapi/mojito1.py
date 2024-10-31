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
    exchange='나스닥'
)

ohlcv = broker.fetch_ohlcv(
    symbol="AAPL",
    timeframe='D',
    adj_price=True
)

pprint.pprint(ohlcv)
df = pd.DataFrame(ohlcv['output2'])
dt = pd.to_datetime(df['xymd'], format="%Y%m%d")
df.set_index(dt, inplace=True)
df = df[['open', 'high', 'low', 'clos']]

# df = df[['stck_oprc', 'stck_hgpr', 'stck_lwpr', 'stck_clpr']]
df.columns = ['open', 'high', 'low', 'close']
df.index.name = "date"
print(df)
