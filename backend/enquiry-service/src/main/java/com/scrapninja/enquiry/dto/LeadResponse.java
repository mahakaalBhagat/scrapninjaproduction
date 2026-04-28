package com.scrapninja.enquiry.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
public class LeadResponse {
    private UUID id;
    private String name;
    private String phone;
    private String source;
    private String flow;
    private LocalDateTime createdAt;
}
