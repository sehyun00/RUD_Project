package com.rud.rud.member;

import jakarta.validation.Valid;

import lombok.Getter;
import org.apache.coyote.BadRequestException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import lombok.RequiredArgsConstructor;

import javax.swing.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/superant")
@CrossOrigin(origins = "http://localhost:3000")
public class MemberController {

    private final MemberService memberService;
    private final MemberRepository memberRepository;

    //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ회원 가입ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ



    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody @Valid MemberCreateForm memberCreateForm, BindingResult bindingResult) {
        // 아이디 중복 체크
        if (memberService.isUserIdExists(memberCreateForm.getUserId())) {
            System.out.println("userIdError");
            bindingResult.rejectValue("userId", "existUserId", "아이디가 이미 존재합니다!");
        }
        // 에러가 있을 경우
        if (bindingResult.hasErrors()) {
            System.out.println("1111");
            return ResponseEntity.badRequest().body(bindingResult.getAllErrors());
        }

        // 회원가입 처리
        Member member = memberService.create(
                memberCreateForm.getUserId(),
                memberCreateForm.getName(),
                memberCreateForm.getPassword(),
                memberCreateForm.getEmail(),
                memberCreateForm.getPhoneNumber(),
                memberCreateForm.isPersonalInfoConsent(),
                memberCreateForm.isDataAnalysisConsent()
        );

        return ResponseEntity.status(HttpStatus.CREATED).body(member);
    }

//    public boolean isUserIdExists(String userId) {
//        return memberRepository.findByUserId(userId).isPresent();
//    }
}