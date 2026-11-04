import Link from "next/link";
import AdSlot from "@/components/AdSlot";
import JsonLd from "@/components/JsonLd";
import AuthorByline from "@/components/AuthorByline";
import { SITE_URL, SITE_NAME } from "@/lib/siteConfig";

export const metadata = {
  title: "How Much Does a New Roof Cost? (2026 Cost Ranges)",
  description:
    "Typical roofing cost ranges per square: asphalt shingles vs. metal, tear-off, what drives the price, and a worked 1,500 sq ft example.",
  alternates: {
    canonical: `${SITE_URL}/guides/roofing-cost-guide`,
  },
  openGraph: {
    title: `How Much Does a New Roof Cost? | ${SITE_NAME} Guides`,
    description:
      "Typical price ranges for a roof replacement, plus the factors that move your quote.",
    url: `${SITE_URL}/guides/roofing-cost-guide`,
    type: "article",
    images: [
      {
        url:
          "/og?title=" +
          encodeURIComponent(`How Much Does a New Roof Cost? | ${SITE_NAME} Guides`) +
          "&sub=" +
          encodeURIComponent("Typical price ranges for a roof replacement, plus the factors that move your quote."),
        width: 1200,
        height: 630,
        alt: `How Much Does a New Roof Cost? | ${SITE_NAME} Guides`,
      },
    ],
  },
};

const PAGE_URL = `${SITE_URL}/guides/roofing-cost-guide`;
const GUIDES_URL = `${SITE_URL}/guides`;

const FAQ_ITEMS = [
  {
    q: "How much does a new roof cost for a 1,500 sq ft house?",
    a: "A 1,500 sq ft roof footprint is roughly 16-17 squares once pitch and waste are counted. In architectural asphalt shingles at a typical $450-$750 per square installed, that runs roughly $7,200-$12,750 before tear-off and decking repairs. Steep pitch, multiple layers to remove, and skylights or chimneys push toward the higher end.",
  },
  {
    q: "Are architectural shingles worth it over 3-tab?",
    a: "For most homes, yes. Architectural (dimensional) shingles cost more per square but are thicker, look better, resist wind better, and usually carry longer warranties. 3-tab shingles are the budget option and make sense for a rental, a shed, or a roof you plan to replace soon anyway.",
  },
  {
    q: "How much does roof tear-off cost?",
    a: "As a typical range, removing one layer of old shingles and hauling it away adds about $100-$200 per square, and a second layer adds more. Some quotes bundle tear-off into the per-square price and some list it separately, so always ask which one you are looking at.",
  },
  {
    q: "How long does an asphalt shingle roof last?",
    a: "3-tab shingles typically last 15-20 years and architectural shingles 25-30 years in normal conditions, though heat, poor ventilation, and storm damage shorten both. Metal roofs last much longer (40-70 years) but cost roughly double up front.",
  },
  {
    q: "Can a new roof go over the old shingles?",
    a: "Building codes in many areas allow one overlay layer, and it saves the tear-off cost. But it hides decking damage, adds weight, and shortens the new roof's life, and most roofers recommend a full tear-off for a roof you plan to keep long term. Get the decking inspected either way.",
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
    { "@type": "ListItem", position: 3, name: "How Much Does a New Roof Cost?", item: PAGE_URL },
  ],
};

