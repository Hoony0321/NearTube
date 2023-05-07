package com.company.NearTube.domain;

import com.company.NearTube.form.CreateLocationForm;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "location")
public class Location {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "location_id")
    private Long id;

    @Column(unique = true)
    private String name;

    private Double minLatitude;
    private Double maxLatitude;
    private Double minLongitude;
    private Double maxLongitude;

    static public Location createEntity(CreateLocationForm form) {
        Location entity = new Location();
        entity.name = form.getName();
        entity.minLatitude = form.getMinLatitude();
        entity.maxLatitude = form.getMaxLatitude();
        entity.minLongitude = form.getMinLongitude();
        entity.maxLongitude = form.getMaxLongitude();
        return entity;
    }

}
