import Link from "next/link";
import RoofShinglesCalculator from "@/components/RoofShinglesCalculator";
import AdSlot from "@/components/AdSlot";
import JsonLd from "@/components/JsonLd";
import AuthorByline from "@/components/AuthorByline";
import TableOfContents from "@/components/TableOfContents";
import RelatedCalculators from "@/components/RelatedCalculators";
import { SITE_URL, SITE_NAME } from "@/lib/siteConfig";

export const metadata = {
  title: "Roof Shingle Calculator: Bundles, Squares & Waste",
  description:
    "Free roof shingle calculator: bundles and roofing squares from footprint and pitch — with waste factors, underlayment rolls, and cost estimates.",
  alternates: {
    canonical: `${SITE_URL}/roof-shingles-calculator`,
  },
  openGraph: {
    title: "Roof Shingle Calculator: Bundles, Squares & Waste",
    description:
      "How many bundles of shingles? Squares, pitch factor, and bundle counts.",
    url: `${SITE_URL}/roof-shingles-calculator`,
    type: "article",
  },
};

const PAGE_URL = `${SITE_URL}/roof-shingles-calculator`;

const FAQ_ITEMS = [
  {
    q: "How many bundles of shingles do I need?",
    a: "For standard 3-tab or architectural shingles: squares x 3 bundles, plus 10-20% waste, rounded up. A 14.76-square roof needs 45 bundles. Premium designer shingles run 4 bundles per square — check your wrapper and adjust.",
  },
  {
    q: "How many bundles of shingles are in a square?",
    a: "Three, for standard shingles. A roofing square is 100 sq ft of finished roof, and a bundle of 3-tab or architectural shingles covers ~33.3 sq ft. Heavy designer lines take 4-5 bundles per square.",
  },
  {
    q: "How does roof pitch change how many shingles I need?",
    a: "A steeper roof has more surface than its footprint. The pitch factor is sqrt(rise^2 + 12^2) / 12: 1.118 at 6/12 (11.8% more), 1.414 at 12/12 (41% more). The calculator applies it automatically from your x-in-12 pitch.",
  },
  {
    q: "What waste factor should I use for shingles?",
    a: "10% for simple gable roofs, 15% for hip or complex roofs, 20%+ for cut-up roofs with many valleys and dormers. First-time DIY installers should add another 5% for the learning curve.",
  },
  {
    q: "How many shingles are in a bundle?",
    a: "About 26-29 per bundle for 3-tab and 21-25 for architectural shingles; 3 bundles cover one square. The count that matters is the coverage printed on the wrapper — if it says 25 sq ft per bundle, you need 4 per square.",
  },
  {
    q: "What is the minimum roof pitch for asphalt shingles?",
    a: "4/12 for standard application. Between 2/12 and 4/12 needs special low-slope methods with full ice-and-water underlayment. Below 2/12, shingles aren't recommended — use rolled roofing or a membrane instead.",
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
    { "@type": "ListItem", position: 2, name: "Roof Shingle Calculator", item: PAGE_URL },
  ],
};

const TOC_ITEMS = [
  { id: "worked-example", label: "Worked example" },
  { id: "formulas", label: "The formulas" },
  { id: "faqs", label: "Frequently asked questions" },
];

export default function RoofShinglesCalculatorPage() {
  return (
    <article className="mx-auto max-w-content px-4 py-10 sm:px-6">
      <JsonLd data={faqJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <nav aria-label="Breadcrumb" className="mb-4 text-sm text-slate-500">
        <Link href="/">Home</Link> <span aria-hidden="true">›</span>{" "}
        <span aria-current="page">Roof Shingle Calculator</span>
      </nav>

      <p className="eyebrow">Free calculator</p>
      <h1 className="mt-2 max-w-3xl text-3xl sm:text-4xl">
        Roof Shingle Calculator: Bundles, Squares & Waste
      </h1>
      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-600">
        Bundles and roofing squares from footprint and pitch — with waste
        factors, underlayment rolls, and cost estimates. No sign-up; the math
        runs entirely in your browser.
      </p>
      <div className="mt-4">
        <AuthorByline />
      </div>

      <div className="mt-8">
        <RoofShinglesCalculator />
      </div>

      <AdSlot label="Advertisement" className="my-8 h-28" />

      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <TableOfContents items={TOC_ITEMS} />
          </div>
        </aside>

        <div className="prose-hmb max-w-3xl">
          <h2 id="worked-example">Worked example: 40×30 ft house, 6/12 pitch</h2>
          <p>Full arithmetic, step by step (gable roof, 10% waste):</p>
          <ol>
            <li>
              <strong>Footprint:</strong> 40 × 30 = <strong>1,200 sq ft</strong>
            </li>
            <li>
              <strong>Pitch factor:</strong> sqrt(36 + 144) / 12 ={" "}
              <strong>1.118</strong>
            </li>
            <li>
              <strong>Roof area:</strong> 1,200 × 1.118 ={" "}
              <strong>1,341.6 sq ft</strong>
            </li>
            <li>
              <strong>With waste:</strong> 1,341.6 × 1.10 ={" "}
              <strong>1,475.8 sq ft = 14.76 squares</strong>
            </li>
            <li>
              <strong>Bundles:</strong> 14.76 × 3 = 44.27 →{" "}
              <strong>45 bundles</strong>
            </li>
          </ol>

          <h2 id="formulas">The formulas</h2>
          <h3>Squares</h3>
          <p>
            <strong>
              Squares = footprint × sqrt(pitch² + 144) / 12 × (1 + waste) / 100
            </strong>{" "}
            — the pitch factor converts flat footprint to sloped area.
          </p>
          <h3>Bundles</h3>
          <p>
            <strong>Bundles = ceil(squares × bundles per square)</strong> — 3
            for standard, 4 for premium; always check the wrapper.
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
            href: "/roof-pitch-calculator",
            title: "Roof Pitch Calculator",
            desc: "Find your x-in-12 pitch first, then come back.",
          },
          {
            href: "/siding-calculator",
            title: "Siding Calculator",
            desc: "Walls to go with the new roof.",
          },
          {
            href: "/lumber-calculator",
            title: "Lumber Calculator",
            desc: "Rafters and ridge boards under the shingles.",
          },
        ]}
      />
    </article>
  );
}
