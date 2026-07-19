package com.scrapninja.vendor.service;

import com.scrapninja.vendor.dto.CollectorDTO;
import com.scrapninja.vendor.dto.CollectorRequestDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Map;

/**
 * Service Interface for Collector Management
 */
public interface CollectorService {

    /**
     * Create a new collector for a vendor
     */
    CollectorDTO createCollector(Long vendorId, CollectorRequestDTO request);

    /**
     * Get all collectors for a vendor with pagination
     */
    Page<CollectorDTO> getCollectorsByVendor(Long vendorId, Pageable pageable);

    /**
     * Get a specific collector by ID
     */
    CollectorDTO getCollectorById(Long collectorId, Long vendorId);

    /**
     * Update a collector's information
     */
    CollectorDTO updateCollector(Long collectorId, Long vendorId, CollectorRequestDTO request);

    /**
     * Update collector status
     */
    CollectorDTO updateCollectorStatus(Long collectorId, Long vendorId, String status);

    /**
     * Soft delete a collector (mark as deleted)
     */
    void softDeleteCollector(Long collectorId, Long vendorId);

    /**
     * Get statistics for a vendor's collectors
     */
    Map<String, Object> getCollectorStats(Long vendorId);

    /**
     * Search collectors by name or mobile number
     */
    Page<CollectorDTO> searchCollectors(Long vendorId, String query, Pageable pageable);

    /**
     * List all active collectors for a vendor
     */
    List<CollectorDTO> getActiveCollectors(Long vendorId);
}
