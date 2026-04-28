package com.scrapninja.pickup.service;

import com.scrapninja.pickup.dto.PickupRequestDTO;
import com.scrapninja.pickup.entity.PickupRequest;
import com.scrapninja.pickup.event.EventProducer;
import com.scrapninja.pickup.event.PickupEvent;
import com.scrapninja.pickup.repository.PickupRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class PickupService {

    private final PickupRepository pickupRepository;
    private final EventProducer eventProducer;

    @Transactional
    public PickupRequestDTO createPickup(UUID userId, PickupRequestDTO dto) {
        PickupRequest pickup = PickupRequest.builder()
                .userId(userId)
                .scrapType(dto.getScrapType() != null ? dto.getScrapType() : "METAL")
                .weight(dto.getWeight())
                .address(dto.getAddress() != null ? dto.getAddress() : "")
                .requestedDate(parseDate(dto.getRequestedDate()))
                .requestedTimeSlot(dto.getRequestedTimeSlot())
                .notes(dto.getNotes())
                .status(PickupRequest.PickupStatus.PENDING)
                .build();

        pickup = pickupRepository.save(pickup);
        log.info("Created pickup request {} for user {}", pickup.getId(), userId);

        try {
            PickupEvent event = PickupEvent.builder()
                    .eventType("PICKUP_CREATED")
                    .pickupId(pickup.getId().toString())
                    .userId(userId.toString())
                    .scrapType(pickup.getScrapType())
                    .weight(pickup.getWeight())
                    .address(pickup.getAddress())
                    .requestedDate(dto.getRequestedDate())
                    .requestedTimeSlot(dto.getRequestedTimeSlot())
                    .status(pickup.getStatus().name())
                    .timestamp(LocalDateTime.now())
                    .build();
            eventProducer.publishPickupEvent(event);
        } catch (Exception e) {
            log.warn("Kafka event publish failed (non-fatal): {}", e.getMessage());
        }

        return toDTO(pickup);
    }

    @Transactional(readOnly = true)
    public List<PickupRequestDTO> getUserPickups(UUID userId) {
        return pickupRepository.findByUserIdOrderByCreatedAtDesc(userId)
                .stream().map(this::toDTO).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public PickupRequestDTO getPickupById(String idStr) {
        UUID id = UUID.fromString(idStr);
        return pickupRepository.findById(id)
                .map(this::toDTO)
                .orElseThrow(() -> new IllegalArgumentException("Pickup not found: " + id));
    }

    @Transactional
    public PickupRequestDTO cancelPickup(String idStr) {
        UUID id = UUID.fromString(idStr);
        PickupRequest pickup = pickupRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Pickup not found: " + id));
        pickup.setStatus(PickupRequest.PickupStatus.CANCELLED);
        return toDTO(pickupRepository.save(pickup));
    }

    private LocalDate parseDate(String dateStr) {
        if (dateStr == null || dateStr.isBlank()) return null;
        try {
            return LocalDate.parse(dateStr);
        } catch (Exception e) {
            return null;
        }
    }

    private PickupRequestDTO toDTO(PickupRequest p) {
        return PickupRequestDTO.builder()
                .id(p.getId().toString())
                .userId(p.getUserId().toString())
                .scrapType(p.getScrapType())
                .weight(p.getWeight())
                .address(p.getAddress())
                .requestedDate(p.getRequestedDate() != null ? p.getRequestedDate().toString() : null)
                .requestedTimeSlot(p.getRequestedTimeSlot())
                .status(p.getStatus().name())
                .estimatedPrice(p.getEstimatedPrice())
                .notes(p.getNotes())
                .build();
    }
}
