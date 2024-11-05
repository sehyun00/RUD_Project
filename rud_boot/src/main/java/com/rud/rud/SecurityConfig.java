package com.rud.rud;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.header.writers.frameoptions.XFrameOptionsHeaderWriter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // CSRF 보호 비활성화
                .authorizeHttpRequests(authorizeHttpRequests -> authorizeHttpRequests
                        .requestMatchers(new AntPathRequestMatcher("/h2-console/**")).permitAll() // H2 콘솔 접근 허용
                        .requestMatchers("/login").permitAll() // 로그인 요청 허용
                        .anyRequest().authenticated()) // 나머지 요청은 인증 필요
                .headers(headers -> headers
                        .addHeaderWriter(new XFrameOptionsHeaderWriter(
                                XFrameOptionsHeaderWriter.XFrameOptionsMode.SAMEORIGIN)))
                .formLogin(formLogin -> formLogin
                        .loginPage("/login") // 커스텀 로그인 페이지
                        .defaultSuccessUrl("/home") // 로그인 성공 후 이동할 페이지
                        .permitAll()) // 모든 사용자에게 허용
                .logout(logout -> logout
                        .logoutRequestMatcher(new AntPathRequestMatcher("/logout")) // 로그아웃 요청 매처
                        .logoutSuccessUrl("/login") // 로그아웃 성공 후 이동할 페이지
                        .invalidateHttpSession(true)); // 세션 무효화
        return http.build();
    }

    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(); // 비밀번호 암호화에 사용할 PasswordEncoder
    }
}
