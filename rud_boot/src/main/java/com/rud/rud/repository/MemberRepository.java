package com.rud.rud.repository;

<<<<<<< HEAD
import com.rud.rud.domain.Member;
=======
>>>>>>> back)logintest
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
<<<<<<< HEAD

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, String> {
    @EntityGraph(attributePaths = {"memberRoleList"})
    @Query("select m from Member m where m.userId = :userId")
    Member getWithRoles(@Param("userId") String userId);
}
=======
import com.rud.rud.domain.Member;

public interface MemberRepository extends JpaRepository<Member, String> {

    @EntityGraph(attributePaths = {"memberRoleList"})
    @Query("select m from Member m where m.userId = :userId")
    Member getWithRoles(@Param("userId") String userId);
}
>>>>>>> back)logintest
