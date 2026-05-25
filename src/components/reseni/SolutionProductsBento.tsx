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

function productCountLabel(count: number) {
  if (count === 1) return "1 produkt v nabídce";
  if (count >= 2 && count <= 4) return `${count} produkty v nabídce`;
  return `${count} produktů v nabídce`;
}

function GroupBentoCard({
  item,
  priority,
}: {
  item: Extract<SolutionBentoItem, { kind: "group" }>;
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
          <h2 className="solution-bento-card-title">{item.title}</h2>
          <p className="solution-bento-card-summary">{item.summary}</p>
          <p className="solution-bento-card-count">{productCountLabel(item.productCount)}</p>
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
          <h2 className="solution-bento-card-title">{item.title}</h2>
          <p className="solution-bento-card-summary">{item.summary}</p>
          <p className="solution-bento-card-count">{productCountLabel(item.productCount)}</p>
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
          <h3 className="solution-bento-card-title">{item.product.name}</h3>
          <p className="solution-bento-card-summary">{item.product.summary}</p>
        </div>
      </div>
    </Link>
  );
}

export function SolutionProductsBento({ solution }: { solution: Solution }) {
  const items = buildSolutionBentoItems(solution);
  const cellCount = solutionBentoCellCount(items);
  const visibleItems = items.slice(0, cellCount);
  const layout = getSolutionBentoLayout(solution.slug, cellCount);

  const gridStyle = {
    "--solution-bento-cols": layout.columns,
    "--solution-bento-rows": layout.rows,
  } as CSSProperties;

  return (
    <div
      id="nabidka"
      className={`solution-bento solution-bento--${solution.slug}`}
      data-count={cellCount}
      style={gridStyle}
    >
      {visibleItems.map((item, index) => {
        const placement = layout.cells[index];
        const style = placement
          ? ({
              "--solution-bento-col": placement.gridColumn,
              "--solution-bento-row": placement.gridRow,
            } as CSSProperties)
          : undefined;

        const key =
          item.kind === "product" ? item.product.slug : item.kind === "group" ? "group" : "hero";

        return (
          <div key={key} className="solution-bento-cell" style={style}>
            {item.kind === "group" ? (
              <GroupBentoCard item={item} priority={index === 0} />
            ) : item.kind === "hero" ? (
              <HeroBentoCard item={item} priority={index === 0} />
            ) : (
              <ProductBentoCard item={item} solutionSlug={solution.slug} priority={index === 1} />
            )}
          </div>
        );
      })}
    </div>
  );
}
