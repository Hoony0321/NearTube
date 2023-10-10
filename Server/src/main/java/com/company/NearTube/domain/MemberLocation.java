package com.company.NearTube.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@Table(name = "member_location")
@Getter
public class MemberLocation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_location_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    @JsonIgnore
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "location_id")
    @JsonIgnore
    private Location location;

    private Integer count = 0;

    public static MemberLocation createEntity(Member member, Location location) {
        MemberLocation entity = new MemberLocation();
        entity.member = member;
        entity.location = location;
        return entity;
    }

    public void addCount() {
        this.count++;
    }

    public void setCount(int count){
        this.count = count;
    }
}
