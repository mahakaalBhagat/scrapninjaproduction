'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Save, CheckCircle2, AlertCircle, ChevronLeft } from 'lucide-react';

import { GlobalNavigationHeader } from '@/components/common/GlobalNavigationHeader';
import { ProgressIndicator } from '@/components/vendor-onboarding/ProgressIndicator';
import { BusinessVerification } from '@/components/vendor-onboarding/BusinessVerification';
import { ScrapTradingAuthorization } from '@/components/vendor-onboarding/ScrapTradingAuthorization';
import { KYCSection } from '@/components/vendor-onboarding/KYCSection';
import { UBOSection } from '@/components/vendor-onboarding/UBOSection';
import { TaxCompliance } from '@/components/vendor-onboarding/TaxCompliance';
import { BankingVerification } from '@/components/vendor-onboarding/BankingVerification';
import { ScrapSourceDeclaration } from '@/components/vendor-onboarding/ScrapSourceDeclaration';
import { EnvironmentalCompliance } from '@/components/vendor-onboarding/EnvironmentalCompliance';
import { OperationalVerification } from '@/components/vendor-onboarding/OperationalVerification';
import { VendorAgreement } from '@/components/vendor-onboarding/VendorAgreement';

// Create file validator that works on both client and server
const getFileSchema = () => {
  if (typeof FileList !== 'undefined') {
    return z.instanceof(FileList);
  }
  return z.any();
};

// Zod Schema for validation - All fields optional except final agreement checkboxes
const vendorOnboardingSchema = z.object({
  businessVerification: z.object({
    companyName: z.string().optional().or(z.literal('')),
    registrationNumber: z.string().optional().or(z.literal('')),
    tradeLicenseNumber: z.string().optional().or(z.literal('')),
    licenseExpiryDate: z.string().optional().or(z.literal('')),
    businessAddress: z.string().optional().or(z.literal('')),
    businessType: z.enum(['MAINLAND', 'FREE_ZONE']).optional(),
    tradeLicenseFile: getFileSchema().optional(),
  }),
  tradingAuthorization: z.object({
    types: z.array(z.string()).optional(),
  }),
  kyc: z.object({
    passportFile: getFileSchema().optional(),
    emiratesIdFile: getFileSchema().optional(),
    incorporationFile: getFileSchema().optional(),
    moaFile: getFileSchema().optional(),
    signatoryName: z.string().optional().or(z.literal('')),
    signatoryDesignation: z.string().optional().or(z.literal('')),
  }),
  ubo: z.object({
    beneficialOwners: z.array(
      z.object({
        name: z.string().optional().or(z.literal('')),
        ownership: z.number().optional(),
      })
    ).optional(),
    structureFile: getFileSchema().optional(),
    declarationFile: getFileSchema().optional(),
  }),
  taxCompliance: z.object({
    isVatRegistered: z.string().optional(),
    vatTrnNumber: z.string().optional(),
    vatFile: getFileSchema().optional(),
  }),
  banking: z.object({
    bankName: z.string().optional().or(z.literal('')),
    accountHolderName: z.string().optional().or(z.literal('')),
    iban: z.string().optional().or(z.literal('')),
    accountNumber: z.string().optional().or(z.literal('')),
    chequeFile: getFileSchema().optional(),
    bankLetterFile: getFileSchema().optional(),
  }),
  scrapSource: z.object({
    scrapSource: z.string().optional().or(z.literal('')),
    scrapTypes: z.string().optional().or(z.literal('')),
    scrapOrigin: z.string().optional().or(z.literal('')),
  }),
  environmental: z.object({
    permitFile: getFileSchema().optional(),
    wastePermitFile: getFileSchema().optional(),
    municipalityFile: getFileSchema().optional(),
  }),
  operational: z.object({
    warehouseAddress: z.string().optional().or(z.literal('')),
    mapsLocation: z.string().optional().or(z.literal('')),
    facilityPhotos: getFileSchema().optional(),
    primaryContactName: z.string().optional().or(z.literal('')),
    primaryContactNumber: z.string().optional().or(z.literal('')),
    companyEmail: z.string().optional().or(z.literal('')),
    companyWebsite: z.string().optional().or(z.literal('')),
  }),
  vendorAgreement: z.object({
    antiFraud: z.boolean().refine((val) => val === true, 'Must accept anti-fraud policy'),
    localLaws: z.boolean().refine((val) => val === true, 'Must accept local laws compliance'),
    noStolenScrap: z.boolean().refine((val) => val === true, 'Must confirm no stolen scrap'),
    disputeResolution: z.boolean().refine((val) => val === true, 'Must accept dispute resolution'),
    commercialTerms: z.boolean().refine((val) => val === true, 'Must accept commercial terms'),
  }),
});

