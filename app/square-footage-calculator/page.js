import Link from "next/link";
import SquareFootageCalculator from "@/components/SquareFootageCalculator";
import AdSlot from "@/components/AdSlot";
import JsonLd from "@/components/JsonLd";
import AuthorByline from "@/components/AuthorByline";
import TableOfContents from "@/components/TableOfContents";
import RelatedCalculators from "@/components/RelatedCalculators";
import { SITE_URL, SITE_NAME } from "@/lib/siteConfig";

export const metadata = {
  title: "Square Footage Calculator: How Many Square Feet (Sq Ft, Sq Yd, Acres)",
  description:
    "Free square footage calculator: enter length and width in feet and inches to get area in square feet, square yards, acres, and square meters, for rooms, floors, lawns, and walls.",
  alternates: {
    canonical: `${SITE_URL}/square-footage-calculator`,
  },
  openGraph: {
    title: "Square Footage Calculator: How Many Square Feet",
    description:
      "Area in square feet, square yards, acres, and square meters for rooms, floors, lawns, and walls, with a common room size chart.",
    url: `${SITE_URL}/square-footage-calculator`,
    type: "article",
    images: [
      {
        url:
          "/og?title=" +
          encodeURIComponent("Square Footage Calculator: How Many Square Feet") +
          "&sub=" +
          encodeURIComponent("Area in square feet, square yards, acres, and square meters for rooms, floors, lawns, and walls, with a common room size chart."),
        width: 1200,
        height: 630,
        alt: "Square Footage Calculator: How Many Square Feet",
      },
    ],
  },
};

const PAGE_URL = `${SITE_URL}/square-footage-calculator`;

const FAQ_ITEMS = [
  {
    q: "How do I measure the square footage of a room?",
    a: "Measure the length and width in feet, then multiply them. A 20 ft by 15 ft room is 300 sq ft. If your tape gives feet and inches, convert first: 12 ft 6 in is 12.5 ft. For an odd-shaped room, split it into rectangles, measure each one, and add the areas together.",
  },
  {
    q: "How many square feet are in a square yard?",
    a: "9, exact. One yard is 3 feet, so one square yard is 3 ft x 3 ft = 9 sq ft. Divide your square feet by 9 to get square yards: 300 sq ft is 33.33 sq yd.",
  },
  {
    q: "How many square feet are in an acre?",
    a: "43,560, exact. An acre is a large land unit: a 100 ft by 435.6 ft lot is one acre. Most rooms and lawns are a small fraction of an acre, which is why this calculator shows acres to four decimal places.",
  },
  {
    q: "How do I convert feet and inches to decimal feet?",
    a: "Divide the inches by 12 and add them to the feet. 12 ft 6 in = 12 + 6/12 = 12.5 ft. 10 ft 3 in = 10.25 ft. This calculator accepts feet and inches separately, so it does this conversion for you.",
  },
  {
    q: "Does square footage include a waste allowance?",
    a: "No. This calculator gives the exact area. For flooring, paint, or sod, add a waste allowance (often 10%) on top of the area for cuts, pattern matching, and mistakes. The material calculators on this site handle that math for you.",
  },
  {
    q: "What is the difference between square feet and linear feet?",
    a: "Square feet measure area (length times width). Linear feet measure a straight length only, like baseboards, trim, or a fence run. A 10 ft wall is 10 linear feet, but if it is 8 ft tall, it is 80 sq ft of paintable surface.",
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
    { "@type": "ListItem", position: 2, name: "Square Footage Calculator", item: PAGE_URL },
  ],
};

const TOC_ITEMS = [
  { id: "worked-example", label: "Worked example" },
  { id: "reference-table", label: "Common room sizes" },
  { id: "formulas", label: "The formulas" },
  { id: "faqs", label: "Frequently asked questions" },
];

