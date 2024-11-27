package com.rud.rud.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Wallet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id; // autoint, pk

    // 밑의 두개를 이용하여 검색함
    @NotNull
    private String userId; // 유저 아이디

    @NotNull
    private String rudDate; // 날짜

    @NotNull
    private Double exchange; // 환율

    private Double won; // 원화 금액

    private Double wonPer; // 비중

    private Double dollar; // 달러 금액

    private Double dollarPer; // 비중
}