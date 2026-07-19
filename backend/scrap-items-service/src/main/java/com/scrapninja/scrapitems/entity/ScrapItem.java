package com.scrapninja.scrapitems.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "items", schema = "scrap_items", indexes = {
    @Index(name = "idx_category", columnList = "category_id"),
    @Index(name = "idx_name", columnList = "name"),
    @Index(name = "idx_active", columnList = "is_active")
})
@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ScrapItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 255)
    private String name;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "category_id", nullable = false)
    private ScrapCategory category;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "price_per_unit", nullable = false, precision = 10, scale = 2)
    private BigDecimal pricePerUnit;

    @Column(nullable = false, length = 50)
    private String unit; // kg, unit, piece, etc.

    @Column(name = "image_url")
    private String imageUrl;

    @Column(length = 10)
    private String emoji;

    @Column(name = "is_recyclable")
    private Boolean isRecyclable = true;

    @Column(name = "environmental_warning", columnDefinition = "TEXT")
    private String environmentalWarning;

    @Column(length = 50)
    private String badge;

    @Column(name = "is_active")
    private Boolean isActive = true;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "updated_at")
    private LocalDateTime updatedAt = LocalDateTime.now();

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    // Explicit getters and setters for Lombok compatibility
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public ScrapCategory getCategory() { return category; }
    public void setCategory(ScrapCategory category) { this.category = category; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    
    public BigDecimal getPricePerUnit() { return pricePerUnit; }
    public void setPricePerUnit(BigDecimal pricePerUnit) { this.pricePerUnit = pricePerUnit; }
    
    public String getUnit() { return unit; }
    public void setUnit(String unit) { this.unit = unit; }
    
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    
    public String getEmoji() { return emoji; }
    public void setEmoji(String emoji) { this.emoji = emoji; }
    
    public Boolean getIsRecyclable() { return isRecyclable; }
    public void setIsRecyclable(Boolean isRecyclable) { this.isRecyclable = isRecyclable; }
    
    public String getEnvironmentalWarning() { return environmentalWarning; }
    public void setEnvironmentalWarning(String environmentalWarning) { this.environmentalWarning = environmentalWarning; }
    
    public String getBadge() { return badge; }
    public void setBadge(String badge) { this.badge = badge; }
    
    public Boolean getIsActive() { return isActive; }
    public void setIsActive(Boolean isActive) { this.isActive = isActive; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
