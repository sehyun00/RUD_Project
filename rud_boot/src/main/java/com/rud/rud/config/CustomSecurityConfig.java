package com.rud.rud.config;

import com.rud.rud.security.filter.JWTCheckFilter;
import com.rud.rud.security.handler.APILoginFailHandler;
import com.rud.rud.security.handler.APILoginSuccessHandler;
import com.rud.rud.security.handler.CustomAccessDeniedHandler;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.header.writers.frameoptions.XFrameOptionsHeaderWriter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@Log4j2
@RequiredArgsConstructor
@EnableMethodSecurity
@EnableWebSecurity
public class CustomSecurityConfig {

    // 비밀번호 해싱 메소드
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    //
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        log.info("-----------------security config---------------------------------");
        // 코로스 설정
        http.cors(httpSecurityCorsConfigurer -> {
                    httpSecurityCorsConfigurer.configurationSource(corsConfigurationSource());
                });
        // 세션 관리
        http.sessionManagement(sessionConfig -> sessionConfig.
                sessionCreationPolicy(SessionCreationPolicy.STATELESS));
        // csrf 비활성
        http.csrf(AbstractHttpConfigurer::disable);
        // 헤더 설정
        http.headers(headers -> headers
                .addHeaderWriter(new XFrameOptionsHeaderWriter(
                        XFrameOptionsHeaderWriter.XFrameOptionsMode.SAMEORIGIN)));
        // 폼 로그인 설정
        http.formLogin(config -> {
            config.loginPage("/superant/login");
            config.successHandler(new APILoginSuccessHandler());
            config.failureHandler(new APILoginFailHandler());
        });

        //추후 jwt로 해결하기
        http.addFilterBefore(new JWTCheckFilter(),
                UsernamePasswordAuthenticationFilter.class);
        // 접근 거부 핸들러
        http.exceptionHandling(config-> {
            config.accessDeniedHandler(new CustomAccessDeniedHandler());
        });


        return http.build();
    }

    @Bean
    AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    // 코로스 설정
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        // 3000에서의 요청만 허용
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000"));
        // 허용할 메서드 설정
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        // 허용할 헤더 설정
        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Cache-Control", "Content-Type"));
        // 노출할 헤더 설정
        configuration.setExposedHeaders(Arrays.asList("Authorization")); // Authorization 헤더를 노출
        // 자격 증명 포함하도록 설정
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
