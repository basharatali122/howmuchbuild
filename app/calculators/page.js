import Link from "next/link";
import AdSlot from "@/components/AdSlot";
import { SITE_URL, SITE_NAME } from "@/lib/siteConfig";

export const metadata = {
  title: "All Calculators",
  description:
    `Every ${SITE_NAME} calculator: concrete bags, concrete volume, deck, fence, mulch, paint, drywall, paver, sod & topsoil — each with full material takeoffs, waste allowances, and worked examples.`,
  alternates: {
    canonical: `${SITE_URL}/calculators`,
  },
};

const LIVE = [
  {
    href: "/concrete-bags-calculator",
    title: "Concrete Bags Calculator",
    desc: "How many bags of concrete do I need? Slab, wall, footing, sonotube & fence-post modes with post displacement, waste allowance, and cost estimate.",
  },
  {
    href: "/concrete-calculator",
    title: "Concrete Calculator",
    desc: "Concrete volume in cubic yards for slabs, walls, footings & columns — ready-mix quantities, bag equivalents, and cost estimate.",
  },
  {
    href: "/deck-calculator",
    title: "Deck Calculator",
    desc: "Full deck material takeoff: boards, joists, posts, footings, screws & railing from your deck dimensions.",
  },
  {
    href: "/fence-calculator",
    title: "Fence Calculator",
    desc: "Posts, pickets, rails, concrete & gates from your fence length, height, and style.",
  },
  {
    href: "/mulch-calculator",
    title: "Mulch Calculator",
    desc: "Beds, circles & triangles — cubic yards or bags, with depth in inches and a bulk-vs-bag comparison.",
  },
  {
    href: "/paint-calculator",
    title: "Paint Calculator",
    desc: "Room mode with doors & windows subtracted, exterior mode, and coats compared — gallons, rounded up.",
  },
  {
    href: "/drywall-calculator",
    title: "Drywall Calculator",
    desc: "4×8 sheets with waste allowance, plus screws, joint compound & tape estimates for walls and ceilings.",
  },
  {
    href: "/paver-calculator",
    title: "Paver Calculator",
    desc: "Paver counts with pattern waste, base gravel, bedding sand & polymeric sand for patios and walkways.",
  },
  {
    href: "/sod-calculator",
    title: "Sod Calculator",
    desc: "Lawn pallets from rectangle or circle areas — with waste allowance and a coverage chart.",
  },
  {
    href: "/topsoil-calculator",
    title: "Topsoil Calculator",
    desc: "Lawn mode and raised-bed mode — cubic yards plus bag equivalents, with a settle allowance.",
  },
];

export default function CalculatorsHubPage() {
  return (
    <div className="mx-auto max-w-content px-4 py-12 sm:px-6">
      <nav aria-label="Breadcrumb" className="mb-4 text-sm text-slate-500">
        <Link href="/">Home</Link> <span aria-hidden="true">›</span>{" "}
        <span aria-current="page">All Calculators</span>
      </nav>
      <h1 className="text-3xl sm:text-4xl">All Calculators</h1>
      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-600">
        Every {SITE_NAME} tool shows its work: full material takeoffs, waste
        allowances, cost estimates, and step-by-step arithmetic — not
        one-field widgets.
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {LIVE.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="card group transition hover:border-orange-300 hover:shadow-md"
          >
            <h2 className="mt-3 !text-xl group-hover:text-orange-700">
              {c.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              {c.desc}
            </p>
            <span className="mt-4 inline-block text-sm font-semibold text-orange-700">
              Open calculator →
            </span>
          </Link>
        ))}
      </div>

      <AdSlot label="Advertisement" className="mt-12 h-28" />
    </div>
  );
}
