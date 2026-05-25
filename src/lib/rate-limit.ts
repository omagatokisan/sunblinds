import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

const RATE_DIR = path.join(process.cwd(), "data", "cms", "rate-limits");

type Bucket = { count: number; resetAt: number };

async function readBuckets(): Promise<Record<string, Bucket>> {
  try {
    return JSON.parse(await readFile(path.join(RATE_DIR, "buckets.json"), "utf8")) as Record<
      string,
      Bucket
    >;
  } catch {
    return {};
  }
}

async function writeBuckets(data: Record<string, Bucket>) {
  await mkdir(RATE_DIR, { recursive: true });
  await writeFile(path.join(RATE_DIR, "buckets.json"), JSON.stringify(data), "utf8");
}

export function clientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() ?? "unknown";
  return "local";
}

export async function checkRateLimit(
  key: string,
  max: number,
  windowMs: number
): Promise<{ ok: true } | { ok: false; retryAfterSec: number }> {
  const now = Date.now();
  const data = await readBuckets();
  const bucket = data[key];

  if (!bucket || now >= bucket.resetAt) {
    data[key] = { count: 1, resetAt: now + windowMs };
    await writeBuckets(data);
    return { ok: true };
  }

  if (bucket.count >= max) {
    return { ok: false, retryAfterSec: Math.ceil((bucket.resetAt - now) / 1000) };
  }

  bucket.count += 1;
  data[key] = bucket;
  await writeBuckets(data);
  return { ok: true };
}
