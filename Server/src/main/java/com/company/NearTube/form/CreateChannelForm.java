package com.company.NearTube.form;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CreateChannelForm {
    private String id;
    private String title;
    private String description;
    private String categories;

    private String thumbnail;

    public CreateChannelForm(String id, String title, String description, String categories, String thumbnail) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.categories = categories;
        this.thumbnail = thumbnail;
    }
}
