package com.company.NearTube.service;

import com.company.NearTube.domain.Location;
import com.company.NearTube.domain.Member;
import com.company.NearTube.domain.MemberLocation;
import com.company.NearTube.form.CreateMemberForm;
import com.company.NearTube.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final LocationService locationService;

    public List<Member> findAll() {
        List<Member> members = memberRepository.findAll();
        Collections.sort(members, Comparator.comparing(Member::getId));
        return memberRepository.findAll();
    }

    public Optional<Member> findById(String id){
        return memberRepository.findById(id);
    }
    @Transactional
    public void createMember(CreateMemberForm form){
        memberRepository.findById(form.getId()).ifPresent(member -> {
            throw new IllegalStateException("이미 존재하는 회원입니다.");
        });

        Member member = Member.createEntity(form);

        List<Location> locations = locationService.findAll();
        for(Location location : locations){
            MemberLocation memberLocation = MemberLocation.createEntity(member, location);
            member.addMemberLocation(memberLocation);
        }

        memberRepository.save(member);
    }
}
