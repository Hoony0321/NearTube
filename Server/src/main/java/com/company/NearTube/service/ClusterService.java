package com.company.NearTube.service;

import com.company.NearTube.domain.*;
import com.company.NearTube.dto.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class ClusterService {

    private final KMeanService kMeanService;
    private final MemberService memberService;

    public Optional<ClusterDto> searchCluster(String locationName, String jobName){
        List<Member>[] clusters = kMeanService.clustering();

        List<ClusterDto> clusterDtos = new ArrayList<>();
        for(int i = 0; i < clusters.length; i++){
            ClusterDto clusterDto = convertToClusterDto(i, clusters[i]);
            clusterDtos.add(clusterDto);
        }

        Optional<ClusterDto> findClusterDto = clusterDtos.stream().filter(clusterDto ->
                        clusterDto.getMainLocations().contains(locationName) &&
                                clusterDto.getMainJob().contains(jobName))
                .findFirst();

        return findClusterDto;
    }

    public ClusterDto clusterByLocation(Member targetMember){
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

        ClusterDto clusterDto = convertToClusterDto(targetClusterId, targetCluster);

        return clusterDto;
    }

    private ClusterDto convertToClusterDto(int id, List<Member> targetCluster){
        Map<Video, Integer> videos = new HashMap<>();
        Map<Channel, Integer> channels = new HashMap<>();
        Map<Location, Integer> locations = new HashMap<>();
        Map<String, Integer> categories = new HashMap<>();
        Map<String, Integer> jobs = new HashMap<>();


        for(Member member : targetCluster){
            //set main jobs
            if(!member.getJob().equals("")){
                if(jobs.containsKey(member.getJob())){
                    jobs.put(member.getJob(), jobs.get(member.getJob()) + 1);
                }
                else{
                    jobs.put(member.getJob(), 1);
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

                //set cluster categories
                String[] categorieStrings = subscription.getChannel().getCategories().split(",");
                for(String category : categorieStrings){
                    if(categories.containsKey(category)){
                        categories.put(category, categories.get(category) + 1);
                    }
                    else{
                        categories.put(category, 1);
                    }
                }
            }

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
        }

        //sort videos
        List<Map.Entry<Video, Integer>> sortedVideos = new LinkedList<>(videos.entrySet());
        sortedVideos.sort(Map.Entry.comparingByValue(Comparator.reverseOrder()));

        //sort channels
        List<Map.Entry<Channel, Integer>> sortedChannels = new LinkedList<>(channels.entrySet());
        sortedChannels.sort(Map.Entry.comparingByValue(Comparator.reverseOrder()));

        //sort locations
        List<Map.Entry<Location, Integer>> sortedLocations = new LinkedList<>(locations.entrySet());
        sortedLocations.sort(Map.Entry.comparingByValue(Comparator.reverseOrder()));

        //sort categories
        List<Map.Entry<String, Integer>> sortedCategories = new LinkedList<>(categories.entrySet());
        sortedCategories.sort(Map.Entry.comparingByValue(Comparator.reverseOrder()));

        //sort jobs
        List<Map.Entry<String, Integer>> sortedJobs = new LinkedList<>(jobs.entrySet());
        sortedJobs.sort(Map.Entry.comparingByValue(Comparator.reverseOrder()));

        //convert to List<MemberSimpleDto>
        List<MemberSimpleDto> membersDto = new ArrayList<>();
        for(Member member : targetCluster){
            membersDto.add(MemberSimpleDto.createDto(member));
        }

        //convert to List<Map.Entry<VideoDto, Integer>>>
        List<VideoDto> recommendVideosDto = new ArrayList<>();
        for(Map.Entry<Video, Integer> entry : sortedVideos.subList(0,10)){
            recommendVideosDto.add(VideoDto.createDto(entry.getKey()));
        }

        //convert to List<Map.Entry<ChannelDto, Integer>>>
        List<ChannelDto> recommendChannelsDto = new ArrayList<>();
        for(Map.Entry<Channel, Integer> entry : sortedChannels.subList(0,10)){
            recommendChannelsDto.add(ChannelDto.createDto(entry.getKey()));
        }

        //convert to List<String> mainCategories
        List<String> mainLocations = new ArrayList<>();
        for(Map.Entry<Location, Integer> entry : sortedLocations.subList(0,2)){
            mainLocations.add(entry.getKey().getName());
        }

        //convert to List<String> mainCategories
        List<String> mainCategories = new ArrayList<>();
        for(Map.Entry<String, Integer> entry : sortedCategories.subList(0,2)){
            mainCategories.add(entry.getKey());
        }

        //convert to String mainJob
        String mainJob = sortedJobs.get(0).getKey();

        ClusterDto clusterDto = new ClusterDto(id, membersDto, recommendVideosDto, recommendChannelsDto, mainLocations, mainCategories, mainJob);

        return clusterDto;
    }
}
