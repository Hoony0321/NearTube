package com.company.NearTube.form;

import lombok.Data;
import lombok.NoArgsConstructor;

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

    private Long channelId;
    private String channelTitle;

    private String duration;
    private Integer viewCount;
    private Integer likeCount;

    private LocalDateTime publishedAt;
}
