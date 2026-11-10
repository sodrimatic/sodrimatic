/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext } from 'react';
import { content } from '../locales/content.js';

const LanguageContext = createContext({
  lang: 'en',
  language: 'en',
  t: content,
  toggleLanguage: () => {},
});

export function LanguageProvider({ children }) {
  return (
    <LanguageContext.Provider value={{ lang: 'en', language: 'en', t: content, toggleLanguage: () => {} }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  return context || { lang: 'en', language: 'en', t: content, toggleLanguage: () => {} };
}
