'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CreditCard, TrendingUp, Clock, Download } from 'lucide-react';
import { Button, Card, Badge } from '@/components/common';
import { StatsCard } from '@/components/charts';

export default function PaymentsPage() {
  const payments = [
    { id: 1, date: '2026-07-14', amount: 'AED 1,240', status: 'Completed', method: 'Bank Transfer', reference: 'TXN001' },
    { id: 2, date: '2026-07-07', amount: 'AED 2,100', status: 'Completed', method: 'Bank Transfer', reference: 'TXN002' },
    { id: 3, date: '2026-06-30', amount: 'AED 1,860', status: 'Completed', method: 'Bank Transfer', reference: 'TXN003' },
  ];

  const pendingPayments = [
    { id: 1, amount: 'AED 1,500', dueDate: '2026-07-21', jobs: 5 },
    { id: 2, amount: 'AED 800', dueDate: '2026-07-28', jobs: 3 },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Payments</h1>
        <p className="text-slate-600 mt-2">Track your earnings and payments</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard
          label="Total Earnings"
          value="AED 45,320"
          icon={<TrendingUp size={24} />}
          color="primary"
          trend={{ value: 18, direction: 'up' }}
          index={0}
        />
        <StatsCard
          label="Pending Payments"
          value="AED 2,300"
          icon={<Clock size={24} />}
          color="warning"
          trend={{ value: 5, direction: 'up' }}
          index={1}
        />
        <StatsCard
          label="Bank Account"
          value="Active ✓"
          icon={<CreditCard size={24} />}
          color="success"
          trend={{ value: 100, direction: 'up' }}
          index={2}
        />
      </div>

      {/* Pending Payments */}
      <Card>
        <h2 className="text-xl font-bold text-slate-900 mb-4">Pending Payouts</h2>
        <div className="space-y-3">
          {pendingPayments.map((payment) => (
            <div key={payment.id} className="flex justify-between items-center p-4 border border-amber-200 bg-amber-50 rounded-[12px]">
              <div>
                <p className="font-semibold text-slate-900">{payment.amount}</p>
                <p className="text-sm text-slate-600">Due: {payment.dueDate} • {payment.jobs} jobs</p>
              </div>
              <Badge variant="warning" size="md">
                Pending
              </Badge>
            </div>
          ))}
        </div>
      </Card>

      {/* Payment History */}
      <Card>
        <div className="flex justify-between items-center mb-6 pb-6 border-b border-slate-200">
          <h2 className="text-xl font-bold text-slate-900">Payment History</h2>
          <Button variant="primary" size="md" icon={<Download size={20} />}>
            Export
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Amount</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Method</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Reference</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {payments.map((payment) => (
                <tr key={payment.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 text-sm text-slate-900">{payment.date}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-slate-900">{payment.amount}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{payment.method}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{payment.reference}</td>
                  <td className="px-6 py-4 text-sm">
                    <Badge variant="success" size="sm">{payment.status}</Badge>
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
