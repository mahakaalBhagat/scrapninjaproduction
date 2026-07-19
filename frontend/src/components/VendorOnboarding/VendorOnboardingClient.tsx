'use client';

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Check, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Step1BusinessVerification from './steps/Step1BusinessVerification';
import Step2ScrapTrading from './steps/Step2ScrapTrading';
import Step3CompanyKYC from './steps/Step3CompanyKYC';
import Step4UBODeclaration from './steps/Step4UBODeclaration';
import Step5TaxCompliance from './steps/Step5TaxCompliance';
import Step6BankingVerification from './steps/Step6BankingVerification';
import Step7ScrapSourceDeclaration from './steps/Step7ScrapSourceDeclaration';
import Step8EnvironmentalCompliance from './steps/Step8EnvironmentalCompliance';
import Step9OperationalVerification from './steps/Step9OperationalVerification';
import Step10VendorAgreement from './steps/Step10VendorAgreement';
import ApprovalChecklist from './ApprovalChecklist';
import { apiClient } from '@/services/api';

const STEPS = [
  { id: 1, name: 'Business Verification', description: 'Company & License Details' },
  { id: 2, name: 'Scrap Trading Auth', description: 'Trading Activities' },
  { id: 3, name: 'Company KYC/KYB', description: 'Director & Documents' },
  { id: 4, name: 'UBO Declaration', description: 'Beneficial Owners' },
  { id: 5, name: 'Tax Compliance', description: 'VAT & TRN Info' },
  { id: 6, name: 'Banking', description: 'Bank Account Details' },
  { id: 7, name: 'Scrap Source', description: 'Source Declaration' },
  { id: 8, name: 'Environmental', description: 'Permits & Compliance' },
  { id: 9, name: 'Operations', description: 'Facility Details' },
  { id: 10, name: 'Agreement', description: 'Sign Terms' },
];

