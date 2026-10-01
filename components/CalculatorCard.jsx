/**
 * CalculatorCard — presentational card for calculator grids
 * (homepage, /calculators hub, related blocks).
 * props: { href, title, desc, icon } where icon is a component.
 */
import Link from "next/link";

export default function CalculatorCard({ href, title, desc, icon: Icon }) {
  return (
    <Link
      href={href}
      className="card group flex flex-col transition hover:-translate-y-0.5 hover:border-orange-300 hover:shadow-md"
    >
      {Icon && (
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
          <Icon className="h-7 w-7" />
        </span>
      )}
      <h3 className="mt-3 text-lg group-hover:text-orange-700">{title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
        {desc}
      </p>
      <span className="mt-4 text-sm font-semibold text-orange-700">
        Open calculator <span aria-hidden="true">→</span>
      </span>
    </Link>
  );
}
