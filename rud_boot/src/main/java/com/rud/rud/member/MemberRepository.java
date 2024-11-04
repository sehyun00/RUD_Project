package com.rud.rud.member;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, String> {
    //Optional<Member> findByMemberId(String userId);
    boolean existsByUserId(String userId);
}