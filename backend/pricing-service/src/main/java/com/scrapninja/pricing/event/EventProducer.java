package com.scrapninja.pricing.event;

import com.scrapninja.pricing.config.KafkaTopicConfig;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class EventProducer {

    private final KafkaTemplate<String, Object> kafkaTemplate;

    public void publishPriceEvent(PriceEvent event) {
        log.info("Publishing PRICE event: {} for pickupId: {}", event.getEventType(), event.getPickupId());
        kafkaTemplate.send(KafkaTopicConfig.PRICE_EVENTS_TOPIC, event.getPickupId(), event);
    }
}