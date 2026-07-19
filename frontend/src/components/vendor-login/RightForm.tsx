'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ScrapNinjaLogo } from './ScrapNinjaLogo';
import { LoginForm } from './LoginForm';
import { FooterLinks } from './FooterLinks';

interface RightFormProps {
  onSuccess?: (token: string) => void;
  onError?: (error: string) => void;
}

export const RightForm: React.FC<RightFormProps> = ({ onSuccess, onError }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.div
      className="w-full lg:w-3/5 bg-white p-8 md:p-12 flex flex-col justify-between min-h-screen lg:min-h-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <div className="space-y-8">
        {/* Logo */}
        <motion.div variants={itemVariants}>
          <ScrapNinjaLogo size="medium" animated />
        </motion.div>

        {/* Form Section */}
        <motion.div variants={itemVariants} className="space-y-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold text-neutral-900 mb-2">
              Welcome Back
            </h2>
            <p className="text-neutral-600 text-sm md:text-base">
              Sign in to your vendor account to manage your waste collection.
            </p>
          </div>

          {/* Form */}
          <LoginForm onSuccess={onSuccess} onError={onError} />
        </motion.div>
      </div>

      {/* Footer */}
      <motion.div variants={itemVariants}>
        <FooterLinks />
      </motion.div>
    </motion.div>
  );
};
