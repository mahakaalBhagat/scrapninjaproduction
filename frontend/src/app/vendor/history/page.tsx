'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, CreditCard, Briefcase, Leaf } from 'lucide-react';
import { Button, SearchBar, Card } from '@/components/common';
import { StatsCard } from '@/components/charts';

export default function WorkHistoryPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const history = [
    { id: 1, date: '2026-07-14', location: 'Dubai Downtown', material: 'Metal Scrap', weight: '250kg', revenue: 'AED 500', collector: 'Ahmed Al-Mazrouei', carbon: '0.5 tons', status: 'Completed' },
    { id: 2, date: '2026-07-14', location: 'JBR Beach', material: 'Plastic Waste', weight: '180kg', revenue: 'AED 360', collector: 'Fatima Al-Mansoori', carbon: '0.4 tons', status: 'Completed' },
    { id: 3, date: '2026-07-13', location: 'Business Bay', material: 'Paper', weight: '320kg', revenue: 'AED 480', collector: 'Ahmed Al-Mazrouei', carbon: '0.3 tons', status: 'Completed' },
    { id: 4, date: '2026-07-13', location: 'Marina', material: 'Glass', weight: '150kg', revenue: 'AED 300', collector: 'Fatima Al-Mansoori', carbon: '0.2 tons', status: 'Completed' },
    { id: 5, date: '2026-07-12', location: 'Downtown Dubai', material: 'Mixed Waste', weight: '400kg', revenue: 'AED 600', collector: 'Ahmed Al-Mazrouei', carbon: '0.6 tons', status: 'Completed' },
  ];

  const filteredHistory = history.filter((item) => item.location.toLowerCase().includes(searchTerm.toLowerCase()) || item.material.toLowerCase().includes(searchTerm.toLowerCase()));

  const totalRevenue = history.reduce((sum, item) => {
    const amount = parseInt(item.revenue.replace('AED ', ''));
    return sum + amount;
  }, 0);

  const totalCarbon = history.length * 0.4;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Work History</h1>
          <p className="text-slate-600 mt-2">View all completed collection jobs</p>
        </div>
        <Button variant="primary" size="lg" icon={<Download size={20} />}>
          Export CSV
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard
          label="Total Revenue"
          value={`AED ${totalRevenue.toLocaleString()}`}
          icon={<CreditCard size={24} />}
          color="primary"
          trend={{ value: 12, direction: 'up' }}
          index={0}
        />
        <StatsCard
          label="Total Jobs Completed"
          value={history.length}
          icon={<Briefcase size={24} />}
          color="success"
          trend={{ value: 8, direction: 'up' }}
          index={1}
        />
        <StatsCard
          label="Carbon Saved"
          value={`${totalCarbon.toFixed(1)} tons`}
          icon={<Leaf size={24} />}
          color="info"
          trend={{ value: 25, direction: 'up' }}
          index={2}
        />
      </div>

      {/* Search & Filter */}
      <div className="flex gap-4">
        <div className="flex-1">
          <SearchBar
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by location or material..."
          />
        </div>
      </div>

      {/* History Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Location</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Material</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Weight</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Collector</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Revenue</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Carbon Saved</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredHistory.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 text-sm text-slate-900">{item.date}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{item.location}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{item.material}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-slate-900">{item.weight}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{item.collector}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-primary-600">{item.revenue}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-emerald-600">{item.carbon}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </motion.div>
  );
}
