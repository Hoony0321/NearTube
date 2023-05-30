package com.company.NearTube.dto;

import com.company.NearTube.domain.Video;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Data
@NoArgsConstructor
public class VideoDto {
    private String id;
    private String title;
    private String description;
    private String kind;
    private Long categoryId;

    private String thumbnail;


    static public VideoDto createDto(Video video) {
        VideoDto dto = new VideoDto();
        dto.id = video.getId();
        dto.title = video.getTitle();
        dto.description = video.getDescription();
        dto.kind = video.getKind();
        dto.categoryId = video.getCategoryId();
        dto.thumbnail = video.getThumbnail();
        return dto;
    }
}
