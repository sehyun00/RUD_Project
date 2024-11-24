package com.rud.rud.controller;

import com.rud.rud.domain.Member;
<<<<<<< HEAD
import com.rud.rud.dto.MemberDTO;
import com.rud.rud.service.MemberService;
=======
import com.rud.rud.dto.MemberCreateForm;
import com.rud.rud.repository.MemberRepository;
import com.rud.rud.service.MemberService;
import jakarta.servlet.http.HttpServletResponse;
>>>>>>> back)logintest
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
<<<<<<< HEAD

    //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ회원 가입ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
    @GetMapping("/login")
    public String login() {
        return "로그인 성공";
    }



    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody @Valid MemberDTO memberDTO, BindingResult bindingResult) {
        // 아이디 중복 체크
        if (memberService.isUserIdExists(memberDTO.getUserId())) {
            bindingResult.rejectValue("userId", "existUserId", "아이디가 이미 존재합니다!");
        }

        // 비밀번호 확인
        if (!memberDTO.getPassword().equals(memberDTO.getCheckPassword())) {
            bindingResult.rejectValue("checkPassword", "passwordInCorrect", "2개의 패스워드가 일치하지 않습니다.");
        }

        // 에러가 있을 경우
        if (bindingResult.hasErrors()) {
=======
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
>>>>>>> back)logintest
            return ResponseEntity.badRequest().body(bindingResult.getAllErrors());
        }

        // 회원가입 처리
        Member member = memberService.create(
<<<<<<< HEAD
                memberDTO.getUserId(),
                memberDTO.getName(),
                memberDTO.getPassword(),
                memberDTO.getEmail(),
                memberDTO.getPhoneNumber(),
                memberDTO.isPersonalInfoConsent(),
                memberDTO.isDataAnalysisConsent()
=======
                memberCreateForm.getUserId(),
                memberCreateForm.getName(),
                memberCreateForm.getPassword(),
                memberCreateForm.getEmail(),
                memberCreateForm.getPhoneNumber(),
                memberCreateForm.isPersonalInfoConsent(),
                memberCreateForm.isDataAnalysisConsent()
>>>>>>> back)logintest
        );

        return ResponseEntity.status(HttpStatus.CREATED).body(member);
    }
}