'use client';

import React from 'react';
import { CheckCircle, Circle } from 'lucide-react';

interface ApprovalChecklistProps {
  data: any;
}

const ApprovalChecklist: React.FC<ApprovalChecklistProps> = ({ data }) => {
  const checklist = [
    {
      item: 'Trade License Uploaded',
      completed: !!data?.tradeLicenseDocumentId,
    },
    {
      item: 'Business Registration Number',
      completed: !!data?.businessRegistrationNumber,
    },
    {
      item: 'Director/Owner Passport Uploaded',
      completed: !!data?.directorPassportDocumentId,
    },
    {
      item: 'Certificate of Incorporation',
      completed: !!data?.certificateOfIncorporationDocumentId,
    },
    {
      item: 'Memorandum of Association',
      completed: !!data?.moaDocumentId,
    },
    {
      item: 'UBO Declaration Uploaded',
      completed: !!data?.uboDeclarationDocumentId,
    },
    {
      item: 'VAT/TRN Certificate (if applicable)',
      completed: !data?.vatRegistered || !!data?.vatRegistrationCertificateDocumentId,
    },
    {
      item: 'Bank Account Proof',
      completed: !!data?.cancelledChequeDocumentId || !!data?.bankVerificationLetterDocumentId,
    },
    {
      item: 'Warehouse/Facility Address Added',
      completed: !!data?.warehouseYardAddress,
    },
    {
      item: 'Facility Photos Uploaded',
      completed: data?.facilityPhotosDocumentIds && data.facilityPhotosDocumentIds.length >= 3,
    },
    {
      item: 'Vendor Agreement Signed',
      completed:
        data?.antiFraudPolicyAccepted &&
        data?.complianceWithLocalLawsAccepted &&
        data?.noStolenIllegalScrapAccepted &&
        data?.disputeResolutionAccepted &&
        data?.scrapNinjaCommercialTermsAccepted,
    },
    {
      item: 'Scrap Source Declaration',
      completed: data?.scrapLegalSourceDeclaration,
    },
  ];

  const completedCount = checklist.filter((item) => item.completed).length;
  const completionPercentage = Math.round((completedCount / checklist.length) * 100);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Final Approval Checklist</h3>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold text-gray-700">Overall Progress</span>
          <span className="text-sm font-bold text-blue-600">{completionPercentage}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
      </div>

      {/* Checklist Items */}
      <div className="space-y-3">
        {checklist.map((item, index) => (
          <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
            {item.completed ? (
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
            ) : (
              <Circle className="w-5 h-5 text-gray-300 flex-shrink-0" />
            )}
            <span className={item.completed ? 'text-gray-900 font-medium' : 'text-gray-600'}>
              {item.item}
            </span>
          </div>
        ))}
      </div>

      {/* Status Badge */}
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm">
          <span className="font-semibold text-blue-900">{completedCount}</span>
          <span className="text-blue-700"> of {checklist.length} items completed</span>
        </p>
        {completionPercentage === 100 && (
          <p className="text-sm text-green-700 font-semibold mt-2">✓ All requirements met. Ready to submit!</p>
        )}
      </div>
    </div>
  );
};

export default ApprovalChecklist;