type VendorOnboardingFormData = z.infer<typeof vendorOnboardingSchema>;

export default function VendorOnboarding() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [savingDraft, setSavingDraft] = useState(false);

  const stepNames = [
    'Business Info',
    'Trading Auth',
    'KYC/KYB',
    'UBO',
    'Tax',
    'Banking',
    'Scrap Source',
    'Environment',
    'Operations',
    'Agreement',
  ];

  const totalSteps = stepNames.length;

  const methods = useForm<VendorOnboardingFormData>({
    resolver: zodResolver(vendorOnboardingSchema),
    mode: 'onChange',
    defaultValues: {
      ubo: { beneficialOwners: [] },
    },
  });

  // Load draft from localStorage on mount
  useEffect(() => {
    const savedDraft = localStorage.getItem('vendor_onboarding_draft');
    if (savedDraft) {
      try {
        const draft = JSON.parse(savedDraft);
        // Note: FileList cannot be restored, so we only restore text fields
        methods.reset(draft);
      } catch (error) {
        console.error('Error loading draft:', error);
      }
    }
  }, [methods]);

  const saveDraft = async () => {
    setSavingDraft(true);
    try {
      const formData = methods.getValues();
      // Convert FileList to null for storage
      const draftData = JSON.parse(JSON.stringify(formData));
      localStorage.setItem('vendor_onboarding_draft', JSON.stringify(draftData));
      setSuccessMessage('Draft saved successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error saving draft:', error);
    } finally {
      setSavingDraft(false);
    }
  };

  const handleNext = async () => {
    // Allow free progression to next step without validation
    // User can skip steps and submit incomplete data
    // Backend and admin can process and follow up with vendor for missing documents
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Direct submit handler - bypasses all validation
  // Submits immediately regardless of field completion
  const handleDirectSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Get all form values directly without validation
      const data = methods.getValues();

      // Create FormData object for file uploads
      const formDataToSend = new FormData();

      // Add all files (if any exist)
      if (data.businessVerification.tradeLicenseFile && data.businessVerification.tradeLicenseFile[0]) {
        formDataToSend.append(
          'tradeLicenseFile',
          data.businessVerification.tradeLicenseFile[0]
        );
      }
      if (data.kyc.passportFile && data.kyc.passportFile[0]) {
        formDataToSend.append('passportFile', data.kyc.passportFile[0]);
      }
      if (data.kyc.emiratesIdFile && data.kyc.emiratesIdFile[0]) {
        formDataToSend.append('emiratesIdFile', data.kyc.emiratesIdFile[0]);
      }
      if (data.kyc.incorporationFile && data.kyc.incorporationFile[0]) {
        formDataToSend.append('incorporationFile', data.kyc.incorporationFile[0]);
      }
      if (data.kyc.moaFile && data.kyc.moaFile[0]) {
        formDataToSend.append('moaFile', data.kyc.moaFile[0]);
      }
      if (data.ubo.structureFile && data.ubo.structureFile[0]) {
        formDataToSend.append('structureFile', data.ubo.structureFile[0]);
      }
      if (data.ubo.declarationFile && data.ubo.declarationFile[0]) {
        formDataToSend.append('declarationFile', data.ubo.declarationFile[0]);
      }
      if (data.banking.chequeFile && data.banking.chequeFile[0]) {
        formDataToSend.append('chequeFile', data.banking.chequeFile[0]);
      }
      if (data.banking.bankLetterFile && data.banking.bankLetterFile[0]) {
        formDataToSend.append('bankLetterFile', data.banking.bankLetterFile[0]);
      }
      if (data.environmental.permitFile && data.environmental.permitFile[0]) {
        formDataToSend.append('permitFile', data.environmental.permitFile[0]);
      }
      if (data.environmental.wastePermitFile && data.environmental.wastePermitFile[0]) {
        formDataToSend.append('wastePermitFile', data.environmental.wastePermitFile[0]);
      }
      if (data.environmental.municipalityFile && data.environmental.municipalityFile[0]) {
        formDataToSend.append('municipalityFile', data.environmental.municipalityFile[0]);
      }
      if (data.operational.facilityPhotos && data.operational.facilityPhotos[0]) {
        Array.from(data.operational.facilityPhotos).forEach((file: any, index) => {
          formDataToSend.append(`facilityPhoto_${index}`, file as Blob);
        });
      }
      if (data.taxCompliance.vatFile && data.taxCompliance.vatFile[0]) {
        formDataToSend.append('vatFile', data.taxCompliance.vatFile[0]);
      }

      // Add form data as JSON
      formDataToSend.append('formData', JSON.stringify(data));

      // Make API call immediately without validation
      const response = await fetch('/api/vendor-onboarding', {
        method: 'POST',
        body: formDataToSend,
      });

      if (response.ok) {
        const result = await response.json();
        setSuccessMessage(`✓ ${result.message || 'Application submitted successfully!'}`);
        setTimeout(() => {
          router.push('/');
        }, 3000);
      } else {
        throw new Error('Failed to submit application');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      methods.setError('root', {
        message: 'Failed to submit application. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (data: VendorOnboardingFormData) => {
    setIsSubmitting(true);
    try {
      // Create FormData object for file uploads
      const formDataToSend = new FormData();

      // Add all files
      if (data.businessVerification.tradeLicenseFile) {
        formDataToSend.append(
          'tradeLicenseFile',
          data.businessVerification.tradeLicenseFile[0]
        );
      }
      if (data.kyc.passportFile) {
        formDataToSend.append('passportFile', data.kyc.passportFile[0]);
      }
      if (data.kyc.incorporationFile) {
        formDataToSend.append('incorporationFile', data.kyc.incorporationFile[0]);
      }
      if (data.kyc.moaFile) {
        formDataToSend.append('moaFile', data.kyc.moaFile[0]);
      }
      if (data.ubo.structureFile) {
        formDataToSend.append('structureFile', data.ubo.structureFile[0]);
      }
      if (data.ubo.declarationFile) {
        formDataToSend.append('declarationFile', data.ubo.declarationFile[0]);
      }
      if (data.banking.chequeFile) {
        formDataToSend.append('chequeFile', data.banking.chequeFile[0]);
      }
      if (data.banking.bankLetterFile) {
        formDataToSend.append('bankLetterFile', data.banking.bankLetterFile[0]);
      }
      if (data.environmental.permitFile) {
        formDataToSend.append('permitFile', data.environmental.permitFile[0]);
      }
      if (data.environmental.wastePermitFile) {
        formDataToSend.append('wastePermitFile', data.environmental.wastePermitFile[0]);
      }
      if (data.environmental.municipalityFile) {
        formDataToSend.append('municipalityFile', data.environmental.municipalityFile[0]);
      }
      if (data.operational.facilityPhotos) {
        Array.from(data.operational.facilityPhotos).forEach((file: any, index) => {
          formDataToSend.append(`facilityPhoto_${index}`, file as Blob);
        });
      }
      if (data.taxCompliance.vatFile) {
        formDataToSend.append('vatFile', data.taxCompliance.vatFile[0]);
      }

      // Add form data
      formDataToSend.append('formData', JSON.stringify(data));

      // Make API call
      const response = await fetch('/api/vendor-onboarding', {
        method: 'POST',
        body: formDataToSend,
      });

      if (response.ok) {
        setSuccessMessage('Vendor application submitted successfully!');
        localStorage.removeItem('vendor_onboarding_draft');
        methods.reset();
        setCurrentStep(1);
        setTimeout(() => setSuccessMessage(''), 5000);
      } else {
        throw new Error('Failed to submit application');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      methods.setError('root', {
        message: 'Failed to submit application. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <BusinessVerification />;
      case 2:
        return <ScrapTradingAuthorization />;
      case 3:
        return <KYCSection />;
      case 4:
        return <UBOSection />;
      case 5:
        return <TaxCompliance />;
      case 6:
        return <BankingVerification />;
      case 7:
        return <ScrapSourceDeclaration />;
      case 8:
        return <EnvironmentalCompliance />;
      case 9:
        return <OperationalVerification />;
      case 10:
        return <VendorAgreement />;
      default:
        return null;
    }
  };

  return (
    <>
      {/* Global Navigation Header */}
      <GlobalNavigationHeader hideSignIn={true} />

      {/* Main Onboarding Content */}
      <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-slate-900 to-emerald-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => router.push('/')}
          className="flex items-center gap-2 text-emerald-300 hover:text-emerald-200 transition-colors mb-8 px-4 py-2 bg-emerald-950/50 border border-emerald-500/50 rounded-lg hover:bg-emerald-950/70"
        >
          <ChevronLeft size={20} />
          Back to Home
        </button>
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            🚛 Become a ScrapNinja Vendor
          </h1>
          <p className="text-emerald-200">
            Complete your vendor profile to start trading scrap with us
          </p>
        </motion.div>

        {/* Success Message */}
        {successMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-6 p-4 bg-emerald-950/50 border border-emerald-500/50 rounded-lg flex items-center gap-3"
          >
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <p className="text-emerald-200">{successMessage}</p>
          </motion.div>
        )}

        {/* Progress Indicator */}
        <ProgressIndicator
          currentStep={currentStep}
          totalSteps={totalSteps}
          stepNames={stepNames}
        />

        {/* Form */}
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(handleSubmit)} className="space-y-8">
            {/* Error Messages */}
            {methods.formState.errors.root && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-4 bg-red-950/50 border border-red-500/50 rounded-lg flex items-start gap-3"
              >
                <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-red-200 font-medium">{methods.formState.errors.root.message}</p>
                </div>
              </motion.div>
            )}

            {/* Step Content */}
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-gradient-to-br from-emerald-950/40 to-slate-800/40 backdrop-blur-sm rounded-xl shadow-lg border border-emerald-500/30 p-6 md:p-8"
            >
              {renderStep()}
            </motion.div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className="flex items-center gap-2 px-6 py-3 text-emerald-200 bg-emerald-950/50 border border-emerald-500/50 rounded-lg hover:bg-emerald-950/70 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                <ArrowLeft className="w-4 h-4" />
                Previous
              </button>

              <button
                type="button"
                onClick={saveDraft}
                disabled={savingDraft}
                className="flex items-center gap-2 px-6 py-3 text-emerald-200 bg-emerald-950/50 border border-emerald-500/50 rounded-lg hover:bg-emerald-950/70 transition disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                {savingDraft ? '💾 Saving...' : '💾 Save Draft'}
              </button>

              {currentStep === totalSteps ? (
                <button
                  type="button"
                  onClick={handleDirectSubmit}
                  disabled={isSubmitting}
                  className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg hover:from-emerald-600 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition font-medium shadow-lg hover:shadow-emerald-500/50"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  {isSubmitting ? '⏳ Submitting...' : '✓ Submit Application'}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg hover:from-emerald-600 hover:to-emerald-700 transition font-medium shadow-lg hover:shadow-emerald-500/50"
                >
                  Next
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Step Counter */}
            <div className="text-center text-sm text-emerald-300">
              Step {currentStep} of {totalSteps}
            </div>
          </form>
        </FormProvider>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 p-6 bg-blue-50 border border-blue-200 rounded-lg"
        >
          <h3 className="font-semibold text-blue-900 mb-2">Need Help?</h3>
          <p className="text-blue-800 text-sm mb-3">
            If you have any questions about the vendor onboarding process, please contact our support team.
          </p>
          <a
            href="mailto:vendor-support@scrapninja.com"
            className="text-blue-600 hover:text-blue-700 font-medium text-sm"
          >
            vendor-support@scrapninja.com
          </a>
        </motion.div>
      </div>
      </div>
    </>
  );
}

// Helper function to get fields for current step
function getStepFields(step: number): string[] {
  const stepFieldsMap: Record<number, string[]> = {
    1: [
      'businessVerification.companyName',
      'businessVerification.registrationNumber',
      'businessVerification.tradeLicenseNumber',
      'businessVerification.licenseExpiryDate',
      'businessVerification.businessAddress',
      'businessVerification.businessType',
      'businessVerification.tradeLicenseFile',
    ],
    2: ['tradingAuthorization.types'],
    3: [
      'kyc.passportFile',
      'kyc.incorporationFile',
      'kyc.moaFile',
      'kyc.signatoryName',
      'kyc.signatoryDesignation',
    ],
    4: ['ubo.beneficialOwners', 'ubo.structureFile', 'ubo.declarationFile'],
    5: ['taxCompliance.isVatRegistered'],
    6: [
      'banking.bankName',
      'banking.accountHolderName',
      'banking.iban',
      'banking.accountNumber',
      'banking.chequeFile',
      'banking.bankLetterFile',
    ],
    7: [
      'scrapSource.scrapSource',
      'scrapSource.scrapTypes',
      'scrapSource.scrapOrigin',
    ],
    8: [
      'environmental.permitFile',
      'environmental.wastePermitFile',
      'environmental.municipalityFile',
    ],
    9: [
      'operational.warehouseAddress',
      'operational.mapsLocation',
      'operational.facilityPhotos',
      'operational.primaryContactName',
      'operational.primaryContactNumber',
      'operational.companyEmail',
    ],
    10: [
      'vendorAgreement.antiFraud',
      'vendorAgreement.localLaws',
      'vendorAgreement.noStolenScrap',
      'vendorAgreement.disputeResolution',
      'vendorAgreement.commercialTerms',
    ],
  };

  return stepFieldsMap[step] || [];
}
