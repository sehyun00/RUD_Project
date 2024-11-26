package com.rud.rud.wallet;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class WalletService {

    @Autowired
    private WalletRepository walletRepository;

    public Wallet saveWallet(Wallet wallet) {
        return walletRepository.save(wallet);
    }

    public List<Wallet> getWalletByUserIdAndRudDate(String userId, String rudDate) {
        return walletRepository.findByUserIdAndRudDate(userId, rudDate);
    }

    // id로 모든 wallet 조회
    public List<Wallet> getWalletByUserId(String userId) {
        return walletRepository.findByUserId(userId);
    }

    // 날짜로 그 날짜에 해당하는 환율 조회
    public Double getExchangeForDate(List<Wallet> wallets, String date) {
        for (Wallet wallet : wallets) {
            if (wallet.getRudDate().equals(date)) {
                return wallet.getExchange();
            }
        }
        return 0.0;
    }
}