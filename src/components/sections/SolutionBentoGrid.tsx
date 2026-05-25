"use client";

import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import type { Solution } from "@/lib/cms/types";
import { getSolutionBentoLayout } from "@/data/solution-bento-layouts";
import {
  buildSolutionBentoItems,
  solutionBentoCellCount,
  type SolutionBentoItem,
} from "@/lib/solution-bento-items";
import { ProductImage } from "@/components/ui/ProductImage";
import { IMG_QUALITY, imgClass, imgSizes } from "@/lib/image-presets";

function productCountLabel(count: number, variant: "solution" | "group") {
  const noun =
    count === 1 ? "produkt" : count >= 2 && count <= 4 ? "produkty" : "produktů";
  const scope = variant === "group" ? "v kategorii" : "v nabídce";
  return `${count} ${noun} ${scope}`;
}

function GroupBentoCard({
  item,
  priority,
}: {
  item: Extract<SolutionBentoItem, { kind: "group" }>;
  priority?: boolean;
}) {
  return (
    <Link href={item.href} className="solution-bento-card solution-bento-card--group group">
      <div className="solution-bento-card-media">
        <Image
          src={item.image}
          alt={item.title}
          fill
          priority={priority}
          quality={IMG_QUALITY}
          className={`${imgClass.photo} transition duration-[900ms] ease-out group-hover:scale-[1.03]`}
          sizes={imgSizes.pageSplit}
        />
        <div className="solution-bento-card-overlay" aria-hidden />
        <div className="solution-bento-card-copy">
          <p className="solution-bento-card-eyebrow">{item.eyebrow}</p>
          <h3 className="solution-bento-card-title">{item.title}</h3>
          <p className="solution-bento-card-summary">{item.summary}</p>
          <p className="solution-bento-card-count">{productCountLabel(item.productCount, "group")}</p>
        </div>
      </div>
    </Link>
  );
}

function HeroBentoCard({
  item,
  priority,
}: {
  item: Extract<SolutionBentoItem, { kind: "hero" }>;
  priority?: boolean;
}) {
  return (
    <Link href={item.href} className="solution-bento-card solution-bento-card--hero group">
      <div className="solution-bento-card-media">
        <Image
          src={item.image}
          alt={item.title}
          fill
          priority={priority}
          quality={IMG_QUALITY}
          className={`${imgClass.photo} transition duration-[900ms] ease-out group-hover:scale-[1.03]`}
          sizes={imgSizes.pageSplit}
        />
        <div className="solution-bento-card-overlay" aria-hidden />
        <div className="solution-bento-card-copy">
          <p className="solution-bento-card-eyebrow">{item.eyebrow}</p>
          <h3 className="solution-bento-card-title">{item.title}</h3>
          <p className="solution-bento-card-summary">{item.summary}</p>
          <p className="solution-bento-card-count">{productCountLabel(item.productCount, "solution")}</p>
        </div>
      </div>
    </Link>
  );
}

function ProductBentoCard({
  item,
  solutionSlug,
  priority,
}: {
  item: Extract<SolutionBentoItem, { kind: "product" }>;
  solutionSlug: string;
  priority?: boolean;
}) {
  return (
    <Link href={item.href} className="solution-bento-card solution-bento-card--product group">
      <div className="solution-bento-card-media">
        <ProductImage
          product={item.product}
          groupSlug={item.group.slug}
          solutionSlug={solutionSlug}
          variant="photo"
          priority={priority}
          sizes={imgSizes.catalogHalf}
          className="transition duration-[900ms] ease-out group-hover:scale-[1.03]"
        />
        <div className="solution-bento-card-overlay" aria-hidden />
        <div className="solution-bento-card-copy">
          <p className="solution-bento-card-eyebrow">{item.group.name}</p>
          <h4 className="solution-bento-card-title">{item.product.name}</h4>
          <p className="solution-bento-card-summary">{item.product.summary}</p>
        </div>
      </div>
    </Link>
  );
}

function renderBentoCard(
  item: SolutionBentoItem,
  solutionSlug: string,
  priority?: boolean
) {
  if (item.kind === "group") {
    return <GroupBentoCard item={item} priority={priority} />;
  }
  if (item.kind === "hero") {
    return <HeroBentoCard item={item} priority={priority} />;
  }
  return <ProductBentoCard item={item} solutionSlug={solutionSlug} priority={priority} />;
}

function cellKey(item: SolutionBentoItem) {
  if (item.kind === "group") return "group";
  if (item.kind === "hero") return "hero";
  return item.product.slug;
}

export function SolutionBentoGrid({
  solution,
  imagePriority = false,
  mode = "home",
}: {
  solution: Solution;
  imagePriority?: boolean;
  mode?: "home" | "legacy";
}) {
  const items = buildSolutionBentoItems(solution, mode);
  const cellCount = solutionBentoCellCount(items);
  const visibleItems = items.slice(0, cellCount);
  const layout = getSolutionBentoLayout(solution.slug, cellCount, mode);

  return (
    <div
      className={`solution-bento solution-bento--${solution.slug}`}
      data-count={cellCount}
      data-mode={mode}
    >
      {visibleItems.map((item, index) => {
        const placement = layout.cells[index];
        const style = placement
          ? ({
              "--solution-bento-col": placement.gridColumn,
              "--solution-bento-row": placement.gridRow,
            } as CSSProperties)
          : undefined;

        return (
          <div key={cellKey(item)} className="solution-bento-cell" style={style}>
            {renderBentoCard(item, solution.slug, imagePriority && index <= 1)}
          </div>
        );
      })}
    </div>
  );
}
