/**
 * GuideCard — presentational card for guide grids
 * (homepage teaser, /guides hub).
 * props: { href, title, desc }
 */
import Link from "next/link";

export default function GuideCard({ href, title, desc }) {
  return (
    <Link
      href={href}
      className="card group flex flex-col transition hover:-translate-y-0.5 hover:border-orange-300 hover:shadow-md"
    >
      <p className="eyebrow">Guide</p>
      <h3 className="mt-2 text-lg group-hover:text-orange-700">{title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
        {desc}
      </p>
      <span className="mt-4 text-sm font-semibold text-orange-700">
        Read guide <span aria-hidden="true">→</span>
      </span>
    </Link>
  );
}
