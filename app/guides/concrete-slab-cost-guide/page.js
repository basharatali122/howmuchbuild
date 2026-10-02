import Link from "next/link";
import AdSlot from "@/components/AdSlot";
import JsonLd from "@/components/JsonLd";
import AuthorByline from "@/components/AuthorByline";
import { SITE_URL, SITE_NAME } from "@/lib/siteConfig";

export const metadata = {
  title: "How Much Does a Concrete Slab Cost? (2026 Cost Ranges)",
  description:
    "Typical US cost ranges for a concrete slab: DIY vs. pro-installed prices per square foot, what drives the price, and a worked 10×10 ft example.",
  alternates: {
    canonical: `${SITE_URL}/guides/concrete-slab-cost-guide`,
  },
  openGraph: {
    title: `How Much Does a Concrete Slab Cost? | ${SITE_NAME} Guides`,
    description:
      "Typical price ranges for a poured concrete slab — and the factors that move your quote up or down.",
    url: `${SITE_URL}/guides/concrete-slab-cost-guide`,
    type: "article",
  },
};

const PAGE_URL = `${SITE_URL}/guides/concrete-slab-cost-guide`;
const GUIDES_URL = `${SITE_URL}/guides`;

const FAQ_ITEMS = [
  {
    q: "How much does a 10×10 concrete slab cost?",
    a: "As a typical range: $600–$1,200 professionally installed for a basic 4-inch broom-finish slab (100 sq ft at $6–$12 per sq ft). DIY materials for the same slab typically run $200–$500. Prices vary widely by region, site conditions, and finish level.",
  },
  {
    q: "What is the cheapest way to pour a concrete slab?",
    a: "Do the site prep and forming yourself and order ready-mix for the pour. Excavation, gravel base, and form-building are labor-heavy but skill-light; the concrete itself and the finishing are where pro experience pays off. Keep the shape a simple rectangle and the finish a basic broom texture.",
  },
  {
    q: "Does slab thickness change the cost much?",
    a: "Yes — concrete is the biggest material line item, and going from 4″ to 6″ thick adds 50% more concrete. A 4-inch slab suits patios and walkways; driveways and heavy loads typically call for 5–6 inches. Don't thin a slab to save money if it will carry vehicles.",
  },
  {
    q: "Why do concrete quotes vary so much?",
    a: "Site prep dominates the spread. A flat, accessible backyard with good soil is a fast job; a sloped site needing excavation, tree roots, poor drainage, or hand-carried concrete in wheelbarrows adds hours of labor. Always compare itemized quotes, not just the bottom line.",
  },
  {
    q: "Should I use bags or ready-mix for my slab?",
    a: "For anything much over a cubic yard, ready-mix from a truck is usually far cheaper per yard than bags. See our bags vs. ready-mix guide for the break-even math — and use the concrete bags calculator to size either option.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Guides", item: GUIDES_URL },
    { "@type": "ListItem", position: 3, name: "How Much Does a Concrete Slab Cost?", item: PAGE_URL },
  ],
};

