package com.rud.rud;

import com.rud.rud.domain.Member;
import com.rud.rud.repository.MemberRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class RudApplicationTests {

	@Autowired
	private MemberRepository memberRepository;

	@Test
	void loginTest(){
		Member member = new Member();
		member.setUserId("qwer");
		member.setPassword("123456");
		member.setEmail("qwer@naver.com");
		member.setName("qwer");
		member.setPhoneNumber("123412341234");
		member.setDataAnalysisConsent(true);
		member.setPersonalInfoConsent(true);
		this.memberRepository.save(member);
	}

	@Test
	void contextLoads() {
	}

}
