'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Package, Truck, Check, ArrowRight, ShoppingCart } from 'lucide-react';
import { animations, viewportConfig, staggerChild } from '@/utils/animations';

export const PathChoiceSection = () => {
  const router = useRouter();

  const paths = [
    {
      icon: Package,
      title: 'Become a Vendor',
      subtitle: 'Join Our Network',
      description: 'Register as a vendor and start monetizing your scrap collection business',
      features: [
        'Vendor dashboard & analytics',
        'Bulk upload capabilities',
        'Dynamic pricing tools',
        'Customer management system',
        'Payment settlement tracking',
        'Marketing support',
      ],
      color: 'from-emerald-600 to-emerald-500',
      bgColor: 'bg-emerald-950/40',
      borderColor: 'border-emerald-500/50',
      hoverBg: 'hover:from-emerald-500 hover:to-emerald-400',
      buttonText: '🏪 Become a Vendor',
      action: () => router.push('/vendor-onboarding'),
    },
    {
      icon: Truck,
      title: 'Quick Pickup Service',
      subtitle: 'Custom Scrap Submission',
      description: 'Submit any scrap from your location with flexible scheduling',
      features: [
        'Submit any type of scrap',
        'Add multiple items easily',
        'Upload photos for verification',
        'Flexible pickup scheduling',
        'Real-time collector tracking',
        'Home service available',
      ],
      color: 'from-blue-600 to-cyan-500',
      bgColor: 'bg-blue-950/40',
      borderColor: 'border-blue-500/50',
      hoverBg: 'hover:from-blue-500 hover:to-cyan-400',
      buttonText: '🚛 Book Pickup',
      action: () => router.push('/book-pickup'),
    },
    {
      icon: ShoppingCart,
      title: 'Browse Marketplace',
      subtitle: 'Find Quality Scrap',
      description: 'Browse our curated marketplace to find quality scrap materials and connect with sellers',
      features: [
        'Browse quality scrap items',
        'Real-time pricing updates',
        'Seller ratings & reviews',
        'Secure transactions',
        'Direct messaging with sellers',
        'Instant booking available',
      ],
      color: 'from-purple-600 to-pink-500',
      bgColor: 'bg-purple-950/40',
      borderColor: 'border-purple-500/50',
      hoverBg: 'hover:from-purple-500 hover:to-pink-400',
      buttonText: '📦 Browse Marketplace',
      action: () => router.push('/scrap-items'),
    },
  ];

  return (
    <section className="relative py-16 md:py-24 lg:py-32 px-4 md:px-6 bg-gradient-to-b from-slate-900 via-emerald-950/20 to-slate-900 overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container-responsive">
        {/* Header */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={animations.staggerContainer}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            variants={staggerChild}
          >
            Choose Your{' '}
            <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
              Scrap Journey
            </span>
          </motion.h2>
          <motion.p
            className="text-lg text-white/70 max-w-2xl mx-auto"
            variants={staggerChild}
          >
            Choose your path to start selling your scrap materials and earn rewards today.
          </motion.p>
        </motion.div>

        {/* Path Cards */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={animations.staggerContainer}
        >
          {paths.map((path, index) => {
            const Icon = path.icon;
            return (
              <motion.div
                key={index}
                variants={staggerChild}
                className={`group relative rounded-2xl border ${path.borderColor} ${path.bgColor} backdrop-blur-sm p-6 md:p-8 transition-all duration-300 hover:border-opacity-100`}
                whileHover={{ y: -8 }}
              >
                {/* Gradient border on hover */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${path.color} opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none`} />

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <motion.div
                    className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${path.color} mb-6`}
                    whileHover={{ scale: 1.1 }}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </motion.div>

                  {/* Title & Subtitle */}
                  <h3 className="text-2xl font-bold text-white mb-1">{path.title}</h3>
                  <p className="text-sm font-semibold text-white/60 mb-3">{path.subtitle}</p>

                  {/* Description */}
                  <p className="text-white/75 mb-6 leading-relaxed">{path.description}</p>

                  {/* Features List */}
                  <div className="space-y-3 mb-8">
                    {path.features.map((feature, idx) => (
                      <motion.div
                        key={idx}
                        className="flex items-start gap-3"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                      >
                        <div className={`flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br ${path.color} flex items-center justify-center mt-0.5`}>
                          <Check className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-sm text-white/80">{feature}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <motion.button
                    onClick={path.action}
                    className={`w-full py-3 px-6 rounded-xl font-semibold text-white bg-gradient-to-r ${path.color} ${path.hoverBg} transition-all flex items-center justify-center gap-2 group/btn shadow-lg hover:shadow-xl`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {path.buttonText}
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={animations.staggerContainer}
        >
          <motion.p className="text-white/60 mb-4" variants={staggerChild}>
            Get started today and begin your scrap selling journey
          </motion.p>
          <motion.div variants={staggerChild} className="flex justify-center gap-4 flex-wrap">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <span className="text-2xl">✨</span>
              <span className="text-white/70 text-sm">Easy sign-up and setup</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
