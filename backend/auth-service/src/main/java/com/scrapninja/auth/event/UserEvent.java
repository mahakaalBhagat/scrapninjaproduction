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
public class UserEvent {
    private String eventType;
    private String userId;
    private String email;
    private String firstName;
    private String lastName;
    private String userType;
    private LocalDateTime timestamp;
}