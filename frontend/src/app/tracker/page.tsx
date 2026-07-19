'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { RiderTracking } from '@/components/rider/RiderTracking';
import { useRider } from '@/context/RiderContext';

export default function TrackerPage() {
  const router = useRouter();
  const { orderTracking } = useRider();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-slate-900 to-emerald-950 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex items-center gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.back()}
            className="p-2 bg-emerald-500/20 border border-emerald-500/50 rounded-lg text-emerald-400 hover:bg-emerald-500/30"
          >
            <ArrowLeft size={24} />
          </motion.button>
          <h1 className="text-3xl font-bold text-white">Rider Tracking</h1>
        </motion.div>

        {/* Main Content */}
        {isReady ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {orderTracking ? (
              <RiderTracking
                orderId={orderTracking.orderId}
                onComplete={() => {
                  setTimeout(() => {
                    router.push('/orders');
                  }, 2000);
                }}
              />
            ) : (
              <div className="text-center py-16 bg-emerald-950/40 border border-emerald-500/30 rounded-xl">
                <p className="text-2xl text-emerald-200 mb-6">No active order tracking</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => router.push('/orders')}
                  className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-bold rounded-lg hover:from-emerald-600 hover:to-emerald-700"
                >
                  View Orders
                </motion.button>
              </div>
            )}
          </motion.div>
        ) : (
          <div className="text-center py-16">
            <p className="text-emerald-200">Loading tracker...</p>
          </div>
        )}
      </div>
    </div>
  );
}
