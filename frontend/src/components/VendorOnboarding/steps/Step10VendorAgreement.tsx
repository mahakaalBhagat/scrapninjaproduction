'use client';

import React, { useState } from 'react';
import { FileText, CheckCircle } from 'lucide-react';

interface Step10Props {
  data: any;
  onChange: (data: any) => void;
  onboardingId: number | null;
}

const Step10VendorAgreement: React.FC<Step10Props> = ({ data, onChange, onboardingId }) => {
  const [localData, setLocalData] = useState(data?.vendorAgreement || {});
  const [agreed, setAgreed] = useState(localData.agreedToTerms || false);

  const handleAgreed = (value: boolean) => {
    setAgreed(value);
    const updated = { ...localData, agreedToTerms: value };
    setLocalData(updated);
    onChange({ vendorAgreement: updated });
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-emerald-950/40 to-slate-900/40 border border-emerald-500/30 rounded-xl p-6">
        <div className="flex gap-3 mb-4">
          <FileText className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <div>
            <h3 className="text-lg font-semibold text-white mb-1">Vendor Agreement</h3>
            <p className="text-sm text-slate-300">Review and accept the terms and conditions</p>
          </div>
        </div>
      </div>

      {/* Terms and Conditions */}
      <div className="bg-slate-800/40 border border-slate-700/30 rounded-xl p-6 space-y-4">
        <h4 className="font-semibold text-white">Terms and Conditions</h4>
        
        <div className="space-y-3 max-h-96 overflow-y-auto text-sm text-slate-300">
          <div>
            <h5 className="font-semibold text-white mb-2">1. Service Agreement</h5>
            <p>You agree to provide scrap collection and delivery services according to ScrapNinja's standards and specifications.</p>
          </div>

          <div>
            <h5 className="font-semibold text-white mb-2">2. Quality Standards</h5>
            <p>All scrap items must meet quality and cleanliness standards. ScrapNinja reserves the right to reject substandard materials.</p>
          </div>

          <div>
            <h5 className="font-semibold text-white mb-2">3. Pricing and Payment</h5>
            <p>Prices are determined based on current market rates. Payments will be processed according to the payment schedule agreed upon.</p>
          </div>

          <div>
            <h5 className="font-semibold text-white mb-2">4. Data and Privacy</h5>
            <p>Your data will be protected in accordance with applicable privacy laws. ScrapNinja will not share your information with third parties without consent.</p>
          </div>

          <div>
            <h5 className="font-semibold text-white mb-2">5. Compliance</h5>
            <p>You agree to comply with all applicable laws, regulations, and environmental standards in your operations.</p>
          </div>

          <div>
            <h5 className="font-semibold text-white mb-2">6. Confidentiality</h5>
            <p>Both parties agree to maintain confidentiality of sensitive business information and trade secrets.</p>
          </div>

          <div>
            <h5 className="font-semibold text-white mb-2">7. Term and Termination</h5>
            <p>This agreement is effective upon acceptance and continues until terminated by either party with written notice.</p>
          </div>

          <div>
            <h5 className="font-semibold text-white mb-2">8. Liability Limitation</h5>
            <p>Neither party shall be liable for indirect, incidental, or consequential damages arising from this agreement.</p>
          </div>
        </div>
      </div>

      {/* Agreement Checkbox */}
      <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-xl p-4">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => handleAgreed(e.target.checked)}
            className="mt-1 w-5 h-5 text-emerald-500 rounded focus:ring-2 focus:ring-emerald-500"
          />
          <span className="text-sm text-slate-300">
            I have read and agree to the ScrapNinja Vendor Terms and Conditions as outlined above.
          </span>
        </label>
      </div>

      {/* Submission Note */}
      <div className="bg-slate-800/40 border border-slate-700/30 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-slate-300 font-semibold mb-1">Ready to Submit?</p>
            <p className="text-xs text-slate-400">
              After accepting these terms, your onboarding application will be submitted for review. Our team will verify all information and contact you within 2-3 business days.
            </p>
          </div>
        </div>
      </div>

      {/* Additional Notes */}
      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-2">
          Additional Notes (Optional)
        </label>
        <textarea
          value={localData.additionalNotes || ''}
          onChange={(e) => {
            const updated = { ...localData, additionalNotes: e.target.value };
            setLocalData(updated);
            onChange({ vendorAgreement: updated });
          }}
          placeholder="Any additional information you'd like to share with us"
          className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          rows={4}
        />
      </div>
    </div>
  );
};

export default Step10VendorAgreement;
