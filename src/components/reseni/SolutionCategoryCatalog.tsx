import type { ProductGroup, Solution } from "@/lib/cms/types";
import { filterCatalogProducts } from "@/lib/product-images";
import { UniformProductCatalog } from "@/components/reseni/UniformProductCatalog";

function catalogProductCount(group: ProductGroup) {
  return filterCatalogProducts(group.products).length;
}

function productCountLabel(count: number) {
  if (count === 1) return "1 produkt";
  if (count >= 2 && count <= 4) return `${count} produkty`;
  return `${count} produktů`;
}

export function SolutionCategoryCatalog({ solution }: { solution: Solution }) {
  const groups = [...solution.productGroups]
    .map((group) => ({ group, count: catalogProductCount(group) }))
    .filter(({ count }) => count > 0)
    .sort((a, b) => b.count - a.count || a.group.name.localeCompare(b.group.name, "cs"));

  return (
    <div className="solution-catalog">
      {groups.map(({ group, count }) => (
        <section
          key={group.slug}
          id={group.slug}
          className="solution-catalog-section"
          aria-labelledby={`catalog-${group.slug}`}
        >
          <header className="solution-catalog-section-head">
            <p className="label-caps label-caps--plain">{productCountLabel(count)}</p>
            <h2 id={`catalog-${group.slug}`} className="solution-catalog-section-title">
              {group.name}
            </h2>
            {group.summary ? (
              <p className="solution-catalog-section-lead">{group.summary}</p>
            ) : null}
          </header>
          <UniformProductCatalog solution={solution} group={group} />
        </section>
      ))}
    </div>
  );
}
