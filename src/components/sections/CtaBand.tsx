import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function CtaBand({
  title = "Nevíte, které řešení je pro váš dům?",
  description = "Napište typ stavby a co řešíte — orientačně poradíme po telefonu, u větších zakázek přijedeme zaměřit.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="hd-block hd-cta" aria-label="Výzva k akci">
      <div className="hd-glow hd-glow--brand hd-cta__glow" aria-hidden />
      <div className="hd-shell hd-cta__inner">
        <div>
          <p className="hd-eyebrow hd-eyebrow--light">
            <span className="hd-eyebrow__mark" aria-hidden />
            Další krok
          </p>
          <h2 className="hd-cta__title">{title}</h2>
          <p className="hd-cta__lead">{description}</p>
        </div>
        <div className="hd-cta__actions">
          <Button href="/poptavka" size="lg" className="hd-btn hd-btn--light">
            Nezávazná poptávka
          </Button>
          <Link href="/kontakt" className="hd-cta__phone">
            Kontakt a telefon →
          </Link>
        </div>
      </div>
    </section>
  );
}
