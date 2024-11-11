package com.rud.rud.rud;

import com.rud.rud.member.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;
import java.util.List;

@RequiredArgsConstructor
@Service
public class RudService {

    private final RudRepository rudRepository;

    @Transactional
    public void create(Date rebalancingDate, Member userId, List<RudData> rudDataList){
        for (RudData rudData : rudDataList) {
            Rud rud = new Rud(); // Rud 객체 생성
            rud.setRebalancingDate(rebalancingDate);
            rud.setUserId(userId);
            rud.setWon(rudData.getWon());
            rud.setDollar(rudData.getDollar());
            rud.setStockName(rudData.getStockName());
            rud.setNos(rudData.getNos());
            rud.setMarketOrder(rudData.getMarketOrder());
            rud.setExpertPer(rudData.getExpertPer());

            rudRepository.save(rud); // 데이터베이스에 저장
        }
    }

    @Transactional
    public RudData show(Date rebalancongDate, Member userId){
        RudData rud = new RudData();
        if(rebalancongDate.equals(rud.getRebalancingDate()) && userId.equals(rud.getUserId())){
            rud.getWon();
            rud.getDollar();
            rud.getStockName();
            rud.getNos();
            rud.getMarketOrder();
            rud.getExpertPer();
        }
        return rud;
    }
}
