package com.rud.rud.rud;

import com.rud.rud.member.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/rud")
public class RudController {

    @Autowired
    private RudService rudService;

    @Autowired
    private MemberService memberService;

    // rud 저장
    @PostMapping("/save")
    public Rud saveRud(@RequestBody Rud rud) {
        String userId = "qwer";
        rud.setUserId(userId);

        return rudService.saveRud(rud);
    }
}
