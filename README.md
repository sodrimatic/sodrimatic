# 💍 Sodrimatic — Dhriti & Soham Wedding Celebration

<div align="center">

[![React 19](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.2-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Motion](https://img.shields.io/badge/Motion-v12-FF4088?style=for-the-badge&logo=framer&logoColor=white)](https://motion.dev/)
[![Google Apps Script](https://img.shields.io/badge/Google_Apps_Script-Backend-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://developers.google.com/apps-script)
[![License: Apache-2.0](https://img.shields.io/badge/License-Apache_2.0-blue.svg?style=for-the-badge)](LICENSE)

<br />

**Two Paths, One Beautiful Journey · From Mumbai to Manhattan**

*An interactive, mobile-first luxury wedding web application built to celebrate the union of Dhriti & Soham.*

[**Explore Live Demo**](https://sodrimatic.github.io/sodrimatic/) · [**Report Issue**](https://github.com/sodrimatic/sodrimatic/issues) · [**Wedding Details**](#-wedding-details)

</div>

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
  - [Interactive Guest Journey](#interactive-guest-journey)
  - [Celebration Lounge](#celebration-lounge)
  - [Seamless RSVP & Sync](#seamless-rsvp--sync)
- [Design System & Aesthetics](#-design-system--aesthetics)
- [Tech Stack & Architecture](#-tech-stack--architecture)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Development & Build](#development--build)
- [Google Apps Script Backend Setup](#-google-apps-script-backend-setup)
- [Deployment](#-deployment)
- [License](#-license)

---

## 🌟 Overview

**Sodrimatic** is a bespoke, luxury digital wedding experience designed for **Dhriti & Soham**. Moving beyond traditional static wedding invitations, Sodrimatic delivers an immersive, animated, and participatory journey that weaves together their story spanning from the bustling streets of **Mumbai** to the skyline of **New York City**.

Designed with **mobile-first ergonomics**, tactile interactions, and a soft Indian botanical palette, guests can crack open a wax-sealed invitation envelope, scratch off a golden card to reveal the secret date, participate in a live Tug of War, shower blessings in real-time, upload photos directly to a Polaroid Memory Wall, and submit RSVPs.

---

## ✨ Key Features

### Interactive Guest Journey

- 💌 **Scene 0: Wax-Sealed Envelope Opening**
  - Ultra-realistic wax seal cracking and 3D parchment envelope unfold animation.
  - Smooth uncurling letter reveal introducing the couple.
  - Option to replay or skip at any point.

- 🏙️ **Gateway Hero: Mumbai meets Manhattan**
  - Atmospheric visual narrative highlighting the couple's cross-continental journey.
  - Dynamic flight-path graphics, custom illustrations, and fluid typography.
  - Subtly reactive golden scroll progress indicator.

- 💬 **Conversational Chat Reveal ("Leaked from the DMs")**
  - Playful animated WhatsApp/DM conversation capturing the exact moment the engagement was announced.
  - Heartfelt letter from Dhriti & Soham welcoming family and friends.

- 🎫 **Interactive Golden Scratch Card & Live Countdown**
  - Canvas-based interactive scratch-off card where guests use touch/mouse to uncover the wedding date & venue.
  - High-precision live countdown timer tracking days, hours, minutes, and seconds until **February 12, 2027**.
  - One-tap Google Maps venue navigation to **Banquet 9, Malad West, Mumbai**.

- 👨‍👩‍👧‍👦 **Meet the Couple & Family Showcase**
  - Curated character profiles for the bride (**Dhriti**) and groom (**Soham**) with personality traits, stories, and fun trivia.
  - Beautifully framed, parchment-textured family trees celebrating both **The Shah Family** and **The Mehta Family**.

### Celebration Lounge

- ⚔️ **Live Tug of War (Team Bride vs. Team Groom)**
  - Interactive cheer battle where guests tap to cheer for their team.
  - Real-time score meter with dynamic rope animation and celebratory confetti bursts.
  - Debounced batch sync to prevent server overload while providing 0ms instant optimistic UI feedback.

- 🌸 **Shower of Blessings (Guestbook)**
  - Live guest message board with real-time submission directly synced to Google Sheets.
  - Instant optimistic message rendering so guests see their blessings immediately.
  - Stale-While-Revalidate (SWR) cache mechanism with in-memory persistence.

- 📷 **Polaroid Memory Wall & Photo Uploads**
  - Vintage Polaroid-style gallery with wooden clothesline pins, masking tape, and handwritten captions.
  - Direct guest photo upload from camera roll/desktop.
  - Automatic base64 conversion and secure sync to Google Drive folders.
  - Curated moderation flow: guest uploads go to `UploadedPhotos` folder, and approved memories appear live on the wall from `ApprovedPhotos`.
  - Full-screen high-resolution lightbox modal with zoom and smooth transitions.

### Seamless RSVP & Sync

- 📋 **Mobile-First RSVP Form**
  - Clean, touch-optimized attendance form with instant feedback.
  - Collects guest name, attendance confirmation (*Joyfully Accepts* / *Regretfully Declines*), and custom notes.
  - Stores all guest responses securely in `RSVPresponse.xlsx` on Google Drive.

---

## 🎨 Design System & Aesthetics

Sodrimatic is built upon an intentional, warm Indian botanical color palette accented with luxury gold foil and blush tones.

### Color Palette

| Token | Hex | Role | Distribution |
| :--- | :---: | :--- | :---: |
| **Soft Ivory** | `#F7F8E8` | Canvas & primary background | ~35% |
| **Fresh Leaf** | `#D7E4B8` | Surface & section backgrounds | ~15% |
| **Botanical Green** | `#B7C987` | Secondary surface accents | ~8% |
| **Natural Green** | `#7DA457` | Dividers, foliage, icons | ~6% |
| **Forest Green** | `#3E4F2A` | Primary typography & high contrast | Text |
| **Lotus Pink** | `#F3A1C3` | Primary action buttons & highlights | ~10% |
| **Magenta Pink** | `#D86C9A` | Secondary accents & interactive hover | ~8% |
| **Rich Pink** | `#C43A6B` | High-priority highlights & badges | ~6% |
| **Warm Gold** | `#D4B458` | Borders, foil accents & progress bar | ~3% |
| **Marigold Yellow** | `#FDE08A` | Festive warm accents | ~4% |
| **Sand Beige** | `#E6DCC7` | Soft cards & torn parchment elements | ~1% |

### Typography

- **Beau Rivage**: Romantic calligraphy script used for couple names and emotional highlights.
- **Bodoni Moda**: High-contrast luxury editorial serif used for prominent titles, section headers, and numerals.
- **Josefin Sans**: Geometric, elegant sans-serif for UI, navigation, body copy, and interactive buttons.

---

## 🛠️ Tech Stack & Architecture

### Frontend
- **Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Bundler & Tooling**: [Vite 6](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Motion & Physics**: [Motion](https://motion.dev/) (Framer Motion v12)
- **Effects**: [Canvas Confetti](https://github.com/catdad/canvas-confetti)
- **Icons**: [Lucide React](https://lucide.dev/)

### Backend (Serverless & Zero-Cost)
- **Serverless Runtime**: [Google Apps Script](https://developers.google.com/apps-script) (`Code.gs`)
- **Database**: Google Sheets (`wishes.xlsx`, `RSVPresponse.xlsx`)
- **Media Asset Storage**: Google Drive (`UploadedPhotos`, `ApprovedPhotos`)
- **Data Synchronization**:
  - **Synchronous Cache Rehydration**: 0ms load time utilizing localStorage and module-level memory cache.
  - **Stale-While-Revalidate (SWR)**: Immediate local display with asynchronous cloud background refresh.
  - **Request Deduplication**: In-flight promises prevent redundant cold-starts.
  - **Debounced Cheer Batches**: Aggregates high-frequency taps to preserve API quotas.

---

## 📁 Project Structure

```text
sodrimatic/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Pages automated deployment workflow
├── public/
│   ├── images/                 # Custom graphic assets, skylines, frames, and portraits
│   └── new/                    # Monogram and high-res envelope textures
├── src/
│   ├── components/
│   │   ├── BlessingsSection.jsx    # Guestbook wishes list & submission form
│   │   ├── CelebrationHub.jsx      # Tabbed celebration lounge container
│   │   ├── ChatReveal.jsx          # Leaked DM animation & personal letter
│   │   ├── EnvelopeOpeningIntro.jsx# Scene 0 wax-sealed envelope intro
│   │   ├── GameTitleBoard.jsx      # Wooden heading element for mini-games
│   │   ├── GatewayHero.jsx         # Hero section (Mumbai meets Manhattan)
│   │   ├── MeetCouple.jsx          # Bride & Groom profiles + Family trees
│   │   ├── MemoryWall.jsx          # Polaroid gallery & photo uploader
│   │   ├── Navbar.jsx              # Sticky navigation bar with intro replay
│   │   ├── RSVPSection.jsx         # Guest RSVP form with attendance choices
│   │   ├── ScratchCard.jsx         # Canvas scratch-off & live countdown
│   │   └── TugOfWar.jsx            # Interactive cheer battle game
│   ├── context/
│   │   └── LanguageContext.jsx     # App-wide localization & string context
│   ├── locales/
│   │   └── content.js              # Central content dictionary for all copy
│   ├── services/
│   │   └── api.js                  # Ultra-fast SWR API client for Google Apps Script
│   ├── theme/
│   │   └── themeConfig.js          # Design tokens, color palette, and font rules
│   ├── App.tsx                     # Master layout & scroll orchestrator
│   ├── index.css                   # Global styles & Tailwind configuration
│   └── main.tsx                    # Application entrypoint
├── Code.gs                         # Google Apps Script backend source code
├── index.html                      # HTML document & Google Fonts imports
├── metadata.json                   # Applet project metadata
├── package.json                    # Project dependencies and npm scripts
├── tailwind.config.js              # Tailwind custom theme extensions
├── tsconfig.json                   # TypeScript configuration
└── vite.config.ts                  # Vite build, aliases, and public path config
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (version `18.0.0` or higher)
- [npm](https://www.npmjs.com/) or [bun](https://bun.sh/)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/sodrimatic/sodrimatic.git
   cd sodrimatic
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Environment Variables

Create a `.env` file in the root directory (refer to `.env.example`):

```bash
cp .env.example .env
```

Populate the configuration values:

```env
# Optional Gemini AI API Key
GEMINI_API_KEY="your_gemini_api_key"

# App Hosting URL
APP_URL="https://sodrimatic.github.io/sodrimatic/"

# Google Apps Script Web App Endpoint for Sheets & Drive sync
VITE_APPS_SCRIPT_URL="https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec"
```

> **Note**: Even without `VITE_APPS_SCRIPT_URL` configured, the application functions in offline/demo mode using local storage and bundled sample data.

### Development & Build

- **Start development server**:
  ```bash
  npm run dev
  ```
  Open `http://localhost:3000` in your browser.

- **Typecheck code**:
  ```bash
  npm run lint
  ```

- **Build for production**:
  ```bash
  npm run build
  ```

- **Preview production build locally**:
  ```bash
  npm run preview
  ```

---

## ☁️ Google Apps Script Backend Setup

The application uses Google Apps Script (`Code.gs`) as a zero-maintenance, serverless backend connecting to Google Sheets and Google Drive.

### 1. Prepare Google Drive Resources

1. Create a Google Drive folder (e.g. `wedding_website`).
2. Inside that folder, create or upload:
   - **`wishes.xlsx`** (or Google Sheet named `wishes`): for guestbook messages and cheer counts.
   - **`RSVPresponse.xlsx`** (or Google Sheet named `RSVPresponse`): for guest RSVPs.
   - Folder named **`UploadedPhotos`**: receives guest photo uploads.
   - Folder named **`ApprovedPhotos`**: photos moved here will be displayed on the Memory Wall.

### 2. Deploy the Apps Script

1. Open [Google Apps Script](https://script.google.com/) and create a new project.
2. Copy the entire contents of [`Code.gs`](./Code.gs) into the script editor.
3. Update the IDs / URLs at the top of `Code.gs`:
   ```javascript
   const WISHES_SPREADSHEET_ID = "YOUR_WISHES_SPREADSHEET_URL_OR_ID";
   const RSVP_SPREADSHEET_ID = "YOUR_RSVP_SPREADSHEET_URL_OR_ID";
   const UPLOADED_PHOTOS_FOLDER_ID = "YOUR_UPLOADED_PHOTOS_FOLDER_URL_OR_ID";
   const APPROVED_PHOTOS_FOLDER_ID = "YOUR_APPROVED_PHOTOS_FOLDER_URL_OR_ID";
   ```
4. Run `testWishesConnection` and `testRsvpConnection` in the editor to grant Google permissions and verify connectivity.
5. Click **Deploy** ➔ **New deployment**:
   - **Select type**: Web app
   - **Execute as**: `Me (your email)`
   - **Who has access**: `Anyone`
6. Copy the **Web App URL** and assign it to `VITE_APPS_SCRIPT_URL` in your `.env`.

---

## 🚢 Deployment

### Deploy to GitHub Pages

The project is pre-configured with a Vite base path of `/sodrimatic/` and includes the `gh-pages` utility.

To deploy directly:
```bash
npm run deploy
```

This script:
1. Builds the production bundle to `dist/`.
2. Pushes the distribution directory to the `gh-pages` branch on GitHub.

### Deploying via GitHub Actions

To enable automated deployment on push to `main`, set up `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

permissions:
  contents: write

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        env:
          VITE_APPS_SCRIPT_URL: ${{ secrets.VITE_APPS_SCRIPT_URL }}
        run: npm run build

      - name: Deploy to GitHub Pages
        uses: JamesIves/github-pages-deploy-action@v4
        with:
          folder: dist
          branch: gh-pages
```

---

## 💍 Wedding Details

- **Couple**: Dhriti Shah & Soham Mehta
- **Date**: Friday, 12 February 2027 · Celebrations begin at 4:30 PM
- **Venue**: Banquet 9, Evershine Mall, Chincholi Bunder, New Link Road, Malad West, Mumbai

---

## 📄 License

This project is licensed under the [Apache-2.0 License](LICENSE).

---

<div align="center">

Crafted with ❤️ for **Dhriti & Soham**

*#Sodrimatic · #TwoPathsOneJourney*

</div>