export default function ConcreteSlabCostGuide() {
  return (
    <article className="mx-auto max-w-content px-4 py-10 sm:px-6">
      <JsonLd data={faqJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <nav aria-label="Breadcrumb" className="mb-4 text-sm text-slate-500">
        <Link href="/">Home</Link> <span aria-hidden="true">›</span>{" "}
        <Link href="/guides">Guides</Link> <span aria-hidden="true">›</span>{" "}
        <span aria-current="page">Concrete Slab Cost Guide</span>
      </nav>

      <p className="eyebrow">Cost guide</p>
      <h1 className="mt-2 max-w-3xl text-3xl sm:text-4xl">
        How Much Does a Concrete Slab Cost?
      </h1>
      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-600">
        A concrete slab can cost $6 or $20 per square foot depending on
        thickness, site prep, finish, and who does the work. Here are the
        typical US price ranges, what drives them, and a worked example so
        you can sanity-check any quote.
      </p>
      <div className="mt-4">
        <AuthorByline />
      </div>

      <div className="prose-hmb mt-10 max-w-3xl">
        <div className="not-prose mb-8 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          <strong>Ranges, not quotes.</strong> All figures below are typical
          US ranges reported by contractors and home-improvement sources.
          Actual prices vary widely by region, site conditions, access, and
          finish level — use them to evaluate quotes, not replace them.
        </div>

        <h2>Quick answer: typical slab cost ranges</h2>
        <table>
          <thead>
            <tr>
              <th>Slab type</th>
              <th>Typical range (per sq ft)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>DIY, materials only</td>
              <td>$2–$5</td>
            </tr>
            <tr>
              <td>Pro installed, basic broom finish</td>
              <td>$6–$12</td>
            </tr>
            <tr>
              <td>Pro installed, stamped or decorative</td>
              <td>$12–$20+</td>
            </tr>
          </tbody>
        </table>
        <p>
          A basic 10×10 ft patio slab (100 sq ft) therefore lands around{" "}
          <strong>$600–$1,200 installed</strong>, or{" "}
          <strong>$200–$500 in materials</strong> if you do everything but
          the finishing yourself. Decorative work — stamping, staining,
          exposed aggregate — can double the installed price.
        </p>

        <AdSlot label="Advertisement" className="my-8 h-28" />

        <h2>What drives the price</h2>
        <ul>
          <li>
            <strong>Size and thickness.</strong> Concrete is the biggest
            material cost, and it scales with volume. A 6-inch slab uses
            50% more concrete than a 4-inch slab of the same area.
          </li>
          <li>
            <strong>Site prep.</strong> Excavation, tree roots, poor soil,
            and drainage work are labor hours. A flat, accessible site is
            the cheapest possible starting point.
          </li>
          <li>
            <strong>Access.</strong> If the truck can&apos;t reach the forms,
            concrete gets wheelbarrowed or pumped — both add cost. A pump
            truck alone can add several hundred dollars to a small job.
          </li>
          <li>
            <strong>Reinforcement.</strong> Wire mesh is cheap insurance;
            rebar grids cost more but belong under driveways and heavy
            loads.
          </li>
          <li>
            <strong>Finish.</strong> Broom finish is standard and cheapest.
            Stamping, coloring, and exposed aggregate are skilled,
            time-consuming upgrades.
          </li>
          <li>
            <strong>Region and season.</strong> Labor rates and concrete
            prices differ enormously by market, and cold-weather pours need
            protection that adds cost.
          </li>
        </ul>

        <h2>Worked example: 10×10 ft patio slab, 4″ thick</h2>
        <ol>
          <li>
            <strong>Volume:</strong> 10 × 10 × (4 ÷ 12) = 33.33 cu ft =
            1.23 cu yd → order about <strong>1.5 yards</strong> (ready-mix
            has minimums; check our{" "}
            <Link href="/guides/bags-vs-readymix-guide">
              bags vs. ready-mix guide
            </Link>
            ).
          </li>
          <li>
            <strong>Concrete:</strong> ~1.5 yd at a typical $140–$180/yd
            delivered = <strong>$210–$270</strong>.
          </li>
          <li>
            <strong>Base + forms + mesh:</strong> gravel base, 2×4 forms,
            and wire mesh typically add <strong>$100–$200</strong> in
            materials for this size.
          </li>
          <li>
            <strong>DIY total:</strong> roughly <strong>$300–$500</strong> in
            materials.
          </li>
          <li>
            <strong>Pro installed:</strong> 100 sq ft × $6–$12 ={" "}
            <strong>$600–$1,200</strong>.
          </li>
        </ol>
        <p>
          Size your exact materials with our{" "}
          <Link href="/concrete-bags-calculator">concrete bags calculator</Link>{" "}
          or <Link href="/concrete-calculator">concrete calculator</Link>{" "}
          before you price anything.
        </p>

        <h2>How to keep the cost down</h2>
        <ul>
          <li>
            <strong>Do your own prep.</strong> Excavation, gravel base, and
            form-building are labor-heavy but skill-light — the classic DIY
            savings.
          </li>
          <li>
            <strong>Keep it rectangular.</strong> Curves and angles mean
            custom form work and more waste.
          </li>
          <li>
            <strong>Choose a standard finish.</strong> Broom finish looks
            clean and costs the least.
          </li>
          <li>
            <strong>Get 3 itemized quotes.</strong> Compare line items —
            prep, concrete, reinforcement, finish — not just totals. The
            cheapest bid that skips the gravel base is the most expensive
            slab you&apos;ll ever buy.
          </li>
        </ul>

        <h2>Frequently asked questions</h2>
        {FAQ_ITEMS.map((f) => (
          <div key={f.q} className="mb-6">
            <h3 className="!mt-6">{f.q}</h3>
            <p>{f.a}</p>
          </div>
        ))}
      </div>
    </article>
  );
}
