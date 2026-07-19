package com.scrapninja.pricing.config;

import com.scrapninja.pricing.entity.ScrapRate;
import com.scrapninja.pricing.repository.ScrapRateRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataInitializer implements CommandLineRunner {

    private final ScrapRateRepository scrapRateRepository;

    @Override
    public void run(String... args) {
        if (scrapRateRepository.count() == 0) {
            log.info("Seeding default scrap rates...");
            List<ScrapRate> rates = List.of(
                // Prices in USD (converted from previous INR @ 1 USD = 80 INR)
                ScrapRate.builder().scrapType("METAL").pricePerKg(new BigDecimal("0.19"))
                        .description("Iron, Steel, Aluminum").build(),
                ScrapRate.builder().scrapType("PAPER").pricePerKg(new BigDecimal("0.10"))
                        .description("Newspapers, Cardboard, Books").build(),
                ScrapRate.builder().scrapType("PLASTIC").pricePerKg(new BigDecimal("0.12"))
                        .description("PET Bottles, HDPE Containers").build(),
                ScrapRate.builder().scrapType("ELECTRONICS").pricePerKg(new BigDecimal("0.31"))
                        .description("PCBs, Cables, Electronic Devices").build(),
                ScrapRate.builder().scrapType("GLASS").pricePerKg(new BigDecimal("0.06"))
                        .description("Bottles, Windows, Mirrors").build(),
                ScrapRate.builder().scrapType("RUBBER").pricePerKg(new BigDecimal("0.15"))
                        .description("Tires, Tubes, Rubber Parts").build(),
                ScrapRate.builder().scrapType("COPPER").pricePerKg(new BigDecimal("5.00"))
                        .description("Copper Wire, Pipes, Fittings").build(),
                ScrapRate.builder().scrapType("BRASS").pricePerKg(new BigDecimal("3.13"))
                        .description("Brass Fittings, Utensils").build(),
                ScrapRate.builder().scrapType("OTHER").pricePerKg(new BigDecimal("0.06"))
                        .description("Mixed or unspecified scrap").build()
            );
            scrapRateRepository.saveAll(rates);
            log.info("Seeded {} default scrap rates.", rates.size());
        }
    }
}
