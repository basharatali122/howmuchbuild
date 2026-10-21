import Link from "next/link";
import AdSlot from "@/components/AdSlot";
import JsonLd from "@/components/JsonLd";
import AuthorByline from "@/components/AuthorByline";
import TableOfContents from "@/components/TableOfContents";
import { SITE_URL, SITE_NAME } from "@/lib/siteConfig";

export const metadata = {
  title: "How Much Does a Paver Patio Cost? (2026 Cost Ranges)",
  description:
    "Typical US cost ranges for a paver patio: pavers per square foot, base gravel, sand, what drives the price, DIY vs. pro per-square-foot bands, and a worked 12×16 ft example.",
  alternates: {
    canonical: `${SITE_URL}/guides/paver-cost-guide`,
  },
  openGraph: {
    title: `How Much Does a Paver Patio Cost? | ${SITE_NAME} Guides`,
    description:
      "Typical price ranges for a paver patio — pavers, base, sand, DIY vs. pro.",
    url: `${SITE_URL}/guides/paver-cost-guide`,
    type: "article",
    images: [
      {
        url:
          "/og?title=" +
          encodeURIComponent(`How Much Does a Paver Patio Cost? | ${SITE_NAME} Guides`) +
          "&sub=" +
          encodeURIComponent("Typical price ranges for a paver patio — pavers, base, sand, DIY vs. pro."),
        width: 1200,
        height: 630,
        alt: `How Much Does a Paver Patio Cost? | ${SITE_NAME} Guides`,
      },
    ],
  },
};

const PAGE_URL = `${SITE_URL}/guides/paver-cost-guide`;
const GUIDES_URL = `${SITE_URL}/guides`;

const TOC_ITEMS = [
  { id: "quick-answer", label: "Quick answer: typical cost ranges" },
  { id: "cost-factors", label: "What drives the price" },
  { id: "worked-example", label: "Worked example: 12×16 ft patio" },
  { id: "save-money", label: "How to keep the cost down" },
  { id: "faqs", label: "Frequently asked questions" },
];

const FAQ_ITEMS = [
  {
    q: "How much does a 12×16 paver patio cost?",
    a: "As a typical range: $1,000–$2,000 DIY in materials (pavers, base gravel, bedding sand, edge restraints, joint sand) or $2,000–$4,800 professionally installed for standard concrete pavers. Premium pavers, complex patterns, or difficult sites push toward the top. Prices vary widely by region and soil conditions.",
  },
  {
    q: "Are pavers cheaper than poured concrete?",
    a: "Per square foot, pavers usually cost more installed than plain poured concrete — but pavers win on repairability (lift and reset one paver vs. replacing a cracked slab) and freeze-thaw durability. Over 15+ years, pavers often cost less in total ownership because repairs are cheap and local.",
  },
  {
    q: "How deep does the base need to be?",
    a: "The standard spec is 4–6 inches of compacted gravel base plus 1 inch of bedding sand under the pavers — 7–9 inches of total excavation for standard 2⅜-inch pavers. Cold climates with freeze-thaw cycles and heavy-load areas (driveways) need 8–12 inches of base. Skimping on base compaction is the #1 reason patios fail.",
  },
  {
    q: "Do pavers need edge restraints?",
    a: "Yes — edge restraints are not optional. Without them, pavers creep outward over time, joints open up, and the edge rows shift. Plastic or metal paver edging pinned with spikes costs a few dollars per linear foot and is some of the cheapest insurance on the whole project.",
  },
  {
    q: "Should I seal my pavers?",
    a: "Sealer is optional and adds roughly $1–$3 per sq ft. It deepens color, blocks stains, and can slow weed growth in joints — but it needs reapplication every few years. For a natural look with less maintenance, many homeowners skip sealer and rely on polymeric sand in the joints.",
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
    { "@type": "ListItem", position: 3, name: "How Much Does a Paver Patio Cost?", item: PAGE_URL },
  ],
};

