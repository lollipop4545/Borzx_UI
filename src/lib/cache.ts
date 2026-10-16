import { Redis } from '@upstash/redis';
import { prisma } from './prisma';

// ── Redis client ──────────────────────────────────────────────────────────────
let _redis: Redis | null = null;

function getRedis(): Redis | null {
  if (_redis) return _redis;
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    return null;
  }
  _redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });
  return _redis;
}

// ── Types ─────────────────────────────────────────────────────────────────────
interface CachedLink {
  id: string;
  destination: string;
}

// ── TTLs ─────────────────────────────────────────────────────────────────────
const LINK_TTL_SECONDS = 300; // 5 minutes
const NOT_FOUND_TTL_SECONDS = 60; // Cache 404s for 1 minute to prevent DB hammering

// ── Keys ─────────────────────────────────────────────────────────────────────
const linkKey = (path: string) => `link:path:${path}`;
const notFoundKey = (path: string) => `link:404:${path}`;

// ── Link lookup with Redis caching ────────────────────────────────────────────

/**
 * Looks up a link by its short path.
 * Checks Redis first, falls back to Prisma, and caches the result.
 * Returns null if the link does not exist.
 */
export async function getCachedLink(path: string): Promise<CachedLink | null> {
  const redis = getRedis();

  if (redis) {
    // Check negative cache (known 404) first - cheapest operation
    const isNotFound = await redis.exists(notFoundKey(path));
    if (isNotFound) return null;

    // Check positive cache
    const cached = await redis.get<CachedLink>(linkKey(path));
    if (cached) return cached;
  }

  // Cache miss - hit the database
  const link = await prisma.link.findUnique({
    where: { path },
    select: { id: true, destination: true },
  });

  if (redis) {
    if (link) {
      // Cache the found link
      await redis.set(linkKey(path), link, { ex: LINK_TTL_SECONDS });
    } else {
      // Cache the negative result to prevent DB hammering on invalid paths
      await redis.set(notFoundKey(path), '1', { ex: NOT_FOUND_TTL_SECONDS });
    }
  }

  return link;
}

/**
 * Invalidates the Redis cache for a given short path.
 * Call this whenever a link is created, updated, or deleted.
 */
export async function invalidateLinkCache(path: string): Promise<void> {
  const redis = getRedis();
  if (!redis) return;
  await redis.del(linkKey(path));
  await redis.del(notFoundKey(path));
}

// ── Analytics buffering ───────────────────────────────────────────────────────

const CLICK_BUFFER_TTL = 3600; // 1 hour - buffer expiry safety net

/**
 * Buffers a click count increment in Redis.
 * Flushed to Postgres by the cron job every minute.
 */
export async function bufferClickIncrement(linkId: string): Promise<void> {
  const redis = getRedis();
  if (!redis) return;
  const key = `clicks:pending:${linkId}`;
  await redis.incr(key);
  await redis.expire(key, CLICK_BUFFER_TTL);
}

/**
 * Buffers a click event payload in Redis.
 * Flushed to Postgres by the cron job every minute.
 */
export async function bufferClickEvent(event: {
  linkId: string;
  userAgent: string;
  browser: string;
  os: string;
  device: string;
  country: string;
  city: string | null;
  referrer: string;
  ipHash: string;
}): Promise<void> {
  const redis = getRedis();
  if (!redis) return;
  const key = `click_events:pending`;
  await redis.lpush(key, JSON.stringify({ ...event, timestamp: new Date().toISOString() }));
  await redis.expire(key, CLICK_BUFFER_TTL);
}

/**
 * Returns the Redis client for use in the cron flush route.
 * Returns null if Redis is not configured.
 */
export function getRedisClient(): Redis | null {
  return getRedis();
}
