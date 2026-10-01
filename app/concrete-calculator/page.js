import Link from "next/link";
import ConcreteCalcHub from "@/components/ConcreteCalcHub";
import AdSlot from "@/components/AdSlot";
import JsonLd from "@/components/JsonLd";
import { SITE_URL, SITE_NAME } from "@/lib/siteConfig";

export const metadata = {
  title: "Concrete Calculator: Cubic Yards, Volume & Cost (Free)",
  description:
    "Free concrete calculator: find cubic yards of concrete for a slab, wall, footing, or column — with bag equivalents, an optional cost estimate, and a bags-vs-ready-mix guide.",
  alternates: {
    canonical: `${SITE_URL}/concrete-calculator`,
  },
  openGraph: {
    title: "Concrete Calculator: Cubic Yards, Volume & Cost (Free)",
    description:
      "Enter dimensions, get cubic yards, bag equivalents, and an estimated ready-mix cost — plus worked examples and coverage charts.",
    url: `${SITE_URL}/concrete-calculator`,
    type: "article",
  },
};

const PAGE_URL = `${SITE_URL}/concrete-calculator`;

const FAQ_ITEMS = [
  {
    q: "How many cubic yards of concrete do I need for a 10×10 slab?",
    a: "A 10×10 ft slab at 4 inches thick is 33.33 cubic feet, which is 33.33 ÷ 27 ≈ 1.24 cubic yards. With a 10% waste allowance that's about 1.36 cubic yards.",
  },
  {
    q: "How many cubic feet are in a cubic yard of concrete?",
    a: "Exactly 27. A cubic yard is a block 3 ft × 3 ft × 3 ft, so 3 × 3 × 3 = 27 cubic feet. Ready-mix concrete is always sold by the cubic yard.",
  },
  {
    q: "When should I order ready-mix instead of bagged concrete?",
    a: "Bagged premix is usually the simpler path under about 1 cubic yard (roughly 45 eighty-pound bags). From about 1 to 2 cubic yards it's a break-even zone — price it both ways. Above roughly 2 cubic yards, a ready-mix truck is typically cheaper per yard and far less labor. A full mixer truck carries roughly 8–10 cubic yards.",
  },
  {
    q: "How much does a cubic yard of concrete cost?",
    a: "It varies widely by market, mix design, and delivery fees — call local batch plants for quotes. The calculator above takes your quoted price per yard and turns it into a total cost estimate.",
  },
  {
    q: "Should I add extra to a ready-mix order?",
    a: "Yes — order 5–10% over the calculated volume. Forms flex, subgrade is never perfectly level, and running short mid-pour is far more expensive than a little extra. The calculator above includes an adjustable waste slider.",
  },
  {
    q: "How many 80 lb bags of concrete are in a cubic yard?",
    a: "45. One cubic yard is 27 cubic feet and an 80 lb bag yields 0.60 cubic feet (27 ÷ 0.60 = 45). A yard equals 60 sixty-pound bags or 90 forty-pound bags.",
  },
  {
    q: "What's the difference between this calculator and the concrete bags calculator?",
    a: "This page is volume-first: it answers 'how many cubic yards do I need?' and estimates ready-mix cost, which is what batch plants quote. Our concrete bags calculator is bag-first — enter dimensions and get exact bag counts for 40, 60, and 80 lb bags with post-hole displacement.",
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
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: SITE_URL,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Concrete Calculator",
      item: PAGE_URL,
    },
  ],
};

