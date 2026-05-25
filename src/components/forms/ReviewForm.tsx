"use client";

import { useState } from "react";
import type { GdprConsent, Review } from "@/lib/cms/types";
import { apiEndpoint } from "@/lib/static-hosting";
import { GdprConsentField } from "./GdprConsent";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`Hodnocení ${rating} z 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          className={`h-4 w-4 ${i < rating ? "text-brand" : "text-line"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export function ReviewCard({ review }: { review: Review }) {
  return (
    <article className="surface-card p-6">
      <Stars rating={review.rating} />
      <p className="mt-4 text-sm leading-relaxed text-ink">&ldquo;{review.text}&rdquo;</p>
      <div className="mt-5 flex flex-wrap items-center gap-2 text-xs text-muted">
        <span className="font-semibold text-ink">{review.author}</span>
        {review.location ? <span>· {review.location}</span> : null}
        {review.productHint ? (
          <span className="border border-line bg-canvas px-2 py-0.5 text-brand">{review.productHint}</span>
        ) : null}
      </div>
    </article>
  );
}

export function ReviewForm({ gdprConsent }: { gdprConsent: GdprConsent }) {
  const [rating, setRating] = useState(5);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [gdpr, setGdpr] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!gdpr) return;
    setLoading(true);
    setError("");
    const fd = new FormData(e.currentTarget);
    const res = await fetch(apiEndpoint("/api/reviews"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        author: fd.get("author"),
        rating,
        text: fd.get("text"),
        location: fd.get("location") || undefined,
        productHint: fd.get("productHint") || undefined,
      }),
    });
    setLoading(false);
    if (!res.ok) {
      const data = (await res.json()) as { error?: string };
      setError(data.error ?? "Odeslání se nezdařilo.");
      return;
    }
    setSent(true);
  }

  if (sent) {
    return (
      <div className="rounded border border-brand/30 bg-brand/5 p-8 text-center">
        <p className="text-lg font-semibold text-ink">Děkujeme za recenzi</p>
        <p className="mt-2 text-sm text-muted">Po schválení se zobrazí na stránce recenzí.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <p className="text-sm font-medium text-ink">Hodnocení *</p>
        <div className="mt-2 flex gap-1">
          {Array.from({ length: 5 }, (_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setRating(i + 1)}
              className={`rounded-lg p-1 transition hover:scale-110 ${i < rating ? "text-brand" : "text-line"}`}
              aria-label={`${i + 1} hvězdiček`}
            >
              <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </button>
          ))}
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="font-medium text-ink">Jméno *</span>
          <input required name="author" className="field-input mt-1.5" />
        </label>
        <label className="block text-sm">
          <span className="font-medium text-ink">Lokalita</span>
          <input name="location" placeholder="např. Praha" className="field-input mt-1.5" />
        </label>
      </div>
      <label className="block text-sm">
        <span className="font-medium text-ink">Produkt / služba</span>
        <input name="productHint" placeholder="např. Venkovní rolety" className="field-input mt-1.5" />
      </label>
      <label className="block text-sm">
        <span className="font-medium text-ink">Vaše zkušenost *</span>
        <textarea required name="text" rows={4} minLength={20} className="field-input mt-1.5 resize-y" placeholder="Minimálně 20 znaků…" />
      </label>
      <GdprConsentField consent={gdprConsent} checked={gdpr} onChange={setGdpr} />
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      <button
        type="submit"
        disabled={loading || !gdpr}
        className="btn-base bg-brand text-white hover:bg-brand-dark disabled:opacity-50"
      >
        {loading ? "Odesílám…" : "Odeslat recenzi"}
      </button>
    </form>
  );
}
