'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { RobotIllustration } from './RobotIllustration';
import { BadgesRow } from './BadgesRow';
import { VENDOR_LOGIN_CONSTANTS } from '@/constants/vendor-login';

export const LeftHero: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <motion.div
      className="hidden lg:flex w-2/5 bg-gradient-to-br from-[#006D38] to-[#138A36] p-8 flex-col justify-between items-start relative overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-white/20" />
        <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-white/10" />
      </div>

      <div className="relative z-10 flex flex-col items-start w-full">
        {/* Glassmorphism Card */}
        <motion.div
          variants={itemVariants}
          className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 w-full"
        >
          {/* Robot Illustration */}
          <div className="flex justify-center mb-6">
            <RobotIllustration animated />
          </div>

          {/* Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold text-white text-center mb-4 leading-tight"
          >
            {VENDOR_LOGIN_CONSTANTS.content.heading}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-base md:text-lg text-white/80 text-center mb-6 leading-relaxed"
          >
            {VENDOR_LOGIN_CONSTANTS.content.subtitle}
          </motion.p>
        </motion.div>
      </div>

      {/* Badges */}
      <motion.div variants={itemVariants} className="relative z-10 w-full">
        <BadgesRow badges={VENDOR_LOGIN_CONSTANTS.content.badges} animated />
      </motion.div>
    </motion.div>
  );
};
