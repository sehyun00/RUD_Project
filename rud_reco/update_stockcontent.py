import pandas as pd
import urllib.request
import ssl
import zipfile
import os

base_dir = os.getcwd()


def download_and_extract(url, filename):
    ssl._create_default_https_context = ssl._create_unverified_context
    urllib.request.urlretrieve(url, filename)
    with zipfile.ZipFile(filename, 'r') as zip_ref:
        zip_ref.extractall()
    os.remove(filename)


def process_file(file_name, part1_columns, field_specs):
    tmp_fil1 = f"{file_name}_part1.tmp"
    tmp_fil2 = f"{file_name}_part2.tmp"

    with open(f"{file_name}.mst", mode="r", encoding="cp949") as f, \
            open(tmp_fil1, mode="w") as wf1, \
            open(tmp_fil2, mode="w") as wf2:
        for row in f:
            rf1 = row[0:len(row) - (228 if 'kospi' in file_name else 222)]
            rf1_1, rf1_2, rf1_3 = rf1[0:9].rstrip(
            ), rf1[9:21].rstrip(), rf1[21:].strip()
            wf1.write(f"{rf1_1},{rf1_2},{rf1_3}\n")
            wf2.write(row[-(228 if 'kospi' in file_name else 222):])

    df1 = pd.read_csv(tmp_fil1, header=None,
                      names=part1_columns, encoding='UTF-8')
    df2 = pd.read_fwf(tmp_fil2, widths=field_specs, header=None)
    df = pd.concat([df1, df2], axis=1)

    os.remove(tmp_fil1)
    os.remove(tmp_fil2)
    os.remove(f"{file_name}.mst")  # 추가된 부분: mst 파일 삭제

    return df


def process_kosdaq():
    url = "https://new.real.download.dws.co.kr/common/master/kosdaq_code.mst.zip"
    download_and_extract(url, "kosdaq_code.zip")

    part1_columns = ['단축코드', '표준코드', '한글종목명']
    field_specs = [2, 1, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 9, 5, 5, 1, 1,
                   1, 2, 1, 1, 1, 2, 2, 2, 3, 1, 3, 12, 12, 8, 15, 21, 2, 7, 1, 1, 1, 1, 9, 9, 9, 5, 9, 8, 9, 3, 1, 1, 1]

    df = process_file("kosdaq_code", part1_columns, field_specs)
    return df[['단축코드', '한글종목명']]


def process_kospi():
    url = "https://new.real.download.dws.co.kr/common/master/kospi_code.mst.zip"
    download_and_extract(url, "kospi_code.zip")

    part1_columns = ['단축코드', '표준코드', '한글명']
    field_specs = [2, 1, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 9, 5,
                   5, 1, 1, 1, 2, 1, 1, 1, 2, 2, 2, 3, 1, 3, 12, 12, 8, 15, 21, 2, 7, 1, 1, 1, 1, 1, 9, 9, 9, 5, 9, 8, 9, 3, 1, 1, 1]

    df = process_file("kospi_code", part1_columns, field_specs)
    return df[['단축코드', '한글명']]


def main():
    kosdaq_df = process_kosdaq()
    kospi_df = process_kospi()

    # 열 이름 통일
    kospi_df = kospi_df.rename(columns={'한글명': '한글종목명'})

    # 데이터프레임 합치기
    combined_df = pd.concat([kosdaq_df, kospi_df], ignore_index=True)

    # 합쳐진 데이터프레임을 엑셀 파일로 저장
    combined_df.to_csv('stock_codes_combined.csv', index=False)

    print("엑셀csv 파일 생성 완료:")
    print("stock_codes_combined.xlsx (단축코드, 한글종목명)")


if __name__ == "__main__":
    main()
