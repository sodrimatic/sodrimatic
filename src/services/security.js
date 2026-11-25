/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Centralized Security, Input Validation & Sanitization Engine
 * 
 * Threat Protections:
 * 1. Cross-Site Scripting (XSS) & Stored Script Injection:
 *    - Strips dangerous HTML tags (<script>, <iframe>, <object>, <embed>, <svg>, <form>, etc.)
 *    - Strips inline event handlers (onload=, onerror=, onclick=, etc.)
 *    - Strips script URI schemes (javascript:, vbscript:, data:text/html)
 * 2. Malicious File Upload & Polyglot Protection:
 *    - Whitelists only genuine photographic formats (JPEG, PNG, WebP, GIF, HEIC)
 *    - Blocks active vectors like SVG (<svg onload=...>) and executable extensions
 *    - Checks double extensions (.php.jpg, .exe.png, etc.)
 *    - Enforces 15MB file size limit and 10-item batch limit
 *    - Validates image decodability before canvas re-encoding
 * 3. Path Traversal & Null Byte Protection:
 *    - Strips directory traversal sequences (../, ..\, null bytes \0) from file names
 */

// Strictly permitted photographic MIME types (SVGs intentionally excluded)
export const ALLOWED_IMAGE_MIME_TYPES = new Set([
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/heic',
  'image/heif',
]);

// Strictly permitted file extensions
export const ALLOWED_IMAGE_EXTENSIONS = new Set([
  'jpg',
  'jpeg',
  'png',
  'webp',
  'gif',
  'heic',
  'heif',
]);

// Maximum permitted raw upload size (15 MB)
export const MAX_FILE_SIZE_BYTES = 15 * 1024 * 1024;

// Maximum photos permitted in a single upload batch
export const MAX_BATCH_PHOTO_COUNT = 10;

/**
 * Strips HTML tags, script protocols, control characters, and dangerous code patterns
 */
export function sanitizeText(input, maxLength = 300) {
  if (typeof input !== 'string') return '';

  let sanitized = input
    // Remove control characters (except standard whitespace)
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
    // Remove script tags and their inner contents
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    // Remove iframes, objects, embeds, styles, svg, and form tags and contents
    .replace(/<(iframe|object|embed|style|svg|form)\b[^<]*(?:(?!<\/\1>)<[^<]*)*<\/\1>/gi, '')
    // Strip all remaining HTML tags
    .replace(/<[^>]*>/g, '')
    // Remove dangerous protocols and inline event handlers
    .replace(/javascript:/gi, '')
    .replace(/vbscript:/gi, '')
    .replace(/data:text\/html/gi, '')
    .replace(/\bon\w+\s*=/gi, '')
    .trim();

  // Enforce maximum length
  if (sanitized.length > maxLength) {
    sanitized = sanitized.slice(0, maxLength).trim();
  }

  return sanitized;
}

/**
 * Validates guest name for RSVP form
 * Returns { valid: boolean, sanitized: string, error?: string }
 */
export function validateGuestName(name) {
  if (!name || typeof name !== 'string') {
    return { valid: false, sanitized: '', error: 'Please enter your name.' };
  }

  const trimmed = name.trim();
  if (trimmed.length < 2) {
    return { valid: false, sanitized: '', error: 'Name must be at least 2 characters long.' };
  }

  if (trimmed.length > 80) {
    return { valid: false, sanitized: '', error: 'Name cannot exceed 80 characters.' };
  }

  // Detect script or HTML injection attempts
  if (/<[a-z\/\!$]/i.test(trimmed) || /javascript:/i.test(trimmed) || /\bon\w+\s*=/i.test(trimmed)) {
    return { valid: false, sanitized: '', error: 'Special script characters or HTML tags are not permitted.' };
  }

  const sanitized = sanitizeText(trimmed, 80);

  // Ensure name contains meaningful alphabetic or unicode characters (supports multilingual names)
  const hasLetters = /[\p{L}]/u.test(sanitized);
  if (!hasLetters) {
    return { valid: false, sanitized: '', error: 'Please enter a valid guest name.' };
  }

  return { valid: true, sanitized };
}

/**
 * Validates blessing text from guest
 * Returns { valid: boolean, sanitized: string, error?: string }
 */
