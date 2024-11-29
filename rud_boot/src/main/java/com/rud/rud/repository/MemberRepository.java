package com.rud.rud.repository;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.rud.rud.domain.Member;

public interface MemberRepository extends JpaRepository<Member, String> {
    /*코드설명
     * 멤버 역활을 불러오기 위한 쿼리문
     * */
    @EntityGraph(attributePaths = {"memberRoleList"})
    @Query("select m from Member m where m.userId = :userId")
    Member getWithRoles(@Param("userId") String userId);
}
