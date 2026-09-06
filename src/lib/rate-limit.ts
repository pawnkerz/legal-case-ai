type Bucket = { count: number; resetAt: number };
const buckets = new Map<string, Bucket>();

export function localRateLimit(key: string, max = 20, windowMs = 60_000) {
  const now = Date.now();
  const current = buckets.get(key);
  if (!current || current.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: max - 1 };
  }
  if (current.count >= max) return { allowed: false, remaining: 0 };
  current.count += 1;
  return { allowed: true, remaining: max - current.count };
}
