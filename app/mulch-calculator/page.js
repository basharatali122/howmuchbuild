import Link from "next/link";
import MulchCalculator from "@/components/MulchCalculator";
import AdSlot from "@/components/AdSlot";
import JsonLd from "@/components/JsonLd";
import { SITE_URL, SITE_NAME } from "@/lib/siteConfig";

export const metadata = {
  title: "Mulch Calculator — How Many Bags or Cubic Yards Do I Need?",
  description:
    "Free mulch calculator: enter your bed shape, size, and depth to get exact cubic yards plus a bags-vs-bulk comparison (2 cu ft bags), with a coverage chart and worked example.",
  alternates: {
    canonical: `${SITE_URL}/mulch-calculator`,
  },
  openGraph: {
    title: "Mulch Calculator — How Many Bags or Cubic Yards Do I Need?",
    description:
      "Enter your bed dimensions and depth — get cubic yards, bag counts, and a bags-vs-bulk breakdown, always rounded up.",
    url: `${SITE_URL}/mulch-calculator`,
    type: "article",
  },
};

const PAGE_URL = `${SITE_URL}/mulch-calculator`;

const FAQ_ITEMS = [
  {
    q: "How many bags of mulch are in a cubic yard?",
    a: "13.5, by the math: a cubic yard is 27 cubic feet and a standard mulch bag is 2 cubic feet (27 ÷ 2 = 13.5). In practice you'd buy 14 bags, since you can't buy half a bag.",
  },
  {
    q: "How much area does one cubic yard of mulch cover?",
    a: "Exactly 108 square feet at 3 inches deep (27 ÷ 0.25). The industry rule of thumb rounds this to about 100 square feet per yard at 3″ deep — slightly conservative, which is what you want when ordering.",
  },
  {
    q: "How deep should mulch be?",
    a: "2–3 inches is the standard recommendation for maintained beds; fresh beds being mulched for the first time often go 3–4 inches. More than 4 inches can smother roots and stay soggy.",
  },
  {
    q: "Should I buy mulch in bags or in bulk?",
    a: "Bags win for small beds — they're easy to move and there's no minimum. Bulk (delivered by the cubic yard) usually costs less per yard once you need around 2 cubic yards or more. At 13.5 bags per yard, the crossover point shows up fast.",
  },
  {
    q: "How many bags of mulch do I need for a 10×10 area?",
    a: "At 3 inches deep: 10 × 10 = 100 sq ft, × 0.25 ft = 25 cubic feet. That's 25 ÷ 2 = 12.5 → 13 bags (or 0.93 cubic yards in bulk).",
  },
  {
    q: "Do all mulch bags hold 2 cubic feet?",
    a: "No — check the bag. 2 cu ft is the most common size, but 1.5 and 3 cu ft bags exist. Divide your total cubic feet by the number printed on your bag and round up.",
  },
  {
    q: "Will mulch settle after I spread it?",
    a: "Yes. Fresh mulch settles and decomposes noticeably in the first weeks — which is exactly why the calculator includes a waste and settling allowance. Top off beds each season rather than over-buying up front.",
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
      name: "Mulch Calculator",
      item: PAGE_URL,
    },
  ],
};

