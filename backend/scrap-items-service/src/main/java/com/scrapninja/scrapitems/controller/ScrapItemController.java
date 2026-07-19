package com.scrapninja.scrapitems.controller;

import com.scrapninja.scrapitems.entity.ScrapItem;
import com.scrapninja.scrapitems.entity.ScrapCategory;
import com.scrapninja.scrapitems.service.ScrapItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/scrap-items")
@CrossOrigin(origins = "*")
public class ScrapItemController {

    @Autowired
    private ScrapItemService itemService;

    /**
     * Get all active scrap items
     */
    @GetMapping
    public ResponseEntity<List<ScrapItem>> getAllItems() {
        return ResponseEntity.ok(itemService.getAllItems());
    }

    /**
     * Get scrap items by category
     */
    @GetMapping("/category/{categoryId}")
    public ResponseEntity<List<ScrapItem>> getItemsByCategory(
            @PathVariable Long categoryId) {
        return ResponseEntity.ok(itemService.getItemsByCategory(categoryId));
    }

    /**
     * Search items by name/description
     */
    @GetMapping("/search")
    public ResponseEntity<List<ScrapItem>> searchItems(
            @RequestParam String query) {
        return ResponseEntity.ok(itemService.searchItems(query));
    }

    /**
     * Get item by ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<ScrapItem> getItemById(@PathVariable Long id) {
        return ResponseEntity.ok(itemService.getItemById(id));
    }

    /**
     * Get all categories
     */
    @GetMapping("/categories/all")
    public ResponseEntity<List<ScrapCategory>> getAllCategories() {
        return ResponseEntity.ok(itemService.getAllCategories());
    }

    /**
     * Get category by ID
     */
    @GetMapping("/categories/{id}")
    public ResponseEntity<ScrapCategory> getCategoryById(@PathVariable Long id) {
        return ResponseEntity.ok(itemService.getCategoryById(id));
    }
}
