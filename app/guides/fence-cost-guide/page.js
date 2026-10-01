import Link from "next/link";
import AdSlot from "@/components/AdSlot";
import JsonLd from "@/components/JsonLd";
import AuthorByline from "@/components/AuthorByline";
import { SITE_URL, SITE_NAME } from "@/lib/siteConfig";

export const metadata = {
  title: "How Much Does a Fence Cost? (2026 Cost Ranges)",
  description:
    "Typical US fence cost ranges per linear foot: wood, chain-link, and vinyl, installed vs. DIY, plus what drives the price and a worked 150 ft example.",
  alternates: {
    canonical: `${SITE_URL}/guides/fence-cost-guide`,
  },
  openGraph: {
    title: `How Much Does a Fence Cost? | ${SITE_NAME} Guides`,
    description:
      "Typical price ranges for a new fence by material — and the factors that move your quote up or down.",
    url: `${SITE_URL}/guides/fence-cost-guide`,
    type: "article",
  },
};

const PAGE_URL = `${SITE_URL}/guides/fence-cost-guide`;
const GUIDES_URL = `${SITE_URL}/guides`;

const FAQ_ITEMS = [
  {
    q: "How much does a 150 ft wood privacy fence cost?",
    a: "As a typical range: $2,250–$4,500 professionally installed (150 linear ft at $15–$30/ft). DIY materials for the same fence typically run $1,000–$2,000. Gates, terrain, and old-fence removal move you within or beyond that band. Prices vary widely by region.",
  },
  {
    q: "What is the cheapest fence to install?",
    a: "Chain-link is usually the cheapest installed option per linear foot, followed by basic wood privacy. But compare lifetime cost: wood needs staining and eventual board replacement, while vinyl costs more up front and then nearly nothing (guidance).",
  },
  {
    q: "How much do fence gates add to the cost?",
    a: "A walk gate typically adds a few hundred dollars installed; a wide double or driveway gate can add $500–$1,500+ with heavier posts and hardware (typical ranges). Plan gates during layout — adding one later means resetting posts.",
  },
  {
    q: "Does a sloped yard cost more to fence?",
    a: "Yes (guidance). Stepped fencing needs more posts and careful layout; racked fencing needs panels that follow the grade. Either way, slopes slow the crew down, and most installers charge extra for significant grade changes.",
  },
  {
    q: "Should I remove the old fence myself to save money?",
    a: "Often yes (guidance). Old-fence tear-out and disposal is straightforward labor that contractors bill by the hour. Haul it yourself if you have a truck or trailer — just confirm what's underneath first so you don't discover the old posts were the only thing holding up the neighbor's side.",
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
    { "@type": "ListItem", position: 3, name: "How Much Does a Fence Cost?", item: PAGE_URL },
  ],
};

export default function FenceCostGuide() {
  return (
    <article className="mx-auto max-w-content px-4 py-10 sm:px-6">
      <JsonLd data={faqJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <nav aria-label="Breadcrumb" className="mb-4 text-sm text-slate-500">
        <Link href="/">Home</Link> <span aria-hidden="true">›</span>{" "}
        <Link href="/guides">Guides</Link> <span aria-hidden="true">›</span>{" "}
        <span aria-current="page">Fence Cost Guide</span>
      </nav>

      <p className="eyebrow">Cost guide</p>
      <h1 className="mt-2 max-w-3xl text-3xl sm:text-4xl">
        How Much Does a Fence Cost?
      </h1>
      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-600">
        Fences are priced by the linear foot, and material choice swings the
        price 4× or more. Here are the typical US ranges for wood,
        chain-link, and vinyl — installed and DIY — plus what pushes any
        quote up or down.
      </p>
      <div className="mt-4">
        <AuthorByline />
      </div>

      <div className="prose-hmb mt-10 max-w-3xl">
        <div className="not-prose mb-8 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          <strong>Ranges, not quotes.</strong> All figures below are typical
          US ranges reported by contractors and home-improvement sources.
          Actual prices vary widely by region, terrain, height, and gates —
          use them to evaluate quotes, not replace them.
        </div>

        <h2>Quick answer: typical fence cost ranges</h2>
        <table>
          <thead>
            <tr>
              <th>Fence type</th>
              <th>Typical range (per linear ft, installed)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Chain-link</td>
              <td>$8–$18</td>
            </tr>
            <tr>
              <td>Wood privacy (6 ft)</td>
              <td>$15–$30</td>
            </tr>
            <tr>
              <td>Vinyl privacy</td>
              <td>$40–$70</td>
            </tr>
            <tr>
              <td>DIY materials, wood</td>
              <td>$7–$14</td>
            </tr>
          </tbody>
        </table>
        <p>
          A typical 150-foot wood privacy fence therefore runs about{" "}
          <strong>$2,250–$4,500 installed</strong>, or{" "}
          <strong>$1,000–$2,000 in materials</strong> DIY. Vinyl for the same
          run: <strong>$6,000–$10,500 installed</strong> — painful up front,
          nearly free afterward.
        </p>

        <AdSlot label="Advertisement" className="my-8 h-28" />

        <h2>What drives the price</h2>
        <ul>
          <li>
            <strong>Material.</strong> The biggest lever — vinyl runs 2–3×
            wood per foot installed.
          </li>
          <li>
            <strong>Height.</strong> A 6-foot privacy fence uses taller
            posts, more pickets, and deeper holes than a 4-foot picket
            fence.
          </li>
          <li>
            <strong>Gates.</strong> Each gate needs heavier posts, deeper
            footings, and hardware — budget per gate, not per foot.
          </li>
          <li>
            <strong>Terrain.</strong> Slopes, roots, and rocky soil slow
            every hole. Flat, clear runs are the cheapest.
          </li>
          <li>
            <strong>Old fence removal.</strong> Tear-out and disposal is
            billed separately — often $3–$8 per foot (typical range).
          </li>
          <li>
            <strong>Permits and surveys.</strong> A boundary survey costs
            real money but is cheaper than rebuilding a fence on the wrong
            line.
          </li>
        </ul>

        <h2>Worked example: 150 ft wood privacy fence</h2>
        <ol>
          <li>
            <strong>Length:</strong> <strong>150 linear ft</strong>, 6 ft
            tall, one walk gate.
          </li>
          <li>
            <strong>Materials takeoff:</strong> run it through our{" "}
            <Link href="/fence-calculator">fence calculator</Link> for
            posts, pickets, rails, and concrete per hole.
          </li>
          <li>
            <strong>DIY materials:</strong> 150 × $7–$14 ={" "}
            <strong>$1,050–$2,100</strong>, plus ~$200–$400 for the gate
            hardware.
          </li>
          <li>
            <strong>Pro installed:</strong> 150 × $15–$30 ={" "}
            <strong>$2,250–$4,500</strong>, gate usually included or quoted
            separately.
          </li>
        </ol>

        <h2>Installed vs. DIY: the honest tradeoff</h2>
        <p>
          A fence is one of the most DIY-friendly pro-priced projects:
          the work is simple (dig, set, attach) but brutally repetitive —
          a 150-foot fence means 20+ holes. DIY saves roughly half the
          installed price (guidance) at the cost of several weekends and
          sore everything. The middle path many homeowners take: hire out
          the post-setting (the skilled, back-breaking part) and hang the
          rails and pickets themselves. Also read our{" "}
          <Link href="/guides/fence-planning-guide">fence planning guide</Link>{" "}
          before you commit — layout mistakes are the expensive kind.
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
