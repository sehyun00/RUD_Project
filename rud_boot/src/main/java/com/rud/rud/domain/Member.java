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
    private String userId;
    private String password;
    private String name;
    private String email;
    private String phoneNumber;
    private boolean personalInfoConsent;
    private boolean dataAnalysisConsent;

    @ElementCollection(fetch = FetchType.LAZY)
    @Builder.Default
    private List<MemberRole> memberRoleList = new ArrayList<>();

//    public void addRole(MemberRole memberRole) {
//        memberRoleList.add(memberRole);
//    }
    public void addDefaultRole() {
    this.memberRoleList.add(MemberRole.USER);
}
}