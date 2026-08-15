// Simple in-memory rate limiting utility for registration and confirmation endpoints
// In production, this should be replaced with a distributed store like Redis

interface CacheEntry {
  timestamps: number[];
}

const rateLimitCache = new Map<string, CacheEntry>();

export interface RateLimitResult {
  success: boolean;
  remaining: number;
  resetTime: number;
  error?: string;
}

export function checkRateLimit(
  key: string,
  limit: number,
  windowMs: number
): RateLimitResult {
  const now = Date.now();
  const cleanKey = key.toLowerCase().trim();

  // Clean old entries from cache to prevent leaks
  for (const [k, v] of rateLimitCache.entries()) {
    const valid = v.timestamps.filter((t) => now - t < windowMs);
    if (valid.length === 0) {
      rateLimitCache.delete(k);
    } else {
      v.timestamps = valid;
    }
  }

  if (!rateLimitCache.has(cleanKey)) {
    rateLimitCache.set(cleanKey, { timestamps: [now] });
    return {
      success: true,
      remaining: limit - 1,
      resetTime: now + windowMs,
    };
  }

  const entry = rateLimitCache.get(cleanKey)!;
  // Filter timestamps to only keep those within the window
  entry.timestamps = entry.timestamps.filter((t) => now - t < windowMs);

  if (entry.timestamps.length >= limit) {
    const oldest = entry.timestamps[0];
    const resetTime = oldest + windowMs;
    const waitSeconds = Math.ceil((resetTime - now) / 1000);
    
    return {
      success: false,
      remaining: 0,
      resetTime,
      error: `Too many requests. Please try again in ${waitSeconds} seconds.`,
    };
  }

  entry.timestamps.push(now);
  return {
    success: true,
    remaining: limit - entry.timestamps.length,
    resetTime: now + windowMs,
  };
}
