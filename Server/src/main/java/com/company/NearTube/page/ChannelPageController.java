package com.company.NearTube.page;

import com.company.NearTube.domain.Channel;
import com.company.NearTube.service.ChannelService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping("/channels")
public class ChannelPageController {

    private final ChannelService channelService;

    @RequestMapping("")
    public String channelList(Model model){
        List<Channel> channels = channelService.findAll();
        model.addAttribute("channels", channels);
        return "channels/list";
    }
}
