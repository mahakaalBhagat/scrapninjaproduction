'use client';

import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Upload } from 'lucide-react';

export const EnvironmentalCompliance: React.FC = () => {
  const { register, formState: { errors }, watch } = useFormContext();
  const envFile = watch('environmental.permitFile');
  const wasteFile = watch('environmental.wastePermitFile');
  const municipalityFile = watch('environmental.municipalityFile');

  const FileUploadField = ({
    label,
    registerName,
    watchName,
  }: {
    label: string;
    registerName: string;
    watchName?: string;
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
        <h3 className="text-lg font-semibold text-neutral-900 mb-4">Environmental Compliance</h3>
        <p className="text-sm text-neutral-600 mb-6">Upload required environmental and waste management permits.</p>
      </div>

      <FileUploadField
        label="Environmental Permit Upload"
        registerName="environmental.permitFile"
        watchName="environmental.permitFile"
      />

      <FileUploadField
        label="Waste Management Permit Upload"
        registerName="environmental.wastePermitFile"
        watchName="environmental.wastePermitFile"
      />

      <FileUploadField
        label="Municipality Approval Upload"
        registerName="environmental.municipalityFile"
        watchName="environmental.municipalityFile"
      />
    </div>
  );
};
