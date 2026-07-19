'use client';

import React from 'react';
import { useFormContext } from 'react-hook-form';
import { CheckCircle2 } from 'lucide-react';

export const VendorAgreement: React.FC = () => {
  const { register, formState: { errors } } = useFormContext();

  const agreements = [
    {
      key: 'antiFraud',
      label: 'Accept Anti-Fraud Policy',
      description: 'I agree to comply with ScrapNinja anti-fraud policies and guidelines',
    },
    {
      key: 'localLaws',
      label: 'Comply With Local Laws',
      description: 'I confirm that my business complies with all local laws and regulations',
    },
    {
      key: 'noStolenScrap',
      label: 'No Stolen/Illegal Scrap',
      description: 'I confirm that all scrap traded is from legal sources only',
    },
    {
      key: 'disputeResolution',
      label: 'Accept Dispute Resolution Terms',
      description: 'I agree to ScrapNinja dispute resolution procedures',
    },
    {
      key: 'commercialTerms',
      label: 'Accept ScrapNinja Commercial Terms',
      description: 'I agree to the commercial terms and conditions set by ScrapNinja',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-neutral-900 mb-4">Vendor Agreement</h3>
        <p className="text-sm text-neutral-600 mb-6">Please review and accept all required agreements.</p>
      </div>

      <div className="space-y-3">
        {agreements.map((agreement) => (
          <label
            key={agreement.key}
            className="flex items-start p-4 border border-neutral-300 rounded-lg hover:bg-amber-50 cursor-pointer transition"
          >
            <input
              {...register(`vendorAgreement.${agreement.key}`)}
              type="checkbox"
              className="w-5 h-5 text-amber-600 rounded focus:ring-2 focus:ring-amber-500 mt-0.5 flex-shrink-0"
            />
            <div className="ml-3 flex-1">
              <p className="font-medium text-neutral-900">{agreement.label}</p>
              <p className="text-sm text-neutral-600">{agreement.description}</p>
            </div>
          </label>
        ))}
      </div>

      {Object.keys(errors.vendorAgreement || {}).length > 0 && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700 font-medium mb-2">Please accept all agreements to continue:</p>
          <ul className="space-y-1">
            {Object.entries(errors.vendorAgreement || {}).map(([key, error]) => (
              <li key={key} className="text-red-600 text-sm">
                • {(error as any)?.message}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex gap-3">
          <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-blue-900">
              <strong>Confidentiality Notice:</strong> All information submitted will be handled confidentially and used only for vendor verification purposes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
