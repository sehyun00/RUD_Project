package com.rud.rud.controller;

import com.rud.rud.domain.Member;
import com.rud.rud.dto.MemberCreateForm;
import com.rud.rud.repository.MemberRepository;
import com.rud.rud.service.MemberService;
import com.rud.rud.util.JWTUtil;
import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import lombok.RequiredArgsConstructor;

import java.util.HashMap;
import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping("/superant")
@CrossOrigin(origins = "http://localhost:3000")
public class MemberController {

    private final MemberService memberService;
    private final MemberRepository memberRepository;
    private final AuthenticationManager authenticationManager;

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

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody  Map<String, String> loginRequest) {
        String userId = loginRequest.get("userId");
        String password = loginRequest.get("password");

        // 사용자 인증
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(userId, password));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        // JWT 생성
        Map<String, Object> claims = new HashMap<>();
        claims.put("userId", userId);
        claims.put("email", authentication.getName()); // 예시로 이메일을 추가

        // JWT 생성 로직
        String token = JWTUtil.generateToken(claims, 60); // 60분 후 만료

        return ResponseEntity.ok(Map.of("token", token)); // JWT 반환
    }
}