"use client";

import { type ReactNode } from "react";
import { useCall } from "./CallProvider";

type Props = {
  departmentId: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
};

const variants = {
  primary: "bg-brand text-white hover:bg-brand-dark",
  secondary: "border border-line bg-surface text-ink hover:bg-canvas",
  ghost: "text-ink hover:bg-black/5",
};

export function CallButton({
  departmentId,
  children,
  variant = "primary",
  className = "",
}: Props) {
  const { openCall } = useCall();

  return (
    <button
      type="button"
      onClick={() => openCall(departmentId)}
      className={`btn-base ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
