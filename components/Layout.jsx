import Link from "next/link";
import AdSlot from "@/components/AdSlot";
import { ADS_ENABLED, AUTHOR_NAME, SITE_NAME } from "@/lib/siteConfig";
import { calculatorNav, guideNav, companyNav } from "@/lib/nav";

const HEADER_NAV = [
  { href: "/calculators", label: "Calculators" },
  { href: "/guides", label: "Guides" },
  { href: "/methodology", label: "Methodology" },
  { href: "/about", label: "About" },
];

/** Original logo mark: an isometric concrete cube drawn by hand (no stock art). */
function LogoMark() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      aria-hidden="true"
      className="shrink-0"
    >
      <polygon points="16,3 28,10 16,17 4,10" fill="#ea580c" />
      <polygon points="4,10 16,17 16,29 4,22" fill="#c2410c" />
      <polygon points="28,10 16,17 16,29 28,22" fill="#9a3412" />
      <polyline
        points="10,13.5 16,17 22,13.5"
        fill="none"
        stroke="#fff7ed"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="7" />
      <line x1="16.5" y1="16.5" x2="21" y2="21" />
    </svg>
  );
}

export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}

function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-stone-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-content items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-bold text-slate-900"
        >
          <LogoMark />
          <span>
            How<span className="text-orange-600">Much</span>Build
          </span>
        </Link>
        <nav
          aria-label="Primary"
          className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex"
        >
          {HEADER_NAV.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-orange-600">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link
            href="/#site-search"
            aria-label="Search calculators and guides"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 hover:bg-stone-100 hover:text-orange-600"
          >
            <SearchIcon />
          </Link>
          <Link
            href="/concrete-bags-calculator"
            className="btn-primary hidden !px-4 !py-2 text-sm md:inline-flex"
          >
            Concrete Calculator
          </Link>
          <Link
            href="/concrete-bags-calculator"
            className="btn-primary !px-4 !py-2 text-sm md:hidden"
          >
            Calculator
          </Link>
        </div>
      </div>
      {/* Mobile nav */}
      <nav
        aria-label="Primary mobile"
        className="overflow-x-auto border-t border-stone-100 md:hidden"
      >
        <div className="flex gap-5 whitespace-nowrap px-4 py-2.5 text-sm font-medium text-slate-600">
          {HEADER_NAV.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-orange-600">
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t border-stone-200 bg-white">
      <div className="mx-auto max-w-content px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="flex items-center gap-2 text-sm font-semibold text-slate-900">
              <LogoMark />
              {SITE_NAME}
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-slate-500">
              Free calculators that answer one question: how much will your
              project cost to build? All math runs in your browser — nothing
              you enter is ever sent to a server.
            </p>
            {/* Pre-approval the ad zone stays hidden; it renders only after
                NEXT_PUBLIC_ADS_ENABLED=true (ad-network approval) */}
            {ADS_ENABLED ? (
              <div className="mt-4 w-full">
                <AdSlot label="Ad space (footer)" className="h-32" />
              </div>
            ) : null}
          </div>
          <nav aria-label="Calculator links">
            <p className="text-sm font-semibold text-slate-900">Calculators</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-500">
              {calculatorNav.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-orange-600">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Guide links">
            <p className="text-sm font-semibold text-slate-900">Guides</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-500">
              {guideNav.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-orange-600">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Company links">
            <p className="text-sm font-semibold text-slate-900">Company</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-500">
              {companyNav.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-orange-600">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="mt-10 border-t border-stone-200 pt-6">
          <p className="text-xs font-medium text-slate-600">
            Estimates only — not professional advice.
          </p>
          <p className="mt-2 text-xs leading-relaxed text-slate-500">
            {SITE_NAME} provides estimates for planning purposes. Material
            yields vary by product and conditions — always round up and
            confirm with your supplier for large orders. ©{" "}
            {new Date().getFullYear()} {SITE_NAME}.
          </p>
          <p className="mt-2 text-xs text-slate-400">
            Maintained by {AUTHOR_NAME}.
          </p>
        </div>
      </div>
    </footer>
  );
}
