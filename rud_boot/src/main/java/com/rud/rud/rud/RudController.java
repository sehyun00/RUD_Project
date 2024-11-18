package com.rud.rud.rud;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;

@RequiredArgsConstructor
@RestController
@RequestMapping("/superant/rud")
public class RudController {

    private final RudService rudService;

    //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡOCR 배열 받아서 표로 보여주기ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ



    //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ로그 db에 저장ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
    @GetMapping
    public String rud() {
        System.out.println();
        return "rud_form";
    }

    @PostMapping
    public ResponseEntity<String> saveRud(@Valid @RequestBody Rud rud) {
        System.out.println("리밸런싱 로그 저장 요청 수신");

        // 서비스 메서드를 호출하여 로그 저장
        this.rudService.create(
                rud.getRebalancingDate(),
                rud.getUserId(),
                rud.getWon(),
                rud.getDollar(),
                rud.getStockName(),
                rud.getNos(),
                rud.getMarketOrder(),
                rud.getExpertPer()
        );

        return ResponseEntity.ok("리밸런싱 로그가 성공적으로 저장되었습니다.");
    }
    
    //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ로그 불러오기ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
    @GetMapping("/log")
    public String log(){
        return "log_form";
    }

    @GetMapping("/log/{reblancingDate}")
    public String loadRudLog(@PathVariable Date reblancingDate) {
        return "rudLog_form";
    }


}
