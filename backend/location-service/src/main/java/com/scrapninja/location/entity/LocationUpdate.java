package com.scrapninja.location.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "location_updates", indexes = {
    @Index(name = "idx_loc_user_time", columnList = "userId, timestamp DESC"),
    @Index(name = "idx_loc_timestamp", columnList = "timestamp DESC")
})
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LocationUpdate {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private UUID userId;

    private String userEmail;

    @Column(nullable = false)
    private Double latitude;

    @Column(nullable = false)
    private Double longitude;

    private Double accuracy;   // metres

    private Double speed;      // m/s

    private Double heading;    // degrees 0-360

    @Column(nullable = false)
    private LocalDateTime timestamp;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;
}
