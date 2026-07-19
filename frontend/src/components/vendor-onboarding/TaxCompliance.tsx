'use client';

import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Upload } from 'lucide-react';

export const TaxCompliance: React.FC = () => {
  const { register, formState: { errors }, watch } = useFormContext();
  const isVatRegistered = watch('taxCompliance.isVatRegistered');
  const vatFile = watch('taxCompliance.vatFile');

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-neutral-900 mb-4">Tax Compliance</h3>
        <p className="text-sm text-neutral-600 mb-6">Provide your tax and VAT registration details.</p>
      </div>

      {/* VAT Registration Status */}
      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-2">
          VAT Registered
        </label>
        <div className="flex gap-4">
          <label className="flex items-center">
            <input
              {...register('taxCompliance.isVatRegistered')}
              type="radio"
              value="yes"
              className="w-4 h-4 text-amber-600 focus:ring-2 focus:ring-amber-500"
            />
            <span className="ml-2 text-neutral-700">Yes</span>
          </label>
          <label className="flex items-center">
            <input
              {...register('taxCompliance.isVatRegistered')}
              type="radio"
              value="no"
              className="w-4 h-4 text-amber-600 focus:ring-2 focus:ring-amber-500"
            />
            <span className="ml-2 text-neutral-700">No</span>
          </label>
        </div>
        {((errors as any).taxCompliance?.isVatRegistered) && (
          <p className="text-red-500 text-sm mt-1">{((errors as any).taxCompliance?.isVatRegistered as any)?.message}</p>
        )}
      </div>

      {/* VAT/TRN Number - Conditional */}
      {isVatRegistered === 'yes' && (
        <>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              VAT/TRN Number
            </label>
            <input
              {...register('taxCompliance.vatTrnNumber', {})}
              type="text"
              placeholder="Enter your VAT/TRN number"
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
            {((errors as any).taxCompliance?.vatTrnNumber) && (
              <p className="text-red-500 text-sm mt-1">{((errors as any).taxCompliance?.vatTrnNumber as any)?.message}</p>
            )}
          </div>

          {/* VAT Certificate Upload */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              VAT Certificate Upload
            </label>
            <div className="relative">
              <input
                {...register('taxCompliance.vatFile', {})}
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
              <Upload className="absolute right-3 top-2.5 w-5 h-5 text-neutral-400 pointer-events-none" />
            </div>
            {((errors as any).taxCompliance?.vatFile) && (
              <p className="text-red-500 text-sm mt-1">{((errors as any).taxCompliance?.vatFile as any)?.message}</p>
            )}
            {vatFile && (
              <p className="text-green-600 text-sm mt-1">✓ File selected: {vatFile[0]?.name}</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};
