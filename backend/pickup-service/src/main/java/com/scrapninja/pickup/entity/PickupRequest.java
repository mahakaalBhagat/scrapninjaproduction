package com.scrapninja.pickup.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "pickup_requests", indexes = {
        @Index(name = "idx_pickup_user_id", columnList = "user_id"),
        @Index(name = "idx_pickup_status", columnList = "status"),
        @Index(name = "idx_pickup_created_at", columnList = "created_at")
})
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PickupRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "user_id", nullable = false)
    private UUID userId;

    @Column(name = "scrap_type", length = 50, nullable = false)
    private String scrapType;

    @Column(precision = 10, scale = 2)
    private BigDecimal weight;

    @Column(nullable = false, length = 500)
    private String address;

    @Column(name = "city", length = 100)
    private String city;

    @Column(name = "requested_date")
    private LocalDate requestedDate;

    @Column(name = "requested_time_slot", length = 50)
    private String requestedTimeSlot;

    @Enumerated(EnumType.STRING)
    @Column(length = 30, nullable = false)
    @Builder.Default
    private PickupStatus status = PickupStatus.PENDING;

    @Column(name = "estimated_price", precision = 10, scale = 2)
    private BigDecimal estimatedPrice;

    @Column(length = 1000)
    private String notes;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    public enum PickupStatus {
        PENDING, CONFIRMED, ASSIGNED, IN_PROGRESS, COMPLETED, CANCELLED
    }
}
