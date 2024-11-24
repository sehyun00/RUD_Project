<<<<<<< HEAD
package com.rud.rud.service;

import com.rud.rud.domain.Rud;
import com.rud.rud.repository.RudRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor
@Service
public class RudService {

    private final RudRepository rudRepository;

    @Transactional
    public void create(List<Rud> rudList){
        for (Rud rudData : rudList) {
            Rud rud = new Rud(); // Rud 객체 생성
            rud.setWon(rudData.getWon());
            rud.setDollar(rudData.getDollar());
            rud.setNos(rudData.getNos());
            rud.setMarketOrder(rudData.getMarketOrder());
            rud.setExpertPer(rudData.getExpertPer());

            rudRepository.save(rud); // 데이터베이스에 저장
        }
    }

    public List<Rud> getRudByUserId(String userId) {
        return rudRepository.findByRudkeyUserId(userId);
    }


//    @Transactional
//    public RudData show(Date rebalancongDate, Member userId){
//        RudData rud = new RudData();
//        if(rebalancongDate.equals(rud.getRebalancingDate()) && userId.equals(rud.getUserId())){
//            rud.getWon();
//            rud.getDollar();
//            rud.getStockName();
//            rud.getNos();
//            rud.getMarketOrder();
//            rud.getExpertPer();
//        }
//        return rud;
//    }
}
=======
//package com.rud.rud.service;
//
//import com.rud.rud.domain.Rud;
//import com.rud.rud.repository.RudRepository;
//import lombok.RequiredArgsConstructor;
//import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;
//
//import java.util.List;
//
//@RequiredArgsConstructor
//@Service
//public class RudService {
//
//    private final RudRepository rudRepository;
//
//    @Transactional
//    public void create(List<Rud> rudList){
//        for (Rud rudData : rudList) {
//            Rud rud = new Rud(); // Rud 객체 생성
//            rud.setWon(rudData.getWon());
//            rud.setDollar(rudData.getDollar());
//            rud.setNos(rudData.getNos());
//            rud.setMarketOrder(rudData.getMarketOrder());
//            rud.setExpertPer(rudData.getExpertPer());
//
//            rudRepository.save(rud); // 데이터베이스에 저장
//        }
//    }
//
//    public List<Rud> getRudByUserId(String userId) {
//        return rudRepository.findByRudkeyUserId(userId);
//    }
//
//
////    @Transactional
////    public RudData show(Date rebalancongDate, Member userId){
////        RudData rud = new RudData();
////        if(rebalancongDate.equals(rud.getRebalancingDate()) && userId.equals(rud.getUserId())){
////            rud.getWon();
////            rud.getDollar();
////            rud.getStockName();
////            rud.getNos();
////            rud.getMarketOrder();
////            rud.getExpertPer();
////        }
////        return rud;
////    }
//}
>>>>>>> back)logintest
