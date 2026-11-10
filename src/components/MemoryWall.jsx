/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Section 6: Organic Family Photo Wall & Memory Uploader
 * 
 * Note on Photos:
 * - Exclusively displays approved photos fetched from Google Drive (ApprovedPhotos folder).
 * - NEVER includes website graphic assets (like venue, tow, tugofwar, blessings, etc.).
 * - If ApprovedPhotos folder has 0 photos or fewer than display count, displays dedicated
 *   romantic memory placeholder cards, replacing them one-by-one as photos are approved.
 * - Frames naturally hug each photo's true aspect ratio & orientation (portrait, landscape, square).
 * - Asymmetrical family wall collage with varied frame materials (Walnut, Oak, Gold, Black, White).
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext.jsx';
import { uploadMemoryPhoto, fetchMemoryPhotos, getInitialMemoryPhotos, onPhotosUpdated } from '../services/api.js';
import { Camera, Upload, X, Shuffle, Sparkles, Heart, Check, ZoomIn } from 'lucide-react';
import GameTitleBoard from './GameTitleBoard.jsx';

const TOTAL_DISPLAY_COUNT = 10;
const MOBILE_DISPLAY_COUNT = 4;

// Authentic family frame styles collected over the years (refined delicate proportions)
const FAMILY_FRAME_STYLES = [
  {
    name: 'Vintage Walnut',
    wrapperClass: 'bg-[#523319] p-1 sm:p-1.5 border border-[#38210F] shadow-[0_4px_12px_rgba(56,33,15,0.22)] rounded-xs',
    matClass: 'bg-[#FDFBF7] p-0.5 sm:p-1 shadow-inner',
    nailColor: 'bg-[#D4AF37] border-[#523319]',
    defaultRot: '-2deg',
  },
  {
    name: 'Classic White Wood',
    wrapperClass: 'bg-white p-1 sm:p-1.5 border border-[#E5E0D5] shadow-[0_3px_10px_rgba(0,0,0,0.07)] rounded-xs',
    matClass: 'bg-[#FAF8F5] p-0.5 sm:p-1',
    nailColor: 'bg-[#B0A495] border-[#665D52]',
    defaultRot: '2.2deg',
  },
  {
    name: 'Antique Gilded Gold',
    wrapperClass: 'bg-gradient-to-br from-[#E2B755] via-[#C9972C] to-[#E2B755] p-1 sm:p-1.5 shadow-[0_4px_14px_rgba(201,151,44,0.28)] ring-1 ring-[#FFF0B8] rounded-xs',
    matClass: 'bg-[#FFFDF9] p-0.5 sm:p-1 shadow-inner',
    nailColor: 'bg-[#F7E08B] border-[#8C6418]',
    defaultRot: '-1.2deg',
  },
  {
    name: 'Matte Gallery Black',
    wrapperClass: 'bg-[#1E1E1E] p-1 sm:p-1.5 border border-[#111111] shadow-[0_4px_14px_rgba(0,0,0,0.24)] rounded-xs',
    matClass: 'bg-[#FDFBF7] p-0.5 sm:p-1 shadow-inner',
    nailColor: 'bg-[#888888] border-[#333333]',
    defaultRot: '1.6deg',
  },
  {
    name: 'Warm Honey Oak',
    wrapperClass: 'bg-[#9E6E3C] p-1 sm:p-1.5 border border-[#6E4720] shadow-[0_4px_12px_rgba(110,71,32,0.2)] rounded-xs',
    matClass: 'bg-[#FAF7F0] p-0.5 sm:p-1 shadow-inner',
    nailColor: 'bg-[#D4B458] border-[#6E4720]',
    defaultRot: '-2.5deg',
  },
  {
    name: 'Keepsake Polaroid Print',
    wrapperClass: 'bg-white p-1 sm:p-1.5 shadow-[0_3px_10px_rgba(0,0,0,0.08)] border border-[#E8E2D5] rounded-xs',
    matClass: 'bg-[#FAF6ED]',
    nailColor: 'bg-[#C5A059] border-[#5C381E]',
    defaultRot: '2.8deg',
  },
  {
    name: 'Burnished Brass',
    wrapperClass: 'bg-[#B8860B] p-1 sm:p-1.5 ring-1 ring-[#F3DC87] shadow-[0_4px_14px_rgba(184,134,11,0.24)] rounded-xs',
    matClass: 'bg-[#FFFDF8] p-0.5 sm:p-1 shadow-inner',
    nailColor: 'bg-[#ECC870] border-[#664C00]',
    defaultRot: '-1.4deg',
  },
  {
    name: 'Rustic Driftwood',
    wrapperClass: 'bg-[#75675A] p-1 sm:p-1.5 border border-[#4E4338] shadow-[0_4px_12px_rgba(78,67,56,0.2)] rounded-xs',
    matClass: 'bg-[#FAF8F4] p-0.5 sm:p-1 shadow-inner',
    nailColor: 'bg-[#A89887] border-[#42382F]',
    defaultRot: '1.2deg',
  },
];

