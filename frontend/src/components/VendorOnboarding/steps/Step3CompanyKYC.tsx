'use client';
import React from 'react';
import DocumentUpload from '../DocumentUpload';

const Step3CompanyKYC = ({ data, onChange, onboardingId }: any) => (
  <div className="space-y-6">
    <input type="text" placeholder="Director/Owner Full Name" value={data?.directorOwnerFullName || ''} onChange={(e) => onChange({ directorOwnerFullName: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
    <input type="text" placeholder="Passport Number" value={data?.directorPassportNumber || ''} onChange={(e) => onChange({ directorPassportNumber: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
    <DocumentUpload onboardingId={onboardingId} documentType="director_passport" label="Upload Passport Copy" required existingDocumentId={data?.directorPassportDocumentId} onUpload={(docId) => onChange({ directorPassportDocumentId: docId })} />
    <input type="text" placeholder="Emirates ID" value={data?.emiratesIdNumber || ''} onChange={(e) => onChange({ emiratesIdNumber: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
    <DocumentUpload onboardingId={onboardingId} documentType="certificate_incorporation" label="Certificate of Incorporation" required existingDocumentId={data?.certificateOfIncorporationDocumentId} onUpload={(docId) => onChange({ certificateOfIncorporationDocumentId: docId })} />
    <DocumentUpload onboardingId={onboardingId} documentType="moa" label="Memorandum of Association (MOA)" required existingDocumentId={data?.moaDocumentId} onUpload={(docId) => onChange({ moaDocumentId: docId })} />
    <input type="text" placeholder="Authorized Signatory Name" value={data?.authorizedSignatoryName || ''} onChange={(e) => onChange({ authorizedSignatoryName: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
    <input type="text" placeholder="Signatory Designation" value={data?.authorizedSignatoryDesignation || ''} onChange={(e) => onChange({ authorizedSignatoryDesignation: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
  </div>
);
export default Step3CompanyKYC;
