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
    List<MemberSimpleDto> members;
    List<VideoDto> videos;
    List<ChannelDto> channels;
    List<LocationDto> locations;

    public ClusterDto(int clusterId, List<MemberSimpleDto> members, List<VideoDto> videos, List<ChannelDto> channels, List<LocationDto> locations) {
        this.clusterId = clusterId;
        this.members = members;
        this.videos = videos;
        this.channels = channels;
        this.locations = locations;
    }
}
