package com.company.NearTube.controller;

import com.company.NearTube.domain.Channel;
import com.company.NearTube.domain.Member;
import com.company.NearTube.domain.Subscription;
import com.company.NearTube.form.CreateSubscriptionForm;
import com.company.NearTube.service.ChannelService;
import com.company.NearTube.service.MemberService;
import com.company.NearTube.service.SubscriptionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
public class SubscriptionController {

    private final SubscriptionService subscriptionService;
    private final ChannelService channelService;
    private final MemberService memberService;

    @PostMapping("/api/members/{id}/subscriptions")
    public ResponseEntity<Object> addSubscription(@PathVariable("id") String memberId, @RequestBody List<CreateSubscriptionForm> forms){
        //회원 확인
        Optional<Member> findMember = memberService.findById(memberId);
        if(findMember.isEmpty()) throw new IllegalStateException("존재하지 않는 회원입니다.");
        Member member = findMember.get();

        //구독 리스트에 추가
        subscriptionService.addSubscriptions(member, forms);

        return ResponseEntity.ok().build();
    }
}
