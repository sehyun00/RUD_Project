package com.rud.rud.rud;

import com.rud.rud.member.MemberService;
import com.rud.rud.wallet.Wallet;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
    public ResponseEntity<Rud> saveRud(@RequestBody Rud rud) {
        Rud savedRud = rudService.saveRud(rud);
        return ResponseEntity.ok(savedRud);
    }

    // id + 날짜 조회
    @PostMapping("/date")
    public ResponseEntity<Rud> dateRud(@RequestBody String userId, String rudDate) {
        Rud getrud = rudService.getRudByUserIdAndRudDate(userId, rudDate);
        return ResponseEntity.ok(getrud);
    }

    // id + 종목 조회
    @PostMapping("/all")
    public ResponseEntity<List<Rud>> allRud(@RequestBody String userId) {
        List<Rud> getAll = rudService.getRudByUserId(userId);
        return ResponseEntity.ok(getAll);
    }
}
