package com.scrapninja.scrapitems.controller;

import com.scrapninja.scrapitems.entity.ScrapItem;
import com.scrapninja.scrapitems.entity.Category;
import com.scrapninja.scrapitems.service.ScrapItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/scrap-items")
@CrossOrigin(origins = "*")
public class ScrapItemController {
    
    @Autowired
    private ScrapItemService scrapItemService;
    
    @GetMapping
    public ResponseEntity<List<ScrapItem>> getAllItems() {
        return ResponseEntity.ok(scrapItemService.getAllItems());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<ScrapItem> getItemById(@PathVariable Long id) {
        Optional<ScrapItem> item = scrapItemService.getItemById(id);
        return item.map(ResponseEntity::ok)
                   .orElseGet(() -> ResponseEntity.notFound().build());
    }
    
    @GetMapping("/category/{categoryId}")
    public ResponseEntity<List<ScrapItem>> getItemsByCategory(@PathVariable Long categoryId) {
        return ResponseEntity.ok(scrapItemService.getItemsByCategory(categoryId));
    }
    
    @GetMapping("/search")
    public ResponseEntity<List<ScrapItem>> searchItems(@RequestParam String query) {
        return ResponseEntity.ok(scrapItemService.searchItems(query));
    }
    
    @PostMapping
    public ResponseEntity<ScrapItem> createItem(@RequestBody ScrapItem item) {
        return ResponseEntity.ok(scrapItemService.createItem(item));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<ScrapItem> updateItem(@PathVariable Long id, @RequestBody ScrapItem item) {
        ScrapItem updated = scrapItemService.updateItem(id, item);
        return updated != null ? ResponseEntity.ok(updated) : ResponseEntity.notFound().build();
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteItem(@PathVariable Long id) {
        scrapItemService.deleteItem(id);
        return ResponseEntity.noContent().build();
    }
}
