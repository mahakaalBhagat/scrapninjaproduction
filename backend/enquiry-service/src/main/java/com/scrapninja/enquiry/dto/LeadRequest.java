package com.scrapninja.enquiry.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class LeadRequest {

    @NotBlank(message = "Name is required")
    @Size(max = 100)
    private String name;

    @NotBlank(message = "Phone is required")
    @Pattern(regexp = "^[+\\d\\s\\-()]{5,20}$", message = "Invalid phone number")
    private String phone;

    @NotBlank(message = "Source is required")
    private String source;

    private String flow;
}
