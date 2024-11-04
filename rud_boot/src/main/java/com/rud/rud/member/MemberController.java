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

        System.out.println("1");
        if (bindingResult.hasErrors()) {
            bindingResult.getAllErrors().forEach(error -> {
                System.out.println("에러: " + error.getDefaultMessage());
            });
            return "signup";
        }

        //비밀번호 불일치 체크
        if (!memberCreateForm.getPassword().equals(memberCreateForm.getCheckPassword())) {
            System.out.println("3");
            bindingResult.rejectValue("checkPassword", "passwordInCorrect",
                    "2개의 패스워드가 일치하지 않습니다.");
            return "signup";
        }
        
        //아이디 중복성 체크
        if (memberService.exitsByUserId(memberCreateForm.getUserId())) {
            System.out.println("4");
            throw new BadRequestException("이미 사용중인 아이디입니다.");
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