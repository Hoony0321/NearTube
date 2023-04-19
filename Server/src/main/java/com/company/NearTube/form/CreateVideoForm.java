package com.company.NearTube.form;

import jakarta.persistence.Column;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class CreateVideoForm {

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
}
