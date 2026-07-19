'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, TrendingUp, Zap, Globe } from 'lucide-react';

export default function AnalyticsPage() {
  const metrics = [
    { label: 'Carbon Saved', value: '12.4 tons', change: '+15%', icon: Leaf, color: 'emerald' },
    { label: 'ESG Score', value: '87/100', change: '+5', icon: TrendingUp, color: 'blue' },
    { label: 'Waste Diverted', value: '2,450 kg', change: '+22%', icon: Zap, color: 'yellow' },
    { label: 'Global Footprint', value: '8 Areas', change: '+2', icon: Globe, color: 'purple' },
  ];

  const materialData = [
    { material: 'Metal Scrap', percentage: 35, weight: '8,500 kg' },
    { material: 'Plastic Waste', percentage: 25, weight: '6,100 kg' },
    { material: 'Paper', percentage: 20, weight: '4,900 kg' },
    { material: 'Glass', percentage: 15, weight: '3,700 kg' },
    { material: 'Other', percentage: 5, weight: '1,220 kg' },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
        <p className="text-gray-600 mt-2">Track your environmental impact</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, idx) => {
          const Icon = metric.icon;
          const colorClasses: Record<string, string> = {
            emerald: 'bg-emerald-100 text-emerald-600',
            blue: 'bg-blue-100 text-blue-600',
            yellow: 'bg-yellow-100 text-yellow-600',
            purple: 'bg-purple-100 text-purple-600',
          };
          return (
            <motion.div key={idx} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: idx * 0.1 }} className="bg-white p-6 rounded-lg shadow-md">
              <div className={`w-12 h-12 rounded-lg ${colorClasses[metric.color]} flex items-center justify-center mb-4`}>
                <Icon size={24} />
              </div>
              <p className="text-gray-600 text-sm mb-2">{metric.label}</p>
              <div className="flex justify-between items-end">
                <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                <span className="text-green-600 text-sm font-semibold">{metric.change}</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Carbon Saved Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Monthly Carbon Savings</h2>
          <div className="space-y-4">
            {[
              { month: 'May', value: 8, percentage: 65 },
              { month: 'June', value: 10, percentage: 81 },
              { month: 'July', value: 12.4, percentage: 100 },
            ].map((data) => (
              <div key={data.month}>
                <div className="flex justify-between items-center mb-2">
                  <p className="font-semibold text-gray-900">{data.month}</p>
                  <p className="text-green-600 font-bold">{data.value} tons</p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-green-500 h-3 rounded-full" style={{ width: `${data.percentage}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Material Distribution */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Material Distribution</h2>
          <div className="space-y-4">
            {materialData.map((item, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-center mb-2">
                  <p className="font-semibold text-gray-900">{item.material}</p>
                  <p className="text-sm text-gray-600">{item.weight}</p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-blue-500 h-3 rounded-full"
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">{item.percentage}%</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Impact Summary */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Your Environmental Impact</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-green-100 text-sm mb-2">Equivalent to Planting</p>
            <p className="text-3xl font-bold">420 Trees</p>
          </div>
          <div>
            <p className="text-green-100 text-sm mb-2">CO₂ Prevented</p>
            <p className="text-3xl font-bold">24.8 tons</p>
          </div>
          <div>
            <p className="text-green-100 text-sm mb-2">Landfill Waste Diverted</p>
            <p className="text-3xl font-bold">24.5 tons</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
