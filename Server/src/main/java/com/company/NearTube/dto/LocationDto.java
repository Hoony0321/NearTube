package com.company.NearTube.dto;

import com.company.NearTube.domain.Location;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class LocationDto {
    private String name;

    static public LocationDto createDto(Location location) {
        LocationDto dto = new LocationDto();
        dto.name = location.getName();
        return dto;
    }
}
