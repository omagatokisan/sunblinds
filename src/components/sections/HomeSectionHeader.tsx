import { SectionHead } from "@/components/sections/SectionHead";

export function HomeSectionHeader({
  eyebrow,
  title,
  lead,
  aside,
  align = "split",
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  aside?: string;
  align?: "split" | "center";
  plainLabel?: boolean;
}) {
  if (align === "center") {
    return <SectionHead eyebrow={eyebrow} title={title} lead={lead} align="center" />;
  }

  return (
    <header className="page-section-head page-section-head--split">
      <SectionHead eyebrow={eyebrow} title={title} align="left" className="!mb-0" />
      {aside || lead ? (
        <p className="hd-block__lead hd-intro mt-0 lg:max-w-md lg:text-right">{aside ?? lead}</p>
      ) : null}
    </header>
  );
}
