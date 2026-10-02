import Link from "next/link";
import AsphaltCalculator from "@/components/AsphaltCalculator";
import AdSlot from "@/components/AdSlot";
import JsonLd from "@/components/JsonLd";
import AuthorByline from "@/components/AuthorByline";
import TableOfContents from "@/components/TableOfContents";
import RelatedCalculators from "@/components/RelatedCalculators";
import { SITE_URL, SITE_NAME } from "@/lib/siteConfig";

export const metadata = {
  title: "Asphalt Calculator: How Much Asphalt Do I Need? (Free)",
  description:
    "Free asphalt calculator: tons, cubic yards, and weight for driveways and patches from length, width, and thickness — with waste allowance and step-by-step math.",
  alternates: {
    canonical: `${SITE_URL}/asphalt-calculator`,
  },
  openGraph: {
    title: "Asphalt Calculator: How Much Asphalt Do I Need? (Free)",
    description:
      "Enter driveway dimensions and get tons, cubic yards, and estimated weight — with the full arithmetic shown.",
    url: `${SITE_URL}/asphalt-calculator`,
    type: "article",
  },
};

const PAGE_URL = `${SITE_URL}/asphalt-calculator`;

const FAQ_ITEMS = [
  {
    q: "How many tons of asphalt are in a cubic yard?",
    a: "About 1.96 tons. A cubic yard is 27 cubic feet, and compacted hot-mix asphalt weighs roughly 145 lb per cubic foot: 27 × 145 ÷ 2,000 = 1.96 tons. Density varies by mix design, so treat this as a typical figure, not a guarantee.",
  },
  {
    q: "How thick should a residential asphalt driveway be?",
    a: "2 to 3 inches of asphalt over 4 to 6 inches of compacted gravel base is typical for a residential driveway. Heavier vehicles (RVs, work trucks) call for a thicker section. The base matters as much as the asphalt — a thin pour over a soft base fails fast.",
  },
  {
    q: "What is the difference between hot-mix asphalt and cold-patch bags?",
    a: "Hot-mix is the real driveway material: mixed hot at a plant, delivered by the ton, and compacted while warm — it's what this calculator estimates. Cold-patch bags (typically 50 lb) are a temporary repair product for potholes and small patches, not for paving a driveway.",
  },
  {
    q: "How much does asphalt weigh per cubic foot?",
    a: "Compacted hot-mix asphalt typically weighs about 145 lb per cubic foot. This calculator uses that figure to estimate total weight and tonnage. Loose or uncompacted mix weighs less; the plant's specific mix design governs the real number.",
  },
  {
    q: "Can I pave asphalt over my existing driveway?",
    a: "Often, yes — a 1.5 to 2-inch overlay over a sound existing driveway is a common, cheaper alternative to full replacement. But if the old pavement is crumbling, heaving, or has drainage problems, an overlay just inherits them. Have a paver look before you decide.",
  },
  {
    q: "Why does the calculator round up to the nearest half ton?",
    a: "Plants and pavers sell by the ton, not by the pound — and running short mid-pave means a cold joint or a second delivery fee. Rounding up to the nearest half ton plus a 5% waste allowance keeps small jobs covered.",
  },
  {
    q: "How much asphalt do I need for a 2-car driveway?",
    a: "A typical 2-car driveway (about 20×20 ft) at 2.5 inches thick needs roughly 83 cubic feet — about 1.9 cubic yards or 6.5 tons with a 5% waste allowance, rounded up. Enter your exact dimensions above for your number.",
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
      name: "Asphalt Calculator",
      item: PAGE_URL,
    },
  ],
};

const TOC_ITEMS = [
  { id: "calculator", label: "Calculator" },
  { id: "worked-example", label: "Worked example" },
  { id: "tons-reference", label: "Tons reference" },
  { id: "formulas", label: "Formulas" },
  { id: "faqs", label: "FAQs" },
];

const RELATED_ITEMS = [
  {
    href: "/gravel-calculator",
    title: "Gravel Calculator",
    desc: "Base gravel tonnage under the asphalt.",
  },
  {
    href: "/paver-calculator",
    title: "Paver Calculator",
    desc: "Comparing pavers as a driveway alternative?",
  },
  {
    href: "/concrete-calculator",
    title: "Concrete Calculator",
    desc: "Cubic yards if you're weighing a concrete driveway.",
  },
];

