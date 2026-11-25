/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Shower of Blessings Section (Interactive)
 * - Game title on clean dark oak wooden board (no flowers)
 * - Botanical wishing vine with 7 off-white hanging paper blessing notes
 * - Only the 7 most recent blessings displayed (one per hanging paper)
 * - Preset chips + custom input form with falling rose petals
 * - Full count & submission logic preserved in the background (no count displayed on UI)
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { useLanguage } from '../context/LanguageContext.jsx';
import { submitBlessing, fetchBlessings, getInitialBlessings, onBlessingsUpdated } from '../services/api.js';
import { validateBlessingText } from '../services/security.js';
import GameTitleBoard from './GameTitleBoard.jsx';

// Default starter blessings ensuring all 7 wishing papers are gracefully filled
const DEFAULT_BLESSINGS = [
  'May your love grow deeper with every passing sunrise 🌸',
  'Wishing you both a lifetime of shared laughter & chai dates!',
  'Two beautiful souls, one magnificent forever journey ♡',
  'May your home always overflow with joy, warmth and peace.',
  'Cheers to endless love, shared dreams and happily ever after!',
  'So blessed to celebrate your magical beginning together ✨',
  'May your bond shine brighter with each passing year 🕊️',
];

// Crisp, direct-tap blessings for the to-be-wed couple (1 to 3 words max)
const QUICK_BLESSINGS = [
  'Everlasting Love ♡',
  'Happily Ever After ✨',
  'Together Forever 🕊️',
  'Joy & Laughter 🥂',
  'Pure Bliss 🌸',
  'Lifetime of Smiles 💛',
];

// Exact rope heights (px in 48px height viewBox) and rotations for 7 desktop cards
// Rope points: col 0: 18px, col 1: 28px, col 2: 20px, col 3: 34px, col 4: 22px, col 5: 30px, col 6: 16px
const DESKTOP_ROPE_CARDS = [
  { yOffset: '16px', rot: '1.8deg' },   // Col 0: rope at 18px -> clip top at 16px (2px penetration)
  { yOffset: '26px', rot: '-2.2deg' },  // Col 1: rope at 28px -> clip top at 26px (2px penetration)
  { yOffset: '18px', rot: '1.2deg' },   // Col 2: rope at 20px -> clip top at 18px (2px penetration)
  { yOffset: '32px', rot: '0deg' },     // Col 3: rope at 34px -> clip top at 32px (2px penetration, center sag)
  { yOffset: '20px', rot: '-1.4deg' },  // Col 4: rope at 22px -> clip top at 20px (2px penetration)
  { yOffset: '28px', rot: '2.0deg' },   // Col 5: rope at 30px -> clip top at 28px (2px penetration)
  { yOffset: '14px', rot: '-1.6deg' },  // Col 6: rope at 16px -> clip top at 14px (2px penetration)
];

// Exact rope heights (px in 44px height viewBox) and rotations for 3 mobile cards
// Rope points: col 0: 16px, col 1: 28px (center sag), col 2: 16px
const MOBILE_ROPE_CARDS = [
  { yOffset: '14px', rot: '-1.8deg' },  // Col 0: rope at 16px -> clip top at 14px (2px penetration)
  { yOffset: '26px', rot: '0deg' },     // Col 1: rope at 28px -> clip top at 26px (2px penetration, center sag)
  { yOffset: '14px', rot: '1.8deg' },   // Col 2: rope at 16px -> clip top at 14px (2px penetration)
];

