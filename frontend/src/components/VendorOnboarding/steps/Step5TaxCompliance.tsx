'use client';
import React from 'react';
import DocumentUpload from '../DocumentUpload';

const Step5TaxCompliance = ({ data, onChange, onboardingId }: any) => (
  <div className="space-y-6">
    <div><label className="block text-sm font-semibold text-gray-900 mb-4">VAT Registered?</label><div className="flex gap-4"><label className="flex items-center"><input type="radio" checked={data?.vatRegistered === true} onChange={() => onChange({ vatRegistered: true })} className="w-4 h-4" /><span className="ml-2 text-sm">Yes</span></label><label className="flex items-center"><input type="radio" checked={data?.vatRegistered === false} onChange={() => onChange({ vatRegistered: false })} className="w-4 h-4" /><span className="ml-2 text-sm">No</span></label></div></div>
    {data?.vatRegistered && (
      <>
        <input type="text" placeholder="VAT/TRN Number" value={data?.vatrn || ''} onChange={(e) => onChange({ vatrn: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
        <DocumentUpload onboardingId={onboardingId} documentType="vat_certificate" label="Upload VAT Registration Certificate" required existingDocumentId={data?.vatRegistrationCertificateDocumentId} onUpload={(docId) => onChange({ vatRegistrationCertificateDocumentId: docId })} />
      </>
    )}
  </div>
);
export default Step5TaxCompliance;
