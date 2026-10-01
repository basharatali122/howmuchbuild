import Link from "next/link";
import AdSlot from "@/components/AdSlot";
import { ADS_ENABLED, AUTHOR_NAME, SITE_NAME } from "@/lib/siteConfig";

const NAV_LINKS = [
  { href: "/calculators", label: "All Calculators" },
  { href: "/concrete-bags-calculator", label: "Concrete Bags Calculator" },
  { href: "/about", label: "About" },
];

const FOOTER_LINKS = [
  { href: "/calculators", label: "All Calculators" },
  { href: "/concrete-bags-calculator", label: "Concrete Bags Calculator" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/disclaimer", label: "Disclaimer" },
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
      <div className="mx-auto flex max-w-content items-center justify-between px-4 py-3 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-bold text-slate-900"
        >
          <LogoMark />
          <span>
            How<span className="text-orange-600">Much</span>Build
          </span>
        </Link>
        <nav className="hidden gap-6 text-sm font-medium text-slate-600 md:flex">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-orange-600">
              {link.label}
            </Link>
          ))}
        </nav>
        <Link href="/concrete-bags-calculator" className="btn-primary hidden text-sm md:inline-flex">
          Concrete Calculator
        </Link>
        <Link href="/concrete-bags-calculator" className="btn-primary text-sm md:hidden">
          Calculator
        </Link>
      </div>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t border-stone-200 bg-white">
      <div className="mx-auto max-w-content px-4 py-10 sm:px-6">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <p className="flex items-center gap-2 text-sm font-semibold text-slate-900">
              <LogoMark />
              {SITE_NAME}
            </p>
            <p className="mt-2 max-w-xs text-sm text-slate-500">
              Free, private, client-side calculators for DIY builders and
              contractors. All math runs in your browser — nothing you enter
              is ever sent to a server.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">Site</p>
            <ul className="mt-2 space-y-2 text-sm text-slate-500">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-orange-600">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* Pre-approval the ad zone stays hidden; it renders only after
              NEXT_PUBLIC_ADS_ENABLED=true (ad-network approval) */}
          {ADS_ENABLED ? (
            <div className="w-full">
              <AdSlot label="Ad space (footer)" className="h-32" />
            </div>
          ) : null}
        </div>
        <p className="mt-8 border-t border-stone-200 pt-6 text-xs leading-relaxed text-slate-500">
          {SITE_NAME} provides estimates for planning purposes. Concrete
          yields vary by mix and conditions — always round up and confirm
          with your supplier for large pours. © {new Date().getFullYear()}{" "}
          {SITE_NAME}.
        </p>
        <p className="mt-2 text-xs text-slate-400">Maintained by {AUTHOR_NAME}.</p>
      </div>
    </footer>
  );
}
