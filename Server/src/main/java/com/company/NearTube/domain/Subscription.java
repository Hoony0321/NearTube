package com.company.NearTube.domain;

import com.company.NearTube.form.CreateSubscriptionForm;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "subscription")
public class Subscription {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "subscription_id")
    private Long id;

    @OneToOne
    @JoinColumn(name = "channel_id")
    private Channel channel;
    private LocalDateTime publishedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    @JsonIgnore
    private Member member;

    public static Subscription createEntity(CreateSubscriptionForm form) {
        Subscription entity = new Subscription();
        entity.publishedAt = form.getPublishedAt();
        return entity;
    }

    public void setMember(Member member) {this.member = member;}
    public void setChannel(Channel channel) {this.channel = channel;}
}
