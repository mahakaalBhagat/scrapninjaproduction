package com.scrapninja.pickup.event;

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
public class PriceEvent {
    private String eventType;
    private String pickupId;
    private String scrapType;
    private BigDecimal weight;
    private BigDecimal estimatedPrice;
    private String currency;
    private LocalDateTime timestamp;
}