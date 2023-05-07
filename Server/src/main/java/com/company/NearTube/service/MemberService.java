package com.company.NearTube.service;

import com.company.NearTube.domain.Member;
import com.company.NearTube.form.CreateMemberForm;
import com.company.NearTube.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;

    public Optional<Member> findById(String id){
        return memberRepository.findById(id);
    }
    @Transactional
    public void createMember(CreateMemberForm form){
        memberRepository.findById(form.getId()).ifPresent(member -> {
            throw new IllegalStateException("이미 존재하는 회원입니다.");
        });

        Member member = Member.createEntity(form);
        memberRepository.save(member);
    }
}
