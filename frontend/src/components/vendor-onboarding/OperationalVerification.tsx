'use client';

import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Upload, MapPin } from 'lucide-react';

export const OperationalVerification: React.FC = () => {
  const { register, formState: { errors }, watch } = useFormContext();
  const facilityPhotos = watch('operational.facilityPhotos');

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-neutral-900 mb-4">Operational Verification</h3>
        <p className="text-sm text-neutral-600 mb-6">Provide details about your warehouse and operations.</p>
      </div>

      {/* Warehouse Address */}
      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-2">
          Warehouse Address
        </label>
        <textarea
          {...register('operational.warehouseAddress', {})}
          placeholder="Enter your warehouse address"
          rows={3}
          className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
        />
        {((errors as any).operational?.warehouseAddress) && (
          <p className="text-red-500 text-sm mt-1">{((errors as any).operational?.warehouseAddress as any)?.message}</p>
        )}
      </div>

      {/* Google Maps Location */}
      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-2">
          Google Maps Location URL
        </label>
        <div className="relative">
          <input
            {...register('operational.mapsLocation', {
              pattern: {
                value: /https:\/\/(maps|www\.google\.com\/maps)/,
                message: 'Must be a valid Google Maps URL',
              },
            })}
            type="url"
            placeholder="https://maps.google.com/..."
            className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />
          <MapPin className="absolute right-3 top-2.5 w-5 h-5 text-neutral-400 pointer-events-none" />
        </div>
        {((errors as any).operational?.mapsLocation) && (
          <p className="text-red-500 text-sm mt-1">{((errors as any).operational?.mapsLocation as any)?.message}</p>
        )}
      </div>

      {/* Facility Photos Upload */}
      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-2">
          Facility Photos Upload
          <span className="text-xs text-neutral-500 ml-1">(Multiple files allowed)</span>
        </label>
        <div className="relative">
          <input
            {...register('operational.facilityPhotos', {})}
            type="file"
            multiple
            accept=".jpg,.jpeg,.png"
            className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />
          <Upload className="absolute right-3 top-2.5 w-5 h-5 text-neutral-400 pointer-events-none" />
        </div>
        {((errors as any).operational?.facilityPhotos) && (
          <p className="text-red-500 text-sm mt-1">{((errors as any).operational?.facilityPhotos as any)?.message}</p>
        )}
        {facilityPhotos?.length > 0 && (
          <p className="text-green-600 text-sm mt-1">✓ {facilityPhotos.length} file(s) selected</p>
        )}
      </div>

      {/* Primary Contact Name */}
      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-2">
          Primary Contact Name
        </label>
        <input
          {...register('operational.primaryContactName', {})}
          type="text"
          placeholder="Enter primary contact name"
          className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
        />
        {((errors as any).operational?.primaryContactName) && (
          <p className="text-red-500 text-sm mt-1">{((errors as any).operational?.primaryContactName as any)?.message}</p>
        )}
      </div>

      {/* Primary Contact Number */}
      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-2">
          Primary Contact Number
        </label>
        <input
          {...register('operational.primaryContactNumber', {
            pattern: {
              value: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
              message: 'Invalid phone number format',
            },
          })}
          type="tel"
          placeholder="Enter primary contact number"
          className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
        />
        {((errors as any).operational?.primaryContactNumber) && (
          <p className="text-red-500 text-sm mt-1">{((errors as any).operational?.primaryContactNumber as any)?.message}</p>
        )}
      </div>

      {/* Company Email */}
      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-2">
          Company Email
        </label>
        <input
          {...register('operational.companyEmail', {
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Invalid email address',
            },
          })}
          type="email"
          placeholder="Enter company email"
          className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
        />
        {((errors as any).operational?.companyEmail) && (
          <p className="text-red-500 text-sm mt-1">{((errors as any).operational?.companyEmail as any)?.message}</p>
        )}
      </div>

      {/* Company Website */}
      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-2">
          Company Website <span className="text-neutral-500">(Optional)</span>
        </label>
        <input
          {...register('operational.companyWebsite', {
            pattern: {
              value: /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/,
              message: 'Invalid website URL',
            },
          })}
          type="url"
          placeholder="https://www.example.com"
          className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
        />
        {((errors as any).operational?.companyWebsite) && (
          <p className="text-red-500 text-sm mt-1">{((errors as any).operational?.companyWebsite as any)?.message}</p>
        )}
      </div>
    </div>
  );
};
