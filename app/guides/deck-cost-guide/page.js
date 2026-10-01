import Link from "next/link";
import AdSlot from "@/components/AdSlot";
import JsonLd from "@/components/JsonLd";
import AuthorByline from "@/components/AuthorByline";
import { SITE_URL, SITE_NAME } from "@/lib/siteConfig";

export const metadata = {
  title: "How Much Does a Deck Cost? (2026 Cost Ranges)",
  description:
    "Typical US deck cost ranges: wood vs. composite, installed vs. DIY prices per square foot, what drives the price, and a worked 12×16 ft example.",
  alternates: {
    canonical: `${SITE_URL}/guides/deck-cost-guide`,
  },
  openGraph: {
    title: `How Much Does a Deck Cost? | ${SITE_NAME} Guides`,
    description:
      "Typical price ranges for building a deck — wood vs. composite, and the factors that move your quote.",
    url: `${SITE_URL}/guides/deck-cost-guide`,
    type: "article",
  },
};

const PAGE_URL = `${SITE_URL}/guides/deck-cost-guide`;
const GUIDES_URL = `${SITE_URL}/guides`;

const FAQ_ITEMS = [
  {
    q: "How much does a 12×16 deck cost?",
    a: "As a typical range: a 192 sq ft pressure-treated wood deck runs $2,900–$6,700 installed ($15–$35/sq ft); the same deck in composite runs $5,800–$11,500 ($30–$60/sq ft). Railings, stairs, and height move you within — or beyond — those bands. Prices vary widely by region and site conditions.",
  },
  {
    q: "Is composite decking worth the extra cost?",
    a: "It depends on your horizon (guidance). Composite costs roughly double up front but needs no staining or sealing and resists rot and insects. If you'll keep the deck 15+ years and dislike maintenance, the lifetime math often favors composite; for a budget build or a short stay, pressure-treated wood wins.",
  },
  {
    q: "What is the cheapest way to build a deck?",
    a: "Build it yourself with pressure-treated lumber, keep it low to the ground (shorter posts, simpler footings, possibly no railing required by code), use a simple rectangular shape, and skip built-ins like benches and planters (guidance). DIY typically cuts the installed price roughly in half.",
  },
  {
    q: "Do I need a permit for a deck?",
    a: "Usually yes if it's attached to the house or above a certain height (often 30 inches, but it varies). Permits add a few hundred dollars and an inspection or two, but unpermitted decks cause real problems at resale and with insurance. Check your local building department early.",
  },
  {
    q: "Why are deck quotes so different from each other?",
    a: "Footings, railings, and stairs are the swing factors. A ground-level platform with no railing is a fundamentally cheaper structure than an elevated deck with stairs, railings, and concrete piers — make sure quotes describe the same structure before comparing them.",
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
    { "@type": "ListItem", position: 3, name: "How Much Does a Deck Cost?", item: PAGE_URL },
  ],
};

export default function DeckCostGuide() {
  return (
    <article className="mx-auto max-w-content px-4 py-10 sm:px-6">
      <JsonLd data={faqJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <nav aria-label="Breadcrumb" className="mb-4 text-sm text-slate-500">
        <Link href="/">Home</Link> <span aria-hidden="true">›</span>{" "}
        <Link href="/guides">Guides</Link> <span aria-hidden="true">›</span>{" "}
        <span aria-current="page">Deck Cost Guide</span>
      </nav>

      <p className="eyebrow">Cost guide</p>
      <h1 className="mt-2 max-w-3xl text-3xl sm:text-4xl">
        How Much Does a Deck Cost?
      </h1>
      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-600">
        Material choice is the biggest lever: a composite deck can cost
        double a pressure-treated one. Here are the typical US ranges for
        wood vs. composite, installed vs. DIY, plus what pushes any quote
        up or down.
      </p>
      <div className="mt-4">
        <AuthorByline />
      </div>

      <div className="prose-hmb mt-10 max-w-3xl">
        <div className="not-prose mb-8 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          <strong>Ranges, not quotes.</strong> All figures below are typical
          US ranges reported by contractors and home-improvement sources.
          Actual prices vary widely by region, site conditions, height, and
          finish level — use them to evaluate quotes, not replace them.
        </div>

        <h2>Quick answer: typical deck cost ranges</h2>
        <table>
          <thead>
            <tr>
              <th>Deck type</th>
              <th>Typical range (per sq ft, installed)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Pressure-treated wood</td>
              <td>$15–$35</td>
            </tr>
            <tr>
              <td>Composite / PVC</td>
              <td>$30–$60</td>
            </tr>
            <tr>
              <td>DIY materials, wood</td>
              <td>$8–$15</td>
            </tr>
            <tr>
              <td>DIY materials, composite</td>
              <td>$15–$30</td>
            </tr>
          </tbody>
        </table>
        <p>
          A classic 12×16 ft deck (192 sq ft) therefore runs roughly{" "}
          <strong>$2,900–$6,700 in wood</strong> or{" "}
          <strong>$5,800–$11,500 in composite</strong>, installed. DIY cuts
          those figures roughly in half — but a deck is structural work, so
          be honest about your skill level before skipping the pro.
        </p>

        <AdSlot label="Advertisement" className="my-8 h-28" />

        <h2>What drives the price</h2>
        <ul>
          <li>
            <strong>Decking material.</strong> The single biggest lever —
            composite boards cost 2–3× pressure-treated lumber per board.
          </li>
          <li>
            <strong>Height.</strong> Elevated decks need taller posts,
            deeper footings, railings, and stairs. A ground-level platform
            skips most of that.
          </li>
          <li>
            <strong>Railings and stairs.</strong> Railing is surprisingly
            expensive per linear foot — cable, composite, or metal railings
            can rival the decking cost. Every stair flight adds framing and
            labor.
          </li>
          <li>
            <strong>Footings.</strong> Concrete piers below the frost line
            are non-negotiable in cold climates, and rocky or sloped sites
            make digging slow.
          </li>
          <li>
            <strong>Shape and extras.</strong> Rectangles are cheap; curves,
            multi-levels, built-in benches, and lighting are not.
          </li>
          <li>
            <strong>Permits and inspections.</strong> Usually a few hundred
            dollars — budget for them rather than skipping them.
          </li>
        </ul>

        <h2>Worked example: 12×16 ft wood deck</h2>
        <ol>
          <li>
            <strong>Area:</strong> 12 × 16 = <strong>192 sq ft</strong>.
          </li>
          <li>
            <strong>Materials takeoff:</strong> run your dimensions through
            our <Link href="/deck-calculator">deck calculator</Link> for
            boards, joists, posts, footings, and screws.
          </li>
          <li>
            <strong>DIY materials:</strong> 192 × $8–$15 ={" "}
            <strong>$1,540–$2,880</strong>.
          </li>
          <li>
            <strong>Pro installed:</strong> 192 × $15–$35 ={" "}
            <strong>$2,880–$6,720</strong> — before railings and stairs,
            which are often quoted separately.
          </li>
        </ol>

        <h2>Wood vs. composite: lifetime math</h2>
        <p>
          Pressure-treated wood needs staining or sealing every 2–3 years —
          figure a weekend and a few hundred dollars each cycle (guidance).
          Composite needs little more than washing. Over 15–20 years, the
          maintenance savings narrow the upfront gap considerably, and
          composite&apos;s fade/stain warranties add peace of mind. If you love
          the look and feel of real wood and don&apos;t mind the upkeep, wood
          remains the value choice.
        </p>

        <h2>Frequently asked questions</h2>
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