const VendorOnboardingClient = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<any>({});
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [onboardingId, setOnboardingId] = useState<number | null>(null);
  const [status, setStatus] = useState('DRAFT');

  // Load existing onboarding data on mount
  useEffect(() => {
    const loadOnboardingData = async () => {
      try {
        const response = await apiClient.get('/vendor-onboarding/my-onboarding');
        if (response.data) {
          setFormData(response.data);
          setOnboardingId(response.data.id);
          setCurrentStep(response.data.currentStep || 1);
          setStatus(response.data.status);
        }
      } catch (err: any) {
        // If no existing onboarding, create a new one
        if (err.response?.status === 404) {
          createNewOnboarding();
        }
      }
    };
    loadOnboardingData();
  }, []);

  const createNewOnboarding = async () => {
    try {
      const response = await apiClient.post('/vendor-onboarding/create', {});
      setOnboardingId(response.data.id);
      setFormData(response.data);
    } catch (err) {
      setError('Failed to create onboarding application');
    }
  };

  const handleStepChange = (data: any) => {
    setFormData((prev: any) => ({ ...prev, ...data }));
  };

  const handleSaveProgress = async () => {
    if (!onboardingId) return;
    
    setIsSaving(true);
    setError('');
    try {
      await apiClient.put(`/vendor-onboarding/${onboardingId}/save-step`, {
        step: currentStep,
        data: formData,
      });
      setSuccessMessage('Progress saved successfully');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to save progress');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSubmitOnboarding = async () => {
    if (!onboardingId) return;
    
    setIsSaving(true);
    setError('');
    try {
      await apiClient.post(`/vendor-onboarding/${onboardingId}/submit`, formData);
      setStatus('PENDING_REVIEW');
      setSuccessMessage('Application submitted successfully! Your request is under review.');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to submit application');
    } finally {
      setIsSaving(false);
    }
  };

  const renderStepComponent = () => {
    switch (currentStep) {
      case 1:
        return <Step1BusinessVerification data={formData} onChange={handleStepChange} onboardingId={onboardingId} />;
      case 2:
        return <Step2ScrapTrading data={formData} onChange={handleStepChange} onboardingId={onboardingId} />;
      case 3:
        return <Step3CompanyKYC data={formData} onChange={handleStepChange} onboardingId={onboardingId} />;
      case 4:
        return <Step4UBODeclaration data={formData} onChange={handleStepChange} onboardingId={onboardingId} />;
      case 5:
        return <Step5TaxCompliance data={formData} onChange={handleStepChange} onboardingId={onboardingId} />;
      case 6:
        return <Step6BankingVerification data={formData} onChange={handleStepChange} onboardingId={onboardingId} />;
      case 7:
        return <Step7ScrapSourceDeclaration data={formData} onChange={handleStepChange} onboardingId={onboardingId} />;
      case 8:
        return <Step8EnvironmentalCompliance data={formData} onChange={handleStepChange} onboardingId={onboardingId} />;
      case 9:
        return <Step9OperationalVerification data={formData} onChange={handleStepChange} onboardingId={onboardingId} />;
      case 10:
        return <Step10VendorAgreement data={formData} onChange={handleStepChange} onboardingId={onboardingId} />;
      default:
        return null;
    }
  };

  if (status !== 'DRAFT') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-20">
        <div className="container mx-auto px-4 py-12 max-w-2xl">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center justify-center mb-6">
              <Check className="w-16 h-16 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-center mb-4">Application Submitted</h1>
            <p className="text-center text-gray-600 mb-6">
              Your vendor onboarding application has been submitted for review. 
              You will receive updates via email at each stage of the verification process.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
              <p className="text-blue-700">
                <strong>Status:</strong> {status.replace(/_/g, ' ')}
              </p>
            </div>
            <ApprovalChecklist data={formData} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-20 pb-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Scrap Vendor Onboarding</h1>
          <p className="text-gray-300">Complete your vendor profile in {STEPS.length} easy steps</p>
        </div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 bg-red-50 border-l-4 border-red-400 p-4 rounded"
          >
            <div className="flex items-start">
              <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5" />
              <p className="text-red-700">{error}</p>
            </div>
          </motion.div>
        )}

        {/* Success Message */}
        {successMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 bg-green-50 border-l-4 border-green-400 p-4 rounded"
          >
            <p className="text-green-700">{successMessage}</p>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Stepper */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
              <h3 className="font-bold text-gray-900 mb-4">Progress</h3>
              <div className="space-y-2">
                {STEPS.map((step, index) => (
                  <div
                    key={step.id}
                    onClick={() => setCurrentStep(step.id)}
                    className={`p-3 rounded-lg cursor-pointer transition-all ${
                      currentStep === step.id
                        ? 'bg-blue-100 border-2 border-blue-600'
                        : 'bg-gray-100 border-2 border-gray-200 hover:border-blue-400'
                    }`}
                  >
                    <div className="flex items-center">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 text-sm font-bold ${
                          currentStep === step.id
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-300 text-gray-700'
                        }`}
                      >
                        {step.id}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-900">{step.name}</p>
                        <p className="text-xs text-gray-600">{step.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Form Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-lg p-8">
              {/* Step Header */}
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Step {currentStep}: {STEPS[currentStep - 1].name}
                </h2>
                <p className="text-gray-600">{STEPS[currentStep - 1].description}</p>
              </div>

              {/* Step Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  {renderStepComponent()}
                </motion.div>
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="mt-8 flex justify-between items-center border-t pt-6">
                <button
                  onClick={() => currentStep > 1 && setCurrentStep(currentStep - 1)}
                  disabled={currentStep === 1}
                  className="flex items-center gap-2 px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-5 h-5" />
                  Previous
                </button>

                <div className="flex gap-3">
                  <button
                    onClick={handleSaveProgress}
                    disabled={isSaving}
                    className="px-6 py-2 bg-gray-300 text-gray-900 rounded-lg hover:bg-gray-400 disabled:opacity-50"
                  >
                    {isSaving ? 'Saving...' : 'Save Progress'}
                  </button>

                  {currentStep === STEPS.length ? (
                    <button
                      onClick={handleSubmitOnboarding}
                      disabled={isSaving}
                      className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
                    >
                      Submit Application
                    </button>
                  ) : (
                    <button
                      onClick={() => currentStep < STEPS.length && setCurrentStep(currentStep + 1)}
                      disabled={currentStep === STEPS.length}
                      className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Approval Checklist */}
            <div className="mt-8">
              <ApprovalChecklist data={formData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorOnboardingClient;
