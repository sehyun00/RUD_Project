package com.rud.rud.wallet;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Null;
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

    private String won; // 원화 금액

    private String dollar; // 달러 금액

    @NotNull
    private Double expertPer; // 비중
}
