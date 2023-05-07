package com.company.NearTube.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@Table(name = "member_video")
@Getter
public class MemberVideo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_video_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    @JsonIgnore
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "video_id")
    @JsonIgnore
    private Video video;

    static public MemberVideo createEntity(Member member, Video video) {
        MemberVideo entity = new MemberVideo();
        entity.member = member;
        entity.video = video;
        return entity;
    }

    public void setMember(Member member) {
        this.member = member;
    }
}
