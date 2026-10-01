/**
 * TableOfContents — jump links for long calculator/guide pages.
 * items: [{ id, label }] where id matches a section heading's id anchor.
 */
import Link from "next/link";

export default function TableOfContents({ items = [] }) {
  if (!items.length) return null;
  return (
    <nav
      aria-label="On this page"
      className="card !p-5"
    >
      <p className="eyebrow">On this page</p>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li key={item.id}>
            <Link
              href={`#${item.id}`}
              className="text-sm text-slate-600 hover:text-orange-700"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
