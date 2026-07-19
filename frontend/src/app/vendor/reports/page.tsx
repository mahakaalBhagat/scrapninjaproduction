'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Calendar } from 'lucide-react';

export default function ReportsPage() {
  const reports = [
    { id: 1, name: 'Monthly Report - June 2026', date: '2026-07-01', size: '2.4 MB', type: 'PDF' },
    { id: 2, name: 'Quarterly Report - Q2 2026', date: '2026-06-30', size: '5.8 MB', type: 'PDF' },
    { id: 3, name: 'Annual Report - 2025', date: '2026-01-15', size: '12.3 MB', type: 'PDF' },
    { id: 4, name: 'Tax Summary - 2025', date: '2026-01-10', size: '1.2 MB', type: 'PDF' },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
          <p className="text-gray-600 mt-2">Access audit-ready reports and documentation</p>
        </div>
        <button className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold">
          <FileText size={20} />
          Generate Report
        </button>
      </div>

      {/* Report Filters */}
      <div className="flex gap-4">
        <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500">
          <option>All Reports</option>
          <option>Monthly</option>
          <option>Quarterly</option>
          <option>Annual</option>
        </select>
        <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500">
          <option>2026</option>
          <option>2025</option>
          <option>2024</option>
        </select>
      </div>

      {/* Reports List */}
      <div className="space-y-4">
        {reports.map((report) => (
          <motion.div
            key={report.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <FileText size={24} className="text-red-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{report.name}</h3>
                  <div className="flex gap-4 mt-2">
                    <span className="text-sm text-gray-600">📅 {report.date}</span>
                    <span className="text-sm text-gray-600">{report.size}</span>
                  </div>
                </div>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                <Download size={20} />
                Download
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Custom Report Builder */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Create Custom Report</h2>
        <p className="text-purple-100 mb-6">Build a custom report with specific metrics and date ranges for your needs</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-semibold mb-2">Report Type</label>
            <select className="w-full px-3 py-2 rounded border border-purple-300 text-gray-900">
              <option>Revenue Report</option>
              <option>Efficiency Report</option>
              <option>Environmental Report</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Start Date</label>
            <input type="date" className="w-full px-3 py-2 rounded border border-purple-300 text-gray-900" />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">End Date</label>
            <input type="date" className="w-full px-3 py-2 rounded border border-purple-300 text-gray-900" />
          </div>
        </div>
        <button className="bg-white text-purple-600 px-6 py-2 rounded-lg hover:bg-gray-100 transition-colors font-semibold">
          Generate Custom Report
        </button>
      </div>
    </motion.div>
  );
}