export default function PaverCostGuide() {
  return (
    <article className="mx-auto max-w-content px-4 py-10 sm:px-6">
      <JsonLd data={faqJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <nav aria-label="Breadcrumb" className="mb-4 text-sm text-slate-500">
        <Link href="/">Home</Link> <span aria-hidden="true">›</span>{" "}
        <Link href="/guides">Guides</Link> <span aria-hidden="true">›</span>{" "}
        <span aria-current="page">Paver Cost Guide</span>
      </nav>

      <p className="eyebrow">Cost guide</p>
      <h1 className="mt-2 max-w-3xl text-3xl sm:text-4xl">
        How Much Does a Paver Patio Cost?
      </h1>
      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-600">
        A paver patio can cost $1,000 or $5,000 for the same 12×16 footprint
        depending on the pavers, the base underneath, and who does the work.
        Here are the typical US price ranges, what drives them, and a worked
        example for a 12×16 ft patio.
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
          Actual prices vary widely by region, soil conditions, paver
          choice, and site access — use them to evaluate quotes, not replace
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
              <td>Concrete pavers (material)</td>
              <td>$2–$5 / sq ft</td>
            </tr>
            <tr>
              <td>Natural stone pavers (material)</td>
              <td>$5–$15 / sq ft</td>
            </tr>
            <tr>
              <td>Base gravel + bedding sand + joint sand</td>
              <td>$2–$5 / sq ft</td>
            </tr>
            <tr>
              <td>DIY, materials per sq ft</td>
              <td>$5–$10 / sq ft</td>
            </tr>
            <tr>
              <td>Pro, installed per sq ft (concrete pavers)</td>
              <td>$10–$25 / sq ft</td>
            </tr>
            <tr>
              <td>Pro, installed per sq ft (natural stone)</td>
              <td>$16–$35 / sq ft</td>
            </tr>
          </tbody>
        </table>
        <p>
          The pavers are only part of the bill. Excavation, the compacted
          gravel base, edge restraints, and <strong>labor — often half the
          installed price</strong> — are what move a $1,500 patio toward
          $5,000. Professional labor alone commonly runs $5–$8 per sq ft
          before materials.
        </p>

        <AdSlot label="Advertisement" className="my-8 h-28" />

        <h2 id="cost-factors">What drives the price</h2>
        <ul>
          <li>
            <strong>Paver material.</strong> Concrete pavers are the budget
            standard; clay brick costs a bit more; natural stone (bluestone,
            travertine, slate) sits well above both.
          </li>
          <li>
            <strong>Pattern complexity.</strong> Running bond is fast to lay;
            herringbone and basket-weave need more cuts and more labor — and
            5–10% more pavers as waste.
          </li>
          <li>
            <strong>Base and soil.</strong> A 4–6 inch compacted base is the
            standard spec; clay soil or freeze-thaw climates demand deeper
            excavation and more gravel — in northern states, 8–12 inches of
            base is common and labor costs run higher.
          </li>
          <li>
            <strong>Site access and demo.</strong> Tear-out of an old slab
            ($1–$3/sq ft), tight access, and hauling spoil away all add
            labor hours.
          </li>
          <li>
            <strong>Patio size.</strong> Smaller patios cost more per square
            foot — mobilization, equipment, and delivery get spread across
            fewer square feet.
          </li>
          <li>
            <strong>Extras.</strong> Sealer ($1–$3/sq ft), geotextile fabric,
            drainage work, and borders or soldier courses all sit outside a
            base quote.
          </li>
          <li>
            <strong>Region.</strong> Installed rates vary enormously by
            market — cold-climate metros with demanding base specs run well
            above the national average.
          </li>
        </ul>

        <h2 id="worked-example">Worked example: 12×16 ft patio, concrete pavers</h2>
        <ol>
          <li>
            <strong>Area:</strong> 12 × 16 = <strong>192 sq ft</strong>.
          </li>
          <li>
            <strong>Pavers (with 10% waste):</strong> ~212 sq ft of concrete
            pavers at a typical $2–$5/sq ft = <strong>$425–$1,060</strong>.
          </li>
          <li>
            <strong>Base and sand:</strong> 4–6 in. of compacted gravel plus
            1 in. bedding sand and polymeric sand for joints — roughly{" "}
            <strong>$385–$960</strong> delivered.
          </li>
          <li>
            <strong>Edge restraints + incidentals:</strong> ~56 linear ft of
            edging with spikes, plus landscape fabric — roughly{" "}
            <strong>$150–$300</strong>.
          </li>
          <li>
            <strong>DIY total:</strong> roughly <strong>$1,000–$2,300</strong>,
            plus equipment rental (plate compactor and masonry saw,
            ~$150–$400/day combined). Allow 2–4 days of work.
          </li>
          <li>
            <strong>Pro installed:</strong> at a typical $12–$22/sq ft for
            standard concrete pavers, roughly{" "}
            <strong>$2,300–$4,200</strong> all-in.
          </li>
        </ol>
        <p>
          Get your exact paver, gravel, and sand quantities with our{" "}
          <Link href="/paver-calculator">paver calculator</Link> — it adds
          pattern waste and computes base materials for you.
        </p>

        <h2 id="save-money">How to keep the cost down</h2>
        <ul>
          <li>
            <strong>Never cut the base.</strong> This is the one place cheap
            is expensive — a heaved patio gets torn out and rebuilt. Save
            on the pavers, not the gravel.
          </li>
          <li>
            <strong>Choose running bond.</strong> The simplest pattern is
            the fastest to lay and wastes the fewest pavers.
          </li>
          <li>
            <strong>Do excavation yourself.</strong> Digging and hauling are
            labor-heavy and skill-light — even if a pro lays the pavers.
          </li>
          <li>
            <strong>Rent the compactor.</strong> A plate compactor rental is
            ~$70–$250/day; hand tamping a patio base is not enough and will
            show in year one.
          </li>
          <li>
            <strong>Keep spare pavers.</strong> Order the 10% waste margin
            and keep the leftovers — pavers get discontinued, and a stained
            or cracked paver is a five-minute swap if you have a match.
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
