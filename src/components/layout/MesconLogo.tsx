import Image from "next/image";
import Link from "next/link";

export function MesconLogo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="https://mescon.cz"
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center opacity-90 transition-opacity duration-200 hover:opacity-100 ${className}`}
      aria-label="MESCON — webová realizace (otevře mescon.cz)"
    >
      <Image
        src="/images/mescon-logo-footer.png"
        alt=""
        width={500}
        height={500}
        className="mescon-logo h-8 w-auto"
        aria-hidden
      />
    </Link>
  );
}
