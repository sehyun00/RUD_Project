package com.rud.rud.dto;

<<<<<<< HEAD
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;

=======
>>>>>>> back)logintest
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
<<<<<<< HEAD

    private String userId;
    private String password;
    private String checkPassword;
=======
    private String userId;
    private String password;
>>>>>>> back)logintest
    private String name;
    private String email;
    private String phoneNumber;
    private boolean personalInfoConsent;
<<<<<<< HEAD
    private boolean dataAnalysisConsent;

    private List<String> roleNames = new ArrayList<>();

    public MemberDTO(String userId, String password, String name, String email, String phoneNumber, boolean personalInfoConsent, boolean dataAnalysisConsent,List<String> roleNames) {
        super(
                userId,
                password,
                roleNames.stream().map(str -> new SimpleGrantedAuthority("ROLE_"+str)).collect(Collectors.toList()));

=======
    private  boolean dataAnalysisConsent;
    private List<String> roleNames = new ArrayList<String>();

    public MemberDTO(String userId, String email, String password, String name, String phoneNumber, boolean personalInfoConsent,
                     boolean dataAnalysisConsent, List<String> roleNames) {
        super(
                userId,
                password,
                roleNames.stream().map(str -> new
                        SimpleGrantedAuthority("Role_"+str)).collect(Collectors.toList()));
>>>>>>> back)logintest
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
<<<<<<< HEAD

        Map<String, Object> dataMap = new HashMap<>();

        dataMap.put("userId", userId);
        dataMap.put("password",password);
        dataMap.put("name", name);
=======
        Map<String, Object> dataMap = new HashMap<>();

        dataMap.put("userId", userId);
        dataMap.put("name", name);
        dataMap.put("email", email);
>>>>>>> back)logintest
        dataMap.put("phoneNumber", phoneNumber);
        dataMap.put("personalInfoConsent", personalInfoConsent);
        dataMap.put("dataAnalysisConsent", dataAnalysisConsent);
        dataMap.put("roleNames", roleNames);

        return dataMap;
    }
<<<<<<< HEAD

}
=======
}
>>>>>>> back)logintest
