package com.company.NearTube.controller;
import com.company.NearTube.domain.Member;
import com.company.NearTube.form.UpdateLocationForm;
import com.company.NearTube.service.ChannelService;
import com.company.NearTube.service.MemberLocationService;
import com.company.NearTube.service.MemberService;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequiredArgsConstructor
public class TestController {

    private final ChannelService channelService;
    private final MemberService memberService;
    private final MemberLocationService memberLocationService;

    @GetMapping("/api/test/updateChannelInfo")
    public ResponseEntity<Object> updateChannel(){
        channelService.updateChannelInfo();
        return ResponseEntity.ok().build();
    }

    @PostMapping("/api/test/updateLocation")
    public void updateLocation(@RequestBody UpdateLocationForm form){
        // 회원 확인
        Member member = memberService.findById(form.getId()).orElseThrow(() -> new IllegalStateException("존재하지 않는 회원입니다."));
        memberLocationService.updateMemberLocation(member, form.getLocations());
    }

}
