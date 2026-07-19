'use client';

import React from 'react';
import { motion } from 'framer-motion';

export interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'spinner' | 'dots' | 'pulse';
  color?: 'primary' | 'white' | 'gray';
}

export const Loader: React.FC<LoaderProps> = ({
  size = 'md',
  variant = 'spinner',
  color = 'primary',
}) => {
  const sizeMap = {
    sm: 20,
    md: 32,
    lg: 48,
  };

  const colorMap = {
    primary: '#138A36',
    white: '#FFFFFF',
    gray: '#6B7280',
  };

  const spinnerSize = sizeMap[size];

  if (variant === 'spinner') {
    return (
      <motion.svg
        width={spinnerSize}
        height={spinnerSize}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke={colorMap[color]}
          strokeWidth="2"
          opacity="0.2"
        />
        <path
          d="M12 2a10 10 0 0 1 10 10"
          stroke={colorMap[color]}
          strokeWidth="2"
          strokeLinecap="round"
        />
      </motion.svg>
    );
  }

  if (variant === 'dots') {
    return (
      <div className="flex items-center gap-1">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className={`rounded-full ${
              size === 'sm' ? 'w-1.5 h-1.5' : size === 'md' ? 'w-2 h-2' : 'w-3 h-3'
            }`}
            style={{ backgroundColor: colorMap[color] }}
            animate={{ scale: [1, 1.5, 1] }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: i * 0.1,
            }}
          />
        ))}
      </div>
    );
  }

  if (variant === 'pulse') {
    return (
      <motion.div
        className={`rounded-full ${
          size === 'sm' ? 'w-4 h-4' : size === 'md' ? 'w-6 h-6' : 'w-8 h-8'
        }`}
        style={{ backgroundColor: colorMap[color] }}
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
        }}
      />
    );
  }

  return null;
};
