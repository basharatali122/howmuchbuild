import Link from "next/link";
import FlooringCalculator from "@/components/FlooringCalculator";
import AdSlot from "@/components/AdSlot";
import JsonLd from "@/components/JsonLd";
import AuthorByline from "@/components/AuthorByline";
import TableOfContents from "@/components/TableOfContents";
import RelatedCalculators from "@/components/RelatedCalculators";
import { SITE_URL, SITE_NAME } from "@/lib/siteConfig";

export const metadata = {
  title: "Flooring Calculator: Boxes, Waste & Layout",
  description:
    "Free flooring calculator: box counts for laminate, vinyl plank, and hardwood — straight, diagonal, and herringbone waste factors included.",
  alternates: {
    canonical: `${SITE_URL}/flooring-calculator`,
  },
  openGraph: {
    title: "Flooring Calculator: Boxes, Waste & Layout",
    description:
      "How many boxes of flooring? Room area, layout waste, and box counts.",
    url: `${SITE_URL}/flooring-calculator`,
    type: "article",
  },
};

const PAGE_URL = `${SITE_URL}/flooring-calculator`;

const FAQ_ITEMS = [
  {
    q: "How much flooring do I need for a 12x15 room?",
    a: "180 sq ft of floor. With 10% waste for a straight lay that's 198 sq ft; at 20 sq ft per box you need 10 boxes. Add the closet and alcove square footage on top — the calculator has a field for that.",
  },
  {
    q: "How many boxes of laminate flooring do I need?",
    a: "Measure total square footage, add waste (10% straight, 15% diagonal, 20% herringbone), then divide by the coverage printed on the box and round up. A 200 sq ft job at 10% waste with 20 sq ft boxes needs 11 boxes.",
  },
  {
    q: "What waste percentage should I use for flooring?",
    a: "10% for a simple straight plank lay in a rectangular room. 15% for diagonal layouts or rooms with lots of corners and doorways. 20% for herringbone or complex patterns. First-timers should add another 5% for learning-curve cuts.",
  },
  {
    q: "Should I buy extra flooring for future repairs?",
    a: "Yes — 1 to 2 spare boxes. Manufacturers discontinue colors and dye lots shift, so an exact match later is unlikely. Unopened boxes are usually returnable if you overbuy, but a missing box mid-project is a real problem.",
  },
  {
    q: "How do you measure flooring for an odd-shaped room?",
    a: "Divide the floor into rectangles, measure each, and add them up — plus closets and alcoves as extra square footage. For L-shaped rooms, measure the two rectangles separately rather than guessing one big rectangle.",
  },
  {
    q: "Does flooring direction affect how much I need?",
    a: "The direction doesn't change the math, but the pattern does: straight plank runs waste the least (10%), diagonal cuts waste more (15%), and herringbone wastes the most (20%) because nearly every edge piece is a cut.",
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
    { "@type": "ListItem", position: 2, name: "Flooring Calculator", item: PAGE_URL },
  ],
};

const TOC_ITEMS = [
  { id: "worked-example", label: "Worked example" },
  { id: "formulas", label: "The formulas" },
  { id: "faqs", label: "Frequently asked questions" },
];

export default function FlooringCalculatorPage() {
  return (
    <article className="mx-auto max-w-content px-4 py-10 sm:px-6">
      <JsonLd data={faqJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <nav aria-label="Breadcrumb" className="mb-4 text-sm text-slate-500">
        <Link href="/">Home</Link> <span aria-hidden="true">›</span>{" "}
        <span aria-current="page">Flooring Calculator</span>
      </nav>

      <p className="eyebrow">Free calculator</p>
      <h1 className="mt-2 max-w-3xl text-3xl sm:text-4xl">
        Flooring Calculator: Boxes, Waste & Layout
      </h1>
      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-600">
        Box counts for laminate, vinyl plank, and hardwood — straight,
        diagonal, and herringbone waste factors included. No sign-up; the math
        runs entirely in your browser.
      </p>
      <div className="mt-4">
        <AuthorByline />
      </div>

      <div className="mt-8">
        <FlooringCalculator />
      </div>

      <AdSlot label="Advertisement" className="my-8 h-28" />

      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <TableOfContents items={TOC_ITEMS} />
          </div>
        </aside>

        <div className="prose-hmb max-w-3xl">
          <h2 id="worked-example">Worked example: 12×15 ft room</h2>
          <p>
            Full arithmetic, step by step (straight lay, 20 sq ft per box):
          </p>
          <ol>
            <li>
              <strong>Floor area:</strong> 12 × 15 = <strong>180 sq ft</strong>
            </li>
            <li>
              <strong>With 10% waste:</strong> 180 × 1.10 ={" "}
              <strong>198 sq ft</strong>
            </li>
            <li>
              <strong>Boxes:</strong> 198 ÷ 20 = 9.9 →{" "}
              <strong>10 boxes</strong>
            </li>
          </ol>

          <h2 id="formulas">The formulas</h2>
          <h3>Boxes</h3>
          <p>
            <strong>
              Boxes = ⌈ (length × width + extras) × (1 + waste) ÷ coverage per
              box ⌉
            </strong>{" "}
            — waste is 10% straight, 15% diagonal, 20% herringbone.
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
            href: "/tile-calculator",
            title: "Tile Calculator",
            desc: "Tile counts with the same waste logic, per tile size.",
          },
          {
            href: "/paint-calculator",
            title: "Paint Calculator",
            desc: "Paint for the room you're flooring.",
          },
          {
            href: "/wallpaper-calculator",
            title: "Wallpaper Calculator",
            desc: "Walls to match the new floor.",
          },
        ]}
      />
    </article>
  );
}
