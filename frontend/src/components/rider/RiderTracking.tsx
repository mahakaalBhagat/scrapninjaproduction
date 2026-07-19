'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Phone, MessageSquare, MapPin, Clock, AlertCircle, CheckCircle, ArrowLeft, Navigation } from 'lucide-react';
import { useRider } from '@/context/RiderContext';
import { useRouter } from 'next/navigation';

interface RiderTrackingProps {
  orderId?: string;
  onComplete?: () => void;
}

export const RiderTracking: React.FC<RiderTrackingProps> = ({ orderId, onComplete }) => {
  const router = useRouter();
  const { currentRider, orderTracking, updateRiderLocation, completeDelivery } = useRider();
  const [showMap, setShowMap] = useState(true);
  const [simulatingMovement, setSimulatingMovement] = useState(true);

  // Simulate rider movement along a path
  useEffect(() => {
    if (!simulatingMovement || !orderTracking || !currentRider) return;

    const interval = setInterval(() => {
      // Simulate movement towards pickup location
      const pickupLat = 25.1972;
      const pickupLng = 55.2744;
      
      const currentLat = orderTracking.currentLocation.latitude;
      const currentLng = orderTracking.currentLocation.longitude;
      
      const newLat = currentLat + (pickupLat - currentLat) * 0.05;
      const newLng = currentLng + (pickupLng - currentLng) * 0.05;
      
      updateRiderLocation({
        latitude: newLat,
        longitude: newLng,
        address: `Moving towards pickup location...`,
        timestamp: new Date().toISOString(),
      });

      // Check if arrived
      const distance = Math.sqrt(
        Math.pow(pickupLat - newLat, 2) + Math.pow(pickupLng - newLng, 2)
      );
      if (distance < 0.01) {
        setSimulatingMovement(false);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [simulatingMovement, orderTracking, currentRider, updateRiderLocation]);

  if (!currentRider || !orderTracking) {
    return (
      <div className="p-6 bg-emerald-950/30 border border-emerald-500/30 rounded-lg text-center">
        <p className="text-emerald-200">No active order being tracked</p>
      </div>
    );
  }

  const handleCallRider = () => {
    window.location.href = `tel:${currentRider.phone}`;
  };

  const handleMessageRider = () => {
    // Could integrate SMS or WhatsApp
    alert(`Message feature: Contact ${currentRider.phone}`);
  };

  const handleArrivedPickup = () => {
    if (orderTracking) {
      completeDelivery();
      onComplete?.();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Navigation size={28} className="text-emerald-400" />
          Tracking Your Rider
        </h2>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.back()}
          className="p-2 bg-emerald-500/20 border border-emerald-500/50 rounded-lg text-emerald-400 hover:bg-emerald-500/30"
        >
          <ArrowLeft size={24} />
        </motion.button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Area */}
        {showMap && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="lg:col-span-2"
          >
            <div className="bg-emerald-950/30 border border-emerald-500/30 rounded-xl p-4 h-96">
              {/* Simple Map Visualization */}
              <div className="w-full h-full bg-gradient-to-br from-slate-800 to-emerald-900 rounded-lg relative overflow-hidden flex items-center justify-center">
                {/* Grid Background */}
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage:
                      'linear-gradient(0deg, transparent 24%, rgba(255,255,255,0.05) 25%, rgba(255,255,255,0.05) 26%, transparent 27%, transparent 74%, rgba(255,255,255,0.05) 75%, rgba(255,255,255,0.05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(255,255,255,0.05) 25%, rgba(255,255,255,0.05) 26%, transparent 27%, transparent 74%, rgba(255,255,255,0.05) 75%, rgba(255,255,255,0.05) 76%, transparent 77%, transparent)',
                    backgroundSize: '50px 50px',
                  }}
                />

                {/* Rider Position */}
                <motion.div
                  key={`rider-${orderTracking.currentLocation.timestamp}`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute z-20"
                  style={{
                    left: `${((orderTracking.currentLocation.longitude - 55.2) / 0.3) * 100}%`,
                    top: `${((25.35 - orderTracking.currentLocation.latitude) / 0.35) * 100}%`,
                  }}
                >
                  <div className="relative">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-0 bg-emerald-400 rounded-full opacity-20"
                      style={{ width: 32, height: 32 }}
                    />
                    <div className="relative w-8 h-8 bg-emerald-400 rounded-full border-2 border-white flex items-center justify-center text-lg">
                      {currentRider.avatar}
                    </div>
                  </div>
                </motion.div>

                {/* Destination Marker */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute z-10"
                  style={{
                    left: '50%',
                    top: '50%',
                  }}
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-teal-400 rounded-full opacity-20"
                      style={{ width: 32, height: 32 }}
                    />
                    <div className="relative w-8 h-8 bg-teal-400 rounded-full border-2 border-white flex items-center justify-center">
                      📍
                    </div>
                  </div>
                </motion.div>

                {/* Connection Line */}
                <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none' }}>
                  <motion.line
                    x1={`${((orderTracking.currentLocation.longitude - 55.2) / 0.3) * 100}%`}
                    y1={`${((25.35 - orderTracking.currentLocation.latitude) / 0.35) * 100}%`}
                    x2="50%"
                    y2="50%"
                    stroke="#10b981"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                    opacity="0.5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                  />
                </svg>

                {/* Location Labels */}
                <div className="absolute top-4 left-4 text-xs bg-emerald-500/80 text-white px-2 py-1 rounded">
                  <span className="font-semibold">Current:</span> {currentRider.currentLocation.address.split(',')[0]}
                </div>
                <div className="absolute bottom-4 right-4 text-xs bg-teal-500/80 text-white px-2 py-1 rounded">
                  <span className="font-semibold">Destination:</span> Downtown Dubai
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Rider Info & Details */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-4"
        >
          {/* Rider Card */}
          <div className="bg-emerald-900/30 border border-emerald-500/30 rounded-xl p-6 space-y-3">
            <div className="flex items-center gap-3">
              <div className="text-4xl">{currentRider.avatar}</div>
              <div className="flex-1">
                <h3 className="font-bold text-white">{currentRider.name}</h3>
                <div className="text-xs text-emerald-300">5.0 rating</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleCallRider}
                className="w-full p-2 bg-blue-500/20 border border-blue-500/50 text-blue-300 rounded-lg hover:bg-blue-500/30 font-semibold flex items-center justify-center gap-2 transition-all"
              >
                <Phone size={16} />
                Call Rider
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleMessageRider}
                className="w-full p-2 bg-purple-500/20 border border-purple-500/50 text-purple-300 rounded-lg hover:bg-purple-500/30 font-semibold flex items-center justify-center gap-2 transition-all"
              >
                <MessageSquare size={16} />
                Message
              </motion.button>
            </div>
          </div>

          {/* ETA Card */}
          {orderTracking && (
            <div className="bg-blue-900/30 border border-blue-500/30 rounded-xl p-4 space-y-2">
              <div className="flex items-center gap-2">
                <Clock size={18} className="text-blue-400" />
                <span className="font-semibold text-blue-300">ETA</span>
              </div>
              <p className="text-2xl font-bold text-white">
                {orderTracking.estimatedArrivalTime} min
              </p>
              <p className="text-xs text-blue-300">{orderTracking.distance.toFixed(1)} km away</p>
            </div>
          )}

          {/* Status Timeline */}
          <div className="bg-slate-800/50 border border-emerald-500/20 rounded-xl p-4 space-y-3">
            <h4 className="font-semibold text-white text-sm">Status Timeline</h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <CheckCircle size={14} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-emerald-300">Order Placed</p>
                  <p className="text-emerald-500">2 mins ago</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle size={14} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-emerald-300">Rider Assigned</p>
                  <p className="text-emerald-500">1 min ago</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                >
                  <Navigation size={14} className="text-yellow-400" />
                </motion.div>
                <div>
                  <p className="font-semibold text-yellow-300">En Route</p>
                  <p className="text-yellow-500">In progress</p>
                </div>
              </div>
            </div>
          </div>

          {/* Arrival Button */}
          {simulatingMovement === false && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleArrivedPickup}
              className="w-full p-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold rounded-lg hover:from-emerald-600 hover:to-teal-700 transition-all flex items-center justify-center gap-2"
            >
              <CheckCircle size={20} />
              Rider Arrived! Confirm Pickup
            </motion.button>
          )}
        </motion.div>
      </div>

      {/* Info */}
      <div className="p-4 bg-teal-500/10 border border-teal-500/30 rounded-lg flex items-start gap-2">
        <AlertCircle size={18} className="text-teal-400 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-teal-300">
          Your rider is on the way! You can track their real-time location above. Feel free to call or message them if you need to.
        </p>
      </div>
    </div>
  );
};
