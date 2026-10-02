import Link from "next/link";
import AdSlot from "@/components/AdSlot";
import JsonLd from "@/components/JsonLd";
import SiteSearch from "@/components/SiteSearch";
import StatStrip from "@/components/StatStrip";
import MiniSlabCalculator from "@/components/MiniSlabCalculator";
import CalculatorCard from "@/components/CalculatorCard";
import GuideCard from "@/components/GuideCard";
import { calculatorNav, guideNav } from "@/lib/nav";
import { SITE_NAME, SITE_URL } from "@/lib/siteConfig";
import {
  IconSlab,
  IconWall,
  IconDeck,
  IconFence,
  IconMulch,
  IconPaint,
  IconDrywall,
  IconPaver,
  IconSod,
  IconSoil,
  IconGravel,
  IconSand,
  IconTile,
  IconStair,
  IconAsphalt,
} from "@/components/SvgDiagrams";

export const metadata = {
  title: `${SITE_NAME} — Free DIY & Contractor Calculators`,
  description:
    "Free calculators for DIY builders and contractors: concrete bags, deck materials, fence materials, mulch, paint, gravel, sand, tile, and more. Estimate materials and cost — no sign-up, everything runs in your browser.",
  alternates: {
    canonical: SITE_URL,
  },
};

const ICONS = {
  slab: IconSlab,
  wall: IconWall,
  deck: IconDeck,
  fence: IconFence,
  mulch: IconMulch,
  paint: IconPaint,
  drywall: IconDrywall,
  paver: IconPaver,
  sod: IconSod,
  soil: IconSoil,
  gravel: IconGravel,
  sand: IconSand,
  tile: IconTile,
  stair: IconStair,
  asphalt: IconAsphalt,
};

const HOW_IT_WORKS = [
  {
    step: "1",
    title: "Enter your dimensions",
    desc: "Length, width, thickness — whatever your project needs. No account, no setup — your inputs stay in your browser.",
  },
  {
    step: "2",
    title: "Get your materials",
    desc: "Exact counts with waste allowances built in. Every result is rounded up so you don't run short mid-project.",
  },
  {
    step: "3",
    title: "Estimate the cost",
    desc: "Plug in your local store prices to see an estimated project cost before you spend a dollar.",
  },
];

const TEASER_GUIDES = [
  "/guides/how-to-pour-a-concrete-slab",
  "/guides/concrete-slab-cost-guide",
  "/guides/bags-vs-readymix-guide",
  "/guides/fence-planning-guide",
];

const COST_GUIDE_LINKS = [
  { href: "/guides/concrete-slab-cost-guide", label: "Concrete slab cost" },
  { href: "/guides/deck-cost-guide", label: "Deck cost" },
  { href: "/guides/fence-cost-guide", label: "Fence cost" },
  { href: "/guides/bags-vs-readymix-guide", label: "Bags vs. ready-mix" },
];

const FAQS = [
  {
    q: "Are these calculators really free?",
    a: "Yes. Every calculator on HowMuchBuild is free to use, with no sign-up, no account, and no usage limits.",
  },
  {
    q: "Do I need to create an account?",
    a: "No. There are no accounts on HowMuchBuild. Open a calculator, enter your dimensions, and get your answer.",
  },
  {
    q: "Is my project data private?",
    a: "Yes. All calculations run in your browser (client-side). Nothing you type is sent to our servers or tracked.",
  },
  {
    q: "How accurate are the material estimates?",
    a: "The formulas use standard construction math and manufacturer-published yields, and every result is rounded up so you don't run short. Treat results as planning estimates — not quotes — and confirm with your supplier for large orders.",
  },
  {
    q: "Do the calculators estimate project cost?",
    a: "Yes. Each calculator's results include a cost estimator: enter your local store prices and it totals an estimated project cost. Prices vary by store and region, so every cost figure is labeled an estimate.",
  },
];

