package com.scrapninja.scrapitems.repository;

import com.scrapninja.scrapitems.entity.UserListing;
import com.scrapninja.scrapitems.entity.ListingStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface UserListingRepository extends JpaRepository<UserListing, Long> {
    List<UserListing> findByUserId(Long userId);
    List<UserListing> findByStatus(ListingStatus status);
    List<UserListing> findByUserIdAndStatus(Long userId, ListingStatus status);
}
