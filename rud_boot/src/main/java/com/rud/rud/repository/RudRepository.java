package com.rud.rud.repository;

import com.rud.rud.domain.Rud;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RudRepository extends JpaRepository<Rud, Integer> {
    // 리밸런싱 기록 찾을 때는 그 사용자와 날짜별로 가져옴
    List<Rud> findByUserIdAndRudDate(String userId, String rudDate);
    // 사용자 id로 찾음
    List<Rud> findByUserId(String userId);
}
