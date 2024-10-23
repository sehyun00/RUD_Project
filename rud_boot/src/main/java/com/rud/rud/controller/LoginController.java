package com.rud.rud.controller;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class LoginController {

    @GetMapping("/login")
    public String login() {
        System.out.println("제발되라");
        return "login"; 
    }

    //회원가입
    @GetMapping("/signup")
    public String signup(Model model) {
        return new String();
    }
    
    
}
