/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { themeConfig } from './src/theme/themeConfig.js';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          ivory: themeConfig.colors.ivory,
          freshLeaf: themeConfig.colors.freshLeaf,
          botanical: themeConfig.colors.botanical,
          naturalGreen: themeConfig.colors.naturalGreen,
          forest: themeConfig.colors.forest,
          lotusPink: themeConfig.colors.lotusPink,
          magentaPink: themeConfig.colors.magentaPink,
          richPink: themeConfig.colors.richPink,
          marigold: themeConfig.colors.marigold,
          warmGold: themeConfig.colors.warmGold,
          sandBeige: themeConfig.colors.sandBeige,
        },
        textColor: themeConfig.colors.text,
      },
      fontFamily: {
        lora: ["'Lora', Georgia, serif"],
        greatvibes: ["'Great Vibes', cursive"],
        vibes: ["'Great Vibes', cursive"],
        montecarlo: ["'Great Vibes', cursive"],
        heading: ["'Lora', Georgia, serif"],
        cursive: ["'Great Vibes', cursive"],
        bodoni: ["'Lora', Georgia, serif"],
        beau: ["'Great Vibes', cursive"],
        josefin: [themeConfig.fonts.josefinSans],
        body: [themeConfig.fonts.josefinSans],
        gujarati: [themeConfig.fonts.gujarati || "'Josefin Sans', sans-serif"],
      },
      boxShadow: themeConfig.shadows,
    },
  },
  plugins: [],
};
