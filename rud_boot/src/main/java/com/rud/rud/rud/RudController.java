package com.rud.rud.rud;

import com.rud.rud.member.MemberService;
import com.rud.rud.wallet.Wallet;
import com.rud.rud.wallet.WalletService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping("/rud")
public class RudController {

    @Autowired
    private RudService rudService;

    @Autowired
    private WalletService walletService;

    // rud 저장
    @PostMapping("/save")
    public ResponseEntity<Rud> saveRud(@RequestBody Rud rud) {
        Rud savedRud = rudService.saveRud(rud);
        return ResponseEntity.ok(savedRud);
    }

    // id + 날짜 조회
    @PostMapping("/date")
    public ResponseEntity<List<Rud>> dateRud(@RequestBody Map<String, String> request) {
        String userId = request.get("userId");
        String rudDate = request.get("rudDate");

        // id, date가 널이라면 400 반환
        if (userId == null || rudDate == null) {
            return ResponseEntity.badRequest().body(null);
        }

        // 값을 리스트로 반환
        List<Rud> getRud = rudService.getRudByUserIdAndRudDate(userId, rudDate);
        return ResponseEntity.ok(getRud);
    }

    // id + 종목 조회
    //그냥 리퀘스트 바디로 넣으면 값이 안들어감 map 안에 넣어줘야 됨
    @PostMapping("/all")
    public ResponseEntity<List<Rud>> allRud(@RequestBody Map<String, String> request) {
        String userId = request.get("userId");

        // id가 널이라면 400 반환
        if (userId == null) {
            return ResponseEntity.badRequest().body(null);
        }

        List<Rud> getAll = rudService.getRudByUserId(userId);
        return ResponseEntity.ok(getAll);
    }

    // log 조회
    // 날짜, 총자산, 종목수, 전 기록 대비 변동률을 반환해야 함
    // 날짜마다 rud, wallet을 나눔
    // 총자산 = (동일한 날짜)종목 가격 * 종목 수 + 원화 + 달러 * 환율
    // 종목 수 = (동일한 날짜)종목 수
    @PostMapping("/log")
    public ResponseEntity<List<Log>> getLog(@RequestBody Map<String, String> request) {
        String userId = request.get("userId");

        // 일단 기록 모두 다 가져옴
        List<Rud> rudList = rudService.getRudByUserId(userId);
        List<Wallet> walletList = walletService.getWalletByUserId(userId);
        // 여기에다가 넣어서 반환
        Map<String, Log> logMap = new HashMap<>();

        // 주식 종목 가격 계산
        for (Rud rud : rudList) {
            String date = rud.getRudDate();
            logMap.putIfAbsent(date, new Log(date));
            // 날짜로 가져옴ii
            Log logResponse = logMap.get(date);
            // 국장이면 그대로
            if (!rud.getPaul()) {
                logResponse.addStockValue(rud.getMarketOrder() * rud.getNos());
                System.out.println("국장: " + rud.getMarketOrder() * rud.getNos());
            }
            // 해외장이면 환율 곱해줌
            else {
                double exchangeRate = walletService.getExchangeForDate(walletList, date);
                logResponse.addStockValue(rud.getMarketOrder() * exchangeRate * rud.getNos());
                System.out.println("해외장: " + rud.getMarketOrder() * exchangeRate * rud.getNos());
            }

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
            double walletValue = (wallet.getDollar() != null ? wallet.getDollar() * wallet.getExchange() : 0) + (wallet.getWon() != null ? wallet.getWon() : 0);
            System.out.println("지갑: " + walletValue);
            logResponse.addWalletValue(walletValue);
        }

        List<Log> logResponses = new ArrayList<>(logMap.values());
        return ResponseEntity.ok(logResponses);
    }
}
