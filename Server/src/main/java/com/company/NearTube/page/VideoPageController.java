package com.company.NearTube.page;

import com.company.NearTube.domain.Video;
import com.company.NearTube.service.VideoService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping("/videos")
public class VideoPageController {
    private final VideoService videoService;

    @RequestMapping("")
    public String videoList(Model model){
        List<Video> videos = videoService.findAll();
        model.addAttribute("videos", videos);
        return "videos/list";
    }
}
