package com.company.NearTube.dto;

import com.company.NearTube.domain.Channel;
import com.company.NearTube.domain.Location;
import com.company.NearTube.domain.Member;
import com.company.NearTube.domain.Video;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Data
@NoArgsConstructor
public class ClusterDto {

    int clusterId;

    List<String> mainLocations;
    List<String> mainCategories;
    String mainJob;

    List<MemberSimpleDto> members;
    List<VideoDto> videos;
    List<ChannelDto> channels;

    public ClusterDto(int targetClusterId, List<MemberSimpleDto> membersDto, List<VideoDto> recommendVideosDto, List<ChannelDto> recommendChannelsDto, List<String> mainLocations, List<String> mainCategories, String mainJob) {
        this.clusterId = targetClusterId;
        this.members = membersDto;
        this.videos = recommendVideosDto;
        this.channels = recommendChannelsDto;
        this.mainLocations = mainLocations;
        this.mainCategories = mainCategories;
        this.mainJob = mainJob;
    }
}
