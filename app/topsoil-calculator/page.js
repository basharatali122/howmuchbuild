import Link from "next/link";
import TopsoilCalculator from "@/components/TopsoilCalculator";
import AdSlot from "@/components/AdSlot";
import JsonLd from "@/components/JsonLd";
import AuthorByline from "@/components/AuthorByline";
import TableOfContents from "@/components/TableOfContents";
import RelatedCalculators from "@/components/RelatedCalculators";
import { SITE_URL, SITE_NAME } from "@/lib/siteConfig";

export const metadata = {
  title: "Topsoil Calculator: Cubic Yards, Bags & Raised Bed Soil",
  description:
    "Free topsoil calculator: enter your lawn area or raised bed dimensions and get cubic yards needed plus bag equivalents (1 cu ft and 1.5 cu ft bags) — with an order-over allowance for settling.",
  alternates: {
    canonical: `${SITE_URL}/topsoil-calculator`,
  },
  openGraph: {
    title: "Topsoil Calculator: Cubic Yards, Bags & Raised Bed Soil",
    description:
      "Cubic yards and bag counts for lawns and raised beds, with a worked 4×8 bed example and a coverage chart.",
    url: `${SITE_URL}/topsoil-calculator`,
    type: "article",
  },
};

const PAGE_URL = `${SITE_URL}/topsoil-calculator`;

const FAQ_ITEMS = [
  {
    q: "How many cubic feet are in a cubic yard?",
    a: "27. A yard is 3 feet, so 3 × 3 × 3 = 27 cubic feet — exact, no rounding involved.",
  },
  {
    q: "How many bags of topsoil make a cubic yard?",
    a: "27 bags of the 1 cu ft size, or 18 bags of the 1.5 cu ft size (27 ÷ 1.5 = 18). That's exact arithmetic from the 27 cu ft per yard.",
  },
  {
    q: "How much topsoil do I need for a 4×8 raised bed?",
    a: "A 4×8 ft bed filled 12 inches deep is 4 × 8 × 1 = 32 cu ft, which is 32 ÷ 27 = 1.19 cubic yards. Order about 1.5 yards of bulk topsoil to cover settling, or 32 one-cubic-foot bags (22 of the 1.5 cu ft bags).",
  },
  {
    q: "Why should I order extra topsoil?",
    a: "Bulk topsoil typically settles 20–30% as it compacts and organic matter breaks down (typical guidance), and no grade is perfectly even. A 10–30% order-over allowance is cheap insurance — running short mid-project means a second delivery fee.",
  },
  {
    q: "How deep should topsoil be for a new lawn?",
    a: "As a rule of thumb: 3–4 inches of quality topsoil is common for topdressing or renovation, and 4–6 inches of workable soil for a brand-new lawn bed. Deeper than that, blend with what's underneath rather than stacking pure topsoil.",
  },
  {
    q: "Is it cheaper to buy topsoil in bulk or in bags?",
    a: "Bags win for small jobs; bulk wins once you're near a cubic yard or more. A bagged cubic yard costs far more per yard than bulk delivered — but a bulk delivery has a minimum and a delivery fee, so small beds are cheaper in bags.",
  },
  {
    q: "Can I fill a raised bed with topsoil alone?",
    a: "You can, but it's not ideal. Straight topsoil compacts over a season and drains slowly. A common approach is roughly 60% topsoil blended with 40% compost and aeration material — better drainage, better roots.",
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
      name: "Topsoil Calculator",
      item: PAGE_URL,
    },
  ],
};

const TOC_ITEMS = [
    { id: "calculator", label: "Calculator" },
    { id: "worked-example", label: "Worked example" },
    { id: "coverage-chart", label: "Coverage chart" },
    { id: "formulas", label: "Formulas" },
    { id: "faqs", label: "FAQs" }
];

const RELATED_ITEMS = [
    {
      href: "/sod-calculator",
      title: "Sod Calculator",
      desc: "Sod pallets for the lawn going over your topsoil.",
    },
    {
      href: "/mulch-calculator",
      title: "Mulch Calculator",
      desc: "Mulch quantities for planted beds and borders.",
    },
    {
      href: "/gravel-calculator",
      title: "Gravel Calculator",
      desc: "Gravel for drainage layers and paths.",
    }
];

