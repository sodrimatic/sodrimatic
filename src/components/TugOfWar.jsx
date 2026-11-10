/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Section 5: The "Tug of War" (Bride vs. Groom Cheer Interactive)
 * Mobile-friendly interactive cheer arena with static tow.png artwork,
 * animated center wedding ring advantage indicator with spring physics,
 * game title on dark oak wooden board, and antique parchment score cards
 * positioned directly at the bottom of the rope-pulling artwork matching reference.
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { useLanguage } from '../context/LanguageContext.jsx';
import { getInitialCheers, fetchCheers, sendCheer, onCheersUpdated } from '../services/api.js';
import GameTitleBoard from './GameTitleBoard.jsx';

/**
 * Scalloped Antique Cartouche Score Card Badge matching reference image
 */
function TugScoreBadge({ team, count, label, isBride, isLeading, isTied }) {
  const statusText = isTied ? 'Tied' : isLeading ? 'Leading' : 'Squad';

  return (
    <div className="relative w-full max-w-[170px] sm:max-w-[210px] aspect-[180/88] flex items-center justify-center filter drop-shadow-[0_4px_10px_rgba(40,25,14,0.18)] select-none">
      {/* Scalloped / Bracketed Antique Cartouche SVG */}
      <svg
        viewBox="0 0 180 88"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id={`parchGrad-${team}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFFDF9" />
            <stop offset="50%" stopColor="#FAF2DC" />
            <stop offset="100%" stopColor="#F1E3C4" />
          </linearGradient>
        </defs>
        {/* Outer scalloped path matching reference */}
        <path
          d="M 22 6 
             C 30 6, 36 2, 44 2 
             L 136 2 
             C 144 2, 150 6, 158 6 
             C 168 6, 176 14, 176 24 
             C 176 30, 180 36, 180 44 
             C 180 52, 176 58, 176 64 
             C 176 74, 168 82, 158 82 
             C 150 82, 144 86, 136 86 
             L 44 86, 
             C 36 86, 30 82, 22 82 
             C 12 82, 4 74, 4 64 
             C 4 58, 0 52, 0 44 
             C 0 36, 4 30, 4 24 
             C 4 14, 12 6, 22 6 Z"
          fill={`url(#parchGrad-${team})`}
          stroke="#C8A870"
          strokeWidth="1.8"
        />
        {/* Inner delicate accent line */}
        <path
          d="M 24 9 
             C 31 9, 37 5, 45 5 
             L 135 5 
             C 143 5, 149 9, 156 9 
             C 165 9, 173 17, 173 26 
             C 173 31, 177 37, 177 44 
             C 177 51, 173 57, 173 62 
             C 173 71, 165 79, 156 79 
             C 149 79, 143 83, 135 83 
             L 45 83 
             C 37 83, 31 79, 24 79 
             C 15 79, 7 71, 7 62 
             C 7 57, 3 51, 3 44 
             C 3 37, 7 31, 7 26 
             C 7 17, 15 9, 24 9 Z"
          fill="none"
          stroke="#D4B458"
          strokeWidth="0.8"
          opacity="0.65"
        />
      </svg>

      {/* Content inside cartouche */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-2 py-1">
        <span
          className={`font-josefin font-bold text-[10.5px] sm:text-xs tracking-wider uppercase block ${isBride ? 'text-[#D86C9A]' : 'text-[#3E5C2A]'
            }`}
        >
          {label}
        </span>
        <span
          className={`font-bodoni font-bold text-2xl sm:text-3xl lg:text-4xl tabular-nums leading-none my-0.5 sm:my-1 ${isBride ? 'text-[#C43A6B]' : 'text-[#24461E]'
            }`}
        >
          {count}
        </span>
        <span
          className={`font-josefin text-[8.5px] sm:text-[10px] font-semibold tracking-wider uppercase ${isBride ? 'text-[#D86C9A]' : 'text-[#5E8339]'
            }`}
        >
          {statusText}
        </span>
      </div>
    </div>
  );
}

export default function TugOfWar({ embedded = false, isActive = true }) {
  const { t } = useLanguage();

  const [initialScores] = useState(() => getInitialCheers());
  const [brideCheers, setBrideCheers] = useState(() => initialScores.bride);
  const [groomCheers, setGroomCheers] = useState(() => initialScores.groom);
  const [idlePhase, setIdlePhase] = useState(0); // 0: neutral, 1: bride lean, 2: neutral, 3: groom lean

  // Sync cheers on mount & listen for background / multi-device updates
  useEffect(() => {
    // 1. Reactive listener (updates immediately when cheers are received or batch-synced)
    const unsubscribe = onCheersUpdated((data) => {
      if (typeof data?.bride === 'number') {
        setBrideCheers((prev) => Math.max(prev, data.bride));
      }
      if (typeof data?.groom === 'number') {
        setGroomCheers((prev) => Math.max(prev, data.groom));
      }
    });

    // 2. Fetch fresh scores on mount
    fetchCheers().then((data) => {
      if (typeof data?.bride === 'number') {
        setBrideCheers((prev) => Math.max(prev, data.bride));
      }
      if (typeof data?.groom === 'number') {
        setGroomCheers((prev) => Math.max(prev, data.groom));
      }
    });

    return unsubscribe;
  }, []);

  // Gentle live refresh polling (every 25 seconds) ONLY when this tab is active & visible
  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      if (typeof document !== 'undefined' && document.hidden) return;
      fetchCheers().then((data) => {
        if (typeof data?.bride === 'number') {
          setBrideCheers((prev) => Math.max(prev, data.bride));
        }
        if (typeof data?.groom === 'number') {
          setGroomCheers((prev) => Math.max(prev, data.groom));
        }
      });
    }, 25000);

    return () => clearInterval(interval);
  }, [isActive]);

  // Periodic subtle idle sway between neutral, bride slightly winning, groom slightly winning
  useEffect(() => {
    const interval = setInterval(() => {
      setIdlePhase((prev) => (prev + 1) % 4);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  const scoreDelta = groomCheers - brideCheers; // positive: groom advantage (right), negative: bride advantage (left)

  // Calculate subtle horizontal ring shift percentage (scaled relative to ring width)
  // Max advantage shift capped at ±22% for subtle, refined movement
  const advantageShift = Math.max(-22, Math.min(22, scoreDelta * 3.5));

  // Subtle idle breathing tension: neutral (0), bride lean (-6), neutral (0), groom lean (+6)
  const idleShifts = [0, -6, 0, 6];
  const currentIdleShift = idleShifts[idlePhase];

  // Combined subtle shift percentage (relative to ring width for perfect responsive scaling)
  const totalShiftPercent = Math.max(-26, Math.min(26, advantageShift + currentIdleShift));

  const cheerBride = () => {
    setBrideCheers((prev) => prev + 1);
    sendCheer('bride');

    if ((brideCheers + 1) % 10 === 0) {
      confetti({
        particleCount: 30,
        spread: 50,
        origin: { x: 0.35, y: 0.6 },
        colors: ['#F3A1C3', '#D86C9A', '#C43A6B', '#FDE08A'],
      });
    }
  };

  const cheerGroom = () => {
    setGroomCheers((prev) => prev + 1);
    sendCheer('groom');

    if ((groomCheers + 1) % 10 === 0) {
      confetti({
        particleCount: 30,
        spread: 50,
        origin: { x: 0.65, y: 0.6 },
        colors: ['#7DA457', '#B7C987', '#D4B458', '#FDE08A'],
      });
    }
  };

  return (
    <section
      id="cheer"
      className={
        embedded
          ? 'w-full py-2'
          : 'relative pt-12 pb-16 px-4 sm:px-6 bg-[#849678] overflow-hidden'
      }
    >
      <div className="max-w-4xl mx-auto relative z-10">

        {/* Title of Game on the Clean Dark Oak Wooden Board */}
        <GameTitleBoard
          title={t.tugOfWar?.title || 'Tug of War'}
        />

        {/* Tug-Of-War Field Arena: People pulling rope with center indicator */}
        <div className="relative w-full aspect-[2171/724] select-none my-2 sm:my-4">

          {/* 1. Base Static Artwork: public/images/tow.png */}
          <img
            src="/images/tow.png"
            alt="Tug of War - Bride Squad vs Groom Squad"
            className="w-full h-full object-contain pointer-events-none block"
            draggable={false}
          />

          {/* 2. Subtle Stationary Neutral Center/Reference Line */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none flex flex-col items-center justify-between"
            style={{ height: '72%' }}
          >
            {/* Top gold diamond neutral marker */}
            <div className="w-1.5 h-1.5 rotate-45 bg-[#D4B458] shadow-xs" />
            {/* Stationary vertical reference line */}
            <div className="w-px h-full border-l border-dashed border-[#D4B458]/70" />
            {/* Bottom gold diamond neutral marker */}
            <div className="w-1.5 h-1.5 rotate-45 bg-[#D4B458] shadow-xs" />
          </div>

          {/* 3. Animated Center Wedding Ring: ONLY this element moves horizontally along the rope */}
          <div
            className="absolute z-20 pointer-events-none flex items-center justify-center"
            style={{
              left: '50%',
              top: '43.0%',
              width: '10.5%',
              aspectRatio: '1536 / 1024',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <motion.div
              animate={{
                x: `${totalShiftPercent}%`,
              }}
              transition={{
                type: 'spring',
                stiffness: 150,
                damping: 15,
                mass: 0.65,
              }}
              className="w-full h-full flex items-center justify-center"
            >
              <img
                src="/images/towring.png"
                alt="Center wedding ring score indicator"
                className="w-full h-full object-contain filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.18)]"
                draggable={false}
              />
            </motion.div>
          </div>

        </div>

        {/* Step 6: Tug of War Score Cards directly at the bottom of the rope-pulling artwork */}
        <div className="w-full -mt-7 sm:-mt-12 lg:-mt-14 relative z-30 px-2 sm:px-6 mb-4">
          <div className="flex items-center justify-between max-w-2xl mx-auto gap-3 sm:gap-6">

            {/* Team Bride Score Card (Left, under bride squad) */}
            <div className="flex-1 flex justify-center sm:justify-start">
              <TugScoreBadge
                team="bride"
                count={brideCheers}
                label={t.tugOfWar.brideCountLabel || 'Team Bride'}
                isBride={true}
                isLeading={scoreDelta < 0}
                isTied={scoreDelta === 0}
              />
            </div>

            {/* Team Groom Score Card (Right, under groom squad) */}
            <div className="flex-1 flex justify-center sm:justify-end">
              <TugScoreBadge
                team="groom"
                count={groomCheers}
                label={t.tugOfWar.groomCountLabel || 'Team Groom'}
                isBride={false}
                isLeading={scoreDelta > 0}
                isTied={scoreDelta === 0}
              />
            </div>

          </div>
        </div>

        {/* Dynamic Status Proclamation (Sleek & Minimal, No Emojis) */}
        <div className="text-center mt-2 sm:mt-4 mb-3">
          <p className="font-bodoni text-base sm:text-lg text-[#FCE7F3] md:text-[#C43A6B] font-semibold tracking-wide">
            {scoreDelta < 0
              ? 'Bride Squad takes the lead!'
              : scoreDelta > 0
                ? 'Groom Squad takes the lead!'
                : "It's neck and neck! Keep cheering!"}
          </p>
          <p className="text-[11px] sm:text-xs font-josefin text-[#FDE08A] md:text-[#55693C] mt-0.5 tracking-wider uppercase font-semibold">
            Tap below to send your cheers
          </p>
        </div>

        {/* Sleek & Minimal Button Layout (No Emojis) */}
        <div className="flex flex-row items-center justify-center gap-3 sm:gap-5 max-w-sm sm:max-w-md mx-auto">
          {/* Cheer for Dhriti Button */}
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={cheerBride}
            className="flex-1 min-h-[44px] sm:min-h-[48px] px-4 sm:px-6 py-2.5 rounded-full bg-[#C43A6B] hover:bg-[#A92A56] active:bg-[#8E1E43] text-white font-josefin text-xs sm:text-sm font-semibold tracking-wider transition-all shadow-sm active:scale-95 cursor-pointer text-center select-none"
            aria-label="Cheer for Dhriti"
          >
            Cheer for Dhriti
          </motion.button>

          {/* Cheer for Soham Button */}
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={cheerGroom}
            className="flex-1 min-h-[44px] sm:min-h-[48px] px-4 sm:px-6 py-2.5 rounded-full bg-[#4E6B34] hover:bg-[#3D5528] active:bg-[#2D401D] text-white font-josefin text-xs sm:text-sm font-semibold tracking-wider transition-all shadow-sm active:scale-95 cursor-pointer text-center select-none"
            aria-label="Cheer for Soham"
          >
            Cheer for Soham
          </motion.button>
        </div>

      </div>
    </section>
  );
}
