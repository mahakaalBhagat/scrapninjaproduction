package com.scrapninja.scrapitems.repository;

import com.scrapninja.scrapitems.entity.ScrapItem;
import com.scrapninja.scrapitems.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ScrapItemRepository extends JpaRepository<ScrapItem, Long> {
    List<ScrapItem> findByCategory(Category category);
    List<ScrapItem> findByNameContainingIgnoreCase(String name);
    List<ScrapItem> findByIsActiveTrue();
    List<ScrapItem> findByCategoryAndIsActiveTrue(Category category);
}
