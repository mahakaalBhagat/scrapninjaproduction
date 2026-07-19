'use client';

import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Upload } from 'lucide-react';

export const BusinessVerification: React.FC = () => {
  const { control, register, formState: { errors }, watch } = useFormContext();
  const tradeFile = watch('businessVerification.tradeLicenseFile');

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-neutral-900 mb-4">Business Verification</h3>
        <p className="text-sm text-neutral-600 mb-6">Provide your business registration and license details.</p>
      </div>

      {/* Company Legal Name */}
      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-2">
          Company Legal Name
        </label>
        <input
          {...register('businessVerification.companyName', {})}
          type="text"
          placeholder="Enter your company legal name"
          className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
        />
        {((errors as any).businessVerification?.companyName) && (
          <p className="text-red-500 text-sm mt-1">{((errors as any).businessVerification?.companyName as any)?.message}</p>
        )}
      </div>

      {/* Business Registration Number */}
      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-2">
          Business Registration Number
        </label>
        <input
          {...register('businessVerification.registrationNumber', {})}
          type="text"
          placeholder="Enter your business registration number"
          className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
        />
        {((errors as any).businessVerification?.registrationNumber) && (
          <p className="text-red-500 text-sm mt-1">{((errors as any).businessVerification?.registrationNumber as any)?.message}</p>
        )}
      </div>

      {/* Trade License Number */}
      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-2">
          Trade License Number
        </label>
        <input
          {...register('businessVerification.tradeLicenseNumber', {})}
          type="text"
          placeholder="Enter your trade license number"
          className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
        />
        {((errors as any).businessVerification?.tradeLicenseNumber) && (
          <p className="text-red-500 text-sm mt-1">{((errors as any).businessVerification?.tradeLicenseNumber as any)?.message}</p>
        )}
      </div>

      {/* License Expiry Date */}
      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-2">
          License Expiry Date
        </label>
        <input
          {...register('businessVerification.licenseExpiryDate', {})}
          type="date"
          className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
        />
        {((errors as any).businessVerification?.licenseExpiryDate) && (
          <p className="text-red-500 text-sm mt-1">{((errors as any).businessVerification?.licenseExpiryDate as any)?.message}</p>
        )}
      </div>

      {/* Registered Business Address */}
      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-2">
          Registered Business Address
        </label>
        <textarea
          {...register('businessVerification.businessAddress', {})}
          placeholder="Enter your complete registered business address"
          rows={3}
          className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
        />
        {((errors as any).businessVerification?.businessAddress) && (
          <p className="text-red-500 text-sm mt-1">{((errors as any).businessVerification?.businessAddress as any)?.message}</p>
        )}
      </div>

      {/* Business Type */}
      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-2">
          Business Type
        </label>
        <select
          {...register('businessVerification.businessType', {})}
          className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
        >
          <option value="">Select business type</option>
          <option value="MAINLAND">Mainland</option>
          <option value="FREE_ZONE">Free Zone</option>
        </select>
        {((errors as any).businessVerification?.businessType) && (
          <p className="text-red-500 text-sm mt-1">{((errors as any).businessVerification?.businessType as any)?.message}</p>
        )}
      </div>

      {/* Trade License Upload */}
      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-2">
          Trade License Upload
        </label>
        <div className="relative">
          <input
            {...register('businessVerification.tradeLicenseFile', {})}
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />
          <Upload className="absolute right-3 top-2.5 w-5 h-5 text-neutral-400 pointer-events-none" />
        </div>
        {((errors as any).businessVerification?.tradeLicenseFile) && (
          <p className="text-red-500 text-sm mt-1">{((errors as any).businessVerification?.tradeLicenseFile as any)?.message}</p>
        )}
        {tradeFile && (
          <p className="text-green-600 text-sm mt-1">✓ File selected: {tradeFile[0]?.name}</p>
        )}
      </div>
    </div>
  );
};
