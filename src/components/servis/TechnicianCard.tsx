"use client";

import Image from "next/image";
import { useState } from "react";
import type { Technician } from "@/lib/cms/types";
import { IMG_QUALITY, imgClass, imgSizes } from "@/lib/image-presets";

export function TechnicianCard({ technician }: { technician: Technician }) {
  const [open, setOpen] = useState(false);

  return (
    <article className="surface-card overflow-hidden">
      <div className="flex gap-4 p-5 sm:p-6">
        <div className="relative h-20 w-20 shrink-0 overflow-hidden bg-canvas">
          <Image
            src={technician.photo}
            alt={technician.name}
            fill
            quality={IMG_QUALITY}
            className={imgClass.photo}
            sizes={imgSizes.thumb}
          />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-ink">{technician.name}</h3>
          <p className="text-sm text-brand">{technician.role}</p>
          <p className="mt-2 text-sm leading-relaxed text-muted">{technician.shortBio}</p>
        </div>
      </div>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between border-t border-line px-5 py-3 text-left text-sm font-medium text-ink hover:bg-canvas sm:px-6"
        aria-expanded={open}
      >
        {open ? "Skrýt profil" : "Zobrazit více o technikovi"}
        <span className={`text-brand transition ${open ? "rotate-180" : ""}`}>▼</span>
      </button>
      {open ? (
        <div className="border-t border-line bg-canvas/80 px-5 py-4 text-sm leading-relaxed text-muted sm:px-6">
          {technician.fullBio}
        </div>
      ) : null}
    </article>
  );
}
