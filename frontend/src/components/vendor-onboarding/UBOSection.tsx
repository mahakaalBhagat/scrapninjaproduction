'use client';

import React, { useState } from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { Upload, Plus, Trash2 } from 'lucide-react';

export const UBOSection: React.FC = () => {
  const { register, formState: { errors }, watch, control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'ubo.beneficialOwners',
  });
  const structureFile = watch('ubo.structureFile');
  const declarationFile = watch('ubo.declarationFile');

  const addBeneficialOwner = () => {
    append({ name: '', ownership: 0 });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-neutral-900 mb-4">UBO Declaration</h3>
        <p className="text-sm text-neutral-600 mb-6">Declare all beneficial owners of the company.</p>
      </div>

      {/* Beneficial Owners List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-medium text-neutral-900">Beneficial Owners</h4>
          <button
            type="button"
            onClick={addBeneficialOwner}
            className="flex items-center gap-2 px-3 py-2 bg-amber-100 text-amber-700 rounded-lg hover:bg-amber-200 transition"
          >
            <Plus className="w-4 h-4" />
            Add Owner
          </button>
        </div>

        {fields.length === 0 ? (
          <p className="text-neutral-500 text-sm py-4">No beneficial owners added yet.</p>
        ) : (
          <div className="space-y-3">
            {fields.map((field, index) => (
              <div key={field.id} className="flex gap-3 items-end p-3 border border-neutral-300 rounded-lg">
                <div className="flex-1">
                  <label className="block text-xs font-medium text-neutral-700 mb-1">
                    Beneficial Owner Name
                  </label>
                  <input
                    {...register(`ubo.beneficialOwners.${index}.name`)}
                    type="text"
                    placeholder="Enter owner name"
                    className="w-full px-3 py-1.5 border border-neutral-300 rounded text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>
                <div className="w-24">
                  <label className="block text-xs font-medium text-neutral-700 mb-1">
                    Ownership %
                  </label>
                  <input
                    {...register(`ubo.beneficialOwners.${index}.ownership`, {
                      min: { value: 0, message: 'Must be 0 or more' },
                      max: { value: 100, message: 'Cannot exceed 100%' },
                    })}
                    type="number"
                    placeholder="0"
                    className="w-full px-3 py-1.5 border border-neutral-300 rounded text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="p-1.5 text-red-600 hover:bg-red-50 rounded transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Ownership Structure Chart Upload */}
      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-2">
          Ownership Structure Chart Upload
        </label>
        <div className="relative">
          <input
            {...register('ubo.structureFile', {})}
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />
          <Upload className="absolute right-3 top-2.5 w-5 h-5 text-neutral-400 pointer-events-none" />
        </div>
        {((errors as any).ubo?.structureFile) && (
          <p className="text-red-500 text-sm mt-1">{((errors as any).ubo?.structureFile as any)?.message}</p>
        )}
        {structureFile && (
          <p className="text-green-600 text-sm mt-1">✓ File selected: {structureFile[0]?.name}</p>
        )}
      </div>

      {/* Signed Declaration Upload */}
      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-2">
          Signed Declaration Upload
        </label>
        <div className="relative">
          <input
            {...register('ubo.declarationFile', {})}
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />
          <Upload className="absolute right-3 top-2.5 w-5 h-5 text-neutral-400 pointer-events-none" />
        </div>
        {((errors as any).ubo?.declarationFile) && (
          <p className="text-red-500 text-sm mt-1">{((errors as any).ubo?.declarationFile as any)?.message}</p>
        )}
        {declarationFile && (
          <p className="text-green-600 text-sm mt-1">✓ File selected: {declarationFile[0]?.name}</p>
        )}
      </div>
    </div>
  );
};
