import Link from "next/link";
import SidingCalculator from "@/components/SidingCalculator";
import AdSlot from "@/components/AdSlot";
import JsonLd from "@/components/JsonLd";
import AuthorByline from "@/components/AuthorByline";
import TableOfContents from "@/components/TableOfContents";
import RelatedCalculators from "@/components/RelatedCalculators";
import { SITE_URL, SITE_NAME } from "@/lib/siteConfig";

export const metadata = {
  title: "Siding Calculator: Squares, Boxes & Waste",
  description:
    "Free siding calculator: wall squares, gable ends, openings subtracted, and box counts — with waste allowance for vinyl, fiber cement, and wood siding.",
  alternates: {
    canonical: `${SITE_URL}/siding-calculator`,
  },
  openGraph: {
    title: "Siding Calculator: Squares, Boxes & Waste",
    description:
      "How many squares of siding? Walls, gables, openings, and box counts.",
    url: `${SITE_URL}/siding-calculator`,
    type: "article",
  },
};

const PAGE_URL = `${SITE_URL}/siding-calculator`;

const FAQ_ITEMS = [
  {
    q: "What is a square of siding?",
    a: "One square = 100 square feet of finished wall coverage. Siding is sold and priced by the square: a 1,400 sq ft wall area (with waste) is 14 squares. Vinyl and aluminum cartons typically cover about 200 sq ft (2 squares) each.",
  },
  {
    q: "How much siding do I need for a 2,000 sq ft house?",
    a: "It depends on wall area, not floor area. A typical 2,000 sq ft two-story might have ~2,800–3,200 sq ft of wall including gables, minus ~400 sq ft of openings, plus 10% waste — roughly 28–32 squares. Measure your own perimeter and height; the calculator does the rest.",
  },
  {
    q: "How much waste should I add for siding?",
    a: "10% for simple rectangular homes with vinyl or aluminum. Bump to 12–15% for fiber cement, wood, board-and-batten, or homes with many corners, gables, and angled cuts — installers can't run full boards across irregular shapes without scrap on both ends.",
  },
  {
    q: "Do you subtract windows and doors when calculating siding?",
    a: "Yes — measure the large openings and subtract their square footage. Small vents and fixtures aren't worth subtracting; the waste allowance absorbs them.",
  },
  {
    q: "How do you calculate siding for gable ends?",
    a: "Each triangular gable is (base × rise) ÷ 2. A 30-ft-wide gable rising 6 ft is 90 sq ft. Enter the count plus base and rise and the calculator adds them to your wall total automatically.",
  },
  {
    q: "How many boxes of vinyl siding do I need?",
    a: "Divide your total square footage (with waste) by the coverage per carton — typically ~200 sq ft for vinyl — and round up. 1,408 sq ft ÷ 200 = 7.04, so 8 boxes. Check your product's actual coverage; fiber cement boxes are often ~100 sq ft.",
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
    { "@type": "ListItem", position: 2, name: "Siding Calculator", item: PAGE_URL },
  ],
};

const TOC_ITEMS = [
  { id: "worked-example", label: "Worked example" },
  { id: "formulas", label: "The formulas" },
  { id: "faqs", label: "Frequently asked questions" },
];

export default function SidingCalculatorPage() {
  return (
    <article className="mx-auto max-w-content px-4 py-10 sm:px-6">
      <JsonLd data={faqJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <nav aria-label="Breadcrumb" className="mb-4 text-sm text-slate-500">
        <Link href="/">Home</Link> <span aria-hidden="true">›</span>{" "}
        <span aria-current="page">Siding Calculator</span>
      </nav>

      <p className="eyebrow">Free calculator</p>
      <h1 className="mt-2 max-w-3xl text-3xl sm:text-4xl">
        Siding Calculator: Squares, Boxes & Waste
      </h1>
      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-600">
        Wall squares, triangular gable ends, doors and windows subtracted, and
        box counts — with a waste allowance for vinyl, fiber cement, and wood
        siding. No sign-up; the math runs entirely in your browser.
      </p>
      <div className="mt-4">
        <AuthorByline />
      </div>

      <div className="mt-8">
        <SidingCalculator />
      </div>

      <AdSlot label="Advertisement" className="my-8 h-28" />

      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <TableOfContents items={TOC_ITEMS} />
          </div>
        </aside>

        <div className="prose-hmb max-w-3xl">
          <h2 id="worked-example">Worked example</h2>
          <p>
            Full arithmetic, step by step (140-ft perimeter, 10-ft walls, two
            30×6-ft gables, 300 sq ft of openings, 10% waste):
          </p>
          <ol>
            <li>
              <strong>Walls:</strong> 140 × 10 = <strong>1,400 sq ft</strong>
            </li>
            <li>
              <strong>Gables:</strong> 2 × (30 × 6 ÷ 2) ={" "}
              <strong>180 sq ft</strong>
            </li>
            <li>
              <strong>Net:</strong> 1,400 + 180 − 300 ={" "}
              <strong>1,280 sq ft</strong>
            </li>
            <li>
              <strong>With waste:</strong> 1,280 × 1.10 ={" "}
              <strong>1,408 sq ft</strong>
            </li>
            <li>
              <strong>Squares:</strong> 1,408 ÷ 100 = 14.08 →{" "}
              <strong>15 squares</strong>; boxes: 1,408 ÷ 200 = 7.04 →{" "}
              <strong>8 boxes</strong>
            </li>
          </ol>

          <h2 id="formulas">The formulas</h2>
          <h3>Squares</h3>
          <p>
            <strong>
              Squares = ⌈ (perimeter × height + gables − openings) × (1 + waste)
              ÷ 100 ⌉
            </strong>{" "}
            — each gable = (base × rise) ÷ 2.
          </p>
          <h3>Boxes</h3>
          <p>
            <strong>Boxes = ⌈ total sq ft ÷ coverage per box ⌉</strong> — ~200
            sq ft per vinyl carton; check your product.
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
            href: "/paint-calculator",
            title: "Paint Calculator",
            desc: "Paint for the same walls — compare with siding cost.",
          },
          {
            href: "/drywall-calculator",
            title: "Drywall Calculator",
            desc: "Interior wall area uses the same measuring method.",
          },
          {
            href: "/roof-pitch-calculator",
            title: "Roof Pitch Calculator",
            desc: "Pitch math for the gable triangles above.",
          },
        ]}
      />
    </article>
  );
}
