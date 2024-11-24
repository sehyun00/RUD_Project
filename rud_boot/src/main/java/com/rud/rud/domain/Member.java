package com.rud.rud.domain;

<<<<<<< HEAD
import com.rud.rud.dto.MemberRole;
=======
>>>>>>> back)logintest
import jakarta.persistence.*;

import lombok.*;

import java.util.ArrayList;
import java.util.List;

<<<<<<< HEAD
@Entity
=======
>>>>>>> back)logintest
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
<<<<<<< HEAD
=======
@Entity
>>>>>>> back)logintest
@ToString(exclude = "memberRoleList")
public class Member {

    @Id
<<<<<<< HEAD
    @Column(unique = true)
    private String userId;

    private String name;

    private String password;

    private String email;

    private String phoneNumber;

    private boolean personalInfoConsent;

    private  boolean dataAnalysisConsent;
=======
    private String userId;
    private String password;
    private String name;
    private String email;
    private String phoneNumber;
    private boolean personalInfoConsent;
    private boolean dataAnalysisConsent;
>>>>>>> back)logintest

    @ElementCollection(fetch = FetchType.LAZY)
    @Builder.Default
    private List<MemberRole> memberRoleList = new ArrayList<>();
<<<<<<< HEAD
    public void addRole(MemberRole role) {
        memberRoleList.add(role);
    }
    public void changePassword(String password) {
        this.password = password;
=======

    public void addRole(MemberRole memberRole) {
        memberRoleList.add(memberRole);
>>>>>>> back)logintest
    }
}