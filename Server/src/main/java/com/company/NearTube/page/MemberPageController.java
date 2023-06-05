package com.company.NearTube.page;

import com.company.NearTube.domain.Member;
import com.company.NearTube.dto.ClusterDto;
import com.company.NearTube.service.MemberService;
import com.company.NearTube.service.ClusterService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping("/members")
public class MemberPageController {
    private final MemberService memberService;
    private final ClusterService clusterService;

    @RequestMapping("")
    public String memberList(Model model){
        List<Member> members = memberService.findAll();
        model.addAttribute("members", members);

        return "members/list";
    }

    @RequestMapping("/{id}/recommend")
    public String memberRecommend(@PathVariable("id") String id, Model model){
        Member member = memberService.findById(id).get();
        ClusterDto cluster = clusterService.clusterByLocation(member);
        model.addAttribute("member", member);
        model.addAttribute("cluster", cluster);

        return "members/recommend";
    }
}
