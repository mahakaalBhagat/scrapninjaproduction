'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, Badge } from '@/components/common';

export default function CalendarPage() {
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 6, 14));

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const daysInMonth = getDaysInMonth(currentMonth);
  const firstDay = getFirstDayOfMonth(currentMonth);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const schedules: Record<number, Array<{ title: string; collector: string; status: string }>> = {
    14: [
      { title: 'Dubai Downtown', collector: 'Ahmed', status: 'In Progress' },
      { title: 'JBR Beach', collector: 'Fatima', status: 'Scheduled' },
    ],
    15: [{ title: 'Business Bay', collector: 'Ahmed', status: 'Scheduled' }],
    16: [
      { title: 'Marina', collector: 'Fatima', status: 'Scheduled' },
      { title: 'Downtown', collector: 'Collector', status: 'Pending' },
    ],
  };

  const getStatusBadgeVariant = (status: string): 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral' => {
    const variants: Record<string, 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'> = {
      'In Progress': 'info',
      'Scheduled': 'primary',
      'Pending': 'warning',
      'Completed': 'success',
    };
    return variants[status] || 'neutral';
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Scheduled Pickups</h1>
        <p className="text-slate-600 mt-2">Manage your collection schedule</p>
      </div>

      {/* Calendar */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Calendar Widget */}
        <Card>
          <div className="flex justify-between items-center mb-6">
            <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))} className="p-1 hover:bg-slate-100 rounded">
              <ChevronLeft size={20} className="text-slate-600" />
            </button>
            <h2 className="font-bold text-slate-900">
              {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
            </h2>
            <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))} className="p-1 hover:bg-slate-100 rounded">
              <ChevronRight size={20} className="text-slate-600" />
            </button>
          </div>

          {/* Days of week */}
          <div className="grid grid-cols-7 gap-2 mb-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="text-center text-xs font-semibold text-slate-600 py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar days */}
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={`empty-${i}`} className="aspect-square" />
            ))}
            {days.map((day) => (
              <div
                key={day}
                className={`aspect-square flex items-center justify-center rounded text-sm font-semibold cursor-pointer transition-colors ${
                  schedules[day]
                    ? 'bg-primary-100 text-primary-700 border-2 border-primary-500'
                    : 'hover:bg-slate-100 text-slate-700'
                }`}
              >
                {day}
              </div>
            ))}
          </div>
        </Card>

        {/* Schedule List */}
        <div className="lg:col-span-3 space-y-4">
          <h2 className="text-xl font-bold text-slate-900">Upcoming Pickups</h2>
          {Object.entries(schedules).map(([day, items]) => (
            <Card key={day} className="border-l-4 border-primary-500">
              <p className="font-semibold text-slate-900">July {day}, 2026</p>
              <div className="space-y-3 mt-4">
                {items.map((item, idx) => (
                  <div key={idx} className="p-4 bg-slate-50 rounded-[12px] border border-slate-200">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <p className="font-semibold text-slate-900">{item.title}</p>
                        <p className="text-sm text-slate-600 mt-1">Collector: {item.collector}</p>
                      </div>
                      <Badge variant={getStatusBadgeVariant(item.status)} size="sm">
                        {item.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
