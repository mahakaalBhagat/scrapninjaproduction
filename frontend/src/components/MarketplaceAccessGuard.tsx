'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Lock, ArrowLeft, Clock, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuthContext } from '@/hooks';

interface MarketplaceAccessGuardProps {
  children: React.ReactNode;
  requiredAccess: 'MARKETPLACE' | 'CART';
}

export const MarketplaceAccessGuard: React.FC<MarketplaceAccessGuardProps> = ({ children, requiredAccess }) => {
  const router = useRouter();
  const { user, hasMarketplaceAccess, isAuthenticated } = useAuthContext();

  // If not authenticated, show login prompt
  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-emerald-950 via-slate-900 to-emerald-950 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={() => router.back()}
            className="mb-6 flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            <ArrowLeft size={20} />
            Back
          </button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-2xl p-8 text-center"
          >
            <div className="mb-6 flex justify-center">
              <div className="p-4 bg-blue-500/20 rounded-full">
                <Lock className="text-blue-400" size={32} />
              </div>
            </div>

            <h1 className="text-3xl font-bold text-white mb-4">Sign In Required</h1>
            <p className="text-slate-300 mb-8">
              You need to sign in to access the marketplace and cart.
            </p>

            <button
              onClick={() => router.push('/')}
              className="w-full px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-semibold rounded-lg hover:from-emerald-500 hover:to-emerald-400 transition-all"
            >
              Return Home & Sign In
            </button>
          </motion.div>
        </div>
      </main>
    );
  }

  // If authenticated but payment not approved
  if (!hasMarketplaceAccess) {
    const isPending = user?.paymentStatus === 'PENDING';
    const isInactive = user?.accountStatus === 'INACTIVE';
    const isRejected = user?.paymentStatus === 'REJECTED';

    return (
      <main className="min-h-screen bg-gradient-to-br from-emerald-950 via-slate-900 to-emerald-950 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={() => router.back()}
            className="mb-6 flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            <ArrowLeft size={20} />
            Back
          </button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Main Alert Card */}
            <div className="bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/50 rounded-2xl p-8">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-amber-500/30 rounded-lg flex-shrink-0">
                  <AlertCircle className="text-amber-300" size={28} />
                </div>
                <div className="flex-1">
                  <h1 className="text-2xl font-bold text-white mb-2">
                    {requiredAccess} Access Disabled
                  </h1>
                  <p className="text-amber-100">
                    Marketplace access will be enabled after your account/payment is approved.
                  </p>
                </div>
              </div>
            </div>

            {/* Status Details */}
            <div className="grid gap-4 md:grid-cols-2">
              {/* Payment Status */}
              <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  {user?.paymentStatus === 'APPROVED' ? (
                    <CheckCircle className="text-emerald-400" size={24} />
                  ) : (
                    <Clock className="text-amber-400" size={24} />
                  )}
                  <h3 className="font-semibold text-white">Payment Status</h3>
                </div>
                <p className="text-sm text-slate-300 mb-2">Current Status:</p>
                <p className={`text-lg font-bold ${
                  user?.paymentStatus === 'APPROVED' 
                    ? 'text-emerald-400' 
                    : 'text-amber-400'
                }`}>
                  {user?.paymentStatus || 'PENDING'}
                </p>
                {isPending && (
                  <p className="text-xs text-slate-400 mt-3">
                    ⏳ Your payment is being reviewed. This usually takes 1-2 business days.
                  </p>
                )}
                {isRejected && (
                  <p className="text-xs text-red-400 mt-3">
                    ❌ Your payment was rejected. Please contact support.
                  </p>
                )}
              </div>

              {/* Account Status */}
              <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  {user?.accountStatus === 'ACTIVE' ? (
                    <CheckCircle className="text-emerald-400" size={24} />
                  ) : (
                    <AlertCircle className="text-red-400" size={24} />
                  )}
                  <h3 className="font-semibold text-white">Account Status</h3>
                </div>
                <p className="text-sm text-slate-300 mb-2">Current Status:</p>
                <p className={`text-lg font-bold ${
                  user?.accountStatus === 'ACTIVE' 
                    ? 'text-emerald-400' 
                    : 'text-red-400'
                }`}>
                  {user?.accountStatus || 'ACTIVE'}
                </p>
                {isInactive && (
                  <p className="text-xs text-slate-400 mt-3">
                    Your account is currently inactive. Please contact support to reactivate.
                  </p>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={() => router.push('/')}
                className="flex-1 px-6 py-3 bg-slate-700/50 hover:bg-slate-600/50 text-white font-semibold rounded-lg transition-all border border-slate-600/50"
              >
                Return Home
              </button>
              <button
                onClick={() => router.push('/profile')}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-semibold rounded-lg transition-all"
              >
                View Account Details
              </button>
            </div>

            {/* Help Section */}
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6">
              <h3 className="font-semibold text-white mb-2">Need Help?</h3>
              <p className="text-sm text-slate-300 mb-4">
                If you believe this is an error, or your payment was approved but you still see this message, 
                please contact our support team.
              </p>
              <a
                href="mailto:support@scrapninja.ae"
                className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-semibold text-sm"
              >
                📧 Contact Support
              </a>
            </div>
          </motion.div>
        </div>
      </main>
    );
  }

  // User has access, render children
  return <>{children}</>;
};
