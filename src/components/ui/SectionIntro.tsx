export function SectionIntro({
  eyebrow,
  title,
  description,
  className = "",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <header className={`mx-auto max-w-3xl text-center ${className}`}>
      {eyebrow ? <p className="label-caps">{eyebrow}</p> : null}
      <h2 className={`section-title ${eyebrow ? "mt-3" : ""}`}>{title}</h2>
      {description ? <p className="section-lead mx-auto">{description}</p> : null}
      <div className="hero-line mx-auto mt-8 w-20" aria-hidden />
    </header>
  );
}
