package com.rud.rud.domain;

import jakarta.persistence.*;

import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@ToString(exclude = "memberRoleList")
public class Member {

    @Id
    private String userId; //아이디
    private String password; //비밀번호
    private String name; //이름
    private String email; //이메일
    private String phoneNumber; //전화번호
    private boolean personalInfoConsent; //개인정보동의서
    private boolean dataAnalysisConsent; //데이터활용동의서

    @ElementCollection(fetch = FetchType.LAZY)
    @Builder.Default
    private List<MemberRole> memberRoleList = new ArrayList<>(); //유저상태

    public void addDefaultRole() {
    this.memberRoleList.add(MemberRole.USER); // 기본적으로 유저권환으로 설정
}
}