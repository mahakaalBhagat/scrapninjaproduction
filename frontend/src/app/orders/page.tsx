'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Package, Truck, MapPin, CheckCircle, Clock, Navigation } from 'lucide-react';
import { useRider } from '@/context/RiderContext';

interface Order {
  orderId: string;
  date: string;
  status: 'processing' | 'confirmed' | 'ready-for-pickup' | 'completed';
  totalAmount: number;
  currency: string;
  itemCount: number;
  pickupLocation: string;
  pickupDate: string;
  estimatedDelivery: string;
}

export default function OrdersPage() {
  const router = useRouter();
  const { getRiderByOrder } = useRider();
  const [orders] = useState<Order[]>([
    {
      orderId: 'SN-2024001',
      date: '2026-06-28',
      status: 'processing',
      totalAmount: 1250.0,
      currency: 'INR',
      itemCount: 2,
      pickupLocation: 'Dubai Downtown Collection Center',
      pickupDate: '2026-07-01',
      estimatedDelivery: '2026-07-02',
    },
  ]);

  const handleTrackOrder = (orderId: string) => {
    const tracking = getRiderByOrder(orderId);
    if (tracking) {
      router.push('/tracker');
    } else {
      alert('Rider will be assigned soon. Please check back in a few moments.');
    }
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      processing: 'bg-yellow-500/20 border-yellow-500/50 text-yellow-300',
      confirmed: 'bg-blue-500/20 border-blue-500/50 text-blue-300',
      'ready-for-pickup': 'bg-purple-500/20 border-purple-500/50 text-purple-300',
      completed: 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300',
    };
    return colors[status] || colors.processing;
  };

  const getStatusIcon = (status: string) => {
    const icons: Record<string, React.ReactNode> = {
      processing: <Clock size={20} />,
      confirmed: <CheckCircle size={20} />,
      'ready-for-pickup': <Package size={20} />,
      completed: <Truck size={20} />,
    };
    return icons[status] || <Clock size={20} />;
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      processing: 'Processing',
      confirmed: 'Confirmed',
      'ready-for-pickup': 'Ready for Pickup',
      completed: 'Completed',
    };
    return labels[status] || 'Processing';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-slate-900 to-emerald-950 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex items-center gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/cart')}
            className="p-2 bg-emerald-500/20 border border-emerald-500/50 rounded-lg text-emerald-400 hover:bg-emerald-500/30"
          >
            <ArrowLeft size={24} />
          </motion.button>
          <h1 className="text-4xl font-bold text-white">My Orders</h1>
        </motion.div>

        {orders.length > 0 ? (
          <div className="space-y-6">
            {orders.map((order, idx) => (
              <motion.div
                key={order.orderId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-emerald-900/30 border border-emerald-500/30 rounded-lg overflow-hidden hover:border-emerald-500/50 transition-all"
              >
                {/* Order Header */}
                <div className="p-6 bg-gradient-to-r from-emerald-900/50 to-slate-900/50 border-b border-emerald-500/30">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                      <p className="text-emerald-300 text-sm font-semibold">Order ID</p>
                      <p className="text-2xl font-bold text-white">{order.orderId}</p>
                    </div>
                    <div
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {getStatusIcon(order.status)}
                      <span className="font-semibold">{getStatusLabel(order.status)}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-emerald-300 text-sm font-semibold">Order Date</p>
                      <p className="text-lg font-bold text-white">{order.date}</p>
                    </div>
                  </div>
                </div>

                {/* Order Details */}
                <div className="p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {/* Items */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="bg-slate-800/50 border border-emerald-500/20 rounded-lg p-4"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Package size={20} className="text-emerald-400" />
                        <p className="text-emerald-300 font-semibold">Items</p>
                      </div>
                      <p className="text-2xl font-bold text-white">{order.itemCount}</p>
                    </motion.div>

                    {/* Total Amount */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="bg-slate-800/50 border border-emerald-500/20 rounded-lg p-4"
                    >
                      <p className="text-emerald-300 font-semibold mb-2">Total Amount</p>
                      <p className="text-2xl font-bold text-emerald-400">
                        {order.currency} {order.totalAmount.toFixed(2)}
                      </p>
                    </motion.div>

                    {/* Pickup Location */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="bg-slate-800/50 border border-emerald-500/20 rounded-lg p-4"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin size={20} className="text-emerald-400" />
                        <p className="text-emerald-300 font-semibold">Pickup</p>
                      </div>
                      <p className="text-sm font-bold text-white">{order.pickupLocation.split(' ')[0]}</p>
                    </motion.div>

                    {/* Pickup Date */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="bg-slate-800/50 border border-emerald-500/20 rounded-lg p-4"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Clock size={20} className="text-emerald-400" />
                        <p className="text-emerald-300 font-semibold">Pickup Date</p>
                      </div>
                      <p className="text-sm font-bold text-white">{order.pickupDate}</p>
                    </motion.div>
                  </div>

                  {/* Timeline */}
                  <div className="bg-slate-800/50 border border-emerald-500/20 rounded-lg p-6">
                    <p className="text-emerald-300 font-semibold mb-4">Order Timeline</p>
                    <div className="space-y-4">
                      <motion.div
                        initial={{ x: -20 }}
                        animate={{ x: 0 }}
                        className="flex items-start gap-4"
                      >
                        <div className="w-4 h-4 bg-emerald-500 rounded-full mt-1.5 flex-shrink-0"></div>
                        <div>
                          <p className="font-semibold text-white">Order Placed</p>
                          <p className="text-sm text-emerald-200">{order.date}</p>
                        </div>
                      </motion.div>

                      <motion.div
                        initial={{ x: -20 }}
                        animate={{ x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="flex items-start gap-4"
                      >
                        <div
                          className={`w-4 h-4 rounded-full mt-1.5 flex-shrink-0 ${
                            order.status !== 'processing'
                              ? 'bg-emerald-500'
                              : 'bg-slate-600 border-2 border-emerald-400'
                          }`}
                        ></div>
                        <div>
                          <p className="font-semibold text-white">Order Confirmed</p>
                          <p className="text-sm text-emerald-200">
                            {order.status !== 'processing' ? 'Completed' : 'In Progress...'}
                          </p>
                        </div>
                      </motion.div>

                      <motion.div
                        initial={{ x: -20 }}
                        animate={{ x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex items-start gap-4"
                      >
                        <div
                          className={`w-4 h-4 rounded-full mt-1.5 flex-shrink-0 ${
                            ['ready-for-pickup', 'completed'].includes(order.status)
                              ? 'bg-emerald-500'
                              : 'bg-slate-600'
                          }`}
                        ></div>
                        <div>
                          <p className="font-semibold text-white">Ready for Pickup</p>
                          <p className="text-sm text-emerald-200">{order.pickupDate}</p>
                        </div>
                      </motion.div>

                      <motion.div
                        initial={{ x: -20 }}
                        animate={{ x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex items-start gap-4"
                      >
                        <div
                          className={`w-4 h-4 rounded-full mt-1.5 flex-shrink-0 ${
                            order.status === 'completed' ? 'bg-emerald-500' : 'bg-slate-600'
                          }`}
                        ></div>
                        <div>
                          <p className="font-semibold text-white">Pickup Completed</p>
                          <p className="text-sm text-emerald-200">{order.estimatedDelivery}</p>
                        </div>
                      </motion.div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleTrackOrder(order.orderId)}
                      className="flex-1 px-4 py-3 bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 font-bold rounded-lg hover:bg-emerald-500/30 transition-all flex items-center justify-center gap-2"
                    >
                      <Navigation size={18} />
                      Track Rider
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 px-4 py-3 bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 font-bold rounded-lg hover:bg-emerald-500/30 transition-all"
                    >
                      View Invoice
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 px-4 py-3 bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 font-bold rounded-lg hover:bg-emerald-500/30 transition-all"
                    >
                      Contact Support
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16 bg-emerald-950/40 border border-emerald-500/30 rounded-xl"
          >
            <Package size={64} className="mx-auto mb-4 text-emerald-400/50" />
            <h2 className="text-2xl font-bold text-white mb-2">No Orders Yet</h2>
            <p className="text-emerald-200 mb-6">Start shopping to see your orders here!</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push('/cart')}
              className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-lg transition-all"
            >
              Continue Shopping
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
