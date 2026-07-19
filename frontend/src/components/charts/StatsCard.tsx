'use client';

import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { Card } from '../common/Card';

export interface StatsCardProps {
  label: string;
  value: string | number;
  icon?: ReactNode;
  trend?: {
    value: number;
    direction: 'up' | 'down';
  };
  color?: 'primary' | 'success' | 'warning' | 'error' | 'info';
  index?: number;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  label,
  value,
  icon,
  trend,
  color = 'primary',
  index = 0,
}) => {
  const colorClasses = {
    primary: 'from-primary-100 to-primary-50 text-primary-600',
    success: 'from-emerald-100 to-emerald-50 text-emerald-600',
    warning: 'from-amber-100 to-amber-50 text-amber-600',
    error: 'from-red-100 to-red-50 text-red-600',
    info: 'from-blue-100 to-blue-50 text-blue-600',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
    >
      <Card>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-slate-600 mb-2">{label}</p>
            <p className="text-3xl font-bold text-slate-900">{value}</p>
            {trend && (
              <div className="flex items-center gap-1 mt-2">
                {trend.direction === 'up' ? (
                  <TrendingUp size={16} className="text-emerald-600" />
                ) : (
                  <TrendingDown size={16} className="text-red-600" />
                )}
                <span
                  className={`text-sm font-semibold ${
                    trend.direction === 'up' ? 'text-emerald-600' : 'text-red-600'
                  }`}
                >
                  {Math.abs(trend.value)}%
                </span>
              </div>
            )}
          </div>
          {icon && (
            <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${colorClasses[color]} flex items-center justify-center flex-shrink-0`}>
              {icon}
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
};
