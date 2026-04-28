package com.scrapninja.enquiry.repository;

import com.scrapninja.enquiry.entity.ChatLead;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ChatLeadRepository extends JpaRepository<ChatLead, UUID> {

    Page<ChatLead> findAllByOrderByCreatedAtDesc(Pageable pageable);

    Page<ChatLead> findByFlowOrderByCreatedAtDesc(String flow, Pageable pageable);

    boolean existsByPhone(String phone);

    long countBySource(String source);
}
