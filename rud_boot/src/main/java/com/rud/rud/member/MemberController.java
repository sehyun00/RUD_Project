package com.rud.rud.member;

import jakarta.validation.Valid;

import lombok.Getter;
import org.apache.coyote.BadRequestException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/superant")
public class MemberController {

    private final MemberService memberService;

    //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ로그인 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
    @GetMapping("/login")
    public String login() {
        return "login";
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest loginRequest) {
        String userId = loginRequest.getUserId();
        String password = loginRequest.getPassword();

        System.out.println("로그인 시도: userId = " + userId);

        if (!memberService.validateUserId(userId, password)) {
            System.out.println("아이디 또는 비밀번호가 잘못되었습니다.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("아이디 또는 비밀번호가 잘못되었습니다.");
        }

        System.out.println("로그인 성공");
        return ResponseEntity.ok("로그인 성공");
    }


    //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ회원 가입ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ


    @PostMapping("/signup")
    public void signup(@Valid @RequestBody MemberCreateForm memberCreateForm) {

        // 아이디 중복성 체크
        if (memberService.exitsByUserId(memberCreateForm.getUserId())) {
            System.out.println("1");
        }
        System.out.println(memberCreateForm.getPassword());
        System.out.println(memberCreateForm.getCheckPassword());
        // 비밀번호 불일치 체크
        if (!memberCreateForm.getPassword().equals(memberCreateForm.getCheckPassword())) {
            System.out.println("2");
        }
        System.out.println(memberCreateForm.getPassword());
        // 유효성 검사 오류가 없으면 회원 생성
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