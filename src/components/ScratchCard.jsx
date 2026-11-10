/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Section 3: Wedding Details, Wedding Date & Live Countdown on Hanging Wooden Board
 * 
 * 1. UNBOXED LAYOUT (NO EXTRA BOXES):
 *    - Left column: Clean typography directly on solid #F6E6CD background.
 *      Venue info, celebration timing, and direct Google Maps embed without enclosing card boxes.
 *    - Right column: Wooden board (dark-oak-board-exact.png) hangs naturally with NO box behind it.
 * 2. DIRECT DISPLAY:
 *    - Directly presents the illuminated wedding date and the live countdown on the wooden board.
 * 3. DESKTOP ROPE MEASURED TO ALIGN BOARD & MAP:
 *    - On desktop, rope is sized so the bottom of the board and bottom of the map align properly.
 * 4. OLD PAPER COUNTDOWN BOXES:
 *    - 4 countdown units styled as vintage aged parchment paper cards resting on the dark oak wood plank.
 */

import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext.jsx';
import { Calendar as CalendarIcon, Clock, Navigation } from 'lucide-react';

const WEDDING_DATE = new Date('2027-02-12T00:00:00+05:30').getTime();

export default function ScratchCard() {
  const { t } = useLanguage();

  // Live Countdown State
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Calculate live countdown to February 12, 2027
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = WEDDING_DATE - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  // 4 Countdown Units (Days, Hours, Minutes, Seconds)
  const countdownUnits = [
    { label: t.scratch?.days || 'Days', value: String(timeLeft.days).padStart(2, '0'), sublabel: t.scratch?.subDays || 'DAYS' },
    { label: t.scratch?.hours || 'Hours', value: String(timeLeft.hours).padStart(2, '0'), sublabel: t.scratch?.subHours || 'HOURS' },
    { label: t.scratch?.minutes || 'Minutes', value: String(timeLeft.minutes).padStart(2, '0'), sublabel: t.scratch?.subMins || 'MINS' },
    { label: t.scratch?.seconds || 'Seconds', value: String(timeLeft.seconds).padStart(2, '0'), sublabel: t.scratch?.subSecs || 'SECS' },
  ];

  return (
    <section id="scratch" className="relative w-full bg-[#F6E6CD] overflow-hidden pt-0 pb-16 sm:pb-24">
      
      {/* ============================================================== */}
      {/* MOBILE HEADING (Comes FIRST before details on mobile)          */}
      {/* Framed by pure vine ropes descending from top: 0 to the board  */}
      {/* ============================================================== */}
      <div className="relative w-full pt-6 pb-1 text-center lg:hidden px-4">
        {/* Left pure vine rope touching top: 0 on mobile and reaching the board */}
        <div className="absolute top-0 left-2 sm:left-4 w-10 sm:w-12 pointer-events-none select-none z-10">
          <img
            src="/images/rope-vine-left-pure.png"
            alt=""
            className="w-full h-auto object-cover object-top filter drop-shadow-[0_4px_8px_rgba(40,25,14,0.18)]"
          />
        </div>

        {/* Right pure vine rope touching top: 0 on mobile and reaching the board */}
        <div className="absolute top-0 right-2 sm:right-4 w-10 sm:w-12 pointer-events-none select-none z-10">
          <img
            src="/images/rope-vine-right-pure.png"
            alt=""
            className="w-full h-auto object-cover object-top filter drop-shadow-[0_4px_8px_rgba(40,25,14,0.18)]"
          />
        </div>

        {/* Centered Heading between the two vine ropes */}
        <div className="px-12 sm:px-16">
          <span className="font-josefin text-xs tracking-[0.25em] text-[#7A5229] uppercase font-bold block mb-1">
            {t.scratch?.kicker || 'SAVE OUR DATE & VENUE'}
          </span>
          <h2 className="font-bodoni text-3xl sm:text-4xl text-[#2B1B12] font-semibold tracking-wide">
            {t.scratch?.title || 'Wedding Details'}
          </h2>
          <div className="w-12 h-0.5 bg-[#B8860B] my-2 rounded-full mx-auto" />
          <p className="font-beau italic text-2xl text-[#C43A6B] tracking-wide">
            {t.scratch?.subtitle || 'our forever begins'}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">

        {/* ============================================================== */}
        {/* TWO-COLUMN GRID: LEFT: Clean Details | RIGHT: Wooden Board     */}
        {/* pt-0 on mobile so board directly connects to the ropes         */}
        {/* ============================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-start pt-0 lg:pt-0">

          {/* ============================================================== */}
          {/* LEFT COLUMN: UNBOXED, CLEAN VENUE & MAP (No card containers)   */}
          {/* Desktop: col-span-5 | Mobile: order-2 (placed below board)     */}
          {/* ============================================================== */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="order-2 lg:order-1 lg:col-span-5 flex flex-col justify-start pt-2 lg:pt-6"
          >
            {/* Desktop-only Header (Placed directly on #F6E6CD background) */}
            <div className="hidden lg:block mb-5">
              <span className="font-josefin text-xs tracking-[0.25em] text-[#7A5229] uppercase font-bold block mb-1">
                {t.scratch?.kicker || 'SAVE OUR DATE & VENUE'}
              </span>
              <h2 className="font-bodoni text-3xl sm:text-4xl xl:text-5xl text-[#2B1B12] font-semibold tracking-wide leading-tight">
                {t.scratch?.title || 'Wedding Details'}
              </h2>
              <div className="w-14 h-0.5 bg-[#B8860B] my-2.5 rounded-full" />
              <p className="font-beau italic text-2xl sm:text-3xl text-[#C43A6B] tracking-wide">
                {t.scratch?.subtitle || 'our forever begins'}
              </p>
            </div>

            {/* Clean Venue Details - No Box */}
            <div className="mb-5 space-y-3">
              <div>
                <span className="font-josefin text-xs tracking-[0.22em] text-[#8C6D37] uppercase font-bold block mb-1">
                  {t.scratch?.venueLabel || 'THE VENUE'}
                </span>
                <h3 className="font-bodoni font-bold text-3xl sm:text-4xl text-[#2C1B10] tracking-wide leading-tight">
                  {t.scratch?.venueName || 'Banquet 9'}
                </h3>
                <p className="font-josefin text-sm sm:text-base text-[#4E3827] font-medium mt-1 leading-relaxed max-w-md">
                  {t.scratch?.venueAddress || 'Evershine Mall, Chincholi Bunder, New Link Road, Malad West, Mumbai'}
                </p>
              </div>

              {/* Timing */}
              <div className="flex items-center gap-2.5 pt-0.5 text-[#2C1B10]">
                <Clock className="w-5 h-5 text-[#C43A6B] shrink-0" />
                <span className="font-josefin text-sm sm:text-base font-semibold text-[#3B281B]">
                  {t.scratch?.timing || 'Celebrations begin at 4:30 PM'}
                </span>
                <span className="text-[11px] font-josefin font-bold text-[#8C6D37] uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#EED19F]/65 border border-[#D4B458]/40">
                  {t.scratch?.timingTag || 'EVENING'}
                </span>
              </div>
            </div>

            {/* Direct Interactive Google Map - Clean & Unboxed */}
            <div className="relative w-full h-48 sm:h-52 xl:h-56 rounded-2xl overflow-hidden border border-[#D4B458]/60 shadow-[0_8px_20px_rgba(40,25,14,0.1)] group">
              <iframe
                title="Banquet 9 Evershine Mall Malad West Location Map"
                src="https://maps.google.com/maps?q=Banquet+9+Evershine+Mall+Chincholi+Bunder+New+Link+Road+Malad+West+Mumbai+400064&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full filter saturate-[1.05]"
              />
              
              {/* Floating Directions Button */}
              <a
                href="https://maps.google.com/?q=Banquet+9+Evershine+Mall+Chincholi+Bunder+New+Link+Road+Malad+West+Mumbai+400064"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-2.5 right-2.5 z-10 bg-[#2C1B10] text-[#FDE08A] hover:bg-[#422B1B] hover:text-white px-3.5 py-1.5 rounded-full text-xs font-josefin font-semibold shadow-lg border border-[#D4B458]/70 transition-all flex items-center gap-1.5 group/btn"
              >
                <Navigation className="w-3.5 h-3.5 text-[#FDE08A] group-hover/btn:translate-x-0.5 transition-transform" />
                <span>{t.scratch?.directions || 'Directions ↗'}</span>
              </a>
            </div>
          </motion.div>

          {/* ============================================================== */}
          {/* RIGHT COLUMN: WOODEN BOARD WITH DIRECT DATE & COUNTDOWN        */}
          {/* Bottom of board aligns properly with bottom of map on desktop  */}
          {/* ============================================================== */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="order-1 lg:order-2 lg:col-span-7 flex flex-col items-center justify-start relative w-full pt-0"
          >
            <div className="relative w-full max-w-[550px] xl:max-w-[580px] flex flex-col items-center">

              {/* ------------------------------------------------------------ */}
              {/* DESKTOP VINES: JUST THE ROPE WITH VINES (NO HORIZONTAL BARK) */}
              {/* Sized so the end of the board aligns with end of map         */}
              {/* ------------------------------------------------------------ */}
              <div className="hidden lg:flex justify-between w-full px-6 xl:px-8 pointer-events-none select-none z-10 -mb-5 xl:-mb-6">
                {/* Left rope with vines only */}
                <div className="w-20 lg:w-24 xl:w-28">
                  <img
                    src="/images/rope-vine-left-nobark.png"
                    alt="Left vine rope"
                    className="w-full h-auto object-contain object-top filter drop-shadow-[0_4px_10px_rgba(40,25,14,0.18)]"
                  />
                </div>
                {/* Right rope with vines only */}
                <div className="w-20 lg:w-24 xl:w-28">
                  <img
                    src="/images/rope-vine-right-nobark.png"
                    alt="Right vine rope"
                    className="w-full h-auto object-contain object-top filter drop-shadow-[0_4px_10px_rgba(40,25,14,0.18)]"
                  />
                </div>
              </div>

              {/* ------------------------------------------------------------ */}
              {/* THE WOODEN BOARD: DIRECTLY CONNECTED TO THE ROPES (NO GAP!)  */}
              {/* Bottom aligns with the bottom of the map                     */}
              {/* ------------------------------------------------------------ */}
              <div className="relative z-20 w-full select-none">
                
                {/* Wooden Board Container: EXACT natural aspect ratio (1010 x 544) */}
                <div className="relative w-full aspect-[1010/544] select-none">
                  
                  {/* Exact Dark Oak Wooden Board Image (No box behind it!) */}
                  <img
                    src="/images/dark-oak-board-exact.png"
                    alt="Dark Oak Wooden Board"
                    className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none filter drop-shadow-[0_14px_30px_rgba(40,25,14,0.32)]"
                  />

                  {/* ========================================================== */}
                  {/* DIRECT CONTENT WRAPPER ON THE WOODEN BOARD (NO BOXES)      */}
                  {/* Inset directly into the usable wooden board plank area      */}
                  {/* ========================================================== */}
                  <div className="absolute inset-[6.5%_8.5%_7.5%_8.5%] flex flex-col justify-between items-center text-center overflow-hidden rounded-2xl select-none px-3 sm:px-6 py-2.5 sm:py-4">
                    
                    {/* 1. TOP PART: THE ILLUMINATED WEDDING DATE */}
                    <div className="flex flex-col items-center justify-center my-auto pt-1 sm:pt-2">
                      <span className="font-beau italic text-xl sm:text-2xl md:text-3xl text-[#FDE08A] tracking-wide block leading-none drop-shadow-xs">
                        {t.scratch?.revealedPrefix || 'our wedding date is:'}
                      </span>

                      <h3 className="font-bodoni font-bold text-2xl sm:text-3xl md:text-4xl xl:text-[44px] text-[#FFF6E5] tracking-wide my-1 sm:my-1.5 leading-none drop-shadow-[0_2px_12px_rgba(253,224,138,0.5)]">
                        {t.scratch?.revealedDate || '12 February 2027'}
                      </h3>

                      <p className="font-josefin font-semibold text-[10px] sm:text-xs md:text-sm tracking-[0.25em] text-[#E6DCC7] uppercase leading-none">
                        {t.scratch?.revealedLocation || 'Friday · Mumbai'}
                      </p>
                    </div>

                    {/* 2. BOTTOM PART: OLD PAPER COUNTDOWN BOXES */}
                    <div className="w-full max-w-[420px] mx-auto pb-0.5 sm:pb-1">
                      {/* Countdown Header on wood */}
                      <div className="flex items-center justify-between mb-1.5 px-1">
                        <div className="flex items-center gap-1.5">
                          <CalendarIcon className="w-3 h-3 text-[#FDE08A]" />
                          <span className="font-bodoni font-medium text-[11px] sm:text-xs text-[#FFF6E5] tracking-wide">
                            {t.scratch?.countdownTitle || 'The Countdown Begins'}
                          </span>
                        </div>
                        <span className="font-josefin text-[9px] sm:text-[10px] tracking-wider uppercase text-[#E8DCC2] font-semibold">
                          {timeLeft.days > 0 ? `${timeLeft.days} ${t.scratch?.days || 'Days'} To Go` : 'Today!'}
                        </span>
                      </div>

                      {/* 4 Vintage Aged Paper Countdown Cards */}
                      <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
                        {countdownUnits.map((item, idx) => (
                          <div
                            key={idx}
                            className="relative bg-gradient-to-b from-[#FFFDF8] via-[#F4E9D2] to-[#E8D8BA] border border-[#A88452]/50 rounded-lg sm:rounded-xl p-1 sm:p-2 shadow-[0_3px_8px_rgba(0,0,0,0.32)] flex flex-col items-center justify-center overflow-hidden"
                          >
                            {/* Delicate antique inner border */}
                            <div className="absolute inset-0.5 border border-[#9C794A]/20 rounded-md sm:rounded-lg pointer-events-none" />
                            
                            {/* Dark walnut vintage numeral */}
                            <span className="relative z-10 font-bodoni font-bold text-lg sm:text-2xl md:text-3xl text-[#2B180D] tabular-nums leading-none tracking-tight drop-shadow-2xs">
                              {item.value}
                            </span>
                            
                            {/* Antique sepia label */}
                            <span className="relative z-10 font-josefin text-[7px] sm:text-[9px] text-[#7A5A36] tracking-widest uppercase font-bold mt-0.5 sm:mt-1 leading-none">
                              {item.sublabel}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>

              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
