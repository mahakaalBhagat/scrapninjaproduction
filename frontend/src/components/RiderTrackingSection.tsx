'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, CheckCircle } from 'lucide-react';
import { animations, viewportConfig, staggerChild, cardHover } from '@/utils/animations';

export const RiderTrackingSection = () => {
  const [activeRider, setActiveRider] = useState(0);

  // Mock rider data with locations
  const riders = [
    {
      id: 1,
      name: 'Ahmed Al-Mansoori',
      status: 'En Route',
      location: 'Deira, Dubai',
      latitude: 25.2854,
      longitude: 55.3136,
      phone: '+971 50 123 4567',
      eta: '12 mins',
      pickups: 8,
      rating: 4.8,
    },
    {
      id: 2,
      name: 'Fatima Al-Mazrouei',
      status: 'Completed Pickup',
      location: 'Downtown Dubai',
      latitude: 25.1972,
      longitude: 55.2744,
      phone: '+971 50 234 5678',
      eta: 'Completed',
      pickups: 12,
      rating: 4.9,
    },
    {
      id: 3,
      name: 'Mohammed Al-Falahi',
      status: 'En Route',
      location: 'Marina, Dubai',
      latitude: 25.0883,
      longitude: 55.1412,
      phone: '+971 50 345 6789',
      eta: '8 mins',
      pickups: 15,
      rating: 5.0,
    },
    {
      id: 4,
      name: 'Layla Al-Hosni',
      status: 'Pickup Confirmed',
      location: 'JBR, Dubai',
      latitude: 25.0976,
      longitude: 55.1834,
      phone: '+971 50 456 7890',
      eta: '15 mins',
      pickups: 10,
      rating: 4.7,
    },
  ];

  return (
    <section id="rider-tracking" className="py-16 md:py-24 bg-white">
      <div className="container-responsive">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={animations.fadeUp}
        >
          <h2 className="heading-1 mb-4">Track Your Rider</h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Real-time rider tracking with live location updates. Know exactly when your scrap collection will arrive.
          </p>
        </motion.div>

        {/* Main Container */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={animations.staggerContainer}
        >
          {/* Map Section (Left) */}
          <motion.div 
            className="lg:col-span-2"
            variants={staggerChild}
          >
            <div className="bg-neutral-100 rounded-lg overflow-hidden h-96 md:h-full shadow-lg border border-neutral-200 relative">
              {/* OpenStreetMap - Dubai */}
              <iframe
                title="Dubai map"
                className="absolute inset-0 w-full h-full border-0"
                src="https://www.openstreetmap.org/export/embed.html?bbox=54.95%2C24.95%2C55.55%2C25.45&layer=mapnik&marker=25.2048%2C55.2708"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

              {/* Animated Rider Markers */}
              <div className="absolute inset-0 z-10 pointer-events-none">
                {riders.map((rider, idx) => (
                  <motion.button
                    key={rider.id}
                    type="button"
                    className={`absolute w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all pointer-events-auto ${
                      activeRider === idx
                        ? 'bg-primary-600 border-primary-700 scale-125'
                        : 'bg-blue-400 border-blue-500 hover:scale-110'
                    }`}
                    style={{
                      left: `${20 + idx * 20}%`,
                      top: `${30 + idx * 15}%`,
                    }}
                    onClick={() => setActiveRider(idx)}
                    whileHover={{ scale: 1.15 }}
                    animate={{
                      boxShadow: activeRider === idx
                        ? '0 0 20px rgba(59, 130, 246, 0.6)'
                        : '0 0 10px rgba(59, 130, 246, 0.3)',
                    }}
                    aria-label={`Focus rider ${idx + 1}`}
                  >
                    <span className="text-white text-xs font-bold">{idx + 1}</span>
                  </motion.button>
                ))}
              </div>

              <div className="absolute left-4 bottom-4 z-10 bg-white/90 backdrop-blur-sm rounded-md px-3 py-1.5 shadow-soft border border-neutral-200">
                <p className="text-xs text-neutral-700 font-medium">Live Rider Map - Dubai</p>
              </div>
            </div>
          </motion.div>

          {/* Rider Details (Right) */}
          <motion.div 
            className="space-y-6"
            variants={staggerChild}
          >
            <h3 className="heading-3 text-neutral-900">Active Riders ({riders.length})</h3>

            {/* Riders List */}
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {riders.map((rider, idx) => (
                <motion.div
                  key={rider.id}
                  className={`card p-4 cursor-pointer border-2 transition-all ${
                    activeRider === idx
                      ? 'border-primary-600 bg-primary-50'
                      : 'border-neutral-200 hover:border-primary-300'
                  }`}
                  onClick={() => setActiveRider(idx)}
                  variants={staggerChild}
                  {...cardHover}
                >
                  {/* Rider Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-bold text-neutral-900 text-sm">{rider.name}</h4>
                      <p className="text-xs text-neutral-600 mt-1">{rider.location}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      rider.status === 'En Route'
                        ? 'bg-blue-100 text-blue-700'
                        : rider.status === 'Completed Pickup'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {rider.status}
                    </span>
                  </div>

                  {/* Rider Details Grid */}
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="flex items-center gap-2 text-neutral-700">
                      <Clock className="w-4 h-4 text-primary-600" />
                      <span><strong>ETA:</strong> {rider.eta}</span>
                    </div>
                    <div className="flex items-center gap-2 text-neutral-700">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span><strong>{rider.pickups}</strong> pickups</span>
                    </div>
                    <div className="col-span-2 flex items-center gap-2 text-neutral-700">
                      <Phone className="w-4 h-4 text-primary-600" />
                      <span className="truncate">{rider.phone}</span>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="mt-3 pt-3 border-t border-neutral-200 flex items-center justify-between">
                    <span className="text-xs text-neutral-600">Rating</span>
                    <span className="font-bold text-primary-600">⭐ {rider.rating}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Features Section */}
        <motion.div 
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={animations.staggerContainer}
        >
          <motion.div 
            className="card p-6 text-center"
            variants={staggerChild}
            {...cardHover}
          >
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary-100 mb-4">
              <MapPin className="w-6 h-6 text-primary-600" />
            </div>
            <h4 className="heading-4 mb-2">Live Location</h4>
            <p className="text-sm text-neutral-600">Real-time GPS tracking of your rider</p>
          </motion.div>

          <motion.div 
            className="card p-6 text-center"
            variants={staggerChild}
            {...cardHover}
          >
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-green-100 mb-4">
              <Phone className="w-6 h-6 text-green-600" />
            </div>
            <h4 className="heading-4 mb-2">Direct Contact</h4>
            <p className="text-sm text-neutral-600">Call or message your rider instantly</p>
          </motion.div>

          <motion.div 
            className="card p-6 text-center"
            variants={staggerChild}
            {...cardHover}
          >
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-blue-100 mb-4">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
            <h4 className="heading-4 mb-2">ETA Updates</h4>
            <p className="text-sm text-neutral-600">Accurate arrival time estimates</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
