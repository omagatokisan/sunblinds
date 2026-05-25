import Link from "next/link";
import { SectionHead } from "@/components/sections/SectionHead";
import { Container } from "@/components/ui/Container";
import { PageSection } from "@/components/layout/PageSection";
import type { Review } from "@/lib/cms/types";

export function HomeReviewsTeaser({ reviews }: { reviews: Review[] }) {
  const approved = reviews.filter((r) => r.status === "approved").slice(0, 3);
  if (!approved.length) return null;

  return (
    <PageSection tone="muted" className="hd-reviews">
      <Container width="wide" className="hd-shell">
        <div className="hd-reviews__head">
          <SectionHead
            eyebrow="Recenze"
            title="Co říkají zákazníci"
            align="left"
            className="!mb-0"
          />
          <Link href="/recenze" className="hd-link hd-reviews__all">
            Všechny recenze →
          </Link>
        </div>
        <ul className="hd-reviews__grid">
          {approved.map((review) => (
            <li key={review.id}>
              <blockquote className="hd-review">
                <p className="hd-review__stars" aria-label={`Hodnocení ${review.rating} z 5`}>
                  {"★".repeat(review.rating)}
                </p>
                <p className="hd-review__text">&ldquo;{review.text}&rdquo;</p>
                <footer className="hd-review__meta">
                  <span>{review.author}</span>
                  {review.location ? <span>{review.location}</span> : null}
                  {review.productHint ? <span>{review.productHint}</span> : null}
                </footer>
              </blockquote>
            </li>
          ))}
        </ul>
      </Container>
    </PageSection>
  );
}
