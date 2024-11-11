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
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Date rebalancingDate; // 리밸런싱 날짜

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_ID")
    private Member userId; // 해당 리밸런싱을 수행한 사용자

    private String won; // 원화 금액
    private String dollar; // 달러 금액
    private String stockName; // 주식 이름
    private double nos; // 주식 수량
    private double marketOrder; // 주식 가격
    private double expertPer; // 희망 비중
}
