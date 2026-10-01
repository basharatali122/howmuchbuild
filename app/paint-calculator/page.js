import Link from "next/link";
import PaintCalculator from "@/components/PaintCalculator";
import AdSlot from "@/components/AdSlot";
import JsonLd from "@/components/JsonLd";
import AuthorByline from "@/components/AuthorByline";
import TableOfContents from "@/components/TableOfContents";
import RelatedCalculators from "@/components/RelatedCalculators";
import { SITE_URL, SITE_NAME } from "@/lib/siteConfig";

export const metadata = {
  title: "Paint Calculator — How Many Gallons Do I Need?",
  description:
    "Free paint calculator: enter room dimensions or exterior wall area, doors and windows, and coats to get exact gallons needed (350 sq ft/gal default), with a per-coat breakdown.",
  alternates: {
    canonical: `${SITE_URL}/paint-calculator`,
  },
  openGraph: {
    title: "Paint Calculator — How Many Gallons Do I Need?",
    description:
      "Room or exterior walls, doors and windows subtracted, 1 or 2 coats — get your gallon count rounded up, with a per-coat breakdown.",
    url: `${SITE_URL}/paint-calculator`,
    type: "article",
  },
};

const PAGE_URL = `${SITE_URL}/paint-calculator`;

const FAQ_ITEMS = [
  {
    q: "How much paint do I need for a 12×12 room?",
    a: "Walls are 2 × (12 + 12) × 8 = 384 sq ft; minus one door (~21) and two windows (~30) leaves 333 paintable sq ft. That's 1 gallon per coat at 350 sq ft/gal — 2 gallons for the standard two coats.",
  },
  {
    q: "How much does one gallon of paint cover?",
    a: "Most interior paints print 350–400 sq ft per gallon on the can. We use 350 as the default because it's the conservative end — textured, porous, or unprimed surfaces land closer to 350, smooth primed surfaces closer to 400.",
  },
  {
    q: "Should I subtract doors and windows?",
    a: "Yes. A typical interior door is about 3×7 ft (21 sq ft) and a typical window about 15 sq ft — those are the typical allowances the calculator uses. Trim and casing around them take paint too, which is one reason the result rounds up.",
  },
  {
    q: "One coat or two?",
    a: "Two coats is the usual standard for even coverage, true color, and durability. One coat often works over a same-color repaint in good condition, but going dark-to-light or light-to-dark almost always needs two.",
  },
  {
    q: "Do I need primer?",
    a: "As general guidance: prime bare drywall, repaired/patchy spots, and dramatic color changes. Primer seals the surface so the topcoat covers evenly — skipping it on bare drywall often means buying a third coat of paint instead. Always check the product label for your situation.",
  },
  {
    q: "Does ceiling paint use the same math?",
    a: "The same math, yes — ceiling area is just length × width. But buy actual ceiling paint for it: it's formulated flatter and thicker to hide imperfections, and wall paint drips more overhead.",
  },
  {
    q: "Should I buy extra paint?",
    a: "The rounding-up already builds in a margin, which usually leaves enough for touch-ups. If the room has heavy texture or you're changing color drastically, consider one extra quart for the future — cans can be matched later, but batch-to-batch tint can vary slightly.",
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
      name: "Paint Calculator",
      item: PAGE_URL,
    },
  ],
};

const TOC_ITEMS = [
    { id: "calculator", label: "Calculator" },
    { id: "worked-example", label: "Worked example" },
    { id: "gallons-chart", label: "Gallons chart" },
    { id: "formulas", label: "Formulas" },
    { id: "faqs", label: "FAQs" }
];

const RELATED_ITEMS = [
    {
      href: "/drywall-calculator",
      title: "Drywall Calculator",
      desc: "Sheets, screws, mud, and tape for the walls you're painting.",
    },
    {
      href: "/tile-calculator",
      title: "Tile Calculator",
      desc: "Tile and box counts for bathroom and kitchen floors.",
    },
    {
      href: "/deck-calculator",
      title: "Deck Calculator",
      desc: "Stain coverage planning for decks and outdoor wood.",
    }
];

