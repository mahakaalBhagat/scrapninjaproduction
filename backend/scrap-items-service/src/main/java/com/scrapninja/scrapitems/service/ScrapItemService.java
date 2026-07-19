package com.scrapninja.scrapitems.service;

import com.scrapninja.scrapitems.entity.ScrapItem;
import com.scrapninja.scrapitems.entity.ScrapCategory;
import com.scrapninja.scrapitems.repository.ScrapItemRepository;
import com.scrapninja.scrapitems.repository.ScrapCategoryRepository;
import com.scrapninja.scrapitems.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ScrapItemService {

    @Autowired
    private ScrapItemRepository itemRepository;

    @Autowired
    private ScrapCategoryRepository categoryRepository;

    /**
     * Get all active scrap items
     */
    public List<ScrapItem> getAllItems() {
        return itemRepository.findByIsActiveTrue();
    }

    /**
     * Get scrap items by category ID
     */
    public List<ScrapItem> getItemsByCategory(Long categoryId) {
        ScrapCategory category = categoryRepository.findById(categoryId)
            .orElseThrow(() -> new ResourceNotFoundException("Category not found with ID: " + categoryId));
        return itemRepository.findByCategoryAndIsActiveTrue(category);
    }

    /**
     * Search items by name or description
     */
    public List<ScrapItem> searchItems(String query) {
        return itemRepository.findByNameContainingIgnoreCase(query);
    }

    /**
     * Get item by ID
     */
    public ScrapItem getItemById(Long id) {
        return itemRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Item not found with ID: " + id));
    }

    /**
     * Get all categories
     */
    public List<ScrapCategory> getAllCategories() {
        return categoryRepository.findByIsActiveTrue();
    }

    /**
     * Get category by ID
     */
    public ScrapCategory getCategoryById(Long id) {
        return categoryRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Category not found with ID: " + id));
    }

    /**
     * Create new item (admin only)
     */
    public ScrapItem createItem(ScrapItem item) {
        return itemRepository.save(item);
    }

    /**
     * Update item
     */
    public ScrapItem updateItem(Long id, ScrapItem itemDetails) {
        ScrapItem item = getItemById(id);
        if (itemDetails.getName() != null) {
            item.setName(itemDetails.getName());
        }
        if (itemDetails.getDescription() != null) {
            item.setDescription(itemDetails.getDescription());
        }
        if (itemDetails.getPricePerUnit() != null) {
            item.setPricePerUnit(itemDetails.getPricePerUnit());
        }
        if (itemDetails.getCategory() != null) {
            item.setCategory(itemDetails.getCategory());
        }
        return itemRepository.save(item);
    }

    /**
     * Deactivate item
     */
    public void deactivateItem(Long id) {
        ScrapItem item = getItemById(id);
        item.setIsActive(false);
        itemRepository.save(item);
    }
}
