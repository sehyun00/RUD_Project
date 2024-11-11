package com.rud.rud.rud;

import com.rud.rud.member.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RudRepository extends JpaRepository<Rud, RudKey> {
    List<Rud> findByRudkeyUserId(String userId);
}

