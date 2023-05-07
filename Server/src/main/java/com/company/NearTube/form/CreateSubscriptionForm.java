package com.company.NearTube.form;

import com.company.NearTube.domain.Member;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class CreateSubscriptionForm {

    private String channelId;
    private String channelTitle;
    private LocalDateTime publishedAt;
}
