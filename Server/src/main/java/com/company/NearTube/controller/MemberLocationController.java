package com.company.NearTube.controller;

import com.company.NearTube.domain.Member;
import com.company.NearTube.domain.MemberLocation;
import com.company.NearTube.dto.MemberLocationResponse;
import com.company.NearTube.form.CreateMemberLocationRequestForm;
import com.company.NearTube.form.Point;
import com.company.NearTube.service.MemberLocationService;
import com.company.NearTube.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequiredArgsConstructor
@Slf4j
public class MemberLocationController {
    private final MemberService memberService;
    private final MemberLocationService memberLocationService;

    @PostMapping("/api/members/{id}/locations")
    public ResponseEntity<Object> addMemberLocation(@PathVariable("id") String id, @RequestBody CreateMemberLocationRequestForm form){
        Optional<Member> findOne = memberService.findById(id);
        if(findOne.isEmpty()){
            return ResponseEntity.notFound().build();
        }
        Member member = findOne.get();
        Point point = new Point(form.getLatitude(), form.getLongitude());

        log.info("member: {}, point: {}", member, point);

        MemberLocation memberLocation = memberLocationService.countMemberLocation(member, point);
        MemberLocationResponse response = null;
        if(memberLocation == null){
            response = new MemberLocationResponse("NONE", 0);
        }
        else{
            response = new MemberLocationResponse(memberLocation.getLocation().getName(), memberLocation.getCount());
        }

        return ResponseEntity.ok(response);
    }

}
