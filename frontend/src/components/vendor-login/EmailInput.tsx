'use client';

import React from 'react';

interface EmailInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  autoComplete?: string;
}

export const EmailInput: React.FC<EmailInputProps> = ({
  value,
  onChange,
  placeholder = 'Email address',
  error,
  disabled = false,
  autoComplete = 'email',
}) => {
  return (
    <div className="w-full">
      <input
        type="email"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        autoComplete={autoComplete}
        aria-label="Email address"
        className={`w-full px-4 py-3 rounded-[14px] font-sans text-base transition-all duration-200
          bg-white border ${error ? 'border-red-500' : 'border-neutral-300'} 
          ${!disabled && 'hover:border-neutral-400'}
          ${!disabled && !error && 'focus:border-primary-600 focus:ring-2 focus:ring-primary-100'}
          ${disabled ? 'bg-neutral-100 text-neutral-500 cursor-not-allowed' : 'text-neutral-900'}
          placeholder:text-neutral-400`}
      />
      {error && <p className="mt-1 text-sm text-red-500 font-medium">{error}</p>}
    </div>
  );
};
