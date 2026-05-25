import { NextResponse } from "next/server";
import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { z } from "zod";
import { checkRateLimit, clientIp } from "@/lib/rate-limit";

const schema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email().max(120),
  phone: z.string().max(40).optional(),
  subject: z.string().max(200).optional(),
  message: z.string().min(10).max(3000),
});

export async function POST(request: Request) {
  const ip = clientIp(request);
  const limit = await checkRateLimit(`contact:${ip}`, 5, 15 * 60 * 1000);
  if (!limit.ok) {
    return NextResponse.json(
      { error: `Příliš mnoho pokusů. Zkuste znovu za ${limit.retryAfterSec} s.` },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Neplatná data." }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Vyplňte povinná pole." }, { status: 400 });
  }

  const dir = path.join(process.cwd(), "data", "cms", "submissions");
  await mkdir(dir, { recursive: true });
  const file = path.join(dir, `contact-${Date.now()}.json`);
  await writeFile(file, JSON.stringify({ ...parsed.data, submittedAt: new Date().toISOString() }, null, 2));

  return NextResponse.json({ ok: true });
}
