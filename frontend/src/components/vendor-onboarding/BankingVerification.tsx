'use client';

import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Upload } from 'lucide-react';

export const BankingVerification: React.FC = () => {
  const { register, formState: { errors }, watch } = useFormContext();
  const chequeFile = watch('banking.chequeFile');
  const bankLetterFile = watch('banking.bankLetterFile');
  const companyName = watch('businessVerification.companyName');
  const accountHolder = watch('banking.accountHolderName');

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-neutral-900 mb-4">Banking Verification</h3>
        <p className="text-sm text-neutral-600 mb-6">Provide your company bank account details for payments.</p>
      </div>

      {/* Bank Name */}
      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-2">
          Bank Name
        </label>
        <input
          {...register('banking.bankName', {})}
          type="text"
          placeholder="Enter your bank name"
          className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
        />
        {(errors as any).banking?.bankName && (
          <p className="text-red-500 text-sm mt-1">{((errors as any).banking.bankName as any)?.message}</p>
        )}
      </div>

      {/* Account Holder Name */}
      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-2">
          Account Holder Name
          <span className="text-xs text-neutral-500 ml-1">(Must match Company Legal Name)</span>
        </label>
        <input
          {...register('banking.accountHolderName', {})}
          type="text"
          placeholder="Must match company legal name"
          className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
        />
        {(errors as any).banking?.accountHolderName && (
          <p className="text-red-500 text-sm mt-1">{((errors as any).banking.accountHolderName as any)?.message}</p>
        )}
      </div>

      {/* IBAN */}
      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-2">
          IBAN
        </label>
        <input
          {...register('banking.iban', {
            pattern: {
              value: /^[A-Z]{2}[0-9]{2}[A-Z0-9]{1,30}$/,
              message: 'Invalid IBAN format',
            },
          })}
          type="text"
          placeholder="Enter IBAN (e.g., AE070331234567890123456)"
          className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
        />
        {(errors as any).banking?.iban && (
          <p className="text-red-500 text-sm mt-1">{((errors as any).banking.iban as any)?.message}</p>
        )}
      </div>

      {/* Account Number */}
      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-2">
          Account Number
        </label>
        <input
          {...register('banking.accountNumber', {})}
          type="text"
          placeholder="Enter your account number"
          className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
        />
        {(errors as any).banking?.accountNumber && (
          <p className="text-red-500 text-sm mt-1">{((errors as any).banking.accountNumber as any)?.message}</p>
        )}
      </div>

      {/* Cancelled Cheque Upload */}
      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-2">
          Cancelled Cheque Upload
        </label>
        <div className="relative">
          <input
            {...register('banking.chequeFile', {})}
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />
          <Upload className="absolute right-3 top-2.5 w-5 h-5 text-neutral-400 pointer-events-none" />
        </div>
        {(errors as any).banking?.chequeFile && (
          <p className="text-red-500 text-sm mt-1">{((errors as any).banking.chequeFile as any)?.message}</p>
        )}
        {chequeFile && (
          <p className="text-green-600 text-sm mt-1">✓ File selected: {chequeFile[0]?.name}</p>
        )}
      </div>

      {/* Bank Letter Upload */}
      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-2">
          Bank Letter Upload
        </label>
        <div className="relative">
          <input
            {...register('banking.bankLetterFile', {})}
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />
          <Upload className="absolute right-3 top-2.5 w-5 h-5 text-neutral-400 pointer-events-none" />
        </div>
        {(errors as any).banking?.bankLetterFile && (
          <p className="text-red-500 text-sm mt-1">{((errors as any).banking.bankLetterFile as any)?.message}</p>
        )}
        {bankLetterFile && (
          <p className="text-green-600 text-sm mt-1">✓ File selected: {bankLetterFile[0]?.name}</p>
        )}
      </div>
    </div>
  );
};