// Pure memory placeholder cards (Used ONLY when ApprovedPhotos is empty or has fewer photos than display count)
// Notice: ZERO website assets, logos, or section illustrations are included here.
const PLACEHOLDER_POOL = [
  { id: 'ph1', caption: 'NYC Skyline Moments', aspect: 'aspect-[16/10]', gradient: 'from-[#FAF6ED] to-[#E8DCBE]', icon: 'sparkles' },
  { id: 'ph2', caption: 'Marine Drive Sunset', aspect: 'aspect-[3/4]', gradient: 'from-[#FDFBF7] to-[#E6DCC7]', icon: 'heart' },
  { id: 'ph3', caption: 'Chai & Smiles', aspect: 'aspect-[4/3]', gradient: 'from-[#FAF8F5] to-[#D7E4B8]/50', icon: 'camera' },
  { id: 'ph4', caption: 'Playful Candids', aspect: 'aspect-[3/4]', gradient: 'from-[#FAF6ED] to-[#FDE08A]/40', icon: 'sparkles' },
  { id: 'ph5', caption: 'The Proposal', aspect: 'aspect-[3/4]', gradient: 'from-[#FFFDF9] to-[#F3A1C3]/30', icon: 'ring' },
  { id: 'ph6', caption: 'Central Park Walk', aspect: 'aspect-[16/10]', gradient: 'from-[#FAF8F5] to-[#D86C9A]/20', icon: 'heart' },
  { id: 'ph7', caption: 'Celebration Night', aspect: 'aspect-[3/4]', gradient: 'from-[#FDFBF7] to-[#ECC870]/40', icon: 'sparkles' },
  { id: 'ph8', caption: 'Friends & Family', aspect: 'aspect-[4/3]', gradient: 'from-[#FAF6ED] to-[#D7E4B8]/60', icon: 'camera' },
  { id: 'ph9', caption: 'Gateway Memories', aspect: 'aspect-[3/4]', gradient: 'from-[#FFFDF9] to-[#E6DCC7]', icon: 'sparkles' },
  { id: 'ph10', caption: 'Coffee Date', aspect: 'aspect-square', gradient: 'from-[#FAF8F5] to-[#F3A1C3]/30', icon: 'heart' },
  { id: 'ph11', caption: 'Diwali Sparklers', aspect: 'aspect-[3/4]', gradient: 'from-[#FAF6ED] to-[#ECC870]/50', icon: 'sparkles' },
  { id: 'ph12', caption: 'Bandra Evening Glow', aspect: 'aspect-[16/10]', gradient: 'from-[#FDFBF7] to-[#D7E4B8]/40', icon: 'heart' },
  { id: 'ph13', caption: 'Acoustic Evenings', aspect: 'aspect-[3/4]', gradient: 'from-[#FAF8F5] to-[#E8DCBE]', icon: 'sparkles' },
  { id: 'ph14', caption: 'Sweet Treats', aspect: 'aspect-[4/3]', gradient: 'from-[#FAF6ED] to-[#F3A1C3]/25', icon: 'camera' },
  { id: 'ph15', caption: 'Forever & Always', aspect: 'aspect-[3/4]', gradient: 'from-[#FFFDF9] to-[#D7E4B8]/50', icon: 'ring' },
  { id: 'ph16', caption: 'Wedding Bells', aspect: 'aspect-square', gradient: 'from-[#FAF8F5] to-[#ECC870]/40', icon: 'sparkles' },
];

