package com.scrapninja.auth.config;

import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.config.TopicBuilder;

@Configuration
public class KafkaTopicConfig {

    public static final String USER_EVENTS_TOPIC = "user-events";
    public static final String CONTACT_EVENTS_TOPIC = "contact-events";

    @Bean
    public NewTopic userEventsTopic() {
        return TopicBuilder.name(USER_EVENTS_TOPIC)
                .partitions(3)
                .replicas(1)
                .build();
    }

    @Bean
    public NewTopic contactEventsTopic() {
        return TopicBuilder.name(CONTACT_EVENTS_TOPIC)
                .partitions(3)
                .replicas(1)
                .build();
    }
}