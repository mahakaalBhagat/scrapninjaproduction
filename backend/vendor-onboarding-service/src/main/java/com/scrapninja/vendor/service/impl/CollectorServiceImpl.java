package com.scrapninja.vendor.service.impl;

import com.scrapninja.vendor.dto.CollectorDTO;
import com.scrapninja.vendor.dto.CollectorRequestDTO;
import com.scrapninja.vendor.entity.Collector;
import com.scrapninja.vendor.repository.CollectorRepository;
import com.scrapninja.vendor.service.CollectorService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * Implementation of CollectorService
 */
@Service
@Transactional
public class CollectorServiceImpl implements CollectorService {

    @Autowired
    private CollectorRepository collectorRepository;

    @Override
    public CollectorDTO createCollector(Long vendorId, CollectorRequestDTO request) {
        // Validate vendor exists (would integrate with vendor service)
        
        Collector collector = new Collector();
        collector.setVendorId(vendorId);
        collector.setFullName(request.getFullName());
        collector.setMobileNumber(request.getMobileNumber());
        collector.setEmail(request.getEmail());
        collector.setAddress(request.getAddress());
        collector.setVehicleNumber(request.getVehicleNumber());
        collector.setAssignedArea(request.getAssignedArea());
        collector.setStatus("ACTIVE");
        collector.setIsDeleted(false);

        Collector savedCollector = collectorRepository.save(collector);
        return convertToDTO(savedCollector);
    }

    @Override
    public Page<CollectorDTO> getCollectorsByVendor(Long vendorId, Pageable pageable) {
        return collectorRepository.findByVendorIdAndIsDeletedFalse(vendorId, pageable)
                .map(this::convertToDTO);
    }

    @Override
    public CollectorDTO getCollectorById(Long collectorId, Long vendorId) {
        Collector collector = collectorRepository.findByIdAndVendorIdAndIsDeletedFalse(collectorId, vendorId)
                .orElseThrow(() -> new IllegalArgumentException("Collector not found"));
        return convertToDTO(collector);
    }

    @Override
    public CollectorDTO updateCollector(Long collectorId, Long vendorId, CollectorRequestDTO request) {
        Collector collector = collectorRepository.findByIdAndVendorIdAndIsDeletedFalse(collectorId, vendorId)
                .orElseThrow(() -> new IllegalArgumentException("Collector not found"));

        collector.setFullName(request.getFullName());
        collector.setMobileNumber(request.getMobileNumber());
        collector.setEmail(request.getEmail());
        collector.setAddress(request.getAddress());
        collector.setVehicleNumber(request.getVehicleNumber());
        collector.setAssignedArea(request.getAssignedArea());
        collector.setUpdatedAt(LocalDateTime.now());

        Collector updatedCollector = collectorRepository.save(collector);
        return convertToDTO(updatedCollector);
    }

    @Override
    public CollectorDTO updateCollectorStatus(Long collectorId, Long vendorId, String status) {
        Collector collector = collectorRepository.findByIdAndVendorIdAndIsDeletedFalse(collectorId, vendorId)
                .orElseThrow(() -> new IllegalArgumentException("Collector not found"));

        // Validate status
        if (!status.matches("ACTIVE|INACTIVE|SUSPENDED")) {
            throw new IllegalArgumentException("Invalid status. Must be ACTIVE, INACTIVE, or SUSPENDED");
        }

        collector.setStatus(status);
        collector.setUpdatedAt(LocalDateTime.now());

        Collector updatedCollector = collectorRepository.save(collector);
        return convertToDTO(updatedCollector);
    }

    @Override
    public void softDeleteCollector(Long collectorId, Long vendorId) {
        Collector collector = collectorRepository.findByIdAndVendorIdAndIsDeletedFalse(collectorId, vendorId)
                .orElseThrow(() -> new IllegalArgumentException("Collector not found"));

        collector.setIsDeleted(true);
        collector.setDeletedAt(LocalDateTime.now());
        collectorRepository.save(collector);
    }

    @Override
    public Map<String, Object> getCollectorStats(Long vendorId) {
        Map<String, Object> stats = new HashMap<>();
        
        long totalCollectors = collectorRepository.countByVendorIdAndIsDeletedFalse(vendorId);
        long activeCollectors = collectorRepository.countByVendorIdAndStatusAndIsDeletedFalse(vendorId, "ACTIVE");
        long inactiveCollectors = collectorRepository.countByVendorIdAndStatusAndIsDeletedFalse(vendorId, "INACTIVE");
        long suspendedCollectors = collectorRepository.countByVendorIdAndStatusAndIsDeletedFalse(vendorId, "SUSPENDED");

        stats.put("totalCollectors", totalCollectors);
        stats.put("activeCollectors", activeCollectors);
        stats.put("inactiveCollectors", inactiveCollectors);
        stats.put("suspendedCollectors", suspendedCollectors);

        return stats;
    }

    @Override
    public Page<CollectorDTO> searchCollectors(Long vendorId, String query, Pageable pageable) {
        return collectorRepository.searchByVendorIdAndQuery(vendorId, query, pageable)
                .map(this::convertToDTO);
    }

    @Override
    public List<CollectorDTO> getActiveCollectors(Long vendorId) {
        return collectorRepository.findByVendorIdAndStatusAndIsDeletedFalse(vendorId, "ACTIVE")
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    /**
     * Convert Collector entity to DTO
     */
    private CollectorDTO convertToDTO(Collector collector) {
        CollectorDTO dto = new CollectorDTO();
        dto.setId(collector.getId());
        dto.setVendorId(collector.getVendorId());
        dto.setFullName(collector.getFullName());
        dto.setMobileNumber(collector.getMobileNumber());
        dto.setEmail(collector.getEmail());
        dto.setAddress(collector.getAddress());
        dto.setVehicleNumber(collector.getVehicleNumber());
        dto.setAssignedArea(collector.getAssignedArea());
        dto.setStatus(collector.getStatus());
        dto.setCreatedAt(collector.getCreatedAt());
        dto.setUpdatedAt(collector.getUpdatedAt());
        return dto;
    }
}
