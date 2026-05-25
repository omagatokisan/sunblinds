"use client";

import Link from "next/link";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import type { Solution } from "@/lib/cms/types";
import { SolutionBentoGrid } from "@/components/sections/SolutionBentoGrid";

type TabMetrics = {
  left: number;
  width: number;
};

export function HomeAreasBento({ solutions }: { solutions: Solution[] }) {
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [tabMetrics, setTabMetrics] = useState<TabMetrics>({ left: 0, width: 0 });

  const tabsRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const total = solutions.length;

  const goTo = useCallback(
    (index: number) => {
      if (animating || total === 0) return;
      const next = ((index % total) + total) % total;
      if (next === active) return;
      setAnimating(true);
      setActive(next);
    },
    [active, animating, total]
  );

  const goPrev = useCallback(() => goTo(active - 1), [active, goTo]);
  const goNext = useCallback(() => goTo(active + 1), [active, goTo]);

  const syncTabIndicator = useCallback(() => {
    const tabsEl = tabsRef.current;
    const activeTab = tabRefs.current[active];
    if (!tabsEl || !activeTab) return;

    setTabMetrics({
      left: activeTab.offsetLeft,
      width: activeTab.offsetWidth,
    });
  }, [active]);

  useLayoutEffect(() => {
    syncTabIndicator();
  }, [syncTabIndicator, solutions.length]);

  useEffect(() => {
    const onResize = () => syncTabIndicator();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [syncTabIndicator]);

  useEffect(() => {
    if (!animating) return;
    const timer = window.setTimeout(() => setAnimating(false), 780);
    return () => window.clearTimeout(timer);
  }, [animating, active]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") goPrev();
      if (event.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goNext, goPrev]);

  if (!total) return null;

  return (
    <div className="areas-bento-block">
      <div className="areas-bento-tabs-wrap">
        <div ref={tabsRef} className="areas-bento-tabs" role="tablist" aria-label="Oblasti řešení">
          {solutions.map((solution, index) => (
            <Link
              key={solution.slug}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              href={`/reseni/${solution.slug}`}
              role="tab"
              aria-selected={index === active}
              aria-controls={`areas-bento-panel-${solution.slug}`}
              id={`areas-bento-tab-${solution.slug}`}
              className={`areas-bento-tab ${index === active ? "is-active" : ""}`}
              onClick={(event) => {
                if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
                event.preventDefault();
                goTo(index);
              }}
            >
              {solution.shortTitle}
            </Link>
          ))}
          <span
            className="areas-bento-tabs-indicator"
            aria-hidden
            style={{
              transform: `translateX(${tabMetrics.left}px)`,
              width: `${tabMetrics.width}px`,
            }}
          />
        </div>
      </div>

      <div className="areas-bento-carousel" aria-roledescription="carousel">
        <button
          type="button"
          className="areas-bento-nav areas-bento-nav--prev"
          aria-label="Předchozí oblast"
          onClick={goPrev}
          disabled={animating}
        >
          <span aria-hidden>‹</span>
        </button>

        <div className="areas-bento-viewport">
          <div
            className="areas-bento-track"
            style={{ transform: `translate3d(-${active * 100}%, 0, 0)` }}
            aria-live="polite"
          >
            {solutions.map((solution, slideIndex) => (
              <article
                key={solution.slug}
                id={`areas-bento-panel-${solution.slug}`}
                role="tabpanel"
                aria-labelledby={`areas-bento-tab-${solution.slug}`}
                className="areas-bento-slide"
                aria-hidden={slideIndex !== active}
              >
                <SolutionBentoGrid solution={solution} imagePriority={slideIndex === 0} mode="home" />
              </article>
            ))}
          </div>
        </div>

        <button
          type="button"
          className="areas-bento-nav areas-bento-nav--next"
          aria-label="Další oblast"
          onClick={goNext}
          disabled={animating}
        >
          <span aria-hidden>›</span>
        </button>
      </div>
    </div>
  );
}
