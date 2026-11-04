import Link from "next/link";
import AdSlot from "@/components/AdSlot";
import JsonLd from "@/components/JsonLd";
import AuthorByline from "@/components/AuthorByline";
import { SITE_URL, SITE_NAME } from "@/lib/siteConfig";

export const metadata = {
  title: "How Much Does House Siding Cost? (2026 Cost Ranges)",
  description:
    "Typical siding cost ranges per square foot: vinyl, fiber cement, wood, and metal, installed vs. DIY, with a worked 1,500 sq ft example.",
  alternates: {
    canonical: `${SITE_URL}/guides/siding-cost-guide`,
  },
  openGraph: {
    title: `How Much Does House Siding Cost? | ${SITE_NAME} Guides`,
    description:
      "Typical price ranges for house siding materials and installation, plus the factors that move your quote.",
    url: `${SITE_URL}/guides/siding-cost-guide`,
    type: "article",
    images: [
      {
        url:
          "/og?title=" +
          encodeURIComponent(`How Much Does House Siding Cost? | ${SITE_NAME} Guides`) +
          "&sub=" +
          encodeURIComponent("Typical price ranges for house siding materials and installation, plus the factors that move your quote."),
        width: 1200,
        height: 630,
        alt: `How Much Does House Siding Cost? | ${SITE_NAME} Guides`,
      },
    ],
  },
};

const PAGE_URL = `${SITE_URL}/guides/siding-cost-guide`;
const GUIDES_URL = `${SITE_URL}/guides`;

const FAQ_ITEMS = [
  {
    q: "What is the cheapest house siding?",
    a: "Vinyl is usually the cheapest installed option, roughly $4-$9 per sq ft. It needs almost no maintenance, but it can crack in extreme cold and melt near intense heat sources like grills. For the lowest upfront cost on a standard house, vinyl is hard to beat.",
  },
  {
    q: "Is fiber cement worth it over vinyl?",
    a: "Fiber cement costs roughly double vinyl installed, but it resists fire, rot, and insects, holds paint far longer, and looks more like real wood. If you plan to stay in the house long term or live in a fire-prone or high-moisture area, the durability case is strong.",
  },
  {
    q: "Does a siding quote include trim, soffit, and fascia?",
    a: "Not always. Some quotes cover siding only, with corner boards, window trim, soffit, and fascia as separate line items. Those extras can add thousands, so ask for them explicitly before comparing quotes, a cheap siding quote with trim excluded is not actually cheap.",
  },
  {
    q: "How long does siding last?",
    a: "As typical ranges: vinyl 20-40 years, fiber cement 30-50 years with repainting, wood 20-40 years with regular painting or staining, and metal 40+ years. Sun exposure, moisture, and maintenance matter more than the brochure number.",
  },
  {
    q: "Can new siding go over old siding?",
    a: "Sometimes, if the old siding is flat, sound, and dry, vinyl over old wood is the common case. But layering hides rot and moisture damage, can trap water, and may void warranties. A full tear-off costs more and lets the crew inspect and repair the sheathing underneath, which is usually the wiser spend.",
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
    { "@type": "ListItem", position: 3, name: "How Much Does House Siding Cost?", item: PAGE_URL },
  ],
};

