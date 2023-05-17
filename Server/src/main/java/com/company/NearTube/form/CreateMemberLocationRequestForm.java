package com.company.NearTube.form;

import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CreateMemberLocationRequestForm {
    @NotNull
    private Double latitude;
    @NotNull
    private Double longitude;
}
