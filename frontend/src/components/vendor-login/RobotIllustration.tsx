'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface RobotIllustrationProps {
  animated?: boolean;
}

export const RobotIllustration: React.FC<RobotIllustrationProps> = ({ animated = true }) => {
  return (
    <motion.div
      initial={animated ? { opacity: 0, scale: 0.9 } : {}}
      animate={animated ? { opacity: 1, scale: 1 } : {}}
      transition={animated ? { delay: 0.1, duration: 0.6 } : {}}
      className="relative w-48 h-48 flex items-center justify-center"
    >
      <svg
        viewBox="0 0 200 240"
        className="w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Head */}
        <motion.rect
          x="60"
          y="20"
          width="80"
          height="80"
          rx="10"
          fill="white"
          opacity="0.1"
          stroke="white"
          strokeWidth="2"
          animate={animated ? { y: [20, 15, 20] } : {}}
          transition={animated ? { duration: 3, repeat: Infinity } : {}}
        />

        {/* Left Eye */}
        <circle cx="80" cy="50" r="8" fill="white" opacity="0.8" />
        <motion.circle
          cx="80"
          cy="50"
          r="4"
          fill="#006D38"
          animate={animated ? { opacity: [1, 0.3, 1] } : {}}
          transition={animated ? { duration: 3, repeat: Infinity } : {}}
        />

        {/* Right Eye */}
        <circle cx="120" cy="50" r="8" fill="white" opacity="0.8" />
        <motion.circle
          cx="120"
          cy="50"
          r="4"
          fill="#006D38"
          animate={animated ? { opacity: [1, 0.3, 1] } : {}}
          transition={animated ? { duration: 3, repeat: Infinity } : {}}
        />

        {/* Mouth */}
        <path
          d="M 85 75 Q 100 82 115 75"
          stroke="white"
          strokeWidth="2"
          opacity="0.6"
          strokeLinecap="round"
        />

        {/* Antenna */}
        <motion.g animate={animated ? { rotate: [-5, 5, -5] } : {}}>
          <line x1="100" y1="20" x2="95" y2="5" stroke="white" strokeWidth="2" opacity="0.6" />
          <circle cx="95" cy="2" r="3" fill="white" opacity="0.8" />
        </motion.g>

        {/* Body */}
        <rect x="55" y="110" width="90" height="70" rx="8" fill="white" opacity="0.08" stroke="white" strokeWidth="2" />

        {/* Left Arm */}
        <motion.g animate={animated ? { rotate: [0, 10, 0] } : {}}>
          <line x1="55" y1="130" x2="35" y2="140" stroke="white" strokeWidth="2" opacity="0.6" strokeLinecap="round" />
          <circle cx="32" cy="142" r="4" fill="white" opacity="0.7" />
        </motion.g>

        {/* Right Arm */}
        <motion.g animate={animated ? { rotate: [0, -10, 0] } : {}}>
          <line x1="145" y1="130" x2="165" y2="140" stroke="white" strokeWidth="2" opacity="0.6" strokeLinecap="round" />
          <circle cx="168" cy="142" r="4" fill="white" opacity="0.7" />
        </motion.g>

        {/* Left Leg */}
        <line x1="75" y1="180" x2="70" y2="220" stroke="white" strokeWidth="2" opacity="0.6" strokeLinecap="round" />
        <circle cx="70" cy="222" r="3" fill="white" opacity="0.7" />

        {/* Right Leg */}
        <line x1="125" y1="180" x2="130" y2="220" stroke="white" strokeWidth="2" opacity="0.6" strokeLinecap="round" />
        <circle cx="130" cy="222" r="3" fill="white" opacity="0.7" />

        {/* Chest Light */}
        <motion.circle
          cx="100"
          cy="140"
          r="5"
          fill="white"
          animate={animated ? { opacity: [0.3, 1, 0.3] } : {}}
          transition={animated ? { duration: 2, repeat: Infinity } : {}}
        />
      </svg>
    </motion.div>
  );
};
