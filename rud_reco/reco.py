import FinanceDataReader as fdr

# fdr.DataReader(주식 종목 [, 시작일(YYYY-mm-dd)] [,종료일(YYYY-mm-dd)])
# dfr.StockListing(거래소이름("SSE", "SZSE", ...))
# 005930 - 삼전

# 오픈, 하이, 로우, 크로즈, 볼륨, 체인지
SAM = fdr.DataReader("005930")
SAM2 = fdr.DataReader("005930", "2021-01-01", "2024-10-14")
SAM3 = fdr.DataReader("005930", "2021")

NYSE_df = fdr.StockListing('NYSE')  # 뉴욕거래소
# 한국:"KRX", 뉴욕:"NYSE", 상해:"SSE" 등등
# 코스피:"KOSPI", 코스닥:"KOSDAQ", 코넥스:"KONEX", S&P500:"S&P500" 이런것들도 가능

# print(SAM.head())
# print(SAM2.head())
print(SAM3.head())
# print(NYSE_df.head())
