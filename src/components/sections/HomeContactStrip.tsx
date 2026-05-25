import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { company } from "@/data/company";

export function HomeContactStrip({ responseTime }: { responseTime: string }) {
  return (
    <div className="home-contact-strip">
      <Container width="wide">
        <ul className="home-contact-strip-list">
          <li>
            <span className="home-contact-strip-label">Telefon</span>
            <a href={company.phoneHref} className="home-contact-strip-value">
              {company.phone}
            </a>
          </li>
          <li>
            <span className="home-contact-strip-label">Showroom</span>
            <span className="home-contact-strip-value">{company.hours}</span>
          </li>
          <li>
            <span className="home-contact-strip-label">Adresa</span>
            <span className="home-contact-strip-value">
              {company.address.street}, {company.address.city}
            </span>
          </li>
          <li>
            <span className="home-contact-strip-label">Odpověď</span>
            <span className="home-contact-strip-value">{responseTime}</span>
          </li>
        </ul>
        <Link href="/showroom" className="link-arrow home-contact-strip-link">
          Informace o návštěvě showroomu
        </Link>
      </Container>
    </div>
  );
}
