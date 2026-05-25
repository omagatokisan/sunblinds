/** Zapněte v .env.local: NEXT_PUBLIC_SUBPAGES_CONTENT=1 pro plný obsah podstránek */
export const SUBPAGES_CONTENT_ENABLED =
  process.env.NEXT_PUBLIC_SUBPAGES_CONTENT === "1";

/** Vše mimo homepage a admin zobrazí pouze landing se zprávou o aktualizaci */
export function isSubpageLandingOnly(pathname: string): boolean {
  if (SUBPAGES_CONTENT_ENABLED) return false;
  if (pathname === "/") return false;
  if (pathname.startsWith("/admin")) return false;
  return true;
}
