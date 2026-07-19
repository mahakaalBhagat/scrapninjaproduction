'use client';

import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { VENDOR_LOGIN_CONSTANTS } from '@/constants/vendor-login';

interface PasswordInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  autoComplete?: string;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({
  value,
  onChange,
  placeholder = 'Password',
  error,
  disabled = false,
  autoComplete = 'current-password',
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-full">
      <div className="relative">
        <input
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete={autoComplete}
          aria-label="Password"
          className={`w-full px-4 py-3 rounded-[14px] font-sans text-base transition-all duration-200
            bg-white border ${error ? 'border-red-500' : 'border-neutral-300'} 
            ${!disabled && 'hover:border-neutral-400'}
            ${!disabled && !error && 'focus:border-primary-600 focus:ring-2 focus:ring-primary-100'}
            ${disabled ? 'bg-neutral-100 text-neutral-500 cursor-not-allowed' : 'text-neutral-900'}
            placeholder:text-neutral-400`}
        />
        <button
          type="button"
          onClick={toggleVisibility}
          disabled={disabled}
          aria-label={showPassword ? 'Hide password' : 'Show password'}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-500 hover:text-neutral-700 transition-colors disabled:text-neutral-300 disabled:cursor-not-allowed"
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>
      {error && <p className="mt-1 text-sm text-red-500 font-medium">{error}</p>}
    </div>
  );
};
