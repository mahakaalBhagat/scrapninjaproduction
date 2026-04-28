'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Zap,
  CheckCircle,
  MapPin,
  CreditCard,
  FileCheck,
} from 'lucide-react';
import { AuthModal } from './AuthModal';
import { useAuthContext } from '@/hooks';
import { animations, viewportConfig, staggerChild, buttonAnimation, cardHover } from '@/utils/animations';

export const SolutionSection = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { login, register, isLoading, error } = useAuthContext();
  
  const solutions = [
    {
      icon: Zap,
      title: 'Instant Price Estimates',
      description: 'Get real-time pricing based on scrap type and market rates.',
    },
    {
      icon: CheckCircle,
      title: 'Verified Pickup Partners',
      description:
        'Carefully vetted scrap collectors with excellent ratings and reviews.',
    },
    {
      icon: MapPin,
      title: 'Real-Time Tracking',
      description: 'GPS tracking of your collection from pickup to final destination.',
    },
    {
      icon: CreditCard,
      title: 'Instant Payment',
      description: 'Fast, secure payments directly to your account on collection day.',
    },
    {
      icon: FileCheck,
      title: 'Scrap Disposal Reports',
      description: 'Digital ESG-compliant waste documentation for your records.',
    },
  ];

  return (
    <section id="solution" className="py-16 md:py-24 gradient-hero">
      <div className="container-responsive">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={animations.fadeUp}
        >
          <h2 className="heading-1 mb-4">Our Solution</h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            ScrapNinja provides an integrated platform that transforms scrap
            collection into a seamless, transparent, and profitable experience.
          </p>
        </motion.div>

        {/* Solutions Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={animations.staggerContainer}
        >
          {solutions.map((solution, index) => {
            const IconComponent = solution.icon;
            return (
              <motion.div
                key={index}
                className="card group hover:shadow-lg hover:border-primary-300 border border-transparent"
                variants={staggerChild}
                {...cardHover}
              >
                <div className="mb-4">
                  <motion.div 
                    className="inline-flex items-center justify-center h-14 w-14 rounded-lg bg-gradient-to-br from-primary-100 to-secondary-100"
                    whileHover={{ scale: 1.1 }}
                  >
                    <IconComponent className="h-7 w-7 text-primary-600" />
                  </motion.div>
                </div>
                <h3 className="heading-4 mb-3">{solution.title}</h3>
                <p className="text-neutral-600 leading-relaxed">
                  {solution.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Additional Benefits */}
        <motion.div 
          className="mt-16 bg-white rounded-lg shadow-soft p-8 md:p-12"
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={animations.fadeUp}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div variants={staggerChild}>
              <h3 className="heading-3 mb-4">Why Choose ScrapNinja?</h3>
              <ul className="space-y-3">
                {[
                  'Zero commission on first pickup',
                  '24/7 customer support',
                  'Environmental compliance',
                  'Business-friendly APIs',
                ].map((item, i) => (
                  <motion.li 
                    key={i} 
                    className="flex items-center gap-3"
                    variants={staggerChild}
                  >
                    <CheckCircle className="h-5 w-5 text-primary-600 flex-shrink-0" />
                    <span className="text-neutral-700">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            <motion.div variants={staggerChild}>
              <h3 className="heading-3 mb-4">For Businesses</h3>
              <ul className="space-y-3">
                {[
                  'Bulk collection discounts',
                  'Dedicated account managers',
                  'Automated reporting',
                  'Volume-based pricing',
                ].map((item, i) => (
                  <motion.li 
                    key={i} 
                    className="flex items-center gap-3"
                    variants={staggerChild}
                  >
                    <CheckCircle className="h-5 w-5 text-primary-600 flex-shrink-0" />
                    <span className="text-neutral-700">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div 
          className="mt-16 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={animations.fadeUp}
        >
          <motion.button
            onClick={() => setShowAuthModal(true)}
            className="btn-primary px-8 py-3 text-lg"
            {...buttonAnimation}
          >
            Launching soon
          </motion.button>
          <p className="text-neutral-600 text-sm mt-4">
            Join thousands of satisfied customers transforming their scrap collection
          </p>
        </motion.div>
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onLogin={login}
        onRegister={register}
        isLoading={isLoading}
        error={error}
      />
    </section>
  );
};
