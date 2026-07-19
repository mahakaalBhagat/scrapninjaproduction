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
  TeamSection,
  ContactSection,
  Footer,
  PathChoiceSection,
  VendorLoginSection,
} from '@/components';
import { RiderTrackingSection } from '@/components/RiderTrackingSection';
import IntroVideo from '@/components/IntroVideo';

export default function HomeClient() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <>
      {!introDone && <IntroVideo onComplete={() => setIntroDone(true)} />}
      <main className="min-h-screen bg-white">
        <Navbar />
        <HeroSection />
        <PathChoiceSection />
        <VendorLoginSection />
        <StatsSection />
        <ProblemSection />
        <SolutionSection />
        <RiderTrackingSection />
        <LiveMetalIndexSection />
        <TeamSection />
        <ContactSection />
        <Footer />
      </main>
    </>
  );
}
