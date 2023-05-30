package com.company.NearTube.dto;

import com.company.NearTube.domain.Channel;
import jakarta.persistence.Column;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ChannelDto {
    private String id;

    private String title;
    private String description;
    private String categories;

    static public ChannelDto createDto(Channel channel) {
        ChannelDto dto = new ChannelDto();
        dto.id = channel.getId();
        dto.title = channel.getTitle();
        dto.description = channel.getDescription();
        dto.categories = channel.getCategories();
        return dto;
    }

}
