package com.company.NearTube.page;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequiredArgsConstructor
public class HomePageController {

    @RequestMapping("/")
    public String home(){
        return "home";
    }
}