export default function MulchCalculatorPage() {
  return (
    <article className="mx-auto max-w-content px-4 py-10 sm:px-6">
      <JsonLd data={faqJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <nav aria-label="Breadcrumb" className="mb-4 text-sm text-slate-500">
        <Link href="/">Home</Link> <span aria-hidden="true">›</span>{" "}
        <span aria-current="page">Mulch Calculator</span>
      </nav>

      <h1 className="max-w-3xl text-3xl sm:text-4xl">
        Mulch Calculator: How Many Bags or Cubic Yards Do You Need?
      </h1>
      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-600">
        Pick your bed shape, punch in the size and depth, and get the exact
        cubic yards you need — plus a bags-vs-bulk comparison using standard
        2 cu ft bags, always rounded up. The math runs entirely in your
        browser: no sign-up, no tracking.
      </p>

      <div className="mt-8">
        <MulchCalculator />
      </div>

      <AdSlot label="Advertisement" className="my-8 h-28" />

      <div className="prose-hmb mt-12 max-w-3xl">
        <h2>Worked example: 10×12 ft bed at 3 inches deep</h2>
        <p>
          A typical flower bed against the house. Here is the full arithmetic,
          step by step:
        </p>
        <ol>
          <li>
            <strong>Area:</strong> 10 ft × 12 ft = <strong>120 sq ft</strong>
          </li>
          <li>
            <strong>Depth in feet:</strong> 3 ÷ 12 = <strong>0.25 ft</strong>
          </li>
          <li>
            <strong>Volume:</strong> 120 × 0.25 = <strong>30 cu ft</strong>
          </li>
          <li>
            <strong>Cubic yards:</strong> 30 ÷ 27 = <strong>1.11 cu yd</strong>
          </li>
          <li>
            <strong>Bags (2 cu ft):</strong> 30 ÷ 2 = <strong>15 bags</strong>
          </li>
          <li>
            <strong>With 10% waste:</strong> 30 × 1.10 = 33 cu ft → 33 ÷ 27 ={" "}
            <strong>1.22 cu yd</strong>, or 33 ÷ 2 = 16.5 →{" "}
            <strong>17 bags</strong>
          </li>
        </ol>

        <h2>Mulch coverage chart: one cubic yard</h2>
        <p>
          One cubic yard is exactly 27 cubic feet. Deeper beds eat yards fast:
        </p>
        <table>
          <thead>
            <tr>
              <th>Depth</th>
              <th>1 cu yd covers</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>2″</td>
              <td>162 sq ft</td>
              <td>light top-off</td>
            </tr>
            <tr>
              <td>3″</td>
              <td>108 sq ft</td>
              <td>rule of thumb: ≈ 100 sq ft</td>
            </tr>
            <tr>
              <td>4″</td>
              <td>81 sq ft</td>
              <td>fresh bed depth</td>
            </tr>
            <tr>
              <td>6″</td>
              <td>54 sq ft</td>
              <td>rarely recommended</td>
            </tr>
          </tbody>
        </table>
        <p>
          The exact math at 3 inches is 27 ÷ 0.25 = 108 sq ft. The industry
          rounds to <strong>100 sq ft per yard at 3″</strong> as a
          rule of thumb — deliberately a touch conservative, which beats
          coming up half a yard short.
        </p>

        <h2>Common bed sizes at 3″ deep</h2>
        <p>Bags below use standard 2 cu ft bags; figures exclude waste:</p>
        <table>
          <thead>
            <tr>
              <th>Bed</th>
              <th>Area</th>
              <th>Cubic yards</th>
              <th>2 cu ft bags</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>5×10 ft rectangle</td>
              <td>50 sq ft</td>
              <td>0.46</td>
              <td>7</td>
            </tr>
            <tr>
              <td>10×12 ft rectangle</td>
              <td>120 sq ft</td>
              <td>1.11</td>
              <td>15</td>
            </tr>
            <tr>
              <td>10×20 ft rectangle</td>
              <td>200 sq ft</td>
              <td>1.85</td>
              <td>25</td>
            </tr>
            <tr>
              <td>20×20 ft rectangle</td>
              <td>400 sq ft</td>
              <td>3.70</td>
              <td>50</td>
            </tr>
            <tr>
              <td>10 ft diameter circle</td>
              <td>78.5 sq ft</td>
              <td>0.73</td>
              <td>10</td>
            </tr>
            <tr>
              <td>8×10 ft triangle</td>
              <td>40 sq ft</td>
              <td>0.37</td>
              <td>5</td>
            </tr>
          </tbody>
        </table>

        <h2>Bags vs. bulk: which should you buy?</h2>
        <p>
          Since 27 ÷ 2 = 13.5, every cubic yard of bulk equals about fourteen
          2 cu ft bags. Bags are grab-and-go with no delivery minimum, which
          suits small beds and apartments. Bulk is delivered by the cubic yard
          and generally costs less per yard — the savings usually win from
          about 2 cubic yards upward. A word of caution: a bulk pile settles
          and can run a little light, so keep the waste allowance on when
          ordering bulk.
        </p>

        <h2>The formulas</h2>
        <h3>Rectangle bed</h3>
        <p>
          <strong>Area = Length × Width</strong> (feet). Volume = area ×
          (depth ÷ 12).
        </p>
        <h3>Circle bed</h3>
        <p>
          <strong>Area = π × (diameter ÷ 2)².</strong> Measure straight across
          the widest point.
        </p>
        <h3>Triangle bed</h3>
        <p>
          <strong>Area = ½ × base × height</strong> — height is the
          perpendicular height, not the slanted edge.
        </p>
        <h3>Cubic yards and bags</h3>
        <p>
          <strong>Cubic yards = volume (cu ft) ÷ 27.</strong>{" "}
          <strong>Bags = ⌈ volume ÷ 2 ⌉</strong> for standard 2 cu ft bags —
          always round up.
        </p>

        <h2>Frequently asked questions</h2>
        {FAQ_ITEMS.map((f) => (
          <div key={f.q} className="mb-6">
            <h3 className="!mt-6">{f.q}</h3>
            <p>{f.a}</p>
          </div>
        ))}

        <h2>How deep should you spread it?</h2>
        <p>
          General guidance: 2–3 inches for beds you top off every year, 3–4
          inches when mulching bare soil for the first time. Spread it evenly,
          and keep it pulled back a few inches from trunks and stems — piled-up
          &quot;mulch volcanoes&quot; trap moisture against bark. Because
          mulch settles and decomposes, measure to your target depth after
          spreading, not to the depth of the fresh pile in the truck.
        </p>
      </div>
    </article>
  );
}
