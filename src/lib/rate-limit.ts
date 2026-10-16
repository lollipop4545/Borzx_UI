import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// Only instantiate Redis if the env vars are set.
// This prevents build failures if Upstash is not yet configured.
function getRedis(): Redis | null {
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    return null;
  }
  return new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });
}

const redis = getRedis();

// Sliding window rate limiters per endpoint class.
// Each limiter is lazily created only if Redis is available.

function makeLimiter(requests: number, window: `${number} s` | `${number} m` | `${number} h`) {
  if (!redis) return null;
  return new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(requests, window),
    analytics: false,
  });
}

// ── Limiters ──────────────────────────────────────────────────────────────────
export const redirectLimiter   = makeLimiter(60, '1 m');   // /s/* - redirect pages
export const authLimiter       = makeLimiter(5,  '1 m');   // /api/auth - brute-force guard
export const waitlistLimiter   = makeLimiter(3,  '1 m');   // /api/waitlist - spam guard
export const linkCreateLimiter = makeLimiter(30, '1 m');   // POST /api/links
export const adminLimiter      = makeLimiter(30, '1 m');   // /api/admin/*
export const defaultLimiter    = makeLimiter(120, '1 m');  // everything else