/**
 * Organic layout offsets for a cozy, scattered family gallery wall.
 * Ensures the perimeter edges (top, left, right, bottom) are naturally uneven and unaligned:
 * - Slot 0 (Column 1 top) hangs significantly lower (+48px on desktop, +36px on mobile).
 * - Slot 2 (Column 2 top) hangs high near the top (-8px on desktop, -4px on mobile).
 * - Left and right edges have staggered X-offsets and unique frame tilt angles.
 * - Bottom edge ends at naturally varied heights across columns.
 */
const ORGANIC_SLOT_CONFIG = [
  // Slot 0: Top of Column 1 (Leftmost edge) - Natural gentle stagger
  {
    yDesktop: 48,
    yMobile: 12,
    xDesktop: 8,
    xMobile: 4,
    rot: -3.0,
    scale: 0.98,
  },
  // Slot 1: Bottom of Column 1 - Shifted to break the vertical edge
  {
    yDesktop: 42,
    yMobile: 14,
    xDesktop: -6,
    xMobile: -3,
    rot: 2.2,
    scale: 1.0,
  },
  // Slot 2: Top of Column 2 - High up near the ceiling line
  {
    yDesktop: -8,
    yMobile: -4,
    xDesktop: -4,
    xMobile: -2,
    rot: 2.5,
    scale: 1.02,
  },
  // Slot 3: Bottom of Column 2 - Organic hanging height
  {
    yDesktop: 6,
    yMobile: 6,
    xDesktop: 5,
    xMobile: 3,
    rot: -2.2,
    scale: 0.98,
  },
  // Slot 4: Top of Column 3 (Center) - Mid-level height
  {
    yDesktop: 22,
    yMobile: 16,
    xDesktop: -2,
    xMobile: -1,
    rot: 1.2,
    scale: 1.0,
  },
  // Slot 5: Bottom of Column 3 (Also top of Col 2 on 2-col mobile) - High up
  {
    yDesktop: -4,
    yMobile: -6,
    xDesktop: 4,
    xMobile: 3,
    rot: -2.0,
    scale: 0.98,
  },
  // Slot 6: Top of Column 4 - High up
  {
    yDesktop: -6,
    yMobile: -2,
    xDesktop: 3,
    xMobile: 2,
    rot: -2.6,
    scale: 1.02,
  },
  // Slot 7: Bottom of Column 4
  {
    yDesktop: 14,
    yMobile: 8,
    xDesktop: -5,
    xMobile: -3,
    rot: 3.0,
    scale: 0.98,
  },
  // Slot 8: Top of Column 5 (Rightmost edge) - Dips lower, indented inward to break right edge
  {
    yDesktop: 42,
    yMobile: 30,
    xDesktop: -8,
    xMobile: -5,
    rot: 3.5,
    scale: 0.96,
  },
  // Slot 9: Bottom of Column 5 - Shifted rightward to break vertical right edge
  {
    yDesktop: 32,
    yMobile: 20,
    xDesktop: 8,
    xMobile: 5,
    rot: -1.5,
    scale: 1.0,
  },
];

/**
 * Randomly pick n items from array, avoiding currently displayed items if pool is large enough
 */
function pickRandomSubset(arr, n, excludeIds = []) {
  if (!arr || arr.length === 0) return [];
  if (arr.length <= n) return [...arr].sort(() => 0.5 - Math.random());

  // Prioritize unpicked items for a dynamic shuffle experience
  const unpicked = arr.filter((item) => !excludeIds.includes(item.id));
  const pool = unpicked.length >= n ? unpicked : arr;

  const shuffled = [...pool].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
}

/**
 * Constructs displayed photos:
 * 1. If 0 approved photos: Show random memory placeholders from pool.
 * 2. If approved photos >= count: Show ONLY approved photos from Google Drive.
 * 3. If approved photos < count: Replace placeholders one-by-one with approved photos.
 */
function getDisplayPhotos(approvedList, count, currentDisplayed = []) {
  const approved = approvedList || [];
  const approvedCount = approved.length;
  const currentIds = (currentDisplayed || []).map((p) => p.id).filter(Boolean);

  if (approvedCount === 0) {
    return pickRandomSubset(PLACEHOLDER_POOL, count, currentIds);
  }

  if (approvedCount >= count) {
    const picked = pickRandomSubset(approved, count, currentIds);
    return picked.map((photo, idx) => ({
      id: photo.id || `approved_${photo.url || idx}`,
      url: photo.url,
      caption: photo.caption || 'Wedding Memory',
      isApprovedPhoto: true,
    }));
  }

  // Exactly replace approvedCount placeholders one by one with real approved photos:
  const result = approved.map((photo, i) => ({
    id: photo.id || `approved_${photo.url || i}`,
    url: photo.url,
    caption: photo.caption || 'Wedding Memory',
    isApprovedPhoto: true,
  }));

  // Fill remaining slots with placeholder cards (never website UI images)
  const remainingNeeded = count - approvedCount;
  const fillPlaceholders = pickRandomSubset(PLACEHOLDER_POOL, remainingNeeded, currentIds);
  result.push(...fillPlaceholders);

  return result;
}

