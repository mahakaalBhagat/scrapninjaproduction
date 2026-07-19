'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Filter, Eye } from 'lucide-react';
import { Button, SearchBar, Badge, Card } from '@/components/common';

export default function JobsPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const jobs = [
    { id: 1, location: 'Dubai Downtown', material: 'Metal Scrap', status: 'In Progress', weight: '250kg', date: '2026-07-14', collector: 'Ahmed Al-Mazrouei' },
    { id: 2, location: 'JBR Beach', material: 'Plastic Waste', status: 'Pending', weight: '180kg', date: '2026-07-14', collector: 'Unassigned' },
    { id: 3, location: 'Business Bay', material: 'Paper', status: 'Completed', weight: '320kg', date: '2026-07-13', collector: 'Fatima Al-Mansoori' },
    { id: 4, location: 'Marina', material: 'Mixed Waste', status: 'Cancelled', weight: '100kg', date: '2026-07-12', collector: 'Ahmed Al-Mazrouei' },
    { id: 5, location: 'Downtown Dubai', material: 'Electronic Waste', status: 'Assigned', weight: '150kg', date: '2026-07-14', collector: 'Fatima Al-Mansoori' },
  ];

  const tabs = [
    { id: 'all', label: 'All Jobs', count: jobs.length },
    { id: 'pending', label: 'Pending', count: jobs.filter((j) => j.status === 'Pending').length },
    { id: 'assigned', label: 'Assigned', count: jobs.filter((j) => j.status === 'Assigned').length },
    { id: 'completed', label: 'Completed', count: jobs.filter((j) => j.status === 'Completed').length },
    { id: 'cancelled', label: 'Cancelled', count: jobs.filter((j) => j.status === 'Cancelled').length },
  ];

  const filteredJobs = activeTab === 'all' ? jobs : jobs.filter((j) => j.status.toLowerCase() === activeTab);

  const getStatusBadgeVariant = (status: string): 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral' => {
    const variants: Record<string, 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'> = {
      'In Progress': 'info',
      'Pending': 'warning',
      'Completed': 'success',
      'Cancelled': 'danger',
      'Assigned': 'primary',
    };
    return variants[status] || 'neutral';
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Jobs Management</h1>
          <p className="text-slate-600 mt-2">Manage all your collection jobs</p>
        </div>
        <Button variant="primary" size="lg" icon={<Plus size={20} />}>
          Create New Job
        </Button>
      </div>

      {/* Search & Filter */}
      <div className="flex gap-4">
        <div className="flex-1">
          <SearchBar
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search jobs..."
          />
        </div>
        <Button variant="outline" icon={<Filter size={20} />}>
          Filter
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-3 font-semibold border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            {tab.label} <span className="text-sm text-slate-500">({tab.count})</span>
          </button>
        ))}
      </div>

      {/* Jobs Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Location</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Material</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Weight</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Collector</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredJobs.map((job) => (
                <tr key={job.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 text-sm text-slate-900">{job.location}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{job.material}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-slate-900">{job.weight}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{job.collector}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{job.date}</td>
                  <td className="px-6 py-4 text-sm">
                    <Badge variant={getStatusBadgeVariant(job.status)} size="sm">
                      {job.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <Button variant="ghost" size="sm" icon={<Eye size={16} />}>
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </motion.div>
  );
}
