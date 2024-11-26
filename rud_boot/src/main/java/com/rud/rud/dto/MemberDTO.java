package com.rud.rud.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Getter
@Setter
@ToString
public class MemberDTO extends User {
    private String userId;
    private String password;
    private String name;
    private String email;
    private String phoneNumber;
    private boolean personalInfoConsent;
    private  boolean dataAnalysisConsent;
    private List<String> roleNames = new ArrayList<String>();

    public MemberDTO(String userId, String email, String password, String name, String phoneNumber, boolean personalInfoConsent,
                     boolean dataAnalysisConsent, List<String> roleNames) {
        super(
                userId,
                password,
                roleNames.stream().map(str -> new
                        SimpleGrantedAuthority("Role_"+str)).collect(Collectors.toList()));
        this.userId = userId;
        this.password = password;
        this.name = name;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.personalInfoConsent = personalInfoConsent;
        this.dataAnalysisConsent = dataAnalysisConsent;
        this.roleNames = roleNames;
    }

    public Map<String, Object> getClaims() {
        Map<String, Object> dataMap = new HashMap<>();

        dataMap.put("userId", userId);
        dataMap.put("name", name);
        dataMap.put("email", email);
        dataMap.put("phoneNumber", phoneNumber);
        dataMap.put("personalInfoConsent", personalInfoConsent);
        dataMap.put("dataAnalysisConsent", dataAnalysisConsent);
        dataMap.put("roleNames", roleNames);

        return dataMap;
    }
}
