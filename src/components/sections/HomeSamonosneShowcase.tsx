"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { PageSection } from "@/components/layout/PageSection";
import { IMG_QUALITY, imgClass, imgSizes } from "@/lib/image-presets";

type Slide = {
  id: string;
  tabLabel: string;
  tabImage: string;
  title: string;
  brand?: string;
  lead: string;
  body: string;
  heroImage: string;
  heroAlt: string;
  href: string;
};

const SLIDES: Slide[] = [
  {
    id: "rovo",
    tabLabel: "Venkovní rolety",
    tabImage: "https://sunblinds.cz/images/slider_1/small/rovo_sicht_e170_standard_p400_1.png",
    title: "Venkovní rolety",
    brand: "Rovo",
    lead: "Stínící systémy rolet spojující funkčnost, bezpečnost a estetický vzhled.",
    body: "Venkovní rolety Rovo díky svému kvalitnímu provedení chrání váš interiér před přehříváním, hlukem a zároveň zvyšují úroveň zabezpečení domu a přispívají k úsporám energie. Instalace pod fasádu nebo dodatečné předokenní montáži.",
    heroImage: "https://sunblinds.cz/images/slider_1/big/rovo_2.png",
    heroAlt: "Venkovní rolety Rovo na rodinném domě",
    href: "/reseni/samonosne-systemy/venkovni-stineni/rovo",
  },
  {
    id: "rafe",
    tabLabel: "Venkovní žaluzie",
    tabImage: "https://sunblinds.cz/images/slider_1/small/rafe_sicht_c-122-180_dtf-18-1-m_p400_1.png",
    title: "Venkovní žaluzie",
    brand: "Rafe",
    lead: "Samonosný systém žaluzií s vysokou funkčností a moderním designem.",
    body: "Venkovní žaluzie Rafe díky polohovatelným lamelám představují špičkové řešení pro regulaci světla, tepla i soukromí. Na výběr máte ze dvou variant hliníkových lamel; C80 nebo Z93. Instalace pod fasádu nebo dodatečné předokenní montáži.",
    heroImage: "https://sunblinds.cz/images/slider_1/big/rafe_sicht_c-122-180_dtf-18-1-m_p400_2.png",
    heroAlt: "Venkovní žaluzie Rafe na fasádě",
    href: "/reseni/samonosne-systemy/venkovni-stineni/rafe",
  },
  {
    id: "zivo",
    tabLabel: "Screenové rolety",
    tabImage: "https://sunblinds.cz/images/slider_1/small/zivo_sicht_plf-23-1-m_p400_1.png",
    title: "Screenové rolety",
    brand: "Zivo",
    lead: "Venkovní stínění s důrazem na estetiku, funkčnost a energetickou účinnost.",
    body: "Screenové rolety Zivo s jednoduchou obsluhou nabízí elegantní řešení pro regulaci světla a tepelné pohody v interiéru. Instalace pod fasádu nebo dodatečné předokenní montáži.",
    heroImage: "https://sunblinds.cz/images/slider_1/big/zivo_sicht_plf-23-1-m_p400_2.png",
    heroAlt: "Screenové rolety Zivo",
    href: "/reseni/samonosne-systemy/venkovni-stineni/zivo",
  },
  {
    id: "parapet",
    tabLabel: "Parapetní systémy",
    tabImage: "https://sunblinds.cz/images/slider_1/small/parapet.png",
    title: "Parapetní systém",
    lead: "Nedílná součást celkového řešení otvorových výplní bez kompromisů.",
    body: "Parapetní systémy jsou navrženy pro efektivní vedení kabeláže a estetické zakončení interiérových a exteriérových prostor. Zajišťují lepší tepelnou izolaci, zabraňují propustnosti vody a dlouhodobě chrání stavební otvor.",
    heroImage: "https://sunblinds.cz/images/slider_1/big/parapet.png",
    heroAlt: "Parapetní systém u okenního otvoru",
    href: "/reseni/samonosne-systemy/parapetni-systemy/parapetni-systemy",
  },
];

type TabMetrics = {
  left: number;
  width: number;
};

