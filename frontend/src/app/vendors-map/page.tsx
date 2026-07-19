'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Star, Phone, Building2, Users } from 'lucide-react';
import { VendorMap } from '@/components/VendorMap';

interface Vendor {
  id: number;
  name: string;
  company: string;
  latitude: number;
  longitude: number;
  address: string;
  collectors: number;
  rating: number;
  active: boolean;
  phone?: string;
}

const mockVendors: Vendor[] = [
  {
    id: 1,
    name: 'Ahmed Al-Mazrouei',
    company: 'Green Recycling LLC',
    latitude: 25.2048,
    longitude: 55.2708,
    address: 'Dubai Downtown, UAE',
    collectors: 5,
    rating: 4.8,
    active: true,
    phone: '+971501234567',
  },
  {
    id: 2,
    name: 'Fatima Al-Mansoori',
    company: 'Eco Solutions',
    latitude: 24.4539,
    longitude: 54.3773,
    address: 'Abu Dhabi Central, UAE',
    collectors: 3,
    rating: 4.6,
    active: true,
    phone: '+971502345678',
  },
  {
    id: 3,
    name: 'Mohammed Al-Falahi',
    company: 'Waste Management Pro',
    latitude: 25.1972,
    longitude: 55.2744,
    address: 'Dubai Marina, UAE',
    collectors: 8,
    rating: 4.9,
    active: true,
    phone: '+971503456789',
  },
];

export default function VendorsMapPage() {
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredVendors = mockVendors.filter(
    (vendor) =>
      vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-slate-900 to-emerald-950 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2">Verified Vendors</h1>
          <p className="text-white/60">Browse and connect with our trusted scrap vendors across the region</p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-8"
        >
          <input
            type="text"
            placeholder="Search vendors by name, company, or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-6 py-3 bg-slate-800/50 border border-emerald-500/30 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-emerald-500 text-lg"
          />
        </motion.div>

        {/* Map Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <VendorMap
            vendors={filteredVendors as any}
            activeVendor={selectedVendor?.id}
            onSelectVendor={(vendor: any) => setSelectedVendor(vendor)}
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Vendor List */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 space-y-4"
          >
            {filteredVendors.length > 0 ? (
              filteredVendors.map((vendor, idx) => (
                <motion.div
                  key={vendor.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  onClick={() => setSelectedVendor(vendor)}
                  className={`p-6 rounded-xl border transition-all cursor-pointer transform hover:scale-105 ${
                    selectedVendor?.id === vendor.id
                      ? 'bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 border-emerald-500/50'
                      : 'bg-slate-800/30 border-emerald-500/20 hover:border-emerald-500/50'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">{vendor.name}</h3>
                      <div className="flex items-center gap-2 text-emerald-400">
                        <Building2 className="w-4 h-4" />
                        <p className="text-sm">{vendor.company}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 bg-yellow-500/20 px-3 py-1 rounded-full">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="text-yellow-300 font-semibold">{vendor.rating}</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {/* Address */}
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <p className="text-white/70">{vendor.address}</p>
                    </div>

                    {/* Phone */}
                    {vendor.phone && (
                      <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-emerald-400" />
                        <p className="text-white/70">{vendor.phone}</p>
                      </div>
                    )}

                    {/* Collectors */}
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-emerald-400" />
                      <p className="text-white/70">
                        <span className="font-semibold text-emerald-400">{vendor.collectors}</span> active collectors
                      </p>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-4 w-full py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-emerald-500/50 transition-all"
                  >
                    Connect with {vendor.name.split(' ')[0]}
                  </motion.button>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-white/50 text-lg">No vendors found matching your search</p>
              </div>
            )}
          </motion.div>

          {/* Selected Vendor Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            {selectedVendor ? (
              <div className="sticky top-8 p-6 bg-gradient-to-br from-emerald-950/40 to-slate-800/40 border border-emerald-500/30 rounded-xl">
                <h3 className="text-2xl font-bold text-white mb-4">Selected Vendor</h3>

                <div className="space-y-4">
                  {/* Name */}
                  <div>
                    <p className="text-white/50 text-sm mb-1">Name</p>
                    <p className="text-xl font-semibold text-emerald-400">{selectedVendor.name}</p>
                  </div>

                  {/* Company */}
                  <div>
                    <p className="text-white/50 text-sm mb-1">Company</p>
                    <p className="text-white">{selectedVendor.company}</p>
                  </div>

                  {/* Rating */}
                  <div>
                    <p className="text-white/50 text-sm mb-1">Rating</p>
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${
                              i < Math.floor(selectedVendor.rating)
                                ? 'text-yellow-400 fill-yellow-400'
                                : 'text-gray-600'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-yellow-400 font-semibold">{selectedVendor.rating}/5</span>
                    </div>
                  </div>

                  {/* Collectors */}
                  <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
                    <p className="text-white/50 text-sm mb-1">Active Collectors</p>
                    <p className="text-3xl font-bold text-emerald-400">{selectedVendor.collectors}</p>
                  </div>

                  {/* CTA Buttons */}
                  <div className="space-y-2 pt-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-emerald-500/50"
                    >
                      Contact Vendor
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full py-3 bg-slate-700/50 border border-white/20 text-white rounded-lg font-semibold hover:bg-slate-700"
                    >
                      View Profile
                    </motion.button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="sticky top-8 p-6 bg-slate-800/30 border border-emerald-500/20 rounded-xl text-center">
                <p className="text-white/50">Select a vendor from the map or list to see details</p>
              </div>
            )}
          </motion.div>
        </div>

        {/* Stats Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            { label: 'Total Vendors', value: mockVendors.length, icon: '🏢' },
            { label: 'Average Rating', value: (mockVendors.reduce((sum, v) => sum + v.rating, 0) / mockVendors.length).toFixed(1), icon: '⭐' },
            { label: 'Total Collectors', value: mockVendors.reduce((sum, v) => sum + v.collectors, 0), icon: '👥' },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -4 }}
              className="p-6 bg-slate-800/30 border border-emerald-500/20 rounded-lg text-center"
            >
              <p className="text-3xl mb-2">{stat.icon}</p>
              <p className="text-white/60 text-sm mb-1">{stat.label}</p>
              <p className="text-3xl font-bold text-emerald-400">{stat.value}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
