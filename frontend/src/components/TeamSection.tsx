'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { animations, viewportConfig, staggerChild, cardHover } from '@/utils/animations';

export const TeamSection = () => {
  const teamMembers = [
    {
      id: 1,
      name: 'Ketan Shandilaya',
      role: 'Founder & CEO',
      image: '/ketan image.jpeg',
      bio: 'Visionary entrepreneur driving Dubai\'s waste-tech revolution with a passion for sustainable cities and circular economy principles.',
    },
    {
      id: 2,
      name: 'Raj Shekhar',
      role: 'Chief of Operations (COO)',
      image: '/raj bhai.jpeg',
      bio: 'Head of sustainability focused on recycle solutions and making green practices accessible for every business and home in the region.',
    },
    {
      id: 3,
      name: 'Saksham Shukla',
      role: 'Tech Wizard',
      image: '/saksham.jpeg',
      bio: 'Full-stack tech architect building the digital backbone that makes ScrapNinja fast, reliable, and infinitely scalable.',
    },
  ];

  return (
    <section id="team" className="py-16 md:py-24 bg-white">
      <div className="container-responsive">
        <motion.div 
          className="max-w-3xl mx-auto text-center"
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={animations.fadeUp}
        >
          <h2 className="heading-1 mb-6">Meet The Team</h2>
          <p className="text-lg text-neutral-600 leading-relaxed mb-8">
            We're a passionate team committed to building sustainable solutions for
            waste management. Our mission is to transform how Dubai handles scrap
            collection through technology and innovation.
          </p>

          <motion.div 
            className="mt-12 pt-12 border-t border-neutral-200"
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            variants={animations.staggerContainer}
          >
            <h3 className="heading-3 mb-12">Leadership</h3>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              variants={animations.staggerContainer}
            >
              {teamMembers.map((member) => (
                <motion.div 
                  key={member.id} 
                  className="card group hover:shadow-lg transition-all"
                  variants={staggerChild}
                  {...cardHover}
                >
                  {/* Team Member Image */}
                  <div className="mb-6 overflow-hidden rounded-lg">
                    <motion.div 
                      className="relative w-full aspect-square"
                      whileHover={{ scale: 1.05 }}
                    >
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover transition-transform duration-300"
                      />
                    </motion.div>
                  </div>
                  
                  {/* Team Member Info */}
                  <h4 className="heading-4 mb-2">{member.name}</h4>
                  <p className="text-primary-600 font-semibold mb-3">{member.role}</p>
                  <p className="text-neutral-600 text-sm leading-relaxed">
                    {member.bio}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
