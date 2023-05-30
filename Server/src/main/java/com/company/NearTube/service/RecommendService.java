package com.company.NearTube.service;

import com.company.NearTube.domain.*;
import com.company.NearTube.dto.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class RecommendService {

    private final KMeanService kMeanService;
    private final MemberService memberService;

    public ClusterDto recommendOnlyLocation(Member targetMember){
        List<Member>[] clusters = kMeanService.clustering();

        List<Member> targetCluster = new ArrayList<>();
        int targetClusterId = 0;

        for(int i = 0; i < clusters.length; i++){
            if(clusters[i].contains(targetMember)){
                targetCluster = clusters[i];
                targetClusterId = i;
                break;
            }
        }

        Map<Video, Integer> videos = new HashMap<>();
        Map<Channel, Integer> channels = new HashMap<>();
        Map<Location, Integer> locations = new HashMap<>();

        for(Member member : targetCluster){
            //set cluster locations
            List<MemberLocation> topMemberLocation = member.getTopMemberLocation(3);
            for(MemberLocation memberLocation : topMemberLocation){
                if(locations.containsKey(memberLocation.getLocation())){
                    locations.put(memberLocation.getLocation(), locations.get(memberLocation.getLocation()) + memberLocation.getCount());
                }
                else{
                    locations.put(memberLocation.getLocation(), memberLocation.getCount());
                }
            }
            //set recommend videos
            for(MemberVideo memberVideo : member.getMemberVideos()){
                if(videos.containsKey(memberVideo.getVideo())){
                    videos.put(memberVideo.getVideo(), videos.get(memberVideo.getVideo()) + 1);
                }
                else{
                    videos.put(memberVideo.getVideo(), 1);
                }
            }
            //set recommend channels
            for(Subscription subscription : member.getSubscriptions()){
                if(channels.containsKey(subscription.getChannel())){
                    channels.put(subscription.getChannel(), channels.get(subscription.getChannel()) + 1);
                }
                else{
                    channels.put(subscription.getChannel(), 1);
                }
            }
        }

        //sort recommend videos
        List<Map.Entry<Video, Integer>> recommendVideos = new LinkedList<>(videos.entrySet());
        recommendVideos.sort(Map.Entry.comparingByValue(Comparator.reverseOrder()));
        recommendVideos = recommendVideos.subList(0, 10);

        //sort recommend channels
        List<Map.Entry<Channel, Integer>> recommendChannels = new LinkedList<>(channels.entrySet());
        recommendChannels.sort(Map.Entry.comparingByValue(Comparator.reverseOrder()));
        recommendChannels = recommendChannels.subList(0, 10);

        //sort recommend locations
        List<Map.Entry<Location, Integer>> recommendLocations = new LinkedList<>(locations.entrySet());
        recommendLocations.sort(Map.Entry.comparingByValue(Comparator.reverseOrder()));
        recommendLocations = recommendLocations.subList(0, 2);

        //convert to List<MemberSimpleDto>
        List<MemberSimpleDto> membersDto = new ArrayList<>();
        for(Member member : targetCluster){
            membersDto.add(MemberSimpleDto.createDto(member));
        }

        //convert to List<Map.Entry<VideoDto, Integer>>>
        List<VideoDto> recommendVideosDto = new ArrayList<>();
        for(Map.Entry<Video, Integer> entry : recommendVideos){
            recommendVideosDto.add(VideoDto.createDto(entry.getKey()));
        }

        //convert to List<Map.Entry<ChannelDto, Integer>>>
        List<ChannelDto> recommendChannelsDto = new ArrayList<>();
        for(Map.Entry<Channel, Integer> entry : recommendChannels){
            recommendChannelsDto.add(ChannelDto.createDto(entry.getKey()));
        }

        //convert to List<Map.Entry<LocationDto, Integer>>>
        List<LocationDto> recommendLocationsDto = new ArrayList<>();
        for(Map.Entry<Location, Integer> entry : recommendLocations){
            recommendLocationsDto.add(LocationDto.createDto(entry.getKey()));
        }

        ClusterDto clusterDto = new ClusterDto(targetClusterId, membersDto, recommendVideosDto, recommendChannelsDto, recommendLocationsDto);

        return clusterDto;
    }
}
