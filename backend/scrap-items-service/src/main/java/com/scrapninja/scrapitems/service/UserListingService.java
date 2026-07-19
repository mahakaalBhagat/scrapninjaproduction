package com.scrapninja.scrapitems.service;

import com.scrapninja.scrapitems.entity.UserListing;
import com.scrapninja.scrapitems.entity.ScrapItem;
import com.scrapninja.scrapitems.entity.ListingStatus;
import com.scrapninja.scrapitems.repository.UserListingRepository;
import com.scrapninja.scrapitems.repository.ScrapItemRepository;
import com.scrapninja.scrapitems.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Collections;

@Service
@Transactional
public class UserListingService {

    @Autowired
    private UserListingRepository listingRepository;

    @Autowired
    private ScrapItemRepository itemRepository;

    public UserListing createListing(Long userId, Long itemId) {
        throw new UnsupportedOperationException("User listing feature coming soon");
    }

    public List<UserListing> getUserListings(Long userId) {
        return Collections.emptyList();
    }

    public List<UserListing> getUserAvailableListings(Long userId) {
        return Collections.emptyList();
    }

    public UserListing getListingById(Long listingId) {
        throw new ResourceNotFoundException("Listing not found with ID: " + listingId);
    }

    public UserListing updateListingStatus(Long listingId, ListingStatus status) {
        throw new UnsupportedOperationException("Update feature coming soon");
    }

    public List<UserListing> getListingsByStatus(ListingStatus status) {
        return Collections.emptyList();
    }

    public UserListing updateListing(Long listingId) {
        throw new UnsupportedOperationException("Update feature coming soon");
    }

    public void deleteListing(Long listingId) {
        // Placeholder
    }
}
