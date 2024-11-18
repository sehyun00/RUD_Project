package com.rud.rud.wallet;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WalletRepository extends JpaRepository<Wallet, Integer> {
    Wallet findByUserIdAndRudDate(String userId, String rudDate);
    List<Wallet> findByUserId(String userId);
}
