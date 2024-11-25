package com.rud.rud.member;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
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
}