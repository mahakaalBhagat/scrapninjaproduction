'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export interface GlobalNavigationHeaderProps {
  hideSignIn?: boolean;
}

export const GlobalNavigationHeader: React.FC<GlobalNavigationHeaderProps> = ({ 
  hideSignIn = false 
}) => {
  const router = useRouter();

  const navigationItems = [
    { label: 'Home', href: '/' },
    { label: 'Problem', href: '/#problem' },
    { label: 'Solution', href: '/#solution' },
    { label: 'Metal Index', href: '/metal-index' },
    { label: 'Team', href: '/#team' },
    { label: 'Contact', href: '/#contact' },
  ];

  const handleVendorAccess = () => {
    router.push('/vendor-login');
  };

  return (
    <header className="w-full bg-white border-b-2 border-slate-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between gap-8">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <div className="flex items-center gap-2">
              <div className="relative w-8 h-8">
                <Image
                  src="/ScrapNinja Logo Without Text.png"
                  alt="ScrapNinja"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-bold text-lg text-slate-900">ScrapNinja</span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 flex-1 justify-center">
            {navigationItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-slate-700 hover:text-primary-600 transition-colors font-medium text-sm"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-4 flex-shrink-0">
            {!hideSignIn && (
              <button
                onClick={handleVendorAccess}
                className="text-primary-600 hover:text-primary-700 font-medium text-sm transition-colors"
              >
                Sign In
              </button>
            )}

            <Link
              href="/scrap-items"
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-primary-200 text-primary-600 hover:bg-primary-50 transition-colors text-sm font-medium"
            >
              🧺 Scrap Items
            </Link>

            <Link
              href="/book-pickup"
              className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium text-sm transition-colors"
            >
              Book Pickup
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
