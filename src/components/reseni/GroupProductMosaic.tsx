import type { ProductGroup, Solution } from "@/lib/cms/types";
import { UniformProductCatalog } from "@/components/reseni/UniformProductCatalog";

/** @deprecated Prefer UniformProductCatalog */
export function GroupProductMosaic({
  solution,
  group,
}: {
  solution: Solution;
  group: ProductGroup;
}) {
  return <UniformProductCatalog solution={solution} group={group} />;
}
