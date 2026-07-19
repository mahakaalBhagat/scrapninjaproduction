'use client';

import React from 'react';
import { AlertCircle } from 'lucide-react';
import DocumentUpload from '../DocumentUpload';

interface StepProps {
  data: any;
  onChange: (data: any) => void;
  onboardingId: number | null;
}

const Step2ScrapTrading: React.FC<StepProps> = ({ data, onChange, onboardingId }) => {
  const tradingActivities = ['Scrap Trading', 'Metal Scrap Trading', 'Waste Trading', 'Recycling', 'Other'];

  const handleActivityToggle = (activity: string) => {
    const current = data?.tradingActivityTypes || [];
    const updated = current.includes(activity)
      ? current.filter((a: string) => a !== activity)
      : [...current, activity];
    onChange({ tradingActivityTypes: updated });
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-4">
          Trading Activity Type <span className="text-red-600">*</span>
          <p className="text-xs font-normal text-gray-600 mt-1">Select at least one activity</p>
        </label>
        <div className="space-y-3">
          {tradingActivities.map((activity) => (
            <label key={activity} className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={(data?.tradingActivityTypes || []).includes(activity)}
                onChange={() => handleActivityToggle(activity)}
                className="w-4 h-4 rounded border-gray-300 text-blue-600"
              />
              <span className="ml-3 text-sm text-gray-700">{activity}</span>
            </label>
          ))}
        </div>
      </div>

      <DocumentUpload
        onboardingId={onboardingId}
        documentType="supporting_license"
        label="Upload Supporting License Document"
        existingDocumentId={data?.supportingLicenseDocumentId}
        onUpload={(docId) => onChange({ supportingLicenseDocumentId: docId })}
      />

      <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
        <p className="text-sm text-blue-700">Select the types of scrap trading activities your company engages in.</p>
      </div>
    </div>
  );
};

export default Step2ScrapTrading;
