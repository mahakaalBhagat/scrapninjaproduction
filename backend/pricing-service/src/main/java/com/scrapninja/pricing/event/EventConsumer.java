package com.scrapninja.pricing.event;

import com.scrapninja.pricing.config.KafkaTopicConfig;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class EventConsumer {

    private final EventProducer eventProducer;

    private static final Map<String, BigDecimal> PRICE_PER_KG = Map.of(
            "METAL", new BigDecimal("15.00"),
            "PAPER", new BigDecimal("8.00"),
            "PLASTIC", new BigDecimal("10.00"),
            "ELECTRONICS", new BigDecimal("25.00"),
            "GLASS", new BigDecimal("5.00"),
            "RUBBER", new BigDecimal("12.00")
    );

    @KafkaListener(topics = "pickup-events", groupId = "pricing-service-group")
    public void handlePickupEvent(PickupEvent event) {
        log.info("Received PICKUP event: {} for pickupId: {}", event.getEventType(), event.getPickupId());

        if ("PICKUP_CREATED".equals(event.getEventType())) {
            BigDecimal pricePerKg = PRICE_PER_KG.getOrDefault(
                    event.getScrapType() != null ? event.getScrapType().toUpperCase() : "",
                    new BigDecimal("15.00")
            );
            BigDecimal estimatedPrice = event.getWeight().multiply(pricePerKg);

            log.info("Calculated price for pickup {}: {} kg of {} @ {}/kg = {} INR",
                    event.getPickupId(), event.getWeight(), event.getScrapType(),
                    pricePerKg, estimatedPrice);

            PriceEvent priceEvent = PriceEvent.builder()
                    .eventType("PRICE_CALCULATED")
                    .pickupId(event.getPickupId())
                    .scrapType(event.getScrapType())
                    .weight(event.getWeight())
                    .estimatedPrice(estimatedPrice)
                    .currency("INR")
                    .timestamp(LocalDateTime.now())
                    .build();

            eventProducer.publishPriceEvent(priceEvent);
        }
    }

    @KafkaListener(topics = "user-events", groupId = "pricing-service-group")
    public void handleUserEvent(UserEvent event) {
        log.info("Received USER event: {} for user: {}", event.getEventType(), event.getEmail());

        if ("USER_REGISTERED".equals(event.getEventType())) {
            log.info("New user {} registered. User type: {}. Pricing rules ready.",
                    event.getEmail(), event.getUserType());
        }
    }
}