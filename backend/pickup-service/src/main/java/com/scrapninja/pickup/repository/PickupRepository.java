package com.scrapninja.pickup.repository;

import com.scrapninja.pickup.entity.PickupRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface PickupRepository extends JpaRepository<PickupRequest, UUID> {

    List<PickupRequest> findByUserIdOrderByCreatedAtDesc(UUID userId);

    List<PickupRequest> findByStatusOrderByCreatedAtDesc(PickupRequest.PickupStatus status);
}
