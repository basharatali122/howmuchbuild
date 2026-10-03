import Link from "next/link";
import AdSlot from "@/components/AdSlot";
import JsonLd from "@/components/JsonLd";
import AuthorByline from "@/components/AuthorByline";
import TableOfContents from "@/components/TableOfContents";
import { SITE_URL, SITE_NAME } from "@/lib/siteConfig";

export const metadata = {
  title: "How Much Does It Cost to Paint a Room? (2026 Cost Ranges)",
  description:
    "Typical US cost ranges to paint a room: paint per gallon, primer, supplies, what drives the price, DIY vs. pro per-room bands, and a worked 12×12 ft example.",
  alternates: {
    canonical: `${SITE_URL}/guides/paint-cost-guide`,
  },
  openGraph: {
    title: `How Much Does It Cost to Paint a Room? | ${SITE_NAME} Guides`,
    description:
      "Typical price ranges for painting a room — paint, primer, supplies, DIY vs. pro.",
    url: `${SITE_URL}/guides/paint-cost-guide`,
    type: "article",
  },
};

const PAGE_URL = `${SITE_URL}/guides/paint-cost-guide`;
const GUIDES_URL = `${SITE_URL}/guides`;

const TOC_ITEMS = [
  { id: "quick-answer", label: "Quick answer: typical cost ranges" },
  { id: "cost-factors", label: "What drives the price" },
  { id: "worked-example", label: "Worked example: 12×12 ft room" },
  { id: "save-money", label: "How to keep the cost down" },
  { id: "faqs", label: "Frequently asked questions" },
];

const FAQ_ITEMS = [
  {
    q: "How much does it cost to paint a 12×12 room?",
    a: "As a typical range: $100–$280 DIY (paint, primer if needed, and supplies) or $300–$800 professionally painted. Two coats on ~340 sq ft of wall takes about 2 gallons of paint. Prices vary widely by region, paint grade, and how much prep the walls need.",
  },
  {
    q: "How many gallons of paint do I need for one room?",
    a: "Figure roughly 350–400 sq ft per gallon per coat. A standard 12×12 room with 8-ft ceilings has about 340 sq ft of wall after subtracting a door and window — so one gallon per coat, and two coats means two gallons. Our paint calculator does this math with your exact dimensions.",
  },
  {
    q: "Is it cheaper to paint yourself or hire a pro?",
    a: "DIY is almost always cheaper in dollars — typically $100–$300 per room in materials versus $300–$900 for a pro. A pro wins on speed, tall ceilings, damaged walls needing repair, and finishes where brush marks show. If your time is the constraint rather than the budget, get quotes.",
  },
  {
    q: "Do I need primer?",
    a: "Usually yes on new drywall, patched areas, stains, or dramatic color changes (dark to light especially). One coat of primer typically costs $20–$40 per gallon and makes the topcoat cover in fewer coats — skipping it on bare drywall often costs you an extra coat of expensive paint instead.",
  },
  {
    q: "Why do painting quotes vary so much?",
    a: "Prep is the hidden variable. A quote that includes patching, sanding, caulking, and two full coats will beat a cheap one-coat quote on durability every time. Paint grade matters too — contractor-grade and premium paints can differ 2× per gallon. Always compare what's included, coat count, and the paint line by name.",
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
    { "@type": "ListItem", position: 3, name: "How Much Does It Cost to Paint a Room?", item: PAGE_URL },
  ],
};

