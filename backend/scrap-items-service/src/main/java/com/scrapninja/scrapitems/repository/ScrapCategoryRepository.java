package com.scrapninja.scrapitems.repository;

import com.scrapninja.scrapitems.entity.ScrapCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import java.util.List;

@Repository
public interface ScrapCategoryRepository extends JpaRepository<ScrapCategory, Long> {
    Optional<ScrapCategory> findByNameIgnoreCase(String name);
    List<ScrapCategory> findByIsActiveTrue();
}