export default function TopsoilCalculatorPage() {
  return (
    <article className="mx-auto max-w-content px-4 py-10 sm:px-6">
      <JsonLd data={faqJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <nav aria-label="Breadcrumb" className="mb-4 text-sm text-slate-500">
        <Link href="/">Home</Link> <span aria-hidden="true">›</span>{" "}
        <span aria-current="page">Topsoil Calculator</span>
      </nav>

      <p className="eyebrow">Free calculator</p>
      <h1 className="max-w-3xl text-3xl sm:text-4xl">
        Topsoil Calculator: Cubic Yards, Bags &amp; Raised Bed Soil
      </h1>
      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-600">
        Bulk topsoil is priced by the cubic yard, bags are priced by the
        cubic foot, and your project is measured in feet and inches — this
        tool bridges all three. Pick your project type (lawn area or raised
        bed), add an order-over allowance for settling, and get cubic yards
        plus exact bag equivalents. No sign-up: the math runs
        entirely in your browser.
      </p>

      <div className="mt-4">
        <AuthorByline />
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_260px]">
        <div className="min-w-0">
          <TopsoilCalculator />

          <AdSlot label="Advertisement" className="my-8 h-28" />

          <div className="prose-hmb mt-12 max-w-3xl">
        <h2 id="worked-example">Worked example: 4×8 ft raised bed, 12″ deep</h2>
        <p>
          The most common raised bed size, filled a full foot deep. Full
          arithmetic, step by step:
        </p>
        <ol>
          <li>
            <strong>Volume:</strong> 4 ft × 8 ft × (12 ÷ 12) ft ={" "}
            <strong>32 cu ft</strong>
          </li>
          <li>
            <strong>In cubic yards:</strong> 32 ÷ 27 ={" "}
            <strong>1.19 cu yd</strong>
          </li>
          <li>
            <strong>Order size:</strong> round up and allow for settling →{" "}
            <strong>order 1.5 cu yd</strong> of bulk topsoil
          </li>
          <li>
            <strong>Bagged instead:</strong> 32 one-cubic-foot bags, or 32 ÷
            1.5 = 21.33 → <strong>22 bags of the 1.5 cu ft size</strong>
          </li>
        </ol>

        <h2 id="lawn-example">Worked example: 20×30 ft lawn, 3″ of topsoil</h2>
        <ol>
          <li>
            <strong>Volume:</strong> 20 ft × 30 ft × (3 ÷ 12) ft ={" "}
            <strong>150 cu ft</strong>
          </li>
          <li>
            <strong>In cubic yards:</strong> 150 ÷ 27 ={" "}
            <strong>5.56 cu yd</strong> → <strong>order 6 cu yd</strong>
          </li>
          <li>
            <strong>Bagged instead:</strong> <strong>150</strong> one-cubic-foot
            bags, or 150 ÷ 1.5 = <strong>100</strong> of the 1.5 cu ft bags
          </li>
        </ol>

        <h2 id="coverage-chart">Coverage chart: what one cubic yard covers</h2>
        <p>
          Square feet covered by 1 cubic yard (27 cu ft) at each depth —
          exact arithmetic (324 ÷ depth in inches):
        </p>
        <table>
          <thead>
            <tr>
              <th>Depth</th>
              <th>Area covered by 1 cu yd</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1″</td>
              <td>324 sq ft</td>
            </tr>
            <tr>
              <td>2″</td>
              <td>162 sq ft</td>
            </tr>
            <tr>
              <td>3″</td>
              <td>108 sq ft</td>
            </tr>
            <tr>
              <td>4″</td>
              <td>81 sq ft</td>
            </tr>
            <tr>
              <td>6″</td>
              <td>54 sq ft</td>
            </tr>
            <tr>
              <td>12″</td>
              <td>27 sq ft</td>
            </tr>
          </tbody>
        </table>

        <h2 id="raised-beds">Topsoil for common raised beds</h2>
        <p>Exact volumes — add 10–30% for settling when ordering bulk:</p>
        <table>
          <thead>
            <tr>
              <th>Bed size</th>
              <th>Volume</th>
              <th>Cubic yards</th>
              <th>1 cu ft bags</th>
              <th>1.5 cu ft bags</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>2×4 ft, 6″ deep</td>
              <td>4 cu ft</td>
              <td>0.15</td>
              <td>4</td>
              <td>3</td>
            </tr>
            <tr>
              <td>4×4 ft, 6″ deep</td>
              <td>8 cu ft</td>
              <td>0.30</td>
              <td>8</td>
              <td>6</td>
            </tr>
            <tr>
              <td>4×8 ft, 6″ deep</td>
              <td>16 cu ft</td>
              <td>0.59</td>
              <td>16</td>
              <td>11</td>
            </tr>
            <tr>
              <td>4×8 ft, 12″ deep</td>
              <td>32 cu ft</td>
              <td>1.19</td>
              <td>32</td>
              <td>22</td>
            </tr>
            <tr>
              <td>4×12 ft, 12″ deep</td>
              <td>48 cu ft</td>
              <td>1.78</td>
              <td>48</td>
              <td>32</td>
            </tr>
          </tbody>
        </table>

        <h2 id="formulas">The formulas</h2>
        <h3>Volume (both modes)</h3>
        <p>
          <strong>V = Length × Width × Depth</strong> — all in feet, depth
          converted from inches (÷ 12).
        </p>
        <h3>Cubic yards</h3>
        <p>
          <strong>cu yd = V ÷ 27</strong> — exact, since one cubic yard is
          exactly 27 cubic feet. With an order-over allowance: V × 1.10 ÷ 27
          (adjust the slider for 0–30%).
        </p>
        <h3>Bag equivalents</h3>
        <p>
          <strong>Bags = ⌈ V ÷ bag size ⌉</strong> — 27 bags of 1 cu ft, or 18
          bags of 1.5 cu ft, per cubic yard. Always round up; partial bags
          don&apos;t exist at the register.
        </p>

        <h2 id="faqs">Frequently asked questions</h2>
        {FAQ_ITEMS.map((f) => (
          <div key={f.q} className="mb-6">
            <h3 className="!mt-6">{f.q}</h3>
            <p>{f.a}</p>
          </div>
        ))}

        <h2 id="settling">Settling and the order-over allowance</h2>
        <p>
          Freshly delivered bulk topsoil is loose; once spread, rained on, and
          walked on, it typically settles about 20–30% (typical guidance).
          That&apos;s why the calculator includes an order-over slider —
          defaulting to 10%, adjustable to 30%. For raised beds, slightly
          overfilling is self-correcting: the bed sinks to level within a few
          weeks. For lawns, the allowance covers low spots and uneven
          subgrade. Bagged soil needs no such allowance — you buy the exact
          cubic footage, which is one reason bags are simpler for small beds.
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
