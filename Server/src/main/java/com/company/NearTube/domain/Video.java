package com.company.NearTube.domain;

import com.company.NearTube.form.CreateVideoForm;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "video")
public class Video {

    @Id
    @Column(name = "video_id")
    private String id;
    private String kind;
    private Long categoryId;

    private String title;
    private String description;
    private String thumbnail;

    private String channelId;
    private String channelTitle;


    private String tags;
    private String duration;
    private Integer viewCount;
    private Integer likeCount;

    private LocalDateTime publishedAt;

    static public Video createEntity(CreateVideoForm form){
        Video entity = new Video();
        entity.id = form.getId();
        entity.kind = form.getKind();
        entity.categoryId = form.getCategoryId();
        entity.title = form.getTitle();
        entity.description = form.getDescription();
        entity.thumbnail = form.getThumbnail();
        entity.channelId = form.getChannelId();
        entity.channelTitle = form.getChannelTitle();
        entity.duration = form.getDuration();
        entity.viewCount = form.getViewCount();
        entity.likeCount = form.getLikeCount();
        entity.tags = form.getTags();
        entity.publishedAt = form.getPublishedAt();
        return entity;
    }
}
