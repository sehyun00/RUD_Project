package com.rud.rud.wallet;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@Service
public class WalletService {

    @Autowired
    private WalletRepository walletRepository;

    private final RestTemplate restTemplate;

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

    // 달러 환율 조회
    public Double getDollarExchangeRate() {
        String url = "https://api.exchangerate-api.com/v4/latest/USD";
        Map<String, Object> response = restTemplate.getForObject(url, Map.class);
        Map<String, Number> rates = (Map<String, Number>) response.get("rates");
        // 1달러당 환율 반환
        return rates.get("KRW").doubleValue();
    }
}
