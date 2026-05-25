import type { ServisPricingRow } from "@/lib/cms/types";

export function ServisPricingTable({
  title,
  note,
  rows,
}: {
  title: string;
  note: string;
  rows: ServisPricingRow[];
}) {
  return (
    <div className="mx-auto max-w-3xl">
      <h2 className="text-center text-2xl font-semibold text-ink">{title}</h2>
      <p className="mt-3 text-center text-sm text-muted">{note}</p>
      <div className="mt-10 overflow-hidden border border-line bg-surface">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-line bg-canvas text-xs uppercase tracking-wider text-muted">
              <th className="px-5 py-4 font-semibold">Služba</th>
              <th className="px-5 py-4 text-right font-semibold">Cena</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={row.id}
                className={`border-b border-line/80 transition hover:bg-canvas/50 ${i % 2 === 1 ? "bg-canvas/30" : ""}`}
              >
                <td className="px-5 py-4">
                  <span className="font-medium text-ink">{row.service}</span>
                  {row.note ? <span className="mt-1 block text-xs text-muted">{row.note}</span> : null}
                </td>
                <td className="whitespace-nowrap px-5 py-4 text-right font-semibold text-brand">{row.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
