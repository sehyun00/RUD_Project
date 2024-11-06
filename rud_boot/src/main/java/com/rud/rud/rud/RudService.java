package com.rud.rud.rud;

import com.rud.rud.member.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;
import java.time.LocalDateTime;

@RequiredArgsConstructor
@Service
public class RudService {

    private final RudRepository rudRepository;
    private LocalDateTime rebalancingDate;

    @Transactional
    public Rud create(Member userId, String won, String dollar, String stockName, double nos, double marketOrder, double expertPer){
        this.rebalancingDate = rebalancingDate;
        Rud rud = new Rud();
        rud.setRebalancingDate(LocalDateTime.now());
        rud.setUserId(userId);
        rud.setWon(won);
        rud.setDollar(dollar);
        rud.setStockName(stockName);
        rud.setNos(nos);
        rud.setMarketOrder(marketOrder);
        rud.setExpertPer(expertPer);
        this.rudRepository.save(rud);
        return rud;
    }
}