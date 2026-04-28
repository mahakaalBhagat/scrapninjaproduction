package com.scrapninja.pickup.event;

import com.scrapninja.pickup.config.KafkaTopicConfig;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class EventProducer {

    private final KafkaTemplate<String, Object> kafkaTemplate;

    public void publishPickupEvent(PickupEvent event) {
        log.info("Publishing PICKUP event: {} for pickupId: {}", event.getEventType(), event.getPickupId());
        kafkaTemplate.send(KafkaTopicConfig.PICKUP_EVENTS_TOPIC, event.getPickupId(), event);
    }
}