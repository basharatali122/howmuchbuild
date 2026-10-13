/**
 * CalculatorCard — presentational card for calculator grids
 * (homepage, /calculators hub, related blocks).
 * props: { href, title, desc, icon, badge } where icon is a component
 * and badge is an optional short pill label like "New".
 */
import Link from "next/link";

const BADGE_STYLES = {
  New: "bg-emerald-100 text-emerald-800",
  "Start here": "bg-orange-100 text-orange-800",
};

export default function CalculatorCard({ href, title, desc, icon: Icon, badge }) {
  return (
    <Link
      href={href}
      className="card group relative flex flex-col transition hover:-translate-y-0.5 hover:border-orange-300 hover:shadow-md"
    >
      {badge && (
        <span
          className={`absolute right-4 top-4 rounded-full px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide ${BADGE_STYLES[badge] || "bg-stone-100 text-stone-600"}`}
        >
          {badge}
        </span>
      )}
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
