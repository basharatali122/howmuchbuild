import Link from "next/link";
import RebarCalculator from "@/components/RebarCalculator";
import AdSlot from "@/components/AdSlot";
import JsonLd from "@/components/JsonLd";
import AuthorByline from "@/components/AuthorByline";
import TableOfContents from "@/components/TableOfContents";
import RelatedCalculators from "@/components/RelatedCalculators";
import { SITE_URL, SITE_NAME } from "@/lib/siteConfig";

export const metadata = {
  title: "Rebar Calculator: How Much Rebar Do I Need?",
  description:
    "Free rebar calculator: bar counts, total linear feet, and weight in pounds and tons for slab grids and footings — #3 to #11 bar sizes with lap allowance.",
  alternates: {
    canonical: `${SITE_URL}/rebar-calculator`,
  },
  openGraph: {
    title: "Rebar Calculator: How Much Rebar Do I Need?",
    description:
      "Rebar counts, linear feet, and weight for slabs and footings — #3 to #11 bars.",
    url: `${SITE_URL}/rebar-calculator`,
    type: "article",
  },
};

const PAGE_URL = `${SITE_URL}/rebar-calculator`;

const FAQ_ITEMS = [
  {
    q: "What size rebar do I need for a concrete slab?",
    a: "#4 (1/2-inch) rebar at 18 inches on center is the common residential default for 4-inch slabs. Lighter duty work sometimes uses #3; heavier loads call for #5 or tighter spacing. Rebar sizing is structural — follow your local building code or an engineer's spec, not a rule of thumb alone.",
  },
  {
    q: "How much does rebar weigh per foot?",
    a: "Published weights: #3 = 0.376 lb/ft, #4 = 0.668 lb/ft, #5 = 1.043 lb/ft, #6 = 1.502 lb/ft, #7 = 2.044 lb/ft, #8 = 2.670 lb/ft. This calculator multiplies your total linear feet by the selected bar's weight and converts to tons (÷ 2,000).",
  },
  {
    q: "How far apart should rebar be spaced in a slab?",
    a: "12 to 18 inches on center covers most residential slabs; 18 inches is the common default for #4 bars in a 4-inch slab. Footings typically run 2 to 4 continuous bars rather than a grid. Wider spacing saves steel but reduces crack control — when in doubt, check the code.",
  },
  {
    q: "How many 20-foot sticks of rebar do I need?",
    a: "Divide the calculator's total linear feet by 20 and round up. For the worked example below: 588 ft ÷ 20 = 29.4, so order 30 sticks of #4. The lap allowance is already baked into the total, so don't add waste twice.",
  },
  {
    q: "Do I need rebar in a small concrete slab?",
    a: "Not always. Small non-structural slabs (shed pads, walkways) often do fine with welded wire mesh or fiber-reinforced mix instead of rebar. Rebar matters most where the slab carries real loads or spans soft spots. Check local code — some jurisdictions require it regardless of size.",
  },
  {
    q: "What is the lap allowance for?",
    a: "Rebar comes in fixed lengths (usually 20 ft), so long runs need overlapping splices. The lap allowance adds a percentage to the total length to cover those overlaps — 5% is a reasonable planning figure. Lapped splices also have minimum length requirements by bar size in the code.",
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
    { "@type": "ListItem", position: 2, name: "Rebar Calculator", item: PAGE_URL },
  ],
};

const TOC_ITEMS = [
  { id: "worked-example", label: "Worked example" },
  { id: "formulas", label: "The formulas" },
  { id: "faqs", label: "Frequently asked questions" },
];

export default function RebarCalculatorPage() {
  return (
    <article className="mx-auto max-w-content px-4 py-10 sm:px-6">
      <JsonLd data={faqJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <nav aria-label="Breadcrumb" className="mb-4 text-sm text-slate-500">
        <Link href="/">Home</Link> <span aria-hidden="true">›</span>{" "}
        <span aria-current="page">Rebar Calculator</span>
      </nav>

      <p className="eyebrow">Free calculator</p>
      <h1 className="mt-2 max-w-3xl text-3xl sm:text-4xl">
        Rebar Calculator: How Much Rebar Do I Need?
      </h1>
      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-600">
        Bar counts, total linear feet, and weight in pounds and tons for slab
        grids and footings — #3 through #11 bars with a lap allowance for
        splices. No sign-up; the math runs entirely in your browser.
      </p>
      <div className="mt-4">
        <AuthorByline />
      </div>

      <div className="mt-8">
        <RebarCalculator />
      </div>

      <AdSlot label="Advertisement" className="my-8 h-28" />

      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <TableOfContents items={TOC_ITEMS} />
          </div>
        </aside>

        <div className="prose-hmb max-w-3xl">
          <h2 id="worked-example">Worked example: 20×20 ft slab</h2>
          <p>
            Full arithmetic, step by step (#4 bars at 18 in on center, 5% lap):
          </p>
          <ol>
            <li>
              <strong>Bars each way:</strong> floor(240 ÷ 18) + 1 ={" "}
              <strong>14 bars</strong> (both directions = 28 bars)
            </li>
            <li>
              <strong>Raw length:</strong> 14 × 20 + 14 × 20 ={" "}
              <strong>560 ft</strong>
            </li>
            <li>
              <strong>With 5% lap:</strong> 560 × 1.05 ={" "}
              <strong>588 ft</strong>
            </li>
            <li>
              <strong>Weight:</strong> 588 × 0.668 = <strong>392.8 lb</strong>{" "}
              (≈ 0.20 tons)
            </li>
            <li>
              <strong>Sticks:</strong> 588 ÷ 20 = 29.4 →{" "}
              <strong>30 sticks</strong> of 20-ft #4
            </li>
          </ol>

          <h2 id="formulas">The formulas</h2>
          <h3>Slab grid</h3>
          <p>
            <strong>
              Bars per direction = ⌊ span in inches ÷ spacing ⌋ + 1
            </strong>{" "}
            — then total feet = (bars₁ × length) + (bars₂ × width), times (1 +
            lap).
          </p>
          <h3>Weight</h3>
          <p>
            <strong>Pounds = total feet × lb/ft for the bar size</strong> —
            using published weights (#4 = 0.668 lb/ft). Tons = pounds ÷ 2,000.
          </p>
          <h3>Footing</h3>
          <p>
            <strong>Total feet = trench length × bars per footing</strong> —
            then the same lap and weight math as the slab.
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
            href: "/concrete-calculator",
            title: "Concrete Calculator",
            desc: "Cubic yards for the slab or footing the rebar goes into.",
          },
          {
            href: "/concrete-bags-calculator",
            title: "Concrete Bags Calculator",
            desc: "Bag counts for small footings and piers.",
          },
          {
            href: "/deck-calculator",
            title: "Deck Calculator",
            desc: "Footing layouts for deck posts.",
          },
          {
            href: "/retaining-wall-calculator",
            title: "Retaining Wall Calculator",
            desc: "Block, cap, and drainage stone for the wall.",
          },
        ]}
      />
    </article>
  );
}
