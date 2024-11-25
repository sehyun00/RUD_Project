package com.rud.rud.wallet;

import com.rud.rud.member.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping("/wallet")
public class WalletController {

    @Autowired
    private WalletService walletService;

    @Autowired
    private MemberService memberService;

    // 저장
    @PostMapping("/save")
    public ResponseEntity<Wallet> saveWallet(@RequestBody Wallet wallet) {
        Wallet savedWallet = walletService.saveWallet(wallet);
        return ResponseEntity.ok(savedWallet);
    }

    // id + 날짜 조회
    @PostMapping("/date")
    public ResponseEntity<List<Wallet>> dateWallet(@RequestBody Map<String, String> request) {
        String userId = request.get("userId");
        String rudDate = request.get("rudDate");

        // id, date가 널이라면 400 반환
        if (userId == null || rudDate == null) {
            return ResponseEntity.badRequest().body(null);
        }

        List<Wallet> savedWallet = walletService.getWalletByUserIdAndRudDate(userId, rudDate);
        return ResponseEntity.ok(savedWallet);
    }

    // id로 모두 조회
    @PostMapping("/all")
    public ResponseEntity<List<Wallet>> getAllWallet(@RequestBody Map<String, String> request) {
        String userId = request.get("userId");

        // id가 널이라면 400 반환
        if (userId == null) {
            return ResponseEntity.badRequest().body(null);
        }

        List<Wallet> getWalletByUserId = walletService.getWalletByUserId(userId);
        return ResponseEntity.ok(getWalletByUserId);
    }
}
