/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Section 2: The Conversation & A Little Note From Us
 * - Left 50% (Desktop) / Top (Mobile): Solid Sage Green background (#849678) with floating chat bubbles.
 * - Right 50% (Desktop) / Bottom (Mobile): The authentic parchment paper image covers the entire right-side
 *   section background to its completeness (edge-to-edge), with "A Little Note From Us" resting on top.
 * - Authentic torn deckled paper edge transitioning along the dividing seam.
 */

import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext.jsx';

export default function ChatReveal() {
  const { t } = useLanguage();
  const chatRef = useRef(null);
  const wasInViewRef = useRef(false);
  const [isInView, setIsInView] = useState(false);
  const [playCount, setPlayCount] = useState(0);

  // Trigger animation every time the chat container enters the screen viewport
  useEffect(() => {
    const el = chatRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Trigger entry when at least 15% of the chat container is in the viewport
        if (entry.isIntersecting && entry.intersectionRatio >= 0.15) {
          if (!wasInViewRef.current) {
            wasInViewRef.current = true;
            setIsInView(true);
            setPlayCount((prev) => prev + 1);
          }
        } else if (!entry.isIntersecting || entry.intersectionRatio < 0.05) {
          // Reset when chat leaves viewport so it re-triggers next time
          if (wasInViewRef.current) {
            wasInViewRef.current = false;
            setIsInView(false);
          }
        }
      },
      {
        threshold: [0, 0.05, 0.15, 0.3, 0.5],
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="story" className="relative w-full overflow-hidden bg-[#849678]">

      {/* ============================================================== */}
      {/* 1. DESKTOP RIGHT 50% TORN PARCHMENT SECTION BACKGROUND        */}
      {/* The paper covers the entire right side from top to bottom.     */}
      {/* Its left edge is authentically torn with natural drop shadow   */}
      {/* overlapping slightly past the 50% line onto the sage green.   */}
      {/* ============================================================== */}
      <div className="hidden lg:block absolute -top-1 -bottom-1 right-0 left-[calc(50%-1.5rem)] z-0 overflow-hidden pointer-events-none select-none">
        <img
          src="/images/parchment-desktop-torn.png"
          alt="Torn Parchment Section Background"
          className="w-full h-full object-cover object-left select-none"
        />
      </div>

      {/* ============================================================== */}
      {/* 2. SPLIT SECTION CONTENT GRID (2 Equal Columns on Desktop)     */}
      {/* ============================================================== */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 relative z-10">

        {/* ============================================================== */}
        {/* LEFT COLUMN: THE CONVERSATION (50% on Desktop, Sage Green)     */}
        {/* ============================================================== */}
        <div className="w-full pt-10 sm:pt-14 md:pt-24 lg:pt-28 pb-12 sm:pb-16 lg:pb-28 px-4 sm:px-8 lg:px-12 xl:px-16 flex flex-col justify-center items-center lg:items-end">
          <div className="w-full max-w-md xl:max-w-lg lg:mr-4 xl:mr-10">
            {/* Chat Column Header */}
            <div className="text-center lg:text-left mb-6 sm:mb-8 w-full">
              <span className="font-josefin text-xs tracking-[0.25em] text-[#FDE08A] uppercase font-semibold drop-shadow-[0_1px_2px_rgba(0,0,0,0.15)]">
                {t.chat?.kicker || 'Leaked from the DmS'}
              </span>
              <h2 className="font-bodoni text-2xl sm:text-3xl lg:text-4xl text-[#FFFFFF] mt-1 font-medium tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.18)]">
                {t.chat?.title || 'The exact minute forever started'}
              </h2>
              <div className="w-12 h-0.5 bg-[#D4B458] mt-2 rounded-full mx-auto lg:mx-0 shadow-xs" />
            </div>

            {/* Chat Container (Observed for scroll enter/exit, no outer phone box) */}
            <div
              ref={chatRef}
              className="w-full"
            >
              {/* Staggered Message Feed (Replays with new key on every scroll-in) */}
              <div
                key={playCount}
                className="flex flex-col gap-4 sm:gap-5 font-josefin min-h-[340px]"
              >
                {/* Bubble 1: Bride */}
                <motion.div
                  initial={{ opacity: 0, x: -20, y: 15 }}
                  animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: -20, y: 15 }}
                  transition={isInView ? { duration: 0.4, delay: 0.2 } : { duration: 0.15 }}
                  className="flex items-start gap-3 max-w-[88%]"
                >
                  {/* Bride Avatar */}
                  <div className="w-11 h-11 rounded-full border-2 border-white shadow-md shrink-0 flex items-center justify-center overflow-hidden">
                    <img
                      src="/images/dhriti-profile.png"
                      alt="Dhriti"
                      className="w-full h-full object-cover select-none"
                    />
                  </div>

                  {/* Message Bubble */}
                  <div className="bg-[#FAFDF3] text-[#2C381E] rounded-2xl rounded-tl-xs px-4 py-2.5 shadow-md border border-white/90">
                    <p className="text-sm sm:text-base leading-snug">
                      {t.chat.messages[0].text}
                    </p>
                    <span className="block text-[10px] text-[#6E8E3E] text-right mt-1 font-mono font-medium">
                      {t.chat.messages[0].time}
                    </span>
                  </div>
                </motion.div>

                {/* Bubble 2: Groom */}
                <motion.div
                  initial={{ opacity: 0, x: 20, y: 15 }}
                  animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: 20, y: 15 }}
                  transition={isInView ? { duration: 0.4, delay: 1.5 } : { duration: 0.15 }}
                  className="flex items-start gap-3 max-w-[85%] self-end flex-row-reverse"
                >
                  {/* Groom Avatar */}
                  <div className="w-11 h-11 rounded-full border-2 border-white shadow-md shrink-0 flex items-center justify-center overflow-hidden">
                    <img
                      src="/images/soham-profile.png"
                      alt="Soham"
                      className="w-full h-full object-cover select-none"
                    />
                  </div>

                  {/* Message Bubble */}
                  <div className="bg-[#FFFFFF] text-[#2C381E] rounded-2xl rounded-tr-xs px-4 py-2.5 shadow-md border border-white/90">
                    <p className="text-sm sm:text-base leading-snug">
                      {t.chat.messages[1].text}
                    </p>
                    <span className="block text-[10px] text-[#8C9877] text-right mt-1 font-mono font-medium">
                      {t.chat.messages[1].time}
                    </span>
                  </div>
                </motion.div>

                {/* Bubble 3: Bride Big Announcement */}
                <motion.div
                  initial={{ opacity: 0, x: -20, y: 15 }}
                  animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: -20, y: 15 }}
                  transition={isInView ? { duration: 0.4, delay: 2.7 } : { duration: 0.15 }}
                  className="flex items-start gap-3 max-w-[90%]"
                >
                  {/* Bride Avatar */}
                  <div className="w-11 h-11 rounded-full border-2 border-white shadow-md shrink-0 flex items-center justify-center overflow-hidden">
                    <img
                      src="/images/dhriti-profile.png"
                      alt="Dhriti"
                      className="w-full h-full object-cover select-none"
                    />
                  </div>

                  {/* Message Bubble */}
                  <div className="bg-[#FAFDF3] text-[#2C381E] rounded-2xl rounded-tl-xs px-4 py-2.5 shadow-md border border-white/90">
                    <p className="text-sm sm:text-base font-semibold text-[#2C381E] leading-snug">
                      {t.chat.messages[2].text}
                    </p>
                    <span className="block text-[10px] text-[#6E8E3E] text-right mt-1 font-mono font-medium">
                      {t.chat.messages[2].time}
                    </span>
                  </div>
                </motion.div>

                {/* Bubble 4: Groom Heartfelt Response */}
                <motion.div
                  initial={{ opacity: 0, x: 20, y: 15 }}
                  animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: 20, y: 15 }}
                  transition={isInView ? { duration: 0.4, delay: 4.2 } : { duration: 0.15 }}
                  className="flex items-start gap-3 max-w-[88%] self-end flex-row-reverse"
                >
                  {/* Groom Avatar */}
                  <div className="w-11 h-11 rounded-full border-2 border-white shadow-md shrink-0 flex items-center justify-center overflow-hidden">
                    <img
                      src="/images/soham-profile.png"
                      alt="Soham"
                      className="w-full h-full object-cover select-none"
                    />
                  </div>

                  {/* Message Bubble */}
                  <div className="bg-[#FFFFFF] text-[#2C381E] rounded-2xl rounded-tr-xs px-4 py-2.5 shadow-md border border-white/90">
                    <p className="text-sm sm:text-base leading-snug font-medium">
                      {t.chat.messages[3].text}
                    </p>
                    <span className="block text-[10px] text-[#8C9877] text-right mt-1 font-mono font-medium">
                      {t.chat.messages[3].time}
                    </span>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* RIGHT COLUMN: A LITTLE NOTE FROM US                            */}
        {/* Desktop: Sits on the right 50% parchment background            */}
        {/* Mobile: Wrapped in the parchment background to completeness    */}
        {/* ============================================================== */}
        <div className="relative w-full flex flex-col justify-center items-center lg:items-start pt-14 sm:pt-18 lg:pt-28 pb-16 sm:pb-20 lg:pb-28 px-6 sm:px-10 lg:px-12 xl:px-16">

          {/* Mobile Background: Authentic top torn parchment paper image touching extreme bottom with zero green gap */}
          <div className="lg:hidden absolute -top-8 inset-x-0 -bottom-1 z-0 overflow-hidden pointer-events-none select-none">
            <img
              src="/images/parchment-mobile-torn.png"
              alt="Torn Parchment Section Background"
              className="w-full h-full object-cover object-top select-none"
            />
          </div>

          {/* Note Content layered directly on top of the parchment background */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-md xl:max-w-lg lg:ml-4 xl:ml-10 text-center lg:text-left flex flex-col items-center lg:items-start"
          >
            <span className="font-josefin text-xs tracking-[0.25em] text-[#55693C] uppercase font-semibold block">
              {t.note?.kicker || 'Our big day means nothing without you.'}
            </span>

            <h2 className="font-bodoni text-2xl sm:text-3xl lg:text-4xl text-[#3E4F2A] mt-2 font-medium tracking-wide">
              {t.note?.title || 'A Little Note From Us'}
            </h2>

            <div className="w-12 h-0.5 bg-[#D4B458] my-3 rounded-full mx-auto lg:mx-0 shadow-xs" />

            <p className="font-beau italic text-2xl sm:text-3xl text-[#C43A6B] tracking-wide mb-5">
              {t.note?.subtitle || 'Well this is happening!'}
            </p>

            <div className="space-y-4 font-josefin text-[#3E4F2A] text-sm sm:text-base leading-relaxed">
              <p>
                {t.note?.p1 || "Somewhere between a thousand conversations, countless laughs, and a little bit of magic, we found each other. And now we're getting married."}
              </p>
              <p>
                {t.note?.p2 || "We're so happy to have our favourite people here to celebrate with us. This little corner of the internet has all the details you need. The plans are coming together, the excitement is building, and we can't wait for great company, lots of laughter, and a little wedding-day magic."}
              </p>
            </div>

            <div className="mt-8 pt-5 border-t border-[#D4B458]/40 w-full max-w-xs mx-auto lg:mx-0 flex flex-col items-center lg:items-start">
              <span className="font-beau italic text-2xl text-[#C43A6B]">
                {t.note?.closing || 'With all our love,'}
              </span>
              <span className="font-bodoni font-bold text-lg sm:text-xl text-[#3E4F2A] tracking-wider uppercase mt-1">
                {t.note?.couple || 'Dhriti & Soham'}
              </span>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
