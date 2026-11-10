/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * EnvelopeOpeningIntro Component
 * 
 * Fixes:
 * 1. Placement of Wax Seal: Positioned with dead-center precision at (50.0%, 50.0%)
 *    at the true visual and geometric center of the envelope.
 * 2. Continuous Opening Motion: The sliding of the envelope and letter flows
 *    directly into the website's first page (Mumbai Hero):
 *    - Letter emerges up from the pocket.
 *    - Envelope drops away downward as the letter expands upward.
 *    - Seamless dissolve into the Mumbai Hero scene, making the opening gesture
 *      feel like stepping through the invitation directly onto the terrace.
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext.jsx';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function EnvelopeOpeningIntro({ onOpenComplete }) {
  const { t } = useLanguage();

  // Responsive layout state
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < 768;
  });

  // Timeline phases: 'sealed' | 'releasing-seal' | 'opening-flap' | 'emerging-letter' | 'entering-site'
  const [phase, setPhase] = useState('sealed');
  const [isFlapBehind, setIsFlapBehind] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const timersRef = useRef([]);

  // Responsive listener
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  // Preload opening assets
  useEffect(() => {
    const assetsToPreload = [
      '/new/envelop-bg-desktop.webp',
      '/new/envelop-bg-mobile.png',
      '/new/desktop-envelop.png',
      '/new/wax-seal.png',
      '/new/envelop-letter.png',
      '/new/ds-monogram.png',
      '/images/homepage-desktop.png',
      '/images/homepage-mobile.png',
    ];

    assetsToPreload.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  // Lock body scroll during intro
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  // Clean timers on unmount
  useEffect(() => {
    return () => {
      timersRef.current.forEach((tId) => clearTimeout(tId));
    };
  }, []);

  // Accessibility / Immediate bypass
  const handleSkip = () => {
    timersRef.current.forEach((tId) => clearTimeout(tId));
    setIsExiting(true);
    setTimeout(() => {
      if (onOpenComplete) onOpenComplete();
    }, 350);
  };

  /**
   * Coordinated Animation Sequence Opening Directly Into Website First Page
   */
  const handleOpenEnvelope = () => {
    if (phase !== 'sealed') return;

    // Check prefers-reduced-motion
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      handleSkip();
      return;
    }

    // Subtle haptic touch feedback
    try {
      if (typeof window !== 'undefined' && 'navigator' in window && navigator.vibrate) {
        navigator.vibrate([20, 30, 20]);
      }
    } catch {
      // Ignore vibration error
    }

    // Step 1: Flap Unfolding Animation (begins immediately on click)
    setPhase('opening-flap');

    // As flap rotates past 90 degrees (~350ms of a 750ms rotation),
    // drop its z-index behind the letter (z-index: 0)
    const tFlapZ = setTimeout(() => {
      setIsFlapBehind(true);
    }, 350);

    // Step 2: Letter Reveal & Slide-Up
    // Starts at 400ms (fluidly overlapping with the final opening arc of the flap)
    const tLetter = setTimeout(() => {
      setPhase('emerging-letter');
    }, 400);

    // Step 3: Envelope and scene transition smoothly into website first page
    const tEnter = setTimeout(() => {
      setPhase('entering-site');
    }, 1800);

    // Step 4: Seamless dissolve into Mumbai Hero (site first page)
    const tExit = setTimeout(() => {
      setIsExiting(true);
      const tComplete = setTimeout(() => {
        if (onOpenComplete) onOpenComplete();
      }, 550);
      timersRef.current.push(tComplete);
    }, 2250);

    timersRef.current.push(tFlapZ, tLetter, tEnter, tExit);
  };

  const bgImage = isMobile
    ? '/new/envelop-bg-mobile.png'
    : '/new/envelop-bg-desktop.webp';

  const isFlapOpen = phase !== 'sealed';
  const isLetterEmerged = phase === 'emerging-letter' || phase === 'entering-site';
  const isEnteringSite = phase === 'entering-site';

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          key="envelope-opening-root"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.06,
            transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
          }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-between overflow-hidden bg-[#FAF6EE] select-none h-[100dvh] w-full"
          style={{ touchAction: 'manipulation' }}
        >
          {/* ============================================================== */}
          {/* ARTISANAL PARCHMENT BACKGROUND WITH BOTANICAL CORNERS           */}
          {/* ============================================================== */}
          <motion.div
            animate={{
              opacity: isEnteringSite ? 0.3 : 1,
              scale: isEnteringSite ? 1.04 : 1,
            }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="absolute inset-0 w-full h-full pointer-events-none select-none z-0"
          >
            <img
              src={bgImage}
              alt="Artisanal Floral Texture"
              className="w-full h-full object-cover object-center"
              loading="eager"
            />
            {/* Ambient Vignette */}
            <div className="absolute inset-0 bg-radial from-transparent via-[#F7F8E8]/10 to-[#3E4F2A]/15 mix-blend-multiply pointer-events-none" />
          </motion.div>

          {/* ============================================================== */}
          {/* TOP BAR: WORDMARK & SKIP BUTTON                                */}
          {/* ============================================================== */}
          <motion.header
            animate={{
              opacity: isEnteringSite ? 0 : 1,
              y: isEnteringSite ? -10 : 0,
            }}
            transition={{ duration: 0.4 }}
            className="relative z-30 w-full max-w-5xl mx-auto px-5 sm:px-6 pt-6 sm:pt-8 flex items-center justify-between shrink-0"
          >
            <div className="flex items-center gap-2">
              <span className="font-bodoni font-bold text-sm sm:text-base tracking-[0.25em] text-[#3E4F2A] uppercase drop-shadow-[0_1px_4px_rgba(255,255,255,0.9)]">
                D&amp;S
              </span>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              {/* Skip Intro Button */}
              <button
                onClick={handleSkip}
                className="min-h-[36px] px-3.5 py-1 text-xs font-josefin tracking-wider rounded-full border border-black/10 bg-white/70 hover:bg-white text-[#55693C] hover:text-[#3E4F2A] transition-all shadow-2xs cursor-pointer"
                aria-label="Skip opening animation"
              >
                <span>{t.intro?.skip || 'Skip'}</span>
              </button>
            </div>
          </motion.header>

          {/* ============================================================== */}
          {/* CENTRAL STAGE: NAMES, ENVELOPE & OPEN INVITATION CTA            */}
          {/* Grouped comfortably inside the clear center of parchment frame */}
          {/* ============================================================== */}
          <main className="relative z-20 flex-1 w-full max-w-3xl mx-auto flex flex-col items-center justify-center px-3 sm:px-6 py-2">
            {/* 1. INVITATION HEADLINE (Positioned a bit above the envelope) */}
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{
                opacity: phase === 'sealed' ? 1 : 0,
                y: phase === 'sealed' ? 0 : -8,
              }}
              transition={{ duration: 0.35 }}
              className="text-center px-4 mb-3 sm:mb-5 max-w-xl mx-auto pointer-events-none select-none shrink-0"
            >
              <span className="font-josefin text-[10px] sm:text-xs tracking-[0.3em] text-[#7DA457] uppercase font-semibold block drop-shadow-[0_1px_3px_rgba(255,255,255,0.95)]">
                {t.intro?.kicker || 'A LITTLE NOTE FOR A BIGGER CHAPTER'}
              </span>
              <h1 className="font-bodoni text-xl sm:text-2xl md:text-3xl text-[#3E4F2A] font-medium tracking-wide mt-1 drop-shadow-[0_1px_4px_rgba(255,255,255,0.95)]">
                {t.intro?.together || 'Dhriti & Soham'}
              </h1>
            </motion.div>

            {/* 2. UNIFIED ENVELOPE STAGE (Aspect Ratio: 1536 / 1024) */}
            <div
              onClick={handleOpenEnvelope}
              className={`relative cursor-pointer transition-transform duration-300 w-[92vw] max-w-[350px] sm:max-w-[500px] aspect-[1536/1024] mx-auto ${
                phase === 'sealed' ? 'hover:scale-[1.015] active:scale-[0.99]' : ''
              }`}
              style={{
                position: 'relative',
                perspective: '1000px',
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleOpenEnvelope();
                }
              }}
              aria-label="Click to open the wedding invitation envelope"
            >
              {/* Layer 0: Envelope Ground Shadow */}
              <motion.div
                animate={{
                  opacity: isEnteringSite ? 0 : isLetterEmerged ? 0.35 : 0.25,
                  scale: isEnteringSite ? 0.95 : isLetterEmerged ? 1.05 : 1,
                }}
                transition={{ duration: 0.75, ease: 'easeInOut' }}
                className="absolute left-[8%] right-[8%] bottom-[6%] h-6 rounded-full pointer-events-none"
                style={{
                  background: 'rgba(0, 0, 0, 0.24)',
                  filter: 'blur(14px)',
                  zIndex: 0,
                }}
              />

              {/* Layer 1: Back Pocket / Interior Background (Lowest z-index) */}
              <div
                className="absolute left-[5.4%] right-[5.4%] top-[12.3%] bottom-[11.9%] rounded-[2px] pointer-events-none select-none overflow-hidden"
                style={{
                  background: 'linear-gradient(180deg, #D6C7B2 0%, #EDE3D2 45%, #E3D4C0 100%)',
                  boxShadow: 'inset 0 4px 22px rgba(0,0,0,0.18)',
                  zIndex: 1,
                }}
              >
                <div className="absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-black/15 to-transparent pointer-events-none" />
              </div>

              {/* Layer 2: Letter / Invitation Card (Positioned inside the envelope pocket) */}
              <motion.div
                initial={false}
                animate={{
                  y: isLetterEmerged ? '-75%' : '0%',
                  scale: isLetterEmerged ? 1.06 : 1,
                }}
                transition={{
                  duration: 0.85,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="absolute left-[12%] right-[12%] top-[15%] h-[72%] flex flex-col items-center justify-start pointer-events-none select-none"
                style={{
                  zIndex: 2,
                  willChange: 'transform',
                }}
              >
                <div className="relative w-full h-full flex flex-col items-center justify-start">
                  <img
                    src="/new/envelop-letter.png"
                    alt="Dhriti & Soham Illustrated Invitation Letter"
                    className="w-full h-full object-contain object-top pointer-events-none drop-shadow-[0_12px_28px_rgba(0,0,0,0.22)]"
                    loading="eager"
                  />

                  {/* Letter Text Overlay */}
                  <div className="absolute inset-x-4 top-[32%] sm:top-[34%] flex flex-col items-center text-center">
                    <div className="w-7 sm:w-9 h-7 sm:h-9 mb-1 opacity-90">
                      <img
                        src="/new/ds-monogram.png"
                        alt="D&S Monogram"
                        className="w-full h-full object-contain filter drop-shadow-xs"
                      />
                    </div>

                    <h2 className="font-bodoni font-bold text-xs sm:text-base md:text-lg text-[#3E4F2A] tracking-wider uppercase">
                      Dhriti &amp; Soham
                    </h2>

                    <p className="font-beau italic text-xs sm:text-base text-[#C43A6B] mt-0.5 tracking-wide">
                      {t.intro?.foreverBegins || 'our forever begins'}
                    </p>

                    <div className="w-10 h-0.5 bg-[#D4B458]/70 mt-1 rounded-full" />
                  </div>
                </div>
              </motion.div>

              {/* Layer 3: Side and Bottom Folded Flaps (Over the card initially) */}
              <div
                className="absolute inset-0 w-full h-full pointer-events-none select-none"
                style={{
                  zIndex: 4,
                  clipPath: 'polygon(5.4% 12.3%, 50.0% 65.4%, 94.6% 12.3%, 94.6% 88.1%, 5.4% 88.1%)',
                }}
              >
                <img
                  src="/new/desktop-envelop.png"
                  alt="Envelope Pocket Folds"
                  className="w-full h-full object-fill filter drop-shadow-[0_4px_16px_rgba(0,0,0,0.12)]"
                  loading="eager"
                />
              </div>

              {/* Layer 4: Top Triangular Flap (Hinged strictly at the top crease line) */}
              <motion.div
                initial={false}
                animate={{
                  rotateX: isFlapOpen ? 180 : 0,
                }}
                transition={{
                  duration: 0.75,
                  ease: [0.4, 0.0, 0.2, 1],
                }}
                className="absolute left-[5.4%] w-[89.2%] top-[12.3%] h-[53.1%] pointer-events-none select-none"
                style={{
                  transformOrigin: 'top center',
                  transformStyle: 'preserve-3d',
                  zIndex: isFlapBehind ? 0 : 5,
                  willChange: 'transform',
                }}
              >
                {/* Front of flap (clipped from same artwork: 0 gaps/seams when closed) */}
                <div
                  className="absolute inset-0 w-full h-full"
                  style={{
                    clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)',
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                  }}
                >
                  <img
                    src="/new/envelop-flap.png"
                    alt="Envelope Top Flap"
                    className="w-full h-full object-fill filter drop-shadow-xs"
                    loading="eager"
                  />
                </div>

                {/* Inside / underside of the opened flap (visible when rotated 180deg) */}
                <div
                  className="absolute inset-0 w-full h-full"
                  style={{
                    background: 'linear-gradient(180deg, #D6C7B2 0%, #E8DCC9 50%, #DFD0BC 100%)',
                    clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)',
                    transform: 'rotateY(180deg)',
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    boxShadow: 'inset 0 4px 14px rgba(0,0,0,0.14)',
                  }}
                />
              </motion.div>

              {/* Layer 5: Wax Seal / Sticker (Dead-center on flap tip: X = 50.0%, Y = 65.2%) */}
              <div
                className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none z-30"
                style={{
                  left: '50.0%',
                  top: '65.2%',
                }}
              >
                <motion.div
                  initial={false}
                  animate={{
                    opacity: phase === 'sealed' ? 1 : 0,
                    scale: phase === 'sealed' ? 1 : 0.7,
                  }}
                  transition={{
                    duration: 0.32,
                    ease: 'easeOut',
                  }}
                  className="w-[68px] h-[68px] sm:w-[86px] sm:h-[86px] flex items-center justify-center relative filter drop-shadow-[0_4px_14px_rgba(78,39,18,0.42)]"
                >
                  <img
                    src="/new/wax-seal.png"
                    alt="Dhriti & Soham Wax Seal"
                    className="w-full h-full object-contain"
                    loading="eager"
                  />

                  {/* Subtle Breathing Glow when sealed */}
                  {phase === 'sealed' && (
                    <motion.div
                      animate={{
                        scale: [1, 1.15, 1],
                        opacity: [0.25, 0.55, 0.25],
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 2.2,
                        ease: 'easeInOut',
                      }}
                      className="absolute inset-0 rounded-full bg-[#E5A823]/30 blur-md pointer-events-none -z-10"
                    />
                  )}
                </motion.div>
              </div>
            </div>

            {/* 3. BOTTOM CTA: "OPEN INVITATION" & INSTRUCTION HINT (Positioned a bit below the envelope) */}
            <footer className="relative z-30 w-full max-w-xs sm:max-w-md mx-auto px-4 mt-4 sm:mt-6 flex flex-col items-center justify-center shrink-0">
              <motion.div
                animate={{
                  opacity: phase === 'sealed' ? 1 : 0,
                  y: phase === 'sealed' ? 0 : 8,
                  pointerEvents: phase === 'sealed' ? 'auto' : 'none',
                }}
                transition={{ duration: 0.3 }}
                className="w-full flex flex-col items-center"
              >
                <motion.button
                  onClick={handleOpenEnvelope}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full min-h-[46px] sm:min-h-[52px] px-8 py-2.5 sm:py-3 rounded-full bg-[#C43A6B] hover:bg-[#A92A56] active:bg-[#8B1C42] text-white font-josefin text-sm sm:text-base font-semibold tracking-widest uppercase flex items-center justify-center gap-3 shadow-lg soft-glow-pink transition-all cursor-pointer select-none"
                  aria-label="Open wedding invitation"
                >
                  <Sparkles className="w-4 h-4 text-[#FFD6A5] animate-pulse" />
                  <span>{t.intro?.openInvitation || 'Open Invitation'}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </motion.button>

                <p className="mt-1.5 text-[11px] sm:text-xs font-josefin text-[#7DA457] tracking-wider text-center select-none">
                  {t.intro?.subNote || 'Tap seal or envelope to open'}
                </p>
              </motion.div>
            </footer>
          </main>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
