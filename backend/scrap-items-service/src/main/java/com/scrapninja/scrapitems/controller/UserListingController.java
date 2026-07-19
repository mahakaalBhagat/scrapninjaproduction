package com.scrapninja.scrapitems.controller;

import com.scrapninja.scrapitems.entity.UserListing;
import com.scrapninja.scrapitems.entity.ListingStatus;
import com.scrapninja.scrapitems.service.UserListingService;
import com.scrapninja.scrapitems.dto.UserListingRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/listings")
@CrossOrigin(origins = "*")
public class UserListingController {

    @Autowired
    private UserListingService listingService;

    /**
     * Create a new listing
     */
    @PostMapping
    public ResponseEntity<UserListing> createListing(
            @RequestHeader("X-User-Id") Long userId,
            @RequestParam Long itemId) {
        UserListing listing = listingService.createListing(userId, itemId);
        return ResponseEntity.status(HttpStatus.CREATED).body(listing);
    }

    /**
     * Get all listings for a user
     */
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<UserListing>> getUserListings(
            @PathVariable Long userId) {
        return ResponseEntity.ok(listingService.getUserListings(userId));
    }

    /**
     * Get user's available listings
     */
    @GetMapping("/user/{userId}/available")
    public ResponseEntity<List<UserListing>> getUserAvailableListings(
            @PathVariable Long userId) {
        return ResponseEntity.ok(listingService.getUserAvailableListings(userId));
    }

    /**
     * Get listing by ID
     */
    @GetMapping("/{listingId}")
    public ResponseEntity<UserListing> getListingById(
            @PathVariable Long listingId) {
        return ResponseEntity.ok(listingService.getListingById(listingId));
    }

    /**
     * Update listing status
     */
    @PutMapping("/{listingId}/status")
    public ResponseEntity<UserListing> updateListingStatus(
            @PathVariable Long listingId,
            @RequestParam ListingStatus status) {
        UserListing updated = listingService.updateListingStatus(listingId, status);
        return ResponseEntity.ok(updated);
    }

    /**
     * Get listings by status
     */
    @GetMapping("/status/{status}")
    public ResponseEntity<List<UserListing>> getListingsByStatus(
            @PathVariable ListingStatus status) {
        return ResponseEntity.ok(listingService.getListingsByStatus(status));
    }

    /**
     * Update listing details
     */
    @PutMapping("/{listingId}")
    public ResponseEntity<UserListing> updateListing(
            @PathVariable Long listingId) {
        UserListing updated = listingService.updateListing(listingId);
        return ResponseEntity.ok(updated);
    }

    /**
     * Delete a listing
     */
    @DeleteMapping("/{listingId}")
    public ResponseEntity<Void> deleteListing(@PathVariable Long listingId) {
        listingService.deleteListing(listingId);
        return ResponseEntity.noContent().build();
    }
}
