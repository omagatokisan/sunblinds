import { SectionHead } from "@/components/sections/SectionHead";
import type { ProductSpec } from "@/lib/cms/types";

type Props = {
  specs: ProductSpec[];
};

function specValueParts(value: string): string[] {
  const trimmed = value.trim();
  if (trimmed.length <= 72 || !trimmed.includes(",")) {
    return [trimmed];
  }
  return trimmed
    .split(/,\s*/)
    .map((part) => part.trim())
    .filter(Boolean);
}

export function ProductSpecsGrid({ specs }: Props) {
  if (!specs.length) return null;

  return (
    <section className="pd-section pd-section--soft" id="parametry" aria-labelledby="pd-specs-title">
      <div className="hd-shell">
        <SectionHead
          id="pd-specs-title"
          eyebrow="Specifikace"
          title="Parametry"
          align="left"
        />

        <dl className="pd-spec-grid">
          {specs.map((spec) => {
            const parts = specValueParts(spec.value);
            return (
              <div key={spec.label} className="pd-spec-item">
                <dt className="pd-spec-item__label">{spec.label}</dt>
                <dd className="pd-spec-item__value">
                  {parts.length > 1 ? (
                    <ul className="pd-spec-item__list">
                      {parts.map((part) => (
                        <li key={part}>{part}</li>
                      ))}
                    </ul>
                  ) : (
                    parts[0]
                  )}
                </dd>
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
