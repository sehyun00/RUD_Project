package com.rud.rud.service;

import com.rud.rud.domain.Wallet;
import com.rud.rud.repository.WalletRepository;
import com.rud.rud.domain.Rud;
import com.rud.rud.repository.RudRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.rud.rud.domain.Log;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@Service
public class RudService {

    @Autowired
    private final RudRepository rudRepository;
    @Autowired
    private WalletRepository walletRepository;

    @Autowired
    private WalletService walletService;

    // rud 저장
    public Rud saveRud(Rud rud) {
        return rudRepository.save(rud);
    }

    // id, date로 rud 조회
    public List<Rud> getRudByUserIdAndRudDate(String userId, String rudDate) {
        return rudRepository.findByUserIdAndRudDate(userId, rudDate);
    }

    // id로 모든 rud 조회
    public List<Rud> getRudByUserId(String userId) {
        return rudRepository.findByUserId(userId);
    }

    // 한 날짜의 총자산 조회
    public Double getTotlaByUserIdAndDate(String userId, String date) {
        // 일단 기록 모두 다 가져옴
        List<Rud> rudList = getRudByUserIdAndRudDate(userId, date);
        Wallet wallet = walletService.getWalletByUserIdAndRudDate(userId, date);
        // 여기에다가 넣어서 반환
        double dateTotal = 0.0;

        // 주식 종목 가격 계산
        for (Rud rud : rudList) {
            double exchangeRate = walletService.getExchangeForDate(wallet, date);
            // 국장이면 그대로 해외장이면 환율 곱해줌
            dateTotal += (!rud.getPaul() ? rud.getMarketOrder() * rud.getNos()
                    : rud.getMarketOrder() * exchangeRate * rud.getNos());
        }

        // 원화 + 달러 총 자산 계산
        dateTotal += (wallet.getDollar() != null ? wallet.getDollar() * walletService.getExchangeForDate(wallet, date)
                : 0) + (wallet.getWon() != null ? wallet.getWon() : 0);
        return dateTotal;
    }

    // log 조회
    // 날짜, 총자산, 종목수, 전 기록 대비 변동률을 반환해야 함
    // 날짜마다 rud, wallet을 나눔
    // 총자산 = (동일한 날짜)종목 가격 * 종목 수 + 원화 + 달러 * 환율
    // 종목 수 = (동일한 날짜)종목 수
    public List<Log> getLogByUserId(String userId) {
        List<Rud> rudList = getRudByUserId(userId);
        List<Wallet> walletList = walletRepository.findByUserId(userId);
        Map<String, Log> logMap = new HashMap<>();

        // 주식 종목 가격 계산
        for (Rud rud : rudList) {
            String date = rud.getRudDate();
            logMap.putIfAbsent(date, new Log(date));
            // 날짜로 가져옴
            Log logResponse = logMap.get(date);
            double exchangeRate = walletService.getExchangeForDate(walletList, date);
            // 국장이면 그대로 해외장이면 환율 곱해줌
            logResponse.addStockValue(!rud.getPaul() ? rud.getMarketOrder() * rud.getNos()
                    : rud.getMarketOrder() * exchangeRate * rud.getNos());

            // 종목 수량 추가
            logResponse.plusStockCount();
        }

        // 원화 + 달러 총 자산 계산
        for (Wallet wallet : walletList) {
            String date = wallet.getRudDate();
            logMap.putIfAbsent(date, new Log(date));
            // 날짜로 가져옴
            Log logResponse = logMap.get(date);
            // 달러 * 환율 + 원화
            double walletValue = (wallet.getDollar() != null ? wallet.getDollar() * wallet.getExchange() : 0)
                    + (wallet.getWon() != null ? wallet.getWon() : 0);
            logResponse.addWalletValue(walletValue);
        }

        // 람다로 date 내림차순 정렬
        List<Log> sortedLogs = new ArrayList<>(logMap.values());
        sortedLogs.sort((log1, log2) -> log2.getDate().compareTo(log1.getDate()));

        return sortedLogs;
    }
}
