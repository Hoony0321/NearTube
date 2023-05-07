package com.company.NearTube.service;

import com.company.NearTube.domain.Video;
import com.company.NearTube.form.CreateVideoForm;
import com.company.NearTube.repository.VideoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class VideoService {

    private final VideoRepository videoRepository;

    //TODO : 에러 처리
    public Optional<Video> findById(String id){
        return videoRepository.findById(id);
    }

    @Transactional
    public String createVideo(CreateVideoForm form){
        //동일한 비디오 id 존재 시 에러 반환
        videoRepository.findById(form.getId()).ifPresent(video -> {
            throw new IllegalStateException("이미 존재하는 비디오입니다.");
        });

        Video video = Video.createEntity(form);
        videoRepository.save(video);

        return video.getId();
    }
}
