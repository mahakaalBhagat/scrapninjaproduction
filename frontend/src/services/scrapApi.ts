// Real API integration for scrap items
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8085';

export interface ScrapItem {
  id: number;
  name: string;
  category: {
    id: number;
    name: string;
    description: string;
    emoji: string;
    iconUrl: string;
    isActive: boolean;
  };
  categoryId?: number;
  description: string;
  pricePerUnit: number;
  unit: string;
  imageUrl: string;
  emoji: string;
  isRecyclable: boolean;
  environmentalWarning: string;
  badge: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Category {
  id: number;
  name: string;
  description: string;
  emoji: string;
  iconUrl: string;
  isActive: boolean;
}


export const scrapApi = {
  // Get all items
  getAllItems: async (): Promise<ScrapItem[]> => {
    try {
      console.log(`[ScrapAPI] Fetching from: ${API_BASE_URL}/scrap-items-service/api/scrap-items`);
      const response = await fetch(`${API_BASE_URL}/scrap-items-service/api/scrap-items`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(`[ScrapAPI] Response status: ${response.status}`);
      if (!response.ok) throw new Error('Failed to fetch items');
      const data = await response.json();
      console.log(`[ScrapAPI] Got ${data.length} items:`, data.slice(0, 2));
      return data;
    } catch (error) {
      console.error('Error fetching scrap items:', error);
      return [];
    }
  },

  // Get items by category
  getItemsByCategory: async (categoryId: number): Promise<ScrapItem[]> => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/scrap-items-service/api/scrap-items/category/${categoryId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (!response.ok) throw new Error('Failed to fetch items by category');
      return await response.json();
    } catch (error) {
      console.error('Error fetching items by category:', error);
      return [];
    }
  },

  // Search items
  searchItems: async (query: string): Promise<ScrapItem[]> => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/scrap-items-service/api/scrap-items/search?query=${encodeURIComponent(query)}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (!response.ok) throw new Error('Failed to search items');
      return await response.json();
    } catch (error) {
      console.error('Error searching items:', error);
      return [];
    }
  },

  // Get item by ID
  getItemById: async (id: number): Promise<ScrapItem | null> => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/scrap-items-service/api/scrap-items/${id}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (!response.ok) return null;
      return await response.json();
    } catch (error) {
      console.error('Error fetching item by ID:', error);
      return null;
    }
  },

  // Get all categories
  getCategories: async (): Promise<Category[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/scrap-items-service/api/categories`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) throw new Error('Failed to fetch categories');
      return await response.json();
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  },

  // Get category by ID
  getCategoryById: async (id: number): Promise<Category | null> => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/scrap-items-service/api/categories/${id}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (!response.ok) return null;
      return await response.json();
    } catch (error) {
      console.error('Error fetching category:', error);
      return null;
    }
  },

  // Create new item
  createItem: async (item: Omit<ScrapItem, 'id' | 'createdAt' | 'updatedAt'>): Promise<ScrapItem | null> => {
    try {
      const response = await fetch(`${API_BASE_URL}/scrap-items-service/api/scrap-items`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      });
      if (!response.ok) throw new Error('Failed to create item');
      return await response.json();
    } catch (error) {
      console.error('Error creating item:', error);
      return null;
    }
  },

  // Update item
  updateItem: async (id: number, updates: Partial<ScrapItem>): Promise<ScrapItem | null> => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/scrap-items-service/api/scrap-items/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updates),
        }
      );
      if (!response.ok) throw new Error('Failed to update item');
      return await response.json();
    } catch (error) {
      console.error('Error updating item:', error);
      return null;
    }
  },

  // Delete item
  deleteItem: async (id: number): Promise<boolean> => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/scrap-items-service/api/scrap-items/${id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      return response.ok;
    } catch (error) {
      console.error('Error deleting item:', error);
      return false;
    }
  },

  // Add item to cart (mock)
  addToCart: async (itemId: number, quantity: number): Promise<boolean> => {
    try {
      console.log(`Added ${quantity} of item ${itemId} to cart`);
      return true;
    } catch (error) {
      console.error('Error adding to cart:', error);
      return false;
    }
  },
};
