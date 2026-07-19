'use client';

import React from 'react';
import { Search, X } from 'lucide-react';
import { Input } from './Input';

export interface SearchBarProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  onClear?: () => void;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const SearchBar = React.forwardRef<HTMLInputElement, SearchBarProps>(
  (
    { onClear, size = 'md', fullWidth = false, value, onChange, ...props },
    ref
  ) => {
    return (
      <div className={fullWidth ? 'w-full' : 'w-64'}>
        <div className="relative">
          <Input
            ref={ref}
            type="text"
            placeholder="Search..."
            value={value}
            onChange={onChange}
            size={size}
            icon={<Search size={18} />}
            iconPosition="left"
            fullWidth={fullWidth}
            {...props}
            className="pl-10"
          />
          {value && (
            <button
              onClick={() => {
                if (onChange) {
                  onChange({ target: { value: '' } } as any);
                }
                onClear?.();
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              type="button"
            >
              <X size={18} />
            </button>
          )}
        </div>
      </div>
    );
  }
);

SearchBar.displayName = 'SearchBar';
