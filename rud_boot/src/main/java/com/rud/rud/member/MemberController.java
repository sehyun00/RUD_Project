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
    public void signup(@RequestBody @Valid MemberCreateForm memberCreateForm, BindingResult bindingResult) {
        System.out.println("123");

        if(bindingResult.hasErrors()) {
            System.out.println("오류발생");
        }
        if (memberCreateForm.getUserId().equals(memberService.existsByUserId(memberCreateForm.getUserId()))) {
            bindingResult.rejectValue("userId", "userIdExists", "이미 사용 중인 아이디입니다.");
        }

        // 비밀번호 확인
        if(!memberCreateForm.getPassword().equals(memberCreateForm.getCheckPassword())){
            bindingResult.rejectValue("checkPassword", "passwordInCorrect",
                    "2개의 패스워드가 일치하지 않습니다.");
        }

        // 에러가 없을 경우 회원가입 처리
        if (!bindingResult.hasErrors()) {
            try {
                memberService.create(memberCreateForm.getUserId(), memberCreateForm.getName(), memberCreateForm.getPassword(),
                        memberCreateForm.getEmail(), memberCreateForm.getPhoneNumber(), memberCreateForm.isDataAnalysisConsent(), memberCreateForm.isPersonalInfoConsent());
            } catch (DataIntegrityViolationException e) {
                e.printStackTrace();
                bindingResult.reject("signupFailed", "이미 등록된 사용자입니다.");
            } catch (Exception e) {
                e.printStackTrace();
                bindingResult.reject("signupFailed", e.getMessage());
            }
        }
    }

}