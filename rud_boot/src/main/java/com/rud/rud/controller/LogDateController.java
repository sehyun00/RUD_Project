package com.rud.rud.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class LogDateController {
    
    @GetMapping("/logdate") //로그일자 보여주기
    public String logDate(Model model) {
        return "logdate";
    }

    //해당 클릭하면 로그 일자에 맞는거 보여주기?
}