export default function SidingCostGuide() {
  return (
    <article className="mx-auto max-w-content px-4 py-10 sm:px-6">
      <JsonLd data={faqJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <nav aria-label="Breadcrumb" className="mb-4 text-sm text-slate-500">
        <Link href="/">Home</Link> <span aria-hidden="true">›</span>{" "}
        <Link href="/guides">Guides</Link> <span aria-hidden="true">›</span>{" "}
        <span aria-current="page">Siding Cost Guide</span>
      </nav>

      <p className="eyebrow">Cost guide</p>
      <h1 className="mt-2 max-w-3xl text-3xl sm:text-4xl">
        How Much Does House Siding Cost?
      </h1>
      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-600">
        Siding is priced per square foot of wall, and the material gap is
        wide: vinyl can cost half what fiber cement does. Here are the
        typical installed ranges for the common materials, plus what
        pushes any quote up or down.
      </p>
      <div className="mt-4">
        <AuthorByline />
      </div>

      <div className="prose-hmb mt-10 max-w-3xl">
        <div className="not-prose mb-8 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          <strong>Ranges, not quotes.</strong> All figures below are typical
          US ranges reported by contractors and home-improvement sources.
          Actual prices vary widely by region, material, house height,
          and how much old siding must come off, use them to evaluate
          quotes, not replace them.
        </div>

        <h2>Quick answer: typical siding cost ranges</h2>
        <table>
          <thead>
            <tr>
              <th>Siding material</th>
              <th>Typical range (per sq ft, installed)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Vinyl</td>
              <td>$4-$9</td>
            </tr>
            <tr>
              <td>Metal / aluminum</td>
              <td>$5-$11</td>
            </tr>
            <tr>
              <td>Engineered wood</td>
              <td>$6-$12</td>
            </tr>
            <tr>
              <td>Fiber cement</td>
              <td>$7-$14</td>
            </tr>
            <tr>
              <td>Wood (cedar, redwood)</td>
              <td>$8-$15</td>
            </tr>
          </tbody>
        </table>
        <p>
          A house with 1,500 sq ft of wall area therefore runs roughly{" "}
          <strong>$6,000-$13,500 in vinyl</strong> or{" "}
          <strong>$10,500-$21,000 in fiber cement</strong>, installed.
          Trim, soffit, and fascia are often extra, confirm before you
          compare.
        </p>

        <AdSlot label="Advertisement" className="my-8 h-28" />

        <h2>What drives the price</h2>
        <ul>
          <li>
            <strong>Material.</strong> The main lever. Vinyl is the value
            choice; fiber cement and wood cost more in both material and
            labor, and wood adds ongoing painting or staining.
          </li>
          <li>
            <strong>House height and stories.</strong> Two-story work
            needs scaffolding and slower handling. Tall gable ends are
            the slowest, most expensive walls on the house.
          </li>
          <li>
            <strong>Old siding removal.</strong> Tearing off old siding
            and hauling it away is usually a separate charge, and what
            the crew finds underneath (rot, bad sheathing, no house wrap)
            can add repair work.
          </li>
          <li>
            <strong>Trim, soffit, and fascia.</strong> Corner boards,
            window surrounds, soffit panels, and fascia boards are
            fiddly, visible work. Budget for them as their own line
            items, not as an afterthought.
          </li>
          <li>
            <strong>Insulation and house wrap.</strong> Adding rigid foam
            insulation or a new weather barrier under the siding improves
            energy performance but adds material and labor.
          </li>
          <li>
            <strong>Wall complexity.</strong> Bumps, bays, dormers, and
            lots of windows mean more cutting, flashing, and trim, and
            more waste.
          </li>
        </ul>

        <h2>Worked example: 1,500 sq ft of wall, vinyl vs. fiber cement</h2>
        <ol>
          <li>
            <strong>Wall area:</strong> measure each wall (length x
            height), subtract large openings, and add gable ends. Our{" "}
            <Link href="/siding-calculator">siding calculator</Link>{" "}
            handles wall squares, gable ends, and box counts.
          </li>
          <li>
            <strong>Vinyl installed:</strong> 1,500 x $4-$9 ={" "}
            <strong>$6,000-$13,500</strong>.
          </li>
          <li>
            <strong>Fiber cement installed:</strong> 1,500 x $7-$14 ={" "}
            <strong>$10,500-$21,000</strong>.
          </li>
          <li>
            <strong>DIY materials (vinyl):</strong> roughly{" "}
            <strong>$3,000-$6,000</strong> for panels, trim, and
            fasteners at $2-$4 per sq ft.
          </li>
          <li>
            <strong>Extras to confirm:</strong> old siding removal,
            trim, soffit, fascia, and house wrap, each quoted separately.
          </li>
        </ol>

        <h2>DIY vs. hiring a contractor</h2>
        <p>
          Vinyl is the most DIY-feasible siding: panels are light, cuts
          are simple, and mistakes are cheap to redo. Fiber cement is a
          different job, boards are heavy, cutting produces silica dust
          that needs proper protection and tools, and flashing details
          around windows decide whether the walls stay dry. Wood needs
          painting or staining skill on top of the install. For anything
          above the first story, or any house with rot or sheathing
          problems hiding under the old siding, hire a crew.
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
          <Link href="/siding-calculator">siding calculator</Link> for
          squares and box counts, and see the{" "}
          <Link href="/guides/roofing-cost-guide">roofing cost guide</Link>{" "}
          if the roof is due in the same round of exterior work.
        </p>
      </div>
    </article>
  );
}
