//package com.rud.rud.repository;
//
//import lombok.extern.log4j.Log4j2;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import com.rud.rud.domain.Member;
//import com.rud.rud.domain.MemberRole;
//
//@SpringBootTest
//@Log4j2
//public class MemberRepositoryTests {
//
//    @Autowired
//    private MemberRepository memberRepository;
//
//    @Autowired
//    private PasswordEncoder passwordEncoder;
//
//    @Test
//    public void testInsertMember(){
//
//        for (int i = 0; i < 10 ; i++) {
//
//            Member member = Member.builder()
//                    .userId("user"+i)
//                    .password(passwordEncoder.encode("1111"))
//                    .name("USER"+i)
//                    .email("user"+i+"@gmail.com")
//                    .phoneNumber("01041591728")
//                    .personalInfoConsent(true)
//                    .dataAnalysisConsent(true)
//                    .build();
//
//            member.addRole(MemberRole.USER);
//
//            if(i >= 5){
//                member.addRole(MemberRole.MANAGER);
//            }
//
//            if(i >=8){
//                member.addRole(MemberRole.ADMIN);
//            }
//            memberRepository.save(member);
//        }
//    }
//
//    @Test
//    public void testRead() {
//
//        String userId = "user1";
//
//        Member member = memberRepository.getWithRoles(userId);
//
//        log.info("-----------------");
//        log.info(member);
//    }
//
//}
//