export default function HomePage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const teaserGuides = TEASER_GUIDES.map(
    (href) => guideNav.find((g) => g.href === href)
  ).filter(Boolean);

  return (
    <div>
      <JsonLd data={faqJsonLd} />

      {/* 1. Hero */}
      <section className="blueprint-grid">
        <div className="mx-auto grid max-w-content items-center gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-2 lg:gap-14">
          <div>
            <p className="eyebrow-dark">Free project calculators</p>
            <h1 className="mt-3 text-4xl text-white sm:text-5xl">
              How much will your project cost to build?
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-300">
              Free calculators for DIY builders and contractors. Enter your
              dimensions, get exact material counts with waste allowances —
              then estimate what it will cost. No sign-up; everything runs in
              your browser.
            </p>
            <div id="site-search" className="mt-7 max-w-xl scroll-mt-24">
              <SiteSearch placeholder="Try “concrete”, “deck”, or “fence”… " />
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/calculators" className="btn-dark">
                Browse all calculators
              </Link>
              <Link
                href="/guides"
                className="inline-flex items-center justify-center rounded-lg border border-slate-600 px-5 py-2.5 font-medium text-slate-200 transition hover:border-slate-400 hover:text-white"
              >
                Read the guides
              </Link>
            </div>
          </div>
          <div className="mx-auto w-full max-w-md lg:max-w-none">
            <MiniSlabCalculator />
          </div>
        </div>
      </section>

      {/* 2. Stat strip */}
      <StatStrip />

      {/* 3. Calculator grid */}
      <section
        aria-label="Project calculators"
        className="mx-auto max-w-content px-4 py-16 sm:px-6 sm:py-20"
      >
        <p className="eyebrow">Free tools</p>
        <h2 className="mt-2 text-4xl">Project calculators</h2>
        <p className="mt-3 max-w-2xl leading-relaxed text-slate-600">
          Fifteen calculators covering the materials DIY builders and
          contractors buy most — concrete, lumber, fencing, paint, and more.
        </p>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {calculatorNav.map((c) => (
            <CalculatorCard
              key={c.href}
              href={c.href}
              title={c.title}
              desc={c.desc}
              icon={ICONS[c.iconName]}
            />
          ))}
        </div>
      </section>

      {/* 4. How it works */}
      <section className="border-y border-stone-200 bg-white">
        <div className="mx-auto max-w-content px-4 py-16 sm:px-6 sm:py-20">
          <p className="eyebrow">How it works</p>
          <h2 className="mt-2 text-4xl">From dimensions to dollars</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {HOW_IT_WORKS.map((s) => (
              <div key={s.step} className="card">
                <p className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-orange-600 text-lg font-bold text-white">
                  {s.step}
                </p>
                <h3 className="mt-4 text-xl">{s.title}</h3>
                <p className="mt-2 leading-relaxed text-slate-600">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Cost-first band */}
      <section className="mx-auto max-w-content px-4 py-16 sm:px-6 sm:py-20">
        <div className="card !border-orange-200 !bg-orange-50/60 !p-8 sm:!p-10">
          <p className="eyebrow">Cost-first</p>
          <h2 className="mt-2 text-3xl sm:text-4xl">
            Know the price before you buy
          </h2>
          <p className="mt-4 max-w-3xl leading-relaxed text-slate-600">
            Material counts are only half the question. Every HowMuchBuild
            calculator pairs its quantities with an estimated cost — enter
            your local store prices and see the project total before you
            head to checkout. Our cost guides break down typical US price
            ranges for the most common projects:
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {COST_GUIDE_LINKS.map((g) => (
              <Link key={g.href} href={g.href} className="btn-secondary text-sm">
                {g.label} →
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Guides teaser */}
      <section className="border-t border-stone-200 bg-white">
        <div className="mx-auto max-w-content px-4 py-16 sm:px-6 sm:py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Learn</p>
              <h2 className="mt-2 text-4xl">Project guides</h2>
              <p className="mt-3 max-w-2xl leading-relaxed text-slate-600">
                Step-by-step walkthroughs and cost breakdowns that pair with
                the calculators.
              </p>
            </div>
            <Link href="/guides" className="btn-secondary text-sm">
              All guides →
            </Link>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {teaserGuides.map((g) => (
              <GuideCard
                key={g.href}
                href={g.href}
                title={g.title}
                desc={g.desc}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 7. Trust / methodology band */}
      <section className="blueprint-grid">
        <div className="mx-auto max-w-content px-4 py-16 sm:px-6 sm:py-20">
          <p className="eyebrow-dark">Our promise</p>
          <h2 className="mt-2 max-w-3xl text-3xl text-white sm:text-4xl">
            Every formula shown. Every result rounded up.
          </h2>
          <ul className="mt-6 max-w-2xl space-y-3 text-slate-300">
            <li className="flex gap-3">
              <span aria-hidden="true" className="text-amber-400">✓</span>
              Formulas and yields published on every page — check our math.
            </li>
            <li className="flex gap-3">
              <span aria-hidden="true" className="text-amber-400">✓</span>
              Results always rounded up — never short mid-project.
            </li>
            <li className="flex gap-3">
              <span aria-hidden="true" className="text-amber-400">✓</span>
              No account — your project data never leaves your browser.
            </li>
          </ul>
          <Link href="/methodology" className="btn-dark mt-8">
            How we calculate
          </Link>
        </div>
      </section>

      {/* 8. FAQ + ad slot */}
      <section className="mx-auto max-w-content px-4 py-16 sm:px-6 sm:py-20">
        <p className="eyebrow">FAQ</p>
        <h2 className="mt-2 text-4xl">Common questions</h2>
        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {FAQS.map((f) => (
            <div key={f.q} className="card">
              <h3 className="text-lg">{f.q}</h3>
              <p className="mt-2 leading-relaxed text-slate-600">{f.a}</p>
            </div>
          ))}
        </div>
        <AdSlot label="Advertisement" className="mt-12 h-28" />
      </section>
    </div>
  );
}
