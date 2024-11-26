package com.rud.rud.controller;

import com.rud.rud.service.MemberService;
import com.rud.rud.domain.Wallet;
import com.rud.rud.service.WalletService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
<<<<<<< HEAD:rud_boot/src/main/java/com/rud/rud/wallet/WalletController.java
import org.springframework.web.bind.annotation.*;
=======
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
>>>>>>> back)logintest:rud_boot/src/main/java/com/rud/rud/controller/WalletController.java

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
    @PreAuthorize("hasAnyRole('ROLE_USER','ROLE_ADMIN')")
    @PostMapping("/save")
    public ResponseEntity<Wallet> saveWallet(@RequestBody Wallet wallet) {
        Wallet savedWallet = walletService.saveWallet(wallet);
        return ResponseEntity.ok(savedWallet);
    }

    // id + 날짜 조회
    @PreAuthorize("hasAnyRole('ROLE_USER','ROLE_ADMIN')")
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
    @PreAuthorize("hasAnyRole('ROLE_USER','ROLE_ADMIN')")
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