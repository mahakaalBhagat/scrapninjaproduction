package com.scrapninja.vendor.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.scrapninja.vendor.dto.CollectorDTO;
import com.scrapninja.vendor.dto.CollectorRequestDTO;
import com.scrapninja.vendor.entity.Collector;
import com.scrapninja.vendor.service.CollectorService;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;
import java.util.Map;

/**
 * REST Controller for Collector Management
 * Enables vendors to create, read, update, and delete collectors
 */
@RestController
@RequestMapping("/api/v1/collectors")
@Validated
public class CollectorController {

    @Autowired
    private CollectorService collectorService;

    /**
     * Create a new collector
     */
    @PostMapping
    public ResponseEntity<?> createCollector(
            @Valid @RequestBody CollectorRequestDTO request,
            @RequestHeader("X-Vendor-Id") Long vendorId) {
        try {
            CollectorDTO collector = collectorService.createCollector(vendorId, request);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(Map.of("success", true, "data", collector, "message", "Collector created successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("success", false, "error", e.getMessage()));
        }
    }

    /**
     * Get all collectors for a vendor
     */
    @GetMapping
    public ResponseEntity<?> getCollectorsByVendor(
            @RequestHeader("X-Vendor-Id") Long vendorId,
            @RequestParam(defaultValue = "0") @Positive(message = "Page must be positive") int page,
            @RequestParam(defaultValue = "10") @Positive(message = "Size must be positive") int size) {
        try {
            Pageable pageable = PageRequest.of(page, size);
            Page<CollectorDTO> collectors = collectorService.getCollectorsByVendor(vendorId, pageable);
            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "data", collectors.getContent(),
                    "page", page,
                    "size", size,
                    "totalElements", collectors.getTotalElements(),
                    "totalPages", collectors.getTotalPages()
            ));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("success", false, "error", e.getMessage()));
        }
    }

    /**
     * Get a specific collector by ID
     */
    @GetMapping("/{collectorId}")
    public ResponseEntity<?> getCollectorById(
            @PathVariable Long collectorId,
            @RequestHeader("X-Vendor-Id") Long vendorId) {
        try {
            CollectorDTO collector = collectorService.getCollectorById(collectorId, vendorId);
            return ResponseEntity.ok(Map.of("success", true, "data", collector));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("success", false, "error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("success", false, "error", e.getMessage()));
        }
    }

    /**
     * Update a collector
     */
    @PutMapping("/{collectorId}")
    public ResponseEntity<?> updateCollector(
            @PathVariable Long collectorId,
            @Valid @RequestBody CollectorRequestDTO request,
            @RequestHeader("X-Vendor-Id") Long vendorId) {
        try {
            CollectorDTO updatedCollector = collectorService.updateCollector(collectorId, vendorId, request);
            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "data", updatedCollector,
                    "message", "Collector updated successfully"
            ));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("success", false, "error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("success", false, "error", e.getMessage()));
        }
    }

    /**
     * Update collector status (ACTIVE, INACTIVE, SUSPENDED)
     */
    @PatchMapping("/{collectorId}/status")
    public ResponseEntity<?> updateCollectorStatus(
            @PathVariable Long collectorId,
            @RequestParam String status,
            @RequestHeader("X-Vendor-Id") Long vendorId) {
        try {
            CollectorDTO updatedCollector = collectorService.updateCollectorStatus(collectorId, vendorId, status);
            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "data", updatedCollector,
                    "message", "Collector status updated successfully"
            ));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("success", false, "error", e.getMessage()));
        }
    }

    /**
     * Soft delete a collector
     */
    @DeleteMapping("/{collectorId}")
    public ResponseEntity<?> deleteCollector(
            @PathVariable Long collectorId,
            @RequestHeader("X-Vendor-Id") Long vendorId) {
        try {
            collectorService.softDeleteCollector(collectorId, vendorId);
            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "message", "Collector deleted successfully"
            ));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("success", false, "error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("success", false, "error", e.getMessage()));
        }
    }

    /**
     * Get summary statistics for vendor's collectors
     */
    @GetMapping("/stats/summary")
    public ResponseEntity<?> getCollectorStats(
            @RequestHeader("X-Vendor-Id") Long vendorId) {
        try {
            Map<String, Object> stats = collectorService.getCollectorStats(vendorId);
            return ResponseEntity.ok(Map.of("success", true, "data", stats));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("success", false, "error", e.getMessage()));
        }
    }

    /**
     * Search collectors by name or mobile
     */
    @GetMapping("/search")
    public ResponseEntity<?> searchCollectors(
            @RequestParam String query,
            @RequestHeader("X-Vendor-Id") Long vendorId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        try {
            Pageable pageable = PageRequest.of(page, size);
            Page<CollectorDTO> results = collectorService.searchCollectors(vendorId, query, pageable);
            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "data", results.getContent(),
                    "totalElements", results.getTotalElements()
            ));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("success", false, "error", e.getMessage()));
        }
    }
}
