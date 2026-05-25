"use client";

import { useState } from "react";
import type { FaqItem } from "@/lib/cms/types";
import { HomeReveal } from "@/components/home/HomeReveal";
import { HomeSectionHead } from "@/components/home/HomeSectionHead";

export function HomeFaqDark({ items }: { items: FaqItem[] }) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);
  if (!items.length) return null;

  return (
    <section className="hd-block hd-faq" aria-labelledby="hd-faq-title">
      <div className="hd-faq__mesh" aria-hidden />
      <div className="hd-faq__glow hd-glow hd-glow--brand" aria-hidden />
      <div className="hd-grid-lines hd-faq__grid-lines" aria-hidden />

      <div className="hd-shell hd-faq__shell">
        <HomeSectionHead
          id="hd-faq-title"
          index="08"
          eyebrow="FAQ"
          title="Časté dotazy"
          lead="Stručné odpovědi z naší každodenní praxe — bez zbytečného obchodního žargonu."
          align="center"
        />

        <div className="hd-faq__panel">
          <ul className="hd-faq__list">
            {items.map((item, index) => {
              const open = openId === item.id;
              return (
                <li key={item.id}>
                  <HomeReveal delay={index * 70}>
                    <article className={`hd-faq__card ${open ? "is-open" : ""}`}>
                      <button
                        type="button"
                        className="hd-faq__trigger"
                        aria-expanded={open}
                        onClick={() => setOpenId(open ? null : item.id)}
                      >
                        <span className="hd-faq__index">{String(index + 1).padStart(2, "0")}</span>
                        <span className="hd-faq__question">{item.question}</span>
                        <span className="hd-faq__icon" aria-hidden />
                      </button>
                      {open ? (
                        <div className="hd-faq__answer">
                          <p>{item.answer}</p>
                        </div>
                      ) : null}
                    </article>
                  </HomeReveal>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
