package com.rud.rud.domain;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
// 로그 데이터 반환하는 엔티티는 아니고 항목들
public class Log {
    private String date;
    private Double total;
    private int stockCount;

    // 생성자
    public Log(String date) {
        this.date = date;
        this.total = 0.0;
        this.stockCount = 0;
    }

    // total에 더해줌
    public void addStockValue(double stockValue) {
        this.total += stockValue;
    }

    public void addWalletValue(double walletValue) {
        this.total += walletValue;
    }

    // 주식 수량
    public void plusStockCount() {
        this.stockCount++;
    }
}
