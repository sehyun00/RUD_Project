package com.rud.rud.rud;

import com.rud.rud.member.Member;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.sql.Date;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
public class Rud {
    @Id
    private LocalDateTime rebalancingDate; //rud일자

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_ID")
    private Member userId; //유저 아이디

    private String won; //원화

    private String dollar; //달러

    private String stockName; //주식명

    private double nos; //수량

    private double marketOrder; //주식가격

    private double expertPer; //희망비중

}