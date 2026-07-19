'use client';

import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Upload } from 'lucide-react';

export const KYCSection: React.FC = () => {
  const { register, formState: { errors }, watch } = useFormContext();
  const passportFile = watch('kyc.passportFile');
  const emiratesIdFile = watch('kyc.emiratesIdFile');
  const incorporationFile = watch('kyc.incorporationFile');
  const moaFile = watch('kyc.moaFile');

  const FileUploadField = ({
    label,
    registerName,
    watchName,
    required = false,
  }: {
    label: string;
    registerName: string;
    watchName?: string;
    required?: boolean;
  }) => {
    const file = watch(watchName || registerName);
    return (
      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-2">
          {label}
        </label>
        <div className="relative">
          <input
            {...register(registerName, {})}
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />
          <Upload className="absolute right-3 top-2.5 w-5 h-5 text-neutral-400 pointer-events-none" />
        </div>
        {errors[registerName as keyof typeof errors] && (
          <p className="text-red-500 text-sm mt-1">
            {(errors[registerName as keyof typeof errors] as any)?.message}
          </p>
        )}
        {file && (
          <p className="text-green-600 text-sm mt-1">✓ File selected: {file[0]?.name}</p>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-neutral-900 mb-4">Company KYC/KYB</h3>
        <p className="text-sm text-neutral-600 mb-6">Upload required documentation for company verification.</p>
      </div>

      <FileUploadField
        label="Owner/Director Passport Upload"
        registerName="kyc.passportFile"
        watchName="kyc.passportFile"
        required={true}
      />

      <FileUploadField
        label="Emirates ID Upload"
        registerName="kyc.emiratesIdFile"
        watchName="kyc.emiratesIdFile"
        required={false}
      />

      <FileUploadField
        label="Certificate of Incorporation Upload"
        registerName="kyc.incorporationFile"
        watchName="kyc.incorporationFile"
        required={true}
      />

      <FileUploadField
        label="MOA Upload"
        registerName="kyc.moaFile"
        watchName="kyc.moaFile"
        required={true}
      />

      {/* Authorized Signatory Name */}
      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-2">
          Authorized Signatory Name
        </label>
        <input
          {...register('kyc.signatoryName', {})}
          type="text"
          placeholder="Enter authorized signatory name"
          className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
        />
        {((errors as any).kyc?.signatoryName) && (
          <p className="text-red-500 text-sm mt-1">{((errors as any).kyc?.signatoryName as any)?.message}</p>
        )}
      </div>

      {/* Authorized Signatory Designation */}
      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-2">
          Authorized Signatory Designation
        </label>
        <input
          {...register('kyc.signatoryDesignation', {})}
          type="text"
          placeholder="Enter designation (e.g., Managing Director, CEO)"
          className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
        />
        {((errors as any).kyc?.signatoryDesignation) && (
          <p className="text-red-500 text-sm mt-1">{((errors as any).kyc?.signatoryDesignation as any)?.message}</p>
        )}
      </div>
    </div>
  );
};
