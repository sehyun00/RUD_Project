package com.rud.rud.repository;

import com.rud.rud.domain.Wallet;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WalletRepository extends JpaRepository<Wallet, Integer> {
    Wallet findByUserIdAndRudDate(String userId, String rudDate);

    List<Wallet> findByUserId(String userId);
}