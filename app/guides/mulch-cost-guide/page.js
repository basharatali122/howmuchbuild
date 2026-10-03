import Link from "next/link";
import AdSlot from "@/components/AdSlot";
import JsonLd from "@/components/JsonLd";
import AuthorByline from "@/components/AuthorByline";
import TableOfContents from "@/components/TableOfContents";
import { SITE_URL, SITE_NAME } from "@/lib/siteConfig";

export const metadata = {
  title: "How Much Does Mulch Cost? (2026 Cost Ranges)",
  description:
    "Typical US mulch cost ranges: bulk per cubic yard vs. bagged, delivery fees and minimums, how depth changes the price, DIY vs. pro spreading, and a worked 500 sq ft example.",
  alternates: {
    canonical: `${SITE_URL}/guides/mulch-cost-guide`,
  },
  openGraph: {
    title: `How Much Does Mulch Cost? | ${SITE_NAME} Guides`,
    description:
      "Typical price ranges for mulch — bulk vs. bags, delivery, and what depth really costs.",
    url: `${SITE_URL}/guides/mulch-cost-guide`,
    type: "article",
  },
};

const PAGE_URL = `${SITE_URL}/guides/mulch-cost-guide`;
const GUIDES_URL = `${SITE_URL}/guides`;

const TOC_ITEMS = [
  { id: "quick-answer", label: "Quick answer: typical cost ranges" },
  { id: "cost-factors", label: "What drives the price" },
  { id: "worked-example", label: "Worked example: 500 sq ft at 3″ deep" },
  { id: "save-money", label: "How to keep the cost down" },
  { id: "faqs", label: "Frequently asked questions" },
];

const FAQ_ITEMS = [
  {
    q: "How much does it cost to mulch 500 sq ft?",
    a: "As a typical range: $175–$375 DIY (about 5 cubic yards of bulk mulch plus delivery) or $350–$750 professionally installed. The big variable is bulk vs. bagged — bags cost far more per yard for a bed this size. Prices vary widely by region, mulch type, and delivery distance.",
  },
  {
    q: "Is bulk or bagged mulch cheaper?",
    a: "Bulk wins once you need around a cubic yard or more. A cubic yard of bulk mulch typically costs $30–$65, while the same volume in 2 cu ft bags (about 14 bags) typically costs $45–$85 — plus you skip hauling dozens of bags. For tiny beds under half a yard, bags are more practical despite the higher per-yard price.",
  },
  {
    q: "How much does mulch delivery cost?",
    a: "Delivery typically runs $30–$75 as a flat fee, and many suppliers deliver free above a minimum order — commonly 3–5 cubic yards. Minimum order sizes are common too, so a tiny 1-yard order can carry a disproportionate delivery fee. Splitting a truckload with a neighbor is the classic workaround.",
  },
  {
    q: "Does mulch depth really change the cost?",
    a: "Directly — doubling the depth doubles the material. Three inches is the usual sweet spot: enough to suppress weeds and hold moisture. Going to 4 inches adds about a third more material cost with little extra benefit, and very deep mulch can actually harm plants by keeping trunks and stems too wet.",
  },
  {
    q: "How much does professional mulch installation cost?",
    a: "As a typical all-in range: $70–$150 per cubic yard, material and labor included. A 5-yard job therefore lands around $350–$750. Pros make sense for large beds, steep slopes, or when the old mulch needs clearing first — spreading is simple but genuinely tiring work at scale.",
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
    { "@type": "ListItem", position: 3, name: "How Much Does Mulch Cost?", item: PAGE_URL },
  ],
};

