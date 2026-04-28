package com.scrapninja.pricing.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "scrap_rates")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ScrapRate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "scrap_type", unique = true, nullable = false, length = 50)
    private String scrapType;

    @Column(name = "price_per_kg", nullable = false, precision = 10, scale = 2)
    private BigDecimal pricePerKg;

    @Column(length = 200)
    private String description;

    @Column(name = "is_active", nullable = false)
    @Builder.Default
    private Boolean isActive = true;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}
