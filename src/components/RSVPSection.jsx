/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Section 6: Wedding RSVP (Split Section: Torn Parchment Left, #F6E6CD Right)
 * 
 * Layout Architecture:
 * - Section Background: #F6E6CD (warm sand/beige tone matching Section 3).
 * - Left 50% (Desktop) / Top (Mobile): Authentic torn parchment paper section background
 *   with royal letterhead, wax seal crest, and wedding invitation heading.
 * - Right 50% (Desktop) / Bottom (Mobile): #F6E6CD background with boxed form fields
 *   (Full Name, Attending Yes/No, Message).
 * - Exactly same split layout as the Note section, reversed.
 * - Zero unnecessary emojis.
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { useLanguage } from '../context/LanguageContext.jsx';
import { submitRsvp } from '../services/api.js';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';

export default function RSVPSection() {
  const { t } = useLanguage();

  const [fullName, setFullName] = useState('');
  const [isAttending, setIsAttending] = useState(true);
  const [message, setMessage] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setErrorMsg('Please enter your full name');
      return;
    }

    setErrorMsg('');
    setIsSubmitting(true);

    try {
      await submitRsvp({
        name: fullName.trim(),
        attending: isAttending,
        message: message.trim(),
      });

      setIsSuccess(true);

      // Subtle celebration confetti
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#FDE08A', '#C43A6B', '#FFFDF8'],
      });
    } catch (err) {
      console.error('RSVP submit error:', err);
      setErrorMsg(t.rsvp?.errorNotice || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFullName('');
    setIsAttending(true);
    setMessage('');
    setIsSuccess(false);
  };

  return (
    <section id="rsvp" className="relative w-full overflow-hidden bg-[#F6E6CD]">
      
      {/* ============================================================== */}
      {/* 1. DESKTOP LEFT 50% TORN PARCHMENT SECTION BACKGROUND          */}
      {/* Mirror reverse of the Note section: paper covers the left side  */}
      {/* with its torn deckled edge overlapping past 50% onto #F6E6CD   */}
      {/* ============================================================== */}
      <div className="hidden lg:block absolute -top-1 -bottom-1 left-0 right-[calc(50%-1.5rem)] z-0 overflow-hidden pointer-events-none select-none">
        <img
          src="/images/parchment-desktop-torn.png"
          alt="Torn Parchment Background"
          className="w-full h-full object-cover object-left scale-x-[-1] select-none filter drop-shadow-[0_8px_24px_rgba(40,25,14,0.18)]"
        />
      </div>

      {/* ============================================================== */}
      {/* 2. SPLIT SECTION CONTENT GRID (2 Equal Columns on Desktop)     */}
      {/* ============================================================== */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 relative z-10">
        
        {/* ============================================================== */}
        {/* LEFT COLUMN: THE HEADING & LETTERHEAD (Torn Parchment)         */}
        {/* ============================================================== */}
        <div className="relative w-full flex flex-col justify-center items-center lg:items-end pt-12 sm:pt-16 lg:pt-24 pb-10 sm:pb-14 lg:pb-24 px-6 sm:px-10 lg:px-12 xl:px-16">
          
          {/* Mobile Parchment Background for Left Column */}
          <div className="lg:hidden absolute -top-1 inset-x-0 -bottom-1 z-0 overflow-hidden pointer-events-none select-none">
            <img
              src="/images/parchment-mobile-torn.png"
              alt="Torn Parchment Background"
              className="w-full h-full object-cover object-center select-none"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-md xl:max-w-lg lg:mr-4 xl:mr-10 text-center lg:text-left flex flex-col items-center lg:items-start"
          >
            {/* Royal Wax Seal Crest */}
            <div className="w-14 h-14 sm:w-16 sm:h-16 mb-2.5 filter drop-shadow-[0_4px_12px_rgba(40,25,14,0.22)]">
              <img
                src="/new/wax-seal.png"
                alt="Dhriti & Soham Royal Wax Seal"
                className="w-full h-full object-contain"
                loading="lazy"
              />
            </div>

            <span className="font-josefin text-xs tracking-[0.25em] text-[#7A5229] uppercase font-bold block mb-1">
              {t.rsvp?.kicker || 'KINDLY FAVOR US WITH YOUR REPLY'}
            </span>

            <h2 className="font-bodoni text-2xl sm:text-3xl lg:text-4xl text-[#2B1B12] mt-1 font-medium tracking-wide">
              {t.rsvp?.title || 'Will You Join Our Celebration?'}
            </h2>

            <div className="w-12 h-0.5 bg-[#B8860B] my-3 rounded-full mx-auto lg:mx-0 shadow-xs" />

            <p className="font-beau italic text-2xl sm:text-3xl text-[#C43A6B] tracking-wide">
              our forever begins
            </p>
          </motion.div>
        </div>

        {/* ============================================================== */}
        {/* RIGHT COLUMN: THE FORM (Boxed Fields on #F6E6CD)               */}
        {/* Note: pb-32 on mobile gives dedicated clearance above the     */}
        {/* floating bottom navigation dock (which sits at fixed bottom-3) */}
        {/* ============================================================== */}
        <div className="w-full pt-8 sm:pt-12 lg:pt-24 pb-32 sm:pb-28 lg:pb-24 px-6 sm:px-10 lg:px-12 xl:px-16 flex flex-col justify-center items-center lg:items-start">
          <div className="w-full max-w-md xl:max-w-lg lg:ml-4 xl:ml-10">
            
            <AnimatePresence mode="wait">
              {!isSuccess ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-5 font-josefin w-full"
                >
                  {/* FIELD 1: Full Name (Boxed Input) */}
                  <div>
                    <label className="text-xs font-bold uppercase tracking-[0.22em] text-[#7A5229] block mb-1.5">
                      {t.rsvp?.nameLabel || 'Your Full Name'}
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder={t.rsvp?.namePlaceholder || 'e.g. Aakash & Ritu Shah'}
                      className="w-full min-h-[48px] px-4 py-3 rounded-xl border border-[#D4AF37]/50 bg-[#FFFDF8] text-sm sm:text-base text-[#2B1B12] placeholder-[#A08872]/60 focus:outline-none focus:border-[#C43A6B] focus:ring-2 focus:ring-[#C43A6B]/20 focus:bg-white transition-all shadow-xs"
                    />
                  </div>

                  {/* FIELD 2: Attending (Yes or No - Boxed Options) */}
                  <div>
                    <label className="text-xs font-bold uppercase tracking-[0.22em] text-[#7A5229] block mb-2">
                      {t.rsvp?.attendingLabel || 'Are you attending?'}
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setIsAttending(true)}
                        className={`min-h-[50px] p-3 rounded-xl border transition-all flex items-center justify-between cursor-pointer text-left ${
                          isAttending
                            ? 'bg-[#FCE8F0] border-2 border-[#C43A6B] text-[#8B264A] shadow-xs'
                            : 'bg-[#FFFDF8] border border-[#D4AF37]/40 hover:border-[#D4AF37] text-[#5C4028]'
                        }`}
                      >
                        <div>
                          <span className={`block font-bodoni font-bold text-sm sm:text-base leading-tight ${isAttending ? 'text-[#8B264A]' : 'text-[#2B1B12]'}`}>
                            {t.rsvp?.yes || 'Joyfully Accepts'}
                          </span>
                          <span className="block font-beau italic text-sm text-[#C43A6B] leading-none mt-0.5">
                            attending with pleasure
                          </span>
                        </div>
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
                          isAttending ? 'border-[#C43A6B] bg-[#C43A6B] text-white shadow-xs' : 'border-[#C8A870]/60'
                        }`}>
                          {isAttending && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setIsAttending(false)}
                        className={`min-h-[50px] p-3 rounded-xl border transition-all flex items-center justify-between cursor-pointer text-left ${
                          !isAttending
                            ? 'bg-[#EFE7DC] border-2 border-[#5C4028] text-[#2B1B12] shadow-xs'
                            : 'bg-[#FFFDF8] border border-[#D4AF37]/40 hover:border-[#D4AF37] text-[#5C4028]'
                        }`}
                      >
                        <div>
                          <span className={`block font-bodoni font-bold text-sm sm:text-base leading-tight ${!isAttending ? 'text-[#2B1B12]' : 'text-[#2B1B12]'}`}>
                            {t.rsvp?.no || 'Regretfully Declines'}
                          </span>
                          <span className="block font-beau italic text-sm text-[#7A5A36] leading-none mt-0.5">
                            celebrating in spirit
                          </span>
                        </div>
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
                          !isAttending ? 'border-[#5C4028] bg-[#5C4028] text-white shadow-xs' : 'border-[#C8A870]/60'
                        }`}>
                          {!isAttending && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* FIELD 3: Message (Boxed Textarea) */}
                  <div>
                    <label className="text-xs font-bold uppercase tracking-[0.22em] text-[#7A5229] block mb-1.5">
                      {t.rsvp?.messageLabel || 'A Note for Dhriti & Soham'}
                    </label>
                    <textarea
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={t.rsvp?.messagePlaceholder || 'Write your personal note for the couple...'}
                      className="w-full p-3.5 rounded-xl border border-[#D4AF37]/50 bg-[#FFFDF8] text-sm text-[#2B1B12] placeholder-[#A08872]/60 focus:outline-none focus:border-[#C43A6B] focus:ring-2 focus:ring-[#C43A6B]/20 focus:bg-white transition-all resize-none shadow-xs leading-relaxed"
                    />
                  </div>

                  {/* Error Notice */}
                  {errorMsg && (
                    <div className="p-3 rounded-lg bg-rose-50 border border-rose-300 text-xs text-rose-800 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  {/* Submit Button */}
                  <div className="pt-1 pb-4 md:pb-0">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full min-h-[50px] sm:min-h-[52px] rounded-xl bg-[#2B1B12] hover:bg-[#3D2517] disabled:opacity-60 text-[#FDE08A] hover:text-white font-josefin text-xs sm:text-sm font-bold tracking-[0.22em] uppercase border border-[#D4AF37]/60 shadow-md transition-all active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <span>{t.rsvp?.submitting || 'Submitting...'}</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4 text-[#FDE08A]" />
                          <span>{t.rsvp?.submit || 'CONFIRM RSVP'}</span>
                        </>
                      )}
                    </button>
                  </div>
                </motion.form>
              ) : (
                /* ============================================================== */
                /* SUCCESS CONFIRMATION                                           */
                /* ============================================================== */
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-6 text-center lg:text-left flex flex-col items-center lg:items-start font-josefin w-full"
                >
                  <div className="w-12 h-12 rounded-full border-2 border-[#B8860B] flex items-center justify-center mb-3 text-[#C43A6B] bg-[#FFFDF8] shadow-xs">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>

                  <h3 className="font-bodoni font-bold text-2xl sm:text-3xl text-[#2B1B12]">
                    {t.rsvp?.successTitle || 'RSVP Received'}
                  </h3>

                  <p className="font-beau italic text-2xl sm:text-3xl text-[#C43A6B] mt-0.5">
                    Dhriti &amp; Soham
                  </p>

                  <div className="w-12 h-0.5 bg-[#B8860B] my-2 rounded-full shadow-xs" />

                  <p className="text-xs sm:text-sm text-[#5C4028] max-w-sm mt-1 leading-relaxed">
                    {isAttending
                      ? 'We are delighted and look forward to celebrating with you in Mumbai.'
                      : 'Thank you for letting us know. You will be missed.'}
                  </p>

                  <div className="mt-4 p-4 rounded-xl border border-[#D4AF37]/50 bg-[#FFFDF8] shadow-xs w-full max-w-sm text-xs text-[#2B1B12] flex items-center justify-between">
                    <span className="font-bold">{fullName}</span>
                    <span className={`px-2 py-0.5 rounded-full font-semibold ${isAttending ? 'bg-[#FCE8F0] text-[#C43A6B]' : 'bg-[#EFE7DC] text-[#5C4028]'}`}>
                      {isAttending ? 'Joyfully Accepts' : 'Regretfully Declines'}
                    </span>
                  </div>

                  <button
                    onClick={resetForm}
                    className="mt-5 pb-4 md:pb-0 text-xs font-semibold text-[#7A5229] hover:text-[#2B1B12] underline cursor-pointer"
                  >
                    Submit another response
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>

      </div>
    </section>
  );
}