export default function SquareFootageCalculatorPage() {
  return (
    <article className="mx-auto max-w-content px-4 py-10 sm:px-6">
      <JsonLd data={faqJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <nav aria-label="Breadcrumb" className="mb-4 text-sm text-slate-500">
        <Link href="/">Home</Link> <span aria-hidden="true">›</span>{" "}
        <span aria-current="page">Square Footage Calculator</span>
      </nav>

      <p className="eyebrow">Free calculator</p>
      <h1 className="mt-2 max-w-3xl text-3xl sm:text-4xl">
        Square Footage Calculator: How Many Square Feet?
      </h1>
      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-600">
        Flooring is priced by the square foot, paint coverage is rated in
        square feet per gallon, and sod is sold by the area it covers. Enter
        your length and width in feet and inches for the area in square
        feet, plus square yards, acres, and square meters. No sign-up; the
        math runs entirely in your browser.
      </p>
      <div className="mt-4">
        <AuthorByline />
      </div>

      <div className="mt-8">
        <SquareFootageCalculator />
      </div>

      <AdSlot label="Advertisement" className="my-8 h-28" />

      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <TableOfContents items={TOC_ITEMS} />
          </div>
        </aside>

        <div className="prose-hmb max-w-3xl">
          <h2 id="worked-example">Worked example: 20 x 15 ft room</h2>
          <p>Full arithmetic, step by step:</p>
          <ol>
            <li>
              <strong>Area:</strong> 20 ft x 15 ft = <strong>300 sq ft</strong>
            </li>
            <li>
              <strong>Square yards:</strong> 300 / 9 ={" "}
              <strong>33.33 sq yd</strong>
            </li>
            <li>
              <strong>Square meters:</strong> 300 x 0.092903 ={" "}
              <strong>27.87 sq m</strong>
            </li>
            <li>
              <strong>Acres:</strong> 300 / 43,560 ={" "}
              <strong>0.0069 acres</strong>
            </li>
          </ol>
          <p>
            For flooring, add a waste allowance on top: 300 sq ft with 10%
            waste is 330 sq ft to buy. The{" "}
            <Link href="/flooring-calculator">flooring calculator</Link>{" "}
            does that step for you.
          </p>

          <h2 id="reference-table">Common room sizes</h2>
          <p>
            Area and square yards for standard rooms and lots, exact
            arithmetic:
          </p>
          <table>
            <thead>
              <tr>
                <th>Size</th>
                <th>Square feet</th>
                <th>Square yards</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>10 x 10 ft</td>
                <td>100</td>
                <td>11.11</td>
              </tr>
              <tr>
                <td>12 x 12 ft</td>
                <td>144</td>
                <td>16.00</td>
              </tr>
              <tr>
                <td>15 x 20 ft</td>
                <td>300</td>
                <td>33.33</td>
              </tr>
              <tr>
                <td>20 x 20 ft</td>
                <td>400</td>
                <td>44.44</td>
              </tr>
              <tr>
                <td>30 x 40 ft</td>
                <td>1,200</td>
                <td>133.33</td>
              </tr>
            </tbody>
          </table>

          <h2 id="formulas">The formulas</h2>
          <h3>Area</h3>
          <p>
            <strong>Rectangle: A = L x W</strong> ·{" "}
            <strong>Triangle: A = 0.5 x base x height</strong> ·{" "}
            <strong>Circle: A = pi x r squared</strong> - all in feet.
          </p>
          <h3>Feet and inches</h3>
          <p>
            <strong>Decimal feet = feet + (inches / 12)</strong> - exact.
          </p>
          <h3>Conversions (exact)</h3>
          <p>
            <strong>Sq yd = sq ft / 9</strong> ·{" "}
            <strong>Acres = sq ft / 43,560</strong> ·{" "}
            <strong>Sq m = sq ft x 0.092903</strong>.
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
            href: "/flooring-calculator",
            title: "Flooring Calculator",
            desc: "Box counts for laminate, vinyl plank, and hardwood with layout waste.",
          },
          {
            href: "/paint-calculator",
            title: "Paint Calculator",
            desc: "Gallons for rooms, walls, and exteriors, doors and windows subtracted.",
          },
          {
            href: "/tile-calculator",
            title: "Tile Calculator",
            desc: "Tiles, waste, and boxes for floors.",
          },
          {
            href: "/sod-calculator",
            title: "Sod Calculator",
            desc: "Sod rolls and pallets to cover your lawn area, with waste allowance.",
          },
        ]}
      />
    </article>
  );
}
