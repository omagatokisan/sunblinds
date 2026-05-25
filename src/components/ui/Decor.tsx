export function PageDecor() {
  return null;
}

export function SectionDivider() {
  return (
    <div className="flex items-center justify-center gap-3 py-2" aria-hidden>
      <span className="h-px w-12 bg-line" />
      <span className="h-1.5 w-1.5 bg-brand" />
      <span className="h-px w-12 bg-line" />
    </div>
  );
}
