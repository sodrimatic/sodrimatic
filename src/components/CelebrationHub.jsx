/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Celebration Lounge & Interactive Hub
 * Unifies Tug of War, Shower of Blessings, and Memory Wall into a single,
 * cohesive, mobile-friendly interactive section positioned above RSVP.
 * 
 * Theme:
 * - Solid Sage Green background (#849678, matching note/chat section)
 * - Inset untorn parchment paper container framing all 3 tabs with elegant borders
 * - Preserved tab switcher, clean wooden titles, and harmonious responsive typography
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext.jsx';
import TugOfWar from './TugOfWar.jsx';
import BlessingsSection from './BlessingsSection.jsx';
import MemoryWall from './MemoryWall.jsx';
import { Trophy, Heart, Camera } from 'lucide-react';

export default function CelebrationHub() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('tug'); // 'tug' | 'blessings' | 'gallery'

  // Synchronize active tab with URL hash anchors (#cheer, #blessings, #gallery)
  useEffect(() => {
    const handleHashSync = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#cheer' || hash === '#tug') {
        setActiveTab('tug');
      } else if (hash === '#blessings') {
        setActiveTab('blessings');
      } else if (hash === '#gallery' || hash === '#memories') {
        setActiveTab('gallery');
      }
    };

    handleHashSync();
    window.addEventListener('hashchange', handleHashSync);
    return () => window.removeEventListener('hashchange', handleHashSync);
  }, []);

  const tabs = [
    {
      id: 'tug',
      label: t.celebrationHub?.tabTugOfWar || 'Tug of War',
      mobileLabel: 'Tug of War',
      icon: Trophy,
      hash: '#cheer',
    },
    {
      id: 'blessings',
      label: t.celebrationHub?.tabBlessings || 'Shower of Blessings',
      mobileLabel: 'Blessings',
      icon: Heart,
      hash: '#blessings',
    },
    {
      id: 'gallery',
      label: t.celebrationHub?.tabGallery || 'Memory Wall',
      mobileLabel: 'Memories',
      icon: Camera,
      hash: '#gallery',
    },
  ];

  const handleTabClick = (tab) => {
    setActiveTab(tab.id);
    if (window.history.replaceState) {
      window.history.replaceState(null, '', tab.hash);
    }
  };

  return (
    <section id="celebrate" className="relative p-0 md:p-[20px] bg-[#849678] overflow-hidden">
      
      {/* Wrapper */}
      <div className="relative w-full">
        
        {/* Parchment background for Desktop Only (>= 768px): Mobile keeps strictly the pure green background */}
        <div className="hidden md:block absolute inset-0 w-full h-full pointer-events-none select-none z-0">
          <img
            src="/images/parchment-lounge-hd.png"
            alt="Torn Parchment Background"
            className="w-full h-full object-fill filter drop-shadow-[0_10px_28px_rgba(25,18,10,0.28)]"
          />
        </div>

        {/* Content Layered Comfortably Inside */}
        <div className="relative z-10 px-4 sm:px-10 md:px-14 pt-8 sm:pt-16 md:pt-20 pb-10 sm:pb-16 max-w-5xl mx-auto">

          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-5 sm:mb-6"
          >
            <span className="font-josefin text-xs tracking-[0.25em] text-[#FDE08A] md:text-[#55693C] uppercase font-bold block mb-1 drop-shadow-xs md:drop-shadow-none">
              {t.celebrationHub?.kicker || 'THE CELEBRATION LOUNGE'}
            </span>
            <h2 className="font-bodoni text-3xl sm:text-4xl lg:text-5xl text-white md:text-[#2B1B12] font-semibold tracking-wide drop-shadow-xs md:drop-shadow-none">
              {t.celebrationHub?.title || 'Celebration Lounge'}
            </h2>
            <div className="w-12 h-0.5 bg-[#FDE08A] md:bg-[#B8860B] mx-auto my-1.5 rounded-full shadow-xs" />
            <p className="font-beau italic text-xl sm:text-2xl lg:text-3xl text-[#FCE7F3] md:text-[#C43A6B] mt-0.5 max-w-xl mx-auto px-2">
              {t.celebrationHub?.subtitle || 'Cheer for the couple, shower your blessings, and explore our memory wall ♡'}
            </p>
          </motion.div>

          {/* Step 2: Segmented 3-Tab Control Switcher (Tab ideas strictly preserved) */}
          <motion.div
            initial={{ opacity: 0, y: 14, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-lg mx-auto mb-6 sm:mb-7 px-1"
          >
            <div className="grid grid-cols-3 gap-1 sm:gap-2 p-1 sm:p-1.5 bg-[#F4ECE1]/90 backdrop-blur-md rounded-2xl border border-[#C8A870]/70 shadow-sm">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;

                return (
                  <button
                    key={tab.id}
                    onClick={() => handleTabClick(tab)}
                    className={`min-h-[44px] sm:min-h-[48px] px-1 sm:px-4 py-2 rounded-xl font-josefin text-xs sm:text-sm font-bold tracking-wider transition-all duration-300 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 cursor-pointer select-none text-center ${
                      isActive
                        ? 'bg-[#849678] text-white shadow-sm'
                        : 'text-[#2B1B12] hover:text-[#C43A6B] hover:bg-white/40'
                    }`}
                    aria-label={tab.label}
                    aria-pressed={isActive}
                  >
                    <Icon className={`w-4 h-4 sm:w-4 sm:h-4 shrink-0 ${isActive ? 'text-white' : 'text-[#55693C]'}`} />
                    <span className="hidden sm:inline truncate">{tab.label}</span>
                    <span className="sm:hidden text-[10px] leading-tight truncate">{tab.mobileLabel}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Active Tab Interactive Content with Instant Tab Switching & State Preservation */}
          <div className="w-full">
            <div className={activeTab === 'tug' ? 'w-full block animate-in fade-in duration-300' : 'hidden'}>
              <TugOfWar embedded={true} isActive={activeTab === 'tug'} />
            </div>

            <div className={activeTab === 'blessings' ? 'w-full block animate-in fade-in duration-300' : 'hidden'}>
              <BlessingsSection embedded={true} isActive={activeTab === 'blessings'} />
            </div>

            <div className={activeTab === 'gallery' ? 'w-full block animate-in fade-in duration-300' : 'hidden'}>
              <MemoryWall embedded={true} isActive={activeTab === 'gallery'} />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
