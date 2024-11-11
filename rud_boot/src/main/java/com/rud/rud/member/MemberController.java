package com.rud.rud.member;

import jakarta.validation.Valid;

import lombok.Getter;
import org.apache.coyote.BadRequestException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

import lombok.RequiredArgsConstructor;

import javax.swing.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/superant")
//@CrossOrigin(origins = "http://localhost:3000")
public class MemberController {

    private final MemberService memberService;
    private final AuthenticationManager authenticationManager;

    //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ로그인 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
    @GetMapping("/login")
    public void login() {
    }

//    @PostMapping("/login")
//    public void login(@RequestParam String userId, @RequestParam String password) {
//        if (memberService.validateUserId(userId, password) == false) {
//            System.out.println("아이디 또는 비밀번호가 잘못되었습니다.");
//        }
//        System.out.println("로그인 성공");
//    }

//    @PostMapping("/login")
//    public ResponseEntity<String> login(@RequestParam String userId, @RequestParam String password) {
//        System.out.println("1");
//        try {
////             Spring Security의 AuthenticationManager를 사용하여 인증
//            Authentication authentication = authenticationManager.authenticate(
//                    new UsernamePasswordAuthenticationToken(userId, password));
//
//            // 인증 성공 시 적절한 응답 반환
//            return ResponseEntity.ok("로그인 성공");
//        } catch (AuthenticationException e) {
//            System.out.println("2");
//            // 인증 실패 시 에러 메시지 반환
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("아이디 또는 비밀번호가 잘못되었습니다.");
//        }
    }


    //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ회원 가입ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ


    @PostMapping("/signup")
    public void signup(@RequestBody MemberCreateForm memberCreateForm) {
        System.out.println("123");

        // 아이디 중복성 체크
        if (memberService.exitsByUserId(memberCreateForm.getUserId())) {
            System.out.println("1");
        } else if(!memberCreateForm.getPassword().equals(memberCreateForm.getCheckPassword())){ // 비밀번호 불일치 체크
            System.out.println("2");
        } else{ // 유효성 검사 오류가 없으면 회원 생성
            System.out.println("3");
            this.memberService.create(
                    memberCreateForm.getUserId(),
                    memberCreateForm.getPassword(),
                    memberCreateForm.getName(),
                    memberCreateForm.getEmail(),
                    memberCreateForm.getPhoneNumber(),
                    memberCreateForm.isDataAnalysisConsent(),
                    memberCreateForm.isPersonalInfoConsent()
            );
        }
    }
}