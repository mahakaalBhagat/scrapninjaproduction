'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Trash2, Archive } from 'lucide-react';

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'job',
      title: 'New Job Available',
      message: 'A new collection job is available at Dubai Downtown',
      time: '2 hours ago',
      read: false,
    },
    {
      id: 2,
      type: 'payment',
      title: 'Payment Received',
      message: 'Your payment of AED 1,240 has been credited to your account',
      time: '5 hours ago',
      read: false,
    },
    {
      id: 3,
      type: 'collector',
      title: 'Collector Update',
      message: 'Ahmed Al-Mazrouei has completed 5 jobs this week',
      time: '1 day ago',
      read: true,
    },
    {
      id: 4,
      type: 'system',
      title: 'System Maintenance',
      message: 'Scheduled maintenance tomorrow from 2 AM to 4 AM',
      time: '3 days ago',
      read: true,
    },
  ]);

  const getIcon = (type: string) => {
    const colors: Record<string, string> = {
      job: 'bg-blue-100 text-blue-600',
      payment: 'bg-green-100 text-green-600',
      collector: 'bg-purple-100 text-purple-600',
      system: 'bg-yellow-100 text-yellow-600',
    };
    return colors[type] || 'bg-gray-100 text-gray-600';
  };

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const archiveNotification = (id: number) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
        <p className="text-gray-600 mt-2">Stay updated with the latest alerts and messages</p>
      </div>

      {/* Notification Stats */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
              <Bell size={20} className="text-red-600" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">You have {notifications.filter((n) => !n.read).length} new notifications</p>
              <p className="text-sm text-gray-600">Stay on top of your business</p>
            </div>
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`p-4 rounded-lg border-l-4 ${
              notification.read
                ? 'bg-gray-50 border-gray-300'
                : 'bg-blue-50 border-blue-500'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4 flex-1">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${getIcon(notification.type)}`}>
                  <Bell size={20} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{notification.title}</h3>
                  <p className="text-gray-700 text-sm mt-1">{notification.message}</p>
                  <p className="text-xs text-gray-500 mt-2">{notification.time}</p>
                </div>
              </div>
              <div className="flex gap-2 ml-4">
                <button
                  onClick={() => archiveNotification(notification.id)}
                  className="p-2 hover:bg-gray-200 rounded transition-colors"
                  title="Archive"
                >
                  <Archive size={18} className="text-gray-600" />
                </button>
                <button
                  onClick={() => deleteNotification(notification.id)}
                  className="p-2 hover:bg-red-200 rounded transition-colors"
                  title="Delete"
                >
                  <Trash2 size={18} className="text-red-600" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {notifications.length === 0 && (
        <div className="text-center py-12">
          <Bell size={48} className="text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600 text-lg">No notifications yet</p>
        </div>
      )}
    </motion.div>
  );
}
