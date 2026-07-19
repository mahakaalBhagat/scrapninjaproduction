'use client';

import React from 'react';
import { useFormContext } from 'react-hook-form';

export const ScrapSourceDeclaration: React.FC = () => {
  const { register, formState: { errors } } = useFormContext();

  const importExportOptions = [
    { value: 'IMPORT', label: 'Import' },
    { value: 'EXPORT', label: 'Export' },
    { value: 'DOMESTIC', label: 'Domestic' },
  ];

  const originOptions = [
    { value: 'INDUSTRIAL', label: 'Industrial' },
    { value: 'DEMOLITION', label: 'Demolition' },
    { value: 'MANUFACTURING', label: 'Manufacturing' },
    { value: 'OTHER', label: 'Other' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-neutral-900 mb-4">Scrap Source Declaration</h3>
        <p className="text-sm text-neutral-600 mb-6">Declare the source and types of scrap you handle.</p>
      </div>

      {/* Source of Scrap */}
      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-3">
          Source of Scrap
        </label>
        <div className="space-y-2">
          {importExportOptions.map((option) => (
            <label key={option.value} className="flex items-center p-2 border border-neutral-300 rounded-lg hover:bg-amber-50 cursor-pointer transition">
              <input
                {...register('scrapSource.scrapSource')}
                type="radio"
                value={option.value}
                className="w-4 h-4 text-amber-600 focus:ring-2 focus:ring-amber-500"
              />
              <span className="ml-3 text-neutral-700 font-medium">{option.label}</span>
            </label>
          ))}
        </div>
        {((errors as any).scrapSource?.scrapSource) && (
          <p className="text-red-500 text-sm mt-2">{((errors as any).scrapSource?.scrapSource as any)?.message}</p>
        )}
      </div>

      {/* Types of Scrap */}
      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-3">
          Types of Scrap
        </label>
        <textarea
          {...register('scrapSource.scrapTypes', {
            minLength: {
              value: 10,
              message: 'Please provide at least 10 characters',
            },
          })}
          placeholder="Describe the types of scrap you trade (e.g., iron, copper, aluminum, plastic, etc.)"
          rows={4}
          className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
        />
        {((errors as any).scrapSource?.scrapTypes) && (
          <p className="text-red-500 text-sm mt-1">{((errors as any).scrapSource?.scrapTypes as any)?.message}</p>
        )}
      </div>

      {/* Origin of Scrap */}
      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-3">
          Origin of Scrap
        </label>
        <div className="space-y-2">
          {originOptions.map((option) => (
            <label key={option.value} className="flex items-center p-2 border border-neutral-300 rounded-lg hover:bg-amber-50 cursor-pointer transition">
              <input
                {...register('scrapSource.scrapOrigin')}
                type="radio"
                value={option.value}
                className="w-4 h-4 text-amber-600 focus:ring-2 focus:ring-amber-500"
              />
              <span className="ml-3 text-neutral-700 font-medium">{option.label}</span>
            </label>
          ))}
        </div>
        {((errors as any).scrapSource?.scrapOrigin) && (
          <p className="text-red-500 text-sm mt-2">{((errors as any).scrapSource?.scrapOrigin as any)?.message}</p>
        )}
      </div>
    </div>
  );
};
