package com.company.NearTube.controller;

import com.company.NearTube.domain.Member;
import com.company.NearTube.dto.ClusterDto;

import com.company.NearTube.service.MemberService;
import com.company.NearTube.service.ClusterService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@Slf4j
@RestController
@RequiredArgsConstructor
public class ClusterController {

    private final MemberService memberService;
    private final ClusterService clusterService;

    @GetMapping("/api/members/{id}/cluster")
    public ResponseEntity<Object> clustering(@PathVariable("id") String id){
        Optional<Member> findOne = memberService.findById(id);
        if(findOne.isEmpty()){
            return ResponseEntity.notFound().build();
        }
        Member targetMember = findOne.get();

        ClusterDto clusterDto = clusterService.clusterByLocation(targetMember);

        return ResponseEntity.ok(clusterDto);
    }

    @GetMapping("/api/clusters/search")
    public ResponseEntity<Object> recommend(@RequestParam("location") String location, @RequestParam("job") String job){

        Optional<ClusterDto> clusterDto = clusterService.searchCluster(location, job);
        if(clusterDto.isEmpty()){
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(clusterDto.get());
    }
}
