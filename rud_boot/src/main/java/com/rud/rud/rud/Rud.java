package com.rud.rud.rud;

import com.rud.rud.member.Member;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Service;

import java.util.Date;

@Getter
@Setter
@Entity
public class Rud {
    @Id
    private Date rebalancingDate;

    @OneToOne
    @JoinColumn(name = "USER_ID")
    private Member userId;

    private String won;

    private String dollar;

    private String stockName;

    private double nos;

    private double marketOrder;

    private double expertPer;

}
