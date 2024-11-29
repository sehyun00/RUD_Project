package com.rud.rud.config;

import com.rud.rud.controller.formatter.LocalDateFormatter;
import org.springframework.context.annotation.Configuration;
import org.springframework.format.FormatterRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

// 설정 클래스 어노테이션
@Configuration
public class CustomServletConfig implements WebMvcConfigurer {
    // 아마 세션 시간 찍히는 메소드?
    @Override
    public void addFormatters(FormatterRegistry registry) {
        registry.addFormatter(new LocalDateFormatter());
    }
}
