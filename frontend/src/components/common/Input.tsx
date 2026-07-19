'use client';

import React, { ReactNode } from 'react';
import { COLORS, RADIUS } from '@/design-system';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  helpText?: string;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helpText,
      icon,
      iconPosition = 'left',
      fullWidth = true,
      size = 'md',
      className,
      ...props
    },
    ref
  ) => {
    const sizeStyles = {
      sm: 'px-2.5 py-1.5 text-sm',
      md: 'px-3 py-2.5 text-base',
      lg: 'px-4 py-3 text-lg',
    };

    const inputClasses = `
      w-full rounded-[12px] border-2 transition-all duration-200 ease-out
      border-slate-200 bg-white text-slate-900 placeholder-slate-400
      focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-10
      hover:border-slate-300
      disabled:bg-slate-50 disabled:text-slate-500 disabled:cursor-not-allowed
      ${sizeStyles[size]}
      ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}
      ${icon ? (iconPosition === 'left' ? 'pl-9' : 'pr-9') : ''}
      ${className || ''}
    `;

    return (
      <div className={fullWidth ? 'w-full' : ''}>
        {label && (
          <label className="block text-sm font-medium text-slate-700 mb-2">
            {label}
          </label>
        )}
        <div className="relative">
          <input ref={ref} className={inputClasses} {...props} />
          {icon && (
            <div
              className={`
                absolute top-1/2 -translate-y-1/2 flex items-center justify-center
                text-slate-400 pointer-events-none
                ${iconPosition === 'left' ? 'left-3' : 'right-3'}
                ${size === 'sm' ? 'w-4 h-4' : size === 'md' ? 'w-5 h-5' : 'w-6 h-6'}
              `}
            >
              {icon}
            </div>
          )}
        </div>
        {error && (
          <p className="mt-1.5 text-sm text-red-500 font-medium">{error}</p>
        )}
        {helpText && !error && (
          <p className="mt-1.5 text-sm text-slate-500">{helpText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
