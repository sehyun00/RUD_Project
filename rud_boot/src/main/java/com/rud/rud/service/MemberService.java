package com.rud.rud.service;

import com.rud.rud.domain.Member;
import com.rud.rud.domain.MemberRole;
import com.rud.rud.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
@Transactional
public class MemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    public Member create(String userId, String name, String password, String email, String phoneNumber, boolean personalInfoConsent, boolean dataAnalysisConsent) {
        // 회원 존재 여부 체크
        if (memberRepository.findById(userId).isPresent()) {
            throw new IllegalArgumentException("이미 존재하는 사용자 ID입니다.");
        }

        // Member 객체 생성 및 필드 설정
        Member member = new Member();
        member.setUserId(userId);
        member.setName(name);
        member.setPassword(passwordEncoder.encode(password));
        member.setEmail(email);
        member.setPhoneNumber(phoneNumber);
        member.setPersonalInfoConsent(personalInfoConsent);
        member.setDataAnalysisConsent(dataAnalysisConsent);

        // 기본 역할 추가
        member.addDefaultRole();

        // DB에 저장
        memberRepository.save(member);

        return member;
    }

    public boolean isUserIdExists(String userId) {
        return memberRepository.findById(userId).isPresent();
    }
}
