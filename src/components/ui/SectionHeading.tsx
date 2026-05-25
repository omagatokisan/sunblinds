import { SectionHead } from "@/components/sections/SectionHead";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  as = "h2",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  as?: "h1" | "h2";
}) {
  const Tag = as;

  if (eyebrow) {
    return (
      <SectionHead
        eyebrow={eyebrow}
        title={title}
        lead={description}
        align={align}
        id={as === "h1" ? undefined : undefined}
      />
    );
  }

  return (
    <header className={`hd-block__head hd-block__head--${align}`}>
      <Tag className="hd-block__title">{title}</Tag>
      {description ? <p className="hd-block__lead hd-intro">{description}</p> : null}
    </header>
  );
}
