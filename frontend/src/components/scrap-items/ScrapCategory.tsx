'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ScrapCategoryProps {
  categories: string[];
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

const categoryEmojis: Record<string, string> = {
  'Paper': '📰',
  'Plastic': '🍾',
  'Metals': '⚙️',
  'E-Waste': '💻',
  'Appliances': '🌬️',
  'Vehicles': '🚗',
};

export const ScrapCategory: React.FC<ScrapCategoryProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
}) => {
  return (
    <div className="flex flex-wrap gap-3 mb-8">
      {/* All Items Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onCategoryChange(null)}
        className={`px-6 py-2.5 rounded-full font-semibold transition-all ${
          selectedCategory === null
            ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/50'
            : 'bg-emerald-950/50 text-emerald-200 border border-emerald-500/50 hover:bg-emerald-950/70'
        }`}
      >
        📋 All Items
      </motion.button>

      {/* Category Buttons */}
      {categories.map((category) => (
        <motion.button
          key={category}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onCategoryChange(category)}
          className={`px-6 py-2.5 rounded-full font-semibold transition-all flex items-center gap-2 ${
            selectedCategory === category
              ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/50'
              : 'bg-emerald-950/50 text-emerald-200 border border-emerald-500/50 hover:bg-emerald-950/70'
          }`}
        >
          <span>{categoryEmojis[category] || '📦'}</span>
          {category}
        </motion.button>
      ))}
    </div>
  );
};
