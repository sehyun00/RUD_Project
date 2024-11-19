package com.rud.rud.wallet;

import com.rud.rud.member.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

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
    public ResponseEntity<Wallet> dateWallet(@RequestBody String userId, String rudDate) {
        Wallet savedWallet = walletService.getWalletByUserIdAndRudDate(userId, rudDate);
        return ResponseEntity.ok(savedWallet);
    }

    // id로 모두 조회
    @PostMapping("/all")
    public ResponseEntity<List<Wallet>> getAllWallet(@RequestBody String userId) {
        List<Wallet> getWalletByUserId = walletService.getWalletByUserId(userId);
        return ResponseEntity.ok(getWalletByUserId);
    }
}
