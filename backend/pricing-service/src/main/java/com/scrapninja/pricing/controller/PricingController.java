package com.scrapninja.pricing.controller;

import com.scrapninja.pricing.entity.ScrapRate;
import com.scrapninja.pricing.repository.ScrapRateRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/pricing")
@RequiredArgsConstructor
@Slf4j
public class PricingController {

    private final ScrapRateRepository scrapRateRepository;

    @GetMapping("/estimate")
    public ResponseEntity<Map<String, Object>> getEstimate(
            @RequestParam String scrapType,
            @RequestParam BigDecimal weight) {
        BigDecimal pricePerKg = scrapRateRepository.findByScrapTypeIgnoreCase(scrapType)
                .map(ScrapRate::getPricePerKg)
                .orElse(new BigDecimal("15.00"));

        BigDecimal estimatedPrice = weight.multiply(pricePerKg);
        return ResponseEntity.ok(Map.of(
                "scrapType", scrapType,
                "weight", weight,
                "pricePerKg", pricePerKg,
                "estimatedPrice", estimatedPrice,
                "currency", "INR"
        ));
    }

    @GetMapping("/rates")
    public ResponseEntity<List<ScrapRate>> getRates() {
        return ResponseEntity.ok(scrapRateRepository.findByIsActiveTrueOrderByScrapType());
    }

    @GetMapping("/rules")
    public ResponseEntity<List<ScrapRate>> getPricingRules() {
        return ResponseEntity.ok(scrapRateRepository.findByIsActiveTrueOrderByScrapType());
    }

    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> health() {
        return ResponseEntity.ok(Map.of("status", "UP", "service", "pricing-service"));
    }
}