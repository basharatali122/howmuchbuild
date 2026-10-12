import Link from "next/link";
import BrickCalculator from "@/components/BrickCalculator";
import AdSlot from "@/components/AdSlot";
import JsonLd from "@/components/JsonLd";
import AuthorByline from "@/components/AuthorByline";
import TableOfContents from "@/components/TableOfContents";
import RelatedCalculators from "@/components/RelatedCalculators";
import { SITE_URL, SITE_NAME } from "@/lib/siteConfig";

export const metadata = {
  title: "Brick Calculator: How Many Bricks Do I Need?",
  description:
    "Free brick calculator: US modular brick counts for walls (openings subtracted) plus a fire-pit ring mode — with mortar bag estimates and a worked example.",
  alternates: {
    canonical: `${SITE_URL}/brick-calculator`,
  },
  openGraph: {
    title: "Brick Calculator: How Many Bricks Do I Need?",
    description:
      "Brick counts, mortar bags, and fire-pit rings — US modular brick with ⅜-in joints.",
    url: `${SITE_URL}/brick-calculator`,
    type: "article",
  },
};

const PAGE_URL = `${SITE_URL}/brick-calculator`;

const FAQ_ITEMS = [
  {
    q: "How many bricks are in a square foot?",
    a: "About 6.75 bricks per square foot for US modular brick with ⅜-in mortar joints. Each brick plus its joint covers 8 × 2⅔ inches of wall face (0.148 sq ft), so 1 ÷ 0.148 = 6.75. This calculator multiplies your net wall area by that published figure, adds waste, and rounds up.",
  },
  {
    q: "How many bricks do I need for a 20×4 ft wall?",
    a: "20 × 4 = 80 sq ft × 6.75 = 540 bricks, plus 7% waste = 577.8, so order 578 bricks. At roughly 40 bricks per 80-lb bag of Type N mortar, that's 15 bags — keep one spare, since joint thickness varies.",
  },
  {
    q: "How many bricks do I need for a fire pit?",
    a: "For a 36-inch inside-diameter pit, 3 courses high: circumference is π × 36 = 113 inches, ÷ 8 inches per nominal brick = 14.1, rounded up to 15 bricks per course × 3 courses = 45 bricks. Switch the calculator to fire-pit mode and it does this for any diameter.",
  },
  {
    q: "How many mortar bags do I need for brick?",
    a: "As an estimate, one 80-lb bag of Type N mortar lays roughly 40 standard bricks. Divide your brick count by 40 and round up. This is a planning estimate — deep joints and rework eat mortar faster than the math suggests.",
  },
  {
    q: "Can I use regular mortar for a fire pit?",
    a: "Only for the outer shell. Courses that face direct flame should use fire-rated refractory mortar — standard Type N mortar can crack and spall under repeated high heat. The calculator flags this in fire-pit mode.",
  },
  {
    q: "What size is a standard US brick?",
    a: "US modular brick is 3⅝ × 2¼ × 7⅝ inches actual, which becomes 4 × 2⅔ × 8 inches nominal once you include the standard ⅜-in mortar joint. All of this calculator's coverage figures use the nominal (with-joint) dimensions.",
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
    { "@type": "ListItem", position: 2, name: "Brick Calculator", item: PAGE_URL },
  ],
};

const TOC_ITEMS = [
  { id: "worked-example", label: "Worked example" },
  { id: "formulas", label: "The formulas" },
  { id: "faqs", label: "Frequently asked questions" },
];

export default function BrickCalculatorPage() {
  return (
    <article className="mx-auto max-w-content px-4 py-10 sm:px-6">
      <JsonLd data={faqJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <nav aria-label="Breadcrumb" className="mb-4 text-sm text-slate-500">
        <Link href="/">Home</Link> <span aria-hidden="true">›</span>{" "}
        <span aria-current="page">Brick Calculator</span>
      </nav>

      <p className="eyebrow">Free calculator</p>
      <h1 className="mt-2 max-w-3xl text-3xl sm:text-4xl">
        Brick Calculator: How Many Bricks Do I Need?
      </h1>
      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-600">
        Brick counts for walls with openings subtracted, mortar bag
        estimates, and a dedicated fire-pit ring mode — all for US modular
        brick with ⅜-in joints. No sign-up; the math runs entirely in your
        browser.
      </p>
      <div className="mt-4">
        <AuthorByline />
      </div>

      <div className="mt-8">
        <BrickCalculator />
      </div>

      <AdSlot label="Advertisement" className="my-8 h-28" />

      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <TableOfContents items={TOC_ITEMS} />
          </div>
        </aside>

        <div className="prose-hmb max-w-3xl">
          <h2 id="worked-example">Worked example: 20×4 ft brick wall</h2>
          <p>Full arithmetic, step by step (matches the calculator defaults):</p>
          <ol>
            <li>
              <strong>Net area:</strong> 20 ft × 4 ft = <strong>80 sq ft</strong>
            </li>
            <li>
              <strong>Bricks:</strong> 80 × 6.75 = <strong>540 bricks</strong>
            </li>
            <li>
              <strong>With 7% waste:</strong> 540 × 1.07 = 577.8 →{" "}
              <strong>578 bricks</strong>
            </li>
            <li>
              <strong>Mortar:</strong> 578 ÷ 40 = 14.45 → <strong>15 bags</strong>{" "}
              (80-lb Type N, estimate)
            </li>
          </ol>
          <p>
            <strong>Fire-pit check:</strong> 36″ diameter → π × 36 = 113.1″ ÷
            8″ = 14.1 → <strong>15 bricks/course</strong> × 3 courses ={" "}
            <strong>45 bricks</strong>.
          </p>

          <h2 id="formulas">The formulas</h2>
          <h3>Wall bricks</h3>
          <p>
            <strong>Bricks = ⌈ (L × H − openings) × 6.75 × (1 + waste) ⌉</strong> —
            6.75 is the published bricks-per-square-foot figure for US modular
            brick with ⅜-in joints, always rounded up.
          </p>
          <h3>Mortar (estimate)</h3>
          <p>
            <strong>Bags = ⌈ bricks ÷ 40 ⌉</strong> — one 80-lb bag of Type N
            mortar lays roughly 40 bricks. Planning estimate only.
          </p>
          <h3>Fire-pit ring</h3>
          <p>
            <strong>
              Per course = ⌈ (π × diameter in inches) ÷ 8 ⌉, total = per course
              × courses
            </strong>{" "}
            — rounded up per course so the ring always closes.
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
            href: "/concrete-block-calculator",
            title: "Concrete Block Calculator",
            desc: "CMU block counts, mortar bags, and pallets.",
          },
          {
            href: "/paver-calculator",
            title: "Paver Calculator",
            desc: "Pavers and base materials for the patio around the pit.",
          },
          {
            href: "/concrete-calculator",
            title: "Concrete Calculator",
            desc: "Footing concrete under a brick wall.",
          },
          {
            href: "/fence-calculator",
            title: "Fence Calculator",
            desc: "Brick piers meet fence runs — plan both.",
          },
        ]}
      />
    </article>
  );
}
