import type { ProductSpec } from "@/lib/cms/types";

export function ProductSpecStrip({ specs }: { specs: ProductSpec[] }) {
  const highlights = specs.slice(0, 4);
  if (!highlights.length) return null;

  return (
    <ul className="pd-spec-strip" aria-label="Klíčové parametry">
      {highlights.map((spec) => (
        <li key={spec.label} className="pd-spec-chip">
          <span className="pd-spec-chip__label">{spec.label}</span>
          <span className="pd-spec-chip__value">{spec.value}</span>
        </li>
      ))}
    </ul>
  );
}
