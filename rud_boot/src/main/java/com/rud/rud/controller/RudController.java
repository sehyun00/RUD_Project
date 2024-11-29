package com.rud.rud.controller;

import com.rud.rud.domain.Rud;
import com.rud.rud.domain.Csv;
import com.rud.rud.domain.Log;
import com.rud.rud.domain.Wallet;
import com.rud.rud.service.WalletService;
import com.rud.rud.service.RudService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;


import java.util.ArrayList;
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
//    @PreAuthorize("hasAnyRole('USER')")
    @PostMapping("/save")
    public ResponseEntity<Rud> saveRud(@RequestBody Rud rud) {
        Rud savedRud = rudService.saveRud(rud);
        return ResponseEntity.ok(savedRud);
    }

    // id + 날짜 조회
//    @PreAuthorize("hasAnyRole('USER')")
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
//    @PreAuthorize("hasAnyRole('USER')")
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
//    @PreAuthorize("hasAnyRole('ROLE_USER','ROLE_ADMIN')")
    @PostMapping("/log")
    public ResponseEntity<List<Log>> getLog(@RequestBody Map<String, String> request) {
        String userId = request.get("userId");
        List<Log> logResponses = rudService.getLogByUserId(userId);

        return ResponseEntity.ok(logResponses);
    }

    // to csv
    // 주식은 리스트에 넣어서 보내고
//    @PreAuthorize("hasAnyRole('ROLE_USER','ROLE_ADMIN')")
    @PostMapping("/csv")
    public ResponseEntity<List<Csv>> csvRud(@RequestBody Map<String, String> request) {
        String userId = request.get("userId");
        String rudDate = request.get("rudDate");

        // 그 날의 모든 rud, wallet, 총자산
        double total = rudService.getTotlaByUserIdAndDate(userId, rudDate);
        Wallet wallet = walletService.getWalletByUserIdAndRudDate(userId, rudDate);
        List<Rud> rudList = rudService.getRudByUserIdAndRudDate(userId, rudDate);

        // 여기에다가 넣어서 반환
        List<Csv> csvResponses = new ArrayList<>();

        // 총자산 추가
        Csv totalCsv = new Csv(rudDate, total, wallet, rudList);
        csvResponses.add(totalCsv);

        return ResponseEntity.ok(csvResponses);
    }
}
