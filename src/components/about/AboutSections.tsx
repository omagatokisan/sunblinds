import Image from "next/image";
import Link from "next/link";
import type { AboutPageContent, Solution } from "@/lib/cms/types";
import { SectionHead } from "@/components/sections/SectionHead";
import { PageSection } from "@/components/layout/PageSection";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { RELATED_TOPIC_IMAGES } from "@/data/site-visuals";
import { IMG_QUALITY, imgClass, imgSizes } from "@/lib/image-presets";

export function AboutIntro({ about }: { about: AboutPageContent }) {
  return (
    <PageSection>
      <Container width="wide" className="hd-shell">
        <div className="about-intro-split">
          <div>
            <SectionHead
              eyebrow="O společnosti"
              title={about.introTitle}
              lead={about.introLead}
              align="left"
            />
            <p className="mt-6 max-w-2xl text-[var(--hd-body)] leading-[1.68] text-muted">
              {about.introBody}
            </p>
          </div>
          <div className="about-intro-split__media">
            <Image
              src={RELATED_TOPIC_IMAGES.showroom}
              alt="Showroom a tým SunBlinds v Praze-Libuši"
              fill
              priority
              quality={IMG_QUALITY}
              className={imgClass.photo}
              sizes={imgSizes.pageSplit}
            />
          </div>
        </div>
      </Container>
    </PageSection>
  );
}

export function AboutStats({ stats }: { stats: AboutPageContent["stats"] }) {
  return (
    <PageSection tone="muted" className="page-section--compact">
      <Container width="wide" className="hd-shell">
        <ul className="about-stats-bar">
          {stats.map((stat) => (
            <li key={stat.id} className="about-stats-bar__item">
              <p className="about-stats-bar__value">{stat.value}</p>
              <p className="about-stats-bar__label">{stat.label}</p>
            </li>
          ))}
        </ul>
      </Container>
    </PageSection>
  );
}

export function AboutScope({
  title,
  lead,
  solutions,
}: {
  title: string;
  lead: string;
  solutions: Solution[];
}) {
  return (
    <PageSection tone="inset">
      <Container width="wide" className="hd-shell">
        <SectionHead eyebrow="Nabídka" title={title} lead={lead} align="left" />
        <div className="about-scope-grid">
          {solutions.map((solution) => {
            const count = solution.productGroups.reduce((n, g) => n + g.products.length, 0);
            return (
              <Link
                key={solution.slug}
                href={`/reseni/${solution.slug}`}
                className="about-scope-card"
              >
                <span className="about-scope-card__title">{solution.title}</span>
                <span className="about-scope-card__meta">{count} produktů · {solution.shortTitle}</span>
              </Link>
            );
          })}
        </div>
      </Container>
    </PageSection>
  );
}

export function AboutApproach({ about }: { about: AboutPageContent }) {
  const items = [
    {
      title: "Nabídka z reálných rozměrů",
      text: "Nestavíme ji z obecného ceníku — vychází z přístupu k fasádě, typu montáže a způsobu ovládání, který vám dává smysl.",
    },
    {
      title: "Rozhodnutí ve showroomu",
      text: about.showroomBody,
    },
    {
      title: about.servisTitle,
      text: about.servisBody,
    },
  ];

  return (
    <PageSection>
      <Container width="wide" className="hd-shell">
        <SectionHead
          eyebrow="Přístup"
          title={about.storyTitle}
          lead={about.storyBody.split(".")[0] + "."}
          align="left"
        />
        <div className="about-approach-grid">
          {items.map((item) => (
            <article key={item.title} className="about-approach-card">
              <h3 className="about-approach-card__title">{item.title}</h3>
              <p className="about-approach-card__text">{item.text}</p>
            </article>
          ))}
        </div>
      </Container>
    </PageSection>
  );
}

export function AboutVisit({ about }: { about: AboutPageContent }) {
  return (
    <PageSection tone="muted">
      <Container width="wide" className="hd-shell">
        <SectionHead
          eyebrow="Kde nás potkáte"
          title="Showroom i servis"
          titleMuted="na jednom místě"
          lead="Osobní konzultaci domluvíte v Libuši, servisní zásah nahlásíte online nebo telefonicky."
          align="left"
        />
        <div className="about-visit-grid">
          <article className="about-visit-card">
            <p className="about-visit-card__eyebrow">Showroom</p>
            <h3 className="about-visit-card__title">{about.showroomTitle}</h3>
            <p className="about-visit-card__body">{about.showroomBody}</p>
            <div className="about-visit-card__actions">
              <Button href="/kontakt" className="hd-btn hd-btn--primary">
                Domluvit návštěvu
              </Button>
              <Link href="/showroom" className="hd-link">
                Informace o showroomu →
              </Link>
            </div>
          </article>
          <article className="about-visit-card">
            <p className="about-visit-card__eyebrow">Servis</p>
            <h3 className="about-visit-card__title">{about.servisTitle}</h3>
            <p className="about-visit-card__body">{about.servisBody}</p>
            <div className="about-visit-card__actions">
              <Button href="/poptavka" className="hd-btn hd-btn--primary">
                Nahlásit požadavek
              </Button>
              <Link href="/servis" className="hd-link">
                Servisní služby →
              </Link>
            </div>
          </article>
        </div>
      </Container>
    </PageSection>
  );
}
