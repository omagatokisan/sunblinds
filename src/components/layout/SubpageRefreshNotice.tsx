import Link from "next/link";
import { company } from "@/data/company";

export function SubpageRefreshNotice() {
  return (
    <section className="sp-landing" aria-labelledby="sp-landing-title">
      <div className="sp-landing__mesh" aria-hidden />
      <div className="sp-landing__glow" aria-hidden />
      <div className="sp-landing__inner">
        <span className="sp-landing__badge">
          <span className="sp-landing__badge-dot" aria-hidden />
          Aktualizace v přípravě
        </span>
        <h1 id="sp-landing-title" className="sp-landing__title">
          Tato stránka se právě aktualizuje
        </h1>
        <p className="sp-landing__text">
          Grafické rozložení podstránek ladíme podle vaší preference. Pracujeme na sjednocení
          vzhledu s úvodní stránkou.
        </p>
        <p className="sp-landing__hint">
          Mezitím najdete vše důležité na homepage — řešení, reference, kontakt a poptávku.
        </p>
        <div className="sp-landing__actions">
          <Link href="/" className="sp-landing__cta">
            Přejít na úvodní stránku
          </Link>
          <a href={company.phoneHref} className="sp-landing__link">
            {company.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
