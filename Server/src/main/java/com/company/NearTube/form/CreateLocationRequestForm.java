package com.company.NearTube.form;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CreateLocationRequestForm {
    private String name;
    private Point point1;
    private Point point2;
    private Point point3;
    private Point point4;
}