export default function MulchCostGuide() {
  return (
    <article className="mx-auto max-w-content px-4 py-10 sm:px-6">
      <JsonLd data={faqJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <nav aria-label="Breadcrumb" className="mb-4 text-sm text-slate-500">
        <Link href="/">Home</Link> <span aria-hidden="true">›</span>{" "}
        <Link href="/guides">Guides</Link> <span aria-hidden="true">›</span>{" "}
        <span aria-current="page">Mulch Cost Guide</span>
      </nav>

      <p className="eyebrow">Cost guide</p>
      <h1 className="mt-2 max-w-3xl text-3xl sm:text-4xl">
        How Much Does Mulch Cost?
      </h1>
      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-600">
        Mulch pricing looks simple until the delivery truck shows up: bulk
        vs. bags, depth math, minimums, and delivery fees all move the
        total. Here are the typical US price ranges, what drives them, and a
        worked example for a 500 sq ft bed.
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
          US ranges reported by suppliers and home-improvement sources.
          Actual prices vary widely by region, mulch type, and delivery
          distance — use them to evaluate quotes, not replace them.
        </div>

        <h2 id="quick-answer">Quick answer: typical mulch cost ranges</h2>
        <table>
          <thead>
            <tr>
              <th>Option</th>
              <th>Typical range</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Bulk mulch (per cubic yard)</td>
              <td>$30–$65</td>
            </tr>
            <tr>
              <td>Bagged mulch (2 cu ft bag)</td>
              <td>$3–$6</td>
            </tr>
            <tr>
              <td>Delivery (flat fee)</td>
              <td>$0–$75</td>
            </tr>
            <tr>
              <td>DIY, all-in</td>
              <td>$30–$65 per yard + delivery</td>
            </tr>
            <tr>
              <td>Pro installed, all-in</td>
              <td>$70–$150 per yard</td>
            </tr>
          </tbody>
        </table>
        <p>
          The single biggest lever is <strong>bulk vs. bags</strong>. One
          cubic yard equals about fourteen 2 cu ft bags — so $45/yard bulk
          mulch becomes $60–$85 in bags for the same coverage. Delivery is
          the second lever: a $50 delivery fee on a 1-yard order nearly
          doubles it, but disappears into the noise on a 10-yard order.
        </p>

        <AdSlot label="Advertisement" className="my-8 h-28" />

        <h2 id="cost-factors">What drives the price</h2>
        <ul>
          <li>
            <strong>Mulch type.</strong> Basic shredded hardwood or bark is
            the cheapest; dyed mulch costs more; cedar and specialty mulches
            (pine bark nuggets, rubber) sit at the top. The spread between
            basic and premium can easily be 2×.
          </li>
          <li>
            <strong>Bulk vs. bagged.</strong> Bags win on convenience and
            small jobs; bulk wins on price per yard for anything around a
            cubic yard or more.
          </li>
          <li>
            <strong>Depth.</strong> Cost scales directly with depth — 4
            inches costs a third more than 3 inches for the same bed. Most
            beds want 2–3 inches; more is usually wasted money.
          </li>
          <li>
            <strong>Delivery and minimums.</strong> Suppliers commonly set
            2–5 yard minimums for delivery and waive the fee above a
            threshold. Small orders pay the worst per-yard delivered price.
          </li>
          <li>
            <strong>DIY vs. pro spreading.</strong> Spreading is unskilled
            but physical — a pro crew saves your weekend at roughly double
            the material cost, all-in.
          </li>
          <li>
            <strong>Region.</strong> Mulch is heavy and local. Prices track
            local supply (bark regions are cheap) and local labor rates.
          </li>
        </ul>

        <h2 id="worked-example">
          Worked example: 500 sq ft bed at 3″ deep
        </h2>
        <ol>
          <li>
            <strong>Volume:</strong> 500 × (3 ÷ 12) = 125 cu ft = 4.63 cu
            yd → order <strong>5 cubic yards</strong> (round up; beds are
            never perfectly rectangular).
          </li>
          <li>
            <strong>Bulk:</strong> 5 yd at a typical $35–$60/yd ={" "}
            <strong>$175–$300</strong>, plus delivery (often $0–$50 at this
            size if you hit a free-delivery minimum).
          </li>
          <li>
            <strong>Bagged:</strong> 125 cu ft ÷ 2 = 62.5 →{" "}
            <strong>63 bags</strong> at $3–$6 each ={" "}
            <strong>$189–$378</strong> — and a long afternoon of hauling.
          </li>
          <li>
            <strong>DIY total:</strong> roughly <strong>$175–$375</strong>{" "}
            bulk delivered.
          </li>
          <li>
            <strong>Pro installed:</strong> 5 yd × $70–$150 ={" "}
            <strong>$350–$750</strong> all-in.
          </li>
        </ol>
        <p>
          Size your exact quantity with our{" "}
          <Link href="/mulch-calculator">mulch calculator</Link> before you
          call the supplier — and see our{" "}
          <Link href="/guides/mulch-installation-guide">
            mulch installation guide
          </Link>{" "}
          for bed prep and spreading technique.
        </p>

        <h2 id="save-money">How to keep the cost down</h2>
        <ul>
          <li>
            <strong>Buy bulk past the break-even.</strong> Around a cubic
            yard, bulk beats bags — do the per-yard math before defaulting
            to bags.
          </li>
          <li>
            <strong>Hit free-delivery minimums.</strong> One 5-yard delivery
            beats two 2.5-yard deliveries with two fees.
          </li>
          <li>
            <strong>Split with a neighbor.</strong> The classic way to beat
            minimums and delivery fees on a medium bed.
          </li>
          <li>
            <strong>Stick to 3 inches.</strong> Deeper rarely helps the
            plants and always costs more.
          </li>
          <li>
            <strong>Refresh, don&apos;t replace.</strong> A 1-inch top-up
            each spring beats a full 3-inch redo every year.
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
