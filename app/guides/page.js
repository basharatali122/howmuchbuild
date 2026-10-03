import Link from "next/link";
import AdSlot from "@/components/AdSlot";
import JsonLd from "@/components/JsonLd";
import { SITE_URL, SITE_NAME } from "@/lib/siteConfig";

export const metadata = {
  title: `Project Guides | ${SITE_NAME}`,
  description:
    "Step-by-step DIY project guides from HowMuchBuild: how to pour a concrete slab, fence planning, mulch installation, and cost breakdowns for slabs, decks, and fences — each paired with a free material calculator.",
  alternates: {
    canonical: `${SITE_URL}/guides`,
  },
  openGraph: {
    title: `Project Guides | ${SITE_NAME}`,
    description:
      "Step-by-step guides for concrete, fencing, and mulching — with free calculators for every project.",
    url: `${SITE_URL}/guides`,
    type: "website",
  },
};

const PAGE_URL = `${SITE_URL}/guides`;

const GUIDES = [
  {
    slug: "/guides/how-to-pour-a-concrete-slab",
    title: "How to Pour a Concrete Slab",
    description:
      "The full DIY sequence: planning, layout, excavation, forms, gravel base, reinforcement basics, ordering concrete, finishing, curing, and common mistakes.",
    calculator: "/concrete-bags-calculator",
    calculatorLabel: "Concrete bags calculator",
    tag: "Concrete",
  },
  {
    slug: "/guides/fence-planning-guide",
    title: "Fence Planning Guide",
    description:
      "Choose a style and height, check property lines and HOA rules, lay out post spacing, set posts in concrete or gravel, plan gates, and estimate materials.",
    calculator: "/fence-calculator",
    calculatorLabel: "Fence calculator",
    tag: "Fencing",
  },
  {
    slug: "/guides/mulch-installation-guide",
    title: "Mulch Installation Guide",
    description:
      "Pick a mulch type, prep and edge the bed, decide on weed barrier, spread at the right depth, and figure out exactly how much to order.",
    calculator: "/mulch-calculator",
    calculatorLabel: "Mulch calculator",
    tag: "Landscaping",
  },
  {
    slug: "/guides/concrete-slab-cost-guide",
    title: "How Much Does a Concrete Slab Cost?",
    description:
      "Typical cost ranges for a poured slab — DIY vs. pro, per-square-foot bands, what drives the price, and a worked 10×10 ft example.",
    calculator: "/concrete-bags-calculator",
    calculatorLabel: "Concrete bags calculator",
    tag: "Cost",
  },
  {
    slug: "/guides/deck-cost-guide",
    title: "How Much Does a Deck Cost?",
    description:
      "Wood vs. composite cost ranges per square foot, installed vs. DIY, and the factors — height, railings, stairs — that move any quote.",
    calculator: "/deck-calculator",
    calculatorLabel: "Deck calculator",
    tag: "Cost",
  },
  {
    slug: "/guides/fence-cost-guide",
    title: "How Much Does a Fence Cost?",
    description:
      "Per-linear-foot cost ranges for wood, chain-link, and vinyl fences — installed and DIY — plus gates, terrain, and removal costs.",
    calculator: "/fence-calculator",
    calculatorLabel: "Fence calculator",
    tag: "Cost",
  },
  {
    slug: "/guides/bags-vs-readymix-guide",
    title: "Concrete Bags vs. Ready-Mix: Which Is Cheaper?",
    description:
      "The break-even math: per-yard costs, short-load fees, and the project sizes where bags or a ready-mix truck wins.",
    calculator: "/concrete-calculator",
    calculatorLabel: "Concrete calculator",
    tag: "Cost",
  },
  {
    slug: "/guides/mulch-cost-guide",
    title: "How Much Does Mulch Cost?",
    description:
      "Typical price ranges for mulch: bulk per cubic yard vs. bagged, delivery fees and minimums, how depth changes the cost, and a worked 500 sq ft example.",
    calculator: "/mulch-calculator",
    calculatorLabel: "Mulch calculator",
    tag: "Cost",
  },
  {
    slug: "/guides/paint-cost-guide",
    title: "How Much Does It Cost to Paint a Room?",
    description:
      "Typical price ranges to paint a room: paint per gallon, primer, supplies, what drives the price, DIY vs. pro bands, and a worked 12×12 ft example.",
    calculator: "/paint-calculator",
    calculatorLabel: "Paint calculator",
    tag: "Cost",
  },
];

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: SITE_URL,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Guides",
      item: PAGE_URL,
    },
  ],
};

const itemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: `${SITE_NAME} Project Guides`,
  itemListElement: GUIDES.map((g, i) => ({
    "@type": "ListItem",
    position: i + 1,
    url: `${SITE_URL}${g.slug}`,
    name: g.title,
  })),
};

export default function GuidesIndexPage() {
  return (
    <article className="mx-auto max-w-content px-4 py-10 sm:px-6">
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={itemListJsonLd} />

      <nav aria-label="Breadcrumb" className="mb-4 text-sm text-slate-500">
        <Link href="/">Home</Link> <span aria-hidden="true">›</span>{" "}
        <span aria-current="page">Guides</span>
      </nav>

      <h1 className="max-w-3xl text-3xl sm:text-4xl">Project Guides</h1>
      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-600">
        Step-by-step DIY guides for the projects our calculators were built
        for. Each guide walks the job in the order you should do it, and
        each one links to the calculator that sizes your materials.
      </p>

      <AdSlot label="Advertisement" className="my-8 h-28" />

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {GUIDES.map((g) => (
          <div
            key={g.slug}
            className="flex flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
          >
            <span className="mb-3 inline-block w-fit rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-orange-700">
              {g.tag}
            </span>
            <h2 className="text-xl font-semibold text-slate-900">
              <Link href={g.slug} className="hover:text-orange-600">
                {g.title}
              </Link>
            </h2>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
              {g.description}
            </p>
            <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4 text-sm">
              <Link
                href={g.slug}
                className="font-semibold text-orange-600 hover:text-orange-700"
              >
                Read the guide →
              </Link>
              <Link
                href={g.calculator}
                className="text-slate-500 hover:text-slate-700"
              >
                {g.calculatorLabel}
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="prose-hmb mt-12 max-w-3xl">
        <h2>How to use these guides</h2>
        <p>
          Every guide is written as a sequence, not a reference — read it
          start to finish once before you buy materials, then work through
          it step by step on project day. When a step needs a number (bag
          counts, cubic yards, post spacing), the linked calculator does
          the math. New guides are added as new calculators launch, so{" "}
          <Link href="/calculators">browse all calculators</Link> if your
          project is not covered here yet.
        </p>
      </div>
    </article>
  );
}
