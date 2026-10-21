import Link from "next/link";
import RetainingWallCalculator from "@/components/RetainingWallCalculator";
import AdSlot from "@/components/AdSlot";
import JsonLd from "@/components/JsonLd";
import AuthorByline from "@/components/AuthorByline";
import TableOfContents from "@/components/TableOfContents";
import RelatedCalculators from "@/components/RelatedCalculators";
import { SITE_URL, SITE_NAME } from "@/lib/siteConfig";

export const metadata = {
  title: "Retaining Wall Calculator: Blocks, Caps & Drainage Stone",
  description:
    "Free retaining wall calculator: wall block counts, cap units, base gravel, and drainage stone for segmental block walls — with waste allowance.",
  alternates: {
    canonical: `${SITE_URL}/retaining-wall-calculator`,
  },
  openGraph: {
    title: "Retaining Wall Calculator: Blocks, Caps & Drainage Stone",
    description:
      "Block counts, caps, base gravel and drainage stone for segmental retaining walls.",
    url: `${SITE_URL}/retaining-wall-calculator`,
    type: "article",
    images: [
      {
        url:
          "/og?title=" +
          encodeURIComponent("Retaining Wall Calculator: Blocks, Caps & Drainage Stone") +
          "&sub=" +
          encodeURIComponent("Block counts, caps, base gravel and drainage stone for segmental retaining walls."),
        width: 1200,
        height: 630,
        alt: "Retaining Wall Calculator: Blocks, Caps & Drainage Stone",
      },
    ],
  },
};

const PAGE_URL = `${SITE_URL}/retaining-wall-calculator`;

const FAQ_ITEMS = [
  {
    q: "How many blocks do I need for a retaining wall?",
    a: "Divide the wall length by the block's face length for blocks per course, divide the wall height by the block's face height for courses, multiply, and add waste for cuts. Example: a 20-ft wall, 2 ft tall, with 12×4-in blocks = 20 blocks/course × 6 courses = 120, plus 5% waste = 126 blocks.",
  },
  {
    q: "How tall can a DIY retaining wall be?",
    a: "Most manufacturers and codes treat 3 to 4 feet as the DIY limit for segmental block walls without engineering. Taller walls — or any wall holding back a slope, driveway, or structure — usually need geogrid reinforcement, drainage design, and a permit. Check your local code before stacking higher.",
  },
  {
    q: "Do I need drainage behind a retaining wall?",
    a: "Yes. Water pressure is what kills retaining walls. The standard detail is a 12-inch-wide column of clean drainage stone directly behind the wall, full height, plus a perforated drain pipe at the base daylighted out the ends. This calculator sizes the drainage stone for you.",
  },
  {
    q: "How deep should the gravel base be under a retaining wall?",
    a: "6 inches of compacted crushed gravel (compacted in lifts) under the first course, in a trench about twice as wide as the block is deep. Bury the entire first course — the calculator's height input should include that buried course.",
  },
  {
    q: "What are cap units and how many do I need?",
    a: "Caps are the finished top row — wider, flat units that lock the wall together and shed water. Count = wall length ÷ cap length, rounded up. For a 20-ft wall with 12-inch caps, that's 20 caps. They cost more per unit than wall block, so price them separately.",
  },
  {
    q: "Do I need geogrid for my retaining wall?",
    a: "For walls under 3 feet on flat ground, usually not. Above that, most block manufacturers require geogrid layers extending back into the soil at specified intervals — the exact schedule comes from the block maker's engineering tables for your wall height and soil. This calculator doesn't size geogrid; treat taller walls as engineered work.",
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
    { "@type": "ListItem", position: 2, name: "Retaining Wall Calculator", item: PAGE_URL },
  ],
};

const TOC_ITEMS = [
  { id: "worked-example", label: "Worked example" },
  { id: "formulas", label: "The formulas" },
  { id: "faqs", label: "Frequently asked questions" },
];

export default function RetainingWallCalculatorPage() {
  return (
    <article className="mx-auto max-w-content px-4 py-10 sm:px-6">
      <JsonLd data={faqJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <nav aria-label="Breadcrumb" className="mb-4 text-sm text-slate-500">
        <Link href="/">Home</Link> <span aria-hidden="true">›</span>{" "}
        <span aria-current="page">Retaining Wall Calculator</span>
      </nav>

      <p className="eyebrow">Free calculator</p>
      <h1 className="mt-2 max-w-3xl text-3xl sm:text-4xl">
        Retaining Wall Calculator: Blocks, Caps & Drainage Stone
      </h1>
      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-600">
        Wall block counts, cap units, base gravel, and drainage stone for
        segmental block walls — with a waste allowance for cuts. No sign-up;
        the math runs entirely in your browser.
      </p>
      <div className="mt-4">
        <AuthorByline />
      </div>

      <div className="mt-8">
        <RetainingWallCalculator />
      </div>

      <AdSlot label="Advertisement" className="my-8 h-28" />

      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <TableOfContents items={TOC_ITEMS} />
          </div>
        </aside>

        <div className="prose-hmb max-w-3xl">
          <h2 id="worked-example">Worked example: 20×2 ft garden wall</h2>
          <p>
            Full arithmetic, step by step (12×4-in landscape blocks, 5% waste,
            12-in caps):
          </p>
          <ol>
            <li>
              <strong>Courses:</strong> 24 ÷ 4 = <strong>6 courses</strong>
            </li>
            <li>
              <strong>Blocks per course:</strong> 240 ÷ 12 ={" "}
              <strong>20 blocks</strong>
            </li>
            <li>
              <strong>Total blocks:</strong> 6 × 20 × 1.05 ={" "}
              <strong>126 blocks</strong>
            </li>
            <li>
              <strong>Caps:</strong> 240 ÷ 12 = <strong>20 caps</strong>
            </li>
            <li>
              <strong>Base gravel:</strong> 20 × 2 × 0.5 = 20 cu ft ={" "}
              <strong>0.74 cu yd</strong>
            </li>
            <li>
              <strong>Drainage stone:</strong> 20 × 1 × 2 = 40 cu ft ={" "}
              <strong>1.48 cu yd</strong>
            </li>
          </ol>

          <h2 id="formulas">The formulas</h2>
          <h3>Blocks</h3>
          <p>
            <strong>
              Blocks = ⌈ courses × blocks per course × (1 + waste) ⌉
            </strong>{" "}
            — courses = ⌈ height ÷ block face height ⌉, per course = ⌈ length ÷
            block face length ⌉.
          </p>
          <h3>Caps</h3>
          <p>
            <strong>Caps = ⌈ wall length ÷ cap length ⌉</strong> — one cap per
            block-length of wall, roughly.
          </p>
          <h3>Gravel and drainage</h3>
          <p>
            <strong>
              Base = length × 2 ft × 0.5 ft ÷ 27; drainage = length × 1 ft ×
              height ÷ 27
            </strong>{" "}
            — both in cubic yards.
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
            desc: "CMU block walls — the mortared cousin of dry-stack.",
          },
          {
            href: "/gravel-calculator",
            title: "Gravel Calculator",
            desc: "Base and drainage aggregates by the cubic yard.",
          },
          {
            href: "/paver-calculator",
            title: "Paver Calculator",
            desc: "The patio that usually goes in front of the wall.",
          },
          {
            href: "/rebar-calculator",
            title: "Rebar Calculator",
            desc: "Steel for footings under taller walls.",
          },
        ]}
      />
    </article>
  );
}
