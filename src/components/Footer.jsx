/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Application Footer
 * Sleek two-column footer bar:
 * - Left: "Made with some Love, Magic and Drama by #SoDrimatic."
 * - Right: "© {currentYear} #SoDrimatic. All rights reserved."
 * - Mobile ergonomics: bottom-padding clears the floating bottom navigation dock.
 */

import React from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';

export default function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full bg-[#1E1510] text-[#E8DFD5] border-t border-[#D4AF37]/35 overflow-hidden">
      {/* Subtle Warm Amber Glow Behind */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-20 bg-[#D4AF37]/5 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-5 pb-24 sm:pb-5 md:pb-5 relative z-10 flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-4 text-center sm:text-left">
        {/* Left Side: Tagline */}
        <p className="font-josefin text-xs sm:text-sm text-[#F4ECE1] tracking-wide leading-relaxed">
          Made with some Love, Magic and Drama by{' '}
          <span className="text-[#D4AF37] font-semibold">#SoDrimatic</span>.
        </p>

        {/* Right Side: Dynamic Copyright */}
        <p className="font-josefin text-xs sm:text-[13px] text-[#A89886] tracking-wider shrink-0">
          © {currentYear} #SoDrimatic. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
