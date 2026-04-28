package com.scrapninja.location.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.scrapninja.location.dto.LocationRequest;
import com.scrapninja.location.dto.LocationResponse;
import com.scrapninja.location.entity.LocationUpdate;
import com.scrapninja.location.service.LocationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/locations")
@RequiredArgsConstructor
@Slf4j
public class LocationController {

    private final LocationService locationService;
    private final ObjectMapper objectMapper;

    @PostMapping
    public ResponseEntity<?> saveLocation(
            @RequestHeader(value = "Authorization", required = false) String authHeader,
            @Valid @RequestBody LocationRequest request) {
        try {
            UUID userId = extractUserIdFromToken(authHeader);
            String userEmail = extractEmailFromToken(authHeader);
            if (userId == null) {
                return ResponseEntity.status(401).body(Map.of("error", "Authorization required"));
            }
            LocationUpdate saved = locationService.saveLocation(userId, userEmail, request);
            return ResponseEntity.ok(toResponse(saved));
        } catch (Exception e) {
            log.error("Error saving location", e);
            return ResponseEntity.internalServerError().body(Map.of("error", e.getMessage()));
        }
    }

    // Admin: get latest location for every active user
    @GetMapping("/live")
    public ResponseEntity<?> getLiveLocations() {
        List<LocationResponse> locations = locationService.getLiveLocations()
                .stream().map(this::toResponse).collect(Collectors.toList());
        return ResponseEntity.ok(locations);
    }

    // Admin: get location history for a specific user
    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getUserHistory(
            @PathVariable UUID userId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "100") int size) {
        Page<LocationUpdate> history = locationService.getHistoryForUser(userId, page, size);
        return ResponseEntity.ok(Map.of(
                "content", history.getContent().stream().map(this::toResponse).collect(Collectors.toList()),
                "totalElements", history.getTotalElements(),
                "totalPages", history.getTotalPages(),
                "page", page
        ));
    }

    // Current user's own latest location
    @GetMapping("/me")
    public ResponseEntity<?> getMyLocation(
            @RequestHeader(value = "Authorization", required = false) String authHeader) {
        UUID userId = extractUserIdFromToken(authHeader);
        if (userId == null) {
            return ResponseEntity.status(401).body(Map.of("error", "Authorization required"));
        }
        return locationService.getLatestForUser(userId)
                .map(l -> ResponseEntity.ok((Object) toResponse(l)))
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/health")
    public ResponseEntity<?> health() {
        return ResponseEntity.ok(Map.of("status", "UP", "service", "Location Service"));
    }

    // ── helpers ──────────────────────────────────────────────────────────────

    private UUID extractUserIdFromToken(String authHeader) {
        Map<String, Object> claims = decodeToken(authHeader);
        if (claims == null) return null;
        String userId = (String) claims.get("userId");
        if (userId == null) return null;
        try {
            return UUID.fromString(userId);
        } catch (Exception e) {
            return null;
        }
    }

    private String extractEmailFromToken(String authHeader) {
        Map<String, Object> claims = decodeToken(authHeader);
        if (claims == null) return null;
        return (String) claims.get("email");
    }

    @SuppressWarnings("unchecked")
    private Map<String, Object> decodeToken(String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) return null;
        String token = authHeader.substring(7);
        String[] parts = token.split("\\.");
        if (parts.length != 3) return null;
        try {
            String payload = parts[1];
            int rem = payload.length() % 4;
            if (rem != 0) payload += "=".repeat(4 - rem);
            String decoded = new String(Base64.getUrlDecoder().decode(payload), StandardCharsets.UTF_8);
            return objectMapper.readValue(decoded, Map.class);
        } catch (Exception e) {
            log.debug("Token decode failed: {}", e.getMessage());
            return null;
        }
    }

    private LocationResponse toResponse(LocationUpdate u) {
        return LocationResponse.builder()
                .id(u.getId())
                .userId(u.getUserId())
                .userEmail(u.getUserEmail())
                .latitude(u.getLatitude())
                .longitude(u.getLongitude())
                .accuracy(u.getAccuracy())
                .speed(u.getSpeed())
                .heading(u.getHeading())
                .timestamp(u.getTimestamp())
                .createdAt(u.getCreatedAt())
                .build();
    }
}
