package com.company.NearTube.service;

import com.company.NearTube.domain.Member;
import com.company.NearTube.domain.Subscription;
import com.company.NearTube.form.CreateSubscriptionForm;
import com.company.NearTube.repository.SubscriptionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class SubscriptionService {

    private final SubscriptionRepository subscriptionRepository;

    @Transactional
    public void addSubscription(Member member, CreateSubscriptionForm form){
        Subscription subscription = Subscription.createEntity(form);
        subscription.setMember(member);
        member.addSubscription(subscription);
        subscriptionRepository.save(subscription);
    }

}
