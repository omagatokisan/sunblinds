"use client";

import { usePathname } from "next/navigation";
import { GlobalSearch } from "@/components/search/GlobalSearch";
import { Container } from "@/components/ui/Container";

export function GlobalHeroStrip() {
  const pathname = usePathname();
  const isProductDetail = /^\/reseni\/[^/]+\/[^/]+\/[^/]+$/.test(pathname);

  if (pathname.startsWith("/admin") || pathname === "/" || isProductDetail) return null;

  return (
    <section className="hero-search-strip sticky z-30 border-b border-line bg-surface/95 py-4 backdrop-blur-sm">
      <Container width="narrow">
        <p className="label-caps mb-3 text-center">Vyhledávání</p>
        <GlobalSearch variant="compact" />
      </Container>
    </section>
  );
}
