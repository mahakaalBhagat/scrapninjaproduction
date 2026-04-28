'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { animations, viewportConfig, staggerChild, cardHover } from '@/utils/animations';

export const StatsSection = () => {
  const stats = [
    {
      number: '500+',
      label: 'Verified Partners',
      description: 'Trusted scrap collectors across Dubai',
    },
    {
      number: '10K+',
      label: 'Pickups Done',
      description: 'Successful scrap collection operations',
    },
    {
      number: '98%',
      label: 'Satisfaction Rate',
      description: 'Customers rate us exceptional',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container-responsive">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={animations.staggerContainer}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center p-8 rounded-lg bg-secondary-50 hover:bg-secondary-100 transition-colors duration-300"
              variants={staggerChild}
              {...cardHover}
            >
              <div className="mb-4">
                <p className="text-4xl md:text-5xl font-bold text-primary-600 mb-2">
                  {stat.number}
                </p>
                <p className="text-lg font-semibold text-neutral-900 mb-2">
                  {stat.label}
                </p>
                <p className="text-sm text-neutral-600">
                  {stat.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
