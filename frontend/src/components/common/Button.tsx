'use client';

import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { COLORS, RADIUS, TRANSITIONS } from '@/design-system';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  isLoading?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  animated?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      isLoading = false,
      icon,
      iconPosition = 'left',
      animated = true,
      disabled,
      className,
      ...props
    },
    ref
  ) => {
    // Base styles
    const baseStyles =
      'font-semibold rounded-[12px] transition-all duration-200 ease-out disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2';

    // Size styles
    const sizeStyles = {
      sm: 'px-3 py-1.5 text-sm h-9',
      md: 'px-4 py-2.5 text-base h-10',
      lg: 'px-6 py-3 text-lg h-12',
    };

    // Variant styles
    const variantStyles = {
      primary: `bg-gradient-to-r from-primary-600 to-primary-700 text-white hover:from-primary-700 hover:to-primary-800 active:from-primary-800 active:to-primary-900 shadow-md hover:shadow-lg`,
      secondary: `bg-gradient-to-r from-slate-100 to-slate-50 text-slate-900 hover:from-slate-200 hover:to-slate-100 active:from-slate-300 active:to-slate-200 shadow-sm`,
      success: `bg-gradient-to-r from-emerald-500 to-emerald-600 text-white hover:from-emerald-600 hover:to-emerald-700 active:from-emerald-700 active:to-emerald-800 shadow-md hover:shadow-lg`,
      danger: `bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 active:from-red-700 active:to-red-800 shadow-md hover:shadow-lg`,
      warning: `bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:from-amber-600 hover:to-amber-700 active:from-amber-700 active:to-amber-800 shadow-md hover:shadow-lg`,
      ghost: `text-slate-700 hover:bg-slate-100 active:bg-slate-200`,
      outline: `border-2 border-primary-600 text-primary-600 hover:bg-primary-50 active:bg-primary-100`,
    };

    const buttonContent = (
      <>
        {icon && iconPosition === 'left' && !isLoading && icon}
        {isLoading && (
          <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        <span>{children}</span>
        {icon && iconPosition === 'right' && !isLoading && icon}
      </>
    );

    const classes = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${fullWidth ? 'w-full' : ''} ${className || ''}`;

    if (animated && !disabled) {
      return (
        <motion.button
          ref={ref}
          className={classes}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={disabled || isLoading}
          {...(props as any)}
        >
          {buttonContent}
        </motion.button>
      );
    }

    return (
      <button ref={ref} className={classes} disabled={disabled || isLoading} {...props}>
        {buttonContent}
      </button>
    );
  }
);

Button.displayName = 'Button';
