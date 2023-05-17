package com.company.NearTube.service;

import com.company.NearTube.domain.Channel;
import com.company.NearTube.domain.Member;
import com.company.NearTube.domain.Subscription;
import com.company.NearTube.form.CreateSubscriptionForm;
import com.company.NearTube.repository.SubscriptionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class SubscriptionService {

    private final SubscriptionRepository subscriptionRepository;
    private final ChannelService channelService;

    @Transactional
    public void addSubscriptions(Member member, List<CreateSubscriptionForm> forms){

        //채널 정보 없는 경우 채널 정보 추가
        List<String> channelIds = forms.stream().map(CreateSubscriptionForm::getChannelId).collect(Collectors.toList());
        if(channelIds.size() > 0) channelService.createChannel(channelIds);

        //기존에 없던 구독 리스트만 추리기
        List<Subscription> subscriptions = member.getSubscriptions();
        forms = forms.stream()
                .filter(form -> subscriptions.stream()
                        .noneMatch(subscription -> subscription.getChannel().getId().equals(form.getChannelId())))
                .collect(Collectors.toList());

        //구독 정보 추가
        for(CreateSubscriptionForm form : forms){
            Channel channel = channelService.findById(form.getChannelId()).get();
            Subscription subscription = Subscription.createEntity(form);
            subscription.setMember(member);
            subscription.setChannel(channel);
            member.addSubscription(subscription);
            subscriptionRepository.save(subscription);
        }
    }

}
