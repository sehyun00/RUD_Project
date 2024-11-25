package com.rud.rud.service;

import com.rud.rud.domain.Rud;
import com.rud.rud.repository.RudRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class RudService {

    @Autowired
    private final RudRepository rudRepository;

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

}