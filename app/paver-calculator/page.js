import Link from "next/link";
import PaverCalculator from "@/components/PaverCalculator";
import AdSlot from "@/components/AdSlot";
import JsonLd from "@/components/JsonLd";
import AuthorByline from "@/components/AuthorByline";
import TableOfContents from "@/components/TableOfContents";
import RelatedCalculators from "@/components/RelatedCalculators";
import { SITE_URL, SITE_NAME } from "@/lib/siteConfig";

export const metadata = {
  title: "Paver Calculator: How Many Pavers, Gravel & Sand Do I Need?",
  description:
    "Free paver calculator: enter your patio size, paver dimensions, and laying pattern to get paver counts with typical waste, plus gravel base and bedding sand tonnage estimates.",
  alternates: {
    canonical: `${SITE_URL}/paver-calculator`,
  },
  openGraph: {
    title: "Paver Calculator: How Many Pavers, Gravel & Sand Do I Need?",
    description:
      "Paver counts with pattern waste, gravel base tons, bedding sand, and polymeric sand bags — plus a worked example and coverage chart.",
    url: `${SITE_URL}/paver-calculator`,
    type: "article",
  },
};

const PAGE_URL = `${SITE_URL}/paver-calculator`;

const FAQ_ITEMS = [
  {
    q: "How many pavers do I need for a 10×10 patio?",
    a: "A 10×10 ft patio is 100 sq ft. With standard 4×8 in pavers (0.2222 sq ft each), that's 450 pavers before waste — 495 with the typical 10% running-bond allowance.",
  },
  {
    q: "How much waste should I plan for with different paver patterns?",
    a: "As typical guidance: about 5% for stack bond (grid, few cuts), 10% for running bond (offset, the most common), and 15% for herringbone (zigzag, most cuts). Curves and border cuts push all of these higher.",
  },
  {
    q: "How deep should the gravel base be under pavers?",
    a: "4 inches of compacted crushed stone is standard for patios and walkways; use 6 inches for driveways. Deeper bases handle heavier loads and freeze-thaw movement better.",
  },
  {
    q: "How much sand goes under pavers?",
    a: "A 1-inch layer of coarse bedding sand over the compacted gravel base. It's screeded flat — not compacted — then the pavers are set and vibrated into it.",
  },
  {
    q: "How many tons of gravel do I need per 100 sq ft of patio?",
    a: "Using the rule of thumb that 1 ton covers about 100 sq ft at 2 inches deep, a 100 sq ft patio at a 4-inch base depth needs about 2 tons of gravel — but this is an estimate, since bulk density varies by supplier and moisture.",
  },
  {
    q: "How much polymeric sand do I need for my paver joints?",
    a: "Roughly one 50-lb bag per 80 sq ft of pavers is a common rule of thumb — an estimate that varies with joint width and paver size. The calculator above rounds the count up for your area.",
  },
  {
    q: "Can I lay pavers directly on dirt or existing concrete?",
    a: "Not directly on dirt — without a compacted gravel base and bedding sand, pavers settle unevenly within a season or two. Laying over an existing concrete slab is possible with edge restraints and good drainage, but that changes the whole build-up; treat it as guidance and check local best practice.",
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
      name: "Paver Calculator",
      item: PAGE_URL,
    },
  ],
};

const TOC_ITEMS = [
    { id: "calculator", label: "Calculator" },
    { id: "worked-example", label: "Worked example" },
    { id: "coverage-chart", label: "Coverage chart" },
    { id: "formulas", label: "Formulas" },
    { id: "faqs", label: "FAQs" }
];

const RELATED_ITEMS = [
    {
      href: "/gravel-calculator",
      title: "Gravel Calculator",
      desc: "Tonnage for the compacted gravel base under pavers.",
    },
    {
      href: "/sand-calculator",
      title: "Sand Calculator",
      desc: "Bedding and joint sand quantities for paver beds.",
    },
    {
      href: "/concrete-bags-calculator",
      title: "Concrete Bags Calculator",
      desc: "Concrete for edge restraints and paver borders.",
    }
];

