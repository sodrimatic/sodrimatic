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
        beau: [themeConfig.fonts.beauRivage],
        bodoni: [themeConfig.fonts.bodoniModa],
        josefin: [themeConfig.fonts.josefinSans],
        gujarati: [themeConfig.fonts.gujarati],
      },
      boxShadow: themeConfig.shadows,
    },
  },
  plugins: [],
};
