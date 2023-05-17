package com.company.NearTube.domain;

import com.company.NearTube.form.CreateMemberForm;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "member")
public class Member {

    @Id
    @Column(name = "member_id")
    private String id;

    private String name;

    private String email;

    private String picture;

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<Subscription> subscriptions = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<MemberLocation> memberLocations = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<MemberVideo> memberVideos = new ArrayList<>();

    public static Member createEntity(CreateMemberForm form) {
        Member entity = new Member();
        entity.id = form.getId();
        entity.name = form.getName();
        entity.email = form.getEmail();
        entity.picture = form.getPicture();
        return entity;
    }

    public void addSubscription(Subscription subscription) {
        this.subscriptions.add(subscription);
        subscription.setMember(this);
    }


    public void addMemberVideo(MemberVideo memberVideo) {
        this.memberVideos.add(0,memberVideo);
        memberVideo.setMember(this);
    }

    public void removeMemberVideo(MemberVideo memberVideo) {
        this.memberVideos.remove(memberVideo);
        memberVideo.setMember(null);
    }

    public void addMemberLocation(MemberLocation memberLocation) {
        this.memberLocations.add(memberLocation);
    }
}
