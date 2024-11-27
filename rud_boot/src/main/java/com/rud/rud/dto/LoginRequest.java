package com.rud.rud.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginRequest {

    private String username;  // 사용자 아이디
    private String password;  // 사용자 비밀번호

}
