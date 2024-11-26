package com.rud.rud.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
@Entity
public class Rud {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id; //autoint, pk

    //밑의 두개를 이용하여 검색함
    @NotNull
    private String userId; //유저 아이디

    @NotNull
    private String rudDate; // 날짜

    @NotNull
    private String stockName; //주식명

    @NotNull
    private Double marketOrder; // 주식 가격

    @NotNull
    private Double nos; // 주식 수량

    @NotNull
    private Double expertPer; // 비중

<<<<<<< HEAD:rud_boot/src/main/java/com/rud/rud/rud/Rud.java
    @NotNull
    private Boolean paul; // 국장인지 해외장인지
}
=======

}
>>>>>>> back)logintest:rud_boot/src/main/java/com/rud/rud/domain/Rud.java
