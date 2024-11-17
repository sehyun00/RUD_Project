package com.rud.rud.wallet;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Null;

public class Wallet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id; //autoint, pk

    //밑의 두개를 이용하여 검색함
    @NotNull
    private String userId; //유저 아이디

    @NotNull
    private String rudDate; // 날짜

    //원화, 달러는 둘 중 하나만 들어감
    @Null
    private String won; // 원화 금액

    @Null
    private String dollar; // 달러 금액

    @NotNull
    private Double expertPer; // 희망 비중

}
