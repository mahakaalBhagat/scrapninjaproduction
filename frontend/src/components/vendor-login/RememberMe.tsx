'use client';

import React from 'react';

interface RememberMeProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
}

export const RememberMe: React.FC<RememberMeProps> = ({
  checked,
  onChange,
  label = 'Remember me for 30 days',
  disabled = false,
}) => {
  return (
    <label className="flex items-center gap-2 cursor-pointer select-none">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
        aria-label="Remember me"
        className="w-4 h-4 rounded border-neutral-300 text-primary-600 focus:ring-2 focus:ring-primary-200 cursor-pointer"
      />
      <span className="text-sm font-medium text-neutral-700">{label}</span>
    </label>
  );
};
