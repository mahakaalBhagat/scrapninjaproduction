'use client';

import React from 'react';
import { useFormContext } from 'react-hook-form';

export const ScrapTradingAuthorization: React.FC = () => {
  const { register, formState: { errors } } = useFormContext();

  const tradingOptions = [
    { value: 'SCRAP_TRADING', label: 'Scrap Trading' },
    { value: 'METAL_SCRAP', label: 'Metal Scrap Trading' },
    { value: 'WASTE_TRADING', label: 'Waste Trading' },
    { value: 'RECYCLING', label: 'Recycling Activities' },
    { value: 'OTHER', label: 'Other' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-neutral-900 mb-4">Scrap Trading Authorization</h3>
        <p className="text-sm text-neutral-600 mb-6">Select all applicable trading authorizations.</p>
      </div>

      <div className="space-y-3">
        {tradingOptions.map((option) => (
          <label key={option.value} className="flex items-center p-3 border border-neutral-300 rounded-lg hover:bg-amber-50 cursor-pointer transition">
            <input
              {...register('tradingAuthorization.types')}
              type="checkbox"
              value={option.value}
              className="w-5 h-5 text-amber-600 rounded focus:ring-2 focus:ring-amber-500"
            />
            <span className="ml-3 text-neutral-700 font-medium">{option.label}</span>
          </label>
        ))}
      </div>

      {((errors as any).tradingAuthorization?.types) && (
        <p className="text-red-500 text-sm">{((errors as any).tradingAuthorization?.types as any)?.message}</p>
      )}
    </div>
  );
};