export default function PaintCostGuide() {
  return (
    <article className="mx-auto max-w-content px-4 py-10 sm:px-6">
      <JsonLd data={faqJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <nav aria-label="Breadcrumb" className="mb-4 text-sm text-slate-500">
        <Link href="/">Home</Link> <span aria-hidden="true">›</span>{" "}
        <Link href="/guides">Guides</Link> <span aria-hidden="true">›</span>{" "}
        <span aria-current="page">Paint Cost Guide</span>
      </nav>

      <p className="eyebrow">Cost guide</p>
      <h1 className="mt-2 max-w-3xl text-3xl sm:text-4xl">
        How Much Does It Cost to Paint a Room?
      </h1>
      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-600">
        A room can cost $100 or $900 to paint depending on who holds the
        roller, how many coats the walls need, and what&apos;s already on
        them. Here are the typical US price ranges, what drives them, and a
        worked example for a 12×12 ft room.
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
          US ranges reported by painters and home-improvement sources.
          Actual prices vary widely by region, room condition, and paint
          grade — use them to evaluate quotes, not replace them.
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
              <td>Wall paint (per gallon)</td>
              <td>$25–$70</td>
            </tr>
            <tr>
              <td>Primer (per gallon)</td>
              <td>$20–$40</td>
            </tr>
            <tr>
              <td>Supplies (rollers, tape, drop cloths…)</td>
              <td>$40–$100</td>
            </tr>
            <tr>
              <td>DIY, per room</td>
              <td>$100–$300</td>
            </tr>
            <tr>
              <td>Pro, per room</td>
              <td>$300–$900</td>
            </tr>
          </tbody>
        </table>
        <p>
          Paint itself is only part of the story — for a DIY job, supplies
          and primer can rival the paint cost. For a pro job,{" "}
          <strong>labor is most of the price</strong>: the paint on the
          wall is often the cheapest line item on the quote.
        </p>

        <AdSlot label="Advertisement" className="my-8 h-28" />

        <h2 id="cost-factors">What drives the price</h2>
        <ul>
          <li>
            <strong>Room size.</strong> Paint need scales with wall area, not
            floor area — an 8-ft ceiling vs. a 10-ft ceiling changes the
            math noticeably.
          </li>
          <li>
            <strong>Coats.</strong> Two coats is the standard for even
            color; one coat over a similar existing color can work, while
            dramatic color changes sometimes need three.
          </li>
          <li>
            <strong>Paint grade.</strong> Contractor-grade vs. premium
            paints can differ 2× per gallon. Better paint covers better and
            lasts longer — cheap paint that needs a third coat isn&apos;t
            cheap.
          </li>
          <li>
            <strong>Primer needs.</strong> New drywall, patches, stains, and
            dark-to-light changes need primer. Previously painted walls in
            good shape usually don&apos;t.
          </li>
          <li>
            <strong>Ceilings and trim.</strong> Including the ceiling or
            repainting trim adds paint, time, and cutting-in work — quotes
            often price these separately.
          </li>
          <li>
            <strong>Wall condition.</strong> Patching, sanding, and caulking
            are labor hours. Smooth, clean walls are the cheapest starting
            point.
          </li>
          <li>
            <strong>Region.</strong> Pro labor rates vary enormously by
            market — the same room can cost double in a high-cost metro.
          </li>
        </ul>

        <h2 id="worked-example">Worked example: 12×12 ft room, 8-ft ceiling</h2>
        <ol>
          <li>
            <strong>Wall area:</strong> 2 × (12 + 12) × 8 = 384 sq ft,
            minus roughly 40 sq ft for a door and a window ={" "}
            <strong>~344 sq ft</strong> to paint.
          </li>
          <li>
            <strong>Paint:</strong> ~344 sq ft at 350–400 sq ft per gallon
            per coat = 1 gallon per coat → <strong>2 gallons</strong> for
            two coats, at a typical $30–$60/gal ={" "}
            <strong>$60–$120</strong>.
          </li>
          <li>
            <strong>Primer (if needed):</strong> 1 gallon at $20–$40 ={" "}
            <strong>$20–$40</strong>.
          </li>
          <li>
            <strong>Supplies:</strong> roller covers, brush, tape, drop
            cloths, tray — typically <strong>$40–$80</strong> for one room
            (less if you already own the basics).
          </li>
          <li>
            <strong>DIY total:</strong> roughly <strong>$100–$240</strong>,
            or up to ~$280 with primer.
          </li>
          <li>
            <strong>Pro painted:</strong> a standard bedroom typically{" "}
            <strong>$300–$800</strong> including paint and prep.
          </li>
        </ol>
        <p>
          Get your exact gallons with our{" "}
          <Link href="/paint-calculator">paint calculator</Link> — it
          subtracts doors and windows and compares coat counts for you.
        </p>

        <h2 id="save-money">How to keep the cost down</h2>
        <ul>
          <li>
            <strong>Prime instead of triple-coating.</strong> One coat of
            primer plus two of paint beats three coats of expensive paint.
          </li>
          <li>
            <strong>Do the prep yourself.</strong> Patching, sanding, and
            taping are the labor-heavy, skill-light parts — even if you
            hire the rolling out.
          </li>
          <li>
            <strong>Buy mid-grade paint.</strong> The sweet spot is above
            contractor-grade and below designer lines — better coverage per
            dollar.
          </li>
          <li>
            <strong>Keep colors close.</strong> Staying near the existing
            color can save a full coat.
          </li>
          <li>
            <strong>Reuse supplies across rooms.</strong> Brushes, trays,
            and drop cloths amortize fast over a whole house.
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
