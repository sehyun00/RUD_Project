# RUD_Project

우상향 팀입니다~

java 17

nodejs 20.18.0

react 5.0.1

-   rud_easyocr - python 3.7.13 \
    가상환경(conda) 파이썬 3.7 생성 후 실행 \
    pip install pororo \
    pip install opencv-python~=4.8.0.74 \
    pip install mataplot \
    pip install wget \
    cpu 환경 파이토치 \
    pip3 install torch torchvision torchaudio \

*   cuda 환경(gtx 1650, cuda 10.1 기준) 파이토치 \
    pip install torch==1.7.1+cu101 torchvision==0.8.2+cu101 torchaudio==0.7.2 -f https://download.pytorch.org/whl/torch_stable.html \
    conda install easyocr(설치가 안된다면 아나콘다 프롬포트에서) \
    pip install flask \
    pip install flask_cors \

-   StockRebalncing_PCA+DeepLearning - python 3.9

1. 가상환경 파이썬 \
   conda create -n stock \
2. pip 설치 \
   pip install tensorflow \
   pip install keras \
   pip install numpy  \
   pip install pandas \
   pip install scikit-learn \

gpu 환경(rtx 3060, cuda 11.2 기준) 설정

1. 가상환경 파이썬 3.9 \
   conda create -n stock python=3.9 \
2. cuda&cudnn 설치 \
   conda install -c conda-forge cudatoolkit=11.2 cudnn=8.1.0 \
   C:\Users\니컴이름\anaconda3\envs\stock\python.exe -m pip install --upgrade pip \
   pip install "tensorflow<2.11" \
   pip install numpy<2 \
   pip install pandas \
   pip install scikit-learn \

-   rud_stockapi - python 3.9 \
    pip install mojito2 \
    pip install flask \
    pip install pandas \
    pip install flask_cors \
    pip install googletrans \

rud_stockapi/koreainvestment.key의 첫번째 줄에 자신의 한국투자증권 앱키, 두번째 줄에 한국투자증권 계좌번호를 입력
