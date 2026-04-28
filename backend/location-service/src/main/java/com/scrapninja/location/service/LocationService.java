package com.scrapninja.location.service;

import com.scrapninja.location.dto.LocationRequest;
import com.scrapninja.location.entity.LocationUpdate;
import com.scrapninja.location.repository.LocationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class LocationService {

    private final LocationRepository locationRepository;

    @Transactional
    public LocationUpdate saveLocation(UUID userId, String userEmail, LocationRequest request) {
        LocalDateTime ts = request.getTimestampMs() != null
                ? LocalDateTime.ofEpochSecond(request.getTimestampMs() / 1000,
                    (int) ((request.getTimestampMs() % 1000) * 1_000_000), ZoneOffset.UTC)
                : LocalDateTime.now(ZoneOffset.UTC);

        LocationUpdate update = LocationUpdate.builder()
                .userId(userId)
                .userEmail(userEmail)
                .latitude(request.getLatitude())
                .longitude(request.getLongitude())
                .accuracy(request.getAccuracy())
                .speed(request.getSpeed())
                .heading(request.getHeading())
                .timestamp(ts)
                .build();

        return locationRepository.save(update);
    }

    public List<LocationUpdate> getLiveLocations() {
        return locationRepository.findLatestPerUser();
    }

    public Optional<LocationUpdate> getLatestForUser(UUID userId) {
        return locationRepository.findTopByUserIdOrderByTimestampDesc(userId);
    }

    public Page<LocationUpdate> getHistoryForUser(UUID userId, int page, int size) {
        return locationRepository.findByUserIdOrderByTimestampDesc(
                userId, PageRequest.of(page, Math.min(size, 500)));
    }

    // Cleanup: keep only 24 hours of data to prevent DB bloat (runs every hour)
    @Scheduled(fixedDelay = 3_600_000)
    @Transactional
    public void cleanupOldLocations() {
        LocalDateTime cutoff = LocalDateTime.now(ZoneOffset.UTC).minusHours(24);
        locationRepository.deleteByTimestampBefore(cutoff);
        log.info("Cleaned up location records older than {}", cutoff);
    }
}
