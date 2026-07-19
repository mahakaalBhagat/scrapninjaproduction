'use client';

import React from 'react';

interface DividerProps {
  text?: string;
}

export const Divider: React.FC<DividerProps> = ({ text = 'OR' }) => {
  return (
    <div className="flex items-center gap-4 my-6">
      <div className="flex-1 h-px bg-neutral-300" />
      <span className="text-sm font-medium text-neutral-500">{text}</span>
      <div className="flex-1 h-px bg-neutral-300" />
    </div>
  );
};
