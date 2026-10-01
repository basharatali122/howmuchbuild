import Link from "next/link";
import GravelCalculator from "@/components/GravelCalculator";
import AdSlot from "@/components/AdSlot";
import JsonLd from "@/components/JsonLd";
import AuthorByline from "@/components/AuthorByline";
import TableOfContents from "@/components/TableOfContents";
import RelatedCalculators from "@/components/RelatedCalculators";
import { SITE_URL, SITE_NAME } from "@/lib/siteConfig";

export const metadata = {
  title: "Gravel Calculator: How Much Gravel Do I Need (Tons & Cubic Yards)",
  description:
    "Free gravel calculator: enter your driveway or bed dimensions and get tons, cubic yards, and bag counts — with a compaction allowance and a worked 12×10 ft example.",
  alternates: {
    canonical: `${SITE_URL}/gravel-calculator`,
  },
  openGraph: {
    title: "Gravel Calculator: How Much Gravel Do I Need",
    description:
      "Tons, cubic yards, and bag counts for driveways, patios, and beds — with a coverage-per-ton chart.",
    url: `${SITE_URL}/gravel-calculator`,
    type: "article",
  },
};

const PAGE_URL = `${SITE_URL}/gravel-calculator`;

const FAQ_ITEMS = [
  {
    q: "How many tons of gravel are in a cubic yard?",
    a: "As an estimate, one cubic yard of crushed gravel weighs about 1.4–1.5 tons (2,800–3,000 lb). The exact figure varies with stone type, aggregate size, and moisture — which is why this calculator shows a range rather than a single number.",
  },
  {
    q: "How much gravel do I need for a 12×10 ft area, 4 inches deep?",
    a: "12 × 10 × (4 ÷ 12) = 40 cu ft; with a 10% compaction allowance that's 44 cu ft = 1.63 cu yd. At 1.4–1.5 tons per yard, that's 2.28–2.44 tons — order 2.5 tons bulk, or 88 half-cubic-foot bags.",
  },
  {
    q: "Is gravel sold by the ton or the cubic yard?",
    a: "Both, depending on the supplier. Bulk yards and landscape suppliers usually sell crushed stone by the ton; some sell by the cubic yard. Bags are sold by volume (commonly 0.5 cu ft). If your supplier quotes yards, use the cubic-yard figure from the calculator.",
  },
  {
    q: "How deep should gravel be for a driveway?",
    a: "As a rule of thumb (guidance): about 4 inches of compacted gravel over a prepared, compacted subgrade is common for residential driveways. Walkways and landscape beds are often fine at 2–3 inches. Deeper isn't automatically better — compaction matters more than thickness.",
  },
  {
    q: "Crushed stone or pea gravel for a driveway?",
    a: "Crushed stone (guidance). Its angular edges lock together under compaction, so it stays put under tires. Pea gravel is rounded and shifts — it's better suited to landscape beds and paths where you want a softer look.",
  },
  {
    q: "Do I need landscape fabric under gravel?",
    a: "It helps in beds (guidance): fabric slows weeds and keeps gravel from sinking into soil. Under driveways it's debated — fabric can clog and trap water over time. A well-compacted subgrade matters more than fabric in either case.",
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
    { "@type": "ListItem", position: 2, name: "Gravel Calculator", item: PAGE_URL },
  ],
};

const TOC_ITEMS = [
  { id: "worked-example", label: "Worked example" },
  { id: "coverage-chart", label: "Coverage per ton chart" },
  { id: "formulas", label: "The formulas" },
  { id: "faqs", label: "Frequently asked questions" },
];

