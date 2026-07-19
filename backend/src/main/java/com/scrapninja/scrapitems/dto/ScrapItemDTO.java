package com.scrapninja.scrapitems.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ScrapItemDTO {
    private Long id;
    private String name;
    private Long categoryId;
    private String categoryName;
    private String description;
    private BigDecimal pricePerUnit;
    private String unit;
    private String imageUrl;
    private String emoji;
    private Boolean isRecyclable;
    private String environmentalWarning;
    private String badge;
    private Boolean isActive;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
