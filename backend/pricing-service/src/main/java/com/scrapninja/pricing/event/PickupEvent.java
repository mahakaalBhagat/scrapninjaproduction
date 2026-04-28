package com.scrapninja.pricing.event;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PickupEvent {
    private String eventType;
    private String pickupId;
    private String userId;
    private String scrapType;
    private BigDecimal weight;
    private String address;
    private String requestedDate;
    private String requestedTimeSlot;
    private String status;
    private LocalDateTime timestamp;
}