package com.rud.rud.member;

import jakarta.validation.Valid;

import org.apache.coyote.BadRequestException;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/superant")
public class MemberController {

    private final MemberService memberService;

    @GetMapping("/login")
    public String login() {
        return "login";
    }
    
    //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ로그인 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
    @PostMapping("/login")
    public String login(@RequestParam String userId, @RequestParam String password) {
        if (!memberService.validateUserId(userId, password)) {
            // 로그인 실패 시 처리
            System.out.println("아이디 또는 비밀번호가 잘못되었습니다.");
            return "login"; // 로그인 페이지로 반환
        }
        System.out.println("로그인 성공");
        return "success"; // 로그인 성공 시 처리
    }
    
    //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ회원 가입ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
    @GetMapping("/signup")
    public String signup(MemberCreateForm memberCreateForm) {
        return "signup";
    }
    
    @PostMapping("/signup")
    public String signup(@Valid MemberCreateForm memberCreateForm, BindingResult bindingResult) {

        // 아이디 중복성 체크
        if (memberService.exitsByUserId(memberCreateForm.getUserId())) {
            System.out.println("1");
            bindingResult.rejectValue("userId", "exitsUserId",
                    "이미 아이디가 존재합니다");
            return "signup"; // 유효성 검사 오류가 발생하면 즉시 반환
        }

        // 비밀번호 불일치 체크
        if (!memberCreateForm.getPassword().equals(memberCreateForm.getCheckPassword())) {
            System.out.println("2");
            bindingResult.rejectValue("checkPassword", "passwordInCorrect",
                    "2개의 패스워드가 일치하지 않습니다.");
            return "signup"; // 유효성 검사 오류가 발생하면 즉시 반환
        }

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

        return "redirect:/login";
    }
}