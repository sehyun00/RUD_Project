package com.rud.rud.rud;

import com.rud.rud.member.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
    public ResponseEntity<Rud> saveRud(@RequestBody Rud rud) {
        Rud savedRud = rudService.saveRud(rud);
        return ResponseEntity.ok(savedRud);
    }
}
