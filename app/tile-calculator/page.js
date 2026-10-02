import Link from "next/link";
import TileCalculator from "@/components/TileCalculator";
import AdSlot from "@/components/AdSlot";
import JsonLd from "@/components/JsonLd";
import AuthorByline from "@/components/AuthorByline";
import TableOfContents from "@/components/TableOfContents";
import RelatedCalculators from "@/components/RelatedCalculators";
import { SITE_URL, SITE_NAME } from "@/lib/siteConfig";

export const metadata = {
  title: "Tile Calculator: How Many Tiles Do I Need (With Waste & Boxes)",
  description:
    "Free tile calculator: enter your room size and tile size to get the tile count with waste allowance plus how many boxes to buy — with a worked 10×12 ft example.",
  alternates: {
    canonical: `${SITE_URL}/tile-calculator`,
  },
  openGraph: {
    title: "Tile Calculator: How Many Tiles Do I Need",
    description:
      "Tile counts with waste allowance and box quantities for any floor — plus a tiles-per-100-sq-ft chart.",
    url: `${SITE_URL}/tile-calculator`,
    type: "article",
  },
};

const PAGE_URL = `${SITE_URL}/tile-calculator`;

const FAQ_ITEMS = [
  {
    q: "How many tiles do I need for a 10×12 ft room?",
    a: "120 sq ft. With 12×24″ tiles (2 sq ft each): 120 ÷ 2 = 60 tiles × 1.10 (10% waste) = 66 tiles. At 8 tiles per box, that's 66 ÷ 8 = 8.25 → 9 boxes.",
  },
  {
    q: "Should I use 10% or 15% waste?",
    a: "10% is standard for a straight lay in a rectangular room. Choose 15% for diagonal layouts, large-format tile, or rooms with many corners and cuts — every cut risks a broken tile.",
  },
  {
    q: "How do I measure an L-shaped room?",
    a: "Split it into rectangles, calculate each area separately, and add them. Never guess the area of an irregular room — measure each rectangle's length and width, then sum the square footage before entering it here.",
  },
  {
    q: "Why buy extra tiles beyond the waste allowance?",
    a: "For future repairs. Tile dye lots vary in shade between production runs, so a cracked tile replaced a year later may not match. The waste allowance usually leaves spares — keep them, labeled, from the same lot.",
  },
  {
    q: "How many tiles come in a box?",
    a: "It varies by tile size and manufacturer — check the box or product listing and enter it in the calculator. Larger tiles mean fewer per box; the calculator converts your tile count into boxes automatically.",
  },
  {
    q: "Does grout line width change the tile count?",
    a: "Barely. Grout joints are typically 1/8″–1/4″ and their area is absorbed by the waste allowance. Don't shrink your order to account for grout — the 10–15% allowance already covers it.",
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
    { "@type": "ListItem", position: 2, name: "Tile Calculator", item: PAGE_URL },
  ],
};

const TOC_ITEMS = [
  { id: "worked-example", label: "Worked example" },
  { id: "coverage-chart", label: "Tiles per 100 sq ft chart" },
  { id: "formulas", label: "The formulas" },
  { id: "faqs", label: "Frequently asked questions" },
];

export default function TileCalculatorPage() {
  return (
    <article className="mx-auto max-w-content px-4 py-10 sm:px-6">
      <JsonLd data={faqJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <nav aria-label="Breadcrumb" className="mb-4 text-sm text-slate-500">
        <Link href="/">Home</Link> <span aria-hidden="true">›</span>{" "}
        <span aria-current="page">Tile Calculator</span>
      </nav>

      <p className="eyebrow">Free calculator</p>
      <h1 className="mt-2 max-w-3xl text-3xl sm:text-4xl">
        Tile Calculator: How Many Tiles Do I Need?
      </h1>
      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-600">
        Tiles are sold by the box, priced per tile or per square foot, and
        your room is measured in feet and inches. Enter your floor area and
        tile size for a tile count with waste allowance plus exactly how
        many boxes to buy. No sign-up; the math runs entirely in your
        browser.
      </p>
      <div className="mt-4">
        <AuthorByline />
      </div>

      <div className="mt-8">
        <TileCalculator />
      </div>

      <AdSlot label="Advertisement" className="my-8 h-28" />

      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <TableOfContents items={TOC_ITEMS} />
          </div>
        </aside>

        <div className="prose-hmb max-w-3xl">
          <h2 id="worked-example">Worked example: 10×12 ft room, 12×24″ tile</h2>
          <p>Full arithmetic, step by step:</p>
          <ol>
            <li>
              <strong>Floor area:</strong> 10 ft × 12 ft ={" "}
              <strong>120 sq ft</strong>
            </li>
            <li>
              <strong>Tile area:</strong> 12 × 24 = 288 sq in ÷ 144 ={" "}
              <strong>2 sq ft per tile</strong>
            </li>
            <li>
              <strong>Exact tiles:</strong> 120 ÷ 2 = <strong>60 tiles</strong>
            </li>
            <li>
              <strong>With 10% waste:</strong> 60 × 1.10 = 66 →{" "}
              <strong>66 tiles</strong>
            </li>
            <li>
              <strong>Boxes:</strong> 66 ÷ 8 per box = 8.25 →{" "}
              <strong>9 boxes</strong>
            </li>
          </ol>

          <h2 id="coverage-chart">Chart: tiles per 100 sq ft</h2>
          <p>
            Tiles needed per 100 sq ft at common sizes, with 10% waste
            included (exact arithmetic, rounded up):
          </p>
          <table>
            <thead>
              <tr>
                <th>Tile size</th>
                <th>Sq ft per tile</th>
                <th>Tiles per 100 sq ft</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>12″ × 12″</td>
                <td>1</td>
                <td>110</td>
              </tr>
              <tr>
                <td>12″ × 24″</td>
                <td>2</td>
                <td>55</td>
              </tr>
              <tr>
                <td>18″ × 18″</td>
                <td>2.25</td>
                <td>49</td>
              </tr>
              <tr>
                <td>24″ × 24″</td>
                <td>4</td>
                <td>28</td>
              </tr>
            </tbody>
          </table>

          <h2 id="formulas">The formulas</h2>
          <h3>Floor area</h3>
          <p>
            <strong>A = L × W</strong> — in feet. Split L-shaped rooms into
            rectangles and add the areas.
          </p>
          <h3>Tile area</h3>
          <p>
            <strong>Tile sq ft = (length in inches × width in inches) ÷ 144</strong> —
            exact, since one square foot is 144 square inches.
          </p>
          <h3>Tiles and boxes</h3>
          <p>
            <strong>Tiles = ⌈ A ÷ tile sq ft × (1 + waste) ⌉</strong>, then{" "}
            <strong>Boxes = ⌈ tiles ÷ tiles per box ⌉</strong>. Both always
            rounded up — partial tiles and boxes don&apos;t exist at the
            register.
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
            desc: "Gallons for the walls around that new floor.",
          },
          {
            href: "/drywall-calculator",
            title: "Drywall Calculator",
            desc: "Sheets, mud, and tape for room walls.",
          },
          {
            href: "/concrete-calculator",
            title: "Concrete Calculator",
            desc: "Cubic yards for the slab under the tile.",
          },
        ]}
      />
    </article>
  );
}
