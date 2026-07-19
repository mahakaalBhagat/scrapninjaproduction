'use client';

import React from 'react';

interface ForgotPasswordLinkProps {
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
}

export const ForgotPasswordLink: React.FC<ForgotPasswordLinkProps> = ({
  onClick,
  href = '#',
  disabled = false,
}) => {
  return (
    <a
      href={href}
      onClick={(e) => {
        if (disabled) {
          e.preventDefault();
          return;
        }
        if (onClick) {
          e.preventDefault();
          onClick();
        }
      }}
      className={`text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary-300 rounded px-1 py-0.5 ${
        disabled
          ? 'text-primary-400 cursor-not-allowed'
          : 'text-primary-600 hover:text-primary-700'
      }`}
      aria-label="Forgot your password"
    >
      Forgot your password?
    </a>
  );
};
