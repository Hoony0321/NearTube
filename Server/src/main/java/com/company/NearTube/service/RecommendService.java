package com.company.NearTube.service;

import com.company.NearTube.domain.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RecommendService {

    private final KMeanService kMeanService;
    private final MemberService memberService;

    public List<Member> recommendOnlyLocation(Member targetMember){
        List<Member>[] clusters = kMeanService.clustering();

        List<Member> targetCluster = new ArrayList<>();

        for(List<Member> cluster : clusters){
            if(cluster.contains(targetMember)){
                targetCluster = cluster;
                break;
            }
        }

        return targetCluster;
    }
}
