'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactFormSchema, type ContactFormData } from '@/schemas';
import { apiClient } from '@/services/api';
import { Mail, Phone, MapPin, Loader, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import { animations, viewportConfig, staggerChild, buttonAnimation, cardHover } from '@/utils/animations';

export const ContactSection = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsLoading(true);
    setSubmitError(null);

    try {
      await apiClient.submitContactForm(data);
      setIsSubmitted(true);
      reset();
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : 'Failed to send inquiry. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'info@goscrapninja.com',
      href: 'mailto:info@goscrapninja.com',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+91 6306607679',
      href: 'tel:+91 6306607679',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Dubai, United Arab Emirates',
      href: '#',
    },
  ];

  return (
    <section id="contact" className="py-16 md:py-24 bg-neutral-50">
      <div className="container-responsive">
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={animations.fadeUp}
        >
          <h2 className="heading-1 mb-4">Get In Touch</h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Have questions? We're here to help. Send us a message and we'll respond
            as soon as possible.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={animations.staggerContainer}
        >
          {/* Contact Form */}
          <motion.div 
            className="lg:col-span-2"
            variants={staggerChild}
          >
            <div className="card">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Full Name */}
                <div>
                  <label htmlFor="fullName" className="form-label">
                    Full Name *
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    placeholder="Your full name"
                    className="form-input"
                    {...register('fullName')}
                  />
                  {errors.fullName && (
                    <p className="form-error">{errors.fullName.message}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="form-label">
                    Email Address *
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    className="form-input"
                    {...register('email')}
                  />
                  {errors.email && (
                    <p className="form-error">{errors.email.message}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="form-label">
                    Phone Number (Optional)
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="+91 6306607679"
                    className="form-input"
                    {...register('phone')}
                  />
                  {errors.phone && (
                    <p className="form-error">{errors.phone.message}</p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="form-label">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    placeholder="Your message (minimum 10 characters)"
                    rows={5}
                    className="form-input resize-none"
                    {...register('message')}
                  />
                  {errors.message && (
                    <p className="form-error">{errors.message.message}</p>
                  )}
                </div>

                {/* Status Messages */}
                {isSubmitted && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-800 font-medium">
                      ✓ Thank you! Your message has been sent successfully.
                    </p>
                  </div>
                )}

                {submitError && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-800 font-medium">✗ {submitError}</p>
                  </div>
                )}

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  className="btn-primary w-full flex items-center justify-center"
                  {...buttonAnimation}
                >
                  {isLoading ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin mr-2" />
                      Sending...
                    </>
                  ) : (
                    'Submit Inquiry'
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div 
            className="space-y-6"
            variants={staggerChild}
          >
            {contactInfo.map((info) => {
              const IconComponent = info.icon;
              return (
                <a
                  key={info.label}
                  href={info.href}
                  className="flex items-start gap-4 p-4 rounded-xl border border-neutral-200 bg-white hover:border-primary-300 hover:bg-primary-50 transition-colors group"
                >
                  <div className="p-3 bg-primary-100 group-hover:bg-primary-200 rounded-lg transition-colors shrink-0">
                    <IconComponent className="w-6 h-6 text-primary-600" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm text-neutral-500 mb-0.5">{info.label}</p>
                    <p className="font-semibold text-neutral-900 break-words">{info.value}</p>
                  </div>
                </a>
              );
            })}

            {/* Social Links */}
            <motion.div 
              className="pt-6 border-t border-neutral-200"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={viewportConfig}
            >
              <p className="text-sm text-neutral-600 mb-4">Follow Us</p>
              <motion.div 
                className="flex gap-4"
                variants={animations.staggerContainer}
              >
                {[
                  { label: 'Facebook', Icon: Facebook, url: 'https://www.facebook.com/share/1ENPhgar3P/' },
                  { label: 'X', Icon: Twitter, url: '#' },
                  { label: 'LinkedIn', Icon: Linkedin, url: 'https://www.linkedin.com/company/scrapninja/?viewAsMember=true' },
                  { label: 'Instagram', Icon: Instagram, url: 'https://www.instagram.com/goscrapninja?igsh=cTdzNHA4aGdza2Iw' },
                ].map(({ label, Icon, url }) => (
                  <motion.a
                    key={label}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={label}
                    className="w-10 h-10 rounded-lg bg-neutral-200 hover:bg-primary-600 text-neutral-700 hover:text-white flex items-center justify-center transition-colors"
                    variants={staggerChild}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
