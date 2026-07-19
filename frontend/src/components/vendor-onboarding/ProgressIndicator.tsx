'use client';

import React from 'react';
import { Check } from 'lucide-react';

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  stepNames: string[];
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  currentStep,
  totalSteps,
  stepNames,
}) => {
  return (
    <div className="mb-8 bg-gradient-to-r from-emerald-900/30 to-slate-800/30 backdrop-blur-sm border border-emerald-500/30 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-emerald-100">
          📍 Step {currentStep} of {totalSteps}
        </h2>
        <span className="text-sm text-emerald-300">
          {Math.round((currentStep / totalSteps) * 100)}% Complete
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-emerald-900/30 rounded-full h-2 mb-6 border border-emerald-500/30">
        <div
          className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-2 rounded-full transition-all duration-300 shadow-lg shadow-emerald-500/50"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        />
      </div>

      {/* Step Indicators */}
      <div className="flex flex-col md:flex-row gap-2 md:gap-1 overflow-x-auto pb-2">
        {stepNames.map((name, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;

          return (
            <div key={stepNumber} className="flex items-center flex-shrink-0">
              <div
                className={`
                  flex items-center justify-center w-8 h-8 rounded-full font-semibold text-sm
                  transition-all duration-300
                  ${
                    isCompleted
                      ? 'bg-emerald-500 text-white'
                      : isActive
                      ? 'bg-emerald-500 text-white ring-4 ring-emerald-400/50'
                      : 'bg-emerald-900/50 text-emerald-300 border border-emerald-500/50'
                  }
                `}
              >
                {isCompleted ? <Check className="w-4 h-4" /> : stepNumber}
              </div>
              <div
                className={`
                  hidden md:block text-xs font-medium ml-2 whitespace-nowrap
                  ${isActive ? 'text-emerald-300' : 'text-emerald-200/60'}
                `}
              >
                {name}
              </div>
              {stepNumber < stepNames.length && (
                <div
                  className={`
                    hidden md:block flex-1 h-0.5 mx-2
                    ${isCompleted ? 'bg-emerald-500' : 'bg-emerald-900/50'}
                  `}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
