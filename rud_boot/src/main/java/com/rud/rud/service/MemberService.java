package com.rud.rud.service;

import com.rud.rud.domain.Member;
import com.rud.rud.repository.MemberRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@RequiredArgsConstructor
@Service
@Transactional
public class MemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    public Member create(String userId, String name, String password, String email, String phoneNumber, boolean personalInfoConsent, boolean dataAnalysisConsent){
        Member member = new Member();
        member.setUserId(userId);
        member.setName(name);
        member.setPassword(passwordEncoder.encode(password));
        member.setEmail(email);
        member.setPhoneNumber(phoneNumber);
        member.setPersonalInfoConsent(personalInfoConsent);
        member.setDataAnalysisConsent(dataAnalysisConsent);
        this.memberRepository.save(member);
        return member;
    }

//    public boolean isUserIdExists(String userId) {
//        return memberRepository.findByUserId(userId).isPresent();
//    }


    public Member findByUserId(String userId) {
        Optional<Member> member = memberRepository.findById(userId);
        return member.orElse(null); // 사용자가 존재하지 않으면 null 반환
    }

}