export default function GravelCalculatorPage() {
  return (
    <article className="mx-auto max-w-content px-4 py-10 sm:px-6">
      <JsonLd data={faqJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <nav aria-label="Breadcrumb" className="mb-4 text-sm text-slate-500">
        <Link href="/">Home</Link> <span aria-hidden="true">›</span>{" "}
        <span aria-current="page">Gravel Calculator</span>
      </nav>

      <p className="eyebrow">Free calculator</p>
      <h1 className="mt-2 max-w-3xl text-3xl sm:text-4xl">
        Gravel Calculator: How Much Gravel Do I Need?
      </h1>
      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-600">
        Gravel is sold by the ton, priced by the yard, and your project is
        measured in feet — this tool converts between all three. Enter your
        area and depth to get an estimated tonnage range, cubic yards, and
        bag counts, with a compaction and waste allowance built in. No
        sign-up; the math runs entirely in your browser.
      </p>
      <div className="mt-4">
        <AuthorByline />
      </div>

      <div className="mt-8">
        <GravelCalculator />
      </div>

      <AdSlot label="Advertisement" className="my-8 h-28" />

      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <TableOfContents items={TOC_ITEMS} />
          </div>
        </aside>

        <div className="prose-hmb max-w-3xl">
          <h2 id="worked-example">Worked example: 12×10 ft pad, 4″ deep</h2>
          <p>Full arithmetic, step by step (matches the calculator defaults):</p>
          <ol>
            <li>
              <strong>Area:</strong> 12 ft × 10 ft = <strong>120 sq ft</strong>
            </li>
            <li>
              <strong>Volume:</strong> 120 × (4 ÷ 12) = <strong>40 cu ft</strong>
            </li>
            <li>
              <strong>With 10% allowance:</strong> 44 cu ft ÷ 27 ={" "}
              <strong>1.63 cu yd</strong>
            </li>
            <li>
              <strong>Weight estimate:</strong> 1.63 × 1.4–1.5 ={" "}
              <strong>2.28–2.44 tons</strong>
            </li>
            <li>
              <strong>Order:</strong> round the high end up to the nearest
              half ton → <strong>2.5 tons</strong> bulk, or 44 ÷ 0.5 ={" "}
              <strong>88 bags</strong>
            </li>
          </ol>

          <h2 id="coverage-chart">Coverage chart: what one ton covers</h2>
          <p>
            Approximate square feet covered by one ton of crushed gravel at
            each depth (based on mid-range density — varies by stone):
          </p>
          <table>
            <thead>
              <tr>
                <th>Depth</th>
                <th>Area per ton (approx.)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>2″</td>
                <td>≈ 110 sq ft</td>
              </tr>
              <tr>
                <td>4″</td>
                <td>≈ 55 sq ft</td>
              </tr>
              <tr>
                <td>6″</td>
                <td>≈ 37 sq ft</td>
              </tr>
            </tbody>
          </table>

          <h2 id="formulas">The formulas</h2>
          <h3>Area</h3>
          <p>
            <strong>Rectangle: A = L × W</strong> · <strong>Circle: A = πr²</strong> —
            all in feet.
          </p>
          <h3>Volume</h3>
          <p>
            <strong>V = A × (depth in inches ÷ 12)</strong>, then{" "}
            <strong>cu yd = V ÷ 27</strong> (exact — one cubic yard is 27
            cubic feet).
          </p>
          <h3>Weight (estimate)</h3>
          <p>
            <strong>Tons = cu yd × 1.4–1.5</strong> — a range, because stone
            type, aggregate size, and moisture all move the number. Order
            quantity rounds the high end up to the nearest half ton.
          </p>
          <h3>Bags</h3>
          <p>
            <strong>Bags = ⌈ cu ft ÷ 0.5 ⌉</strong> — exact arithmetic for
            standard half-cubic-foot bags, always rounded up.
          </p>

          <h2 id="faqs">Frequently asked questions</h2>
          {FAQ_ITEMS.map((f) => (
            <div key={f.q} className="mb-6">
              <h3 className="!mt-6">{f.q}</h3>
              <p>{f.a}</p>
            </div>
          ))}
        </div>
      </div>

      <RelatedCalculators
        items={[
          {
            href: "/sand-calculator",
            title: "Sand Calculator",
            desc: "Tons and cubic yards of sand for bedding and fill.",
          },
          {
            href: "/paver-calculator",
            title: "Paver Calculator",
            desc: "Pavers plus the base gravel and bedding sand under them.",
          },
          {
            href: "/concrete-calculator",
            title: "Concrete Calculator",
            desc: "Cubic yards and bag counts for slabs and footings.",
          },
          {
            href: "/topsoil-calculator",
            title: "Topsoil Calculator",
            desc: "Cubic yards and bags for beds and grading.",
          },
        ]}
      />
    </article>
  );
}
