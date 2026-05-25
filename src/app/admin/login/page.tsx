"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const configError = searchParams.get("error") === "config";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    setLoading(false);
    if (!res.ok) {
      const data = (await res.json()) as { error?: string };
      setError(
        data.error ??
          (res.status === 429
            ? "Příliš mnoho pokusů. Zkuste to za 15 minut."
            : "Přihlášení se nezdařilo.")
      );
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-line bg-surface p-8 shadow-lg">
        <p className="text-xs font-semibold uppercase tracking-wider text-brand">SunBlinds</p>
        <h1 className="mt-2 text-2xl font-semibold text-ink">Administrace</h1>
        <p className="mt-2 text-sm text-muted">Přihlaste se pro úpravu obsahu webu.</p>

        {configError ? (
          <p className="mt-4 rounded-lg bg-brand/10 p-3 text-sm text-brand">
            Nastavte SESSION_SECRET v souboru .env.local (min. 32 znaků).
          </p>
        ) : null}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <label className="block text-sm">
            <span className="font-medium text-ink">Heslo</span>
            <input
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-line px-4 py-3 outline-none ring-brand focus:ring-2"
            />
          </label>
          {error ? <p className="text-sm text-red-600">{error}</p> : null}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-brand py-3 text-sm font-semibold text-white hover:bg-brand-dark disabled:opacity-60"
          >
            {loading ? "Ověřuji…" : "Přihlásit se"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
