package com.rud.rud.rud;

import com.rud.rud.member.Member;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.sql.Date;

@Getter
@Setter
@Entity
public class Rud {
    @EmbeddedId 
    private RudKey rudkey; //복합키

    private String won; // 원화 금액
    private String dollar; // 달러 금액
    private double nos; // 주식 수량
    private double marketOrder; // 주식 가격
    private double expertPer; // 희망 비중
}
