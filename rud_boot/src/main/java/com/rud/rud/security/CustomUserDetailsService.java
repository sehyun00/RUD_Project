package com.rud.rud.security;

import com.rud.rud.domain.Member;
import com.rud.rud.dto.MemberDTO;
import com.rud.rud.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

@Service
@Log4j2
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final MemberRepository memberRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        log.info("Loading user details for username: {}", username);

        Member member = memberRepository.getWithRoles(username);

        if (member == null) {
            log.error("User not found with username: {}", username);
            throw new UsernameNotFoundException("User not found with username: " + username);
        }

        MemberDTO memberDTO = new MemberDTO(
                member.getUserId(),
                member.getPassword(),
                member.getName(),
                member.getEmail(),
                member.getPhoneNumber(),
                member.isPersonalInfoConsent(),
                member.isDataAnalysisConsent(),
                member.getMemberRoleList()
                        .stream()
                        .map(memberRole -> memberRole.name())
                        .collect(Collectors.toList())
        );

        log.info("User details loaded successfully: {}", memberDTO);
        return memberDTO;
    }
}