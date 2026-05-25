import { Container } from "@/components/ui/Container";
import { PageSection } from "@/components/layout/PageSection";

export function HomeValueStrip({
  title,
  pillars,
}: {
  title: string;
  pillars: { id: string; title: string; text: string }[];
}) {
  return (
    <PageSection tone="default">
      <Container width="wide">
        <h2 className="home-value-strip-title">{title}</h2>
        <ul className="home-value-strip-list">
          {pillars.map((pillar, index) => (
            <li
              key={pillar.id}
              className={`home-value-strip-item ${index === 0 ? "home-value-strip-item--lead" : ""}`}
            >
              <h3 className="home-value-strip-item-title">{pillar.title}</h3>
              <p className="home-value-strip-item-text">{pillar.text}</p>
            </li>
          ))}
        </ul>
      </Container>
    </PageSection>
  );
}
