'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Edit, Check, X, Search, ChevronDown, Phone, MapPin, Truck } from 'lucide-react';

interface Collector {
  id: number;
  fullName: string;
  mobileNumber: string;
  email?: string;
  address?: string;
  vehicleNumber?: string;
  assignedArea?: string;
  status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
}

interface CollectorFormData {
  fullName: string;
  mobileNumber: string;
  email: string;
  address: string;
  vehicleNumber: string;
  assignedArea: string;
}

const INITIAL_FORM: CollectorFormData = {
  fullName: '',
  mobileNumber: '',
  email: '',
  address: '',
  vehicleNumber: '',
  assignedArea: '',
};

export default function CollectorsManagementPage() {
  const [collectors, setCollectors] = useState<Collector[]>([
    {
      id: 1,
      fullName: 'Ahmed Al-Mazrouei',
      mobileNumber: '+971501234567',
      email: 'ahmed@example.com',
      address: 'Dubai, UAE',
      vehicleNumber: 'UAE-2024-001',
      assignedArea: 'Dubai Downtown',
      status: 'ACTIVE',
    },
    {
      id: 2,
      fullName: 'Fatima Al-Mansoori',
      mobileNumber: '+971502345678',
      email: 'fatima@example.com',
      address: 'Abu Dhabi, UAE',
      vehicleNumber: 'UAE-2024-002',
      assignedArea: 'Abu Dhabi Central',
      status: 'ACTIVE',
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<CollectorFormData>(INITIAL_FORM);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'ACTIVE' | 'INACTIVE' | 'SUSPENDED'>('ALL');

  const filteredCollectors = collectors.filter((c) => {
    const matchesSearch = c.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.mobileNumber.includes(searchQuery) ||
      c.vehicleNumber?.includes(searchQuery);
    const matchesStatus = statusFilter === 'ALL' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAddCollector = () => {
    setEditingId(null);
    setFormData(INITIAL_FORM);
    setShowForm(true);
  };

  const handleEditCollector = (collector: Collector) => {
    setEditingId(collector.id);
    setFormData({
      fullName: collector.fullName,
      mobileNumber: collector.mobileNumber,
      email: collector.email || '',
      address: collector.address || '',
      vehicleNumber: collector.vehicleNumber || '',
      assignedArea: collector.assignedArea || '',
    });
    setShowForm(true);
  };

  const handleSubmit = () => {
    if (!formData.fullName.trim() || !formData.mobileNumber.trim()) {
      alert('Please fill in required fields');
      return;
    }

    if (editingId) {
      setCollectors(
        collectors.map((c) =>
          c.id === editingId
            ? {
                ...c,
                ...formData,
              }
            : c
        )
      );
    } else {
      const newCollector: Collector = {
        id: Math.max(...collectors.map((c) => c.id), 0) + 1,
        ...formData,
        status: 'ACTIVE',
      };
      setCollectors([...collectors, newCollector]);
    }

    setShowForm(false);
    setFormData(INITIAL_FORM);
  };

  const handleDeleteCollector = (id: number) => {
    if (window.confirm('Are you sure you want to delete this collector?')) {
      setCollectors(collectors.filter((c) => c.id !== id));
    }
  };

  const handleStatusChange = (id: number, newStatus: Collector['status']) => {
    setCollectors(
      collectors.map((c) =>
        c.id === id ? { ...c, status: newStatus } : c
      )
    );
  };

  const statusColors = {
    ACTIVE: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50',
    INACTIVE: 'bg-gray-500/20 text-gray-300 border-gray-500/50',
    SUSPENDED: 'bg-red-500/20 text-red-300 border-red-500/50',
  };

  const stats = {
    total: collectors.length,
    active: collectors.filter((c) => c.status === 'ACTIVE').length,
    inactive: collectors.filter((c) => c.status === 'INACTIVE').length,
    suspended: collectors.filter((c) => c.status === 'SUSPENDED').length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-slate-900 to-emerald-950 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2">Collectors Management</h1>
          <p className="text-white/60">Manage your network of collectors and track their activities</p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
        >
          {[
            { label: 'Total Collectors', value: stats.total, color: 'from-blue-500 to-blue-600' },
            { label: 'Active', value: stats.active, color: 'from-emerald-500 to-emerald-600' },
            { label: 'Inactive', value: stats.inactive, color: 'from-gray-500 to-gray-600' },
            { label: 'Suspended', value: stats.suspended, color: 'from-red-500 to-red-600' },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -4 }}
              className={`bg-gradient-to-br ${stat.color} rounded-lg p-4 text-white`}
            >
              <p className="text-white/80 text-sm mb-1">{stat.label}</p>
              <p className="text-3xl font-bold">{stat.value}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col md:flex-row gap-4 mb-8"
        >
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name, phone, or vehicle..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-800/50 border border-emerald-500/30 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="px-4 py-2 bg-slate-800/50 border border-emerald-500/30 rounded-lg text-white focus:outline-none focus:border-emerald-500"
          >
            <option value="ALL">All Statuses</option>
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
            <option value="SUSPENDED">Suspended</option>
          </select>

          {/* Add Collector Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddCollector}
            className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-emerald-500/50 transition-all"
          >
            <Plus className="w-5 h-5" />
            Add Collector
          </motion.button>
        </motion.div>

        {/* Collectors Table */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-slate-800/30 border border-emerald-500/20 rounded-lg overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-emerald-500/20 bg-emerald-500/5">
                  <th className="px-6 py-4 text-left text-white font-semibold">Name</th>
                  <th className="px-6 py-4 text-left text-white font-semibold">Contact</th>
                  <th className="px-6 py-4 text-left text-white font-semibold">Vehicle</th>
                  <th className="px-6 py-4 text-left text-white font-semibold">Area</th>
                  <th className="px-6 py-4 text-left text-white font-semibold">Status</th>
                  <th className="px-6 py-4 text-right text-white font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {filteredCollectors.length > 0 ? (
                    filteredCollectors.map((collector, idx) => (
                      <motion.tr
                        key={collector.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="border-b border-emerald-500/10 hover:bg-emerald-500/5 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <p className="font-semibold text-white">{collector.fullName}</p>
                          <p className="text-sm text-white/50">{collector.email}</p>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2 text-white/70">
                            <Phone className="w-4 h-4" />
                            {collector.mobileNumber}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2 text-white/70">
                            <Truck className="w-4 h-4" />
                            {collector.vehicleNumber || 'N/A'}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2 text-white/70">
                            <MapPin className="w-4 h-4" />
                            {collector.assignedArea || 'Unassigned'}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <select
                            value={collector.status}
                            onChange={(e) => handleStatusChange(collector.id, e.target.value as any)}
                            className={`px-3 py-1 rounded-full text-sm font-semibold border ${statusColors[collector.status]} bg-transparent cursor-pointer`}
                          >
                            <option value="ACTIVE">Active</option>
                            <option value="INACTIVE">Inactive</option>
                            <option value="SUSPENDED">Suspended</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-2">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleEditCollector(collector)}
                              className="p-2 hover:bg-emerald-500/20 rounded-lg text-emerald-400 transition-colors"
                            >
                              <Edit className="w-4 h-4" />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleDeleteCollector(collector.id)}
                              className="p-2 hover:bg-red-500/20 rounded-lg text-red-400 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </motion.button>
                          </div>
                        </td>
                      </motion.tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-6 py-8 text-center">
                        <p className="text-white/50">No collectors found</p>
                      </td>
                    </tr>
                  )}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Add/Edit Collector Modal */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
              onClick={() => setShowForm(false)}
            >
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-slate-800 border border-emerald-500/30 rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              >
                <h2 className="text-2xl font-bold text-white mb-6">
                  {editingId ? 'Edit Collector' : 'Add New Collector'}
                </h2>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div>
                      <label className="block text-white/70 font-semibold mb-2">Full Name *</label>
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="Enter full name"
                        className="w-full px-4 py-2 bg-slate-700/50 border border-emerald-500/30 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    {/* Mobile Number */}
                    <div>
                      <label className="block text-white/70 font-semibold mb-2">Mobile Number *</label>
                      <input
                        type="tel"
                        value={formData.mobileNumber}
                        onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
                        placeholder="+971 50 123 4567"
                        className="w-full px-4 py-2 bg-slate-700/50 border border-emerald-500/30 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-white/70 font-semibold mb-2">Email</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="collector@example.com"
                        className="w-full px-4 py-2 bg-slate-700/50 border border-emerald-500/30 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    {/* Vehicle Number */}
                    <div>
                      <label className="block text-white/70 font-semibold mb-2">Vehicle Number</label>
                      <input
                        type="text"
                        value={formData.vehicleNumber}
                        onChange={(e) => setFormData({ ...formData, vehicleNumber: e.target.value })}
                        placeholder="UAE-2024-001"
                        className="w-full px-4 py-2 bg-slate-700/50 border border-emerald-500/30 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    {/* Address */}
                    <div className="md:col-span-2">
                      <label className="block text-white/70 font-semibold mb-2">Address</label>
                      <input
                        type="text"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        placeholder="Street address"
                        className="w-full px-4 py-2 bg-slate-700/50 border border-emerald-500/30 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    {/* Assigned Area */}
                    <div className="md:col-span-2">
                      <label className="block text-white/70 font-semibold mb-2">Assigned Area</label>
                      <input
                        type="text"
                        value={formData.assignedArea}
                        onChange={(e) => setFormData({ ...formData, assignedArea: e.target.value })}
                        placeholder="e.g., Dubai Downtown"
                        className="w-full px-4 py-2 bg-slate-700/50 border border-emerald-500/30 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Form Actions */}
                <div className="flex gap-4 mt-8">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSubmit}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-emerald-500/50"
                  >
                    <Check className="w-5 h-5" />
                    {editingId ? 'Update' : 'Create'} Collector
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowForm(false)}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-2 bg-slate-700/50 border border-white/20 text-white rounded-lg font-semibold hover:bg-slate-700"
                  >
                    <X className="w-5 h-5" />
                    Cancel
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
