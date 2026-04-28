package com.scrapninja.auth.event;

import com.scrapninja.auth.config.KafkaTopicConfig;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class EventProducer {

    private final KafkaTemplate<String, Object> kafkaTemplate;

    public void publishUserEvent(UserEvent event) {
        log.info("Publishing USER event: {} for user: {}", event.getEventType(), event.getEmail());
        kafkaTemplate.send(KafkaTopicConfig.USER_EVENTS_TOPIC, event.getUserId(), event);
    }

    public void publishContactEvent(ContactEvent event) {
        log.info("Publishing CONTACT event: {} from: {}", event.getEventType(), event.getEmail());
        kafkaTemplate.send(KafkaTopicConfig.CONTACT_EVENTS_TOPIC, event.getInquiryId(), event);
    }
}