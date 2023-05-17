package com.company.NearTube.service;

import com.company.NearTube.domain.Location;
import com.company.NearTube.domain.Member;
import com.company.NearTube.domain.MemberLocation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import weka.clusterers.SimpleKMeans;
import weka.core.Attribute;
import weka.core.DenseInstance;
import weka.core.Instance;
import weka.core.Instances;

import java.util.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class KMeanService {

    private final MemberService memberService;
    private final LocationService locationService;

    public void clustering(Member targetMember){
        //create attribute - TODO : add other attributes
        List<Attribute> attributes = new ArrayList<>();
        List<Location> locations = locationService.findAll();
        Collections.sort(locations, Comparator.comparing(Location::getId));

        locationService.findAll().forEach(location -> {
            Attribute attribute = new Attribute(location.getName(), Math.toIntExact(location.getId()));
            attributes.add(new Attribute(location.getName()));
        });

        //create the dataset
        Instances dataset = new Instances("dataset", (ArrayList<Attribute>) attributes, 0);

        List<Member> members = memberService.findAll();
        for(Member member : members){
            //create the instance
            Instance data = new DenseInstance(attributes.size());
            for (MemberLocation memberLocation : member.getMemberLocations()) {
                Attribute attribute = attributes.stream().filter(attr -> attr.name().equals(memberLocation.getLocation().getName())).findFirst().get();
                data.setValue(attribute, memberLocation.getCount());
            }

            //add the instance
            dataset.add(data);
            data.setDataset(dataset);
        }

        //set the class index (the last attribute is the class label)
//        dataset.setClassIndex(dataset.numAttributes() - 1);

        //build the clustering model
        SimpleKMeans model = new SimpleKMeans();
        try {
            model.setNumClusters(3);
            model.setPreserveInstancesOrder(true);
            model.buildClusterer(dataset);

            int[] assignments = model.getAssignments();
            for(int i = 0; i < assignments.length; i++){
                log.info("Instance {} -> Cluster {}\n", i, assignments[i]);
            }

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
