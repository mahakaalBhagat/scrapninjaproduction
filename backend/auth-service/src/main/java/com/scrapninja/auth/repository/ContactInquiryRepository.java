package com.scrapninja.auth.repository;

import com.scrapninja.auth.entity.ContactInquiry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ContactInquiryRepository extends JpaRepository<ContactInquiry, UUID> {

    List<ContactInquiry> findByEmailOrderByCreatedAtDesc(String email);

    List<ContactInquiry> findByStatusOrderByCreatedAtDesc(ContactInquiry.Status status);

    List<ContactInquiry> findAllByOrderByCreatedAtDesc();
}