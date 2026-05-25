import { NextResponse } from "next/server";
import { z } from "zod";
import { access } from "node:fs/promises";
import path from "node:path";
import {
  verifyAdminPassword,
  isLoginLocked,
  recordFailedLogin,
  clearLoginAttempts,
} from "@/lib/auth/password";

async function adminHashExists() {
  try {
    await access(path.join(process.cwd(), "data", "cms", ".admin-hash"));
    return true;
  } catch {
    return false;
  }
}
import { createSession } from "@/lib/auth/session";

const bodySchema = z.object({
  password: z.string().min(1).max(200),
});

function clientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() ?? "unknown";
  return "local";
}

export async function POST(request: Request) {
  const ip = clientIp(request);

  if (await isLoginLocked(ip)) {
    return NextResponse.json(
      { error: "Příliš mnoho pokusů. Zkuste to za 15 minut." },
      { status: 429 }
    );
  }

  if (!(await adminHashExists())) {
    return NextResponse.json(
      {
        error:
          "Admin heslo ještě není nastavené. V terminálu spusťte: npm.cmd run admin:init (po vyplnění ADMIN_PASSWORD v .env.local).",
      },
      { status: 503 }
    );
  }

  let body: z.infer<typeof bodySchema>;
  try {
    body = bodySchema.parse(await request.json());
  } catch {
    return NextResponse.json({ error: "Neplatný požadavek." }, { status: 400 });
  }

  const valid = await verifyAdminPassword(body.password);
  if (!valid) {
    await recordFailedLogin(ip);
    return NextResponse.json({ error: "Nesprávné heslo." }, { status: 401 });
  }

  await clearLoginAttempts(ip);
  await createSession();

  return NextResponse.json({ ok: true });
}
