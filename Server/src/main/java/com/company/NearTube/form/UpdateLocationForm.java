package com.company.NearTube.form;

import com.company.NearTube.domain.MemberLocation;
import com.company.NearTube.dto.MemberLocationDto;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class UpdateLocationForm {
    private String id;
    private List<MemberLocationDto> locations;

}
