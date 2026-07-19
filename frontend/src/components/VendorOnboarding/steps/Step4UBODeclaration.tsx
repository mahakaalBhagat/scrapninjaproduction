'use client';
import React from 'react';
import DocumentUpload from '../DocumentUpload';

const Step4UBODeclaration = ({ data, onChange, onboardingId }: any) => (
  <div className="space-y-6">
    <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg"><p className="text-sm text-amber-700">Add details of all beneficial owners with ownership percentage.</p></div>
    <DocumentUpload onboardingId={onboardingId} documentType="ownership_structure" label="Upload Ownership Structure Chart" existingDocumentId={data?.ownershipStructureChartDocumentId} onUpload={(docId) => onChange({ ownershipStructureChartDocumentId: docId })} />
    <DocumentUpload onboardingId={onboardingId} documentType="ubo_declaration" label="Upload Signed UBO Declaration" required existingDocumentId={data?.uboDeclarationDocumentId} onUpload={(docId) => onChange({ uboDeclarationDocumentId: docId })} />
    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg"><p className="text-sm text-blue-700">Total ownership percentage must equal 100%</p></div>
  </div>
);
export default Step4UBODeclaration;
