import Link from "next/link";
import AdSlot from "@/components/AdSlot";
import JsonLd from "@/components/JsonLd";
import AuthorByline from "@/components/AuthorByline";
import TableOfContents from "@/components/TableOfContents";
import { SITE_URL, SITE_NAME } from "@/lib/siteConfig";

export const metadata = {
  title: "How Much Does Tile Flooring Cost? (2026 Cost Ranges)",
  description:
    "Typical US cost ranges for tile flooring: tile per square foot by material, setting materials, labor, what drives the price, DIY vs. pro per-square-foot bands, and a worked 10×12 ft example.",
  alternates: {
    canonical: `${SITE_URL}/guides/tile-cost-guide`,
  },
  openGraph: {
    title: `How Much Does Tile Flooring Cost? | ${SITE_NAME} Guides`,
    description:
      "Typical price ranges for tile flooring — tile, setting materials, labor, DIY vs. pro.",
    url: `${SITE_URL}/guides/tile-cost-guide`,
    type: "article",
    images: [
      {
        url:
          "/og?title=" +
          encodeURIComponent(`How Much Does Tile Flooring Cost? | ${SITE_NAME} Guides`) +
          "&sub=" +
          encodeURIComponent("Typical price ranges for tile flooring — tile, setting materials, labor, DIY vs. pro."),
        width: 1200,
        height: 630,
        alt: `How Much Does Tile Flooring Cost? | ${SITE_NAME} Guides`,
      },
    ],
  },
};

const PAGE_URL = `${SITE_URL}/guides/tile-cost-guide`;
const GUIDES_URL = `${SITE_URL}/guides`;

const TOC_ITEMS = [
  { id: "quick-answer", label: "Quick answer: typical cost ranges" },
  { id: "cost-factors", label: "What drives the price" },
  { id: "worked-example", label: "Worked example: 10×12 ft room" },
  { id: "save-money", label: "How to keep the cost down" },
  { id: "faqs", label: "Frequently asked questions" },
];

const FAQ_ITEMS = [
  {
    q: "How much does it cost to tile a 10×12 room?",
    a: "As a typical range: $300–$1,000 DIY (tile, thinset, grout, and setting materials) or $1,500–$2,800 professionally installed for standard ceramic or porcelain in a straight-set pattern. Natural stone or complex patterns push both numbers higher. Prices vary widely by region, tile choice, and subfloor condition.",
  },
  {
    q: "What is the cheapest tile flooring?",
    a: "Standard ceramic tile in a straight-set pattern is the cheapest option — often $5–$15 per square foot installed, or just $1–$4 per square foot for the tile itself if you DIY. Porcelain costs more per tile ($3–$8 per sq ft) but lasts longer and handles moisture better.",
  },
  {
    q: "Is porcelain tile more expensive to install than ceramic?",
    a: "Yes — typically 20–40% more. Porcelain costs more per tile and takes more labor because it's harder and denser, so cuts and drilling go slower. The payoff is better durability, stain resistance, and water resistance — which is why porcelain is the default choice for bathrooms and kitchens.",
  },
  {
    q: "Can I lay tile over my existing floor?",
    a: "Sometimes, but the existing floor must be clean, flat, firmly bonded, and rated to carry tile — usually over cement backer board, not directly over old vinyl or laminate. A pro should assess the subfloor first. Poor subfloor prep is the #1 cause of cracked tile and popped grout later.",
  },
  {
    q: "How much extra tile should I buy?",
    a: "Buy 10–15% extra beyond your measured area. Straight-set layouts need about 10% for cuts and breakage; diagonal and herringbone patterns need 15% or more because every edge row produces offcuts. Keep the leftovers — they're your repair stock for future chips.",
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
    { "@type": "ListItem", position: 2, name: "Guides", item: GUIDES_URL },
    { "@type": "ListItem", position: 3, name: "How Much Does Tile Flooring Cost?", item: PAGE_URL },
  ],
};

