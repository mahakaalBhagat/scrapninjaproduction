package com.scrapninja.vendor.repository;

import com.scrapninja.vendor.entity.VendorOnboarding;
import com.scrapninja.vendor.entity.OnboardingStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.List;

@Repository
public interface VendorOnboardingRepository extends JpaRepository<VendorOnboarding, Long> {
    Optional<VendorOnboarding> findByUserId(Long userId);
    List<VendorOnboarding> findByStatus(OnboardingStatus status);
    List<VendorOnboarding> findByStatusOrderByCreatedAtDesc(OnboardingStatus status);
    List<VendorOnboarding> findAllByOrderByCreatedAtDesc();
}
