'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, RefreshCw, Search } from 'lucide-react';
import { animations, viewportConfig, staggerChild, buttonAnimation, cardHover } from '@/utils/animations';

interface ScrapItem {
  symbol: string;
  name: string;
  category: 'metal' | 'plastic' | 'paper' | 'other';
  priceUSD: number;
  priceAED: number;
  change: number;
  trend: 'up' | 'down';
}

const USD_TO_AED = 3.67;

// Mock data - simulates realistic Dubai market prices for various scrap materials
const generateMockPrices = (): ScrapItem[] => {
  return [
    // Metals
    {
      symbol: 'COPPER',
      name: 'Copper',
      category: 'metal',
      priceUSD: 9.2 + Math.random() * 0.5,
      priceAED: 45 + Math.random() * 5,
      change: (Math.random() - 0.5) * 4,
      trend: Math.random() > 0.5 ? 'up' : 'down',
    },
    {
      symbol: 'ALUMINUM',
      name: 'Aluminum',
      category: 'metal',
      priceUSD: 2.15 + Math.random() * 0.3,
      priceAED: 8 + Math.random() * 1,
      change: (Math.random() - 0.5) * 3,
      trend: Math.random() > 0.5 ? 'up' : 'down',
    },
    {
      symbol: 'NICKEL',
      name: 'Nickel',
      category: 'metal',
      priceUSD: 8.5 + Math.random() * 1,
      priceAED: 32 + Math.random() * 4,
      change: (Math.random() - 0.5) * 5,
      trend: Math.random() > 0.5 ? 'up' : 'down',
    },
    {
      symbol: 'LEAD',
      name: 'Lead',
      category: 'metal',
      priceUSD: 2.0 + Math.random() * 0.2,
      priceAED: 7.5 + Math.random() * 1,
      change: (Math.random() - 0.5) * 2.5,
      trend: Math.random() > 0.5 ? 'up' : 'down',
    },
    {
      symbol: 'ZINC',
      name: 'Zinc',
      category: 'metal',
      priceUSD: 2.6 + Math.random() * 0.4,
      priceAED: 9.5 + Math.random() * 1.5,
      change: (Math.random() - 0.5) * 3.5,
      trend: Math.random() > 0.5 ? 'up' : 'down',
    },
    {
      symbol: 'IRON',
      name: 'Iron & Steel',
      category: 'metal',
      priceUSD: 0.15 + Math.random() * 0.05,
      priceAED: 0.55 + Math.random() * 0.2,
      change: (Math.random() - 0.5) * 2,
      trend: Math.random() > 0.5 ? 'up' : 'down',
    },
    // Plastics
    {
      symbol: 'HDPE',
      name: 'Plastic (HDPE)',
      category: 'plastic',
      priceUSD: 0.45 + Math.random() * 0.1,
      priceAED: 1.65 + Math.random() * 0.35,
      change: (Math.random() - 0.5) * 3,
      trend: Math.random() > 0.5 ? 'up' : 'down',
    },
    {
      symbol: 'PET',
      name: 'Plastic (PET)',
      category: 'plastic',
      priceUSD: 0.35 + Math.random() * 0.08,
      priceAED: 1.28 + Math.random() * 0.3,
      change: (Math.random() - 0.5) * 2.5,
      trend: Math.random() > 0.5 ? 'up' : 'down',
    },
    {
      symbol: 'PLASTIC',
      name: 'Mixed Plastic',
      category: 'plastic',
      priceUSD: 0.25 + Math.random() * 0.05,
      priceAED: 0.92 + Math.random() * 0.2,
      change: (Math.random() - 0.5) * 2,
      trend: Math.random() > 0.5 ? 'up' : 'down',
    },
    // Paper
    {
      symbol: 'NEWSPAPER',
      name: 'Newspaper',
      category: 'paper',
      priceUSD: 0.08 + Math.random() * 0.02,
      priceAED: 0.29 + Math.random() * 0.07,
      change: (Math.random() - 0.5) * 1.5,
      trend: Math.random() > 0.5 ? 'up' : 'down',
    },
    {
      symbol: 'CARDBOARD',
      name: 'Cardboard',
      category: 'paper',
      priceUSD: 0.12 + Math.random() * 0.03,
      priceAED: 0.44 + Math.random() * 0.1,
      change: (Math.random() - 0.5) * 1.8,
      trend: Math.random() > 0.5 ? 'up' : 'down',
    },
    {
      symbol: 'WHITEPAPER',
      name: 'White Paper',
      category: 'paper',
      priceUSD: 0.15 + Math.random() * 0.04,
      priceAED: 0.55 + Math.random() * 0.15,
      change: (Math.random() - 0.5) * 2,
      trend: Math.random() > 0.5 ? 'up' : 'down',
    },
    // Other
    {
      symbol: 'GLASS',
      name: 'Glass',
      category: 'other',
      priceUSD: 0.05 + Math.random() * 0.02,
      priceAED: 0.18 + Math.random() * 0.07,
      change: (Math.random() - 0.5) * 1,
      trend: Math.random() > 0.5 ? 'up' : 'down',
    },
    {
      symbol: 'RUBBER',
      name: 'Rubber Tires',
      category: 'other',
      priceUSD: 0.20 + Math.random() * 0.05,
      priceAED: 0.73 + Math.random() * 0.18,
      change: (Math.random() - 0.5) * 2.5,
      trend: Math.random() > 0.5 ? 'up' : 'down',
    },
  ];
};

