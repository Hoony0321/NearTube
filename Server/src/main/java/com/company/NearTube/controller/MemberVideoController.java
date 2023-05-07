package com.company.NearTube.controller;

import com.company.NearTube.domain.Member;
import com.company.NearTube.domain.Video;
import com.company.NearTube.form.CreateVideoForm;
import com.company.NearTube.service.MemberService;
import com.company.NearTube.service.MemberVideoService;
import com.company.NearTube.service.VideoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequiredArgsConstructor
public class MemberVideoController {

    private final MemberService memberService;
    private final VideoService videoService;
    private final MemberVideoService memberVideoService;


    @PostMapping("/api/members/{id}/videos")
    public ResponseEntity<Object> addMemberVideo(@PathVariable("id") String memberId, @RequestBody CreateVideoForm form){
        //회원 확인
        Optional<Member> findMember = memberService.findById(memberId);
        if(findMember.isEmpty()) throw new IllegalStateException("존재하지 않는 회원입니다.");
        Member member = findMember.get();

        //비디오 확인
        Optional<Video> findVideo = videoService.findById(form.getId());
        if(findVideo.isEmpty()) videoService.createVideo(form);
        Video video = videoService.findById(form.getId()).get();

        //회원 영상 목록에 추가
        memberVideoService.addMemberVideo(member, video);
        return ResponseEntity.ok().build();
    }
}
