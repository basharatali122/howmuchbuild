import Link from "next/link";
import DeckCalculator from "@/components/DeckCalculator";
import AdSlot from "@/components/AdSlot";
import JsonLd from "@/components/JsonLd";
import AuthorByline from "@/components/AuthorByline";
import TableOfContents from "@/components/TableOfContents";
import RelatedCalculators from "@/components/RelatedCalculators";
import { SITE_URL, SITE_NAME } from "@/lib/siteConfig";

export const metadata = {
  title: "Deck Calculator: Boards, Joists, Posts & Screws (Free)",
  description:
    "Free deck calculator: full material takeoff for your deck — decking boards, joists, rim boards, posts, footings, screws, and railing balusters, with step-by-step math.",
  alternates: {
    canonical: `${SITE_URL}/deck-calculator`,
  },
  openGraph: {
    title: "Deck Calculator: Boards, Joists, Posts & Screws (Free)",
    description:
      "Enter deck dimensions and get a complete material takeoff — boards, joists, posts, screws, and balusters — with the full arithmetic shown.",
    url: `${SITE_URL}/deck-calculator`,
    type: "article",
  },
};

const PAGE_URL = `${SITE_URL}/deck-calculator`;

const FAQ_ITEMS = [
  {
    q: "How many deck boards do I need for a 12×10 deck?",
    a: "With 5/4×6 decking (5.5″ face) and a ¼″ gap, a 12×10 ft deck needs 21 rows of boards across the 10-ft width (⌈120″ ÷ 5.75″⌉ = 21). At 12 ft per row that's 252 linear feet — twenty-one 12-ft boards before waste.",
  },
  {
    q: "What are the actual dimensions of 5/4×6 decking?",
    a: "A nominal 5/4×6 deck board is actually 1″ thick × 5.5″ wide. A nominal 2×6 deck board is actually 1½″ thick × 5.5″ wide. Both present the same 5.5″ face, so the board count is identical — the 2×6 is just thicker and stiffer.",
  },
  {
    q: "Should I use 12″ or 16″ joist spacing?",
    a: "16″ on center is the standard for decking run perpendicular to the joists. 12″ OC is typically used when boards run diagonally, for some composite decking, or under heavier loads. Spacing and joist span interact with your local code — verify before framing.",
  },
  {
    q: "How many screws does a deck need?",
    a: "Face-screwed decking typically takes 2 screws at every board-to-joist crossing. Total screws = deck boards × joists × 2. A 12×10 deck with 21 boards and 10 joists needs 420 screws — buy at least a small buffer over the count.",
  },
  {
    q: "How far apart can deck posts be?",
    a: "Keep post spacing at or under 8 ft as a typical maximum, and confirm with local code — post and beam spans depend on lumber species, load, and soil. The calculator above places posts at 8 ft max spacing.",
  },
  {
    q: "What gap does code allow between deck balusters?",
    a: "The International Residential Code requires that a 4-inch sphere cannot pass through a guardrail — so balusters must be spaced under 4″ apart. This calculator uses a 3.5″ gap with 1.5″ (2×2 actual) balusters for a code-friendly margin. Confirm guardrail height locally too.",
  },
  {
    q: "How much extra decking should I buy for waste?",
    a: "About 10% is a typical starting point for offcuts, butt joints, and the occasional bad board. Complex shapes, diagonal layouts, and picture-frame borders need more. The piece counts above include no waste — add your margin at purchase.",
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
      name: "Deck Calculator",
      item: PAGE_URL,
    },
  ],
};

const TOC_ITEMS = [
    { id: "calculator", label: "Calculator" },
    { id: "worked-example", label: "Worked example" },
    { id: "board-reference", label: "Board reference" },
    { id: "formulas", label: "Formulas" },
    { id: "faqs", label: "FAQs" }
];

const RELATED_ITEMS = [
    {
      href: "/concrete-bags-calculator",
      title: "Concrete Bags Calculator",
      desc: "Bag counts for deck footings and post holes.",
    },
    {
      href: "/fence-calculator",
      title: "Fence Calculator",
      desc: "Plan a matching fence once the deck is done.",
    },
    {
      href: "/paint-calculator",
      title: "Paint Calculator",
      desc: "Gallons of stain or paint for the finished deck.",
    }
];

