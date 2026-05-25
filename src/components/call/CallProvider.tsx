"use client";

import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import type { Department } from "@/lib/cms/types";
import { getDepartmentPhoneHref } from "@/lib/phone";

type CallContextValue = {
  openCall: (departmentId: string) => void;
};

const CallContext = createContext<CallContextValue | null>(null);

export function CallProvider({
  departments,
  children,
}: {
  departments: Department[];
  children: ReactNode;
}) {
  const [active, setActive] = useState<Department | null>(null);

  const openCall = useCallback(
    (departmentId: string) => {
      const dept = departments.find((d) => d.id === departmentId);
      if (dept) setActive(dept);
    },
    [departments]
  );

  return (
    <CallContext.Provider value={{ openCall }}>
      {children}
      {active ? (
        <div
          className="fixed inset-0 z-[100] flex items-end justify-center bg-ink/40 p-4 sm:items-center animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-labelledby="call-dialog-title"
          onClick={() => setActive(null)}
        >
          <div
            className="w-full max-w-md border border-line bg-surface p-6 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-brand">
                  Zavolat
                </p>
                <h2 id="call-dialog-title" className="mt-1 text-xl font-semibold text-ink">
                  {active.label}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setActive(null)}
                className="p-2 text-muted hover:bg-canvas"
                aria-label="Zavřít"
              >
                ✕
              </button>
            </div>
            <p className="mt-3 text-sm text-muted">{active.hint}</p>
            <p className="mt-2 text-xs text-muted">{active.hours}</p>
            <a
              href={getDepartmentPhoneHref(active.phone)}
              className="btn-base mt-6 w-full bg-brand py-3.5 text-lg text-white hover:bg-brand-dark"
            >
              {active.phone}
            </a>
            <p className="mt-3 text-center text-xs text-muted">
              Klepnutím na číslo spustíte hovor na vašem telefonu.
            </p>
          </div>
        </div>
      ) : null}
    </CallContext.Provider>
  );
}

export function useCall() {
  const ctx = useContext(CallContext);
  if (!ctx) throw new Error("useCall must be used within CallProvider");
  return ctx;
}
