package com.company.NearTube.form;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CreateMemberForm {

    private String id;
    private String name;
    private String email;
    private String picture;
    private String job;
    private String interests;
    private Boolean gender;
    private String[] locations;

}
