package com.scrapninja.scrapitems.service;

import com.scrapninja.scrapitems.entity.ScrapItem;
import com.scrapninja.scrapitems.entity.Category;
import com.scrapninja.scrapitems.repository.ScrapItemRepository;
import com.scrapninja.scrapitems.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ScrapItemService {
    
    @Autowired
    private ScrapItemRepository scrapItemRepository;
    
    @Autowired
    private CategoryRepository categoryRepository;
    
    public List<ScrapItem> getAllItems() {
        return scrapItemRepository.findByIsActiveTrue();
    }
    
    public List<ScrapItem> getItemsByCategory(Long categoryId) {
        Optional<Category> category = categoryRepository.findById(categoryId);
        if (category.isPresent()) {
            return scrapItemRepository.findByCategoryAndIsActiveTrue(category.get());
        }
        return List.of();
    }
    
    public List<ScrapItem> searchItems(String query) {
        return scrapItemRepository.findByNameContainingIgnoreCase(query);
    }
    
    public Optional<ScrapItem> getItemById(Long id) {
        return scrapItemRepository.findById(id);
    }
    
    public List<Category> getAllCategories() {
        return categoryRepository.findByIsActiveTrue();
    }
    
    public Optional<Category> getCategoryById(Long id) {
        return categoryRepository.findById(id);
    }
    
    public ScrapItem createItem(ScrapItem item) {
        return scrapItemRepository.save(item);
    }
    
    public ScrapItem updateItem(Long id, ScrapItem itemDetails) {
        Optional<ScrapItem> existing = scrapItemRepository.findById(id);
        if (existing.isPresent()) {
            ScrapItem item = existing.get();
            if (itemDetails.getName() != null) item.setName(itemDetails.getName());
            if (itemDetails.getDescription() != null) item.setDescription(itemDetails.getDescription());
            if (itemDetails.getPricePerUnit() != null) item.setPricePerUnit(itemDetails.getPricePerUnit());
            return scrapItemRepository.save(item);
        }
        return null;
    }
    
    public void deleteItem(Long id) {
        scrapItemRepository.deleteById(id);
    }
}
