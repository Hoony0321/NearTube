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

    public List<Member>[] clustering(){
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

        //build the clustering model
        SimpleKMeans model = new SimpleKMeans();
        int[] assignments;
        try {
//          model.setSeed(10);
            model.setSeed(255);
            model.setNumClusters(3);
            model.setPreserveInstancesOrder(true);
            model.setDisplayStdDevs(true);
            model.buildClusterer(dataset);

            assignments = model.getAssignments();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        List<Member>[] clusters = new ArrayList[model.getNumClusters()];
        for(int i = 0; i < clusters.length; i++){
            clusters[i] = new ArrayList<>();
        }

        for(int i = 0; i < assignments.length; i++){
            clusters[assignments[i]].add(members.get(i));
        }

        return clusters;
    }
}
