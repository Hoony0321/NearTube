package com.company.NearTube.controller;

import com.company.NearTube.domain.Member;
import com.company.NearTube.form.CreateMemberForm;
import com.company.NearTube.service.MemberService;
import com.company.NearTube.service.SubscriptionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;
    private final SubscriptionService subscriptionService;

    @GetMapping("/api/members/{id}")
    public ResponseEntity<Object> getMemberById(@PathVariable("id") String id){
        Optional<Member> findOne = memberService.findById(id);
        if(findOne.isEmpty()){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(findOne.get());
    }

    @PostMapping("/api/members")
    public ResponseEntity<Object> createMember(@RequestBody CreateMemberForm form){
        memberService.createMember(form);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/api/members/{id}")
    public ResponseEntity<Object> deleteMember(@PathVariable("id") String id){
        memberService.deleteMember(id);
        return ResponseEntity.ok().build();
    }

}