export default function ConcreteCalculatorPage() {
  return (
    <article className="mx-auto max-w-content px-4 py-10 sm:px-6">
      <JsonLd data={faqJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <nav aria-label="Breadcrumb" className="mb-4 text-sm text-slate-500">
        <Link href="/">Home</Link> <span aria-hidden="true">›</span>{" "}
        <span aria-current="page">Concrete Calculator</span>
      </nav>

      <h1 className="max-w-3xl text-3xl sm:text-4xl">
        Concrete Calculator: Cubic Yards, Volume &amp; Cost
      </h1>
      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-600">
        Ready-mix plants sell concrete by the cubic yard, so this calculator
        starts from volume: enter your slab, wall, footing, or column
        dimensions and get cubic yards, bag equivalents, and an optional cost
        estimate from your quoted price per yard. Need bag counts first?
        Try the <Link href="/concrete-bags-calculator">concrete bags calculator</Link> instead.
      </p>

      <div className="mt-8">
        <ConcreteCalcHub />
      </div>

      <AdSlot label="Advertisement" className="my-8 h-28" />

      <div className="prose-hmb mt-12 max-w-3xl">
        <h2>Worked example: 12×12 ft patio at 6 inches thick</h2>
        <p>
          A driveway-grade patio slab is a classic ready-mix candidate. Here is
          the full arithmetic:
        </p>
        <ol>
          <li>
            <strong>Volume:</strong> 12 ft × 12 ft × (6 ÷ 12) ft = 12 × 12 ×
            0.5 = <strong>72 cu ft</strong>
          </li>
          <li>
            <strong>In cubic yards:</strong> 72 ÷ 27 ={" "}
            <strong>2.67 cu yd</strong>
          </li>
          <li>
            <strong>80 lb bag equivalents:</strong> 72 ÷ 0.60 ={" "}
            <strong>120 bags</strong> (132 with 10% waste: 79.2 ÷ 0.60)
          </li>
          <li>
            <strong>Cost at $180 per yard (with 10% waste):</strong> (79.2 ÷
            27) × $180 = 2.93 × $180 = <strong>$528.00</strong>
          </li>
        </ol>
        <p>
          At nearly 3 cubic yards, this pour is solidly in ready-mix territory
          — mixing 132 bags by hand would take a full crew all day.
        </p>

        <h2>Worked example: footing 30 ft long</h2>
        <p>
          For a 30-foot footing, 16 inches wide and 12 inches deep:
        </p>
        <ol>
          <li>
            <strong>Volume:</strong> 30 × (16 ÷ 12) × (12 ÷ 12) = 30 × 1.3333
            × 1 = <strong>40 cu ft</strong>
          </li>
          <li>
            <strong>In cubic yards:</strong> 40 ÷ 27 ={" "}
            <strong>1.48 cu yd</strong>
          </li>
          <li>
            <strong>80 lb bag equivalents:</strong> 40 ÷ 0.60 = 66.67 → round
            up = <strong>67 bags</strong>
          </li>
          <li>
            <strong>Cost at $170 per yard:</strong> 1.48 × $170 ={" "}
            <strong>$251.85</strong>
          </li>
        </ol>

        <h2>What one cubic yard of concrete covers</h2>
        <p>
          A yard goes further than most people expect at thinner depths. Area
          covered = 324 ÷ thickness in inches:
        </p>
        <table>
          <thead>
            <tr>
              <th>Thickness</th>
              <th>Area one cubic yard covers</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>4″</td><td>81 sq ft</td></tr>
            <tr><td>5″</td><td>64.8 sq ft</td></tr>
            <tr><td>6″</td><td>54 sq ft</td></tr>
            <tr><td>8″</td><td>40.5 sq ft</td></tr>
            <tr><td>12″</td><td>27 sq ft</td></tr>
          </tbody>
        </table>

        <h2>Bags or ready-mix? A rule of thumb</h2>
        <p>
          These bands are a planning guide, not a price quote — labor and
          local fees swing the real break-even point:
        </p>
        <table>
          <thead>
            <tr>
              <th>Pour volume</th>
              <th>≈ 80-lb bag equivalents</th>
              <th>Usually best</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Under 0.5 cu yd</td><td>Under ~23 bags</td><td>Bagged premix</td></tr>
            <tr><td>0.5–1 cu yd</td><td>~23–45 bags</td><td>Bagged premix</td></tr>
            <tr><td>1–2 cu yd</td><td>~45–90 bags</td><td>Price it both ways</td></tr>
            <tr><td>Over 2 cu yd</td><td>Over ~90 bags</td><td>Ready-mix truck</td></tr>
          </tbody>
        </table>

        <h2>The formulas</h2>
        <h3>Slab, wall, or footing (rectangle)</h3>
        <p>
          <strong>V = Length × Width × Thickness</strong> — all in feet.
          Thickness in inches divided by 12 converts to feet.
        </p>
        <h3>Column or sonotube (cylinder)</h3>
        <p>
          <strong>V = π × r² × h</strong> — r is half the diameter, h is the
          height, both in feet.
        </p>
        <h3>Cubic yards from cubic feet</h3>
        <p>
          <strong>Yards = Cubic feet ÷ 27</strong> — exactly 27 cubic feet in a
          cubic yard. With waste: (Cubic feet × 1.10) ÷ 27.
        </p>
        <h3>Bag equivalents and cost</h3>
        <p>
          <strong>Bags = ⌈ Volume ÷ bag yield ⌉</strong> — 0.60 cu ft for an
          80 lb bag, 0.45 for 60 lb, 0.30 for 40 lb.{" "}
          <strong>Cost = Cubic yards × your price per yard</strong> — an
          estimate; delivery and short-load fees aren&apos;t included.
        </p>

        <h2>Frequently asked questions</h2>
        {FAQ_ITEMS.map((f) => (
          <div key={f.q} className="mb-6">
            <h3 className="!mt-6">{f.q}</h3>
            <p>{f.a}</p>
          </div>
        ))}

        <h2>Before you call the batch plant</h2>
        <p>
          Plants schedule trucks by the day and usually quote in whole or
          quarter-yard increments, with minimum orders and short-load fees that
          vary by location. Have your calculated volume (plus 5–10% overage)
          ready, ask for the price per yard <em>and</em> the delivery fees, and
          confirm the pour date when you book. For anything under about a yard,
          bagged premix from the home center is usually the simpler path — no
          truck, no scheduling, no minimums.
        </p>
      </div>
    </article>
  );
}
