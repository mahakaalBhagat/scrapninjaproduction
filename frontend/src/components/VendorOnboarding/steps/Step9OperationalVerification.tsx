'use client';

import React, { useState } from 'react';
import { MapPin, Phone, Mail, CheckCircle } from 'lucide-react';

interface Step9Props {
  data: any;
  onChange: (data: any) => void;
  onboardingId: number | null;
}

const Step9OperationalVerification: React.FC<Step9Props> = ({ data, onChange, onboardingId }) => {
  const [localData, setLocalData] = useState(data?.operationalVerification || {});

  const handleChange = (field: string, value: any) => {
    const updated = { ...localData, [field]: value };
    setLocalData(updated);
    onChange({ operationalVerification: updated });
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-emerald-950/40 to-slate-900/40 border border-emerald-500/30 rounded-xl p-6">
        <div className="flex gap-3 mb-4">
          <MapPin className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <div>
            <h3 className="text-lg font-semibold text-white mb-1">Operational Verification</h3>
            <p className="text-sm text-slate-300">Provide details about your facility and operations</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {/* Warehouse Address */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Warehouse Address <span className="text-red-500">*</span>
          </label>
          <textarea
            value={localData.warehouseAddress || ''}
            onChange={(e) => handleChange('warehouseAddress', e.target.value)}
            placeholder="Enter your warehouse or facility address"
            className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            rows={3}
          />
        </div>

        {/* Operating Hours */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Operating Hours
          </label>
          <input
            type="text"
            value={localData.operatingHours || ''}
            onChange={(e) => handleChange('operatingHours', e.target.value)}
            placeholder="e.g., Monday-Friday 9AM-5PM, Saturday 10AM-2PM"
            className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
        </div>

        {/* Staff Count */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Number of Staff
          </label>
          <input
            type="number"
            value={localData.staffCount || ''}
            onChange={(e) => handleChange('staffCount', parseInt(e.target.value))}
            placeholder="Total number of employees"
            className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
        </div>

        {/* Contact Person */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Primary Contact Person
          </label>
          <input
            type="text"
            value={localData.contactPerson || ''}
            onChange={(e) => handleChange('contactPerson', e.target.value)}
            placeholder="Name of primary contact"
            className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
        </div>

        {/* Contact Phone */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Contact Phone Number
          </label>
          <input
            type="tel"
            value={localData.contactPhone || ''}
            onChange={(e) => handleChange('contactPhone', e.target.value)}
            placeholder="Phone number for operations contact"
            className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Operations Email
          </label>
          <input
            type="email"
            value={localData.operationsEmail || ''}
            onChange={(e) => handleChange('operationsEmail', e.target.value)}
            placeholder="Email for operational matters"
            className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
        </div>

        {/* Facility Details */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Facility Details
          </label>
          <textarea
            value={localData.facilityDetails || ''}
            onChange={(e) => handleChange('facilityDetails', e.target.value)}
            placeholder="Describe your facility - size, equipment, storage capacity, etc."
            className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            rows={4}
          />
        </div>
      </div>

      <div className="bg-slate-800/40 border border-slate-700/30 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-slate-300">
            Accurate operational information helps us better support your scrap collection and delivery operations.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Step9OperationalVerification;
