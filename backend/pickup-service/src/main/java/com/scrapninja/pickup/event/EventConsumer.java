package com.scrapninja.pickup.event;

import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class EventConsumer {

    @KafkaListener(topics = "user-events", groupId = "pickup-service-group")
    public void handleUserEvent(UserEvent event) {
        log.info("Received USER event: {} for user: {}", event.getEventType(), event.getEmail());

        switch (event.getEventType()) {
            case "USER_REGISTERED":
                log.info("New user registered: {} {} ({}). Ready to accept pickup requests.",
                        event.getFirstName(), event.getLastName(), event.getUserType());
                break;
            case "USER_UPDATED":
                log.info("User updated: {}. Syncing user data.", event.getEmail());
                break;
            case "USER_DELETED":
                log.info("User deleted: {}. Cleaning up pending pickups.", event.getEmail());
                break;
            default:
                log.warn("Unknown user event type: {}", event.getEventType());
        }
    }

    @KafkaListener(topics = "price-events", groupId = "pickup-service-group")
    public void handlePriceEvent(PriceEvent event) {
        log.info("Received PRICE event: {} for pickupId: {}", event.getEventType(), event.getPickupId());

        if ("PRICE_CALCULATED".equals(event.getEventType())) {
            log.info("Price calculated for pickup {}: {} {} for {} kg of {}",
                    event.getPickupId(), event.getCurrency(), event.getEstimatedPrice(),
                    event.getWeight(), event.getScrapType());
            // TODO: Update pickup request with the calculated price
        }
    }
}