"use client";

import Link from "next/link";
import { HomeHeroVideo } from "@/components/layout/HomeHeroVideo";
import { Button } from "@/components/ui/Button";
import { company } from "@/data/company";

const TRUST = [
  { value: "95 %", label: "odražených slunečních paprsků" },
  { value: "1 tým", label: "od zaměření po servis" },
  { value: "Libuš", label: "showroom u Prahy" },
] as const;

export function HomeHero({
  title,
  lead,
}: {
  title: string;
  lead: string;
}) {
  return (
    <section className="hd-hero hd-block--flush" aria-label="Úvod">
      <div className="hd-glow hd-glow--brand hd-hero__glow" aria-hidden />
      <div className="hd-glow hd-glow--soft hd-hero__glow hd-hero__glow--secondary" aria-hidden />
      <div className="hd-grid-lines" aria-hidden />

      <div className="hd-hero__media">
        <HomeHeroVideo />
        <div className="hd-hero__overlay" aria-hidden />
      </div>

      <div className="hd-hero__content">
        <p className="hd-eyebrow">
          <span className="hd-eyebrow__mark" aria-hidden />
          {company.address.label}
        </p>
        <h1 className="hd-hero__title">{title}</h1>
        <p className="hd-hero__lead">{lead}</p>
        <div className="hd-hero__actions">
          <Button href="/poptavka" size="lg" className="hd-btn hd-btn--primary">
            Nezávazná poptávka
          </Button>
          <Link href="/reseni" className="hd-hero__link">
            Prohlédnout řešení →
          </Link>
        </div>
      </div>

      <div className="hd-hero__trust">
        <ul className="hd-hero__trust-grid" aria-label="Klíčové výhody">
          {TRUST.map((item) => (
            <li key={item.label} className="hd-hero__trust-item">
              <span className="hd-hero__trust-value">{item.value}</span>
              <span className="hd-hero__trust-label">{item.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
