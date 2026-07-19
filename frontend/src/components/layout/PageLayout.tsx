'use client';

import React, { ReactNode, useState } from 'react';
import { useRouter } from 'next/navigation';
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
} from 'lucide-react';
import { Sidebar } from './Sidebar';
import { Header, HeaderProps } from './Header';

export interface PageLayoutProps {
  children: ReactNode;
  headerProps?: Partial<HeaderProps>;
  showHeader?: boolean;
  showSidebar?: boolean;
}

export const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  headerProps,
  showHeader = true,
  showSidebar = true,
}) => {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const menuItems = [
    { href: '/vendor/dashboard', label: 'Dashboard', icon: Home },
    { href: '/vendor/jobs', label: 'Jobs', icon: Briefcase },
    { href: '/vendor/calendar', label: 'Calendar', icon: Calendar },
    { href: '/vendor/collectors', label: 'Collectors', icon: Users },
    { href: '/vendor/history', label: 'Work History', icon: FileText },
    { href: '/vendor/payments', label: 'Payments', icon: CreditCard },
    { href: '/vendor/analytics', label: 'Analytics', icon: BarChart3 },
    { href: '/vendor/reports', label: 'Reports', icon: FileCheck },
    { href: '/vendor/notifications', label: 'Notifications', icon: Bell },
  ];

  const profileItems = [
    { href: '/vendor/profile', label: 'Profile', icon: User },
    { href: '/vendor/settings', label: 'Settings', icon: Settings },
  ];

  const handleLogout = () => {
    localStorage.removeItem('vendorToken');
    localStorage.removeItem('vendorEmail');
    router.push('/vendor-login');
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 to-slate-100 overflow-hidden">
      {/* Sidebar */}
      {showSidebar && (
        <Sidebar
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
          onLogout={handleLogout}
          menuItems={menuItems}
          profileItems={profileItems}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        {showHeader && (
          <Header
            title={headerProps?.title || 'Vendor Portal'}
            breadcrumbs={headerProps?.breadcrumbs}
            actions={headerProps?.actions}
            showSearch={headerProps?.showSearch}
            onSearch={headerProps?.onSearch}
            showNotifications={headerProps?.showNotifications !== false}
            showProfile={headerProps?.showProfile !== false}
            profileName={headerProps?.profileName}
            profileInitial={headerProps?.profileInitial}
          />
        )}

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-8 bg-gradient-to-br from-slate-50 to-slate-100">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
};
