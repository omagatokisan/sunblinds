import type { TextBlock } from "@/lib/cms/types";

export function TextBlocks({
  blocks,
  variant = "card",
}: {
  blocks: TextBlock[];
  variant?: "card" | "inline";
}) {
  if (!blocks.length) return null;

  if (variant === "inline") {
    return (
      <div className="space-y-0">
        {blocks.map((block) => (
          <article key={block.id} className="product-content-section">
            {block.title ? <h3 className="label-caps">{block.title}</h3> : null}
            <p className={`text-sm leading-relaxed text-muted ${block.title ? "mt-3" : ""}`}>
              {block.content}
            </p>
          </article>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {blocks.map((block) => (
        <article key={block.id} className="surface-card p-6">
          {block.title ? <h3 className="text-lg font-semibold text-ink">{block.title}</h3> : null}
          <p className={`text-sm leading-relaxed text-muted ${block.title ? "mt-3" : ""}`}>
            {block.content}
          </p>
        </article>
      ))}
    </div>
  );
}
