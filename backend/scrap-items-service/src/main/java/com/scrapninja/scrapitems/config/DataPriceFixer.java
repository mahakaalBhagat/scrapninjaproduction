package com.scrapninja.scrapitems.config;

import com.scrapninja.scrapitems.entity.ScrapItem;
import com.scrapninja.scrapitems.repository.ScrapItemRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Automatically fixes scrap item prices from INR to USD on application startup
 * Ensures all prices are in USD (not old INR values)
 */
@Component
@RequiredArgsConstructor
@Slf4j
public class DataPriceFixer {

    private final ScrapItemRepository scrapItemRepository;

    /**
     * Price mapping: Item name -> USD price
     * These are the correct USD prices (converted from INR @ 1 USD = 80 INR)
     */
    private final Map<String, BigDecimal> correctPrices = new HashMap<String, BigDecimal>() {{
        // E-Waste (10 items)
        put("Mobile Phone", new BigDecimal("6.25"));
        put("Laptop", new BigDecimal("18.75"));
        put("Television", new BigDecimal("25.00"));
        put("Desktop CPU", new BigDecimal("22.50"));
        put("Printer", new BigDecimal("5.00"));
        put("Keyboard", new BigDecimal("1.88"));
        put("Mouse", new BigDecimal("0.62"));
        put("Router", new BigDecimal("3.75"));
        put("Monitor", new BigDecimal("7.50"));
        put("Camera", new BigDecimal("10.00"));

        // Appliances (8 items)
        put("Air Conditioner", new BigDecimal("31.25"));
        put("Refrigerator", new BigDecimal("37.50"));
        put("Washing Machine", new BigDecimal("35.00"));
        put("Microwave", new BigDecimal("10.00"));
        put("Water Heater", new BigDecimal("15.00"));
        put("Fan", new BigDecimal("3.75"));
        put("Mixer Grinder", new BigDecimal("5.00"));
        put("Iron", new BigDecimal("2.50"));

        // Metals (5 items)
        put("Iron Scrap", new BigDecimal("0.25"));
        put("Steel Scrap", new BigDecimal("0.31"));
        put("Copper Scrap", new BigDecimal("4.38"));
        put("Aluminium Scrap", new BigDecimal("1.00"));
        put("Brass Scrap", new BigDecimal("2.25"));

        // Paper (5 items)
        put("Newspapers", new BigDecimal("0.06"));
        put("Books", new BigDecimal("0.10"));
        put("Office Paper", new BigDecimal("0.08"));
        put("Cardboard", new BigDecimal("0.10"));
        put("Magazines", new BigDecimal("0.05"));

        // Plastic (5 items)
        put("PET Bottles", new BigDecimal("0.19"));
        put("Plastic Containers", new BigDecimal("0.15"));
        put("Buckets", new BigDecimal("0.12"));
        put("Plastic Chairs", new BigDecimal("2.50"));
        put("Packaging Plastic", new BigDecimal("0.10"));

        // Glass (3 items)
        put("Glass Bottles", new BigDecimal("0.06"));
        put("Glass Jars", new BigDecimal("0.08"));
        put("Window Glass", new BigDecimal("0.12"));

        // Batteries (3 items)
        put("Car Battery", new BigDecimal("12.50"));
        put("UPS Battery", new BigDecimal("6.25"));
        put("Lithium Battery", new BigDecimal("10.00"));

        // Vehicles (4 items)
        put("Bicycle", new BigDecimal("3.75"));
        put("Motorcycle", new BigDecimal("62.50"));
        put("Car", new BigDecimal("187.50"));
        put("Scooter", new BigDecimal("37.50"));

        // Common alternative names that might be in database
        put("Cardboard Boxes", new BigDecimal("0.10"));
        put("Aluminum Cans", new BigDecimal("1.00"));
        put("Plastic Bottles", new BigDecimal("0.19"));
        put("Used cardboard boxes", new BigDecimal("0.10"));
        put("Aluminum beverage cans", new BigDecimal("1.00"));
        put("Used plastic bottles", new BigDecimal("0.19"));
        put("Broken glass items", new BigDecimal("0.06"));
    }};

    public void fixPrices() {
        try {
            log.info("[DataPriceFixer] Starting price correction from INR to USD...");
            
            List<ScrapItem> allItems = scrapItemRepository.findAll();
            log.info("[DataPriceFixer] Found {} items to check", allItems.size());

            int fixedCount = 0;
            int skippedCount = 0;

            for (ScrapItem item : allItems) {
                BigDecimal correctPrice = correctPrices.get(item.getName());
                
                if (correctPrice != null) {
                    BigDecimal currentPrice = item.getPricePerUnit() != null ? item.getPricePerUnit() : BigDecimal.ZERO;
                    
                    // If price is significantly different (more than 10x), it's probably old INR value
                    if (currentPrice.doubleValue() > correctPrice.doubleValue() * 10 && 
                        currentPrice.doubleValue() > 1.0) {
                        log.info("[DataPriceFixer] Fixing {} price: {} INR -> {} USD", 
                            item.getName(), currentPrice, correctPrice);
                        item.setPricePerUnit(correctPrice);
                        scrapItemRepository.save(item);
                        fixedCount++;
                    } else if (currentPrice.compareTo(correctPrice) != 0) {
                        log.info("[DataPriceFixer] Updating {} price to correct USD value: {} USD", 
                            item.getName(), correctPrice);
                        item.setPricePerUnit(correctPrice);
                        scrapItemRepository.save(item);
                        fixedCount++;
                    } else {
                        skippedCount++;
                    }
                } else {
                    log.warn("[DataPriceFixer] No price mapping found for item: {}", item.getName());
                }
            }

            log.info("[DataPriceFixer] ✅ Price correction complete! Fixed: {}, Skipped (already correct): {}", 
                fixedCount, skippedCount);
                
        } catch (Exception e) {
            log.error("[DataPriceFixer] ❌ Error during price correction", e);
        }
    }
}
