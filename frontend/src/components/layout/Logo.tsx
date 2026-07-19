'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
  showText?: boolean;
  href?: string;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  animated = true,
  showText = true,
  href = '/',
  className = '',
}) => {
  const sizeMap = {
    sm: { width: 24, height: 24, textSize: 'text-base' },
    md: { width: 32, height: 32, textSize: 'text-xl' },
    lg: { width: 40, height: 40, textSize: 'text-2xl' },
  };

  const { width, height, textSize } = sizeMap[size];

  const content = (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative flex-shrink-0" style={{ width, height }}>
        <Image
          src="/ScrapNinja Logo Without Text.png"
          alt="ScrapNinja"
          fill
          className="object-contain"
          priority
        />
      </div>
      {showText && (
        <span className={`font-bold ${textSize} bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent whitespace-nowrap`}>
          ScrapNinja
        </span>
      )}
    </div>
  );

  const wrappedContent = href ? (
    <Link href={href} className="hover:opacity-80 transition-opacity">
      {content}
    </Link>
  ) : (
    content
  );

  if (animated) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {wrappedContent}
      </motion.div>
    );
  }

  return wrappedContent;
};
