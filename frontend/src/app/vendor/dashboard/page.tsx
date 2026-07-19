'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Briefcase, CreditCard, Leaf } from 'lucide-react';
import Link from 'next/link';
import { StatsCard, ChartCard } from '@/components/charts';
import { Card, Badge } from '@/components/common';

export default function VendorDashboard() {
  const stats = [
    { label: 'Total Earnings', value: 'AED 45,320', icon: <CreditCard size={24} />, color: 'info' as const, trend: { value: 12, direction: 'up' as const } },
    { label: 'Active Jobs', value: '12', icon: <Briefcase size={24} />, color: 'success' as const, trend: { value: 8, direction: 'up' as const } },
    { label: 'Total Collectors', value: '8', icon: <Users size={24} />, color: 'primary' as const, trend: { value: 3, direction: 'down' as const } },
    { label: 'Carbon Saved', value: '2.4 tons', icon: <Leaf size={24} />, color: 'info' as const, trend: { value: 25, direction: 'up' as const } },
  ];

  const recentJobs = [
    { id: 1, location: 'Dubai Downtown', material: 'Metal Scrap', status: 'In Progress', weight: '250kg' },
    { id: 2, location: 'JBR Beach', material: 'Plastic Waste', status: 'Pending', weight: '180kg' },
    { id: 3, location: 'Business Bay', material: 'Paper', status: 'Completed', weight: '320kg' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const getStatusBadgeColor = (status: string) => {
    if (status === 'In Progress') return 'info';
    if (status === 'Pending') return 'warning';
    return 'success';
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
      {/* Welcome Section */}
      <motion.div variants={itemVariants} className="bg-gradient-to-r from-primary-600 to-emerald-600 text-white p-8 rounded-[16px] shadow-lg">
        <h1 className="text-4xl font-bold mb-2">Welcome Back, Vendor! 🎉</h1>
        <p className="text-primary-100">Here's your business overview for today</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatsCard
            key={index}
            label={stat.label}
            value={stat.value}
            icon={stat.icon}
            color={stat.color}
            trend={stat.trend}
            index={index}
          />
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Jobs */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <Card>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-slate-900">Recent Jobs</h2>
              <Link href="/vendor/jobs" className="text-primary-600 hover:text-primary-700 font-semibold">
                View All →
              </Link>
            </div>
            <div className="space-y-4">
              {recentJobs.map((job) => (
                <div key={job.id} className="flex items-center justify-between p-4 border border-slate-200 rounded-[12px] hover:bg-slate-50 transition-colors">
                  <div className="flex-1">
                    <p className="font-semibold text-slate-900">{job.location}</p>
                    <p className="text-sm text-slate-600">{job.material}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-slate-900">{job.weight}</p>
                    <Badge variant={getStatusBadgeColor(job.status) as any} size="sm">
                      {job.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Quick Stats */}
        <motion.div variants={itemVariants}>
          <Card>
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Quick Stats</h3>
            <div className="space-y-4">
              <div className="pb-4 border-b border-slate-200">
                <p className="text-sm text-slate-600 mb-1">Completion Rate</p>
                <div className="flex items-end gap-2">
                  <p className="text-3xl font-bold text-slate-900">94%</p>
                  <span className="text-sm text-emerald-600 font-semibold">↑ 5%</span>
                </div>
              </div>
              <div className="pb-4 border-b border-slate-200">
                <p className="text-sm text-slate-600 mb-1">Total Collections</p>
                <p className="text-3xl font-bold text-slate-900">284</p>
              </div>
              <div>
                <p className="text-sm text-slate-600 mb-1">Avg. Rating</p>
                <div className="flex items-center gap-2">
                  <p className="text-3xl font-bold text-slate-900">4.8</p>
                  <span className="text-yellow-400">★★★★★</span>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
