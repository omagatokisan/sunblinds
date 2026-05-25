import { HomeReveal } from "@/components/home/HomeReveal";
import { HomeSectionHead } from "@/components/home/HomeSectionHead";

type Pillar = { id: string; title: string; text: string };

export function HomeTrust({ title, pillars }: { title: string; pillars: Pillar[] }) {
  return (
    <section className="hd-block hd-trust" aria-labelledby="hd-trust-title">
      <div className="hd-shell hd-trust__inner">
        <HomeSectionHead
          id="hd-trust-title"
          index="02"
          eyebrow="Proč SunBlinds"
          title={title}
          align="center"
        />
        <ul className="hd-trust__grid">
          {pillars.map((pillar, index) => (
            <li key={pillar.id}>
              <HomeReveal className="hd-trust__item" delay={index * 90}>
                <span className="hd-trust__num">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="hd-trust__item-title">{pillar.title}</h3>
                <p className="hd-trust__item-text">{pillar.text}</p>
              </HomeReveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
