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
                ScrapRate.builder().scrapType("METAL").pricePerKg(new BigDecimal("15.00"))
                        .description("Iron, Steel, Aluminum").build(),
                ScrapRate.builder().scrapType("PAPER").pricePerKg(new BigDecimal("8.00"))
                        .description("Newspapers, Cardboard, Books").build(),
                ScrapRate.builder().scrapType("PLASTIC").pricePerKg(new BigDecimal("10.00"))
                        .description("PET Bottles, HDPE Containers").build(),
                ScrapRate.builder().scrapType("ELECTRONICS").pricePerKg(new BigDecimal("25.00"))
                        .description("PCBs, Cables, Electronic Devices").build(),
                ScrapRate.builder().scrapType("GLASS").pricePerKg(new BigDecimal("5.00"))
                        .description("Bottles, Windows, Mirrors").build(),
                ScrapRate.builder().scrapType("RUBBER").pricePerKg(new BigDecimal("12.00"))
                        .description("Tires, Tubes, Rubber Parts").build(),
                ScrapRate.builder().scrapType("COPPER").pricePerKg(new BigDecimal("400.00"))
                        .description("Copper Wire, Pipes, Fittings").build(),
                ScrapRate.builder().scrapType("BRASS").pricePerKg(new BigDecimal("250.00"))
                        .description("Brass Fittings, Utensils").build(),
                ScrapRate.builder().scrapType("OTHER").pricePerKg(new BigDecimal("5.00"))
                        .description("Mixed or unspecified scrap").build()
            );
            scrapRateRepository.saveAll(rates);
            log.info("Seeded {} default scrap rates.", rates.size());
        }
    }
}
