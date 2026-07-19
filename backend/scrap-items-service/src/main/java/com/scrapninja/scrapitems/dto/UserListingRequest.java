package com.scrapninja.scrapitems.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.validation.constraints.*;
import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserListingRequest {

    @NotNull(message = "Quantity is required")
    @DecimalMin(value = "0.01", message = "Quantity must be greater than 0")
    private BigDecimal quantity;

    @NotBlank(message = "Unit is required")
    private String unit;

    @NotBlank(message = "Location is required")
    private String location;

    @DecimalMin(value = "-90", message = "Invalid latitude")
    @DecimalMax(value = "90", message = "Invalid latitude")
    private Double latitude;

    @DecimalMin(value = "-180", message = "Invalid longitude")
    @DecimalMax(value = "180", message = "Invalid longitude")
    private Double longitude;

    private String description;
}
