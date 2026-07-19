'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { animations, viewportConfig, buttonAnimation, staggerChild } from '@/utils/animations';
import { ImageSlider } from './ImageSlider';

export const HeroSection = () => {
  const router = useRouter();

  const handleBookPickup = () => {
    router.push('/book-pickup');
  };

  const handleBecomePartner = () => {
    router.push('/rider-onboarding');
  };

  const handleVendorOnboarding = () => {
    router.push('/vendor-onboarding');
  };

  const handleViewScrapItems = () => {
    router.push('/scrap-items');
  };

  return (
    <>
      <section
        id="home"
        className="relative pt-28 pb-14 md:pt-36 md:pb-20 overflow-hidden"
      >
        <div className="container-responsive">
          <div className="relative rounded-[2rem] overflow-hidden border border-white/40 shadow-[0_24px_60px_rgba(17,24,39,0.25)]">
            {/* Auto image slider as background */}
            <ImageSlider fill />
            <div className="absolute inset-0 home-hero-overlay" />
            <div className="relative z-10 px-6 py-16 md:px-12 md:py-24 lg:px-16 lg:py-32">
          <motion.div 
            className="max-w-3xl"
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            variants={animations.staggerContainer}
          >
            {/* Badge */}
            <motion.div 
              className="flex flex-wrap items-center gap-3 mb-6"
              variants={staggerChild}
            >
              <span className="px-4 py-2 bg-white/18 backdrop-blur-sm rounded-full text-sm font-semibold text-white border border-white/30">
                🚀 Dubai's Smart Solution
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1 
              className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight"
              variants={staggerChild}
            >
              Turn Your Scrap Into{' '}
              <span className="text-amber-200">Smart Cash</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p 
              className="text-lg md:text-xl text-white/90 mb-10 leading-relaxed"
              variants={staggerChild}
            >
              Dubai's smartest scrap collection platform connecting households and
              businesses with verified scrap collectors. Get instant price estimates,
              real-time tracking, and guaranteed payment.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 flex-wrap"
              variants={staggerChild}
            >
              <motion.button 
                onClick={handleViewScrapItems}
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 shadow-lg hover:shadow-emerald-500/50 transition-all"
                {...buttonAnimation}
              >
                🏪 Become a Vendor
                <ArrowRight className="ml-2 w-4 h-4" />
              </motion.button>
              <motion.button 
                onClick={handleBookPickup}
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold text-white bg-white/15 border border-white/35 backdrop-blur-sm hover:bg-white hover:text-neutral-900 transition-colors"
                {...buttonAnimation}
              >
                🚛 Book Pickup
                <ArrowRight className="ml-2 w-4 h-4" />
              </motion.button>
            </motion.div>

            {/* Trust Badge */}
            <motion.div 
              className="mt-12 pt-10 border-t border-white/30 flex flex-col md:flex-row items-center gap-8"
              variants={staggerChild}
            >
              <div className="text-center">
                <p className="text-2xl md:text-3xl font-bold text-white">500+</p>
                <p className="text-sm text-white/80">Verified Partners</p>
              </div>
              <div className="hidden md:block w-px h-12 bg-white/40" />
              <div className="text-center">
                <p className="text-2xl md:text-3xl font-bold text-white">10K+</p>
                <p className="text-sm text-white/80">Successful Pickups</p>
              </div>
              <div className="hidden md:block w-px h-12 bg-white/40" />
              <div className="text-center">
                <p className="text-2xl md:text-3xl font-bold text-white">98%</p>
                <p className="text-sm text-white/80">Satisfaction Rate</p>
              </div>
            </motion.div>
          </motion.div>
            </div>
          </div>
        </div>
      </section>

    </>
  );
};
