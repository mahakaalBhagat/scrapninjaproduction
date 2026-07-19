'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertTriangle, Leaf, CheckCircle } from 'lucide-react';
import { ScrapItem } from '@/services/scrapApi';

interface ItemDetailsModalProps {
  item: ScrapItem | null;
  isOpen: boolean;
  onClose: () => void;
  currency?: 'USD' | 'AED';
  currencySymbol?: string;
  convertPrice?: (price: number) => number;
}

export const ItemDetailsModal: React.FC<ItemDetailsModalProps> = ({
  item,
  isOpen,
  onClose,
  currency = 'AED',
  currencySymbol = 'د.إ',
  convertPrice = (p) => p,
}) => {
  if (!item) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl max-h-[90vh] overflow-y-auto z-50 rounded-2xl"
          >
            <div className="bg-gradient-to-br from-emerald-950 via-slate-900 to-slate-950 border border-emerald-500/50 rounded-2xl shadow-2xl">
              {/* Header */}
              <div className="sticky top-0 bg-gradient-to-r from-emerald-950/95 to-slate-900/95 backdrop-blur-sm border-b border-emerald-500/30 p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-5xl">{item.emoji}</div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">{item.name}</h2>
                    <p className="text-emerald-300 text-sm">{item.category?.name || 'Category'}</p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onClose}
                  className="p-2 hover:bg-emerald-500/20 rounded-lg transition-colors"
                >
                  <X size={24} className="text-white" />
                </motion.button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Price Section */}
                <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-xl p-4">
                  <h3 className="text-lg font-semibold text-emerald-300 mb-3">Pricing</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-emerald-200/70 mb-1">Price Per Unit</p>
                      <p className="text-3xl font-bold text-emerald-400">
                        {currencySymbol}{convertPrice(item.pricePerUnit || 0)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-emerald-200/70 mb-1">Unit</p>
                      <p className="text-xl font-semibold text-white">{item.unit}</p>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Description</h3>
                  <p className="text-emerald-100 leading-relaxed">{item.description}</p>
                </div>

                {/* Environmental Warning */}
                {item.environmentalWarning && (
                  <div className="bg-red-950/40 border border-red-500/50 rounded-xl p-4">
                    <div className="flex gap-3 items-start">
                      <AlertTriangle size={20} className="text-red-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="text-lg font-semibold text-red-300 mb-2">⚠️ Environmental Warning</h3>
                        <p className="text-red-100">{item.environmentalWarning}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Recyclability Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div className={`rounded-xl p-4 border ${
                    item.isRecyclable
                      ? 'bg-emerald-950/40 border-emerald-500/50'
                      : 'bg-red-950/40 border-red-500/50'
                  }`}>
                    <div className="flex items-center gap-2 mb-2">
                      {item.isRecyclable ? (
                        <>
                          <CheckCircle size={20} className="text-emerald-400" />
                          <span className="font-semibold text-emerald-300">Recyclable</span>
                        </>
                      ) : (
                        <>
                          <AlertTriangle size={20} className="text-red-400" />
                          <span className="font-semibold text-red-300">Not Recyclable</span>
                        </>
                      )}
                    </div>
                    <p className="text-sm text-emerald-200/70">
                      {item.isRecyclable
                        ? 'This item can be recycled and repurposed'
                        : 'Please check local disposal guidelines'}
                    </p>
                  </div>

                  <div className="bg-emerald-950/40 border border-emerald-500/50 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Leaf size={20} className="text-emerald-400" />
                      <span className="font-semibold text-emerald-300">Badge</span>
                    </div>
                    <p className="text-lg font-bold text-emerald-300">{item.badge}</p>
                  </div>
                </div>

                {/* Stats */}
                <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-4">
                  <h3 className="text-lg font-semibold text-white mb-3">Details</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-slate-400 mb-1">Item ID</p>
                      <p className="font-mono text-emerald-300">{item.id}</p>
                    </div>
                    <div>
                      <p className="text-slate-400 mb-1">Category</p>
                      <p className="text-emerald-300">{item.category?.name || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-slate-400 mb-1">Status</p>
                      <p className={item.isActive ? 'text-emerald-300' : 'text-red-300'}>
                        {item.isActive ? 'Active' : 'Inactive'}
                      </p>
                    </div>
                    <div>
                      <p className="text-slate-400 mb-1">Type</p>
                      <p className="text-emerald-300">
                        {item.isRecyclable ? 'Recyclable Material' : 'Special Handling'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-emerald-500/30">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onClose}
                    className="px-4 py-3 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg transition-colors"
                  >
                    Close
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-4 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold rounded-lg transition-colors shadow-lg hover:shadow-emerald-500/50"
                  >
                    Sell This Item
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
