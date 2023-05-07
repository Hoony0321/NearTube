package com.company.NearTube.service;

import com.company.NearTube.domain.Member;
import com.company.NearTube.domain.MemberVideo;
import com.company.NearTube.domain.Video;
import com.company.NearTube.repository.MemberVideoRepository;
import jakarta.persistence.LockModeType;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MemberVideoService {

    private final MemberVideoRepository memberVideoRepository;
    private final int maxMemberVideoSize = 30;

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Transactional
    public void addMemberVideo(Member member, Video video) {
        MemberVideo memberVideo = MemberVideo.createEntity(member, video);
        member.addMemberVideo(memberVideo);

        memberVideoRepository.save(memberVideo);

        if(member.getMemberVideos().size() > maxMemberVideoSize){ //정해진 크기를 초과했을 경우
            //get last memberVideo
            MemberVideo lastMemberVideo = member.getMemberVideos().get(member.getMemberVideos().size() - 1);
            member.removeMemberVideo(lastMemberVideo);
            memberVideoRepository.delete(lastMemberVideo);
        }
    }
}
