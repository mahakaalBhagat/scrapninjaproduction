'use client';

import React from 'react';
import { Loader } from 'lucide-react';
import { motion } from 'framer-motion';

interface LoginButtonProps {
  onClick?: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  label?: string;
  type?: 'button' | 'submit';
}

export const LoginButton: React.FC<LoginButtonProps> = ({
  onClick,
  isLoading = false,
  disabled = false,
  label = 'Sign In',
  type = 'submit',
}) => {
  return (
    <motion.button
      type={type}
      onClick={() => onClick?.()}
      disabled={disabled || isLoading}
      whileHover={!disabled && !isLoading ? { scale: 1.02 } : {}}
      whileTap={!disabled && !isLoading ? { scale: 0.98 } : {}}
      className="w-full px-6 py-3 rounded-[14px] font-semibold text-white bg-primary-600 hover:bg-primary-700 active:bg-primary-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary-300 focus:ring-offset-2 flex items-center justify-center gap-2"
    >
      {isLoading && <Loader size={20} className="animate-spin" />}
      <span>{label}</span>
    </motion.button>
  );
};
