/**
 * StatStrip — a band of factual site stats. Only true claims:
 * free calculators, no sign-up, client-side (private) math, rounded-up results.
 */

const DEFAULT_STATS = [
  { value: "13", label: "Free project calculators" },
  { value: "100%", label: "Free — no sign-up" },
  { value: "Private", label: "Math runs in your browser" },
  { value: "Rounded up", label: "Every material estimate" },
];

export default function StatStrip({ stats = DEFAULT_STATS }) {
  return (
    <section aria-label="Site facts" className="border-b border-stone-200 bg-white">
      <div className="mx-auto grid max-w-content grid-cols-2 gap-6 px-4 py-8 sm:px-6 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="text-center lg:text-left">
            <p className="text-3xl font-bold tracking-tight text-slate-900">
              {s.value}
            </p>
            <p className="mt-1 text-sm text-slate-500">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