export function validateBlessingText(text) {
  if (!text || typeof text !== 'string') {
    return { valid: false, sanitized: '', error: 'Please write a blessing for the couple.' };
  }

  const trimmed = text.trim();
  if (trimmed.length < 2) {
    return { valid: false, sanitized: '', error: 'Blessing must be at least 2 characters long.' };
  }

  if (trimmed.length > 280) {
    return { valid: false, sanitized: '', error: 'Blessing cannot exceed 280 characters.' };
  }

  // Detect script or HTML injection attempts
  if (/<[a-z\/\!$]/i.test(trimmed) || /javascript:/i.test(trimmed) || /\bon\w+\s*=/i.test(trimmed)) {
    return { valid: false, sanitized: '', error: 'Code, scripts, and HTML tags are not allowed in blessings.' };
  }

  const sanitized = sanitizeText(trimmed, 280);
  if (!sanitized) {
    return { valid: false, sanitized: '', error: 'Please enter a valid blessing.' };
  }

  return { valid: true, sanitized };
}

/**
 * Validates image file before reading, compressing, or uploading
 * Returns { valid: boolean, error?: string }
 */
export function validateImageFile(file) {
  if (!file) {
    return { valid: false, error: 'No file selected.' };
  }

  // 1. File Size Verification (Max 15MB)
  if (file.size > MAX_FILE_SIZE_BYTES) {
    const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
    return { valid: false, error: `"${file.name}" is ${sizeMb}MB. Maximum permitted size is 15MB.` };
  }

  if (file.size === 0) {
    return { valid: false, error: `"${file.name}" is empty (0 bytes).` };
  }

  // 2. MIME Type Verification (Strict Photographic Whitelist)
  const mime = (file.type || '').toLowerCase();
  if (!mime || !ALLOWED_IMAGE_MIME_TYPES.has(mime)) {
    return { valid: false, error: `"${file.name}" is not an accepted photo format. Only JPG, PNG, WebP, GIF, or HEIC are supported.` };
  }

  // 3. File Extension Verification
  const parts = file.name.split('.');
  if (parts.length < 2) {
    return { valid: false, error: `"${file.name}" has no file extension. Only photo files are accepted.` };
  }

  const ext = parts.pop().toLowerCase();
  if (!ALLOWED_IMAGE_EXTENSIONS.has(ext)) {
    return { valid: false, error: `".${ext}" is not an allowed image extension.` };
  }

  // 4. Block Hidden Executable Patterns / Double Extensions (.php.jpg, .exe.png, etc.)
  const baseName = parts.join('.').toLowerCase();
  const dangerousExts = ['php', 'phtml', 'exe', 'bat', 'sh', 'py', 'pl', 'cgi', 'js', 'html', 'htm', 'svg', 'xml', 'jar', 'vbs', 'cmd'];
  for (const dang of dangerousExts) {
    if (baseName.endsWith(`.${dang}`)) {
      return { valid: false, error: `"${file.name}" contains an unauthorized executable file pattern.` };
    }
  }

  return { valid: true };
}

/**
 * Sanitizes file names to prevent directory traversal and special control characters
 */
export function sanitizeFileName(fileName) {
  if (!fileName || typeof fileName !== 'string') {
    return `photo-${Date.now()}.jpg`;
  }

  // Strip path traversal characters, slashes, null bytes, and non-printable control chars
  let clean = fileName
    .replace(/[\/\?<>\\:\*\|":]/g, '')
    .replace(/[\x00-\x1F\x7F]/g, '')
    .replace(/\.\.+/g, '.')
    .replace(/^\.+/, '')
    .trim();

  if (!clean || clean.length === 0) {
    clean = `memory-${Date.now()}.jpg`;
  }

  if (clean.length > 80) {
    const ext = clean.split('.').pop();
    clean = `${clean.slice(0, 70)}.${ext}`;
  }

  return clean;
}

/**
 * Validates that a Base64 string is a genuine image data URL
 */
export function isSafeImageDataUrl(dataUrl) {
  if (typeof dataUrl !== 'string') return false;
  // Must start with valid image base64 header
  const regex = /^data:image\/(jpeg|png|webp|gif);base64,[A-Za-z0-9+/=]+$/;
  return regex.test(dataUrl);
}
