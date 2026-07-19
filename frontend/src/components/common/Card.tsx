'use client';

import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { SHADOWS, RADIUS } from '@/design-system';

export interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'outlined' | 'elevated';
  padding?: 'sm' | 'md' | 'lg';
  hover?: boolean;
  clickable?: boolean;
  animated?: boolean;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  variant = 'default',
  padding = 'md',
  hover = true,
  clickable = false,
  animated = true,
  onClick,
}) => {
  const paddingStyles = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const variantStyles = {
    default: 'bg-white border border-slate-200',
    outlined: 'bg-white border-2 border-slate-200',
    elevated: 'bg-white shadow-lg',
  };

  const baseClasses = `
    rounded-[16px] transition-all duration-300 ease-out
    ${paddingStyles[padding]}
    ${variantStyles[variant]}
    ${hover ? 'hover:shadow-lg' : ''}
    ${clickable ? 'cursor-pointer' : ''}
    ${className}
  `;

  const content = (
    <div className={baseClasses}>
      {children}
    </div>
  );

  if (animated && hover) {
    return (
      <motion.div
        whileHover={hover ? { y: -4 } : {}}
        transition={{ duration: 0.2 }}
        onClick={onClick}
      >
        {content}
      </motion.div>
    );
  }

  return (
    <div onClick={onClick} className={hover || clickable ? 'cursor-pointer' : ''}>
      {content}
    </div>
  );
};
