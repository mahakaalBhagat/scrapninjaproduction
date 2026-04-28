'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { animations, viewportConfig, staggerChild } from '@/utils/animations';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: 'Navigation',
      links: [
        { label: 'Home', href: '#home' },
        { label: 'Problem', href: '#problem' },
        { label: 'Solution', href: '#solution' },
        { label: 'Team', href: '#team' },
        { label: 'Contact', href: '#contact' },
      ],
    },
    {
      title: 'Product',
      links: [
        { label: 'Features', href: '#solution' },
        { label: 'Pricing', href: '#' },
        { label: 'Security', href: '#' },
        { label: 'Testimonials', href: '#' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About', href: '#team' },
        { label: 'Blog', href: '#' },
        { label: 'Careers', href: '#' },
        { label: 'Press', href: '#' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy Policy', href: '#' },
        { label: 'Terms of Service', href: '#' },
        { label: 'Cookie Policy', href: '#' },
        { label: 'Compliance', href: '#' },
      ],
    },
  ];

  return (
    <footer className="bg-primary-700 text-white">
      {/* Footer Content */}
      <div className="container-responsive py-16">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={animations.staggerContainer}
        >
          {/* Brand */}
          <motion.div variants={staggerChild} className="text-center md:text-left">
            <div className="flex flex-col items-center md:items-start gap-2 mb-4">
              <div className="relative w-48 h-48">
                <Image
                  src="/ScrapNinja Logo for downside.png"
                  alt="ScrapNinja"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
            <p className="text-white/70 text-sm text-center md:text-left">
              Dubai's smartest scrap collection platform powered by technology and
              sustainability.
            </p>
          </motion.div>

          {/* Footer Links */}
          {footerLinks.map((column) => (
            <motion.div 
              key={column.title}
              variants={staggerChild}
            >
              <h4 className="font-semibold mb-4 text-white">{column.title}</h4>
              <ul className="space-y-2">
                {column.links.map((link) => (
                  <motion.li 
                    key={link.label}
                    whileHover={{ x: 4 }}
                  >
                    <a
                      href={link.href}
                      className="text-white/70 hover:text-white transition-colors text-sm"
                    >
                      {link.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Divider */}
        <div className="border-t border-white/20 mb-8" />

        {/* Bottom Section */}
        <motion.div 
          className="flex flex-col md:flex-row items-center justify-between gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={animations.fadeUp}
        >
          <p className="text-white/70 text-sm">
            © {currentYear} ScrapNinja. All rights reserved. | Sustainability for a
            Greener Tomorrow
          </p>

          <motion.div 
            className="flex gap-6"
            variants={animations.staggerContainer}
          >
            {[
              { label: 'Facebook', url: '#' },
              { label: 'Twitter', url: '#' },
              { label: 'LinkedIn', url: '#' },
              { label: 'Instagram', url: '#' },
            ].map((social) => (
              <motion.a
                key={social.label}
                href={social.url}
                title={social.label}
                className="text-white/70 hover:text-white transition-colors"
                variants={staggerChild}
                whileHover={{ scale: 1.1 }}
              >
                {social.label}
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* Contact Info */}
        <div className="mt-12 pt-8 border-t border-white/20 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-white/70 text-sm mb-1">Email</p>
            <p className="font-semibold">info@scrapninja.ae</p>
          </div>
          <div>
            <p className="text-white/70 text-sm mb-1">Phone</p>
            <p className="font-semibold">+971 50 000 0000</p>
          </div>
          <div>
            <p className="text-white/70 text-sm mb-1">Location</p>
            <p className="font-semibold">Dubai, United Arab Emirates</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
