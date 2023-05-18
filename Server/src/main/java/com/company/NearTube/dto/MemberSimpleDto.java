package com.company.NearTube.dto;

import com.company.NearTube.domain.Member;
import com.company.NearTube.domain.MemberLocation;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class MemberSimpleDto {
    private String id;
    private String name;
    private String major;
    private String interests;

    private List<MemberLocationDto> locations;


    static public MemberSimpleDto createDto(Member member) {
        MemberSimpleDto dto = new MemberSimpleDto();
        dto.id = member.getId();
        dto.name = member.getName();
        dto.major = member.getMajor();
        dto.interests = member.getInterests();
        List<MemberLocation> topMemberLocation = member.getTopMemberLocation(3);
        dto.locations = MemberLocationDto.createDtos(topMemberLocation);
        return dto;
    }

    static public List<MemberSimpleDto> createDtos(List<Member> members) {
        return members.stream()
                .map(MemberSimpleDto::createDto)
                .toList();
    }
}
