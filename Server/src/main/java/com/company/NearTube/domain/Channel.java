package com.company.NearTube.domain;

import com.company.NearTube.form.CreateChannelForm;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "channel")
public class Channel {

    @Id
    @Column(name = "channel_id")
    private String id;

    private String title;

    @Column(name = "description", length = 1000)
    private String description;

    @Column(name = "categories", length = 500)
    private String categories;

    public static Channel createEntity(CreateChannelForm form) {
        Channel entity = new Channel();
        entity.id = form.getId();
        entity.title = form.getTitle();
        entity.description = form.getDescription();
        entity.categories = form.getCategories();
        return entity;
    }
}
