import crypto from 'crypto';

// ── URL Validation ────────────────────────────────────────────────────────────

const ALLOWED_PROTOCOLS = ['http:', 'https:'];
const MAX_URL_LENGTH = 2048;

/**
 * Validates that a destination URL is safe to store and redirect to.
 * Rejects dangerous schemes (javascript:, data:, vbscript:, etc.)
 */
export function isValidDestinationUrl(url: string): { valid: boolean; reason?: string } {
  if (!url || typeof url !== 'string') {
    return { valid: false, reason: 'URL is required.' };
  }

  if (url.length > MAX_URL_LENGTH) {
    return { valid: false, reason: `URL must be ${MAX_URL_LENGTH} characters or fewer.` };
  }

  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return { valid: false, reason: 'Invalid URL format. Must start with http:// or https://' };
  }

  if (!ALLOWED_PROTOCOLS.includes(parsed.protocol)) {
    return {
      valid: false,
      reason: `URL protocol "${parsed.protocol}" is not allowed. Only http:// and https:// are permitted.`,
    };
  }

  // Block localhost and private IP ranges (SSRF prevention)
  const hostname = parsed.hostname.toLowerCase();
  if (
    hostname === 'localhost' ||
    hostname === '127.0.0.1' ||
    hostname === '::1' ||
    hostname.startsWith('192.168.') ||
    hostname.startsWith('10.') ||
    hostname.startsWith('172.') ||
    hostname.endsWith('.local') ||
    hostname === '0.0.0.0'
  ) {
    return { valid: false, reason: 'URL cannot point to a local or private network address.' };
  }

  return { valid: true };
}

// ── Path Validation ───────────────────────────────────────────────────────────

const MAX_PATH_LENGTH = 50;
// Alphanumeric, hyphens, underscores only
const SAFE_PATH_REGEX = /^[a-zA-Z0-9_-]+$/;
// Reserved paths that conflict with app routes
const RESERVED_PATHS = new Set([
  'api', 'auth', 'app', 's', '_next', 'favicon.ico', 'robots.txt', 'sitemap.xml',
  'login', 'logout', 'dashboard', 'admin', 'static', 'public',
]);

/**
 * Validates a custom short path.
 */
export function isValidShortPath(path: string): { valid: boolean; reason?: string } {
  if (!path || typeof path !== 'string') {
    return { valid: false, reason: 'Path is required.' };
  }

  const trimmed = path.trim();

  if (trimmed.length === 0) {
    return { valid: false, reason: 'Path cannot be empty.' };
  }

  if (trimmed.length > MAX_PATH_LENGTH) {
    return { valid: false, reason: `Path must be ${MAX_PATH_LENGTH} characters or fewer.` };
  }

  if (!SAFE_PATH_REGEX.test(trimmed)) {
    return {
      valid: false,
      reason: 'Path may only contain letters, numbers, hyphens (-), and underscores (_).',
    };
  }

  if (RESERVED_PATHS.has(trimmed.toLowerCase())) {
    return { valid: false, reason: `"${trimmed}" is a reserved path and cannot be used.` };
  }

  return { valid: true };
}

// ── Secure Random Path Generation ─────────────────────────────────────────────

const PATH_CHARSET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

/**
 * Generates a cryptographically secure random short path.
 * Uses crypto.randomBytes() instead of Math.random().
 */
export function generateSecurePath(length = 6): string {
  const bytes = crypto.randomBytes(length);
  let result = '';
  for (let i = 0; i < length; i++) {
    // Modulo bias is negligible here (charset length = 62, byte range = 256)
    result += PATH_CHARSET[bytes[i] % PATH_CHARSET.length];
  }
  return result;
}
