import { NextResponse } from "next/server";
import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { z } from "zod";
import { checkRateLimit, clientIp } from "@/lib/rate-limit";

const schema = z.object({
  name: z.string().min(2).max(120),
  phone: z.string().min(6).max(40),
  email: z.string().email().max(120).optional().or(z.literal("")),
  location: z.string().max(200).optional(),
  generalNote: z.string().max(3000).optional(),
  lines: z
    .array(
      z.object({
        solutionSlug: z.string().max(80),
        groupSlug: z.string().max(80),
        productSlug: z.string().max(80),
        widthMm: z.string().max(20).optional(),
        heightMm: z.string().max(20).optional(),
        quantity: z.string().max(10),
        mounting: z.string().max(120).optional(),
        control: z.string().max(120).optional(),
        location: z.string().max(120).optional(),
        note: z.string().max(500).optional(),
      })
    )
    .min(1)
    .max(20),
});

export async function POST(request: Request) {
  const ip = clientIp(request);
  const limit = await checkRateLimit(`inquiry:${ip}`, 5, 15 * 60 * 1000);
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
  const file = path.join(dir, `inquiry-${Date.now()}.json`);
  await writeFile(file, JSON.stringify({ ...parsed.data, submittedAt: new Date().toISOString() }, null, 2));

  return NextResponse.json({ ok: true });
}
