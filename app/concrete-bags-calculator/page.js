import Link from "next/link";
import ConcreteBagsCalculator from "@/components/ConcreteBagsCalculator";
import AdSlot from "@/components/AdSlot";
import JsonLd from "@/components/JsonLd";
import { SITE_URL, SITE_NAME } from "@/lib/siteConfig";

export const metadata = {
  title: "How Many Bags of Concrete Do I Need? (Calculator + Chart)",
  description:
    "Free concrete bags calculator: enter your slab, wall, footing, sonotube, or fence post dimensions and get exact bag counts for 40, 60, and 80 lb bags — with waste factor, cost estimate, and a coverage chart.",
  alternates: {
    canonical: `${SITE_URL}/concrete-bags-calculator`,
  },
  openGraph: {
    title: "How Many Bags of Concrete Do I Need? (Calculator + Chart)",
    description:
      "Enter your dimensions, get exact 40/60/80 lb bag counts with waste and cost — plus worked examples and coverage charts.",
    url: `${SITE_URL}/concrete-bags-calculator`,
    type: "article",
  },
};

const PAGE_URL = `${SITE_URL}/concrete-bags-calculator`;

const FAQ_ITEMS = [
  {
    q: "How many bags of concrete do I need for a 10×10 slab?",
    a: "A 10×10 ft slab at 4 inches thick is 33.33 cubic feet. That takes 56 eighty-pound bags (62 with a 10% waste allowance), 75 sixty-pound bags (82 with waste), or 112 forty-pound bags (123 with waste).",
  },
  {
    q: "How many bags of concrete do I need for a fence post?",
    a: "For a typical 12-inch-diameter hole, 36 inches deep, with a 4×4 post (actual 3.5×3.5 in), each hole needs about 2.1 cubic feet of concrete after subtracting the post — that's 4 eighty-pound bags per hole.",
  },
  {
    q: "How many bags of concrete for a 4×4 slab?",
    a: "A 4×4 ft slab at 4 inches thick is 5.33 cubic feet, which needs 9 eighty-pound bags (10 with a 10% waste allowance).",
  },
  {
    q: "How many bags of concrete do I need for a sonotube?",
    a: "A 12-inch-diameter sonotube, 4 feet tall, holds 3.14 cubic feet of concrete — that's 6 eighty-pound bags, always rounded up.",
  },
  {
    q: "How much does one 80 lb bag of concrete cover?",
    a: "One 80 lb bag yields 0.60 cubic feet of cured concrete. At 4 inches thick it covers about 1.8 square feet; at 6 inches thick, about 1.2 square feet.",
  },
  {
    q: "How many 80 lb bags are in a cubic yard?",
    a: "Exactly 45. One cubic yard is 27 cubic feet, and an 80 lb bag yields 0.60 cubic feet (27 ÷ 0.60 = 45). A 60 lb bag yields 0.45 cu ft, so 60 bags per yard; a 40 lb bag yields 0.30 cu ft, so 90 bags per yard.",
  },
  {
    q: "Should I add extra concrete for waste?",
    a: "Yes — add 5–10% for slabs and footings, and 10% is a safe default for post holes. Uneven subgrade, spillage, and over-digging always consume more than the math says. The calculator above includes an adjustable waste slider.",
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
      name: "Concrete Bags Calculator",
      item: PAGE_URL,
    },
  ],
};

