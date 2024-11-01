package com.rud.rud.member;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String userId;

    private String name;

    private String password;


    private String email;

    private String phoneNumber;

    @Column(unique = true)
    private boolean personalInfoConsent;

    @Column(unique = true)
    private  boolean dataAnalysisConsent;
}