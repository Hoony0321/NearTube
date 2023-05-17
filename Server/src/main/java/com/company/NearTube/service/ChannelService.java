package com.company.NearTube.service;

import com.company.NearTube.domain.Channel;
import com.company.NearTube.form.CreateChannelForm;
import com.company.NearTube.repository.ChannelRepository;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ChannelService {

    private final ChannelRepository channelRepository;

    private final RestTemplate restTemplate = new RestTemplate();

    private final String TEST_API_KEY = "AIzaSyBBOiLRjYI1zBufrBflw5XLlYaPF2ukdaw";
    public Optional<Channel> findById(String id){
        return channelRepository.findById(id);
    }

    @Transactional
    public List<Channel> createChannel(List<String> ids){
        //기존에 없던 새로운 채널 아이디만 사용
        ids = ids.stream().filter(id -> channelRepository.findById(id).isEmpty()).collect(Collectors.toList());

        JSONArray items = getChannelInfo(ids);
        List<Channel> channels = new ArrayList<>();

        for(int i = 0; i < items.size(); i++){
            JSONObject channelInfo = (JSONObject) items.get(i);
            JSONObject snippet = (JSONObject) channelInfo.get("snippet");
            JSONObject topicDetails = (JSONObject) channelInfo.get("topicDetails");

            String channelId = (String) channelInfo.get("id");
            String title = (String) snippet.get("title");
            String description = (String) snippet.get("description");

            String categories = "";
            if(topicDetails != null){
                List<String> topicCategories = (List<String>) topicDetails.get("topicCategories");
                if(topicCategories != null){
                    for(String topicCategory : topicCategories){
                        String[] parts = topicCategory.split("/");
                        String topicCategoryName = parts[parts.length - 1];
                        categories += topicCategoryName + ",";
                    }
                }
            }


            CreateChannelForm createChannelForm = new CreateChannelForm(channelId, title, description, categories);
            Channel channel = Channel.createEntity(createChannelForm);
            channels.add(channel);
        }

        if(channels.size() > 0) channelRepository.saveAll(channels);
        return channels;
    }

    private JSONArray getChannelInfo(List<String> ids){
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        String url = "https://www.googleapis.com/youtube/v3/channels?part=snippet&part=topicDetails&maxResults=50" + "&key=" + TEST_API_KEY;

        for(String id : ids){
            url += "&id=" + id;
        }

        String response = null;
        try{
            ResponseEntity<String> responseEntity = restTemplate.exchange(
                    url,
                    HttpMethod.GET,
                    null,
                    String.class
            );
            response = responseEntity.getBody();
        }catch (Exception e){
            throw new IllegalStateException("API 요청 실패");
        }

        try{
            JSONParser jsonParser = new JSONParser();
            JSONObject jsonObject = (JSONObject) jsonParser.parse(response);
            return (JSONArray) jsonObject.get("items");
        }catch (Exception e) {
            throw new IllegalStateException("JSON Object 변환 실패");
        }
    }
}
