import Link from "next/link";
import AdSlot from "@/components/AdSlot";
import JsonLd from "@/components/JsonLd";
import AuthorByline from "@/components/AuthorByline";
import { SITE_URL, SITE_NAME } from "@/lib/siteConfig";

export const metadata = {
  title: "How Much Does Flooring Cost? (2026 Cost Ranges)",
  description:
    "Typical flooring cost ranges per square foot: laminate, vinyl plank, hardwood, tile, and carpet, installed vs. DIY, with a worked 10x12 ft example.",
  alternates: {
    canonical: `${SITE_URL}/guides/flooring-cost-guide`,
  },
  openGraph: {
    title: `How Much Does Flooring Cost? | ${SITE_NAME} Guides`,
    description:
      "Typical price ranges for flooring materials and installation, plus the factors that move your quote.",
    url: `${SITE_URL}/guides/flooring-cost-guide`,
    type: "article",
    images: [
      {
        url:
          "/og?title=" +
          encodeURIComponent(`How Much Does Flooring Cost? | ${SITE_NAME} Guides`) +
          "&sub=" +
          encodeURIComponent("Typical price ranges for flooring materials and installation, plus the factors that move your quote."),
        width: 1200,
        height: 630,
        alt: `How Much Does Flooring Cost? | ${SITE_NAME} Guides`,
      },
    ],
  },
};

const PAGE_URL = `${SITE_URL}/guides/flooring-cost-guide`;
const GUIDES_URL = `${SITE_URL}/guides`;

const FAQ_ITEMS = [
  {
    q: "What is the cheapest flooring to install?",
    a: "Laminate and luxury vinyl plank are usually the cheapest installed options, roughly $3-$8 and $4-$10 per sq ft installed. Both are click-together floating floors, which keeps labor low, and both are realistic DIY projects, which drops the cost to materials only.",
  },
  {
    q: "Is luxury vinyl plank better than laminate?",
    a: "For wet areas, yes: vinyl plank handles water far better than laminate, so it suits kitchens, bathrooms, and basements. Laminate often looks and feels a bit more like wood underfoot and can be cheaper. For living rooms and bedrooms, either works; for anywhere water is likely, pick vinyl.",
  },
  {
    q: "Does a flooring quote include baseboards and trim?",
    a: "Not always. Some quotes include removing and reinstalling baseboards, others list it separately, and new baseboards or stair nosing are almost always extra. Ask for trim, transitions, and stair work as explicit line items before comparing quotes.",
  },
  {
    q: "How much does subfloor leveling cost?",
    a: "Minor leveling with patch compound is often rolled into the install. Serious work (grinding high spots, pouring self-leveler over a large area, replacing damaged subfloor sheets) is usually quoted separately and can add hundreds to a few thousand dollars depending on how bad the floor is.",
  },
  {
    q: "How much extra flooring should I buy for waste?",
    a: "A typical waste allowance is 10% for straight runs in rectangular rooms, more for diagonal layouts, herringbone patterns, or rooms with lots of corners and closets. The flooring calculator on this site adds the waste allowance to your material count automatically.",
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
    { "@type": "ListItem", position: 3, name: "How Much Does Flooring Cost?", item: PAGE_URL },
  ],
};

