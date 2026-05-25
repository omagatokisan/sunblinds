"use client";

import { useState } from "react";
import type { FaqItem } from "@/lib/cms/types";
import { Container } from "@/components/ui/Container";
import { PageSection } from "@/components/layout/PageSection";

export function HomeFaq({ items }: { items: FaqItem[] }) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  if (!items.length) return null;

  return (
    <PageSection tone="default">
      <Container width="wide">
        <div className="page-section-head">
          <p className="label-caps label-caps--plain">Časté dotazy</p>
          <h2 className="section-title mt-3 max-w-xl">Odpovědi z praxe — ne obecné fráze</h2>
        </div>
        <ul className="home-faq-list">
          {items.map((item) => {
            const open = openId === item.id;
            return (
              <li key={item.id} className="home-faq-item">
                <button
                  type="button"
                  className="home-faq-trigger"
                  aria-expanded={open}
                  onClick={() => setOpenId(open ? null : item.id)}
                >
                  <span>{item.question}</span>
                  <span className="home-faq-icon" aria-hidden>
                    {open ? "−" : "+"}
                  </span>
                </button>
                {open ? <div className="home-faq-answer">{item.answer}</div> : null}
              </li>
            );
          })}
        </ul>
      </Container>
    </PageSection>
  );
}
