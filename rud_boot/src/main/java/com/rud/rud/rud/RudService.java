package com.rud.rud.rud;

import com.rud.rud.wallet.Wallet;
import com.rud.rud.wallet.WalletRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class RudService {

    @Autowired
    private final RudRepository rudRepository;
    @Autowired
    private WalletRepository walletRepository;

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

    // id로 모든 로그 조회
    public List<Rud> getAllLog(String userID){
        List<Rud> ruds = rudRepository.findByUserId(userID);
        List<Wallet> wallets = walletRepository.findByUserId(userID);
        System.out.println(ruds);
        System.out.println(wallets);
        return ruds;
    }
}
