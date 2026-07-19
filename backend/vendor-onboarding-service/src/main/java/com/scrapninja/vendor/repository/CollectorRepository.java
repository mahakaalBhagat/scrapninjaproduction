package com.scrapninja.vendor.repository;

import com.scrapninja.vendor.entity.Collector;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Repository interface for Collector entity
 */
@Repository
public interface CollectorRepository extends JpaRepository<Collector, Long> {

    /**
     * Find all collectors for a vendor (not deleted)
     */
    Page<Collector> findByVendorIdAndIsDeletedFalse(Long vendorId, Pageable pageable);

    /**
     * Find a specific collector
     */
    Optional<Collector> findByIdAndVendorIdAndIsDeletedFalse(Long id, Long vendorId);

    /**
     * Find all active collectors for a vendor
     */
    List<Collector> findByVendorIdAndStatusAndIsDeletedFalse(Long vendorId, String status);

    /**
     * Count total collectors for a vendor
     */
    long countByVendorIdAndIsDeletedFalse(Long vendorId);

    /**
     * Count collectors by status
     */
    long countByVendorIdAndStatusAndIsDeletedFalse(Long vendorId, String status);

    /**
     * Search collectors by name or mobile
     */
    @Query("SELECT c FROM Collector c WHERE c.vendorId = :vendorId AND c.isDeleted = false " +
           "AND (LOWER(c.fullName) LIKE LOWER(CONCAT('%', :query, '%')) " +
           "OR c.mobileNumber LIKE CONCAT('%', :query, '%'))")
    Page<Collector> searchByVendorIdAndQuery(@Param("vendorId") Long vendorId, 
                                             @Param("query") String query, 
                                             Pageable pageable);

    /**
     * Find by vendor and mobile (for duplicate checks)
     */
    Optional<Collector> findByVendorIdAndMobileNumberAndIsDeletedFalse(Long vendorId, String mobileNumber);

    /**
     * Find all collectors in an assigned area
     */
    List<Collector> findByVendorIdAndAssignedAreaAndStatusAndIsDeletedFalse(Long vendorId, String area, String status);
}