export default function MemoryWall({ embedded = false, isActive = true }) {
  const { t } = useLanguage();
  const fileInputRef = useRef(null);

  // Photos approved from Google Drive ApprovedPhotos folder (0ms cache rehydration)
  const [approvedPhotos, setApprovedPhotos] = useState(() => getInitialMemoryPhotos());

  // Responsive mobile screen detection (< 640px)
  const [isMobile, setIsMobile] = useState(() => {
    return typeof window !== 'undefined' ? window.innerWidth < 640 : false;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 4 frames on mobile, 10 frames on desktop
  const displayCount = isMobile ? MOBILE_DISPLAY_COUNT : TOTAL_DISPLAY_COUNT;

  // Currently displayed photos on the wall (instantly shows real photos if cached)
  const [displayedPhotos, setDisplayedPhotos] = useState(() => {
    const initialApproved = getInitialMemoryPhotos();
    return getDisplayPhotos(
      initialApproved,
      typeof window !== 'undefined' && window.innerWidth < 640
        ? MOBILE_DISPLAY_COUNT
        : TOTAL_DISPLAY_COUNT
    );
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFileBase64, setSelectedFileBase64] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [lightboxPhoto, setLightboxPhoto] = useState(null);

  // Helper to compare photo arrays by id/url to avoid unnecessary layout shifts
  const arePhotosEqual = (a, b) => {
    if (!a && !b) return true;
    if (!a || !b) return false;
    if (a.length !== b.length) return false;
    return a.every((photo, i) => (photo.id || photo.url) === (b[i]?.id || b[i]?.url));
  };

  // Sync approved photos from Google Drive with reactive listener + fast SWR fetch
  useEffect(() => {
    // 1. Reactive listener (updates from prefetch or upload immediately)
    const unsubscribe = onPhotosUpdated((newPhotos) => {
      if (Array.isArray(newPhotos) && newPhotos.length > 0) {
        setApprovedPhotos((prev) => {
          if (arePhotosEqual(prev, newPhotos)) return prev;
          return newPhotos;
        });
      }
    });

    // 2. Fetch fresh photos (deduplicates if in-flight)
    fetchMemoryPhotos([]).then((res) => {
      if (res && res.length > 0) {
        setApprovedPhotos((prev) => {
          if (arePhotosEqual(prev, res)) return prev;
          return res;
        });
      }
    });

    return unsubscribe;
  }, []);

  // Lock body scroll and listen for Escape key when lightbox or upload modal is active
  useEffect(() => {
    if (!lightboxPhoto && !isModalOpen) return;

    const originalOverflow = document.body.style.overflow;
    const originalTouchAction = document.body.style.touchAction;
    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (lightboxPhoto) setLightboxPhoto(null);
        if (isModalOpen) setIsModalOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.touchAction = originalTouchAction;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [lightboxPhoto, isModalOpen]);

  // Adjust display when screen width changes or approved photos transition from empty to loaded
  useEffect(() => {
    setDisplayedPhotos((prev) => {
      const hadPlaceholders = prev.some((p) => !p.isApprovedPhoto);
      const hasApproved = approvedPhotos.length > 0;
      if (hadPlaceholders && hasApproved) {
        return getDisplayPhotos(approvedPhotos, displayCount, prev);
      }
      if (prev.length !== displayCount) {
        return getDisplayPhotos(approvedPhotos, displayCount, prev);
      }
      return prev;
    });
  }, [displayCount, approvedPhotos]);

  // Total available memories pool size (approved photos or placeholders)
  const totalPoolSize = approvedPhotos.length > 0 ? approvedPhotos.length : PLACEHOLDER_POOL.length;
  const canShuffle = totalPoolSize > displayCount;

  // Periodic shuffle: 7 seconds on mobile, 16 seconds on desktop if more memories exist than displayCount
  useEffect(() => {
    if (!canShuffle || !isActive) return;

    const intervalMs = isMobile ? 7000 : 16000;
    const timer = setInterval(() => {
      setDisplayedPhotos((prev) => getDisplayPhotos(approvedPhotos, displayCount, prev));
    }, intervalMs);

    return () => clearInterval(timer);
  }, [approvedPhotos, displayCount, canShuffle, isMobile, isActive]);

  // Manual shuffle handler
  const handleShuffle = useCallback(() => {
    setDisplayedPhotos((prev) => getDisplayPhotos(approvedPhotos, displayCount, prev));
  }, [approvedPhotos, displayCount]);

  // Handle local image file selection
  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedFileBase64(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // Submit to Google Drive (UploadedPhotos folder)
  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFileBase64) return;

    setIsUploading(true);
    try {
      await uploadMemoryPhoto({
        base64: selectedFileBase64,
        caption: 'Guest Memory',
        mimeType: 'image/jpeg',
      });

      setUploadSuccess(true);
      setTimeout(() => {
        setUploadSuccess(false);
        setSelectedFileBase64('');
        setIsModalOpen(false);
      }, 3000);
    } catch (err) {
      console.error('Photo upload error:', err);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <section
      id="gallery"
      className={
        embedded
          ? 'w-full py-2 sm:py-4 bg-transparent'
          : 'relative pt-20 md:py-16 pb-16 px-3 sm:px-6 bg-transparent overflow-hidden'
      }
    >
      <div className="max-w-7xl mx-auto relative z-10">

        {/* Section Header with Wooden Board */}
        <GameTitleBoard
          title={t.memoryWall?.title || 'Memory Wall'}
        />

        {/* Action Controls: Upload Button & Shuffle Indicator */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-6 font-josefin">
          <button
            onClick={() => setIsModalOpen(true)}
            className="min-h-[46px] px-6 py-2.5 rounded-full bg-[#D86C9A] hover:bg-[#C43A6B] text-white text-xs sm:text-sm font-semibold tracking-wider flex items-center gap-2 shadow-md soft-glow-pink active:scale-95 transition-all cursor-pointer"
          >
            <Camera className="w-4 h-4" />
            <span>{t.memoryWall.uploadBtn}</span>
          </button>

          {canShuffle && (
            <button
              onClick={handleShuffle}
              className="min-h-[46px] px-5 py-2 rounded-full border border-[#D7E4B8] bg-white hover:bg-[#FAFDF3] text-xs text-[#7DA457] flex items-center gap-2 transition-all active:scale-95 cursor-pointer shadow-2xs group"
              title="Shuffle memories"
            >
              <Shuffle className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-500" />
              <span>Shuffle Wall</span>
            </button>
          )}
        </div>

        {/* ORGANIC FAMILY PHOTO WALL (Frames hang directly on parchment, no light colored box) */}
        <div className="w-full pt-2 pb-8 px-2 sm:px-4 relative max-w-4xl mx-auto">
          {/* Masonry Columns: Exactly 4 photos in 2-col cluster on mobile, 10 photos in 5-col cluster on desktop */}
          <div className="columns-2 sm:columns-3 md:columns-5 lg:columns-5 gap-3.5 sm:gap-4 max-w-sm sm:max-w-3xl mx-auto">
            <AnimatePresence mode="popLayout">
              {displayedPhotos.map((item, idx) => {
                const frameStyle = FAMILY_FRAME_STYLES[idx % FAMILY_FRAME_STYLES.length];
                const slot = ORGANIC_SLOT_CONFIG[idx % ORGANIC_SLOT_CONFIG.length];
                const offsetY = isMobile ? slot.yMobile : slot.yDesktop;
                const offsetX = isMobile ? slot.xMobile : slot.xDesktop;

                return (
                  <motion.div
                    key={item.id || `photo-${idx}`}
                    layout
                    initial={{ opacity: 0, scale: 0.85, y: offsetY + 14 }}
                    animate={{ opacity: 1, scale: slot.scale, y: offsetY, x: offsetX }}
                    exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.3 } }}
                    transition={{ duration: 0.45, delay: (idx % 4) * 0.05 }}
                    whileHover={{ scale: 1.08, rotate: '0deg', zIndex: 40, y: offsetY - 6, x: offsetX }}
                    style={{ rotate: `${slot.rot}deg` }}
                    className="break-inside-avoid mb-4 sm:mb-4.5 flex flex-col items-center cursor-pointer group max-w-[145px] sm:max-w-[150px] mx-auto w-full relative"
                    onClick={() => {
                      if (item.url) setLightboxPhoto(item);
                    }}
                  >
                    {/* Hanging Picture Nail Detail */}
                    <div className={`w-1.5 h-1.5 rounded-full ${frameStyle.nailColor} border shadow-xs -mb-0.5 z-10 relative pointer-events-none`} />

                    {/* Frame Container matching the photo's natural aspect ratio & orientation */}
                    <div
                      className={`w-full ${frameStyle.wrapperClass} transition-shadow duration-300 group-hover:shadow-xl relative`}
                    >
                      {/* Inner Mat Board (Preserves original photo ratio with zero cropping) */}
                      <div className={`${frameStyle.matClass} relative overflow-hidden rounded-2xs flex items-center justify-center bg-white`}>
                        {item.url ? (
                          <img
                            src={item.url}
                            alt=""
                            referrerPolicy="no-referrer"
                            decoding="async"
                            className="w-full h-auto object-contain block rounded-2xs pointer-events-none select-none"
                            loading={idx < 4 ? "eager" : "lazy"}
                          />
                        ) : (
                          /* Dedicated Memory Placeholder Card - Clean graphic with zero text or descriptions */
                          <div className={`w-full ${item.aspect || 'aspect-[4/3]'} p-4 flex items-center justify-center text-center bg-gradient-to-br ${item.gradient || 'from-[#FAF7F0] to-[#EFE7D8]'} rounded-2xs`}>
                            <div className="w-8 h-8 rounded-full bg-white/85 border border-[#D4AF37]/30 flex items-center justify-center shadow-xs">
                              {item.icon === 'ring' ? (
                                <Heart className="w-3.5 h-3.5 text-[#C43A6B] fill-current" />
                              ) : item.icon === 'camera' ? (
                                <Camera className="w-3.5 h-3.5 text-[#7DA457]" />
                              ) : (
                                <Sparkles className="w-3.5 h-3.5 text-[#D86C9A]" />
                              )}
                            </div>
                          </div>
                        )}

                        {/* Hover Zoom Prompt - only on photos */}
                        {item.url && (
                          <div className="absolute inset-0 bg-black/15 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                            <span className="p-1.5 rounded-full bg-white/95 text-[#3E4F2A] shadow-md transform scale-90 group-hover:scale-100 transition-transform">
                              <ZoomIn className="w-3.5 h-3.5 text-[#C43A6B]" />
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom Note */}
        <div className="mt-4 text-center">
          <span className="text-xs font-josefin text-[#7DA457]">
            {t.memoryWall.polaroidSticky}
          </span>
        </div>
      </div>

      {/* UPLOAD MODAL DIALOG (PORTALED TO ROOT BODY) */}
      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {isModalOpen && (
              <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-[#FAFDF3] rounded-3xl max-w-md w-full p-6 border-2 border-[#D4B458] shadow-2xl relative z-10"
                >
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="absolute top-4 right-4 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full text-[#3E4F2A] hover:bg-[#E6DCC7] cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <h3 className="font-bodoni text-2xl text-[#3E4F2A] mb-1">
                    {t.memoryWall.uploadTitle}
                  </h3>
                  <p className="font-josefin text-xs text-[#7DA457] mb-4">
                    Upload your picture to appear on the wedding memory wall!
                  </p>

                  {uploadSuccess ? (
                    <div className="py-8 text-center flex flex-col items-center font-josefin">
                      <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-3">
                        <Check className="w-7 h-7" />
                      </div>
                      <h4 className="font-bodoni font-bold text-xl text-[#3E4F2A]">
                        Photo Uploaded!
                      </h4>
                      <p className="text-xs text-[#6E8E3E] mt-2 max-w-xs leading-relaxed">
                        Thank you! Your picture has been uploaded to the album and will appear on the wall once reviewed! ♡
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleUploadSubmit} className="flex flex-col gap-4 font-josefin">
                      {/* File Drop / Tap Area */}
                      <div
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full aspect-[16/10] rounded-2xl border-2 border-dashed border-[#D7E4B8] hover:border-[#D86C9A] bg-white flex flex-col items-center justify-center p-4 text-center cursor-pointer transition-colors overflow-hidden"
                      >
                        {selectedFileBase64 ? (
                          <img
                            src={selectedFileBase64}
                            alt="Selected preview"
                            className="w-full h-full object-contain rounded-xl"
                          />
                        ) : (
                          <>
                            <div className="w-12 h-12 rounded-full bg-[#F3A1C3]/30 flex items-center justify-center text-[#C43A6B] mb-2">
                              <Upload className="w-6 h-6" />
                            </div>
                            <span className="text-xs sm:text-sm font-semibold text-[#3E4F2A]">
                              {t.memoryWall.dragPrompt}
                            </span>
                            <span className="text-[11px] text-[#9FB77A] mt-1">
                              JPG, PNG, or WebP up to 10MB
                            </span>
                          </>
                        )}
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                      </div>

                      {/* Actions */}
                      <div className="flex items-center justify-end gap-3 mt-2">
                        <button
                          type="button"
                          onClick={() => {
                            setIsModalOpen(false);
                            setSelectedFileBase64('');
                          }}
                          className="min-h-[44px] px-4 py-2 rounded-xl text-xs font-semibold text-[#3E4F2A] hover:bg-[#E6DCC7]/50 cursor-pointer"
                        >
                          {t.memoryWall.cancel}
                        </button>
                        <button
                          type="submit"
                          disabled={isUploading || !selectedFileBase64}
                          className="min-h-[44px] px-5 py-2 rounded-xl bg-[#D86C9A] hover:bg-[#C43A6B] disabled:opacity-50 text-white text-xs font-semibold tracking-wider flex items-center gap-2 shadow-xs cursor-pointer"
                        >
                          {isUploading ? (
                            <span>{t.memoryWall.submitting}</span>
                          ) : (
                            <>
                              <Sparkles className="w-4 h-4" />
                              <span>{t.memoryWall.submitPhoto}</span>
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  )}
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}

      {/* IMMERSIVE FULLSCREEN LIGHTBOX (PORTALED TO ROOT BODY, ESCAPES ALL STACKING CONTEXTS) */}
      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {lightboxPhoto && lightboxPhoto.url && (
              <motion.div
                key="memory-lightbox"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-[9999] flex flex-col items-center justify-center p-3 sm:p-6 bg-black/92 backdrop-blur-md cursor-zoom-out select-none"
                onClick={() => setLightboxPhoto(null)}
              >
                {/* Creative Royal Website-Themed Close Button */}
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.94 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxPhoto(null);
                  }}
                  className="fixed top-4 right-4 sm:top-6 sm:right-6 min-h-[44px] pl-3 pr-4 py-2 rounded-full bg-[#F7F8E8]/95 hover:bg-white border-2 border-[#D4B458] shadow-[0_6px_25px_rgba(0,0,0,0.6),0_0_15px_rgba(212,180,88,0.3)] backdrop-blur-md cursor-pointer z-[10000] flex items-center gap-2.5 group transition-all"
                  aria-label="Close photo preview"
                >
                  {/* Spinning Signature Lotus & Magenta Pink Seal with White Cross */}
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-[#D86C9A] to-[#C43A6B] border border-[#FDE08A]/60 flex items-center justify-center shadow-xs group-hover:rotate-90 transition-transform duration-500 ease-out shrink-0">
                    <X className="w-4 h-4 text-white stroke-[2.5]" />
                  </div>

                  {/* Clean Typography in Josefin Sans */}
                  <span className="font-josefin text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-[#3E4F2A] group-hover:text-[#C43A6B] transition-colors">
                    Close
                  </span>
                </motion.button>

                {/* ONLY THE PHOTO */}
                <motion.img
                  initial={{ scale: 0.94, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.94, opacity: 0 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  src={lightboxPhoto.url}
                  alt=""
                  referrerPolicy="no-referrer"
                  className="max-h-[85vh] max-w-[94vw] sm:max-h-[84vh] sm:max-w-[88vw] object-contain rounded-md shadow-2xl cursor-default pointer-events-auto"
                  onClick={(e) => e.stopPropagation()}
                />

                {/* Return Hint in Josefin Sans */}
                <p className="mt-3 font-josefin text-xs sm:text-sm text-[#D7E4B8] tracking-[0.2em] uppercase font-semibold select-none pointer-events-none text-center drop-shadow-xs">
                  Tap anywhere outside to return to the wall
                </p>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </section>
  );
}
