import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const COOKIE = "sb_admin_session";

function isProtectedAdminApi(pathname: string): boolean {
  if (!pathname.startsWith("/api/admin")) return false;
  return pathname !== "/api/admin/login";
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isProtectedAdminApi(pathname)) {
    const secret = process.env.SESSION_SECRET;
    if (!secret || secret.length < 32) {
      return NextResponse.json({ error: "Server configuration error" }, { status: 503 });
    }

    const token = request.cookies.get(COOKIE)?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
      await jwtVerify(token, new TextEncoder().encode(secret));
      return NextResponse.next();
    } catch {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  if (!pathname.startsWith("/admin")) return NextResponse.next();
  if (pathname.startsWith("/admin/login")) return NextResponse.next();

  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 32) {
    return NextResponse.redirect(new URL("/admin/login?error=config", request.url));
  }

  const token = request.cookies.get(COOKIE)?.value;
  if (!token) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  try {
    await jwtVerify(token, new TextEncoder().encode(secret));
    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
