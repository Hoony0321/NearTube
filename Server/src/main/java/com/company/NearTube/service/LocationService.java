package com.company.NearTube.service;

import com.company.NearTube.domain.Location;
import com.company.NearTube.form.CreateLocationForm;
import com.company.NearTube.repository.LocationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class LocationService {

    private final LocationRepository locationRepository;

    @Transactional
    public Long createLocation(CreateLocationForm form){
        Location location = Location.createEntity(form);
        locationRepository.save(location);

        return location.getId();
    }
}
