package com.rud.rud.controller;

import com.rud.rud.domain.Member;
import com.rud.rud.dto.MemberCreateForm;
import com.rud.rud.repository.MemberRepository;
import com.rud.rud.service.MemberService;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/superant")
@CrossOrigin(origins = "http://localhost:3000")
public class MemberController {

    private final MemberService memberService;
    private final MemberRepository memberRepository;

    @GetMapping("/login")
    public void login(@RequestParam String username, @RequestParam String password, HttpServletResponse response)
    {

        System.out.println("login");

    }

    //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ회원 가입ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
    @GetMapping("/signup")
    public void signup(){
        System.out.println("signup");
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody @Valid MemberCreateForm memberCreateForm, BindingResult bindingResult) {
        // 아이디 중복 체크
        if (memberService.isUserIdExists(memberCreateForm.getUserId())) {
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
}