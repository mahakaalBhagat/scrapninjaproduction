package com.scrapninja.scrapitems;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

@SpringBootApplication
public class ScrapItemsServiceApplication {

    public static void main(String[] args) {
        ApplicationContext context = SpringApplication.run(ScrapItemsServiceApplication.class, args);
        
        // Auto-fix prices on startup
        DataPriceFixer priceFixer = context.getBean(DataPriceFixer.class);
        priceFixer.fixPrices();
    }
}
