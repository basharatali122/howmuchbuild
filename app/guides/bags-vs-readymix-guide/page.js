import Link from "next/link";
import AdSlot from "@/components/AdSlot";
import JsonLd from "@/components/JsonLd";
import AuthorByline from "@/components/AuthorByline";
import { SITE_URL, SITE_NAME } from "@/lib/siteConfig";

export const metadata = {
  title: "Concrete Bags vs. Ready-Mix: Which Is Cheaper? (Break-Even Math)",
  description:
    "Bags vs. ready-mix concrete: the per-yard math, typical prices, short-load fees, and the project sizes where each option wins.",
  alternates: {
    canonical: `${SITE_URL}/guides/bags-vs-readymix-guide`,
  },
  openGraph: {
    title: `Concrete Bags vs. Ready-Mix: Which Is Cheaper? | ${SITE_NAME} Guides`,
    description:
      "The break-even math between bagged concrete and a ready-mix truck — with a worked slab example.",
    url: `${SITE_URL}/guides/bags-vs-readymix-guide`,
    type: "article",
  },
};

const PAGE_URL = `${SITE_URL}/guides/bags-vs-readymix-guide`;
const GUIDES_URL = `${SITE_URL}/guides`;

const FAQ_ITEMS = [
  {
    q: "How many 80-lb bags of concrete are in a cubic yard?",
    a: "45 bags. One cubic yard is 27 cubic feet, and an 80-lb bag yields 0.6 cubic feet: 27 ÷ 0.6 = 45 exactly. (60-lb bags: 60 per yard; 40-lb bags: 90 per yard.)",
  },
  {
    q: "Is it cheaper to buy concrete in bags or ready-mix?",
    a: "Per cubic yard, ready-mix is almost always cheaper — typically $140–$200 per yard delivered versus $225–$360 per yard in 80-lb bags at typical $5–$8 per bag. But ready-mix has minimums and short-load fees, so bags win for very small jobs under about a cubic yard.",
  },
  {
    q: "What is a short-load fee?",
    a: "A surcharge batch plants charge when you order less than a full truck (usually 3–4+ yards). Typical short-load fees run $50–$150+, which can erase the per-yard savings on small pours — always ask for the all-in price, not just the per-yard rate.",
  },
  {
    q: "Can I mix a whole slab with bags in a mixer?",
    a: "You can, but it's slow, exhausting work (guidance). A 10×10 ft, 4-inch slab needs 56+ bags — that's over two tons of dry mix to haul, mix, and place before any of it sets. For pours over ~1 yard, most DIYers either order ready-mix or split the work across days with cold joints.",
  },
  {
    q: "How do I convert my project to cubic yards?",
    a: "Length × width × thickness (all in feet) ÷ 27. Our concrete calculator does it for slabs, walls, footings, and columns — and the concrete bags calculator converts the same volume into 80, 60, and 40-lb bag counts.",
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
    { "@type": "ListItem", position: 3, name: "Concrete Bags vs. Ready-Mix: Which Is Cheaper?", item: PAGE_URL },
  ],
};