export default function PaverCalculatorPage() {
  return (
    <article className="mx-auto max-w-content px-4 py-10 sm:px-6">
      <JsonLd data={faqJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <nav aria-label="Breadcrumb" className="mb-4 text-sm text-slate-500">
        <Link href="/">Home</Link> <span aria-hidden="true">›</span>{" "}
        <span aria-current="page">Paver Calculator</span>
      </nav>

      <p className="eyebrow">Free calculator</p>
      <h1 className="max-w-3xl text-3xl sm:text-4xl">
        Paver Calculator: How Many Pavers, Gravel &amp; Sand Do I Need?
      </h1>
      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-600">
        A paver project is four purchases, not one: the pavers themselves, the
        crushed-stone base, a one-inch sand bed, and polymeric sand for the
        joints. Enter your patio dimensions, paver size, and laying pattern
        below and this tool figures all four — pavers rounded up with typical
        pattern waste, and base/sand tonnages labeled as estimates. No
        sign-up: the math runs entirely in your browser, and your inputs never leave your device.
      </p>

      <div className="mt-4">
        <AuthorByline />
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_260px]">
        <div className="min-w-0">
          <PaverCalculator />

          <AdSlot label="Advertisement" className="my-8 h-28" />

          <div className="prose-hmb mt-12 max-w-3xl">
        <h2 id="worked-example">Worked example: 12×10 ft patio, 4×8 in pavers, running bond</h2>
        <p>
          The classic backyard patio. Here is the full arithmetic, step by
          step:
        </p>
        <ol>
          <li>
            <strong>Area:</strong> 12 ft × 10 ft = <strong>120 sq ft</strong>
          </li>
          <li>
            <strong>One paver:</strong> 8″ × 4″ ÷ 144 ={" "}
            <strong>0.2222 sq ft</strong>
          </li>
          <li>
            <strong>Raw count:</strong> 120 ÷ 0.2222 = <strong>540 pavers</strong>
          </li>
          <li>
            <strong>With 10% waste</strong> (running bond, typical): 540 ×
            1.10 = 594 → <strong>594 pavers</strong>
          </li>
          <li>
            <strong>Gravel base (4″):</strong> 120 ÷ 100 × (4 ÷ 2) ={" "}
            <strong>2.4 tons</strong> — estimate
          </li>
          <li>
            <strong>Bedding sand:</strong> 120 × (1″ ÷ 12) = 10 cu ft = 0.37
            cu yd; 0.37 × 1.4 = <strong>0.52 tons</strong> — estimate
          </li>
          <li>
            <strong>Polymeric sand:</strong> 120 ÷ 80 = 1.5 → round up ={" "}
            <strong>2 fifty-lb bags</strong> — estimate
          </li>
        </ol>

        <h2 id="coverage-chart">Paver coverage chart</h2>
        <p>
          Pavers needed per 100 sq ft <em>before</em> waste — add your
          pattern&apos;s allowance on top:
        </p>
        <table>
          <thead>
            <tr>
              <th>Paver size</th>
              <th>Area per paver</th>
              <th>Pavers per 100 sq ft</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>4″ × 8″</td>
              <td>0.222 sq ft</td>
              <td>450</td>
            </tr>
            <tr>
              <td>6″ × 6″</td>
              <td>0.25 sq ft</td>
              <td>400</td>
            </tr>
            <tr>
              <td>6″ × 9″</td>
              <td>0.375 sq ft</td>
              <td>267</td>
            </tr>
            <tr>
              <td>8″ × 8″</td>
              <td>0.444 sq ft</td>
              <td>225</td>
            </tr>
            <tr>
              <td>12″ × 12″</td>
              <td>1.0 sq ft</td>
              <td>100</td>
            </tr>
          </tbody>
        </table>

        <h2 id="common-projects">Materials for common projects</h2>
        <p>
          Using 4×8 in pavers, running bond (10% waste), and a 4-inch base.
          Gravel and sand figures are estimates:
        </p>
        <table>
          <thead>
            <tr>
              <th>Project</th>
              <th>Pavers</th>
              <th>Gravel</th>
              <th>Bedding sand</th>
              <th>Poly sand</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>10×10 ft patio (100 sq ft)</td>
              <td>495</td>
              <td>2.0 tons</td>
              <td>0.5 tons</td>
              <td>2 bags</td>
            </tr>
            <tr>
              <td>12×16 ft patio (192 sq ft)</td>
              <td>951</td>
              <td>3.9 tons</td>
              <td>0.9 tons</td>
              <td>3 bags</td>
            </tr>
            <tr>
              <td>4×20 ft walkway (80 sq ft)</td>
              <td>396</td>
              <td>1.6 tons</td>
              <td>0.4 tons</td>
              <td>1 bag</td>
            </tr>
          </tbody>
        </table>

        <h2 id="formulas">The formulas</h2>
        <h3>Patio area</h3>
        <p>
          <strong>A = Length × Width</strong> (rectangle) or{" "}
          <strong>A = π × r²</strong> (circle) — all in feet.
        </p>
        <h3>Paver count</h3>
        <p>
          <strong>Pavers = ⌈ A ÷ ((paver L″ × paver W″) ÷ 144) ⌉</strong>{" "}
          with waste: ⌈ raw × 1.05 / 1.10 / 1.15 ⌉ for stack bond, running
          bond, or herringbone (typical figures).
        </p>
        <h3>Gravel base tonnage (estimate)</h3>
        <p>
          <strong>Tons = (A ÷ 100) × (base depth in inches ÷ 2)</strong> —
          from the rule that 1 ton covers roughly 100 sq ft at 2 inches deep.
          Bulk density varies by supplier and moisture, so treat this as a
          planning figure.
        </p>
        <h3>Bedding sand tonnage (estimate)</h3>
        <p>
          <strong>Tons = (A × 1″ ÷ 12) ÷ 27 × 1.4</strong> — the 1-inch sand
          bed in cubic yards, converted at roughly 1.4 tons per cubic yard.
        </p>
        <h3>Polymeric sand bags (estimate)</h3>
        <p>
          <strong>Bags = ⌈ A ÷ 80 ⌉</strong> — one 50-lb bag per 80 sq ft, a
          common rule of thumb that varies with joint width and paver size.
        </p>

        <h2 id="faqs">Frequently asked questions</h2>
        {FAQ_ITEMS.map((f) => (
          <div key={f.q} className="mb-6">
            <h3 className="!mt-6">{f.q}</h3>
            <p>{f.a}</p>
          </div>
        ))}

        <h2 id="base-depth">Base depth: patios vs. driveways</h2>
        <p>
          The base is what keeps pavers from heaving and settling — most paver
          failures are base failures, not paver failures. Four inches of
          compacted crushed stone suits patios and walkways; step up to six
          inches where cars park or turn. Compact the base in two-inch lifts
          with a plate compactor rather than dumping all the stone at once. The one-inch sand
          bed goes on top of the compacted base, is screeded flat, and is{" "}
          <em>not</em> compacted before the pavers go down.
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
