package com.rud.rud.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class RebalancingController {
    @GetMapping("/rebalancing") //처음 화면 가져오기?
    public String rebalancing(Model model) {
        return "rebalancing";
    }

    @PostMapping("/reblancing") //사진 넣기??
    public String upload_Image(Model model) {
        return "rebalancing";
    }

    @PostMapping("/reblancing") // 희망 비율 입력하기
    public String enter_Rate(Model model) {
        return "rebalancing";
    }

    @GetMapping("/reblancing") //결과 값 보여주기
    public String show_Result(Model model) {
        return "rebalancing";
    }
}
