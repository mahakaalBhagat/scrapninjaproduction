'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Trash2, Plus, Minus, ArrowLeft, Globe } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { ESGComplianceDashboard } from '@/components/scrap-items/ESGComplianceDashboard';
import { MarketplaceAccessGuard } from '@/components/MarketplaceAccessGuard';

function CartPageContent() {
  const router = useRouter();
  const { cartItems, updateQuantity, removeFromCart, totalQuantity } = useCart();
  const [showESG, setShowESG] = useState(false);
  const [currency, setCurrency] = useState<'USD' | 'AED'>('AED');
  const [mounted, setMounted] = useState(false);
  
  // B2B Payment Status - In production, this would come from user context/API
  const [paymentStatus] = useState<'APPROVED' | 'PENDING' | 'REJECTED'>('APPROVED');
  const isPaymentApproved = paymentStatus === 'APPROVED';

  // Hydration guard - wait until component mounts to avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Currency conversion: 1 USD = 3.67 AED
  const conversionRates = { USD: 1, AED: 3.67 };
  const currencySymbols = { USD: '$', AED: 'د.إ' };

  const totalPrice = cartItems.reduce((sum, item) => {
    const price = item.pricePerUnit || 0; // Default to 0 if missing
    return sum + (price * item.quantity * conversionRates[currency]);
  }, 0).toFixed(2);

  // Show loading state until component is mounted
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-slate-900 to-emerald-950 flex items-center justify-center">
        <div className="text-emerald-400 text-xl">Loading cart...</div>
      </div>
    );
  }

  // If payment not approved, show payment status message
  if (!isPaymentApproved) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-slate-900 to-emerald-950 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.back()}
              className="p-2 bg-emerald-500/20 border border-emerald-500/50 rounded-lg text-emerald-400 hover:bg-emerald-500/30 mb-6 flex items-center gap-2"
            >
              <ArrowLeft size={24} />
              Back
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-br from-yellow-900/40 to-yellow-800/40 border border-yellow-500/50 rounded-xl p-8 text-center max-w-2xl mx-auto"
          >
            <div className="text-6xl mb-4">🔒</div>
            <h2 className="text-3xl font-bold text-white mb-4">Payment Approval Required</h2>
            <p className="text-yellow-200 mb-6">
              Your marketplace account is pending approval. Your payment status is:{' '}
              <span className="font-bold text-yellow-300">{paymentStatus}</span>
            </p>
            
            {paymentStatus === 'PENDING' && (
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mb-6">
                <p className="text-yellow-300">
                  Your account is currently under review. Marketplace access will be enabled once your payment has been approved.
                  This typically takes 1-3 business days.
                </p>
              </div>
            )}
            
            {paymentStatus === 'REJECTED' && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-6">
                <p className="text-red-300">
                  Your payment could not be processed. Please contact our support team to resolve this issue.
                </p>
              </div>
            )}

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push('/contact')}
              className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-emerald-500/50"
            >
              Contact Support
            </motion.button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-slate-900 to-emerald-950 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.back()}
              className="p-2 bg-emerald-500/20 border border-emerald-500/50 rounded-lg text-emerald-400 hover:bg-emerald-500/30"
            >
              <ArrowLeft size={24} />
            </motion.button>
            <h1 className="text-4xl font-bold text-white">My Cart</h1>
          </div>
          <div className="text-right">
            <p className="text-emerald-200">Total Items</p>
            <p className="text-3xl font-bold text-emerald-400">{totalQuantity} kg</p>
          </div>
        </motion.div>

        {/* Currency Toggle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-8 flex gap-3 flex-wrap"
        >
          {(['USD', 'AED'] as const).map((curr) => (
            <motion.button
              key={curr}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrency(curr)}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                currency === curr
                  ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/50'
                  : 'bg-emerald-950/50 border border-emerald-500/50 text-emerald-200'
              }`}
            >
              {currencySymbols[curr]} {curr}
            </motion.button>
          ))}
        </motion.div>

        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="lg:col-span-2 space-y-4"
            >
              {cartItems.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-6 bg-gradient-to-br from-emerald-950/40 to-slate-800/40 border border-emerald-500/30 rounded-xl flex items-center gap-6"
                >
                  {/* Item Image */}
                  <div className="text-6xl">{item.emoji}</div>

                  {/* Item Info */}
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-2">{item.name}</h3>
                    <p className="text-emerald-200 mb-3">{item.description}</p>
                    <div className="flex items-center gap-4">
                      <span className="text-emerald-400 font-semibold">{item.category.name}</span>
                      <span className="text-sm bg-emerald-500/20 px-3 py-1 rounded-full text-emerald-300">
                        Recyclable
                      </span>
                    </div>
                  </div>

                  {/* Quantity Controls (Zomato Style) */}
                  <div className="flex flex-col items-end gap-4">
                    <div className="bg-emerald-950/80 border border-emerald-500/50 rounded-lg p-2 flex items-center gap-1">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-2 text-emerald-400 hover:bg-emerald-500/20 rounded"
                      >
                        <Minus size={20} />
                      </motion.button>
                      <input
                        type="number"
                        min="0"
                        value={item.quantity}
                        onFocus={(e) => e.target.select()}
                        onChange={(e) => updateQuantity(item.id, Math.max(0, parseInt(e.target.value) || 0))}
                        className="w-12 text-center text-white bg-blue-600 text-lg border border-blue-500 outline-none font-bold rounded py-1"
                        style={{
                          appearance: 'none',
                          MozAppearance: 'textfield',
                          WebkitAppearance: 'none',
                        }}
                      />
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-2 text-emerald-400 hover:bg-emerald-500/20 rounded"
                      >
                        <Plus size={20} />
                      </motion.button>
                    </div>

                    {/* Price & Remove */}
                    <div className="text-right">
                      <p className="text-2xl font-bold text-emerald-400">
                        {currencySymbols[currency]}
                        {((item.pricePerUnit || 0) * item.quantity * conversionRates[currency]).toFixed(2)}
                      </p>
                      <p className="text-xs text-emerald-300">
                        {currencySymbols[currency]}
                        {((item.pricePerUnit || 0) * conversionRates[currency]).toFixed(2)} per kg
                      </p>
                    </div>

                    {/* Remove Button */}
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 bg-red-500/20 border border-red-500/50 text-red-400 rounded-lg hover:bg-red-500/30"
                    >
                      <Trash2 size={20} />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Summary & ESG */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-1 space-y-4"
            >
              {/* Order Summary */}
              <div className="sticky top-8 space-y-4">
                {/* Order Summary */}
                <div className="p-6 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/50 rounded-xl">
                  <h3 className="text-xl font-bold text-white mb-6">Order Summary</h3>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-emerald-200">
                      <span>Total Quantity:</span>
                      <span className="font-bold text-white">{totalQuantity} kg</span>
                    </div>
                    <div className="flex justify-between text-emerald-200">
                      <span>Items:</span>
                      <span className="font-bold text-white">{cartItems.length}</span>
                    </div>
                    <div className="h-px bg-emerald-500/30" />
                    <div className="flex justify-between text-lg">
                      <span className="font-semibold text-white">Total Price:</span>
                      <span className="font-bold text-emerald-400 text-xl">
                        {currencySymbols[currency]}{totalPrice}
                      </span>
                    </div>
                  </div>

                  {/* ESG Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowESG(!showESG)}
                    className="w-full p-3 bg-gradient-to-r from-blue-500 to-teal-600 text-white font-bold rounded-lg hover:from-blue-600 hover:to-teal-700 flex items-center justify-center gap-2 mb-4 transition-all"
                  >
                    <Globe size={20} />
                    {showESG ? 'Hide ESG Dashboard' : 'View ESG Dashboard'}
                  </motion.button>

                  {/* Checkout Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => router.push('/checkout')}
                    className="w-full p-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-bold rounded-lg hover:from-emerald-600 hover:to-emerald-700 transition-all"
                  >
                    Proceed to Checkout
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 bg-emerald-950/40 border border-emerald-500/30 rounded-xl"
          >
            <p className="text-3xl text-emerald-200 mb-6">Your cart is empty</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.back()}
              className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-bold rounded-lg hover:from-emerald-600 hover:to-emerald-700"
            >
              Continue Shopping
            </motion.button>
          </motion.div>
        )}

        {/* ESG Dashboard */}
        {showESG && cartItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-16 pt-16 border-t border-emerald-500/30"
          >
            <ESGComplianceDashboard cartItems={cartItems} />
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default function CartPage() {
  return (
    <MarketplaceAccessGuard requiredAccess="CART">
      <CartPageContent />
    </MarketplaceAccessGuard>
  );
}
