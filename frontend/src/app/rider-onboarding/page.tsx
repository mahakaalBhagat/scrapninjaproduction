'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ChevronLeft, Check, AlertCircle } from 'lucide-react';

const steps = [
  'Personal Info',
  'Vehicle Details',
  'Documents',
  'Bank Account',
  'Verification'
];

export default function RiderOnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [savingDraft, setSavingDraft] = useState(false);

  const [formData, setFormData] = useState({
    // Step 1: Personal Info
    fullName: '',
    email: '',
    phone: '',
    emiratesId: '',
    dateOfBirth: '',
    nationality: '',

    // Step 2: Vehicle Details
    vehicleType: '',
    vehicleRegistration: '',
    vehicleMake: '',
    vehicleModel: '',
    vehicleYear: '',
    licensePlate: '',

    // Step 3: Documents
    emiratesIdFile: null,
    drivingLicenseFile: null,
    vehicleRegistrationFile: null,
    insuranceFile: null,
    profilePhotoFile: null,

    // Step 4: Bank Account
    bankName: '',
    accountHolder: '',
    iban: '',
    accountNumber: '',

    // Step 5: Verification
    agreeTerms: false,
    agreePrivacy: false,
    agreeBackground: false
  });

  const handleInputChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileChange = (e: any) => {
    const { name } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: e.target.files?.[0] || null
    }));
  };

  const canProceedToNextStep = () => {
    switch (currentStep) {
      case 1:
        return formData.fullName && formData.email && formData.phone && formData.emiratesId && formData.dateOfBirth;
      case 2:
        return formData.vehicleType && formData.vehicleRegistration && formData.vehicleMake && formData.vehicleModel && formData.vehicleYear;
      case 3:
        return formData.emiratesIdFile && formData.drivingLicenseFile && formData.vehicleRegistrationFile && formData.insuranceFile && formData.profilePhotoFile;
      case 4:
        return formData.bankName && formData.accountHolder && formData.iban && formData.accountNumber;
      case 5:
        return formData.agreeTerms && formData.agreePrivacy && formData.agreeBackground;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (canProceedToNextStep() && currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      
      // Add all form fields
      Object.entries(formData).forEach(([key, value]) => {
        if (key.endsWith('File') && value && typeof value === 'object' && 'size' in value) {
          formDataToSend.append(key, value as Blob);
        } else if (typeof value === 'boolean') {
          formDataToSend.append(key, String(value));
        } else if (value !== null) {
          formDataToSend.append(key, String(value));
        }
      });

      const response = await fetch('/api/rider-onboarding', {
        method: 'POST',
        body: formDataToSend
      });

      if (response.ok) {
        setSuccessMessage('Rider onboarding completed successfully! Our team will review your application within 24 hours.');
        setTimeout(() => {
          router.push('/');
        }, 3000);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 py-8 px-4">
      <div className="container-responsive max-w-2xl">
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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2">Become a Scrap Collection Partner</h1>
          <p className="text-white/70">Join our network of riders and earn money collecting scrap</p>
        </motion.div>

        {/* Progress Indicator */}
        <div className="mb-8 bg-gradient-to-r from-emerald-900/30 to-slate-800/30 backdrop-blur-sm border border-emerald-500/30 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div key={step} className="flex flex-col items-center flex-1">
                <motion.div
                  initial={false}
                  animate={{
                    backgroundColor: index + 1 <= currentStep ? '#10b981' : '#1f2937',
                    scale: index + 1 === currentStep ? 1.1 : 1
                  }}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold mb-2"
                >
                  {index + 1 < currentStep ? <Check size={20} /> : index + 1}
                </motion.div>
                <p className="text-xs text-emerald-200 text-center">{step}</p>
                {index < steps.length - 1 && (
                  <div
                    className={`h-1 w-full mt-4 rounded ${
                      index + 1 < currentStep ? 'bg-emerald-500' : 'bg-emerald-500/20'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="text-center text-sm text-emerald-300">
            Step {currentStep} of {steps.length}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Step 1: Personal Info */}
          {currentStep === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gradient-to-br from-emerald-950/40 to-slate-800/40 backdrop-blur-sm border border-emerald-500/30 rounded-xl p-6 space-y-4"
            >
              <h2 className="text-lg font-semibold text-emerald-100">👤 Personal Information</h2>
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 bg-emerald-950/50 border border-emerald-500/50 rounded-lg text-white placeholder:text-emerald-300/50 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/30 transition-all"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 bg-emerald-950/50 border border-emerald-500/50 rounded-lg text-white placeholder:text-emerald-300/50 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/30 transition-all"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 bg-emerald-950/50 border border-emerald-500/50 rounded-lg text-white placeholder:text-emerald-300/50 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/30 transition-all"
              />
              <input
                type="text"
                name="emiratesId"
                placeholder="Emirates ID"
                value={formData.emiratesId}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 bg-emerald-950/50 border border-emerald-500/50 rounded-lg text-white placeholder:text-emerald-300/50 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/30 transition-all"
              />
              <input
                type="date"
                name="dateOfBirth"
                placeholder="Date of Birth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 bg-emerald-950/50 border border-emerald-500/50 rounded-lg text-white placeholder:text-emerald-300/50 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/30 transition-all"
              />
              <input
                type="text"
                name="nationality"
                placeholder="Nationality"
                value={formData.nationality}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-emerald-950/50 border border-emerald-500/50 rounded-lg text-white placeholder:text-emerald-300/50 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/30 transition-all"
              />
            </motion.div>
          )}

          {/* Step 2: Vehicle Details */}
          {currentStep === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gradient-to-br from-emerald-950/40 to-slate-800/40 backdrop-blur-sm border border-emerald-500/30 rounded-xl p-6 space-y-4"
            >
              <h2 className="text-lg font-semibold text-emerald-100">🚗 Vehicle Details</h2>
              <select
                name="vehicleType"
                value={formData.vehicleType}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 bg-emerald-950/50 border border-emerald-500/50 rounded-lg text-white focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/30 transition-all"
              >
                <option value="" className="bg-slate-800">Select Vehicle Type</option>
                <option value="Motorcycle" className="bg-slate-800">Motorcycle</option>
                <option value="Pickup Truck" className="bg-slate-800">Pickup Truck</option>
                <option value="Van" className="bg-slate-800">Van</option>
                <option value="Truck" className="bg-slate-800">Truck</option>
              </select>
              <input
                type="text"
                name="vehicleRegistration"
                placeholder="Vehicle Registration Number"
                value={formData.vehicleRegistration}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 bg-emerald-950/50 border border-emerald-500/50 rounded-lg text-white placeholder:text-emerald-300/50 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/30 transition-all"
              />
              <input
                type="text"
                name="vehicleMake"
                placeholder="Vehicle Make"
                value={formData.vehicleMake}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 bg-emerald-950/50 border border-emerald-500/50 rounded-lg text-white placeholder:text-emerald-300/50 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/30 transition-all"
              />
              <input
                type="text"
                name="vehicleModel"
                placeholder="Vehicle Model"
                value={formData.vehicleModel}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 bg-emerald-950/50 border border-emerald-500/50 rounded-lg text-white placeholder:text-emerald-300/50 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/30 transition-all"
              />
              <input
                type="number"
                name="vehicleYear"
                placeholder="Vehicle Year"
                value={formData.vehicleYear}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 bg-emerald-950/50 border border-emerald-500/50 rounded-lg text-white placeholder:text-emerald-300/50 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/30 transition-all"
              />
              <input
                type="text"
                name="licensePlate"
                placeholder="License Plate"
                value={formData.licensePlate}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-emerald-950/50 border border-emerald-500/50 rounded-lg text-white placeholder:text-emerald-300/50 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/30 transition-all"
              />
            </motion.div>
          )}

          {/* Step 3: Documents */}
          {currentStep === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gradient-to-br from-emerald-950/40 to-slate-800/40 backdrop-blur-sm border border-emerald-500/30 rounded-xl p-6 space-y-4"
            >
              <h2 className="text-lg font-semibold text-emerald-100">📄 Upload Documents</h2>
              
              <div>
                <label className="block text-emerald-200 text-sm mb-2">Emirates ID Copy *</label>
                <input
                  type="file"
                  name="emiratesIdFile"
                  accept="image/*,.pdf"
                  onChange={handleFileChange}
                  required
                  className="w-full px-4 py-2 bg-emerald-950/50 border border-emerald-500/50 rounded-lg text-emerald-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-emerald-600 file:text-white file:font-semibold file:cursor-pointer hover:file:bg-emerald-700 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/30 transition-all"
                />
                {formData.emiratesIdFile && <p className="text-emerald-300 text-sm mt-1">✓ {(formData.emiratesIdFile as any).name}</p>}
              </div>

              <div>
                <label className="block text-emerald-200 text-sm mb-2">Driving License Copy *</label>
                <input
                  type="file"
                  name="drivingLicenseFile"
                  accept="image/*,.pdf"
                  onChange={handleFileChange}
                  required
                  className="w-full px-4 py-2 bg-emerald-950/50 border border-emerald-500/50 rounded-lg text-emerald-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-emerald-600 file:text-white file:font-semibold file:cursor-pointer hover:file:bg-emerald-700 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/30 transition-all"
                />
                {formData.drivingLicenseFile && <p className="text-emerald-300 text-sm mt-1">✓ {(formData.drivingLicenseFile as any).name}</p>}
              </div>

              <div>
                <label className="block text-emerald-200 text-sm mb-2">Vehicle Registration Copy *</label>
                <input
                  type="file"
                  name="vehicleRegistrationFile"
                  accept="image/*,.pdf"
                  onChange={handleFileChange}
                  required
                  className="w-full px-4 py-2 bg-emerald-950/50 border border-emerald-500/50 rounded-lg text-emerald-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-emerald-600 file:text-white file:font-semibold file:cursor-pointer hover:file:bg-emerald-700 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/30 transition-all"
                />
                {formData.vehicleRegistrationFile && <p className="text-emerald-300 text-sm mt-1">✓ {(formData.vehicleRegistrationFile as any).name}</p>}
              </div>

              <div>
                <label className="block text-emerald-200 text-sm mb-2">Vehicle Insurance Copy *</label>
                <input
                  type="file"
                  name="insuranceFile"
                  accept="image/*,.pdf"
                  onChange={handleFileChange}
                  required
                  className="w-full px-4 py-2 bg-emerald-950/50 border border-emerald-500/50 rounded-lg text-emerald-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-emerald-600 file:text-white file:font-semibold file:cursor-pointer hover:file:bg-emerald-700 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/30 transition-all"
                />
                {formData.insuranceFile && <p className="text-emerald-300 text-sm mt-1">✓ {(formData.insuranceFile as any).name}</p>}
              </div>

              <div>
                <label className="block text-emerald-200 text-sm mb-2">Profile Photo *</label>
                <input
                  type="file"
                  name="profilePhotoFile"
                  accept="image/*"
                  onChange={handleFileChange}
                  required
                  className="w-full px-4 py-2 bg-emerald-950/50 border border-emerald-500/50 rounded-lg text-emerald-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-emerald-600 file:text-white file:font-semibold file:cursor-pointer hover:file:bg-emerald-700 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/30 transition-all"
                />
                {formData.profilePhotoFile && <p className="text-emerald-300 text-sm mt-1">✓ {(formData.profilePhotoFile as any).name}</p>}
              </div>
            </motion.div>
          )}

          {/* Step 4: Bank Account */}
          {currentStep === 4 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gradient-to-br from-emerald-950/40 to-slate-800/40 backdrop-blur-sm border border-emerald-500/30 rounded-xl p-6 space-y-4"
            >
              <h2 className="text-lg font-semibold text-emerald-100">🏦 Bank Account Details</h2>
              <input
                type="text"
                name="bankName"
                placeholder="Bank Name"
                value={formData.bankName}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 bg-emerald-950/50 border border-emerald-500/50 rounded-lg text-white placeholder:text-emerald-300/50 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/30 transition-all"
              />
              <input
                type="text"
                name="accountHolder"
                placeholder="Account Holder Name"
                value={formData.accountHolder}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 bg-emerald-950/50 border border-emerald-500/50 rounded-lg text-white placeholder:text-emerald-300/50 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/30 transition-all"
              />
              <input
                type="text"
                name="iban"
                placeholder="IBAN (e.g., AE070331234567890123456)"
                value={formData.iban}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 bg-emerald-950/50 border border-emerald-500/50 rounded-lg text-white placeholder:text-emerald-300/50 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/30 transition-all"
              />
              <input
                type="text"
                name="accountNumber"
                placeholder="Account Number"
                value={formData.accountNumber}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 bg-emerald-950/50 border border-emerald-500/50 rounded-lg text-white placeholder:text-emerald-300/50 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/30 transition-all"
              />
            </motion.div>
          )}

          {/* Step 5: Verification */}
          {currentStep === 5 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gradient-to-br from-emerald-950/40 to-slate-800/40 backdrop-blur-sm border border-emerald-500/30 rounded-xl p-6 space-y-4"
            >
              <h2 className="text-lg font-semibold text-emerald-100">✅ Agreements & Verification</h2>
              
              <label className="flex items-start gap-3 cursor-pointer hover:bg-emerald-950/30 p-3 rounded-lg transition-colors">
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleInputChange}
                  className="mt-1 accent-emerald-500"
                />
                <span className="text-emerald-200 text-sm">I agree to the Terms and Conditions</span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer hover:bg-emerald-950/30 p-3 rounded-lg transition-colors">
                <input
                  type="checkbox"
                  name="agreePrivacy"
                  checked={formData.agreePrivacy}
                  onChange={handleInputChange}
                  className="mt-1 accent-emerald-500"
                />
                <span className="text-emerald-200 text-sm">I agree to the Privacy Policy</span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer hover:bg-emerald-950/30 p-3 rounded-lg transition-colors">
                <input
                  type="checkbox"
                  name="agreeBackground"
                  checked={formData.agreeBackground}
                  onChange={handleInputChange}
                  className="mt-1 accent-emerald-500"
                />
                <span className="text-emerald-200 text-sm">I authorize a background check</span>
              </label>

              <div className="bg-emerald-950/60 border border-emerald-500/50 rounded-lg p-4 mt-4">
                <p className="text-emerald-200 text-sm">
                  ⏱️ Your application will be reviewed within 24 hours. You'll receive an email confirmation once approved.
                </p>
              </div>
            </motion.div>
          )}

          {/* Success Message */}
          {successMessage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-emerald-950/50 border border-emerald-500/50 rounded-lg p-4 text-emerald-200"
            >
              ✅ {successMessage}
            </motion.div>
          )}

          {/* Navigation Buttons */}
          <div className="flex gap-4 pt-4">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={handleBack}
                className="flex-1 px-6 py-3 bg-emerald-950/50 border border-emerald-500/50 text-emerald-200 font-semibold rounded-xl hover:bg-emerald-950/70 transition-all"
              >
                ← Back
              </button>
            )}
            {currentStep < steps.length && (
              <button
                type="button"
                onClick={handleNext}
                disabled={!canProceedToNextStep()}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold rounded-xl hover:from-emerald-600 hover:to-emerald-700 transition-all shadow-lg hover:shadow-emerald-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next →
              </button>
            )}
            {currentStep === steps.length && (
              <button
                type="submit"
                disabled={isSubmitting || !canProceedToNextStep()}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold rounded-xl hover:from-emerald-600 hover:to-emerald-700 transition-all shadow-lg hover:shadow-emerald-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? '⏳ Submitting...' : '✓ Complete Registration'}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
