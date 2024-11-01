package com.rud.rud.member;

import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, String> {
    Member findByUserIdAndPassword (String userId, String password);
}