package com.rud.rud.member;

import jakarta.validation.constraints.NotEmpty;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class MemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    public Member create(String userId, String name, String email, String password, String phoneNumber, boolean personalInfoConsent, boolean dataAnalysisConsent) {
        Member member = new Member();
        member.setUserId(userId);
        member.setPassword(passwordEncoder.encode(password));
        member.setName(name);
        member.setEmail(email);
        member.setPhoneNumber(phoneNumber);
        member.setPersonalInfoConsent(personalInfoConsent);
        member.setDataAnalysisConsent(dataAnalysisConsent);
        this.memberRepository.save(member);
        return member;
    }
}