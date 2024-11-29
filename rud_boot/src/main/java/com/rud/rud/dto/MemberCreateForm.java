package com.rud.rud.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;

import lombok.Getter;
import lombok.Setter;
/*코드설명
 * 회원가입 폼
 * */
@Getter
@Setter
public class MemberCreateForm {

    @NotEmpty(message = "사용자 id는 필수항목입니다.")
    private String userId;

    @NotEmpty(message = "비밀번호는 필수항목입니다.")
    private String password;

    @NotEmpty(message = "비밀번호 확인은 필수항목입니다.")
    private String checkPassword;

    @NotEmpty(message = "이메일은 필수항목입니다.")
    @Email
    private String email;

    @NotEmpty(message = "사용자 이름은 필수항목입니다.")
    private String name;

    @NotEmpty(message = "사용자 전화번호은 필수항목입니다.")
    private String phoneNumber;

    private boolean personalInfoConsent;

    private boolean dataAnalysisConsent;

}