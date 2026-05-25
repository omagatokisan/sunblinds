import Link from "next/link";

export function Breadcrumb({
  items,
  light = false,
}: {
  items: { label: string; href?: string }[];
  light?: boolean;
}) {
  const muted = light ? "text-white/60" : "text-muted";
  const active = light ? "text-white" : "text-ink";
  const linkHover = light ? "hover:text-white" : "hover:text-brand";

  return (
    <nav aria-label="Drobečková navigace" className={`text-sm ${muted}`}>
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, i) => (
          <li key={`${i}-${item.href ?? item.label}`} className="flex items-center gap-2">
            {i > 0 ? <span aria-hidden>/</span> : null}
            {item.href ? (
              <Link href={item.href} className={linkHover}>
                {item.label}
              </Link>
            ) : (
              <span className={active}>{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
