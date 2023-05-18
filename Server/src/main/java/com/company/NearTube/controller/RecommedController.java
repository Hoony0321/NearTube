package com.company.NearTube.controller;

import com.company.NearTube.domain.Member;
import com.company.NearTube.service.KMeanService;
import com.company.NearTube.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@Slf4j
@RestController
@RequiredArgsConstructor
public class RecommedController {

    private final MemberService memberService;
    private final KMeanService kMeanService;

    @GetMapping("/api/members/{id}/recommend")
    public ResponseEntity<Object> recommend(@PathVariable("id") String id){
        Optional<Member> findOne = memberService.findById(id);
        if(findOne.isEmpty()){
            return ResponseEntity.notFound().build();
        }

        Member targetMember = findOne.get();
        kMeanService.clustering(targetMember);

        return ResponseEntity.ok(findOne.get());
    }
}