export default function RoofingCostGuide() {
  return (
    <article className="mx-auto max-w-content px-4 py-10 sm:px-6">
      <JsonLd data={faqJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <nav aria-label="Breadcrumb" className="mb-4 text-sm text-slate-500">
        <Link href="/">Home</Link> <span aria-hidden="true">›</span>{" "}
        <Link href="/guides">Guides</Link> <span aria-hidden="true">›</span>{" "}
        <span aria-current="page">Roofing Cost Guide</span>
      </nav>

      <p className="eyebrow">Cost guide</p>
      <h1 className="mt-2 max-w-3xl text-3xl sm:text-4xl">
        How Much Does a New Roof Cost?
      </h1>
      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-600">
        Roofers quote by the square (100 sq ft of roof surface), and your
        roof is bigger than your house footprint once pitch is counted.
        Here are the typical ranges for shingles and metal, plus what
        pushes any quote up or down.
      </p>
      <div className="mt-4">
        <AuthorByline />
      </div>

      <div className="prose-hmb mt-10 max-w-3xl">
        <div className="not-prose mb-8 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          <strong>Ranges, not quotes.</strong> All figures below are typical
          US ranges reported by contractors and home-improvement sources.
          Actual prices vary widely by region, pitch, layers to remove,
          and roof complexity, use them to evaluate quotes, not replace
          them.
        </div>

        <h2>Quick answer: typical roofing cost ranges</h2>
        <table>
          <thead>
            <tr>
              <th>Roofing material</th>
              <th>Typical range (per square, installed)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>3-tab asphalt shingles</td>
              <td>$350-$550</td>
            </tr>
            <tr>
              <td>Architectural asphalt shingles</td>
              <td>$450-$750</td>
            </tr>
            <tr>
              <td>Standing-seam metal</td>
              <td>$800-$1,400</td>
            </tr>
            <tr>
              <td>Tear-off and disposal (one layer)</td>
              <td>$100-$200 extra per square</td>
            </tr>
          </tbody>
        </table>
        <p>
          A 1,500 sq ft roof footprint is roughly{" "}
          <strong>16-17 squares</strong> once pitch and waste are counted,
          so architectural shingles run roughly{" "}
          <strong>$7,200-$12,750 installed</strong> before tear-off and
          decking repairs. Metal roughly doubles that figure but lasts
          decades longer.
        </p>

        <AdSlot label="Advertisement" className="my-8 h-28" />

        <h2>What drives the price</h2>
        <ul>
          <li>
            <strong>Pitch.</strong> The steepest lever. A steep roof needs
            safety gear, slower work, and more staging, and labor climbs
            fast past a walkable pitch. Use our{" "}
            <Link href="/roof-pitch-calculator">roof pitch calculator</Link>{" "}
            to find yours before getting quotes.
          </li>
          <li>
            <strong>Roof size in squares.</strong> Pitch inflates the
            footprint: a 6-in-12 pitch adds about 12% over the footprint
            area, a 12-in-12 pitch adds about 41%. Quotes should state
            squares, not footprint square feet.
          </li>
          <li>
            <strong>Tear-off layers.</strong> One layer is standard; two
            layers cost more to remove and haul, and the landfill fees
            scale with weight.
          </li>
          <li>
            <strong>Decking repair.</strong> Rotten or soft sheathing
            found during tear-off is replaced by the sheet, usually billed
            per sheet on top of the quote. Old roofs often hide some.
          </li>
          <li>
            <strong>Flashing, vents, and penetrations.</strong> Chimneys,
            skylights, valleys, and vents each need flashing work, and
            each one is a potential leak if done cheaply.
          </li>
          <li>
            <strong>Underlayment and ice barrier.</strong> Synthetic
            underlayment is standard now; ice-and-water shield along
            eaves and valleys is cheap insurance in cold climates.
          </li>
        </ul>

        <h2>Worked example: 1,500 sq ft roof, architectural shingles</h2>
        <ol>
          <li>
            <strong>Roof surface:</strong> 1,500 sq ft footprint at a
            moderate pitch plus waste works out to roughly{" "}
            <strong>16 squares</strong>. Run your footprint and pitch
            through our{" "}
            <Link href="/roof-shingles-calculator">roof shingles calculator</Link>{" "}
            for bundles and squares.
          </li>
          <li>
            <strong>Shingles installed:</strong> 16 x $450-$750 ={" "}
            <strong>$7,200-$12,000</strong>.
          </li>
          <li>
            <strong>Tear-off (one layer):</strong> 16 x $100-$200 ={" "}
            <strong>$1,600-$3,200</strong> more.
          </li>
          <li>
            <strong>Typical total:</strong> roughly{" "}
            <strong>$8,800-$15,200</strong>, before decking repairs,
            flashing upgrades, or permits.
          </li>
        </ol>

        <h2>DIY vs. hiring a contractor</h2>
        <p>
          Roofing is the job most worth hiring out. Falls are the leading
          cause of construction deaths, steep work needs harnesses and
          staging, and manufacturer warranties often require certified
          installation. A DIY roof also risks the two most expensive
          mistakes in the trade: bad valley flashing and bad penetrations,
          both of which leak slowly and rot the decking. Get three quotes,
          check that each lists squares, tear-off, underlayment, flashing,
          and cleanup, and compare those line items rather than the bottom
          lines.
        </p>

        <h2>Frequently asked questions</h2>
        {FAQ_ITEMS.map((f) => (
          <div key={f.q} className="mb-6">
            <h3 className="!mt-6">{f.q}</h3>
            <p>{f.a}</p>
          </div>
        ))}

        <p>
          Ready to size the job? Use the{" "}
          <Link href="/roof-shingles-calculator">roof shingles calculator</Link>{" "}
          for bundles and squares, check your pitch with the{" "}
          <Link href="/roof-pitch-calculator">roof pitch calculator</Link>,
          and see the{" "}
          <Link href="/guides/siding-cost-guide">siding cost guide</Link>{" "}
          if the exterior walls are due at the same time.
        </p>
      </div>
    </article>
  );
}
