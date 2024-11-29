package com.rud.rud.security;

import java.util.stream.Collectors;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import com.rud.rud.domain.Member;
import  com.rud.rud.dto.MemberDTO;
import  com.rud.rud.repository.MemberRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
/*
* 로그인할 때 사용자가 userId가 db에 있다면 해당 userId의 상태를 member에 저장하고 상태가 있다면 해당 아이디의 정보를
* 불러온다.
*/
@Service
@Log4j2
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService{

    private final MemberRepository memberRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException{
        log.info("-----------------------loadUsername---------------------");
        log.info(username);
        Member member = memberRepository.getWithRoles(username);
        log.info(member);
        log.info(member == null);
        if(member == null){
            throw new UsernameNotFoundException("Not Found");
        }
        MemberDTO memberDTO = new MemberDTO(
                member.getUserId(),
                member.getEmail(),
                member.getPassword(),
                member.getName(),
                member.getPhoneNumber(),
                member.isDataAnalysisConsent(),
                member.isDataAnalysisConsent(),
                member.getMemberRoleList().stream()
                        .map(memberRole -> memberRole.name()).collect(Collectors.toList()));
        log.info(memberDTO);
        return memberDTO;
    }
}
