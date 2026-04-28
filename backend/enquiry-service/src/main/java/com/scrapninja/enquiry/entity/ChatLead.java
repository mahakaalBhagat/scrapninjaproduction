package com.scrapninja.enquiry.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(
    name = "chat_leads",
    schema = "enquiry",
    indexes = {
        @Index(name = "idx_lead_phone", columnList = "phone"),
        @Index(name = "idx_lead_flow", columnList = "flow"),
        @Index(name = "idx_lead_created", columnList = "created_at DESC")
    }
)
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChatLead {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, length = 20)
    private String phone;

    /** Always "CHATBOT" for leads captured via the chatbot widget */
    @Column(nullable = false, length = 50)
    private String source;

    /** Which chatbot flow triggered the lead: WHAT_IS_SCRAPNINJA, HOW_TO_SELL, etc. */
    @Column(length = 100)
    private String flow;

    @Column(name = "ip_address", length = 45)
    private String ipAddress;

    @Column(name = "created_at", nullable = false, updatable = false)
    @CreationTimestamp
    private LocalDateTime createdAt;
}
