import Link from "next/link";
import ConcreteBlockCalculator from "@/components/ConcreteBlockCalculator";
import AdSlot from "@/components/AdSlot";
import JsonLd from "@/components/JsonLd";
import AuthorByline from "@/components/AuthorByline";
import TableOfContents from "@/components/TableOfContents";
import RelatedCalculators from "@/components/RelatedCalculators";
import { SITE_URL, SITE_NAME } from "@/lib/siteConfig";

export const metadata = {
  title: "Concrete Block Calculator: How Many Blocks Do I Need?",
  description:
    "Free concrete block calculator: enter wall dimensions and openings to get CMU block counts, mortar bags, and pallets — with a worked 20×4 ft example.",
  alternates: {
    canonical: `${SITE_URL}/concrete-block-calculator`,
  },
  openGraph: {
    title: "Concrete Block Calculator: How Many Blocks Do I Need?",
    description:
      "CMU block counts, mortar bags, and pallets for walls — openings subtracted, waste included.",
    url: `${SITE_URL}/concrete-block-calculator`,
    type: "article",
  },
};

const PAGE_URL = `${SITE_URL}/concrete-block-calculator`;

const FAQ_ITEMS = [
  {
    q: "How many 8×8×16 concrete blocks are in a square foot?",
    a: "About 1.125 blocks per square foot (1⅛ blocks). A nominal 8×8×16-in block plus one ⅜-in mortar joint covers 16 × 8 inches of wall face — 0.889 sq ft — so 1 ÷ 0.889 = 1.125. This calculator uses that published figure, then adds your waste allowance and rounds up.",
  },
  {
    q: "How many blocks do I need for a 20×4 ft wall?",
    a: "20 × 4 = 80 sq ft × 1.125 = 90 blocks, plus 5% cutting waste = 94.5, so order 95 blocks. At roughly 25 blocks per 80-lb bag of mortar, that's 4 bags of Type S mortar — and just over one standard pallet (about 90 blocks each), so 2 pallets.",
  },
  {
    q: "How many mortar bags do I need for concrete block?",
    a: "As an estimate, one 80-lb bag of Type S mortar lays roughly 25 standard 8×8×16 blocks. Divide your block count by 25 and round up. Wider blocks and sloppy joints use more — treat the bag count as a planning estimate and keep a spare bag on hand.",
  },
  {
    q: "How many concrete blocks fit on a pallet?",
    a: "A standard pallet holds about 90 8×8×16 blocks (roughly 3,000+ lb — confirm your supplier's count and your delivery truck's access). This calculator converts your block count to pallets so you can plan delivery.",
  },
  {
    q: "Should I subtract doors and windows from a block wall?",
    a: "Yes. Enter the total opening area in square feet and the calculator subtracts it before counting blocks. Openings also need lintels and extra mortar at the jambs, so keep the waste allowance at 5% or higher on walls with several openings.",
  },
  {
    q: "What's the difference between CMU, cinder block, and concrete block?",
    a: "Mostly the same product today: CMU (concrete masonry unit) is the technical name, and modern 'cinder blocks' are made with concrete aggregate, not cinders. This calculator's 1.125 blocks/sq ft figure applies to the standard 8×8×16-in nominal unit regardless of what your supplier calls it.",
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
    { "@type": "ListItem", position: 2, name: "Concrete Block Calculator", item: PAGE_URL },
  ],
};

const TOC_ITEMS = [
  { id: "worked-example", label: "Worked example" },
  { id: "formulas", label: "The formulas" },
  { id: "faqs", label: "Frequently asked questions" },
];

export default function ConcreteBlockCalculatorPage() {
  return (
    <article className="mx-auto max-w-content px-4 py-10 sm:px-6">
      <JsonLd data={faqJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <nav aria-label="Breadcrumb" className="mb-4 text-sm text-slate-500">
        <Link href="/">Home</Link> <span aria-hidden="true">›</span>{" "}
        <span aria-current="page">Concrete Block Calculator</span>
      </nav>

      <p className="eyebrow">Free calculator</p>
      <h1 className="mt-2 max-w-3xl text-3xl sm:text-4xl">
        Concrete Block Calculator: How Many Blocks Do I Need?
      </h1>
      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-600">
        Enter your wall length, height, and openings to get an exact block
        count for standard 8×8×16-in CMU — plus mortar bags and pallets, with
        a cutting-waste allowance built in. No sign-up; the math runs entirely
        in your browser.
      </p>
      <div className="mt-4">
        <AuthorByline />
      </div>

      <div className="mt-8">
        <ConcreteBlockCalculator />
      </div>

      <AdSlot label="Advertisement" className="my-8 h-28" />

      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <TableOfContents items={TOC_ITEMS} />
          </div>
        </aside>

        <div className="prose-hmb max-w-3xl">
          <h2 id="worked-example">Worked example: 20×4 ft garden wall</h2>
          <p>Full arithmetic, step by step (matches the calculator defaults):</p>
          <ol>
            <li>
              <strong>Gross area:</strong> 20 ft × 4 ft = <strong>80 sq ft</strong>
            </li>
            <li>
              <strong>Blocks:</strong> 80 × 1.125 = <strong>90 blocks</strong>
            </li>
            <li>
              <strong>With 5% waste:</strong> 90 × 1.05 = 94.5 →{" "}
              <strong>95 blocks</strong>
            </li>
            <li>
              <strong>Mortar:</strong> 95 ÷ 25 = 3.8 → <strong>4 bags</strong>{" "}
              (80-lb Type S, estimate)
            </li>
            <li>
              <strong>Pallets:</strong> 95 ÷ 90 = 1.06 → <strong>2 pallets</strong>
            </li>
          </ol>

          <h2 id="formulas">The formulas</h2>
          <h3>Blocks</h3>
          <p>
            <strong>Blocks = ⌈ (L × H − openings) × 1.125 × (1 + waste) ⌉</strong> —
            1.125 is the published blocks-per-square-foot figure for nominal
            8×8×16-in block with ⅜-in joints, always rounded up.
          </p>
          <h3>Mortar (estimate)</h3>
          <p>
            <strong>Bags = ⌈ blocks ÷ 25 ⌉</strong> — one 80-lb bag of Type S
            mortar lays roughly 25 standard blocks. Treat as a planning
            estimate; joint thickness and block width move the number.
          </p>
          <h3>Pallets</h3>
          <p>
            <strong>Pallets = ⌈ blocks ÷ 90 ⌉</strong> — about 90 8×8×16
            blocks per standard pallet.
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
            href: "/brick-calculator",
            title: "Brick Calculator",
            desc: "Brick counts, mortar bags, and a fire-pit ring mode.",
          },
          {
            href: "/concrete-calculator",
            title: "Concrete Calculator",
            desc: "Cubic yards and bag counts for footings under the wall.",
          },
          {
            href: "/concrete-bags-calculator",
            title: "Concrete Bags Calculator",
            desc: "Bag counts for the footing pour, with post displacement.",
          },
          {
            href: "/fence-calculator",
            title: "Fence Calculator",
            desc: "Posts, pickets, and rails if the wall meets a fence run.",
          },
        ]}
      />
    </article>
  );
}
