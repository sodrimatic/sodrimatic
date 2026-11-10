/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Section 4: Meet the Bride & Groom & Our Families
 * 
 * Design matches reference images:
 * - Desktop (Reference Image 1): Grand 2-column stage with identical, beautifully scaled Bride and Groom arched windows,
 *   topped by the names "Dhriti Kalpesh Shah" and "Soham Manish Mehta",
 *   vintage street lanterns flanking and between windows (sized and positioned to match the reference picture),
 *   suspended "THE SHAH FAMILY" and "THE MEHTA FAMILY" wooden signs hanging from windowsills, with cascading floral vines
 *   and deckled parchment cards displaying family lineages.
 * - Mobile (Reference Image 2, Option 4): Storybook zig-zag flow:
 *   - Block 1: Identical-scale Bride window + "Dhriti Kalpesh Shah" on top, with Shah wooden board hanging below;
 *     vintage lantern + tall Shah family parchment card on right (with increased height so all family names fit properly).
 *   - Mid-Section: Curved dashed flight path with flower buds and airplane weaving diagonally across.
 *   - Block 2: Vintage lantern + tall Mehta family parchment card on left (with increased height so all family names fit properly);
 *     Identical-scale Groom window + "Soham Manish Mehta" on top, with Mehta wooden board hanging below.
 * - Bottom Accent: Hand-drawn architectural ink & wash sketch (reduced 2x for a balanced vignette)
 *   connecting Mumbai (Taj Palace, Gateway of India, CST) and Manhattan (Empire State, Chrysler, Brooklyn Bridge),
 *   framed by "And paths begin to merge....." and "MUMBAI MEETS MANHATTAN • FEBRUARY 2027".
 */

import React from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext.jsx';

