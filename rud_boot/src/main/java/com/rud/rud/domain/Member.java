package com.rud.rud.domain;

import com.rud.rud.dto.MemberRole;
import jakarta.persistence.*;

import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString(exclude = "memberRoleList")
public class Member {

    @Id
    @Column(unique = true)
    private String userId;

    private String name;

    private String password;

    private String email;

    private String phoneNumber;

    private boolean personalInfoConsent;

    private  boolean dataAnalysisConsent;

    @ElementCollection(fetch = FetchType.LAZY)
    @Builder.Default
    private List<MemberRole> memberRoleList = new ArrayList<>();
    public void addRole(MemberRole role) {
        memberRoleList.add(role);
    }
    public void changePassword(String password) {
        this.password = password;
    }
}