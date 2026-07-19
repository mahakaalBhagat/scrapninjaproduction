'use client';

import React, { useState } from 'react';
import { AlertCircle, CheckCircle, Upload } from 'lucide-react';

interface Step8Props {
  data: any;
  onChange: (data: any) => void;
  onboardingId: number | null;
}

const Step8EnvironmentalCompliance: React.FC<Step8Props> = ({ data, onChange, onboardingId }) => {
  const [localData, setLocalData] = useState(data?.environmentalCompliance || {});

  const handleChange = (field: string, value: any) => {
    const updated = { ...localData, [field]: value };
    setLocalData(updated);
    onChange({ environmentalCompliance: updated });
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-emerald-950/40 to-slate-900/40 border border-emerald-500/30 rounded-xl p-6">
        <div className="flex gap-3 mb-4">
          <AlertCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <div>
            <h3 className="text-lg font-semibold text-white mb-1">Environmental Compliance</h3>
            <p className="text-sm text-slate-300">Document your environmental permits and compliance certifications</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {/* Environmental Permits */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Environmental Permits <span className="text-red-500">*</span>
          </label>
          <textarea
            value={localData.permits || ''}
            onChange={(e) => handleChange('permits', e.target.value)}
            placeholder="List all environmental permits and certifications"
            className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            rows={4}
          />
        </div>

        {/* Compliance Certifications */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Compliance Certifications
          </label>
          <textarea
            value={localData.certifications || ''}
            onChange={(e) => handleChange('certifications', e.target.value)}
            placeholder="ISO, Environmental, or other relevant certifications"
            className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            rows={4}
          />
        </div>

        {/* Waste Management Plan */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Waste Management Plan
          </label>
          <textarea
            value={localData.wasteManagementPlan || ''}
            onChange={(e) => handleChange('wasteManagementPlan', e.target.value)}
            placeholder="Describe your waste management and disposal procedures"
            className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            rows={4}
          />
        </div>
      </div>

      <div className="bg-slate-800/40 border border-slate-700/30 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-slate-300">
            Ensure all environmental compliance documentation is up-to-date and valid.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Step8EnvironmentalCompliance;
