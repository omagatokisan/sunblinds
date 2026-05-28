import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Stránka nenalezena",
  description: "Požadovaná stránka neexistuje.",
  path: "/404",
  noIndex: true,
});

export default function NotFound() {
  return (
    <Container className="py-24 text-center">
      <p className="text-xs font-semibold uppercase tracking-wider text-brand">404</p>
      <h1 className="mt-3 text-3xl font-semibold text-ink">Stránka nenalezena</h1>
      <p className="mt-3 text-muted">Zkuste přejít na přehled řešení nebo kontakt.</p>
      <div className="mt-8 flex justify-center gap-3">
        <Button href="/reseni">Řešení</Button>
        <Button href="/" variant="secondary">
          Úvod
        </Button>
      </div>
      <p className="mt-6">
        <Link href="/kontakt" className="text-sm text-brand hover:underline">
          Kontakt →
        </Link>
      </p>
    </Container>
  );
}
