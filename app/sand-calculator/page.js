import Link from "next/link";
import SandCalculator from "@/components/SandCalculator";
import AdSlot from "@/components/AdSlot";
import JsonLd from "@/components/JsonLd";
import AuthorByline from "@/components/AuthorByline";
import TableOfContents from "@/components/TableOfContents";
import RelatedCalculators from "@/components/RelatedCalculators";
import { SITE_URL, SITE_NAME } from "@/lib/siteConfig";

export const metadata = {
  title: "Sand Calculator: How Much Sand Do I Need (Tons & Cubic Yards)",
  description:
    "Free sand calculator: enter your area and depth to get tons, cubic yards, and bag counts — with a waste allowance and a worked paver-bedding example.",
  alternates: {
    canonical: `${SITE_URL}/sand-calculator`,
  },
  openGraph: {
    title: "Sand Calculator: How Much Sand Do I Need",
    description:
      "Tons, cubic yards, and bag counts for paver bedding, bases, and fill — with a coverage-per-ton chart.",
    url: `${SITE_URL}/sand-calculator`,
    type: "article",
  },
};

const PAGE_URL = `${SITE_URL}/sand-calculator`;

const FAQ_ITEMS = [
  {
    q: "How many tons of sand are in a cubic yard?",
    a: "As an estimate, one cubic yard of dry sand weighs about 1.3–1.4 tons (2,600–2,800 lb). The exact figure varies with sand type (mason, concrete, play) and moisture — wet sand can weigh noticeably more, which is why this calculator shows a range.",
  },
  {
    q: "How much sand do I need for a 12×10 ft paver patio with 1″ of bedding?",
    a: "12 × 10 × (1 ÷ 12) = 10 cu ft; with a 10% allowance that's 11 cu ft = 0.41 cu yd. At 1.3–1.4 tons per yard, that's 0.53–0.57 tons — order 1 ton bulk (the practical minimum), or 22 half-cubic-foot bags.",
  },
  {
    q: "What kind of sand goes under pavers?",
    a: "Coarse concrete sand or mason sand — the angular grains compact and lock together. Play sand is too fine and rounded for bedding; it shifts under load. Check what your local yard stocks as “paver bedding sand.”",
  },
  {
    q: "How deep should paver bedding sand be?",
    a: "About 1 inch, screeded level. The sand is a setting bed, not the structural base — that job belongs to 4+ inches of compacted gravel underneath. More than an inch of sand invites settling and wavy pavers.",
  },
  {
    q: "What's the difference between mason sand and concrete sand?",
    a: "Mostly regional naming. Both are coarse, washed sands that work for bedding and mixing. Bag labels vary by market — what matters is that it's coarse and angular, not fine play sand.",
  },
  {
    q: "Can I use sand instead of gravel for a shed base?",
    a: "Not as the whole base. Sand shifts and holds water; a compacted gravel base drains and stays put. A thin sand layer over gravel is fine for leveling, but the gravel does the structural work.",
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
    { "@type": "ListItem", position: 2, name: "Sand Calculator", item: PAGE_URL },
  ],
};

const TOC_ITEMS = [
  { id: "worked-example", label: "Worked example" },
  { id: "coverage-chart", label: "Coverage per ton chart" },
  { id: "formulas", label: "The formulas" },
  { id: "faqs", label: "Frequently asked questions" },
];

export default function SandCalculatorPage() {
  return (
    <article className="mx-auto max-w-content px-4 py-10 sm:px-6">
      <JsonLd data={faqJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <nav aria-label="Breadcrumb" className="mb-4 text-sm text-slate-500">
        <Link href="/">Home</Link> <span aria-hidden="true">›</span>{" "}
        <span aria-current="page">Sand Calculator</span>
      </nav>

      <p className="eyebrow">Free calculator</p>
      <h1 className="mt-2 max-w-3xl text-3xl sm:text-4xl">
        Sand Calculator: How Much Sand Do I Need?
      </h1>
      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-600">
        Sand is sold by the ton, bagged by the cubic foot, and your project
        is measured in feet and inches. Enter your area and depth for an
        estimated tonnage range, cubic yards, and bag counts — with a waste
        allowance for spreading and compaction. No sign-up; the math runs
        entirely in your browser.
      </p>
      <div className="mt-4">
        <AuthorByline />
      </div>

      <div className="mt-8">
        <SandCalculator />
      </div>

      <AdSlot label="Advertisement" className="my-8 h-28" />

      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <TableOfContents items={TOC_ITEMS} />
          </div>
        </aside>

        <div className="prose-hmb max-w-3xl">
          <h2 id="worked-example">Worked example: 12×10 ft patio, 1″ bedding</h2>
          <p>Full arithmetic, step by step:</p>
          <ol>
            <li>
              <strong>Area:</strong> 12 ft × 10 ft = <strong>120 sq ft</strong>
            </li>
            <li>
              <strong>Volume:</strong> 120 × (1 ÷ 12) = <strong>10 cu ft</strong>
            </li>
            <li>
              <strong>With 10% allowance:</strong> 11 cu ft ÷ 27 ={" "}
              <strong>0.41 cu yd</strong>
            </li>
            <li>
              <strong>Weight estimate:</strong> 0.41 × 1.3–1.4 ={" "}
              <strong>0.53–0.57 tons</strong>
            </li>
            <li>
              <strong>Order:</strong> round the high end up →{" "}
              <strong>1 ton</strong> bulk (practical minimum), or 11 ÷ 0.5 ={" "}
              <strong>22 bags</strong>
            </li>
          </ol>

          <h2 id="coverage-chart">Coverage chart: what one ton covers</h2>
          <p>
            Approximate square feet covered by one ton of dry sand at each
            depth (mid-range density — varies by type and moisture):
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
                <td>1″</td>
                <td>≈ 240 sq ft</td>
              </tr>
              <tr>
                <td>2″</td>
                <td>≈ 120 sq ft</td>
              </tr>
              <tr>
                <td>4″</td>
                <td>≈ 60 sq ft</td>
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
            <strong>cu yd = V ÷ 27</strong> (exact).
          </p>
          <h3>Weight (estimate)</h3>
          <p>
            <strong>Tons = cu yd × 1.3–1.4</strong> — a range, because sand
            type and moisture move the number. Wet sand weighs noticeably
            more than dry.
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
            href: "/gravel-calculator",
            title: "Gravel Calculator",
            desc: "Tons and cubic yards of crushed stone for bases.",
          },
          {
            href: "/paver-calculator",
            title: "Paver Calculator",
            desc: "Paver counts plus base gravel and bedding sand.",
          },
          {
            href: "/concrete-bags-calculator",
            title: "Concrete Bags Calculator",
            desc: "Bag counts for slabs, footings, and posts.",
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