export default function PaintCalculatorPage() {
  return (
    <article className="mx-auto max-w-content px-4 py-10 sm:px-6">
      <JsonLd data={faqJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <nav aria-label="Breadcrumb" className="mb-4 text-sm text-slate-500">
        <Link href="/">Home</Link> <span aria-hidden="true">›</span>{" "}
        <span aria-current="page">Paint Calculator</span>
      </nav>

      <p className="eyebrow">Free calculator</p>
      <h1 className="max-w-3xl text-3xl sm:text-4xl">
        Paint Calculator: How Many Gallons Do You Need?
      </h1>
      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-600">
        Enter a room&apos;s dimensions — doors and windows are subtracted with
        typical allowances — or enter exterior wall area directly. Pick one or
        two coats and get your gallon count, always rounded up, with a
        per-coat breakdown. The math runs entirely in your browser.
      </p>

      <div className="mt-4">
        <AuthorByline />
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_260px]">
        <div className="min-w-0">
          <PaintCalculator />

          <AdSlot label="Advertisement" className="my-8 h-28" />

          <div className="prose-hmb mt-12 max-w-3xl">
        <h2 id="worked-example">Worked example: 12×15 ft room, 8 ft ceiling, 2 coats</h2>
        <p>Full arithmetic for a standard bedroom repaint:</p>
        <ol>
          <li>
            <strong>Wall area:</strong> 2 × (12 + 15) × 8 ={" "}
            <strong>432 sq ft</strong>
          </li>
          <li>
            <strong>Openings (typical):</strong> 1 × 21 + 2 × 15 ={" "}
            <strong>51 sq ft</strong>
          </li>
          <li>
            <strong>Paintable:</strong> 432 − 51 = <strong>381 sq ft</strong>
          </li>
          <li>
            <strong>Per coat:</strong> 381 ÷ 350 = <strong>1.09 gal</strong>
          </li>
          <li>
            <strong>Two coats:</strong> 381 × 2 = 762; 762 ÷ 350 = 2.18 →
            round up = <strong>3 gallons</strong>
          </li>
        </ol>

        <h2 id="gallons-chart">Gallons chart at 350 sq ft per gallon</h2>
        <p>Buy quantities, always rounded up:</p>
        <table>
          <thead>
            <tr>
              <th>Paintable area</th>
              <th>1 coat</th>
              <th>2 coats</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>100 sq ft</td>
              <td>1 gal</td>
              <td>1 gal</td>
            </tr>
            <tr>
              <td>250 sq ft</td>
              <td>1 gal</td>
              <td>2 gal</td>
            </tr>
            <tr>
              <td>381 sq ft</td>
              <td>2 gal</td>
              <td>3 gal</td>
            </tr>
            <tr>
              <td>500 sq ft</td>
              <td>2 gal</td>
              <td>3 gal</td>
            </tr>
            <tr>
              <td>750 sq ft</td>
              <td>3 gal</td>
              <td>5 gal</td>
            </tr>
            <tr>
              <td>1,000 sq ft</td>
              <td>3 gal</td>
              <td>6 gal</td>
            </tr>
          </tbody>
        </table>

        <h2 id="quick-answers">Quick answers for common rooms (2 coats, 8 ft ceilings)</h2>
        <p>Assumes 1 door and 2 windows subtracted:</p>
        <table>
          <thead>
            <tr>
              <th>Room</th>
              <th>Paintable</th>
              <th>Gallons (2 coats)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>10×10 ft</td>
              <td>269 sq ft</td>
              <td>2</td>
            </tr>
            <tr>
              <td>12×12 ft</td>
              <td>333 sq ft</td>
              <td>2</td>
            </tr>
            <tr>
              <td>12×15 ft</td>
              <td>381 sq ft</td>
              <td>3</td>
            </tr>
            <tr>
              <td>15×20 ft, 9 ft ceiling</td>
              <td>579 sq ft</td>
              <td>4</td>
            </tr>
          </tbody>
        </table>

        <h2 id="primer">Do you need primer?</h2>
        <p>
          General guidance, not a hard rule: primer earns its keep on bare
          drywall, patched or repaired spots, stained surfaces, and dramatic
          color changes. It seals porous areas so the topcoat lays down
          evenly — without it, bare drywall drinks the first coat and you
          effectively pay for a third coat of finish paint anyway. Previously
          painted walls in good condition getting a similar color usually
          skip primer fine. When in doubt, read the product label: paint-and-
          primer combos exist, but they are not a substitute on truly bare
          surfaces.
        </p>

        <h2 id="formulas">The formulas</h2>
        <h3>Room mode</h3>
        <p>
          <strong>Wall area = 2 × (Length + Width) × Height</strong>, all in
          feet. <strong>Openings = doors × 21 + windows × 15</strong> (typical
          allowances). <strong>Paintable = wall area − openings.</strong>
        </p>
        <h3>Exterior mode</h3>
        <p>
          <strong>Paintable = sum of wall areas</strong>, measured and added
          directly. Subtract large openings, or let the round-up absorb them.
        </p>
        <h3>Gallons</h3>
        <p>
          <strong>
            Gallons = ⌈ (paintable × coats) ÷ coverage ⌉
          </strong>{" "}
          — always round up, never down. Default coverage 350 sq ft/gal, the
          conservative end of the 350–400 range printed on most cans.
        </p>

        <h2 id="faqs">Frequently asked questions</h2>
        {FAQ_ITEMS.map((f) => (
          <div key={f.q} className="mb-6">
            <h3 className="!mt-6">{f.q}</h3>
            <p>{f.a}</p>
          </div>
        ))}

        <h2 id="before-you-buy">Before you buy</h2>
        <p>
          Coverage on the can assumes ideal conditions, so the 350 default
          already protects you — don&apos;t &quot;save&quot; by picking the
          400 end unless the surface is smooth and primed. Buy all gallons for
          a room at once (tint can vary slightly between batches), and keep a
          little of the rounded-up extra for touch-ups: a stored, labeled can
          beats a color-match guess two years later.
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
