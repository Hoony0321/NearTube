package com.company.NearTube.controller;

import com.company.NearTube.domain.Member;
import com.company.NearTube.dto.ClusterDto;
import com.company.NearTube.service.ChannelService;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequiredArgsConstructor
public class TestController {

    private final ChannelService channelService;

    @GetMapping("/api/test/updateChannelInfo")
    public ResponseEntity<Object> updateChannel(){
        channelService.updateChannelInfo();
        return ResponseEntity.ok().build();
    }
}