export default function DeckCalculatorPage() {
  return (
    <article className="mx-auto max-w-content px-4 py-10 sm:px-6">
      <JsonLd data={faqJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <nav aria-label="Breadcrumb" className="mb-4 text-sm text-slate-500">
        <Link href="/">Home</Link> <span aria-hidden="true">›</span>{" "}
        <span aria-current="page">Deck Calculator</span>
      </nav>

      <p className="eyebrow">Free calculator</p>
      <h1 className="max-w-3xl text-3xl sm:text-4xl">
        Deck Calculator: Full Material Takeoff
      </h1>
      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-600">
        Enter your deck dimensions and get a complete bill of materials —
        decking boards, joists, rim boards, posts and footings, screws, and
        railing balusters. Every count is rounded up and the full arithmetic
        is shown so you can check it yourself. The math runs entirely in
        your browser.
      </p>

      <div className="mt-4">
        <AuthorByline />
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_260px]">
        <div className="min-w-0">
          <DeckCalculator />

          <AdSlot label="Advertisement" className="my-8 h-28" />

          <div className="prose-hmb mt-12 max-w-3xl">
        <h2 id="worked-example">Worked example: 12×10 ft deck, 5/4×6 decking, 16″ joists</h2>
        <p>
          Boards run along the 12-ft length, joists spaced 16″ on center,
          stock lumber in 12-ft lengths, 20 linear feet of railing, 2 post
          rows. Step by step:
        </p>
        <ol>
          <li>
            <strong>Board rows:</strong> ⌈120″ ÷ (5.5″ + 0.25″ gap)⌉ = ⌈20.87⌉
            = <strong>21 rows</strong>
          </li>
          <li>
            <strong>Decking:</strong> 21 rows × 12 ft = 252 lin ft → ⌈252 ÷
            12⌉ = <strong>21 boards</strong>
          </li>
          <li>
            <strong>Joists:</strong> ⌊144″ ÷ 16″⌋ + 1 = 9 + 1 ={" "}
            <strong>10 joists</strong>, each 10 ft → 100 lin ft →{" "}
            <strong>9 pieces</strong> (9 × 12 = 108 ft covers 100)
          </li>
          <li>
            <strong>Rim boards:</strong> 2 × (12 + 10) = 44 lin ft → ⌈44 ÷ 12⌉
            = <strong>4 pieces</strong>
          </li>
          <li>
            <strong>Posts:</strong> 2 rows × (⌈144″ ÷ 96″⌉ + 1) = 2 × 3 ={" "}
            <strong>6 posts</strong>, and <strong>6 footings</strong> (one per
            post)
          </li>
          <li>
            <strong>Screws:</strong> 21 boards × 10 joists × 2 ={" "}
            <strong>420 screws</strong>
          </li>
          <li>
            <strong>Balusters:</strong> ⌈240″ ÷ (1.5″ + 3.5″ gap)⌉ ={" "}
            <strong>48 balusters</strong>
          </li>
        </ol>

        <h2 id="board-reference">Decking board reference</h2>
        <p>
          Coverage below assumes the typical ¼″ decking gap:
        </p>
        <table>
          <thead>
            <tr>
              <th>Nominal board</th>
              <th>Actual size</th>
              <th>Face width + gap</th>
              <th>Boards per ft of deck width</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>5/4×6</td>
              <td>1″ × 5.5″</td>
              <td>5.75″</td>
              <td>2.09</td>
            </tr>
            <tr>
              <td>2×6</td>
              <td>1.5″ × 5.5″</td>
              <td>5.75″</td>
              <td>2.09</td>
            </tr>
          </tbody>
        </table>

        <h2 id="joist-chart">Joists per 12 ft of run</h2>
        <table>
          <thead>
            <tr>
              <th>Joist spacing</th>
              <th>Joists per 12 ft</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>12″ OC</td><td>13</td></tr>
            <tr><td>16″ OC</td><td>10</td></tr>
            <tr><td>24″ OC</td><td>7</td></tr>
          </tbody>
        </table>

        <h2 id="baluster-chart">Balusters by railing length (3.5″ gap)</h2>
        <table>
          <thead>
            <tr>
              <th>Railing length</th>
              <th>Balusters</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>10 ft</td><td>24</td></tr>
            <tr><td>20 ft</td><td>48</td></tr>
            <tr><td>30 ft</td><td>72</td></tr>
            <tr><td>40 ft</td><td>96</td></tr>
          </tbody>
        </table>

        <h2 id="formulas">The formulas</h2>
        <h3>Decking boards</h3>
        <p>
          <strong>Rows = ⌈ width ÷ (5.5″ + gap) ⌉</strong>, where width is the
          deck dimension the boards cross.{" "}
          <strong>Pieces = ⌈ rows × run length ÷ stock length ⌉</strong> —
          always round up; you can&apos;t buy part of a board.
        </p>
        <h3>Joists</h3>
        <p>
          <strong>Joists = ⌊ span ÷ spacing ⌋ + 1</strong> — one joist at the
          start plus one at every spacing mark. Each joist is as long as the
          deck dimension it crosses; pieces round up from total linear feet.
        </p>
        <h3>Posts and footings</h3>
        <p>
          <strong>Posts per row = ⌈ length ÷ 96″ ⌉ + 1</strong> — 8 ft is a
          typical maximum post spacing. Footings = posts, one for one.
        </p>
        <h3>Screws and balusters</h3>
        <p>
          <strong>Screws = boards × joists × 2</strong> (typical face-screw
          fastening).{" "}
          <strong>Balusters = ⌈ railing length ÷ (1.5″ + 3.5″) ⌉</strong> —
          the 3.5″ gap stays under the IRC 4-inch-sphere rule.
        </p>

        <h2 id="faqs">Frequently asked questions</h2>
        {FAQ_ITEMS.map((f) => (
          <div key={f.q} className="mb-6">
            <h3 className="!mt-6">{f.q}</h3>
            <p>{f.a}</p>
          </div>
        ))}

        <h2 id="limitations">What this calculator doesn&apos;t size</h2>
        <p>
          Counting boards and screws is geometry; sizing the frame is
          engineering. Joist, beam, and footing spans and sizes depend on
          lumber species and grade, tributary load, soil bearing, and frost
          depth — plus your local building code, which has the final word.
          Use this page for the shopping list, then size the structure (or
          hire someone to) against your local code before you pour or frame
          anything.
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
