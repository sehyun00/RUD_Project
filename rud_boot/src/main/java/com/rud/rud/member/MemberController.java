package com.rud.rud.member;

import com.rud.rud.member.MemberCreateForm;
import com.rud.rud.member.MemberService;
import jakarta.validation.Valid;

import org.apache.coyote.BadRequestException;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
public class MemberController {

    private final MemberService memberService;

//    @GetMapping("/superant/login")
//    public String login(@RequestBody LoginRequest loginRequest) {
//        boolean validated = memberService.validateMember(loginRequest);
//        return validated ? "success": "fail";
//    }


    @GetMapping("/superant/signup")
    public String signup(MemberCreateForm memberCreateForm) {
        return "signup";
    }

    @PostMapping("/superant/signup")
    public String signup(@Valid MemberCreateForm memberCreateForm, BindingResult bindingResult) throws BadRequestException {

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

        return "redirect:/superant/login";
    }
}