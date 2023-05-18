package com.company.NearTube.dto;

import com.company.NearTube.domain.MemberLocation;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class MemberLocationDto {
    private String name;
    private Integer count;

    static public MemberLocationDto createDto(MemberLocation memberLocation) {
        MemberLocationDto dto = new MemberLocationDto();
        dto.name = memberLocation.getLocation().getName();
        dto.count = memberLocation.getCount();
        return dto;
    }

    static public List<MemberLocationDto> createDtos(List<MemberLocation> memberLocations) {
        return memberLocations.stream()
                .map(MemberLocationDto::createDto)
                .toList();
    }
}