export default function BlessingsSection({ embedded = false }) {
  const { t } = useLanguage();

  const [initialData] = useState(() => getInitialBlessings());
  const [blessingCount, setBlessingCount] = useState(() => initialData.count || 0);

  const [customBlessing, setCustomBlessing] = useState('');
  const [selectedTag, setSelectedTag] = useState(null);
  const [lastSubmitted, setLastSubmitted] = useState('');
  const [validationError, setValidationError] = useState('');
  const [recentBlessings, setRecentBlessings] = useState(() => {
    if (initialData.blessings && initialData.blessings.length > 0) {
      const valid = initialData.blessings.filter(
        (b) => typeof b === 'string' && b.trim().length > 0 && isNaN(Number(b.trim()))
      );
      if (valid.length > 0) {
        return Array.from(new Set([...valid, ...DEFAULT_BLESSINGS])).slice(0, 7);
      }
    }
    return DEFAULT_BLESSINGS;
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  // Sync blessings & count from Google Sheet on mount with background reactive listener
  useEffect(() => {
    // 1. Reactive listener (catches prefetch or other tab events instantly)
    const unsubscribe = onBlessingsUpdated((data) => {
      if (data && data.blessings && data.blessings.length > 0) {
        const valid = data.blessings.filter(
          (b) => typeof b === 'string' && b.trim().length > 0 && isNaN(Number(b.trim()))
        );
        if (valid.length > 0) {
          setRecentBlessings((prev) => {
            const combined = [...valid, ...prev];
            return Array.from(new Set(combined)).slice(0, 7);
          });
        }
      }
      if (typeof data?.count === 'number') {
        setBlessingCount(data.count);
      }
    });

    // 2. Fetch fresh data (deduplicates if in-flight)
    fetchBlessings().then((res) => {
      if (res) {
        if (res.blessings && res.blessings.length > 0) {
          const validBlessings = res.blessings.filter(
            (b) => typeof b === 'string' && b.trim().length > 0 && isNaN(Number(b.trim()))
          );
          if (validBlessings.length > 0) {
            setRecentBlessings((prev) => {
              const combined = [...validBlessings, ...prev];
              const unique = Array.from(new Set(combined));
              return unique.slice(0, 7);
            });
          }
        }
        if (typeof res.count === 'number') {
          setBlessingCount(res.count);
        }
      }
    });

    return unsubscribe;
  }, []);

  // Trigger delicate rose petals confetti
  const triggerPetals = () => {
    confetti({
      particleCount: 35,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#F3A1C3', '#D86C9A', '#C43A6B', '#FDE08A'],
      shapes: ['circle'],
      scalar: 1.2,
    });
  };

  const handleSelectPreset = async (presetText) => {
    setSelectedTag(presetText);
    setLastSubmitted(presetText);
    setBlessingCount((prev) => prev + 1);
    triggerPetals();

    // Prepend as newest of the 7 hanging blessings
    setRecentBlessings((prev) => [presetText, ...prev.filter((x) => x !== presetText)].slice(0, 7));

    setShowSuccessToast(true);
    await submitBlessing(presetText);
    setTimeout(() => {
      setShowSuccessToast(false);
      setSelectedTag(null);
    }, 2800);
  };

  const handleCustomSubmit = async (e) => {
    e.preventDefault();
    
    // Security validation against script injection, HTML tags, and length
    const validation = validateBlessingText(customBlessing);
    if (!validation.valid) {
      setValidationError(validation.error || 'Please enter a valid blessing.');
      setTimeout(() => setValidationError(''), 3500);
      return;
    }

    setValidationError('');
    setIsSubmitting(true);
    const blessingText = validation.sanitized;
    setLastSubmitted(blessingText);
    setBlessingCount((prev) => prev + 1);
    triggerPetals();

    // Prepend as newest of the 7 hanging blessings
    setRecentBlessings((prev) => [blessingText, ...prev.filter((x) => x !== blessingText)].slice(0, 7));

    setCustomBlessing('');
    setShowSuccessToast(true);
    try {
      await submitBlessing(blessingText);
    } catch (err) {
      console.warn('Blessing submission warning:', err);
    }
    setIsSubmitting(false);
    setTimeout(() => {
      setShowSuccessToast(false);
      setLastSubmitted('');
    }, 2800);
  };

  // Ensure exactly 7 display items
  const displayBlessings = (recentBlessings.length >= 7
    ? recentBlessings
    : [...recentBlessings, ...DEFAULT_BLESSINGS]
  ).slice(0, 7);

  return (
    <section
      id="blessings"
      className={
        embedded
          ? 'w-full py-2'
          : 'relative pt-12 pb-16 px-4 sm:px-6 bg-[#849678] overflow-hidden'
      }
    >
      <div className="max-w-6xl mx-auto relative z-10">

        {/* Title of Game on the Clean Dark Oak Wooden Board */}
        <GameTitleBoard
          title={t.blessings?.title || 'Shower of Blessings'}
        />

        {/* ============================================================== */}
        {/* 1. MOBILE LAYOUT (< md): 3 Blessings, Center Aligned, Wavy Rope */}
        {/* ============================================================== */}
        <div className="md:hidden w-full max-w-sm sm:max-w-md mx-auto mb-6 px-1">
          <div className="relative w-full">
            {/* Mobile 3-Card Wavy Rope SVG (Exact 44px physical height) */}
            <div className="w-full select-none pointer-events-none relative z-10">
              <svg
                viewBox="0 0 300 44"
                className="w-full h-11 overflow-visible"
                preserveAspectRatio="none"
              >
                <defs>
                  <filter id="mobileRopeShadow" x="-10%" y="-10%" width="120%" height="150%">
                    <feDropShadow dx="0" dy="1.5" stdDeviation="1.2" floodColor="#2B1B12" floodOpacity="0.25" />
                  </filter>
                </defs>

                {/* 1. Underlying Soft Rope Shadow */}
                <path
                  d="M 0 12 C 25 12, 25 16, 50 16 C 85 16, 115 28, 150 28 C 185 28, 215 16, 250 16 C 275 16, 275 12, 300 12"
                  fill="none"
                  stroke="#4A2F13"
                  strokeWidth="3.0"
                  strokeLinecap="round"
                  filter="url(#mobileRopeShadow)"
                />

                {/* 2. Main Jute Rope Cord */}
                <path
                  d="M 0 12 C 25 12, 25 16, 50 16 C 85 16, 115 28, 150 28 C 185 28, 215 16, 250 16 C 275 16, 275 12, 300 12"
                  fill="none"
                  stroke="#8A5A2B"
                  strokeWidth="2.0"
                  strokeLinecap="round"
                />

                {/* 3. Twisted Twine Highlight */}
                <path
                  d="M 0 12 C 25 12, 25 16, 50 16 C 85 16, 115 28, 150 28 C 185 28, 215 16, 250 16 C 275 16, 275 12, 300 12"
                  fill="none"
                  stroke="#D4A76A"
                  strokeWidth="0.9"
                  strokeDasharray="4 3"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* 3 Hanging Cards: Perfectly Touching Rope & Center Aligned */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 items-start -mt-11 relative z-20">
              {displayBlessings.slice(0, 3).map((blessing, idx) => {
                const cfg = MOBILE_ROPE_CARDS[idx];
                const text = typeof blessing === 'string' ? blessing : blessing.text || '';

                return (
                  <motion.div
                    key={`mob-${idx}`}
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.08 }}
                    className="flex flex-col items-center"
                    style={{
                      marginTop: cfg.yOffset,
                      transform: `rotate(${cfg.rot})`,
                    }}
                  >
                    {/* Tiny Wooden Clothes Clip (Top touches rope, bottom touches paper) */}
                    <div className="relative z-30 pointer-events-none select-none -mb-2.5 flex justify-center">
                      <img
                        src="/images/wooden-clothes-clip.png"
                        alt="Clothespin"
                        className="w-[11px] h-[38px] object-contain filter drop-shadow-[0_2px_4px_rgba(40,25,12,0.25)]"
                      />
                    </div>

                    {/* Off-White Hanging Paper Card */}
                    <div className="w-full bg-[#FFFDF9] rounded-sm p-2 border border-[#D7C9A8]/80 shadow-[0_4px_12px_rgba(40,25,14,0.12)] min-h-[115px] flex flex-col justify-between items-center text-center relative">
                      <div className="absolute inset-0 rounded-sm pointer-events-none opacity-30 bg-radial from-transparent to-[#F1E5C8]/40" />
                      <p className="font-josefin font-medium text-[11px] sm:text-xs text-[#2C381F] leading-snug line-clamp-4 px-0.5 my-auto">
                        "{text}"
                      </p>
                      <div className="w-5 h-px bg-[#C8A25D]/50 mt-1" />
                      <span className="text-[7.5px] font-josefin text-[#8C6D37] uppercase tracking-wider block mt-0.5">
                        With Love
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 2. DESKTOP LAYOUT (>= md): All 7 Blessings Hanging Across Rope  */}
        {/* ============================================================== */}
        <div className="hidden md:block w-full max-w-5xl mx-auto mb-6 px-1">
          <div className="relative w-full">
            {/* Desktop 7-Card Wavy Rope SVG (Exact 48px physical height) */}
            <div className="w-full select-none pointer-events-none relative z-10">
              <svg
                viewBox="0 0 700 48"
                className="w-full h-12 overflow-visible"
                preserveAspectRatio="none"
              >
                <defs>
                  <filter id="desktopRopeShadow" x="-10%" y="-10%" width="120%" height="150%">
                    <feDropShadow dx="0" dy="2" stdDeviation="1.5" floodColor="#2B1B12" floodOpacity="0.25" />
                  </filter>
                </defs>

                {/* 1. Underlying Soft Rope Shadow */}
                <path
                  d="M 0 14 C 25 14, 25 18, 50 18 C 75 18, 75 12, 100 12 C 125 12, 125 28, 150 28 C 175 28, 175 14, 200 14 C 225 14, 225 20, 250 20 C 275 20, 275 12, 300 12 C 325 12, 325 34, 350 34 C 375 34, 375 12, 400 12 C 425 12, 425 22, 450 22 C 475 22, 475 14, 500 14 C 525 14, 525 30, 550 30 C 575 30, 575 12, 600 12 C 625 12, 625 16, 650 16 C 675 16, 675 14, 700 14"
                  fill="none"
                  stroke="#4A2F13"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                  filter="url(#desktopRopeShadow)"
                />

                {/* 2. Main Jute Rope Cord */}
                <path
                  d="M 0 14 C 25 14, 25 18, 50 18 C 75 18, 75 12, 100 12 C 125 12, 125 28, 150 28 C 175 28, 175 14, 200 14 C 225 14, 225 20, 250 20 C 275 20, 275 12, 300 12 C 325 12, 325 34, 350 34 C 375 34, 375 12, 400 12 C 425 12, 425 22, 450 22 C 475 22, 475 14, 500 14 C 525 14, 525 30, 550 30 C 575 30, 575 12, 600 12 C 625 12, 625 16, 650 16 C 675 16, 675 14, 700 14"
                  fill="none"
                  stroke="#8A5A2B"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />

                {/* 3. Twisted Twine Highlight */}
                <path
                  d="M 0 14 C 25 14, 25 18, 50 18 C 75 18, 75 12, 100 12 C 125 12, 125 28, 150 28 C 175 28, 175 14, 200 14 C 225 14, 225 20, 250 20 C 275 20, 275 12, 300 12 C 325 12, 325 34, 350 34 C 375 34, 375 12, 400 12 C 425 12, 425 22, 450 22 C 475 22, 475 14, 500 14 C 525 14, 525 30, 550 30 C 575 30, 575 12, 600 12 C 625 12, 625 16, 650 16 C 675 16, 675 14, 700 14"
                  fill="none"
                  stroke="#D4A76A"
                  strokeWidth="1.0"
                  strokeDasharray="5 3"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* 7 Hanging Cards: Every Clip Touches the Wavy Rope with Zero Gap */}
            <div className="grid grid-cols-7 gap-2.5 lg:gap-3 items-start -mt-12 relative z-20">
              {displayBlessings.map((blessing, idx) => {
                const cfg = DESKTOP_ROPE_CARDS[idx % DESKTOP_ROPE_CARDS.length];
                const text = typeof blessing === 'string' ? blessing : blessing.text || '';

                return (
                  <motion.div
                    key={`desk-${idx}`}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: idx * 0.05 }}
                    className="flex flex-col items-center"
                    style={{
                      marginTop: cfg.yOffset,
                      transform: `rotate(${cfg.rot})`,
                    }}
                  >
                    {/* Tiny Wooden Clothes Clip (Top touches rope, bottom touches paper) */}
                    <div className="relative z-30 pointer-events-none select-none -mb-2.5 lg:-mb-3 flex justify-center">
                      <img
                        src="/images/wooden-clothes-clip.png"
                        alt="Clothespin"
                        className="w-[12px] lg:w-[13px] h-[40px] lg:h-[44px] object-contain filter drop-shadow-[0_2px_4px_rgba(40,25,12,0.25)]"
                      />
                    </div>

                    {/* Off-White Hanging Paper Card */}
                    <div className="w-full bg-[#FFFDF9] rounded-sm sm:rounded-md p-2.5 lg:p-3 border border-[#D7C9A8]/80 shadow-[0_6px_14px_rgba(40,25,14,0.12)] hover:shadow-[0_8px_18px_rgba(40,25,14,0.18)] transition-all min-h-[125px] lg:min-h-[135px] flex flex-col justify-between items-center text-center relative group">
                      <div className="absolute inset-0 rounded-sm pointer-events-none opacity-30 bg-radial from-transparent to-[#F1E5C8]/40" />
                      <p className="font-josefin font-medium text-xs lg:text-[13px] text-[#2C381F] leading-snug line-clamp-4 px-0.5 my-auto">
                        "{text}"
                      </p>
                      <div className="w-6 h-px bg-[#C8A25D]/50 mt-1.5" />
                      <span className="text-[8.5px] font-josefin text-[#8C6D37] uppercase tracking-wider block mt-0.5">
                        With Love
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* DIRECT SUBMISSION BLESSING BUTTONS & CUSTOM INPUT FORM         */}
        {/* ============================================================== */}
        <div className="w-full max-w-xl mx-auto mt-6 sm:mt-8 px-2">
          {/* Quick 1-Tap Direct Submission Blessing Buttons */}
          <div className="mb-3.5 sm:mb-4 text-center">
            <span className="font-josefin text-[11px] sm:text-xs font-semibold tracking-wider text-[#FDE08A] md:text-[#55693C] uppercase block mb-2">
              {t.blessings?.quickPrompt || 'Tap to shower instant blessings'}
            </span>
            <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
              {QUICK_BLESSINGS.map((blessing) => {
                const isSelected = selectedTag === blessing;
                return (
                  <button
                    key={blessing}
                    type="button"
                    onClick={() => handleSelectPreset(blessing)}
                    className={`min-h-[36px] sm:min-h-[40px] px-3 sm:px-4 py-1.5 rounded-full font-josefin text-xs sm:text-[13px] font-semibold tracking-wide transition-all duration-200 cursor-pointer select-none border shadow-xs active:scale-95 flex items-center justify-center ${
                      isSelected
                        ? 'bg-[#C43A6B] text-white border-[#C43A6B] shadow-md scale-105'
                        : 'bg-[#FFFDF9]/95 text-[#2B1B12] hover:bg-[#C43A6B] hover:text-white border-[#C8A870]/70 hover:border-[#C43A6B] hover:shadow-sm'
                    }`}
                    aria-label={`Send blessing: ${blessing}`}
                  >
                    <span>{blessing}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Custom blessing input form */}
          <form onSubmit={handleCustomSubmit} className="relative flex items-center">
            <input
              type="text"
              maxLength={280}
              value={customBlessing}
              onChange={(e) => {
                setCustomBlessing(e.target.value);
                if (validationError) setValidationError('');
              }}
              placeholder={t.blessings?.placeholder || 'Or write your own heartfelt blessing for Dhriti & Soham...'}
              className="w-full min-h-[46px] sm:min-h-[50px] pl-5 pr-20 py-2.5 rounded-full border border-[#C8A870]/70 bg-white/95 text-xs sm:text-sm font-josefin text-[#2E3B1C] placeholder-[#8C9E73] focus:outline-none focus:ring-2 focus:ring-[#849678] shadow-sm"
            />
            <button
              type="submit"
              disabled={isSubmitting || !customBlessing.trim()}
              className="absolute right-1.5 min-h-[36px] sm:min-h-[40px] px-5 rounded-full bg-[#C43A6B] hover:bg-[#A82B55] disabled:opacity-40 text-white font-josefin text-xs font-semibold tracking-wider transition-all active:scale-95 cursor-pointer flex items-center justify-center shadow-md"
              aria-label="Submit Blessing"
            >
              <span>Send</span>
            </button>
          </form>

          {/* Validation Error Notice */}
          <AnimatePresence>
            {validationError && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-2 text-center text-xs font-josefin text-rose-300 font-semibold drop-shadow-xs"
              >
                {validationError}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Success Notification */}
          <AnimatePresence>
            {showSuccessToast && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-2.5 text-center text-xs sm:text-sm font-josefin text-[#FDE08A] md:text-[#55693C] font-semibold"
              >
                {lastSubmitted
                  ? `"${lastSubmitted}" added to the vine! Thank you! ♡`
                  : 'Your blessing is now hanging on the wishing vine! Thank you! ♡'}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
