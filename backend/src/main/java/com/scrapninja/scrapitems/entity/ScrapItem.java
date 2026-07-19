package com.scrapninja.scrapitems.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "items", schema = "scrap_items")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ScrapItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String name;
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;
    
    private String description;
    
    @Column(name = "price_per_unit")
    private BigDecimal pricePerUnit;
    
    private String unit;
    private String imageUrl;
    private String emoji;
    
    @Column(name = "is_recyclable")
    private Boolean isRecyclable = true;
    
    @Column(name = "environmental_warning", columnDefinition = "TEXT")
    private String environmentalWarning;
    
    private String badge;
    
    @Column(name = "is_active")
    private Boolean isActive = true;
    
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt = LocalDateTime.now();
    
    @PreUpdate
    public void preUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}
