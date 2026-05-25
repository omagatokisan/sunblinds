"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { HomeReveal } from "@/components/home/HomeReveal";
import { HomeSectionHead } from "@/components/home/HomeSectionHead";
import { Button } from "@/components/ui/Button";
import { IMG_QUALITY, imgSizes } from "@/lib/image-presets";

const SYSTEMS = [
  {
    id: "rovo",
    label: "Rovo",
    type: "Venkovní rolety",
    lead: "Samonosný roletový systém bez stavební přípravy v překladu.",
    body: "Montáž přímo na fasádu, úspora energií, zatemnění i vyšší bezpečnost. Motorizace i chytrá domácnost.",
    image: "https://sunblinds.cz/images/slider_1/big/rovo_2.png",
    href: "/reseni/samonosne-systemy/venkovni-stineni/rovo",
  },
  {
    id: "rafe",
    label: "Rafe",
    type: "Venkovní žaluzie",
    lead: "Polohovatelné lamely pro přesnou regulaci světla a soukromí.",
    body: "Ideální pro východní a západní stranu domu. Samonosná konstrukce, barvy RAL, ruční i motorické ovládání.",
    image: "https://sunblinds.cz/images/slider_1/big/rafe_sicht_c-122-180_dtf-18-1-m_p400_2.png",
    href: "/reseni/samonosne-systemy/venkovni-stineni/rafe",
  },
  {
    id: "zivo",
    label: "Zivo",
    type: "Screenové rolety",
    lead: "Elegantní stínění s průhledem světla a ochranou proti přehřátí.",
    body: "Vhodné pro velké prosklené plochy a moderní fasády. Dodatečná montáž bez zásahu do zdiva.",
    image: "https://sunblinds.cz/images/slider_1/big/zivo_sicht_plf-23-1-m_p400_2.png",
    href: "/reseni/samonosne-systemy/venkovni-stineni/zivo",
  },
] as const;

export function HomeFeatured() {
  const [active, setActive] = useState(0);
  const system = SYSTEMS[active];

  return (
    <section className="hd-block hd-featured" aria-labelledby="hd-featured-title">
      <div className="hd-glow hd-glow--brand hd-featured__glow" aria-hidden />
      <div className="hd-shell">
        <div className="hd-featured__layout">
          <div className="hd-featured__copy">
            <HomeSectionHead
              id="hd-featured-title"
              index="03"
              eyebrow="Samonosné systémy"
              title="Venkovní stínění"
              titleMuted="bez stavební přípravy"
              lead="Rovo, Rafe a Zivo montujeme na fasádu — ideální pro rekonstrukce i rodinné domy, kde není připravený překlad."
              align="left"
            />

            <HomeReveal delay={80}>
              <div className="hd-featured__tabs" role="tablist" aria-label="Samonosné systémy">
                {SYSTEMS.map((item, index) => (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    aria-selected={active === index}
                    className={`hd-featured__tab ${active === index ? "is-active" : ""}`}
                    onClick={() => setActive(index)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              <div key={system.id} className="hd-featured__panel" role="tabpanel">
                <p className="hd-featured__type">{system.type}</p>
                <p className="hd-featured__lead">{system.lead}</p>
                <p className="hd-featured__body">{system.body}</p>
                <div className="hd-featured__actions">
                  <Button href={system.href} size="lg" className="hd-btn hd-btn--primary">
                    Detail produktu
                  </Button>
                  <Link href="/reseni/samonosne-systemy" className="hd-link">
                    Celá kategorie →
                  </Link>
                </div>
              </div>
            </HomeReveal>
          </div>

          <HomeReveal className="hd-featured__visual" delay={120}>
            <div className="hd-featured__image">
              <Image
                key={system.id}
                src={system.image}
                alt={system.type}
                fill
                quality={IMG_QUALITY}
                className="object-contain p-4 sm:p-8"
                sizes={imgSizes.pageSplit}
                priority
              />
            </div>
          </HomeReveal>
        </div>
      </div>
    </section>
  );
}
