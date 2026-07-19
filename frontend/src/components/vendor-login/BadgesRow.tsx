'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface Badge {
  icon: string;
  text: string;
}

interface BadgesRowProps {
  badges?: Badge[];
  animated?: boolean;
}

export const BadgesRow: React.FC<BadgesRowProps> = ({
  badges = [
    { icon: '🛡️', text: 'Enterprise Ready' },
    { icon: '🔐', text: 'Secured Access' },
  ],
  animated = true,
}) => {
  return (
    <div className="flex flex-wrap gap-3">
      {badges.map((badge, index) => (
        <motion.div
          key={index}
          initial={animated ? { opacity: 0, scale: 0.8 } : {}}
          animate={animated ? { opacity: 1, scale: 1 } : {}}
          transition={animated ? { delay: 0.2 + index * 0.1, duration: 0.4 } : {}}
          className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/10 backdrop-blur border border-white/20 text-white"
        >
          <span className="text-lg">{badge.icon}</span>
          <span className="text-xs font-semibold">{badge.text}</span>
        </motion.div>
      ))}
    </div>
  );
};
