package com.rud.rud.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class LoginController {

    @GetMapping("/login")//로그인?
    public String login() {
        return "login";
    }

    @GetMapping("/loginfailed") //로그인 실패
    public String loginerror(Model model) {
        model.addAttribute("error", "true");
        return "login";
    }

    @GetMapping("/logout") //로그아웃
    public String logout(Model model) {
        return "login";
    }

    @GetMapping("/signup") //회원가입
    public String signup(Model model){
        return "login";
    }
}
