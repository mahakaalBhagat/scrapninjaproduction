package com.scrapninja.pricing.repository;

import com.scrapninja.pricing.entity.ScrapRate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ScrapRateRepository extends JpaRepository<ScrapRate, Long> {

    Optional<ScrapRate> findByScrapTypeIgnoreCase(String scrapType);

    List<ScrapRate> findByIsActiveTrueOrderByScrapType();
}
