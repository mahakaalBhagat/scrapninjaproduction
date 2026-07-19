'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, AlertTriangle, Eye, Plus, Minus } from 'lucide-react';
import { ScrapItem } from '@/services/scrapApi';
import { getRecyclingMessage } from '@/data/recyclingMessages';
import { ItemDetailsModal } from './ItemDetailsModal';
import { useCart } from '@/context/CartContext';
import { CartItem } from '@/types/cart';

interface ScrapItemCardProps {
  item: ScrapItem;
  currency?: 'USD' | 'AED';
  currencySymbol?: string;
  convertPrice?: (price: number) => number;
}

export const ScrapItemCard: React.FC<ScrapItemCardProps> = ({ 
  item, 
  currency = 'AED',
  currencySymbol = 'د.إ',
  convertPrice = (p) => p
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const { addToCart } = useCart();
  const warningMessage = getRecyclingMessage(item.name);

  const handleAddItem = () => {
    const cartItem: CartItem = { ...item, quantity };
    addToCart(cartItem);
    setQuantity(0);
  };

  return (
    <>
      <ItemDetailsModal
        item={item}
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        currency={currency}
        currencySymbol={currencySymbol}
        convertPrice={convertPrice}
      />
      <motion.div
      whileHover={{ y: -8 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group"
    >
      <div className="bg-gradient-to-br from-emerald-950/40 to-slate-800/40 backdrop-blur-sm border border-emerald-500/30 rounded-xl overflow-hidden shadow-lg hover:shadow-emerald-500/20 transition-all h-full flex flex-col">
        
        {/* Image Section */}
        <div className="relative h-48 bg-gradient-to-br from-emerald-900/50 to-slate-900/50 overflow-hidden flex items-center justify-center">
          <div className="text-6xl">{item.emoji}</div>
          
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileHover={{ opacity: 1, scale: 1 }}
            className="absolute top-3 right-3 bg-emerald-500/90 backdrop-blur-sm px-3 py-1 rounded-lg text-sm font-semibold text-white flex items-center gap-1"
          >
            <span>{item.badge}</span>
          </motion.div>

          {/* Hover Overlay Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center"
          >
            <div className="text-center">
              <p className="text-emerald-300 text-sm font-medium px-4">
                {item.description}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Content Section */}
        <div className="p-5 flex-1 flex flex-col">
          
          {/* Item Name */}
          <h3 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">
            {item.name}
          </h3>

          {/* Price & Unit */}
          <div className="mb-3">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-emerald-400">
                {currencySymbol}{convertPrice(item.pricePerUnit || 0)}
              </span>
              <span className="text-sm text-emerald-200/70">per {item.unit}</span>
            </div>
          </div>

          {/* Environmental Warning */}
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: isHovered ? 1 : 0, height: isHovered ? 'auto' : 0 }}
            transition={{ duration: 0.3 }}
            className="mb-4 overflow-hidden"
          >
            <div className="bg-red-950/50 border border-red-500/30 rounded-lg p-3">
              <div className="flex gap-2 items-start">
                <AlertTriangle size={16} className="text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-red-200">
                  {warningMessage}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Add Item Button */}
          <div className="grid grid-cols-2 gap-3 mt-auto">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowDetailsModal(true)}
              className="w-full bg-slate-600 hover:bg-slate-500 text-white font-semibold py-2 px-3 rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-slate-500/50"
            >
              <Eye size={16} />
              Details
            </motion.button>
          </div>

          {/* Quantity Controls & Add Button */}
          <div className="flex gap-2 mt-4">
            {/* Quantity Selector */}
            <div className="flex items-center gap-1 bg-emerald-950/50 border border-emerald-500/50 rounded-lg px-2 py-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-1 text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/20 rounded"
              >
                <Minus size={18} />
              </motion.button>
              <input
                type="number"
                min="0"
                max="999"
                value={quantity}
                onFocus={(e) => e.target.select()}
                onChange={(e) => setQuantity(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-10 text-center text-white bg-blue-600 text-base border border-blue-500 outline-none font-bold rounded py-1"
                style={{
                  appearance: 'none',
                  MozAppearance: 'textfield',
                  WebkitAppearance: 'none',
                }}
              />
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setQuantity(quantity + 1)}
                className="p-1 text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/20 rounded"
              >
                <Plus size={18} />
              </motion.button>
            </div>

            {/* Add to Cart Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddItem}
              disabled={quantity === 0}
              className="flex-1 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold py-2 px-3 rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-emerald-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ShoppingCart size={16} />
              Add {quantity > 0 ? `(${quantity} kg)` : '(set qty)'}
            </motion.button>
          </div>

          {/* Recyclable Tag */}
          <div className="mt-3 text-center">
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
              item.isRecyclable
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50'
                : 'bg-red-500/20 text-red-300 border border-red-500/50'
            }`}>
              {item.isRecyclable ? '✓ Recyclable' : '✗ Not Recyclable'}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
    </>
  );
};
