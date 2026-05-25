import { NextResponse } from "next/server";
import { z } from "zod";
import { getContent, saveContent } from "@/lib/cms/store";
import { newId } from "@/lib/cms/types";
import { checkRateLimit, clientIp } from "@/lib/rate-limit";

const schema = z.object({
  author: z.string().min(2).max(120),
  rating: z.number().int().min(1).max(5),
  text: z.string().min(20).max(2000),
  location: z.string().max(120).optional(),
  productHint: z.string().max(200).optional(),
});

export async function POST(request: Request) {
  const ip = clientIp(request);
  const limit = await checkRateLimit(`review:${ip}`, 3, 60 * 60 * 1000);
  if (!limit.ok) {
    return NextResponse.json(
      { error: `Příliš mnoho pokusů. Zkuste znovu za ${limit.retryAfterSec} s.` },
      { status: 429 }
    );
  }

  const content = await getContent();
  if (!content.reviewsEnabled) {
    return NextResponse.json({ error: "Recenze jsou dočasně vypnuté." }, { status: 403 });
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

  content.reviews.unshift({
    id: newId("rev"),
    ...parsed.data,
    source: "customer",
    status: "pending",
    createdAt: new Date().toISOString().slice(0, 10),
  });

  await saveContent(content);
  return NextResponse.json({ ok: true });
}

export async function GET() {
  const content = await getContent();
  if (!content.reviewsEnabled) {
    return NextResponse.json({ reviews: [], enabled: false });
  }
  const reviews = content.reviews.filter((r) => r.status === "approved");
  return NextResponse.json({ reviews, enabled: true });
}
