'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface ScrapNinjaLogoProps {
  size?: 'small' | 'medium' | 'large';
  animated?: boolean;
}

export const ScrapNinjaLogo: React.FC<ScrapNinjaLogoProps> = ({
  size = 'medium',
  animated = true,
}) => {
  const sizeMap = {
    small: { width: 120, height: 40 },
    medium: { width: 160, height: 50 },
    large: { width: 200, height: 60 },
  };

  const content = (
    <div className="flex items-center gap-3">
      <div className="relative" style={sizeMap[size]}>
        <Image
          src="/ScrapNinja Logo Without Background.png"
          alt="ScrapNinja"
          fill
          className="object-contain"
          priority
        />
      </div>
      <span className={`font-bold ${size === 'small' ? 'text-lg' : size === 'medium' ? 'text-2xl' : 'text-3xl'} bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent`}>
        ScrapNinja
      </span>
    </div>
  );

  if (!animated) {
    return content;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {content}
    </motion.div>
  );
};
