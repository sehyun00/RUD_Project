package com.rud.rud.domain.db;

import lombok.Data;
@Data
public class MemberDTO {

    private String id;
    private String password;
    private String email;
    private String name;
    private int phonenumber;
    private boolean personalInfoConsent;
    private boolean dataAnalysisConsent;
    
}
