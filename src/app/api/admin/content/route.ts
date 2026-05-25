import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { requireSession } from "@/lib/auth/session";
import { getContent, saveContent } from "@/lib/cms/store";
import { siteContentSchema } from "@/lib/cms/schema";

export async function GET() {
  try {
    await requireSession();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const content = await getContent();
  return NextResponse.json(content);
}

export async function PUT(request: Request) {
  try {
    await requireSession();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = siteContentSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Validation failed", details: parsed.error.flatten() }, { status: 400 });
  }

  await saveContent(parsed.data);
  revalidatePath("/", "layout");
  return NextResponse.json({ ok: true });
}
