/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Master Layout for Dhriti & Soham Wedding Application.
 * Coordinates LanguageContext, Scene 0 Car Intro, Top Bar, All 9 Visual Sections,
 * and Mobile-First Touch Ergonomics.
 */

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { LanguageProvider } from './context/LanguageContext.jsx';
import EnvelopeOpeningIntro from './components/EnvelopeOpeningIntro.jsx';
import Navbar from './components/Navbar.jsx';
import GatewayHero from './components/GatewayHero.jsx';
import ChatReveal from './components/ChatReveal.jsx';
import ScratchCard from './components/ScratchCard.jsx';
import MeetCouple from './components/MeetCouple.jsx';
import RSVPSection from './components/RSVPSection.jsx';
import CelebrationHub from './components/CelebrationHub.jsx';
import { prefetchCelebrationData } from './services/api.js';

function WeddingAppContent() {
  const [showEnvelopeIntro, setShowEnvelopeIntro] = useState(true);

  // Background pre-fetch dynamic data immediately on application start
  useEffect(() => {
    prefetchCelebrationData();
  }, []);

  // Global Scroll Journey Progress (Subtle luxury gold & rose hairline)
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="min-h-screen bg-[#F7F8E8] text-[#3E4F2A] font-josefin flex flex-col selection:bg-[#F3A1C3] selection:text-[#3E4F2A] relative">
      
      {/* Luxury Golden Scroll Progress Indicator at very top */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-[#D4B458] via-[#F3A1C3] to-[#C43A6B] origin-left z-50 pointer-events-none shadow-[0_1px_4px_rgba(212,180,88,0.4)]"
      />

      {/* Scene 0: Full-Screen Elegant Envelope Opening Animation */}
      {showEnvelopeIntro && (
        <EnvelopeOpeningIntro
          onOpenComplete={() => {
            setShowEnvelopeIntro(false);
            window.scrollTo({ top: 0, behavior: 'instant' });
          }}
        />
      )}

      {/* Sticky Navigation Bar */}
      <Navbar onReplayIntro={() => setShowEnvelopeIntro(true)} />

      {/* Main Single-Page Narrative Flow */}
      <main className="flex-1 w-full overflow-x-clip">
        {/* Section 1: The Gateway Hero (Mumbai meets New York) */}
        <GatewayHero />

        {/* Section 2: Conversational Chat Reveal */}
        <ChatReveal />

        {/* Section 3: Golden Scratch Card & Live Countdown */}
        <ScratchCard />

        {/* Section 4: Meet the Bride & Groom & Our Families */}
        <MeetCouple />

        {/* Section 5: Celebration Lounge (Tug of War, Blessings, Memory Wall) */}
        <CelebrationHub />

        {/* Section 6: Minimalist Mobile-First RSVP Form */}
        <RSVPSection />
      </main>

    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <WeddingAppContent />
    </LanguageProvider>
  );
}
