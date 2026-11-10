/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Centralized Theme & Design Tokens for Dhriti & Soham Wedding Application.
 * Single source of truth for color palette, typography, breakpoints, and shadows.
 * Based on the Brand Guide:
 * - 35% Soft Ivory (#F7F8E8) - Canvas background
 * - 15% Fresh Leaf (#D7E4B8) - Surface/sections
 * - 8% Botanical Green (#B7C987) - Secondary surface
 * - 6% Natural Green (#7DA457) - Text, dividers, icons
 * - 10% Lotus Pink (#F3A1C3) - Primary action/buttons
 * - 8% Magenta Pink (#D86C9A) - Secondary accents & hover
 * - 6% Rich Pink (#C43A6B) - High-priority highlights
 * - 4% Marigold Yellow (#FDE08A) - Warm accents
 * - 3% Warm Gold (#D4B458) - Borders & detail foil
 * - 1% Sand Beige (#E6DCC7) - Soft cards & subtle sections
 */

export const themeConfig = {
  colors: {
    // Primary Canvas & Greens
    ivory: '#F7F8E8',
    freshLeaf: '#D7E4B8',
    botanical: '#B7C987',
    naturalGreen: '#7DA457',
    forest: '#3E4F2A',

    // Pinks & Accents
    lotusPink: '#F3A1C3',
    magentaPink: '#D86C9A',
    richPink: '#C43A6B',

    // Golds & Neutrals
    marigold: '#FDE08A',
    warmGold: '#D4B458',
    sandBeige: '#E6DCC7',

    // Text Semantics
    text: {
      heading: '#3E4F2A',
      body: '#6E8E3E',
      caption: '#9FB77A',
      interactive: '#D86C9A',
      highlight: '#C43A6B',
      disabled: '#A89E82',
    },

    // Background Semantics
    bg: {
      main: '#F7F8E8',
      card: '#FFFFFF',
      cardAlt: '#E6DCC7',
      surface: '#D7E4B8',
      secondary: '#B7C987',
    }
  },

  fonts: {
    // Romantic display accent (Couple names, special statements)
    beauRivage: "'Beau Rivage', cursive",
    // Editorial headings (Section titles, event titles, numerals)
    bodoniModa: "'Bodoni Moda', Georgia, serif",
    // UI, navigation, body, buttons, stepper
    josefinSans: "'Josefin Sans', sans-serif",
  },

  // Mobile-first touch targets & ergonomics
  touch: {
    minTarget: '44px',
    primaryCta: '48px',
    hitboxExpanded: '52px',
  },

  // Spatial radius tokens
  radius: {
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '20px',
    '2xl': '24px',
    pill: '9999px',
  },

  // Shadows
  shadows: {
    soft: '0 4px 20px -2px rgba(62, 79, 42, 0.08)',
    polaroid: '0 10px 25px -4px rgba(62, 79, 42, 0.14), 0 4px 6px -2px rgba(62, 79, 42, 0.05)',
    goldGlow: '0 0 25px rgba(212, 180, 88, 0.35)',
    pinkGlow: '0 8px 24px -4px rgba(243, 161, 195, 0.45)',
  }
};

export default themeConfig;
