package com.scrapninja.vendor.repository;

import com.scrapninja.vendor.entity.VendorDocument;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface VendorDocumentRepository extends JpaRepository<VendorDocument, Long> {
    List<VendorDocument> findByOnboardingId(Long onboardingId);
    Optional<VendorDocument> findByIdAndOnboardingId(Long id, Long onboardingId);
    void deleteByOnboardingId(Long onboardingId);
}
