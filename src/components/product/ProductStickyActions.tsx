"use client";

import Link from "next/link";
import { CallButton } from "@/components/call/CallButton";
import type { ProductSibling } from "@/lib/product-detail";

type Props = {
  inquiryHref: string;
  groupHref: string;
  siblings: ProductSibling[];
};

export function ProductStickyActions({ inquiryHref, groupHref, siblings }: Props) {
  const others = siblings.filter((s) => !s.current);

  return (
    <aside className="product-sticky-rail" aria-label="Rychlé akce">
      <Link href={inquiryHref} className="product-sticky-item product-sticky-item--primary">
        Poptávka
      </Link>
      <Link href="/kontakt" className="product-sticky-item">
        Kontakt
      </Link>
      <CallButton departmentId="obchod" variant="ghost" className="product-sticky-item !rounded-none">
        Zavolat
      </CallButton>
      <Link href="/showroom" className="product-sticky-item">
        Showroom
      </Link>
      {others.length ? (
        <div className="product-sticky-siblings hidden xl:block">
          <p className="label-caps px-3 py-2 text-[0.6rem]">Modely</p>
          {others.slice(0, 4).map((s) => (
            <Link key={s.slug} href={s.href} className="product-sticky-sibling">
              {s.name}
            </Link>
          ))}
          <Link href={groupHref} className="product-sticky-sibling text-brand">
            Vše →
          </Link>
        </div>
      ) : null}
    </aside>
  );
}
