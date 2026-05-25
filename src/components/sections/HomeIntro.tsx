import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { company } from "@/data/company";

export function HomeIntro({
  title,
  lead,
  responseTime,
}: {
  title: string;
  lead: string;
  responseTime: string;
}) {
  return (
    <section className="home-intro">
      <Container width="wide">
        <div className="home-intro-grid anim-fade-up">
          <div className="home-intro-main">
            <p className="label-caps label-caps--plain">{company.address.label}</p>
            <h1 className="home-intro-title">{title}</h1>
            <p className="home-intro-lead">{lead}</p>
            <div className="home-intro-actions">
              <Button href="/reseni" size="lg">
                Prohlédnout řešení
              </Button>
              <Link href="/kontakt" className="link-arrow">
                Zavolat nebo napsat
              </Link>
            </div>
            <p className="home-intro-meta">{responseTime}</p>
          </div>
          <aside className="home-intro-aside" aria-label="Rychlý kontakt">
            <p className="home-intro-aside-kicker">Showroom</p>
            <p className="home-intro-aside-hours">{company.hours}</p>
            <a href={company.phoneHref} className="home-intro-aside-phone">
              {company.phone}
            </a>
            <p className="home-intro-aside-address">
              {company.address.street}
              <br />
              {company.address.zip} {company.address.city}
            </p>
            <Link href="/showroom" className="link-arrow">
              Jak probíhá návštěva
            </Link>
          </aside>
        </div>
      </Container>
    </section>
  );
}
