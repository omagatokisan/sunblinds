"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useState } from "react";
import type { ProductHotspot } from "@/lib/cms/types";

type Props = {
  diagramImage: string;
  productName: string;
  hotspots: ProductHotspot[];
};

export function ProductTechnicalHotspots({ diagramImage, productName, hotspots }: Props) {
  const [activeId, setActiveId] = useState(hotspots[0]?.id ?? "");
  const active = hotspots.find((h) => h.id === activeId) ?? hotspots[0];

  const select = useCallback((id: string) => setActiveId(id), []);

  if (!hotspots.length) return null;

  return (
    <section className="section-inset" id="technika">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <header className="max-w-2xl">
          <p className="label-caps">Technické detaily</p>
          <h2 className="section-title mt-2">Konstrukce a parametry</h2>
          <p className="section-lead">
            Klikněte na body v diagramu — zobrazí se vysvětlení jednotlivých prvků produktu{" "}
            {productName}.
          </p>
        </header>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <div className="product-hotspot-diagram">
            <Image
              src={diagramImage}
              alt={`Technický diagram — ${productName}`}
              fill
              className="object-contain p-4 sm:p-8"
              sizes="(max-width: 1024px) 100vw, 55vw"
            />
            {hotspots.map((spot, i) => (
              <button
                key={spot.id}
                type="button"
                className={`product-hotspot-dot ${active?.id === spot.id ? "is-active" : ""}`}
                style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                onClick={() => select(spot.id)}
                aria-pressed={active?.id === spot.id}
                aria-label={`${i + 1}. ${spot.title}`}
              >
                <span>{i + 1}</span>
              </button>
            ))}
          </div>

          <div className="product-hotspot-panel" aria-live="polite">
            {active ? (
              <>
                <p className="label-caps">Detail {hotspots.indexOf(active) + 1}</p>
                <h3 className="mt-2 font-display text-2xl text-ink">{active.title}</h3>
                <p className="mt-4 text-base leading-relaxed text-muted">{active.text}</p>
                {active.link ? (
                  <Link href={active.link.href} className="link-arrow mt-6 inline-block">
                    {active.link.label} →
                  </Link>
                ) : null}
              </>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
