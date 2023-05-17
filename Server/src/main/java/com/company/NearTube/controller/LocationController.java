package com.company.NearTube.controller;

import com.company.NearTube.domain.Location;
import com.company.NearTube.domain.Member;
import com.company.NearTube.form.CreateLocationForm;
import com.company.NearTube.form.CreateLocationRequestForm;
import com.company.NearTube.service.LocationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequiredArgsConstructor
public class LocationController {

    private final LocationService locationService;

    @PostMapping("/api/locations")
    public ResponseEntity<Object> createLocation(@RequestBody CreateLocationRequestForm form){

        CreateLocationForm locationForm = createLocationForm(form);
        Long locationId = locationService.createLocation(locationForm);

        Location location = locationService.findById(locationId).get();

        return ResponseEntity.ok(location);
    }

    private CreateLocationForm createLocationForm(CreateLocationRequestForm form){
        CreateLocationForm locationForm = new CreateLocationForm();

        Double minLatitude = Math.min(Math.min(form.getPoint1().getLatitude(), form.getPoint2().getLatitude()), Math.min(form.getPoint3().getLatitude(), form.getPoint4().getLatitude()));
        Double maxLatitude = Math.max(Math.max(form.getPoint1().getLatitude(), form.getPoint2().getLatitude()), Math.max(form.getPoint3().getLatitude(), form.getPoint4().getLatitude()));
        Double minLongitude = Math.min(Math.min(form.getPoint1().getLongitude(), form.getPoint2().getLongitude()), Math.min(form.getPoint3().getLongitude(), form.getPoint4().getLongitude()));
        Double maxLongitude = Math.max(Math.max(form.getPoint1().getLongitude(), form.getPoint2().getLongitude()), Math.max(form.getPoint3().getLongitude(), form.getPoint4().getLongitude()));

        locationForm.setName(form.getName());
        locationForm.setMinLatitude(minLatitude);
        locationForm.setMaxLatitude(maxLatitude);
        locationForm.setMinLongitude(minLongitude);
        locationForm.setMaxLongitude(maxLongitude);

        return locationForm;
    }
}
