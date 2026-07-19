'use client';
import React from 'react';
import DocumentUpload from '../DocumentUpload';

const Step6BankingVerification = ({ data, onChange, onboardingId }: any) => (
  <div className="space-y-6">
    <input type="text" placeholder="Bank Name" value={data?.bankName || ''} onChange={(e) => onChange({ bankName: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
    <input type="text" placeholder="Account Holder Name (must match company)" value={data?.accountHolderName || ''} onChange={(e) => onChange({ accountHolderName: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
    <input type="text" placeholder="Account Number" value={data?.accountNumber || ''} onChange={(e) => onChange({ accountNumber: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
    <input type="text" placeholder="IBAN Number" value={data?.ibanNumber || ''} onChange={(e) => onChange({ ibanNumber: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
    <input type="text" placeholder="SWIFT Code" value={data?.swiftCode || ''} onChange={(e) => onChange({ swiftCode: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
    <DocumentUpload onboardingId={onboardingId} documentType="cancelled_cheque" label="Upload Cancelled Cheque" existingDocumentId={data?.cancelledChequeDocumentId} onUpload={(docId) => onChange({ cancelledChequeDocumentId: docId })} />
    <DocumentUpload onboardingId={onboardingId} documentType="bank_letter" label="Bank Verification Letter" existingDocumentId={data?.bankVerificationLetterDocumentId} onUpload={(docId) => onChange({ bankVerificationLetterDocumentId: docId })} />
  </div>
);
export default Step6BankingVerification;
