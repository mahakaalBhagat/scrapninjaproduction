package com.scrapninja.pickup.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PickupRequestDTO {
    private String id;
    private String userId;
    private String scrapType;
    private BigDecimal weight;
    private String address;
    private String requestedDate;
    private String requestedTimeSlot;
    private String status;
    private BigDecimal estimatedPrice;
    private String notes;
}