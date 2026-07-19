'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Search, ShoppingCart, Leaf, ArrowLeft } from 'lucide-react';
import { ScrapItemCard } from '@/components/scrap-items/ScrapItemCard';
import { ScrapCategory } from '@/components/scrap-items/ScrapCategory';
import { scrapApi, type ScrapItem } from '@/services/scrapApi';
import { useCart } from '@/context/CartContext';
import { MarketplaceAccessGuard } from '@/components/MarketplaceAccessGuard';

type Currency = 'USD' | 'AED';

function ScrapItemsContent() {
  const router = useRouter();
  const { totalQuantity } = useCart();
  const [items, setItems] = useState<ScrapItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<ScrapItem[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [currency, setCurrency] = useState<Currency>('AED');

  // Currency conversion rates (USD as base: 1 USD = 3.67 AED)
  const conversionRates = {
    USD: 1,
    AED: 3.67,
  };

  const currencySymbols = {
    USD: '$',
    AED: 'د.إ',
  };

  const convertPrice = (priceInUSD: number): number => {
    return Number((priceInUSD * conversionRates[currency]).toFixed(2));
  };

  // Mock data for development
  const mockItems: ScrapItem[] = [
    { id: 1, name: 'Cardboard', pricePerUnit: 0.10, emoji: '📦', category: { id: 1, name: 'Paper', description: 'Cardboard and paper', emoji: '📄', iconUrl: '', isActive: true }, unit: 'kg', description: 'Used cardboard boxes', imageUrl: '', isRecyclable: true, environmentalWarning: '', badge: '', isActive: true },
    { id: 2, name: 'Plastic Bottles', pricePerUnit: 0.19, emoji: '🍾', category: { id: 2, name: 'Plastic', description: 'Plastic waste', emoji: '♻️', iconUrl: '', isActive: true }, unit: 'kg', description: 'Empty plastic bottles', imageUrl: '', isRecyclable: true, environmentalWarning: '', badge: '', isActive: true },
    { id: 3, name: 'Aluminum Cans', pricePerUnit: 1.00, emoji: '🥫', category: { id: 3, name: 'Metal', description: 'Metal scrap', emoji: '⚙️', iconUrl: '', isActive: true }, unit: 'kg', description: 'Aluminum beverage cans', imageUrl: '', isRecyclable: true, environmentalWarning: '', badge: '', isActive: true },
    { id: 4, name: 'Copper Scrap', pricePerUnit: 4.38, emoji: '🔴', category: { id: 3, name: 'Metal', description: 'Metal scrap', emoji: '⚙️', iconUrl: '', isActive: true }, unit: 'kg', description: 'Scrap copper wire and tubing', imageUrl: '', isRecyclable: true, environmentalWarning: '', badge: '', isActive: true },
    { id: 5, name: 'Mobile Phone', pricePerUnit: 6.25, emoji: '📱', category: { id: 4, name: 'Electronics', description: 'Electronic waste', emoji: '🔌', iconUrl: '', isActive: true }, unit: 'piece', description: 'Old mobile phones', imageUrl: '', isRecyclable: true, environmentalWarning: '⚠️ Contains hazardous materials', badge: 'E-Waste', isActive: true },
    { id: 6, name: 'Laptop', pricePerUnit: 18.75, emoji: '💻', category: { id: 4, name: 'Electronics', description: 'Electronic waste', emoji: '🔌', iconUrl: '', isActive: true }, unit: 'piece', description: 'Old laptops and computers', imageUrl: '', isRecyclable: true, environmentalWarning: '⚠️ Contains hazardous materials', badge: 'E-Waste', isActive: true },
    { id: 7, name: 'Television', pricePerUnit: 25.00, emoji: '📺', category: { id: 4, name: 'Electronics', description: 'Electronic waste', emoji: '🔌', iconUrl: '', isActive: true }, unit: 'piece', description: 'Old TV sets', imageUrl: '', isRecyclable: true, environmentalWarning: '⚠️ Contains hazardous materials', badge: 'E-Waste', isActive: true },
  ];

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      console.log('[ScrapItemsPage] Using mock data');
      setIsLoading(true);
      try {
        // Always use mock data for now
        setItems(mockItems);
        setFilteredItems(mockItems);
        setCategories(['Paper', 'Plastic', 'Metal', 'Electronics']);
        console.log('[ScrapItemsPage] Loaded mock data:', { itemsCount: mockItems.length });
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  // Filter items based on category and search
  useEffect(() => {
    const applyFilters = async () => {
      let result = items;

      // Apply category filter
      if (selectedCategory) {
        result = result.filter(
          (item) => item.category?.name === selectedCategory
        );
      }

      // Apply search filter
      if (searchQuery.trim()) {
        result = result.filter(
          (item) =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description?.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      setFilteredItems(result);
    };

    applyFilters();
  }, [selectedCategory, searchQuery, items]);

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-slate-900 to-emerald-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.back()}
                className="p-2 bg-emerald-500/20 border border-emerald-500/50 rounded-lg text-emerald-400 hover:bg-emerald-500/30 transition-all"
                title="Back to Home"
              >
                <ArrowLeft size={24} />
              </motion.button>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 flex items-center gap-3">
                  <Leaf size={40} className="text-emerald-400" />
                  Scrap Marketplace
                </h1>
                <p className="text-emerald-200 text-lg">
                  Sell your scrap materials and earn rewards. Choose from our wide range of recyclable items.
                </p>
              </div>
            </div>
            {totalQuantity > 0 && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push('/cart')}
                className="relative p-3 bg-emerald-500/20 border border-emerald-500/50 rounded-lg text-emerald-400 hover:bg-emerald-500/30 transition-all"
              >
                <ShoppingCart size={28} />
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 bg-emerald-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm shadow-lg"
                >
                  {totalQuantity}
                </motion.div>
              </motion.button>
            )}
          </div>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-8"
        >
          <div className="relative">
            <Search className="absolute left-4 top-3.5 text-emerald-400" size={20} />
            <input
              type="text"
              placeholder="Search for scrap items... (e.g., laptop, copper, plastic)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-emerald-950/50 border border-emerald-500/50 rounded-lg text-white placeholder:text-emerald-300/50 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/30 transition-all"
            />
          </div>
        </motion.div>

        {/* Currency Toggle Buttons */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex flex-wrap gap-3 items-center justify-between"
        >
          <div className="flex gap-2 flex-wrap">
            {(['USD', 'AED'] as const).map((curr) => (
              <motion.button
                key={curr}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrency(curr)}
                className={`px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                  currency === curr
                    ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/50'
                    : 'bg-emerald-950/50 border border-emerald-500/50 text-emerald-200 hover:border-emerald-400'
                }`}
              >
                <span>{currencySymbols[curr]}</span>
                <span>{curr}</span>
              </motion.button>
            ))}
          </div>
          <div className="text-emerald-300 text-sm">
            💱 Check items in your preferred currency
          </div>
        </motion.div>

        {/* Category Filter */}
        <ScrapCategory
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />

        {/* Results Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-6 text-emerald-200 flex items-center justify-between"
        >
          <p>
            Showing <span className="font-bold text-emerald-400">{filteredItems.length}</span> items
            {selectedCategory && ` in ${selectedCategory}`}
            {searchQuery && ` matching "${searchQuery}"`}
          </p>
        </motion.div>

        {/* Items Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="bg-emerald-950/40 border border-emerald-500/30 rounded-xl h-96 animate-pulse"
              />
            ))}
          </div>
        ) : filteredItems.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ScrapItemCard
                  item={item}
                  currency={currency}
                  currencySymbol={currencySymbols[currency]}
                  convertPrice={convertPrice}
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-white mb-2">No items found</h3>
            <p className="text-emerald-200">
              Try adjusting your search or filter criteria
            </p>
          </motion.div>
        )}

        {/* Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-16 bg-gradient-to-r from-emerald-900/30 to-slate-800/30 border border-emerald-500/30 rounded-xl p-8"
        >
          <h2 className="text-2xl font-bold text-white mb-4">♻️ Why Recycle?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-emerald-200">
              <div className="text-4xl mb-2">🌍</div>
              <h3 className="font-bold text-lg mb-2 text-white">Protect the Planet</h3>
              <p>Recycling reduces pollution and conserves natural resources for future generations.</p>
            </div>
            <div className="text-emerald-200">
              <div className="text-4xl mb-2">💰</div>
              <h3 className="font-bold text-lg mb-2 text-white">Earn Rewards</h3>
              <p>Get paid for your scrap materials and contribute to a circular economy.</p>
            </div>
            <div className="text-emerald-200">
              <div className="text-4xl mb-2">🔄</div>
              <h3 className="font-bold text-lg mb-2 text-white">Support Sustainability</h3>
              <p>Every item recycled helps create a sustainable future for Dubai and beyond.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function ScrapItemsPage() {
  return (
    <MarketplaceAccessGuard requiredAccess="MARKETPLACE">
      <ScrapItemsContent />
    </MarketplaceAccessGuard>
  );
}
