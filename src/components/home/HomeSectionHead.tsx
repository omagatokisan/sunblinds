import { HomeReveal } from "@/components/home/HomeReveal";

export function HomeSectionHead({
  eyebrow,
  title,
  titleMuted,
  lead,
  align = "center",
  index,
  id,
  className,
}: {
  eyebrow: string;
  title: string;
  titleMuted?: string;
  lead?: string;
  align?: "center" | "left";
  index?: string;
  id?: string;
  className?: string;
}) {
  return (
    <HomeReveal className={`hd-block__head hd-block__head--${align} ${className ?? ""}`.trim()}>
      {index ? (
        <span className="hd-section-index" aria-hidden>
          {index}
        </span>
      ) : null}
      <p className="hd-eyebrow">
        <span className="hd-eyebrow__mark" aria-hidden />
        {eyebrow}
      </p>
      <h2 id={id} className="hd-block__title">
        {title}
        {titleMuted ? <span className="hd-block__title-muted">{titleMuted}</span> : null}
      </h2>
      {lead ? <p className="hd-block__lead hd-intro">{lead}</p> : null}
    </HomeReveal>
  );
}
