'use client';

import React, { useState } from 'react';
import {
  Navbar,
  ImageSlider,
  HeroSection,
  StatsSection,
  ProblemSection,
  SolutionSection,
  LiveMetalIndexSection,
  RiderTrackingSection,
  TeamSection,
  ContactSection,
  Footer,
} from '@/components';
import IntroVideo from '@/components/IntroVideo';

export default function HomeClient() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <>
      {!introDone && <IntroVideo onComplete={() => setIntroDone(true)} />}
      <main className="min-h-screen bg-white">
        <Navbar />
        <HeroSection />
        <StatsSection />
        <ProblemSection />
        <SolutionSection />
        <LiveMetalIndexSection />
        <RiderTrackingSection />
        <TeamSection />
        <ContactSection />
        <Footer />
      </main>
    </>
  );
}