export default function ConcreteBagsCalculatorPage() {
  return (
    <article className="mx-auto max-w-content px-4 py-10 sm:px-6">
      <JsonLd data={faqJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <nav aria-label="Breadcrumb" className="mb-4 text-sm text-slate-500">
        <Link href="/">Home</Link> <span aria-hidden="true">›</span>{" "}
        <span aria-current="page">Concrete Bags Calculator</span>
      </nav>

      <h1 className="max-w-3xl text-3xl sm:text-4xl">
        How Many Bags of Concrete Do I Need?
      </h1>
      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-600">
        Enter your slab, wall, footing, sonotube, or fence-post dimensions
        below and get an exact bag count for 40, 60, and 80&nbsp;lb bags —
        always rounded up, with an adjustable waste allowance and an optional
        cost estimate. No sign-up, no tracking: the math runs entirely in
        your browser.
      </p>

      <div className="mt-8">
        <ConcreteBagsCalculator />
      </div>

      <AdSlot label="Advertisement" className="my-8 h-28" />

      <div className="prose-hmb mt-12 max-w-3xl">
        <h2>Worked example: 10×10 ft slab at 4 inches thick</h2>
        <p>
          This is the most common DIY pour — a patio or shed slab. Here is the
          full arithmetic, step by step:
        </p>
        <ol>
          <li>
            <strong>Volume:</strong> 10 ft × 10 ft × (4 ÷ 12) ft = 10 × 10 ×
            0.3333 = <strong>33.33 cu ft</strong>
          </li>
          <li>
            <strong>In cubic yards:</strong> 33.33 ÷ 27 ={" "}
            <strong>1.235 cu yd</strong>
          </li>
          <li>
            <strong>80 lb bags:</strong> 33.33 ÷ 0.60 = 55.55 → round up ={" "}
            <strong>56 bags</strong>
          </li>
          <li>
            <strong>With 10% waste:</strong> 33.33 × 1.10 = 36.67 cu ft;
            36.67 ÷ 0.60 = 61.11 → round up = <strong>62 bags</strong>
          </li>
        </ol>
        <p>
          The same slab needs <strong>75 sixty-pound bags</strong> (82 with
          waste) or <strong>112 forty-pound bags</strong> (123 with waste).
        </p>

        <h2>Worked example: fence post holes (with post displacement)</h2>
        <p>
          A 4×4 post sitting in the hole displaces concrete — skip this and
          you will overbuy. For 8 holes, each 12 inches in diameter and 36
          inches deep, with 4×4 posts (actual 3.5″ × 3.5″):
        </p>
        <ol>
          <li>
            <strong>Hole volume:</strong> π × 0.5² × 3 ={" "}
            <strong>2.356 cu ft</strong> per hole
          </li>
          <li>
            <strong>Post displacement:</strong> (3.5 ÷ 12)² × 3 ={" "}
            <strong>0.255 cu ft</strong> per hole
          </li>
          <li>
            <strong>Concrete per hole:</strong> 2.356 − 0.255 ={" "}
            <strong>2.101 cu ft</strong>
          </li>
          <li>
            <strong>Total:</strong> 2.101 × 8 = <strong>16.81 cu ft</strong>
          </li>
          <li>
            <strong>80 lb bags:</strong> 16.81 ÷ 0.60 = 28.01 → round up ={" "}
            <strong>29 bags</strong> (31 with 10% waste)
          </li>
        </ol>

        <h2>Concrete bag yield &amp; coverage chart</h2>
        <p>
          Standard US premix bags yield these cured-concrete volumes (printed
          on the bag):
        </p>
        <table>
          <thead>
            <tr>
              <th>Bag size</th>
              <th>Yield per bag</th>
              <th>Bags per cubic yard</th>
              <th>Covers at 4″ thick</th>
              <th>Covers at 6″ thick</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>80 lb</td>
              <td>0.60 cu ft</td>
              <td>45</td>
              <td>≈ 1.8 sq ft</td>
              <td>≈ 1.2 sq ft</td>
            </tr>
            <tr>
              <td>60 lb</td>
              <td>0.45 cu ft</td>
              <td>60</td>
              <td>≈ 1.35 sq ft</td>
              <td>≈ 0.9 sq ft</td>
            </tr>
            <tr>
              <td>40 lb</td>
              <td>0.30 cu ft</td>
              <td>90</td>
              <td>≈ 0.9 sq ft</td>
              <td>≈ 0.6 sq ft</td>
            </tr>
          </tbody>
        </table>

        <h2>Quick answers for common projects</h2>
        <p>
          Bag counts below use 80&nbsp;lb bags and include a 10% waste
          allowance:
        </p>
        <table>
          <thead>
            <tr>
              <th>Project</th>
              <th>80 lb bags (with 10% waste)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>10×10 ft patio slab, 4″ thick</td>
              <td>62</td>
            </tr>
            <tr>
              <td>12×12 ft patio slab, 4″ thick</td>
              <td>88</td>
            </tr>
            <tr>
              <td>8×10 ft shed slab, 4″ thick</td>
              <td>49</td>
            </tr>
            <tr>
              <td>4×4 ft slab, 4″ thick</td>
              <td>10</td>
            </tr>
            <tr>
              <td>Fence post: 12″ dia × 36″ deep hole, 4×4 post</td>
              <td>4 per hole</td>
            </tr>
            <tr>
              <td>Sonotube: 12″ dia × 4 ft tall</td>
              <td>6</td>
            </tr>
            <tr>
              <td>Deck pier: 12″ dia × 36″ deep (no post)</td>
              <td>5</td>
            </tr>
          </tbody>
        </table>

        <h2>The formulas</h2>
        <h3>Slab, wall, or footing (rectangle)</h3>
        <p>
          <strong>V = Length × Width × Thickness</strong> — all in feet. A
          4-inch thickness is 4 ÷ 12 = 0.3333 ft.
        </p>
        <h3>Column or sonotube (cylinder)</h3>
        <p>
          <strong>V = π × r² × h</strong> — r is half the diameter, h is the
          height, both in feet.
        </p>
        <h3>Fence or deck post hole</h3>
        <p>
          <strong>V = hole volume − post volume.</strong> For a round hole: π
          × r² × depth. For a square hole: side × side × depth. Subtract the
          part of the post below grade, using the post&apos;s{" "}
          <em>actual</em> dimensions (a nominal 4×4 is really 3.5″ × 3.5″).
        </p>
        <h3>Bags from volume</h3>
        <p>
          <strong>Bags = ⌈ Volume ÷ bag yield ⌉</strong> — always round up.
          With waste: ⌈ (Volume × 1.10) ÷ bag yield ⌉. One cubic yard equals
          exactly 27 cubic feet.
        </p>

        <h2>Frequently asked questions</h2>
        {FAQ_ITEMS.map((f) => (
          <div key={f.q} className="mb-6">
            <h3 className="!mt-6">{f.q}</h3>
            <p>{f.a}</p>
          </div>
        ))}

        <h2>When to order ready-mix instead</h2>
        <p>
          Bagged concrete makes sense up to about 1–2 cubic yards (roughly
          45–90 eighty-pound bags). Beyond that, a ready-mix truck is usually
          cheaper per yard and far less labor. If your calculator result is
          over ~2 cubic yards, call a local batch plant for a quote before
          buying pallets of bags.
        </p>
      </div>
    </article>
  );
}
