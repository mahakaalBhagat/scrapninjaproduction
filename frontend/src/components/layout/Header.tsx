'use client';

import React, { ReactNode } from 'react';
import Image from 'next/image';
import { Bell, ChevronRight } from 'lucide-react';
import { SearchBar } from '../common/SearchBar';

export interface HeaderBreadcrumb {
  label: string;
  href?: string;
}

export interface HeaderProps {
  title?: string;
  breadcrumbs?: HeaderBreadcrumb[];
  actions?: ReactNode;
  showSearch?: boolean;
  onSearch?: (query: string) => void;
  showNotifications?: boolean;
  showProfile?: boolean;
  profileName?: string;
  profileInitial?: string;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  breadcrumbs,
  actions,
  showSearch = false,
  onSearch,
  showNotifications = true,
  showProfile = true,
  profileName = 'Vendor',
  profileInitial = 'V',
}) => {
  return (
    <header className="bg-white shadow-md border-b border-primary-100 px-8 py-4 flex items-center justify-between gap-6 backdrop-blur-sm bg-white/95">
      {/* Left: Logo, Breadcrumb, Title */}
      <div className="flex items-center gap-4 flex-1 min-w-0">
        {title && (
          <div className="flex items-center gap-2">
            <div className="relative w-8 h-8 flex-shrink-0">
              <Image
                src="/ScrapNinja Logo Without Text.png"
                alt="ScrapNinja"
                fill
                className="object-contain"
              />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent whitespace-nowrap">
              {title}
            </h1>
          </div>
        )}

        {breadcrumbs && breadcrumbs.length > 0 && (
          <div className="flex items-center gap-2 text-sm text-slate-600">
            {breadcrumbs.map((crumb, index) => (
              <React.Fragment key={index}>
                {index > 0 && <ChevronRight size={16} className="text-slate-400" />}
                {crumb.href ? (
                  <a href={crumb.href} className="hover:text-primary-600 transition-colors">
                    {crumb.label}
                  </a>
                ) : (
                  <span>{crumb.label}</span>
                )}
              </React.Fragment>
            ))}
          </div>
        )}
      </div>

      {/* Middle: Search */}
      {showSearch && (
        <div className="flex-1 max-w-xs">
          <SearchBar
            onChange={(e) => onSearch?.(e.target.value)}
            placeholder="Search..."
          />
        </div>
      )}

      {/* Right: Actions, Notifications, Profile */}
      <div className="flex items-center gap-6 flex-shrink-0">
        {actions && <div className="flex items-center gap-4">{actions}</div>}

        {showNotifications && (
          <button className="p-2 hover:bg-primary-50 rounded-full relative transition-colors group">
            <Bell size={20} className="text-slate-600 group-hover:text-primary-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
          </button>
        )}

        {showProfile && (
          <div className="flex items-center gap-3 pl-6 border-l border-slate-200">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center text-white font-bold shadow-md">
              {profileInitial}
            </div>
            <span className="hidden sm:inline text-sm font-semibold text-slate-900">{profileName}</span>
          </div>
        )}
      </div>
    </header>
  );
};
