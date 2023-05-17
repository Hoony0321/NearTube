package com.company.NearTube.service;

import com.company.NearTube.domain.Location;
import com.company.NearTube.form.CreateLocationForm;
import com.company.NearTube.repository.LocationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

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

    public Optional<Location> findById(Long locationId) {
        return locationRepository.findById(locationId);
    }

    public List<Location> findAll(){
        return locationRepository.findAll();
    }
}
