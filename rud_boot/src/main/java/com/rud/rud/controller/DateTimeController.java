package com.rud.rud.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;


@RestController
public class DateTimeController {

    @GetMapping("/datetime")
    public Map<String, String> getCurrentDateTime() {
        LocalDateTime now = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        String formattedDateTime = now.format(formatter);

        Map<String, String> response = new HashMap<>();
        response.put("currentDateTime", formattedDateTime);
        System.out.println(formattedDateTime);
        return response; // JSON 형식으로 반환
    }

   
    
}
