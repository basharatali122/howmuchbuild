/**
 * RelatedCalculators — standardized cross-link block for calculator
 * (and guide) pages. Every tool page links 3–4 related tools.
 * props: items = [{ href, title, desc }]
 */
import Link from "next/link";

export default function RelatedCalculators({ items = [] }) {
  if (!items.length) return null;
  return (
    <section aria-label="Related calculators" className="mt-14">
      <p className="eyebrow">Keep estimating</p>
      <h2 className="mt-2 text-2xl">Related calculators</h2>
      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="card group !p-5 transition hover:-translate-y-0.5 hover:border-orange-300 hover:shadow-md"
          >
            <h3 className="text-base group-hover:text-orange-700">
              {item.title}
            </h3>
            {item.desc && (
              <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                {item.desc}
              </p>
            )}
          </Link>
        ))}
      </div>
    </section>
  );
}
