package com.company.NearTube.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class MemberLocationResponse {
    private String locationName;
    private Integer count;

    public MemberLocationResponse(String locationName, Integer count) {
        this.locationName = locationName;
        this.count = count;
    }
}