export default function TileCostGuide() {
  return (
    <article className="mx-auto max-w-content px-4 py-10 sm:px-6">
      <JsonLd data={faqJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <nav aria-label="Breadcrumb" className="mb-4 text-sm text-slate-500">
        <Link href="/">Home</Link> <span aria-hidden="true">›</span>{" "}
        <Link href="/guides">Guides</Link> <span aria-hidden="true">›</span>{" "}
        <span aria-current="page">Tile Cost Guide</span>
      </nav>

      <p className="eyebrow">Cost guide</p>
      <h1 className="mt-2 max-w-3xl text-3xl sm:text-4xl">
        How Much Does Tile Flooring Cost?
      </h1>
      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-600">
        Tile flooring can cost $300 or $3,000 for the same room depending on
        the tile you pick, the pattern you lay, and whether you or a pro
        sets it. Here are the typical US price ranges, what drives them,
        and a worked example for a 10×12 ft room.
      </p>
      <div className="mt-4">
        <AuthorByline />
      </div>

      <div className="mt-8 max-w-3xl">
        <TableOfContents items={TOC_ITEMS} />
      </div>

      <div className="prose-hmb mt-10 max-w-3xl">
        <div className="not-prose mb-8 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          <strong>Ranges, not quotes.</strong> All figures below are typical
          US ranges reported by installers and home-improvement sources.
          Actual prices vary widely by region, tile choice, pattern, and
          subfloor condition — use them to evaluate quotes, not replace
          them.
        </div>

        <h2 id="quick-answer">Quick answer: typical cost ranges</h2>
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Typical range</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Ceramic tile (material)</td>
              <td>$1–$4 / sq ft</td>
            </tr>
            <tr>
              <td>Porcelain tile (material)</td>
              <td>$3–$8 / sq ft</td>
            </tr>
            <tr>
              <td>Setting materials (thinset, grout, backer board…)</td>
              <td>$2–$5 / sq ft</td>
            </tr>
            <tr>
              <td>DIY, installed per sq ft</td>
              <td>$5–$12 / sq ft (materials)</td>
            </tr>
            <tr>
              <td>Pro, installed per sq ft (ceramic/porcelain)</td>
              <td>$10–$25 / sq ft</td>
            </tr>
            <tr>
              <td>Pro, installed per sq ft (natural stone)</td>
              <td>$20–$75 / sq ft</td>
            </tr>
          </tbody>
        </table>
        <p>
          The tile itself is only one line item. Setting materials,
          subfloor prep, and <strong>labor — roughly half the total on a
          pro job</strong> — are what move a $400 room toward $3,000.
          Labor alone commonly runs $3–$22 per sq ft depending on tile
          type, pattern complexity, and region.
        </p>

        <AdSlot label="Advertisement" className="my-8 h-28" />

        <h2 id="cost-factors">What drives the price</h2>
        <ul>
          <li>
            <strong>Tile material.</strong> Budget ceramic is the cheapest;
            porcelain costs more per tile but handles water and traffic
            better; natural stone and designer tile sit far above both.
          </li>
          <li>
            <strong>Tile size and pattern.</strong> Large-format tile is
            faster to lay but shows lippage on uneven floors; mosaics and
            herringbone patterns are slow, fiddly, and carry a labor
            premium — diagonal and herringbone add roughly 10–20% over a
            straight set.
          </li>
          <li>
            <strong>Subfloor condition.</strong> The floor must be level and
            sound. Leveling, subfloor repairs, or adding cement backer
            board can add $2–$10 per sq ft before a single tile is set.
          </li>
          <li>
            <strong>Old flooring removal.</strong> Ripping out old tile or
            flooring typically adds $1–$7 per sq ft, plus disposal.
          </li>
          <li>
            <strong>Cuts and obstacles.</strong> Irregular room shapes,
            vents, doorways, and fixtures mean more cuts — and cutting
            porcelain is slower work than cutting ceramic.
          </li>
          <li>
            <strong>Waste allowance.</strong> Buy 10% extra for straight
            sets, 15%+ for diagonal or herringbone. That margin is baked
            into every real quote.
          </li>
          <li>
            <strong>Region.</strong> Installer labor rates vary enormously
            by market — the same floor can cost double in a high-cost
            metro.
          </li>
        </ul>

        <h2 id="worked-example">Worked example: 10×12 ft room, porcelain, straight set</h2>
        <ol>
          <li>
            <strong>Floor area:</strong> 10 × 12 = <strong>120 sq ft</strong>.
          </li>
          <li>
            <strong>Tile (with 10% waste):</strong> 132 sq ft of porcelain
            at a typical $3–$8/sq ft = <strong>$400–$1,050</strong>.
          </li>
          <li>
            <strong>Setting materials:</strong> thinset, grout, backer board
            or membrane, spacers — roughly <strong>$240–$600</strong> for
            120 sq ft.
          </li>
          <li>
            <strong>DIY total:</strong> roughly <strong>$650–$1,650</strong>,
            plus tool rental (wet saw ~$50–$80/day) if you don&apos;t own
            one.
          </li>
          <li>
            <strong>Pro installed:</strong> at a typical $12–$20/sq ft for
            porcelain straight-set, roughly <strong>$1,450–$2,400</strong>
            all-in.
          </li>
        </ol>
        <p>
          Get your exact tile and box counts with our{" "}
          <Link href="/tile-calculator">tile calculator</Link> — it adds
          your waste allowance and converts to boxes for you.
        </p>

        <h2 id="save-money">How to keep the cost down</h2>
        <ul>
          <li>
            <strong>Choose ceramic over porcelain</strong> for dry, low-traffic
            areas — it&apos;s cheaper to buy and faster to cut.
          </li>
          <li>
            <strong>Stick to a straight set.</strong> The pattern is the
            cheapest part to change and one of the biggest labor levers.
          </li>
          <li>
            <strong>Do demo yourself.</strong> Removing old flooring is
            labor-heavy and skill-light — even if a pro sets the tile.
          </li>
          <li>
            <strong>Fix the subfloor before quoting.</strong> Leveling
            surprises found mid-job are billed at the worst possible time.
          </li>
          <li>
            <strong>Keep the leftovers.</strong> A box of spare tile is
            your insurance against discontinued lines when a tile chips
            years later.
          </li>
        </ul>

        <h2 id="faqs">Frequently asked questions</h2>
        {FAQ_ITEMS.map((f) => (
          <div key={f.q} className="mb-6">
            <h3 className="!mt-6">{f.q}</h3>
            <p>{f.a}</p>
          </div>
        ))}
      </div>
    </article>
  );
}
