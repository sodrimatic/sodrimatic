/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Top Bar & Mobile Floating Bottom Navigation Pane
 * 
 * - Desktop: Sticky top header with links, Replay icon, and RSVP button.
 * - Mobile:
 *   - Clean top bar: D&S wordmark + Replay invitation (No hamburger icon).
 *   - Floating Bottom Navigation Pane: High-credibility frosted glass dock with intuitive icons
 *     for Home, Story, Details (Venue/Date), People, Celebrate, and a highlighted RSVP action pill.
 */

import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';
import {
  Home,
  BookOpen,
  MapPin,
  Users,
  Sparkles,
  Heart,
  Mail,
} from 'lucide-react';

export default function Navbar({ onReplayIntro }) {
  const { t } = useLanguage();
  const [activeSection, setActiveSection] = useState('home');

  // Desktop Navigation Links
  const navLinks = [
    { href: '#home', label: t.nav.home },
    { href: '#story', label: t.nav.ourStory },
    { href: '#scratch', label: t.nav.details || 'DETAILS' },
    { href: '#people', label: t.nav.meetUs },
    { href: '#celebrate', label: t.nav.celebrate || 'CELEBRATION' },
  ];

  // Mobile Bottom Navigation Items
  const mobileNavItems = [
    { href: '#home', id: 'home', label: 'Home', icon: Home },
    { href: '#story', id: 'story', label: 'Story', icon: BookOpen },
    { href: '#scratch', id: 'scratch', label: 'Details', icon: MapPin },
    { href: '#people', id: 'people', label: 'People', icon: Users },
    { href: '#celebrate', id: 'celebrate', label: 'Celebrate', icon: Sparkles },
    { href: '#rsvp', id: 'rsvp', label: 'RSVP', icon: Heart, isRsvp: true },
  ];

  // Active section scroll spy
  useEffect(() => {
    const handleScrollSpy = () => {
      const scrollPos = window.scrollY + window.innerHeight * 0.35;
      const sectionIds = ['rsvp', 'celebrate', 'people', 'scratch', 'story', 'home'];

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScrollSpy, { passive: true });
    handleScrollSpy();
    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();

    if (href === '#venue') {
      const target = document.querySelector('#scratch');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    if (href === '#cheer' || href === '#blessings' || href === '#gallery') {
      window.location.hash = href;
      const target = document.querySelector('#celebrate');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* ============================================================== */}
      {/* TOP BAR: DESKTOP & MOBILE HEADER                               */}
      {/* ============================================================== */}
      <header className="sticky top-0 z-40 h-14 bg-[#F7F8E8]/90 backdrop-blur-md border-b border-[#D7E4B8]/70 px-4 sm:px-6 transition-colors">
        <div className="max-w-7xl mx-auto h-full flex items-center justify-between">
          {/* Brand Wordmark */}
          <div className="flex items-center gap-2">
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, '#home')}
              className="font-bodoni font-bold text-xl sm:text-2xl tracking-widest text-[#3E4F2A] hover:text-[#C43A6B] transition-colors flex items-center gap-1.5"
            >
              <span>{t.nav.brand}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#D86C9A]" />
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-xs lg:text-sm font-josefin font-medium tracking-wider text-[#3E4F2A]">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="hover:text-[#C43A6B] transition-colors relative py-1 hover:underline underline-offset-4 decoration-[#D86C9A]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Top Actions: Replay Icon & Desktop RSVP Button */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Replay Invitation Icon Button */}
            {onReplayIntro && (
              <button
                onClick={onReplayIntro}
                title={t.intro?.replay || "Replay Invitation"}
                className="flex min-h-[44px] min-w-[44px] items-center justify-center text-xs text-[#7DA457] hover:text-[#C43A6B] transition-colors cursor-pointer"
                aria-label="Replay Invitation"
              >
                <Mail className="w-4 h-4" />
              </button>
            )}

            {/* Desktop Primary RSVP Action Button */}
            <a
              href="#rsvp"
              onClick={(e) => handleNavClick(e, '#rsvp')}
              className="hidden md:flex min-h-[44px] px-4 py-2 rounded-full bg-[#D86C9A] hover:bg-[#C43A6B] text-white text-xs sm:text-sm font-josefin font-semibold tracking-wider transition-all items-center gap-1.5 shadow-sm soft-glow-pink active:scale-95 cursor-pointer"
            >
              <Heart className="w-3.5 h-3.5 fill-current" />
              <span>{t.nav.rsvp}</span>
            </a>
          </div>
        </div>
      </header>

      {/* ============================================================== */}
      {/* MOBILE FLOATING BOTTOM NAVIGATION PANE                         */}
      {/* ============================================================== */}
      <nav
        aria-label="Mobile Navigation Dock"
        className="md:hidden fixed bottom-3 inset-x-3 z-40 max-w-md mx-auto"
      >
        <div className="bg-white/95 backdrop-blur-md rounded-2xl border border-[#D4B458]/45 shadow-[0_8px_30px_rgba(0,0,0,0.14)] p-1.5 flex items-center justify-between gap-1">
          {mobileNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;

            if (item.isRsvp) {
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="min-h-[44px] px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#D86C9A] to-[#C43A6B] text-white font-josefin text-xs font-bold tracking-wider flex items-center gap-1.5 shadow-sm active:scale-95 transition-transform shrink-0"
                >
                  <Icon className="w-3.5 h-3.5 fill-current animate-pulse" />
                  <span>RSVP</span>
                </a>
              );
            }

            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`min-h-[44px] flex-1 py-1 px-1 rounded-xl flex flex-col items-center justify-center transition-all ${
                  isActive
                    ? 'text-[#C43A6B] bg-[#FDF2F7]'
                    : 'text-[#3E4F2A] hover:text-[#C43A6B]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
                <span className={`text-[9px] font-josefin tracking-wider uppercase mt-0.5 leading-none ${isActive ? 'font-bold' : 'font-medium'}`}>
                  {item.label}
                </span>
              </a>
            );
          })}
        </div>
      </nav>
    </>
  );
}
