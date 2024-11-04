package com.rud.rud.member;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@RequiredArgsConstructor
@Service
public class MemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;


    @Transactional
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

    @Transactional
    public boolean exitsByUserId(String userId){
        return memberRepository.existsByUserId(userId);
    }

}