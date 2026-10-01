import Link from "next/link";
import AdSlot from "@/components/AdSlot";

const LIVE_CALCULATORS = [
  {
    href: "/concrete-bags-calculator",
    title: "Concrete Bags Calculator",
    desc: "How many bags of concrete do I need? Slab, wall, footing, sonotube & fence-post modes with post displacement, waste, and cost.",
  },
  {
    href: "/concrete-calculator",
    title: "Concrete Calculator",
    desc: "Concrete volume in cubic yards for slabs, walls, footings & columns — ready-mix quantities, bag equivalents, and cost.",
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

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="border-b border-stone-200 bg-white">
        <div className="mx-auto max-w-content px-4 py-16 text-center sm:px-6 sm:py-20">
          <h1 className="mx-auto max-w-3xl text-4xl sm:text-5xl">
            How much material does your project{" "}
            <span className="text-orange-600">actually</span> need?
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
            Free calculators for DIY builders and contractors. Enter your
            dimensions, get exact material counts with waste allowances and
            cost estimates — no sign-up, everything runs in your browser.
          </p>
          <div className="mt-8">
            <Link href="/concrete-bags-calculator" className="btn-primary">
              Try the Concrete Bags Calculator
            </Link>
          </div>
        </div>
      </section>

      {/* Calculators */}
      <section id="calculators" className="mx-auto max-w-content px-4 py-14 sm:px-6">
        <h2 className="text-2xl">Calculators</h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {LIVE_CALCULATORS.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="card group transition hover:border-orange-300 hover:shadow-md"
            >
              <h3 className="text-lg group-hover:text-orange-700">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {c.desc}
              </p>
              <span className="mt-4 inline-block text-sm font-semibold text-orange-700">
                Open calculator →
              </span>
            </Link>
          ))}
        </div>

        <h2 className="mt-14 text-2xl">Project guides</h2>
        <p className="mt-3 max-w-2xl text-slate-600">
          Step-by-step project walkthroughs that pair with the calculators —
          from pouring your first slab to planning a fence line.
        </p>
        <div className="mt-6">
          <Link href="/guides" className="btn-primary">
            Browse the guides
          </Link>
        </div>

        <AdSlot label="Advertisement" className="mt-12 h-28" />
      </section>
    </div>
  );
}