export default function FlooringCostGuide() {
  return (
    <article className="mx-auto max-w-content px-4 py-10 sm:px-6">
      <JsonLd data={faqJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <nav aria-label="Breadcrumb" className="mb-4 text-sm text-slate-500">
        <Link href="/">Home</Link> <span aria-hidden="true">›</span>{" "}
        <Link href="/guides">Guides</Link> <span aria-hidden="true">›</span>{" "}
        <span aria-current="page">Flooring Cost Guide</span>
      </nav>

      <p className="eyebrow">Cost guide</p>
      <h1 className="mt-2 max-w-3xl text-3xl sm:text-4xl">
        How Much Does Flooring Cost?
      </h1>
      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-600">
        Material choice sets the band, but subfloor prep and removal of
        the old floor decide where inside the band you land. Here are the
        typical installed ranges per square foot for the common flooring
        types, plus what pushes any quote up or down.
      </p>
      <div className="mt-4">
        <AuthorByline />
      </div>

      <div className="prose-hmb mt-10 max-w-3xl">
        <div className="not-prose mb-8 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          <strong>Ranges, not quotes.</strong> All figures below are typical
          US ranges reported by contractors and home-improvement sources.
          Actual prices vary widely by region, material quality, subfloor
          condition, and room shape, use them to evaluate quotes, not
          replace them.
        </div>

        <h2>Quick answer: typical flooring cost ranges</h2>
        <table>
          <thead>
            <tr>
              <th>Flooring type</th>
              <th>Typical range (per sq ft, installed)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Laminate</td>
              <td>$3-$8</td>
            </tr>
            <tr>
              <td>Luxury vinyl plank (LVP)</td>
              <td>$4-$10</td>
            </tr>
            <tr>
              <td>Carpet</td>
              <td>$3-$7</td>
            </tr>
            <tr>
              <td>Engineered hardwood</td>
              <td>$6-$14</td>
            </tr>
            <tr>
              <td>Solid hardwood</td>
              <td>$8-$15</td>
            </tr>
            <tr>
              <td>Tile</td>
              <td>$8-$18</td>
            </tr>
          </tbody>
        </table>
        <p>
          A 10x12 ft room (120 sq ft) in luxury vinyl plank therefore
          runs roughly <strong>$480-$1,200 installed</strong>, while the
          same room in tile runs roughly <strong>$960-$2,160</strong>.
          Removal of the old floor, underlayment, and trim can add to
          either figure.
        </p>

        <AdSlot label="Advertisement" className="my-8 h-28" />

        <h2>What drives the price</h2>
        <ul>
          <li>
            <strong>Material.</strong> The main lever: laminate and vinyl
            sit at the low end, tile and hardwood at the high end, and
            within each type, thicker wear layers and wider planks cost
            more.
          </li>
          <li>
            <strong>Subfloor prep.</strong> Floating floors need a flat
            floor. Grinding, patching, or pouring self-leveler is cheap
            when the floor is nearly flat and expensive when it is not,
            and it is often discovered only after the old floor comes up.
          </li>
          <li>
            <strong>Removal of the old floor.</strong> Pulling carpet is
            quick; pulling glued-down wood or tile, plus hauling it away,
            is slow and usually billed separately.
          </li>
          <li>
            <strong>Underlayment and moisture barriers.</strong> Required
            under most floating floors and over concrete. Padding quality
            also changes how carpet feels and lasts.
          </li>
          <li>
            <strong>Room shape and pattern.</strong> Diagonal layouts,
            herringbone, and rooms full of corners and closets raise both
            labor and the waste allowance.
          </li>
          <li>
            <strong>Trim and stairs.</strong> Baseboards, transitions,
            stair nosing, and stair treads are small items with high labor
            per piece, stairs in particular can rival the room itself.
          </li>
        </ul>

        <h2>Worked example: 10x12 ft room in luxury vinyl plank</h2>
        <ol>
          <li>
            <strong>Area:</strong> 10 x 12 = <strong>120 sq ft</strong>.
          </li>
          <li>
            <strong>With waste:</strong> 120 sq ft + 10% waste ={" "}
            <strong>132 sq ft to buy</strong>. Run your own dimensions
            through our <Link href="/flooring-calculator">flooring calculator</Link>{" "}
            for boxes and waste.
          </li>
          <li>
            <strong>Installed:</strong> 120 x $4-$10 ={" "}
            <strong>$480-$1,200</strong>.
          </li>
          <li>
            <strong>DIY materials:</strong> 132 sq ft of plank plus
            underlayment, roughly <strong>$265-$660</strong> for
            mid-range plank at $2-$5 per sq ft.
          </li>
          <li>
            <strong>Extras to confirm:</strong> old floor removal, new
            baseboards, and transitions, each quoted separately.
          </li>
        </ol>

        <h2>DIY vs. hiring a contractor</h2>
        <p>
          Click-together laminate and vinyl plank are the most
          DIY-friendly floors: a tapping block, a pull bar, and a saw
          cover most rooms, and a first-timer can finish a bedroom in a
          weekend. Carpet needs a stretcher and seaming skill. Tile needs
          layout skill and a wet saw, and mistakes are set in thinset.
          Solid hardwood needs nail-down tools and often sanding and
          finishing. If your floor is uneven, start with a pro assessment
          before buying anything, prep problems sink every flooring type
          equally.
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
          <Link href="/flooring-calculator">flooring calculator</Link> for
          material counts with waste, and see the{" "}
          <Link href="/guides/tile-cost-guide">tile cost guide</Link> if
          you are comparing tile against plank or laminate.
        </p>
      </div>
    </article>
  );
}
