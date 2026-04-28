package com.scrapninja.auth.event;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ContactEvent {
    private String eventType;
    private String inquiryId;
    private String fullName;
    private String email;
    private String phone;
    private String message;
    private LocalDateTime timestamp;
}