"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Review } from "@/lib/cms/types";
import { HomeReveal } from "@/components/home/HomeReveal";
import { HomeSectionHead } from "@/components/home/HomeSectionHead";

function stars(rating: number) {
  return "★".repeat(rating) + "☆".repeat(5 - rating);
}

export function HomeReviewsDark({ reviews }: { reviews: Review[] }) {
  const featured = reviews.slice(0, 3);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (featured.length < 2) return;
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % featured.length);
    }, 6500);
    return () => window.clearInterval(timer);
  }, [featured.length]);

  if (!featured.length) return null;

  return (
    <section className="hd-block hd-reviews" aria-labelledby="hd-reviews-title">
      <div className="hd-shell">
        <div className="hd-reviews__head">
          <HomeSectionHead
            id="hd-reviews-title"
            eyebrow="Recenze"
            title="Co říkají zákazníci"
            align="left"
          />
          <HomeReveal delay={100}>
            <Link href="/recenze" className="hd-link hd-reviews__all">
              Všechny recenze →
            </Link>
          </HomeReveal>
        </div>

        <ul className="hd-reviews__grid">
          {featured.map((review, index) => (
            <li key={review.id}>
              <HomeReveal
                className={`hd-review ${active === index ? "is-active" : ""}`}
                delay={index * 90}
              >
                <button
                  type="button"
                  className="block w-full text-left"
                  onClick={() => setActive(index)}
                  aria-pressed={active === index}
                >
                  <p className="hd-review__stars" aria-label={`Hodnocení ${review.rating} z 5`}>
                    {stars(review.rating)}
                  </p>
                  <blockquote className="hd-review__text">&ldquo;{review.text}&rdquo;</blockquote>
                  <footer className="hd-review__meta">
                    <span>{review.author}</span>
                    {review.location ? <span>{review.location}</span> : null}
                  </footer>
                </button>
              </HomeReveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
