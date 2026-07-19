'use client';

import React from 'react';
import { AlertCircle } from 'lucide-react';
import DocumentUpload from '../DocumentUpload';

interface Step1Props {
  data: any;
  onChange: (data: any) => void;
  onboardingId: number | null;
}

const Step1BusinessVerification: React.FC<Step1Props> = ({ data, onChange, onboardingId }) => {
  const handleChange = (field: string, value: any) => {
    onChange({ [field]: value });
  };

  const handleDateChange = (field: string, value: string) => {
    const date = new Date(value);
    const isExpired = date < new Date();
    if (isExpired) {
      alert('Trade License expiry date cannot be in the past');
      return;
    }
    onChange({ [field]: value });
  };

  return (
    <div className="space-y-6">
      {/* Company Legal Name */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          Company Legal Name <span className="text-red-600">*</span>
        </label>
        <input
          type="text"
          value={data?.companyLegalName || ''}
          onChange={(e) => handleChange('companyLegalName', e.target.value)}
          placeholder="Enter your company's legal name"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Business Registration Number */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          Business Registration Number <span className="text-red-600">*</span>
        </label>
        <input
          type="text"
          value={data?.businessRegistrationNumber || ''}
          onChange={(e) => handleChange('businessRegistrationNumber', e.target.value)}
          placeholder="Enter business registration number"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Trade License Number */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          Trade License Number <span className="text-red-600">*</span>
        </label>
        <input
          type="text"
          value={data?.tradeLicenseNumber || ''}
          onChange={(e) => handleChange('tradeLicenseNumber', e.target.value)}
          placeholder="Enter trade license number"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Trade License Expiry Date */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          Trade License Expiry Date <span className="text-red-600">*</span>
        </label>
        <input
          type="date"
          value={data?.tradeLicenseExpiryDate || ''}
          onChange={(e) => handleDateChange('tradeLicenseExpiryDate', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {data?.tradeLicenseExpiryDate && (
          <p className="text-sm text-gray-600 mt-1">
            License expires on: {new Date(data.tradeLicenseExpiryDate).toLocaleDateString()}
          </p>
        )}
      </div>

      {/* Registered Business Address */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          Registered Business Address <span className="text-red-600">*</span>
        </label>
        <textarea
          value={data?.registeredBusinessAddress || ''}
          onChange={(e) => handleChange('registeredBusinessAddress', e.target.value)}
          placeholder="Enter your registered business address"
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Mainland / Free Zone Status */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          Mainland / Free Zone Status <span className="text-red-600">*</span>
        </label>
        <select
          value={data?.mainlandFreeZoneStatus || ''}
          onChange={(e) => handleChange('mainlandFreeZoneStatus', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select...</option>
          <option value="mainland">Mainland</option>
          <option value="free_zone">Free Zone</option>
          <option value="offshore">Offshore</option>
        </select>
      </div>

      {/* Trade License Upload */}
      <div>
        <DocumentUpload
          onboardingId={onboardingId}
          documentType="trade_license"
          label="Upload Trade License Document"
          required={true}
          allowedTypes={['application/pdf', 'image/jpeg', 'image/png']}
          existingDocumentId={data?.tradeLicenseDocumentId}
          onUpload={(docId) => handleChange('tradeLicenseDocumentId', docId)}
        />
      </div>

      {/* Information Box */}
      <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
        <div className="text-sm text-blue-700">
          <p className="font-semibold">Important:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Trade license must be valid and not expired</li>
            <li>All documents must be clear and legible</li>
            <li>Maximum file size: 10MB</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Step1BusinessVerification;
