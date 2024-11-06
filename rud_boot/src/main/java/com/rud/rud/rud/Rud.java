package com.rud.rud.rud;

import com.rud.rud.member.Member;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.Getter;
import org.springframework.stereotype.Service;

import java.util.Date;

@Getter
@Service
@Entity
public class Rud {
    @Id
    private Date rebalancingdate;

    @OneToOne
    @JoinColumn(name = "USER_ID")
    private Member userId;

}
