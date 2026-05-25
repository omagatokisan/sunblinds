import Link from "next/link";
import { HomeReveal } from "@/components/home/HomeReveal";
import { HomeSectionHead } from "@/components/home/HomeSectionHead";
import { company } from "@/data/company";

const INQUIRY_HINTS = [
  "Co stínit — fasáda, interiér nebo terasa",
  "Orientace oken a hrubé rozměry",
  "Preferovaný termín realizace",
] as const;

const COOPERATION_POINTS = [
  "Stínění, okna, sítě i vrata v jedné souhře",
  "Vzorky látek a barvy RAL ve showroomu Libuš",
  "Seřízení, výměny dílů a servis po instalaci",
] as const;

export function HomeCtaDark({ responseTime }: { responseTime: string }) {
  return (
    <section className="hd-block hd-home-cta" aria-label="Kontakt a spolupráce">
      <div className="hd-home-cta__mesh" aria-hidden />
      <div className="hd-shell hd-home-cta__shell">
        <div className="hd-home-cta__grid">
          <article className="hd-home-cta__col">
            <HomeSectionHead
              id="hd-offer-cta-title"
              eyebrow="Poptávka"
              title="Popište projekt"
              titleMuted="a my navrhneme řešení"
              lead={`Vyplňte formulář nebo nám napište pár informací o objektu. ${responseTime}`}
              align="left"
            />
            <HomeReveal delay={90}>
              <ul className="hd-home-cta__points">
                {INQUIRY_HINTS.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <div className="hd-home-cta__actions">
                <Link href="/poptavka" className="hd-btn hd-btn--primary">
                  Nezávazná poptávka
                </Link>
                <Link href="/showroom" className="hd-link">
                  Domluvit návštěvu showroomu →
                </Link>
              </div>
            </HomeReveal>
          </article>

          <article className="hd-home-cta__col hd-home-cta__col--alt">
            <HomeSectionHead
              id="hd-closing-cta-title"
              eyebrow="Spolupráce"
              title="Jeden tým"
              titleMuted="pro celý dům"
              lead="U rodinných domů i větších projektů držíme jednu linku — od výběru systému přes montáž až po následnou péči."
              align="left"
            />
            <HomeReveal delay={140}>
              <ul className="hd-home-cta__points">
                {COOPERATION_POINTS.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <div className="hd-home-cta__actions">
                <Link href={company.phoneHref} className="hd-btn hd-btn--primary">
                  Zavolat {company.phone}
                </Link>
                <Link href={company.emailHref} className="hd-link">
                  Napsat e-mail →
                </Link>
              </div>
            </HomeReveal>
          </article>
        </div>
      </div>
    </section>
  );
}
