/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * GameTitleBoard: Sleek, horizontally wide wooden log banner for Celebration Lounge tabs.
 * Uses the clean dark oak wooden board texture (no flowers).
 * Displays title in ONE single line, with no eyebrow and no subtitle below.
 */

import React from 'react';

export default function GameTitleBoard({ title }) {
  return (
    <div className="flex justify-center mb-3 sm:mb-5 text-center select-none w-full px-2">
      {/* Sleek Horizontal Wooden Log (Full Original Width, Slimmer Height) */}
      <div className="relative w-full max-w-[340px] sm:max-w-[480px] md:max-w-[560px] lg:max-w-[620px] aspect-[1200/210] flex items-center justify-center filter drop-shadow-[0_6px_14px_rgba(40,25,14,0.32)]">
        <img
          src="/images/title-wooden-board-wide.png"
          alt="Wooden Title Board"
          className="absolute inset-0 w-full h-full object-fill pointer-events-none"
        />
        <div className="relative z-10 px-4 sm:px-8 py-0.5 flex items-center justify-center w-full">
          <h3 className="font-bodoni text-base sm:text-xl md:text-2xl lg:text-[26px] text-white font-bold tracking-wider drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] whitespace-nowrap uppercase">
            {title}
          </h3>
        </div>
      </div>
    </div>
  );
}
