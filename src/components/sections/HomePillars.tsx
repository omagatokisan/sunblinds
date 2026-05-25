import { HomeSectionHeader } from "@/components/sections/HomeSectionHeader";
import { Container } from "@/components/ui/Container";

export function HomePillars({
  title,
  pillars,
}: {
  title: string;
  pillars: { id: string; title: string; text: string }[];
}) {
  return (
    <section className="home-section">
      <Container>
        <HomeSectionHeader
          eyebrow="Proč SunBlinds"
          title={title}
          lead="Profesionalita bez zbytečné složitosti — jasný postup a jeden kontakt pro celý projekt."
          align="center"
        />
        <div className="home-pillar-grid">
          {pillars.map((pillar, index) => (
            <article
              key={pillar.id}
              className="home-pillar-card anim-fade-up"
              style={{ animationDelay: `${100 + index * 80}ms` }}
            >
              <span className="home-pillar-index">{String(index + 1).padStart(2, "0")}</span>
              <h3 className="home-pillar-title">{pillar.title}</h3>
              <p className="home-pillar-text">{pillar.text}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