export default function AsphaltCalculatorPage() {
  return (
    <article className="mx-auto max-w-content px-4 py-10 sm:px-6">
      <JsonLd data={faqJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <nav aria-label="Breadcrumb" className="mb-4 text-sm text-slate-500">
        <Link href="/">Home</Link> <span aria-hidden="true">›</span>{" "}
        <span aria-current="page">Asphalt Calculator</span>
      </nav>

      <p className="eyebrow">Free calculator</p>
      <h1 className="max-w-3xl text-3xl sm:text-4xl">
        Asphalt Calculator: How Much Asphalt Do I Need?
      </h1>
      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-600">
        Enter your driveway or patch dimensions and get tons, cubic yards,
        and estimated weight of hot-mix asphalt — with a waste allowance and
        every step of the arithmetic shown. The math runs entirely in your
        browser.
      </p>

      <div className="mt-4">
        <AuthorByline />
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_260px]">
        <div className="min-w-0">
          <AsphaltCalculator />

          <AdSlot label="Advertisement" className="my-8 h-28" />

          <div className="prose-hmb mt-12 max-w-3xl">
            <h2 id="worked-example">
              Worked example: 20×12 ft driveway, 2.5″ thick, 5% waste
            </h2>
            <p>
              A single-car driveway, 20 feet long and 12 feet wide, paved
              2.5 inches thick. Step by step:
            </p>
            <ol>
              <li>
                <strong>Volume:</strong> 20 ft × 12 ft × (2.5″ ÷ 12) ={" "}
                <strong>50.0 cu ft</strong>
              </li>
              <li>
                <strong>Cubic yards:</strong> 50.0 ÷ 27 ={" "}
                <strong>1.85 cu yd</strong>
              </li>
              <li>
                <strong>Weight:</strong> 50.0 cu ft × 145 lb/cu ft (typical) ={" "}
                <strong>7,250 lb</strong>
              </li>
              <li>
                <strong>Tons:</strong> 7,250 ÷ 2,000 × 1.05 (waste) = 3.81 →
                round up to <strong>4.0 tons</strong>
              </li>
            </ol>

            <h2 id="tons-reference">
              Tons reference (2.5″ thick, 5% waste, rounded up)
            </h2>
            <p>
              Quick estimates for common driveway sizes — measure your own
              for the real number:
            </p>
            <table>
              <thead>
                <tr>
                  <th>Driveway size</th>
                  <th>Cubic yards</th>
                  <th>Tons (est.)</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>10 × 20 ft</td><td>1.54</td><td>3.5</td></tr>
                <tr><td>12 × 24 ft</td><td>2.22</td><td>5.0</td></tr>
                <tr><td>20 × 20 ft</td><td>3.09</td><td>6.5</td></tr>
                <tr><td>24 × 24 ft</td><td>4.44</td><td>9.5</td></tr>
              </tbody>
            </table>

            <h2 id="formulas">The formulas</h2>
            <h3>Volume</h3>
            <p>
              <strong>Cubic feet = length × width × (thickness ÷ 12)</strong> —
              thickness in inches becomes feet before multiplying.{" "}
              <strong>Cubic yards = cubic feet ÷ 27.</strong>
            </p>
            <h3>Weight and tons</h3>
            <p>
              <strong>Pounds ≈ cubic feet × 145</strong> — the typical
              compacted hot-mix density; your plant&apos;s mix may differ.{" "}
              <strong>Tons = pounds ÷ 2,000 × (1 + waste %)</strong>, then
              round <strong>up</strong> to the nearest half ton.
            </p>
            <h3>Tons per cubic yard</h3>
            <p>
              <strong>≈ 1.96 tons/cu yd</strong> — from 27 cu ft × 145 lb ÷
              2,000. Handy for converting a plant quote in yards to the tons
              you&apos;ll actually order.
            </p>

            <h2 id="faqs">Frequently asked questions</h2>
            {FAQ_ITEMS.map((f) => (
              <div key={f.q} className="mb-6">
                <h3 className="!mt-6">{f.q}</h3>
                <p>{f.a}</p>
              </div>
            ))}

            <h2 id="limitations">What this calculator doesn&apos;t cover</h2>
            <p>
              Ordering tons is the easy part; a driveway that lasts is mostly
              base prep, drainage, and compaction. This page doesn&apos;t
              estimate base gravel depth, edge restraints, apron tie-ins, or
              permits — and it can&apos;t see soft spots in your subgrade.
              For anything beyond a small patch, walk the job with a local
              paver before you order.
            </p>
          </div>
        </div>
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <TableOfContents items={TOC_ITEMS} />
          </div>
        </aside>
      </div>

      <RelatedCalculators items={RELATED_ITEMS} />
    </article>
  );
}
