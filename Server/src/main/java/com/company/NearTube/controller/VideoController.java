package com.company.NearTube.controller;

import com.company.NearTube.form.CreateVideoForm;
import com.company.NearTube.service.VideoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class VideoController {

    private final VideoService videoService;

    @GetMapping("/videos")
    public ResponseEntity<Object> addVideo(@RequestBody CreateVideoForm form){
        videoService.createVideo(form);
        return ResponseEntity.ok().build();
    }
}
