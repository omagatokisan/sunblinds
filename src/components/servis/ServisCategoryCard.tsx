"use client";

import { useState } from "react";
import type { ServisCategory } from "@/lib/cms/types";

const icons = {
  shading: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5h16M4 12h16M4 19h10" />
  ),
  windows: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4h16v16H4zM12 4v16M4 12h16" />
  ),
  pergola: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M6 10V6h12v4M8 10v8m8-8v8" />
  ),
  garage: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 10h16v10H4zM4 10l8-6 8 6M9 20v-4h6v4" />
  ),
};

export function ServisCategoryCard({ category }: { category: ServisCategory }) {
  const [open, setOpen] = useState(false);

  return (
    <article className="surface-card p-6">
      <div className="flex items-start gap-4">
        <span className="panel-tile-icon shrink-0">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {icons[category.icon]}
          </svg>
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="font-display text-xl text-ink">{category.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{category.shortText}</p>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="link-arrow mt-3"
          >
            {open ? "Skrýt detail" : "Více informací"}
          </button>
          {open ? (
            <p className="mt-3 text-sm leading-relaxed text-ink/80">{category.longText}</p>
          ) : null}
        </div>
      </div>
    </article>
  );
}
