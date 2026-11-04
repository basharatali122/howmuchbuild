import Link from "next/link";
import AdSlot from "@/components/AdSlot";
import JsonLd from "@/components/JsonLd";
import AuthorByline from "@/components/AuthorByline";
import { SITE_URL, SITE_NAME } from "@/lib/siteConfig";

export const metadata = {
  title: "How Much Does Gravel Cost? (2026 Cost Ranges)",
  description:
    "Typical gravel cost ranges per cubic yard and per load: crushed stone, pea gravel, delivery fees, and a worked driveway example.",
  alternates: {
    canonical: `${SITE_URL}/guides/gravel-cost-guide`,
  },
  openGraph: {
    title: `How Much Does Gravel Cost? | ${SITE_NAME} Guides`,
    description:
      "Typical price ranges for gravel material and delivery, plus the factors that move your quote.",
    url: `${SITE_URL}/guides/gravel-cost-guide`,
    type: "article",
    images: [
      {
        url:
          "/og?title=" +
          encodeURIComponent(`How Much Does Gravel Cost? | ${SITE_NAME} Guides`) +
          "&sub=" +
          encodeURIComponent("Typical price ranges for gravel material and delivery, plus the factors that move your quote."),
        width: 1200,
        height: 630,
        alt: `How Much Does Gravel Cost? | ${SITE_NAME} Guides`,
      },
    ],
  },
};

const PAGE_URL = `${SITE_URL}/guides/gravel-cost-guide`;
const GUIDES_URL = `${SITE_URL}/guides`;

const FAQ_ITEMS = [
  {
    q: "How many cubic yards of gravel do I need for a driveway?",
    a: "Multiply length x width x depth (in feet), then divide by 27. A 12x50 ft driveway at 4 inches deep is 600 x 0.333 = 200 cu ft, which is 7.4 cu yd. Order about 8 cu yd with a waste allowance. The gravel calculator on this site does this math from your dimensions.",
  },
  {
    q: "What depth of gravel does a driveway need?",
    a: "A typical range is 4-6 inches of compacted gravel over a prepared base for a car driveway, deeper (6-8 inches) for heavy vehicles or soft soil. Walkways and garden paths need only 2-3 inches. Depth is the biggest cost lever, so measure it honestly rather than guessing.",
  },
  {
    q: "Crushed stone or pea gravel for a driveway?",
    a: "Crushed stone (angular, with fines) locks together under tires and stays put; it is the standard driveway choice. Pea gravel is round, looks nicer, and shifts under tires and feet, so it suits paths and beds better than driveways. For parking areas, pick crushed stone.",
  },
  {
    q: "How much does gravel delivery cost?",
    a: "As a typical range, delivery runs about $50-$200 per load on top of the material, and many yards have minimum orders or charge more per yard for small loads. Distance from the quarry is the main variable: a yard across town costs more to deliver than one nearby, so get quotes from the closest suppliers first.",
  },
  {
    q: "Do I need landscape fabric under gravel?",
    a: "For driveways, fabric helps keep stone from sinking into soft soil and slows weeds, and it is cheap insurance on new ground. On an existing hard-packed driveway, it matters less. For garden paths and beds, fabric under the gravel is standard practice.",
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
    { "@type": "ListItem", position: 3, name: "How Much Does Gravel Cost?", item: PAGE_URL },
  ],
};

