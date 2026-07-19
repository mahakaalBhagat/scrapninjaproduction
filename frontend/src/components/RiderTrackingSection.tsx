'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Users, Star } from 'lucide-react';
import { animations, viewportConfig, staggerChild, cardHover } from '@/utils/animations';
import { RiderMap } from './RiderMap';

const VENDORS = [
  {
    id: 1,
    name: 'Ahmed Al-Mazrouei',
    company: 'Green Recycling LLC',
    status: 'Active',
    location: 'Dubai Downtown',
    latitude: 25.2048,
    longitude: 55.2708,
    phone: '+971 50 123 4567',
    collectors: 6,
    rating: 4.8,
  },
  {
    id: 2,
    name: 'Fatima Al-Mansoori',
    company: 'Eco Solutions',
    status: 'Active',
    location: 'Abu Dhabi Central',
    latitude: 24.4539,
    longitude: 54.3773,
    phone: '+971 50 234 5678',
    collectors: 5,
    rating: 4.9,
  },
  {
    id: 3,
    name: 'Mohammed Al-Falahi',
    company: 'Waste Management Pro',
    status: 'Active',
    location: 'Dubai Marina',
    latitude: 25.1212,
    longitude: 55.1535,
    phone: '+971 50 345 6789',
    collectors: 5,
    rating: 4.7,
  },
  {
    id: 4,
    name: 'Layla Al-Hosni',
    company: 'Smart Recycling Solutions',
    status: 'Active',
    location: 'Dubai Industrial City',
    latitude: 24.9950,
    longitude: 55.2800,
    phone: '+971 50 456 7890',
    collectors: 7,
    rating: 4.6,
  },
];

export const RiderTrackingSection = () => {
  const [activeVendor, setActiveVendor] = useState(0);
  const vendors = VENDORS;

  return (
    <section id="vendor-tracking" className="py-16 md:py-24 lg:py-32 bg-white">
      <div className="container-responsive">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-12 md:mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={animations.fadeUp}
        >
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold border border-emerald-200">
            <span>🏪</span> Browse Our Vendors
          </div>
          <h2 className="heading-1 mb-4">Connect With Verified Vendors</h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Browse through our network of trusted scrap collectors and recycling vendors across UAE. Find the best vendor for your needs.
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
            <div className="bg-neutral-100 rounded-lg overflow-hidden h-96 md:h-full min-h-[420px] shadow-lg border border-neutral-200 relative">
              <RiderMap
                riders={vendors.map(v => ({
                  id: v.id,
                  name: v.name,
                  latitude: v.latitude,
                  longitude: v.longitude,
                  location: v.location,
                  status: 'active' as const,
                }))}
                activeRider={activeVendor}
                onSelectRider={setActiveVendor}
              />
              <div className="absolute left-4 bottom-4 z-10 bg-white/90 backdrop-blur-sm rounded-md px-3 py-1.5 shadow border border-neutral-200 pointer-events-none">
                <p className="text-xs text-neutral-700 font-medium">Vendor Locations - UAE</p>
              </div>
            </div>
          </motion.div>

          {/* Vendor Details (Right) */}
          <motion.div 
            className="space-y-6"
            variants={staggerChild}
          >
            <h3 className="heading-3 text-neutral-900">Active Vendors ({vendors.length})</h3>

            {/* Vendors List */}
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {vendors.map((vendor, idx) => (
                <motion.div
                  key={vendor.id}
                  className={`card p-4 cursor-pointer border-2 transition-all ${
                    activeVendor === idx
                      ? 'border-emerald-600 bg-emerald-50'
                      : 'border-neutral-200 hover:border-emerald-300'
                  }`}
                  onClick={() => setActiveVendor(idx)}
                  variants={staggerChild}
                  {...cardHover}
                >
                  {/* Vendor Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-bold text-neutral-900 text-sm">{vendor.name}</h4>
                      <p className="text-xs text-neutral-600 mt-1">{vendor.company}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      vendor.status === 'Active'
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {vendor.status}
                    </span>
                  </div>

                  {/* Vendor Details Grid */}
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="flex items-center gap-2 text-neutral-700">
                      <Users className="w-4 h-4 text-emerald-600" />
                      <span><strong>{vendor.collectors}</strong> collectors</span>
                    </div>
                    <div className="flex items-center gap-2 text-neutral-700">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span><strong>{vendor.rating}</strong>/5</span>
                    </div>
                    <div className="col-span-2 flex items-center gap-2 text-neutral-700">
                      <MapPin className="w-4 h-4 text-emerald-600" />
                      <span className="truncate">{vendor.location}</span>
                    </div>
                    <div className="col-span-2 flex items-center gap-2 text-neutral-700">
                      <Phone className="w-4 h-4 text-emerald-600" />
                      <span className="truncate">{vendor.phone}</span>
                    </div>
                  </div>

                  {/* Status */}
                  <div className="mt-3 pt-3 border-t border-neutral-200 flex items-center justify-between">
                    <span className="text-xs text-neutral-600">Status</span>
                    <span className="font-bold text-emerald-600">✓ Active</span>
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
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-emerald-100 mb-4">
              <MapPin className="w-6 h-6 text-emerald-600" />
            </div>
            <h4 className="heading-4 mb-2">Multiple Locations</h4>
            <p className="text-sm text-neutral-600">Find vendors near your location across UAE</p>
          </motion.div>

          <motion.div 
            className="card p-6 text-center"
            variants={staggerChild}
            {...cardHover}
          >
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-blue-100 mb-4">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <h4 className="heading-4 mb-2">Trusted Network</h4>
            <p className="text-sm text-neutral-600">All vendors are verified and rated by customers</p>
          </motion.div>

          <motion.div 
            className="card p-6 text-center"
            variants={staggerChild}
            {...cardHover}
          >
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-yellow-100 mb-4">
              <Star className="w-6 h-6 text-yellow-600" />
            </div>
            <h4 className="heading-4 mb-2">Quality Assurance</h4>
            <p className="text-sm text-neutral-600">High-rated collectors with excellent service records</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
