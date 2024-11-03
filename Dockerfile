# Dockerfile
FROM ubuntu:18.04

# 기본 패키지 설치
RUN apt-get update && apt-get install -y \
    build-essential \
    wget \
    linux-headers-generic \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# NVIDIA CUDA 10.1 설치
RUN wget https://developer.download.nvidia.com/compute/cuda/10.1/Prod/local_installers/cuda-repo-ubuntu1804-10-1-local_10.1.243-1_amd64.deb \
    && dpkg -i cuda-repo-ubuntu1804-10-1-local_10.1.243-1_amd64.deb \
    && apt-key add /var/cuda-repo-ubuntu1804-10-1-local/7fa2af80.pub \
    && apt-get update \
    && apt-get install -y cuda-10-1 \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# 환경 변수 설정
ENV PATH=/usr/local/cuda-10.1/bin${PATH:+:${PATH}}
ENV LD_LIBRARY_PATH=/usr/local/cuda-10.1/lib64${LD_LIBRARY_PATH:+:${LD_LIBRARY_PATH}}

CMD ["bash"]