export default function GravelCostGuide() {
  return (
    <article className="mx-auto max-w-content px-4 py-10 sm:px-6">
      <JsonLd data={faqJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <nav aria-label="Breadcrumb" className="mb-4 text-sm text-slate-500">
        <Link href="/">Home</Link> <span aria-hidden="true">›</span>{" "}
        <Link href="/guides">Guides</Link> <span aria-hidden="true">›</span>{" "}
        <span aria-current="page">Gravel Cost Guide</span>
      </nav>

      <p className="eyebrow">Cost guide</p>
      <h1 className="mt-2 max-w-3xl text-3xl sm:text-4xl">
        How Much Does Gravel Cost?
      </h1>
      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-600">
        Gravel is sold by the cubic yard, and the total is mostly volume
        times stone type, plus delivery. Here are the typical material
        and delivery ranges, plus what pushes any quote up or down.
      </p>
      <div className="mt-4">
        <AuthorByline />
      </div>

      <div className="prose-hmb mt-10 max-w-3xl">
        <div className="not-prose mb-8 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          <strong>Ranges, not quotes.</strong> All figures below are typical
          US ranges reported by suppliers and home-improvement sources.
          Actual prices vary widely by region, stone type, delivery
          distance, and order size, use them to evaluate quotes, not
          replace them.
        </div>

        <h2>Quick answer: typical gravel cost ranges</h2>
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Typical range</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Crushed stone, bulk (per cu yd)</td>
              <td>$30-$75</td>
            </tr>
            <tr>
              <td>Pea gravel, bulk (per cu yd)</td>
              <td>$35-$80</td>
            </tr>
            <tr>
              <td>Delivery (per load)</td>
              <td>$50-$200 extra</td>
            </tr>
            <tr>
              <td>Bagged gravel (0.5 cu ft bag)</td>
              <td>$4-$6 per bag</td>
            </tr>
          </tbody>
        </table>
        <p>
          A 12x50 ft driveway at 4 inches deep needs about{" "}
          <strong>8 cu yd with waste</strong>, so bulk material runs
          roughly <strong>$240-$600</strong> for crushed stone, plus
          delivery. Bagged gravel costs far more per yard and only makes
          sense for small repairs and paths.
        </p>

        <AdSlot label="Advertisement" className="my-8 h-28" />

        <h2>What drives the price</h2>
        <ul>
          <li>
            <strong>Stone type.</strong> Plain crushed stone is the
            cheapest bulk option. Decorative stone (river rock, pea
            gravel, specialty colors) costs more per yard, sometimes
            much more.
          </li>
          <li>
            <strong>Depth.</strong> The biggest lever after area. A
            driveway at 6 inches costs 50% more stone than the same
            driveway at 4 inches, measure the depth you actually need
            rather than rounding up blindly.
          </li>
          <li>
            <strong>Delivery distance and load size.</strong> Delivery is
            priced per load, and small loads cost more per yard than
            full truckloads. Yards near a quarry pay less; remote
            delivery costs more.
          </li>
          <li>
            <strong>Base prep and excavation.</strong> A new driveway
            needs excavation, grading, and compaction before stone goes
            down. That earthwork often costs more than the stone itself
            and is quoted separately.
          </li>
          <li>
            <strong>Landscape fabric and edging.</strong> Fabric under
            the stone and edging to hold it in place are small costs
            that prevent the two common failures: stone sinking into mud
            and stone migrating into the lawn.
          </li>
          <li>
            <strong>Spreading and compaction.</strong> A dumped pile is
            not a driveway. Spreading by machine and compacting in
            layers is labor or equipment rental on top of material.
          </li>
        </ul>

        <h2>Worked example: 12x50 ft driveway, 4 inches deep</h2>
        <ol>
          <li>
            <strong>Area:</strong> 12 x 50 = <strong>600 sq ft</strong>.
          </li>
          <li>
            <strong>Volume:</strong> 600 x (4 / 12) ={" "}
            <strong>200 cu ft</strong>, which is 200 / 27 ={" "}
            <strong>7.4 cu yd</strong>. Run your own dimensions through
            our <Link href="/gravel-calculator">gravel calculator</Link>{" "}
            for yards, tons, and bags.
          </li>
          <li>
            <strong>Order with waste:</strong> round up to{" "}
            <strong>8 cu yd</strong>.
          </li>
          <li>
            <strong>Material:</strong> 8 x $30-$75 ={" "}
            <strong>$240-$600</strong> for crushed stone.
          </li>
          <li>
            <strong>Add delivery:</strong> roughly{" "}
            <strong>$50-$200</strong> per load, so a typical total of{" "}
            <strong>$290-$800</strong> before excavation, fabric, and
            spreading.
          </li>
        </ol>

        <h2>DIY vs. hiring a contractor</h2>
        <p>
          For paths and small pads, DIY is realistic: order a pile,
          wheelbarrow it in, rake it level, and compact it with a rented
          plate compactor. For driveways, hire out the base work at
          least: excavation depth, drainage slope, and compaction in
          layers decide whether the driveway holds up or ruts in the
          first year, and a skid-steer does in an hour what takes a
          weekend by wheelbarrow. You can still save money by spreading
          the top layer yourself after the base is done right.
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
          <Link href="/gravel-calculator">gravel calculator</Link> for
          yards, tons, and bags, and see the{" "}
          <Link href="/guides/paver-cost-guide">paver patio cost guide</Link>{" "}
          if you are comparing loose gravel against pavers.
        </p>
      </div>
    </article>
  );
}