export default function BagsVsReadymixGuide() {
  return (
    <article className="mx-auto max-w-content px-4 py-10 sm:px-6">
      <JsonLd data={faqJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <nav aria-label="Breadcrumb" className="mb-4 text-sm text-slate-500">
        <Link href="/">Home</Link> <span aria-hidden="true">›</span>{" "}
        <Link href="/guides">Guides</Link> <span aria-hidden="true">›</span>{" "}
        <span aria-current="page">Bags vs. Ready-Mix</span>
      </nav>

      <p className="eyebrow">Cost guide</p>
      <h1 className="mt-2 max-w-3xl text-3xl sm:text-4xl">
        Concrete Bags vs. Ready-Mix: Which Is Cheaper?
      </h1>
      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-600">
        Per yard, a ready-mix truck beats bags by a wide margin — but
        minimums, short-load fees, and the sheer labor of mixing 50+ bags
        decide the real answer. Here is the break-even math.
      </p>
      <div className="mt-4">
        <AuthorByline />
      </div>

      <div className="prose-hmb mt-10 max-w-3xl">
        <div className="not-prose mb-8 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          <strong>Ranges, not quotes.</strong> Prices below are typical US
          ranges. Bag prices vary by store and brand; ready-mix rates vary
          by plant, mix design, and distance — always get the all-in price
          including fees.
        </div>

        <h2>The per-yard math</h2>
        <p>
          One cubic yard is 27 cubic feet (exact). An 80-lb bag of premix
          yields 0.6 cubic feet, so:
        </p>
        <ul>
          <li>
            <strong>80-lb bags per yard:</strong> 27 ÷ 0.6 ={" "}
            <strong>45 bags</strong>
          </li>
          <li>
            <strong>60-lb bags per yard:</strong> 27 ÷ 0.45 ={" "}
            <strong>60 bags</strong>
          </li>
          <li>
            <strong>40-lb bags per yard:</strong> 27 ÷ 0.3 ={" "}
            <strong>90 bags</strong>
          </li>
        </ul>
        <p>At typical prices:</p>
        <table>
          <thead>
            <tr>
              <th>Option</th>
              <th>Typical price</th>
              <th>Cost per cubic yard</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>80-lb bags ($5–$8 each)</td>
              <td>45 bags</td>
              <td>$225–$360</td>
            </tr>
            <tr>
              <td>Ready-mix, full load</td>
              <td>$140–$200/yd delivered</td>
              <td>$140–$200</td>
            </tr>
            <tr>
              <td>Ready-mix, short load</td>
              <td>$140–$200/yd + $50–$150+ fee</td>
              <td>$190–$350+</td>
            </tr>
          </tbody>
        </table>

        <AdSlot label="Advertisement" className="my-8 h-28" />

        <h2>The break-even rule</h2>
        <table>
          <thead>
            <tr>
              <th>Project size</th>
              <th>Usually cheaper</th>
              <th>Why</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Under ~1 cu yd</td>
              <td>Bags</td>
              <td>No minimums or fees; mix only what you need</td>
            </tr>
            <tr>
              <td>~1–2 cu yd</td>
              <td>Compare both</td>
              <td>Short-load fees can erase the truck&apos;s per-yard edge</td>
            </tr>
            <tr>
              <td>Over ~2–3 cu yd</td>
              <td>Ready-mix truck</td>
              <td>Per-yard price wins by a wide margin</td>
            </tr>
          </tbody>
        </table>
        <p>
          These are rules of thumb (guidance), not laws — a $50 short-load
          fee on a 2-yard pour still beats 90 bags at $6 each ($540 vs.
          ~$390). Run your own numbers with the all-in prices from your
          local plant and store.
        </p>

        <h2>Worked example: 10×10 ft slab, 4″ thick</h2>
        <ol>
          <li>
            <strong>Volume:</strong> 10 × 10 × (4 ÷ 12) = 33.33 cu ft =
            1.23 cu yd → with 10% waste, <strong>~1.36 cu yd</strong>.
          </li>
          <li>
            <strong>Bags:</strong> 62 eighty-pound bags (rounded up) × $6 =
            <strong>~$372</strong> — plus hauling two tons of bags and
            hours of mixing.
          </li>
          <li>
            <strong>Ready-mix:</strong> order 1.5–2 yards at ~$170/yd ={" "}
            <strong>~$255–$340</strong>, possibly plus a short-load fee.
          </li>
          <li>
            <strong>Verdict:</strong> the truck wins on price <em>and</em>{" "}
            labor for this slab — unless access forces wheelbarrowing, in
            which case bags placed in small batches have their own logic.
          </li>
        </ol>
        <p>
          Get your exact volume and bag count with our{" "}
          <Link href="/concrete-bags-calculator">
            concrete bags calculator
          </Link>{" "}
          or <Link href="/concrete-calculator">concrete calculator</Link>,
          then price both options.
        </p>

        <h2>Don&apos;t forget the labor</h2>
        <p>
          Price isn&apos;t only dollars. Mixing 45+ bags means hauling over a
          ton and a half of dry mix, mixing batch after batch, and placing
          it all before the first batches set — genuinely exhausting work
          on a deadline (guidance). A ready-mix truck places a yard in
          minutes. For fence posts and tiny pads, bags are convenient;
          for anything slab-sized, value your weekend too.
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
