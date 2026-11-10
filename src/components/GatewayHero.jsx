/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Section 1: The New Illustrated Mumbai Hero
 * 
 * Features:
 * - Romantic Mumbai sunset scene (skyline, Arabian sea, bridge, terrace, Dhriti & Soham).
 * - Tailored responsive compositions:
 *   - Desktop: /images/homepage-desktop.png
 *   - Mobile:  /images/homepage-mobile.png
 * - Strict typography hierarchy:
 *   1. D/S Monogram
 *   2. Dhriti & Soham
 *   3. our forever begins
 *   4. Botanical Floral Section Divider along the bottom edge
 * - Clean vertical scrolling into the conversation story (#story).
 * - No clutter: strictly no wedding date, countdown, scratch card, or RSVP forms.
 */

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useLanguage } from '../context/LanguageContext.jsx';

export default function GatewayHero() {
  const { t } = useLanguage();
  const heroRef = useRef(null);

  // Scroll-linked soft dissolve for hero text
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  // Text content dissolves softly as user scrolls down to #story
  const opacityContent = useTransform(scrollYProgress, [0, 0.65], [1, 0.15]);
  const yContent = useTransform(scrollYProgress, [0, 1], ['0px', '-36px']);

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative w-full h-[58dvh] min-h-[390px] max-h-[480px] sm:h-[65dvh] sm:min-h-[440px] sm:max-h-[560px] md:h-[calc(100vh-3.5rem)] md:min-h-[480px] md:max-h-[864px] bg-[#FAF6EE] select-none"
    >
      {/* ============================================================== */}
      {/* 1. RESPONSIVE ILLUSTRATED MUMBAI HERO SCENE (EDGE-TO-EDGE)     */}
      {/* Desktop: homepage-desktop.png | Mobile: homepage-mobile.png    */}
      {/* Scaled & cropped to fit section height; anchored to bottom      */}
      {/* ============================================================== */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0">
        <picture className="block w-full h-full">
          <source
            media="(min-width: 1024px), (min-width: 768px) and (orientation: landscape), (min-aspect-ratio: 1.15/1)"
            srcSet="/images/homepage-desktop.png"
          />
          <img
            src="/images/homepage-mobile.png"
            alt="Dhriti & Soham Wedding Celebration - Mumbai Sunset"
            className="w-full h-full object-cover object-bottom select-none"
            loading="eager"
            fetchPriority="high"
          />
        </picture>

        {/* Soft Golden Sunset Highlight Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-black/15 pointer-events-none" />
      </div>

      {/* ============================================================== */}
      {/* 2. RESTRAINED TYPOGRAPHY HIERARCHY OVERLAY (Centered in Sky)   */}
      {/* ============================================================== */}
      <motion.div
        style={{ opacity: opacityContent, y: yContent }}
        className="absolute inset-x-0 top-0 z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 pt-3.5 sm:pt-6 md:pt-8 text-center flex flex-col items-center pointer-events-none"
      >
        {/* 1. D/S Monogram (Gentle entrance at delay 0.35s) */}
        <motion.div
          initial={{ opacity: 0, y: -12, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.35, ease: 'easeOut' }}
          className="mb-1.5 sm:mb-2 flex items-center justify-center pointer-events-auto"
        >
          <div className="w-11 h-11 sm:w-13 sm:h-13 md:w-16 md:h-16 flex items-center justify-center">
            <img
              src="/new/ds-monogram.png"
              alt="D&S Monogram"
              className="w-full h-full object-contain filter drop-shadow-[0_2px_8px_rgba(255,255,255,0.85)]"
            />
          </div>
        </motion.div>

        {/* 2. Names: Dhriti & Soham (Gentle entrance at delay 0.55s) */}
        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55, ease: 'easeOut' }}
          className="font-bodoni font-medium text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#3E4F2A] tracking-wider uppercase leading-tight drop-shadow-[0_2px_8px_rgba(255,255,255,0.95)] pointer-events-auto"
        >
          {t.hero?.coupleNames || 'Dhriti & Soham'}
        </motion.h1>

        {/* 3. Supporting Line: our forever begins (Gentle entrance at delay 0.8s) */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: 'easeOut' }}
          className="font-beau italic text-xl sm:text-2xl md:text-3xl text-[#C43A6B] mt-0.5 sm:mt-1 tracking-wide drop-shadow-[0_1px_6px_rgba(255,255,255,0.95)] pointer-events-auto"
        >
          {t.hero?.subtitle || 'our forever begins'}
        </motion.p>

        {/* 4. Tagline & Accent */}
        {t.hero?.tagline && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.95, ease: 'easeOut' }}
            className="mt-1.5 sm:mt-2 flex flex-col items-center gap-1 pointer-events-auto"
          >
            <div className="w-8 h-[1.5px] bg-[#D4B458]/70 rounded-full" />
            <span className="font-josefin text-[11px] sm:text-xs md:text-sm tracking-[0.2em] text-[#55693C] uppercase font-semibold drop-shadow-[0_1px_4px_rgba(255,255,255,0.9)]">
              {t.hero.tagline}
            </span>
          </motion.div>
        )}
      </motion.div>

      {/* ============================================================== */}
      {/* 3. FULL-WIDTH BOTANICAL FLORAL SECTION DIVIDER                 */}
      {/* Uncropped, full height, overflowing into the next section      */}
      {/* ============================================================== */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.95, ease: 'easeOut' }}
        className="absolute bottom-0 inset-x-0 w-full z-20 pointer-events-none select-none leading-none translate-y-[20%] md:translate-y-[25%]"
      >
        <img
          src="/images/floral-divider.png"
          alt="Hero Section Botanical Floral Divider"
          className="w-full h-auto block filter drop-shadow-[0_4px_16px_rgba(62,79,42,0.22)]"
          loading="eager"
        />
      </motion.div>
    </section>
  );
}
