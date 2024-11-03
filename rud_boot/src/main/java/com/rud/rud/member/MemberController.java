package com.rud.rud.member;

import com.rud.rud.member.MemberCreateForm;
import com.rud.rud.member.MemberService;
import jakarta.validation.Valid;

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
     // 이거 고장
    @PostMapping("/superant/signup")
    public String signup(@Valid MemberCreateForm memberCreateForm, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return "signup_form";
        }

        if (!memberCreateForm.getPassword().equals(memberCreateForm.getCheckPassword())) {
            bindingResult.rejectValue("checkPassword", "passwordInCorrect",
                    "2개의 패스워드가 일치하지 않습니다.");
            return "signup_form";
        }

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