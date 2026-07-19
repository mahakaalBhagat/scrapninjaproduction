'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface OTPButtonProps {
  onClick: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  label?: string;
}

export const OTPButton: React.FC<OTPButtonProps> = ({
  onClick,
  isLoading = false,
  disabled = false,
  label = 'Use One-Time Password',
}) => {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={disabled || isLoading}
      whileHover={!disabled && !isLoading ? { scale: 1.02 } : {}}
      whileTap={!disabled && !isLoading ? { scale: 0.98 } : {}}
      className="w-full px-6 py-3 rounded-[14px] font-semibold text-primary-600 border-2 border-primary-600 hover:bg-primary-50 active:bg-primary-100 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary-300 focus:ring-offset-2"
    >
      {label}
    </motion.button>
  );
};
