import { HomeReveal } from "@/components/home/HomeReveal";
import { HomeSectionHead } from "@/components/home/HomeSectionHead";

type ProcessStep = { id: string; step: string; title: string; text: string };

export function HomeSteps({ steps }: { steps: ProcessStep[] }) {
  return (
    <section className="hd-block hd-steps" aria-labelledby="hd-steps-title">
      <div className="hd-shell">
        <HomeSectionHead
          id="hd-steps-title"
          index="05"
          eyebrow="Postup"
          title="Od první konzultace po montáž"
          lead="Víte, co následuje — bez překvapení v termínech."
          align="center"
        />

        <ol className="hd-steps__grid">
          {steps.map((step, index) => (
            <li key={step.id}>
              <HomeReveal className="hd-step" delay={index * 80}>
                <span className="hd-step__num">{step.step}</span>
                <h3 className="hd-step__title">{step.title}</h3>
                <p className="hd-step__text">{step.text}</p>
              </HomeReveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
