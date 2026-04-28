package com.scrapninja.location.repository;

import com.scrapninja.location.entity.LocationUpdate;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface LocationRepository extends JpaRepository<LocationUpdate, UUID> {

    Optional<LocationUpdate> findTopByUserIdOrderByTimestampDesc(UUID userId);

    Page<LocationUpdate> findByUserIdOrderByTimestampDesc(UUID userId, Pageable pageable);

    // Latest location per distinct user — used by admin live view
    @Query(value = """
            SELECT DISTINCT ON (user_id) *
            FROM location_updates
            ORDER BY user_id, timestamp DESC
            """, nativeQuery = true)
    List<LocationUpdate> findLatestPerUser();

    // For cleanup — delete records older than a given time
    void deleteByTimestampBefore(LocalDateTime cutoff);
}