export function HomeSamonosneShowcase() {
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [tabMetrics, setTabMetrics] = useState<TabMetrics>({ left: 0, width: 0 });

  const tabsRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const slide = SLIDES[active];

  const goTo = useCallback(
    (index: number) => {
      if (animating) return;
      const next = ((index % SLIDES.length) + SLIDES.length) % SLIDES.length;
      if (next === active) return;
      setAnimating(true);
      setActive(next);
    },
    [active, animating]
  );

  const syncTabIndicator = useCallback(() => {
    const activeTab = tabRefs.current[active];
    if (!activeTab) return;

    setTabMetrics({
      left: activeTab.offsetLeft,
      width: activeTab.offsetWidth,
    });
  }, [active]);

  useLayoutEffect(() => {
    syncTabIndicator();
  }, [syncTabIndicator]);

  useEffect(() => {
    const onResize = () => syncTabIndicator();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [syncTabIndicator]);

  useEffect(() => {
    if (!animating) return;
    const timer = window.setTimeout(() => setAnimating(false), 520);
    return () => window.clearTimeout(timer);
  }, [animating, active]);

  return (
    <PageSection id="samonosne-systemy">
      <Container width="wide">
        <div className="page-section-head page-section-head--split">
          <div>
            <p className="label-caps label-caps--plain">Samonosné systémy</p>
            <h2 className="section-title mt-3 max-w-lg">Samonosné systémy stínění</h2>
          </div>
          <p className="page-section-lead">
            Stínící technika reguluje světlo z vnějšího okolí, zabraňuje prostupujícímu teplu a
            především zajišťuje vaše soukromí.
          </p>
        </div>

        <div className="samonosne-showcase">
          <div className="samonosne-showcase-tabs-wrap">
            <div ref={tabsRef} className="samonosne-showcase-tabs" role="tablist" aria-label="Typ samonosného systému">
              {SLIDES.map((item, index) => (
                <button
                  key={item.id}
                  ref={(node) => {
                    tabRefs.current[index] = node;
                  }}
                  type="button"
                  role="tab"
                  aria-selected={index === active}
                  aria-controls={`samonosne-panel-${item.id}`}
                  id={`samonosne-tab-${item.id}`}
                  className={`samonosne-showcase-tab ${index === active ? "is-active" : ""}`}
                  onClick={() => goTo(index)}
                  disabled={animating}
                >
                  <span className="samonosne-showcase-tab-thumb">
                    <Image
                      src={item.tabImage}
                      alt=""
                      fill
                      quality={IMG_QUALITY}
                      className="samonosne-showcase-tab-img"
                      sizes="96px"
                    />
                  </span>
                  <span className="samonosne-showcase-tab-label">{item.tabLabel}</span>
                </button>
              ))}
              <span
                className="samonosne-showcase-tabs-indicator"
                aria-hidden
                style={{
                  transform: `translateX(${tabMetrics.left}px)`,
                  width: `${tabMetrics.width}px`,
                }}
              />
            </div>
          </div>

          <div className="samonosne-showcase-panel">
            <button
              type="button"
              className="samonosne-showcase-nav samonosne-showcase-nav--prev"
              aria-label="Předchozí systém"
              onClick={() => goTo(active - 1)}
              disabled={animating}
            >
              <span aria-hidden>‹</span>
            </button>

            <article
              key={slide.id}
              id={`samonosne-panel-${slide.id}`}
              role="tabpanel"
              aria-labelledby={`samonosne-tab-${slide.id}`}
              className={`samonosne-showcase-content ${animating ? "is-entering" : ""}`}
            >
              <div className="page-split">
                <div className="page-split-copy">
                  <h3 className="samonosne-showcase-title">
                    {slide.title}
                    {slide.brand ? (
                      <span className="samonosne-showcase-brand"> {slide.brand}</span>
                    ) : null}
                  </h3>
                  <p className="samonosne-showcase-lead">{slide.lead}</p>
                  <p className="page-split-body">{slide.body}</p>
                  <div className="page-split-actions">
                    <Button href={slide.href} size="lg">
                      Nabídka produktů
                    </Button>
                    <Link href="/reseni/samonosne-systemy" className="link-arrow">
                      Všechny samonosné systémy
                    </Link>
                  </div>
                </div>
                <div className="page-split-media samonosne-showcase-media">
                  <Image
                    src={slide.heroImage}
                    alt={slide.heroAlt}
                    fill
                    priority={active === 0}
                    quality={IMG_QUALITY}
                    className={imgClass.product}
                    sizes={imgSizes.pageSplit}
                  />
                </div>
              </div>
            </article>

            <button
              type="button"
              className="samonosne-showcase-nav samonosne-showcase-nav--next"
              aria-label="Další systém"
              onClick={() => goTo(active + 1)}
              disabled={animating}
            >
              <span aria-hidden>›</span>
            </button>
          </div>
        </div>
      </Container>
    </PageSection>
  );
}
