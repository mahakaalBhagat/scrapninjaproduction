'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MapPin, Star, Truck, Clock, AlertCircle, CheckCircle } from 'lucide-react';
import { useRider } from '@/context/RiderContext';
import { RiderAssignmentRequest } from '@/types/rider';

interface RiderAssignmentModalProps {
  isOpen: boolean;
  request: RiderAssignmentRequest;
  onAssignmentComplete: () => void;
}

export const RiderAssignmentModal: React.FC<RiderAssignmentModalProps> = ({
  isOpen,
  request,
  onAssignmentComplete,
}) => {
  const { assignRider, currentRider, orderTracking } = useRider();
  const [isAssigning, setIsAssigning] = useState(false);
  const [assignmentError, setAssignmentError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && !currentRider && !isAssigning) {
      handleAssignRider();
    }
  }, [isOpen, currentRider, isAssigning]);

  const handleAssignRider = async () => {
    setIsAssigning(true);
    setAssignmentError(null);
    try {
      await assignRider(request);
    } catch (error) {
      setAssignmentError('Failed to assign rider. Please try again.');
      console.error('Rider assignment error:', error);
    } finally {
      setIsAssigning(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-gradient-to-br from-emerald-950 to-slate-900 border border-emerald-500/30 rounded-2xl p-8 max-w-md w-full shadow-2xl"
          >
            {/* Header */}
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Truck size={28} className="text-emerald-400" />
              Assigning Rider
            </h2>

            {/* Loading State */}
            {isAssigning && (
              <motion.div className="text-center py-8">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  className="inline-block mb-4"
                >
                  <Truck size={48} className="text-emerald-400" />
                </motion.div>
                <p className="text-emerald-200 mb-2">Finding the best rider for you...</p>
                <p className="text-sm text-emerald-300">This usually takes 10-30 seconds</p>
              </motion.div>
            )}

            {/* Rider Assigned */}
            {!isAssigning && currentRider && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Rider Card */}
                <div className="bg-emerald-900/30 border border-emerald-500/30 rounded-xl p-6 space-y-4">
                  {/* Rider Header */}
                  <div className="flex items-center gap-4">
                    <div className="text-5xl">{currentRider.avatar}</div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white">{currentRider.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Star size={16} className="text-yellow-400 fill-yellow-400" />
                        <span className="text-emerald-200">
                          {currentRider.rating} ({currentRider.totalDeliveries} deliveries)
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Contact */}
                  <a
                    href={`tel:${currentRider.phone}`}
                    className="flex items-center gap-3 p-3 bg-emerald-500/20 border border-emerald-500/50 rounded-lg hover:bg-emerald-500/30 transition-colors"
                  >
                    <Phone size={20} className="text-emerald-400" />
                    <span className="text-emerald-200 font-semibold">{currentRider.phone}</span>
                  </a>

                  {/* Vehicle Info */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-slate-800/50 rounded-lg">
                      <p className="text-xs text-emerald-300 mb-1">Vehicle</p>
                      <p className="text-sm font-semibold text-white">{currentRider.vehicle}</p>
                    </div>
                    <div className="p-3 bg-slate-800/50 rounded-lg">
                      <p className="text-xs text-emerald-300 mb-1">License</p>
                      <p className="text-sm font-semibold text-white">{currentRider.licensePlate}</p>
                    </div>
                  </div>

                  {/* ETA */}
                  {orderTracking && (
                    <div className="p-3 bg-blue-500/20 border border-blue-500/30 rounded-lg flex items-center gap-3">
                      <Clock size={20} className="text-blue-400" />
                      <div>
                        <p className="text-xs text-blue-300">Estimated Arrival</p>
                        <p className="text-sm font-semibold text-white">
                          {orderTracking.estimatedArrivalTime} minutes away
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Location */}
                  <div className="p-3 bg-teal-500/20 border border-teal-500/30 rounded-lg flex items-start gap-3">
                    <MapPin size={20} className="text-teal-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-teal-300">Current Location</p>
                      <p className="text-sm font-semibold text-white">
                        {currentRider.currentLocation.address}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Status Badge */}
                <div className="flex items-center justify-center gap-2 p-3 bg-emerald-500/20 border border-emerald-500/30 rounded-lg">
                  <CheckCircle size={20} className="text-emerald-400" />
                  <span className="font-semibold text-emerald-200">Rider assigned successfully!</span>
                </div>

                {/* Action Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onAssignmentComplete}
                  className="w-full p-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-bold rounded-lg hover:from-emerald-600 hover:to-emerald-700 transition-all"
                >
                  Track Rider
                </motion.button>

                {/* Info */}
                <p className="text-xs text-emerald-300 text-center">
                  You can track your rider's location in real-time after this step
                </p>
              </motion.div>
            )}

            {/* Error State */}
            {!isAssigning && assignmentError && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="p-4 bg-red-500/20 border border-red-500/30 rounded-lg flex items-start gap-3">
                  <AlertCircle size={20} className="text-red-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-red-200">{assignmentError}</p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAssignRider}
                  className="w-full p-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-bold rounded-lg hover:from-emerald-600 hover:to-emerald-700 transition-all"
                >
                  Try Again
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