export default function MeetCouple() {
  const { t } = useLanguage();

  // Family details matching reference image
  const shahFamily = {
    surname: t.people?.brideFamily?.familySurname || 'THE SHAH FAMILY',
    grandparentsLabel: t.people?.brideFamily?.grandparentsLabel || 'GRANDPARENTS',
    grandparents: t.people?.brideFamily?.grandparents || [
      'Dashrathlal Khemchandlal Shah',
      'Jyotsna Dashrathlal Shah',
    ],
    parentsLabel: t.people?.brideFamily?.parentsLabel || 'PARENTS',
    parents: t.people?.brideFamily?.parents || [
      'Kalpesh Dashrathlal Shah',
      'Ami Kalpesh Shah',
    ],
    siblingsLabel: t.people?.brideFamily?.siblingsLabel || 'SIBLING',
    siblings: t.people?.brideFamily?.siblings || [
      'Vedant Kalpesh Shah',
    ],
  };

  const mehtaFamily = {
    surname: t.people?.groomFamily?.familySurname || 'THE MEHTA FAMILY',
    grandparentsLabel: t.people?.groomFamily?.grandparentsLabel || 'GRANDPARENTS',
    grandparents: t.people?.groomFamily?.grandparents || [
      'Rameshchandra Mehta',
      'Ritaben Rameshchandra Mehta',
    ],
    parentsLabel: t.people?.groomFamily?.parentsLabel || 'PARENTS',
    parents: t.people?.groomFamily?.parents || [
      'Manish Rameshchandra Mehta',
      'Jigna Manish Mehta',
    ],
    siblingsLabel: t.people?.groomFamily?.siblingsLabel || 'SIBLING',
    siblings: t.people?.groomFamily?.siblings || [
      'Kewal Manish Mehta',
    ],
  };

  return (
    <section id="people" className="relative w-full py-16 sm:py-20 lg:py-24 px-3 sm:px-6 bg-[#FAF6EE] overflow-hidden">

      {/* Background Stucco Wall Texture (Subtle warm stone) */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none opacity-40 select-none"
        style={{
          backgroundImage: 'radial-gradient(#E8DEC8 1px, transparent 1px), radial-gradient(#E8DEC8 1px, #FAF6EE 1px)',
          backgroundSize: '40px 40px',
          backgroundPosition: '0 0, 20px 20px',
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* ================================================================ */}
        {/* SECTION HEADER                                                  */}
        {/* ================================================================ */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-10 sm:mb-14"
        >
          <span className="font-josefin text-xs tracking-[0.25em] text-[#6E8752] uppercase font-bold block mb-1">
            {t.people?.sectionSubtitle || 'THE TWO SOULS BEHIND THIS CELEBRATION'}
          </span>
          <h2 className="font-bodoni text-3xl sm:text-4xl lg:text-5xl text-[#2B1B12] font-semibold tracking-wide">
            {t.people?.sectionTitle || 'Meet the Bride & Groom'}
          </h2>
          <div className="w-12 h-0.5 bg-[#B8860B] mx-auto my-2 rounded-full shadow-xs" />
          <p className="font-beau italic text-xl sm:text-2xl lg:text-3xl text-[#C43A6B] tracking-wide">
            {t.people?.familiesSubtitle || 'Two different worlds, one beautiful story'}
          </p>
        </motion.div>

        {/* ================================================================ */}
        {/* DESKTOP LAYOUT (Image 1 Reference with Perfectly Matched Sizes)  */}
        {/* ================================================================ */}
        <div className="hidden lg:block relative">

          {/* Flanking Lanterns: Positioned level with the window's upper arch */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="absolute left-1 xl:left-4 top-24 xl:top-28 flex flex-col items-center z-10"
          >
            <img
              src="/images/vintage-lantern.png"
              alt="Vintage Wall Lantern"
              className="w-14 xl:w-16 h-auto filter drop-shadow-[0_8px_16px_rgba(40,25,14,0.22)] select-none pointer-events-none"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="absolute right-1 xl:right-4 top-24 xl:top-28 flex flex-col items-center z-10"
          >
            <img
              src="/images/vintage-lantern.png"
              alt="Vintage Wall Lantern"
              className="w-14 xl:w-16 h-auto filter drop-shadow-[0_8px_16px_rgba(40,25,14,0.22)] select-none pointer-events-none"
            />
          </motion.div>

          {/* Main 2-Column Grid with Central Lantern & Connecting Flight Arc */}
          <div className="grid grid-cols-12 gap-4 xl:gap-8 items-start px-8 xl:px-12">

            {/* Left Column: Bride Window + Names + Shah Board + Parchment Card */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="col-span-5 flex flex-col items-center w-full max-w-[500px] xl:max-w-[540px] mx-auto"
            >
              {/* Bride Name & Title Header on Top of Window */}
              <div className="text-center mb-3 xl:mb-4 select-none">
                <span className="font-josefin text-xs xl:text-sm tracking-[0.25em] text-[#6E8752] uppercase font-bold block mb-1">
                  THE BRIDE
                </span>
                <h3 className="font-bodoni text-2xl sm:text-3xl xl:text-4xl text-[#2B1B12] font-semibold tracking-wide">
                  Dhriti Kalpesh Shah
                </h3>
                <div className="w-10 h-0.5 bg-[#B8860B] mx-auto mt-1.5 rounded-full" />
              </div>

              {/* Bride Window: Identical Dimension to Groom Window */}
              <div className="w-full relative z-10 flex justify-center">
                <img
                  src="/images/bride-window.png"
                  alt="Dhriti - The Bride looking out from arched window"
                  className="w-full h-auto object-contain filter drop-shadow-[0_16px_32px_rgba(40,25,14,0.22)] select-none pointer-events-none"
                />
              </div>

              {/* Shah Wooden Sign: Hanging directly from windowsill */}
              <div className="w-[88%] xl:w-[90%] max-w-[420px] xl:max-w-[460px] -mt-24 xl:-mt-28 relative z-20">
                <img
                  src="/images/shah-family-board.png?v=crop"
                  alt="The Shah Family Wooden Sign"
                  className="w-full h-auto object-contain filter drop-shadow-[0_6px_14px_rgba(40,25,14,0.22)] select-none pointer-events-none"
                />
              </div>

              {/* Shah Family Lineage Parchment Card: Tucked under board */}
              <div className="w-[82%] xl:w-[85%] max-w-[390px] xl:max-w-[430px] -mt-38 xl:-mt-44 relative z-10">
                <div className="relative w-full aspect-[928/699] flex items-center justify-center filter drop-shadow-[0_8px_20px_rgba(40,25,14,0.14)] select-none">
                  <img
                    src="/images/family-card-parchment.png"
                    alt="The Shah Family Lineage Card"
                    className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none"
                  />
                  <div className="relative z-10 w-[78%] h-[82%] flex flex-col justify-center items-center text-center px-4 py-2">
                    {/* Grandparents */}
                    <div className="mb-2.5">
                      <span className="font-josefin text-[10px] xl:text-[11.5px] tracking-[0.22em] text-[#7A5C28] uppercase font-bold block mb-0.5">
                        {shahFamily.grandparentsLabel}
                      </span>
                      <div className="font-bodoni text-xs sm:text-sm xl:text-[15px] text-[#24170E] font-medium leading-snug space-y-0.5">
                        {shahFamily.grandparents.map((name, i) => (
                          <p key={i}>{name}</p>
                        ))}
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="flex items-center justify-center gap-2 my-1">
                      <div className="w-8 h-px bg-[#C8A25D]/60" />
                      <span className="text-[9px] text-[#9E7B35]">❖</span>
                      <div className="w-8 h-px bg-[#C8A25D]/60" />
                    </div>

                    {/* Parents */}
                    <div className="mb-2.5">
                      <span className="font-josefin text-[10px] xl:text-[11.5px] tracking-[0.22em] text-[#7A5C28] uppercase font-bold block mb-0.5">
                        {shahFamily.parentsLabel}
                      </span>
                      <div className="font-bodoni text-xs sm:text-sm xl:text-[15px] text-[#24170E] font-medium leading-snug space-y-0.5">
                        {shahFamily.parents.map((name, i) => (
                          <p key={i}>{name}</p>
                        ))}
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="flex items-center justify-center gap-2 my-1">
                      <div className="w-8 h-px bg-[#C8A25D]/60" />
                      <span className="text-[9px] text-[#9E7B35]">❖</span>
                      <div className="w-8 h-px bg-[#C8A25D]/60" />
                    </div>

                    {/* Sibling */}
                    <div>
                      <span className="font-josefin text-[10px] xl:text-[11.5px] tracking-[0.22em] text-[#7A5C28] uppercase font-bold block mb-0.5">
                        {shahFamily.siblingsLabel}
                      </span>
                      <div className="font-bodoni text-xs sm:text-sm xl:text-[15px] text-[#24170E] font-medium leading-snug">
                        {shahFamily.siblings.map((name, i) => (
                          <p key={i}>{name}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Center Area: Central Vintage Lantern */}
            <div className="col-span-2 flex flex-col items-center justify-start pt-16 xl:pt-20">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <img
                  src="/images/vintage-lantern.png"
                  alt="Center Vintage Lantern"
                  className="w-16 xl:w-20 h-auto filter drop-shadow-[0_8px_18px_rgba(40,25,14,0.24)] select-none pointer-events-none"
                />
              </motion.div>
            </div>

            {/* Right Column: Groom Window + Names + Mehta Board + Parchment Card */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="col-span-5 flex flex-col items-center w-full max-w-[500px] xl:max-w-[540px] mx-auto"
            >
              {/* Groom Name & Title Header on Top of Window */}
              <div className="text-center mb-3 xl:mb-4 select-none">
                <span className="font-josefin text-xs xl:text-sm tracking-[0.25em] text-[#6E8752] uppercase font-bold block mb-1">
                  THE GROOM
                </span>
                <h3 className="font-bodoni text-2xl sm:text-3xl xl:text-4xl text-[#2B1B12] font-semibold tracking-wide">
                  Soham Manish Mehta
                </h3>
                <div className="w-10 h-0.5 bg-[#B8860B] mx-auto mt-1.5 rounded-full" />
              </div>

              {/* Groom Window: Identical Dimension to Bride Window */}
              <div className="w-full relative z-10 flex justify-center">
                <img
                  src="/images/groom-window.png"
                  alt="Soham - The Groom looking out from arched window"
                  className="w-full h-auto object-contain filter drop-shadow-[0_16px_32px_rgba(40,25,14,0.22)] select-none pointer-events-none"
                />
              </div>

              {/* Mehta Wooden Sign: Hanging directly from windowsill */}
              <div className="w-[88%] xl:w-[90%] max-w-[420px] xl:max-w-[460px] -mt-24 xl:-mt-28 relative z-20">
                <img
                  src="/images/mehta-family-board.png?v=crop"
                  alt="The Mehta Family Wooden Sign"
                  className="w-full h-auto object-contain filter drop-shadow-[0_6px_14px_rgba(40,25,14,0.22)] select-none pointer-events-none"
                />
              </div>

              {/* Mehta Family Lineage Parchment Card: Tucked under board */}
              <div className="w-[82%] xl:w-[85%] max-w-[390px] xl:max-w-[430px] -mt-38 xl:-mt-44 relative z-10">
                <div className="relative w-full aspect-[928/699] flex items-center justify-center filter drop-shadow-[0_8px_20px_rgba(40,25,14,0.14)] select-none">
                  <img
                    src="/images/family-card-parchment.png"
                    alt="The Mehta Family Lineage Card"
                    className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none"
                  />
                  <div className="relative z-10 w-[78%] h-[82%] flex flex-col justify-center items-center text-center px-4 py-2">
                    {/* Grandparents */}
                    <div className="mb-2.5">
                      <span className="font-josefin text-[10px] xl:text-[11.5px] tracking-[0.22em] text-[#7A5C28] uppercase font-bold block mb-0.5">
                        {mehtaFamily.grandparentsLabel}
                      </span>
                      <div className="font-bodoni text-xs sm:text-sm xl:text-[15px] text-[#24170E] font-medium leading-snug space-y-0.5">
                        {mehtaFamily.grandparents.map((name, i) => (
                          <p key={i}>{name}</p>
                        ))}
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="flex items-center justify-center gap-2 my-1">
                      <div className="w-8 h-px bg-[#C8A25D]/60" />
                      <span className="text-[9px] text-[#9E7B35]">❖</span>
                      <div className="w-8 h-px bg-[#C8A25D]/60" />
                    </div>

                    {/* Parents */}
                    <div className="mb-2.5">
                      <span className="font-josefin text-[10px] xl:text-[11.5px] tracking-[0.22em] text-[#7A5C28] uppercase font-bold block mb-0.5">
                        {mehtaFamily.parentsLabel}
                      </span>
                      <div className="font-bodoni text-xs sm:text-sm xl:text-[15px] text-[#24170E] font-medium leading-snug space-y-0.5">
                        {mehtaFamily.parents.map((name, i) => (
                          <p key={i}>{name}</p>
                        ))}
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="flex items-center justify-center gap-2 my-1">
                      <div className="w-8 h-px bg-[#C8A25D]/60" />
                      <span className="text-[9px] text-[#9E7B35]">❖</span>
                      <div className="w-8 h-px bg-[#C8A25D]/60" />
                    </div>

                    {/* Sibling */}
                    <div>
                      <span className="font-josefin text-[10px] xl:text-[11.5px] tracking-[0.22em] text-[#7A5C28] uppercase font-bold block mb-0.5">
                        {mehtaFamily.siblingsLabel}
                      </span>
                      <div className="font-bodoni text-xs sm:text-sm xl:text-[15px] text-[#24170E] font-medium leading-snug">
                        {mehtaFamily.siblings.map((name, i) => (
                          <p key={i}>{name}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>

        {/* ================================================================ */}
        {/* MOBILE LAYOUT (Option 4 Reference with Tall Paper & Symmetrical) */}
        {/* ================================================================ */}
        <div className="lg:hidden space-y-6">

          {/* -------------------------------------------------------------- */}
          {/* BLOCK 1: BRIDE SIDE (Window Left, Tall Parchment Card Right)   */}
          {/* -------------------------------------------------------------- */}
          <div className="grid grid-cols-[1.15fr_1fr] gap-2.5 sm:gap-4 items-start">

            {/* Left Column: Bride Window + Name on top + Shah Wooden Sign */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center"
            >
              {/* Bride Name on Top of Window */}
              <div className="text-center mb-1.5 select-none">
                <span className="font-josefin text-[9px] sm:text-[10px] tracking-[0.2em] text-[#6E8752] uppercase font-bold block mb-0.5">
                  THE BRIDE
                </span>
                <h3 className="font-bodoni text-sm sm:text-base text-[#2B1B12] font-semibold tracking-wide">
                  Dhriti Kalpesh Shah
                </h3>
                <div className="w-6 h-0.5 bg-[#B8860B] mx-auto mt-1 rounded-full" />
              </div>

              {/* Bride Window */}
              <div className="w-full relative z-10">
                <img
                  src="/images/bride-window.png"
                  alt="Dhriti - The Bride looking out from arched window"
                  className="w-full h-auto object-contain filter drop-shadow-[0_12px_24px_rgba(40,25,14,0.22)] select-none pointer-events-none"
                />
              </div>

              {/* Shah Wooden Sign: Hanging directly from windowsill */}
              <div className="w-[92%] -mt-11 sm:-mt-14 relative z-20">
                <img
                  src="/images/shah-family-board.png?v=crop"
                  alt="The Shah Family Wooden Sign"
                  className="w-full h-auto object-contain filter drop-shadow-[0_4px_10px_rgba(40,25,14,0.22)] select-none pointer-events-none"
                />
              </div>
            </motion.div>

            {/* Right Column: Vintage Lantern + Tall Shah Family Parchment Card */}
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex flex-col items-center pt-3 sm:pt-4"
            >
              {/* Tall Parchment Card Container with Overhanging Corner Lantern */}
              <div className="w-full relative aspect-[928/1100] flex items-center justify-center filter drop-shadow-[0_4px_14px_rgba(40,25,14,0.12)] select-none">

                {/* Vintage Lantern hanging at top-left edge of the parchment card */}
                <div className="absolute -top-10 sm:-top-12 left-0 sm:left-1 z-20 w-12 sm:w-[60px] filter drop-shadow-[0_4px_10px_rgba(40,25,14,0.24)] select-none pointer-events-none">
                  <img
                    src="/images/vintage-lantern.png"
                    alt="Vintage Lantern"
                    className="w-full h-auto object-contain"
                  />
                </div>

                {/* Tall Deckled Parchment Card */}
                <img
                  src="/images/family-card-parchment-tall.png"
                  alt="The Shah Family Lineage Card"
                  className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none"
                />

                {/* Family Lineage Text: Plentiful height, zero overflow */}
                <div className="relative z-10 w-[84%] h-[88%] flex flex-col justify-center items-center text-center px-1 py-1">
                  {/* Grandparents */}
                  <div className="mb-1 sm:mb-1.5">
                    <span className="font-josefin text-[7.5px] sm:text-[9px] tracking-[0.16em] text-[#7A5C28] uppercase font-bold block mb-0.5">
                      {shahFamily.grandparentsLabel}
                    </span>
                    <div className="font-bodoni text-[10px] sm:text-[11.5px] text-[#24170E] font-medium leading-[1.2] space-y-0.5">
                      {shahFamily.grandparents.map((name, i) => (
                        <p key={i}>{name}</p>
                      ))}
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="flex items-center justify-center gap-1 my-1">
                    <div className="w-5 h-px bg-[#C8A25D]/50" />
                    <span className="text-[6px] text-[#9E7B35]">❖</span>
                    <div className="w-5 h-px bg-[#C8A25D]/50" />
                  </div>

                  {/* Parents */}
                  <div className="mb-1 sm:mb-1.5">
                    <span className="font-josefin text-[7.5px] sm:text-[9px] tracking-[0.16em] text-[#7A5C28] uppercase font-bold block mb-0.5">
                      {shahFamily.parentsLabel}
                    </span>
                    <div className="font-bodoni text-[10px] sm:text-[11.5px] text-[#24170E] font-medium leading-[1.2] space-y-0.5">
                      {shahFamily.parents.map((name, i) => (
                        <p key={i}>{name}</p>
                      ))}
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="flex items-center justify-center gap-1 my-1">
                    <div className="w-5 h-px bg-[#C8A25D]/50" />
                    <span className="text-[6px] text-[#9E7B35]">❖</span>
                    <div className="w-5 h-px bg-[#C8A25D]/50" />
                  </div>

                  {/* Sibling */}
                  <div>
                    <span className="font-josefin text-[7.5px] sm:text-[9px] tracking-[0.16em] text-[#7A5C28] uppercase font-bold block mb-0.5">
                      {shahFamily.siblingsLabel}
                    </span>
                    <div className="font-bodoni text-[10px] sm:text-[11.5px] text-[#24170E] font-medium leading-[1.2]">
                      {shahFamily.siblings.map((name, i) => (
                        <p key={i}>{name}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>

          {/* -------------------------------------------------------------- */}
          {/* MID-SECTION FLIGHT PATH (Weaving across blocks with plane)     */}
          {/* -------------------------------------------------------------- */}
          <div className="relative w-full max-w-[190px] sm:max-w-[220px] mx-auto -mt-13 -mb-6 sm:-mt-15 sm:-mb-7 pointer-events-none select-none z-0">
            <img
              src="/images/flight-path-mobile.png"
              alt="Flight trail connecting families"
              className="w-full h-auto object-contain opacity-90 filter drop-shadow-[0_2px_4px_rgba(40,25,14,0.08)]"
            />
          </div>

          {/* -------------------------------------------------------------- */}
          {/* BLOCK 2: GROOM SIDE (Tall Parchment Left, Window Right)        */}
          {/* -------------------------------------------------------------- */}
          <div className="grid grid-cols-[1fr_1.15fr] gap-2.5 sm:gap-4 items-start">

            {/* Left Column: Vintage Lantern + Tall Mehta Family Parchment Card */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center pt-3 sm:pt-4"
            >
              {/* Tall Parchment Card Container with Overhanging Corner Lantern */}
              <div className="w-full relative aspect-[928/1100] flex items-center justify-center filter drop-shadow-[0_4px_14px_rgba(40,25,14,0.12)] select-none">

                {/* Vintage Lantern hanging at top-left edge of the parchment card */}
                <div className="absolute -top-10 sm:-top-12 left-0 sm:left-1 z-20 w-12 sm:w-[60px] filter drop-shadow-[0_4px_10px_rgba(40,25,14,0.24)] select-none pointer-events-none">
                  <img
                    src="/images/vintage-lantern.png"
                    alt="Vintage Lantern"
                    className="w-full h-auto object-contain"
                  />
                </div>

                {/* Tall Deckled Parchment Card */}
                <img
                  src="/images/family-card-parchment-tall.png"
                  alt="The Mehta Family Lineage Card"
                  className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none"
                />

                {/* Family Lineage Text: Plentiful height, zero overflow */}
                <div className="relative z-10 w-[84%] h-[88%] flex flex-col justify-center items-center text-center px-1 py-1">
                  {/* Grandparents */}
                  <div className="mb-1 sm:mb-1.5">
                    <span className="font-josefin text-[7.5px] sm:text-[9px] tracking-[0.16em] text-[#7A5C28] uppercase font-bold block mb-0.5">
                      {mehtaFamily.grandparentsLabel}
                    </span>
                    <div className="font-bodoni text-[10px] sm:text-[11.5px] text-[#24170E] font-medium leading-[1.2] space-y-0.5">
                      {mehtaFamily.grandparents.map((name, i) => (
                        <p key={i}>{name}</p>
                      ))}
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="flex items-center justify-center gap-1 my-1">
                    <div className="w-5 h-px bg-[#C8A25D]/50" />
                    <span className="text-[6px] text-[#9E7B35]">❖</span>
                    <div className="w-5 h-px bg-[#C8A25D]/50" />
                  </div>

                  {/* Parents */}
                  <div className="mb-1 sm:mb-1.5">
                    <span className="font-josefin text-[7.5px] sm:text-[9px] tracking-[0.16em] text-[#7A5C28] uppercase font-bold block mb-0.5">
                      {mehtaFamily.parentsLabel}
                    </span>
                    <div className="font-bodoni text-[10px] sm:text-[11.5px] text-[#24170E] font-medium leading-[1.2] space-y-0.5">
                      {mehtaFamily.parents.map((name, i) => (
                        <p key={i}>{name}</p>
                      ))}
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="flex items-center justify-center gap-1 my-1">
                    <div className="w-5 h-px bg-[#C8A25D]/50" />
                    <span className="text-[6px] text-[#9E7B35]">❖</span>
                    <div className="w-5 h-px bg-[#C8A25D]/50" />
                  </div>

                  {/* Sibling */}
                  <div>
                    <span className="font-josefin text-[7.5px] sm:text-[9px] tracking-[0.16em] text-[#7A5C28] uppercase font-bold block mb-0.5">
                      {mehtaFamily.siblingsLabel}
                    </span>
                    <div className="font-bodoni text-[10px] sm:text-[11.5px] text-[#24170E] font-medium leading-[1.2]">
                      {mehtaFamily.siblings.map((name, i) => (
                        <p key={i}>{name}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Groom Window + Name on top + Mehta Wooden Sign */}
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex flex-col items-center"
            >
              {/* Groom Name on Top of Window */}
              <div className="text-center mb-1.5 select-none">
                <span className="font-josefin text-[9px] sm:text-[10px] tracking-[0.2em] text-[#6E8752] uppercase font-bold block mb-0.5">
                  THE GROOM
                </span>
                <h3 className="font-bodoni text-sm sm:text-base text-[#2B1B12] font-semibold tracking-wide">
                  Soham Manish Mehta
                </h3>
                <div className="w-6 h-0.5 bg-[#B8860B] mx-auto mt-1 rounded-full" />
              </div>

              {/* Groom Window: Identical Dimension to Bride Window */}
              <div className="w-full relative z-10">
                <img
                  src="/images/groom-window.png"
                  alt="Soham - The Groom looking out from arched window"
                  className="w-full h-auto object-contain filter drop-shadow-[0_12px_24px_rgba(40,25,14,0.22)] select-none pointer-events-none"
                />
              </div>

              {/* Mehta Wooden Sign: Hanging directly from windowsill */}
              <div className="w-[92%] -mt-11 sm:-mt-14 relative z-20">
                <img
                  src="/images/mehta-family-board.png?v=crop"
                  alt="The Mehta Family Wooden Sign"
                  className="w-full h-auto object-contain filter drop-shadow-[0_4px_10px_rgba(40,25,14,0.22)] select-none pointer-events-none"
                />
              </div>
            </motion.div>

          </div>

        </div>

        {/* ================================================================ */}
        {/* BOTTOM ACCENT: 2X REDUCED ARCHITECTURAL SKETCH & CROSSING QUOTE  */}
        {/* ================================================================ */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 sm:mt-16 text-center flex flex-col items-center"
        >
          {/* Romantic Script */}
          <p className="font-beau italic text-xl sm:text-2xl lg:text-3xl text-[#C43A6B] tracking-wide mb-1 sm:mb-2">
            And paths begin to merge.....
          </p>

          {/* Mumbai meets Manhattan Silhouette: Balanced architectural sketch vignette */}
          <div className="w-full max-w-[340px] sm:max-w-[440px] lg:max-w-[560px] xl:max-w-[620px] mx-auto my-2 select-none pointer-events-none px-2">
            <img
              src="/images/mumbai-manhattan-skyline.png"
              alt="Mumbai meets Manhattan - Taj Mahal Palace, Gateway of India, CST to Brooklyn Bridge and Manhattan Skyline"
              className="w-full h-auto object-contain mx-auto filter drop-shadow-[0_2px_6px_rgba(40,25,14,0.08)]"
            />
          </div>

          {/* Journey Kicker */}
          <span className="font-josefin text-[10px] sm:text-xs tracking-[0.25em] text-[#6E8752] uppercase font-bold block mt-1 sm:mt-2">
            MUMBAI MEETS MANHATTAN • FEBRUARY 2027
          </span>
        </motion.div>

      </div>
    </section>
  );
}