const categoryColors = {
  metal: 'bg-orange-50 border-orange-200',
  plastic: 'bg-blue-50 border-blue-200',
  paper: 'bg-yellow-50 border-yellow-200',
  other: 'bg-green-50 border-green-200',
};

const categoryLabels = {
  metal: '🔩 Metals',
  plastic: '♻️ Plastics',
  paper: '📰 Paper',
  other: '🔄 Other',
};

export const LiveMetalIndexSection = () => {
  const [scrapItems, setScrapItems] = useState<ScrapItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<ScrapItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'metal' | 'plastic' | 'paper' | 'other'>('all');

  const fetchScrapPrices = async () => {
    try {
      setIsRefreshing(true);
      setError(null);

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // Generate mock data
      const prices = generateMockPrices();
      setScrapItems(prices);
      setLastUpdated(new Date().toLocaleTimeString());
      setIsLoading(false);
      filterItems(prices, searchTerm, selectedCategory);
    } catch (err) {
      setError('Failed to load live data');
      setIsLoading(false);
    } finally {
      setIsRefreshing(false);
    }
  };

  const filterItems = (items: ScrapItem[], search: string, category: string) => {
    let filtered = items;

    if (category !== 'all') {
      filtered = filtered.filter(item => item.category === category);
    }

    if (search) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.symbol.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredItems(filtered);
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    filterItems(scrapItems, value, selectedCategory);
  };

  const handleCategoryFilter = (category: 'all' | 'metal' | 'plastic' | 'paper' | 'other') => {
    setSelectedCategory(category);
    filterItems(scrapItems, searchTerm, category);
  };

  useEffect(() => {
    fetchScrapPrices();

    // Auto-refresh every 60 seconds
    const interval = setInterval(() => {
      fetchScrapPrices();
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <section id="metal-index" className="py-16 md:py-24 bg-neutral-50">
        <div className="container-responsive">
          <div className="text-center">
            <h2 className="heading-1 mb-4">Dubai Scrap Materials Prices</h2>
            <p className="text-lg text-neutral-600">Loading live prices (USD & AED)...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="metal-index" className="py-16 md:py-24 bg-neutral-50">
        <div className="container-responsive">
          <div className="text-center mb-16">
            <h2 className="heading-1 mb-4">Dubai Scrap Materials Prices</h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Live data unavailable. Please try again later.
            </p>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p className="text-red-700">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="metal-index" className="py-16 md:py-24 bg-neutral-50">
      <div className="container-responsive">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={animations.fadeUp}
        >
          <h2 className="heading-1 mb-4">Dubai Scrap Materials Prices</h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Live scrap material prices in Dubai. Metals, plastics, paper & more in USD and AED per kg. 
            Last updated: <span className="font-semibold">{lastUpdated}</span>
          </p>
          <motion.button
            onClick={fetchScrapPrices}
            disabled={isRefreshing}
            className="mt-4 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary-600 hover:text-primary-700 disabled:opacity-50"
            {...buttonAnimation}
          >
            <RefreshCw size={16} className={isRefreshing ? 'animate-spin' : ''} />
            {isRefreshing ? 'Refreshing...' : 'Refresh Now'}
          </motion.button>
        </motion.div>

        {/* Search Box */}
        <motion.div 
          className="mb-8"
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={animations.fadeUp}
        >
          <div className="relative">
            <Search className="absolute left-4 top-3 h-5 w-5 text-neutral-400" />
            <input
              type="text"
              placeholder="Search material... (e.g., Copper, Plastic, Newspaper)"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </motion.div>

        {/* Category Filter */}
        <motion.div 
          className="mb-8 flex flex-wrap gap-3"
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={animations.staggerContainer}
        >
          <motion.button
            onClick={() => handleCategoryFilter('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              selectedCategory === 'all'
                ? 'bg-primary-600 text-white'
                : 'bg-white border border-neutral-300 text-neutral-700 hover:border-primary-600'
            }`}
            variants={staggerChild}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            All Materials
          </motion.button>
          <motion.button
            onClick={() => handleCategoryFilter('metal')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              selectedCategory === 'metal'
                ? 'bg-orange-600 text-white'
                : 'bg-white border border-neutral-300 text-neutral-700 hover:border-orange-600'
            }`}
            variants={staggerChild}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            🔩 Metals
          </motion.button>
          <motion.button
            onClick={() => handleCategoryFilter('plastic')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              selectedCategory === 'plastic'
                ? 'bg-blue-600 text-white'
                : 'bg-white border border-neutral-300 text-neutral-700 hover:border-blue-600'
            }`}
            variants={staggerChild}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ♻️ Plastics
          </motion.button>
          <motion.button
            onClick={() => handleCategoryFilter('paper')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              selectedCategory === 'paper'
                ? 'bg-yellow-600 text-white'
                : 'bg-white border border-neutral-300 text-neutral-700 hover:border-yellow-600'
            }`}
            variants={staggerChild}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            📰 Paper
          </motion.button>
          <motion.button
            onClick={() => handleCategoryFilter('other')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              selectedCategory === 'other'
                ? 'bg-green-600 text-white'
                : 'bg-white border border-neutral-300 text-neutral-700 hover:border-green-600'
            }`}
            variants={staggerChild}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            🔄 Other
          </motion.button>
        </motion.div>

        {/* Results Count */}
        <motion.div 
          className="mb-6 text-sm text-neutral-600"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportConfig}
        >
          Showing <span className="font-semibold">{filteredItems.length}</span> scrap material{filteredItems.length !== 1 ? 's' : ''}
        </motion.div>

        {/* Scrap Items Grid */}
        {filteredItems.length > 0 ? (
          <motion.div 
            key={selectedCategory + searchTerm}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden"
            animate="visible"
            variants={animations.staggerContainer}
          >
            {filteredItems.map((item) => (
              <motion.div
                key={item.symbol}
                className={`card border transition-all ${categoryColors[item.category]}`}
                variants={staggerChild}
                {...cardHover}
              >
                {/* Item Header */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="heading-4 text-neutral-900">{item.name}</h3>
                    <p className="text-xs text-neutral-500">{item.symbol}</p>
                  </div>
                  <motion.div 
                    className="inline-flex items-center justify-center h-10 w-10 rounded-lg bg-primary-100"
                    whileHover={{ scale: 1.1 }}
                  >
                    {item.trend === 'up' ? (
                      <TrendingUp className="h-5 w-5 text-green-600" />
                    ) : (
                      <TrendingDown className="h-5 w-5 text-red-600" />
                    )}
                  </motion.div>
                </div>

                {/* Price Information */}
                <div className="space-y-3 mb-4">
                  <div>
                    <p className="text-xs text-neutral-500 mb-1">USD Price (per kg)</p>
                    <p className="text-lg font-bold text-neutral-900">${item.priceUSD.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-neutral-500 mb-1">AED Price (per kg)</p>
                    <p className="text-lg font-semibold text-primary-600">AED {item.priceAED.toFixed(2)}</p>
                  </div>
                </div>

                {/* Change Indicator */}
                <div className={`pt-4 border-t border-current border-opacity-20 flex items-center gap-2 ${
                  item.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {item.trend === 'up' ? (
                    <TrendingUp className="h-4 w-4" />
                  ) : (
                    <TrendingDown className="h-4 w-4" />
                  )}
                  <span className="font-semibold text-sm">{item.trend === 'up' ? '+' : ''}{item.change.toFixed(2)}%</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            className="text-center py-12 bg-white rounded-lg border border-neutral-200"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewportConfig}
          >
            <p className="text-neutral-600">No materials found matching your search.</p>
          </motion.div>
        )}

        {/* Information Box */}
        <motion.div 
          className="mt-12 bg-white rounded-lg shadow-soft p-6 md:p-8 border border-primary-100"
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={animations.fadeUp}
        >
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={animations.staggerContainer}
          >
            <motion.div variants={staggerChild}>
              <h4 className="heading-4 mb-2 text-primary-600">Dual Currency</h4>
              <p className="text-neutral-600 text-sm">
                All prices displayed in both USD and AED per kilogram for your convenience.
              </p>
            </motion.div>
            <motion.div variants={staggerChild}>
              <h4 className="heading-4 mb-2 text-primary-600">Multiple Materials</h4>
              <p className="text-neutral-600 text-sm">
                Get rates for metals, plastics, paper, glass, rubber and more. Fair Dubai market pricing.
              </p>
            </motion.div>
            <motion.div variants={staggerChild}>
              <h4 className="heading-4 mb-2 text-primary-600">Instant Quotes</h4>
              <p className="text-neutral-600 text-sm">
                Know exact prices, then schedule your collection. Same-day pickup available across Dubai.
              </p>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Disclaimer */}
        <motion.p 
          className="text-center text-xs text-neutral-500 mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportConfig}
        >
          *Prices are indicative based on Dubai market rates in USD and AED per kg. Final prices may vary based on material purity, weight, and current market conditions.
        </motion.p>
      </div>
    </section>
  );
};
