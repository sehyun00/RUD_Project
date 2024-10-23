package com.rud.rud.repository;

import com.rud.rud.domain.db.MemberDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;

@Repository
public class MemberDAO {
    
    //쿼리 요청을 간단하게
    private final JdbcTemplate template;

    // 생성자를 통한 JdbcTemplate 주입
    @Autowired
    public MemberDAO(DataSource dataSource) {
        this.template = new JdbcTemplate(dataSource);
    }

    // 회원가입
    public String createUser(MemberDTO memberDTO) {
        String createUserQuery = "INSERT INTO MEMBER(id, password, email, name, phonenumber, personalInfoConsent, dataAnalysisConsent) " +
                                 "VALUES (?, ?, ?, ?, ?, ?, ?)";

        try {
            int result = template.update(createUserQuery, 
                memberDTO.getId(),
                memberDTO.getPassword(),
                memberDTO.getEmail(),
                memberDTO.getName(),
                memberDTO.getPhonenumber(),
                memberDTO.isPersonalInfoConsent(),
                memberDTO.isDataAnalysisConsent()
            );

            return result == 1 ? "User created successfully" : "User creation failed";

        } catch (Exception e) {
            e.printStackTrace();
            return "Error occurred during user creation: " + e.getMessage();
        }
    }

    // 로그인
    public String loginUser(MemberDTO memberDTO) {
        String selectUserQuery = "SELECT COUNT(*) FROM member WHERE id = ? AND password = ?";

        //조건에 해당하면 카운트 1로 변경 
        try {
            Integer count = template.queryForObject(selectUserQuery, new Object[]{
                memberDTO.getId(),
                memberDTO.getPassword()
            }, Integer.class);

            if (count != null && count == 1) {
                return "Login successful";
            } else {
                return "Invalid ID or password";
            }

        } catch (Exception e) {
            e.printStackTrace();
            return "Error occurred during login: " + e.getMessage();
        }


       
    }
}
