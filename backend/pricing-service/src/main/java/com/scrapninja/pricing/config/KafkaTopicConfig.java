package com.scrapninja.pricing.config;

import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.config.TopicBuilder;

@Configuration
public class KafkaTopicConfig {

    public static final String PRICE_EVENTS_TOPIC = "price-events";

    @Bean
    public NewTopic priceEventsTopic() {
        return TopicBuilder.name(PRICE_EVENTS_TOPIC)
                .partitions(3)
                .replicas(1)
                .build();
    }
}