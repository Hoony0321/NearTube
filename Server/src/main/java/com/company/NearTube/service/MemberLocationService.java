package com.company.NearTube.service;

import com.company.NearTube.domain.Location;
import com.company.NearTube.domain.Member;
import com.company.NearTube.domain.MemberLocation;
import com.company.NearTube.form.Point;
import com.company.NearTube.repository.MemberLocationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MemberLocationService {
    private final MemberLocationRepository memberLocationRepository;

    @Transactional
    public MemberLocation countMemberLocation(Member member, Point point) {
        MemberLocation _memberLocation = null;
        List<MemberLocation> memberLocations = member.getMemberLocations();

        for(MemberLocation memberLocation : memberLocations){
            Location location = memberLocation.getLocation();
            if(location.isInRange(point.getLatitude(), point.getLongitude())){
                _memberLocation = memberLocation;
                memberLocation.addCount();
                break;
            }
        }

        return _memberLocation;
    }
}
