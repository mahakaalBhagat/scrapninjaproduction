package com.scrapninja.vendor;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan("com.scrapninja")
public class VendorOnboardingServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(VendorOnboardingServiceApplication.class, args);
    }
}
