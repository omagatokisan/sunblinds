import Link from "next/link";
import { type ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "outline-light";
type Size = "default" | "lg";

const styles: Record<Variant, string> = {
  primary: "bg-brand text-white hover:bg-brand-dark",
  secondary: "border border-line bg-surface text-ink hover:border-brand/45 hover:bg-canvas",
  ghost: "text-ink hover:bg-black/5",
  "outline-light": "border border-white/30 bg-transparent text-white hover:bg-white/10",
};

const sizes: Record<Size, string> = {
  default: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3 text-[0.9375rem]",
};

export function Button({
  href,
  children,
  variant = "primary",
  size = "default",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
}) {
  return (
    <Link href={href} className={`btn-base ${sizes[size]} ${styles[variant]} ${className}`}>
      {children}
    </Link>
  );
}
