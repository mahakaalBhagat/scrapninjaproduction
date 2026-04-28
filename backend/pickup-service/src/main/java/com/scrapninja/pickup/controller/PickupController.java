package com.scrapninja.pickup.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.scrapninja.pickup.dto.PickupRequestDTO;
import com.scrapninja.pickup.service.PickupService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/pickups")
@RequiredArgsConstructor
@Slf4j
public class PickupController {

    private final PickupService pickupService;
    private final ObjectMapper objectMapper;

    @PostMapping
    public ResponseEntity<?> createPickup(
            @RequestHeader(value = "Authorization", required = false) String authHeader,
            @RequestBody PickupRequestDTO request) {
        try {
            UUID userId = extractUserIdFromAuth(authHeader, request.getUserId());
            if (userId == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of("error", "Authentication required"));
            }
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(pickupService.createPickup(userId, request));
        } catch (Exception e) {
            log.error("Error creating pickup", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping
    public ResponseEntity<?> getUserPickups(
            @RequestHeader(value = "Authorization", required = false) String authHeader,
            @RequestHeader(value = "X-User-Id", required = false) String userIdHeader) {
        try {
            UUID userId = extractUserIdFromAuth(authHeader, userIdHeader);
            if (userId == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of("error", "Authentication required"));
            }
            List<PickupRequestDTO> pickups = pickupService.getUserPickups(userId);
            return ResponseEntity.ok(pickups);
        } catch (Exception e) {
            log.error("Error fetching pickups", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getPickupById(@PathVariable String id) {
        try {
            return ResponseEntity.ok(pickupService.getPickupById(id));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", e.getMessage()));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updatePickup(@PathVariable String id,
            @RequestBody PickupRequestDTO request) {
        return ResponseEntity.ok(Map.of("message", "Update not implemented yet", "id", id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> cancelPickup(@PathVariable String id) {
        try {
            return ResponseEntity.ok(pickupService.cancelPickup(id));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> health() {
        return ResponseEntity.ok(Map.of("status", "UP", "service", "pickup-service"));
    }

    /**
     * Extract userId from JWT Bearer token or fallback to explicit header/body value.
     * Decodes JWT payload without signature verification (internal service trust).
     */
    @SuppressWarnings("unchecked")
    private UUID extractUserIdFromAuth(String authHeader, String fallbackUserId) {
        // Try JWT first
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            String[] parts = token.split("\\.");
            if (parts.length == 3) {
                try {
                    String payload = parts[1];
                    int remainder = payload.length() % 4;
                    if (remainder != 0) payload += "=".repeat(4 - remainder);
                    String decoded = new String(Base64.getUrlDecoder().decode(payload), StandardCharsets.UTF_8);
                    Map<String, Object> claims = objectMapper.readValue(decoded, Map.class);
                    String userId = (String) claims.get("userId");
                    if (userId != null) return UUID.fromString(userId);
                } catch (Exception e) {
                    log.debug("JWT parse failed: {}", e.getMessage());
                }
            }
        }
        // Fallback to explicit userId
        if (fallbackUserId != null && !fallbackUserId.isBlank()) {
            try {
                return UUID.fromString(fallbackUserId);
            } catch (Exception ignored) {
            }
        }
        return null;
    }
}