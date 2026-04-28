'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  AlertCircle,
  DollarSign,
  Truck,
  FileText,
} from 'lucide-react';
import { animations, viewportConfig, staggerChild, cardHover } from '@/utils/animations';

export const ProblemSection = () => {
  const problems = [
    {
      icon: AlertCircle,
      title: 'Unorganized Collection',
      description:
        'No structured system for collecting scrap. Manual processes waste time and resources.',
    },
    {
      icon: DollarSign,
      title: 'Opaque Pricing',
      description:
        'Unclear pricing models make it difficult to know the real value of your scrap.',
    },
    {
      icon: Truck,
      title: 'No Digital Tracking',
      description:
        'Cannot track your collection in real-time. No visibility into the process.',
    },
    {
      icon: FileText,
      title: 'Scrap Disposal Report',
      description:
        'Missing digital proof of proper waste disposal and environmental impact.',
    },
  ];

  return (
    <section id="problem" className="py-16 md:py-24 bg-neutral-50">
      <div className="container-responsive">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={animations.fadeUp}
        >
          <h2 className="heading-1 mb-4">The Problem</h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Current scrap collection systems are inefficient, non-transparent, and
            lack proper documentation for environmental compliance.
          </p>
        </motion.div>

        {/* Problem Cards Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={animations.staggerContainer}
        >
          {problems.map((problem, index) => {
            const IconComponent = problem.icon;
            return (
              <motion.div
                key={index}
                className="card hover:shadow-lg hover:border-primary-200 border border-transparent"
                variants={staggerChild}
                {...cardHover}
              >
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary-100">
                      <IconComponent className="h-6 w-6 text-primary-600" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="heading-4 mb-2">{problem.title}</h3>
                    <p className="text-neutral-600">{problem.description}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
