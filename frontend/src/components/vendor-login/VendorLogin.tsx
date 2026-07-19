'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GlobalNavigationHeader } from '@/components/common/GlobalNavigationHeader';
import { LeftHero } from './LeftHero';
import { RightForm } from './RightForm';

interface VendorLoginProps {
  onSuccess?: (token: string) => void;
  onError?: (error: string) => void;
}

export const VendorLogin: React.FC<VendorLoginProps> = ({ onSuccess, onError }) => {
  return (
    <>
      {/* Global Navigation Header */}
      <GlobalNavigationHeader hideSignIn={true} />

      {/* Main Content */}
      <div className="flex min-h-screen bg-white overflow-hidden">
        {/* Left Hero Section */}
        <LeftHero />

        {/* Right Form Section */}
        <RightForm onSuccess={onSuccess} onError={onError} />

        {/* Mobile Background Gradient (visible on small screens when hero is hidden) */}
        <div className="lg:hidden fixed inset-0 -z-10 bg-gradient-to-br from-[#006D38] to-[#138A36]" />
      </div>
    </>
  );
};
