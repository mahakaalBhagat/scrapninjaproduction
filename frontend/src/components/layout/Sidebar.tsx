'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Home,
  Briefcase,
  Calendar,
  Users,
  FileText,
  CreditCard,
  BarChart3,
  Bell,
  FileCheck,
  User,
  Settings,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Logo } from './Logo';

export interface SidebarItem {
  href: string;
  label: string;
  icon: any;
}

export interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  onLogout: () => void;
  menuItems: SidebarItem[];
  profileItems?: SidebarItem[];
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onToggle,
  onLogout,
  menuItems,
  profileItems = [],
}) => {
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  return (
    <motion.aside
      animate={{ width: isOpen ? 256 : 80 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="bg-gradient-to-b from-white to-slate-50 shadow-xl flex flex-col border-r border-primary-100 h-screen"
    >
      {/* Logo Section */}
      <div className="p-6 border-b border-primary-100 bg-gradient-to-r from-primary-50 to-transparent">
        <div className="flex items-center justify-between gap-2">
          <Link href="/vendor/dashboard" className={`flex items-center gap-2 hover:opacity-80 transition-opacity ${!isOpen && 'justify-center w-full'}`}>
            <Logo size="sm" showText={isOpen} animated={false} href="" />
          </Link>
          <button
            onClick={onToggle}
            className="p-1 hover:bg-primary-100 rounded-lg transition-colors ml-auto flex-shrink-0"
          >
            {isOpen ? (
              <X size={20} className="text-primary-600" />
            ) : (
              <Menu size={20} className="text-primary-600" />
            )}
          </button>
        </div>
      </div>

      {/* Main Menu */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group relative ${
                active
                  ? 'bg-gradient-to-r from-primary-100 to-primary-50 text-primary-700 font-semibold shadow-md'
                  : 'text-slate-700 hover:bg-gradient-to-r hover:from-primary-50 hover:to-transparent'
              }`}
              title={item.label}
            >
              <Icon
                size={20}
                className={`flex-shrink-0 ${
                  active ? 'text-primary-600' : 'text-slate-500 group-hover:text-primary-600'
                }`}
              />
              <span className={`${!isOpen && 'hidden'} truncate`}>{item.label}</span>
              {active && !isOpen && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-gradient-to-b from-primary-400 to-primary-600 rounded-r-lg"></div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Divider */}
      <div className="border-t border-primary-100" />

      {/* Profile Menu */}
      {profileItems.length > 0 && (
        <nav className="p-4 space-y-1">
          {profileItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                  active
                    ? 'bg-gradient-to-r from-primary-100 to-primary-50 text-primary-700 font-semibold shadow-md'
                    : 'text-slate-700 hover:bg-gradient-to-r hover:from-primary-50 hover:to-transparent'
                }`}
                title={item.label}
              >
                <Icon
                  size={20}
                  className={`flex-shrink-0 ${
                    active ? 'text-primary-600' : 'text-slate-500 group-hover:text-primary-600'
                  }`}
                />
                <span className={`${!isOpen && 'hidden'} truncate`}>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      )}

      {/* Logout */}
      <div className="p-4 border-t border-primary-100">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-700 hover:bg-red-50 hover:text-red-600 transition-all duration-200 group"
          title="Logout"
        >
          <LogOut size={20} className="flex-shrink-0 group-hover:text-red-600 text-slate-500" />
          <span className={`${!isOpen && 'hidden'} truncate`}>Logout</span>
        </button>
      </div>
    </motion.aside>
  );
};
