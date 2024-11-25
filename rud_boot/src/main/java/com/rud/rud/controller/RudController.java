//package com.rud.rud.controller;
//
//import com.rud.rud.domain.Member;
//import com.rud.rud.service.MemberService;
//import com.rud.rud.domain.Rud;
//import com.rud.rud.service.RudService;
//import lombok.RequiredArgsConstructor;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.*;
//
//import java.security.Principal;
//import java.sql.Date;
//import java.util.List;
//
//@RequiredArgsConstructor
//@RestController
//@RequestMapping("/superant")
//public class RudController {
//
////    @Autowired
////    private RudService rudService;
//
//    @Autowired
//    private MemberService memberService;
//
//    //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ로그 db에 저장ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
//    @GetMapping("/rud")
//    public void rud() {
//        System.out.println();
//    }
//
////    @PostMapping("/rud")
////    public void saveRud(List<Rud> rud, Principal principal) {
////        System.out.println("리밸런싱 로그 저장 요청 수신");
////
////        String currentUserId = principal.getName(); // 사용자 이름이 userId라고 가정
////        Member userId = memberService.findByUserId(currentUserId);
////
////        Date rebalancingDate = Date.valueOf("2024-11-11"); // 예시 날짜
////
////        rudService.create(rud);
////
////    }
//
//
////    @PostMapping
////    public ResponseEntity<String> saveRud(@Valid @RequestBody List<RudData> rudDataList, Principal principal) {
////        System.out.println("리밸런싱 로그 저장 요청 수신");
////
////        // 현재 로그인한 사용자 정보를 가져오기
////        String currentUserId = principal.getName(); // 사용자 이름이 userId라고 가정
////        Member userId = memberService.findByUserId(currentUserId);
////
////        return ResponseEntity.ok("리밸런싱 로그가 성공적으로 저장되었습니다.");
////    }
//
//
//    //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ로그 불러오기ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
////    @GetMapping("/log")
////    public String log(){
////        return "log_form";
////    }
////
////    @GetMapping("/log/{reblancingDate}")
////    public void loadRudLog(@PathVariable Date reblancingDate, Principal principal) {
////        if(rudService.show(reblancingDate, userId) == null){
////            System.out.println("1");
////        }
////        System.out.println("2");
////    }
//
//
//}
