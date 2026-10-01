/**
 * SiteSearch — client-side search over a static index of all calculators
 * and guides. No backend, no tracking; filtering happens in the browser.
 */
"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { calculatorNav, guideNav } from "@/lib/nav";

const INDEX = [
  ...calculatorNav.map((c) => ({
    ...c,
    kind: "Calculator",
    keywords:
      "calculator materials estimate cost how much bags cubic yards diy project",
  })),
  ...guideNav.map((g) => ({
    ...g,
    kind: "Guide",
    keywords: "guide how to steps cost diy instructions",
  })),
];

function matches(item, query) {
  const haystack =
    `${item.title} ${item.desc} ${item.keywords} ${item.kind}`.toLowerCase();
  return query
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((word) => haystack.includes(word));
}

export default function SiteSearch({
  placeholder = "Search calculators & guides…",
}) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const blurTimer = useRef(null);

  const results = useMemo(() => {
    const q = query.trim();
    if (q.length < 2) return [];
    return INDEX.filter((item) => matches(item, q)).slice(0, 8);
  }, [query]);

  const showDropdown = open && query.trim().length >= 2;

  return (
    <div className="relative w-full">
      <label htmlFor="site-search-input" className="sr-only">
        Search calculators and guides
      </label>
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className="text-slate-400"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="7" />
          <line x1="16.5" y1="16.5" x2="21" y2="21" />
        </svg>
      </div>
      <input
        id="site-search-input"
        type="search"
        role="combobox"
        aria-expanded={showDropdown}
        aria-controls="site-search-results"
        aria-autocomplete="list"
        autoComplete="off"
        placeholder={placeholder}
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => {
          // Delay closing so a result click registers first.
          blurTimer.current = setTimeout(() => setOpen(false), 150);
        }}
        onKeyDown={(e) => {
          if (e.key === "Escape") setOpen(false);
        }}
        className="!rounded-xl !border-0 !py-3.5 !pl-11 !pr-4 text-base shadow-lg"
      />
      {showDropdown && (
        <div className="absolute inset-x-0 top-full z-50 mt-2 overflow-hidden rounded-xl border border-stone-200 bg-white text-left shadow-xl">
          {results.length > 0 ? (
            <ul id="site-search-results" role="listbox">
              {results.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => {
                      clearTimeout(blurTimer.current);
                      setOpen(false);
                    }}
                    className="flex items-start justify-between gap-3 px-4 py-3 hover:bg-orange-50"
                  >
                    <span>
                      <span className="block text-sm font-semibold text-slate-900">
                        {item.title}
                      </span>
                      <span className="mt-0.5 block text-xs leading-relaxed text-slate-500">
                        {item.desc}
                      </span>
                    </span>
                    <span className="mt-0.5 shrink-0 rounded-full bg-stone-100 px-2 py-0.5 text-[11px] font-medium text-slate-500">
                      {item.kind}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="px-4 py-3 text-sm text-slate-500">
              No matches — try “concrete”, “deck”, or “fence”.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
