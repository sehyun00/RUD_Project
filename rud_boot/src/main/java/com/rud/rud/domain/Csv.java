package com.rud.rud.domain;

import com.rud.rud.domain.Wallet;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class Csv {
    private String date; // 날짜 csv(파일명이 될 거임)
    private Double total; // 총자산
    private Wallet wallet; // 원화, 원화비율, 달러, 달러비율, 환율
    private List<Rud> rud; // 리스트로 들어가야함

    // 생성자
    public Csv(String date, Double total, Wallet wallet, List<Rud> rud) {
        this.date = date;
        this.total = total;
        this.wallet = wallet;
        this.rud = rud;
    }
}
