import Link from "next/link";
import CubicYardCalculator from "@/components/CubicYardCalculator";
import AdSlot from "@/components/AdSlot";
import JsonLd from "@/components/JsonLd";
import AuthorByline from "@/components/AuthorByline";
import TableOfContents from "@/components/TableOfContents";
import RelatedCalculators from "@/components/RelatedCalculators";
import { SITE_URL, SITE_NAME } from "@/lib/siteConfig";

export const metadata = {
  title: "Cubic Yard Calculator: How Many Cubic Yards (Volume and Bags)",
  description:
    "Free cubic yard calculator: enter area and depth to get cubic yards, cubic feet, and bag equivalents for mulch, gravel, topsoil, sand, and concrete.",
  alternates: {
    canonical: `${SITE_URL}/cubic-yard-calculator`,
  },
  openGraph: {
    title: "Cubic Yard Calculator: How Many Cubic Yards",
    description:
      "Volume in cubic yards, cubic feet, and bag equivalents for mulch, gravel, topsoil, sand, and concrete, with a depth chart.",
    url: `${SITE_URL}/cubic-yard-calculator`,
    type: "article",
    images: [
      {
        url:
          "/og?title=" +
          encodeURIComponent("Cubic Yard Calculator: How Many Cubic Yards") +
          "&sub=" +
          encodeURIComponent("Volume in cubic yards, cubic feet, and bag equivalents for mulch, gravel, topsoil, sand, and concrete, with a depth chart."),
        width: 1200,
        height: 630,
        alt: "Cubic Yard Calculator: How Many Cubic Yards",
      },
    ],
  },
};

const PAGE_URL = `${SITE_URL}/cubic-yard-calculator`;

const FAQ_ITEMS = [
  {
    q: "How many cubic feet are in a cubic yard?",
    a: "27, exact. One yard is 3 feet, so one cubic yard is 3 ft x 3 ft x 3 ft = 27 cu ft. Divide your cubic feet by 27 to get cubic yards.",
  },
  {
    q: "How many cubic yards do I need for a 20 x 10 ft bed at 3 inches deep?",
    a: "20 x 10 = 200 sq ft; 200 x (3 / 12) = 50 cu ft; 50 / 27 = 1.85 cu yd. With a 10% allowance that is 55 cu ft = 2.04 cu yd, so order 2.5 cu yd (rounded up to the nearest half yard), or 110 half-cubic-foot bags.",
  },
  {
    q: "What is the difference between cubic yards and tons?",
    a: "Cubic yards measure volume, tons measure weight. The conversion depends on the material: a yard of dry mulch weighs far less than a yard of gravel. For weight, use the material-specific calculator (mulch, gravel, sand), since density varies by material.",
  },
  {
    q: "How deep should mulch be?",
    a: "2 to 3 inches is typical for a garden bed, over bare soil or old mulch. Less than 2 inches thins out fast and lets weeds through; more than 4 inches can smother roots and hold too much water. This calculator takes any depth, so enter what your bed actually needs.",
  },
  {
    q: "How thick should a concrete slab be?",
    a: "4 inches is typical for a residential slab (patio, walkway, shed floor). Driveways and heavy loads usually go 5 to 6 inches. Enter your slab thickness as the depth here, then check the concrete calculators for bag counts and ready-mix quantities.",
  },
  {
    q: "Should I buy bags or bulk delivery?",
    a: "Bags make sense for small jobs (under about a cubic yard). Past that, bag counts get large fast: one cubic yard is 54 half-cubic-foot bags. Bulk delivery is usually the practical choice once you pass about a cubic yard, but check your local yard's delivery minimum.",
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
    { "@type": "ListItem", position: 2, name: "Cubic Yard Calculator", item: PAGE_URL },
  ],
};

const TOC_ITEMS = [
  { id: "worked-example", label: "Worked example" },
  { id: "reference-table", label: "Yards per 100 sq ft chart" },
  { id: "formulas", label: "The formulas" },
  { id: "faqs", label: "Frequently asked questions" },
];

export default function CubicYardCalculatorPage() {
  return (
    <article className="mx-auto max-w-content px-4 py-10 sm:px-6">
      <JsonLd data={faqJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <nav aria-label="Breadcrumb" className="mb-4 text-sm text-slate-500">
        <Link href="/">Home</Link> <span aria-hidden="true">›</span>{" "}
        <span aria-current="page">Cubic Yard Calculator</span>
      </nav>

      <p className="eyebrow">Free calculator</p>
      <h1 className="mt-2 max-w-3xl text-3xl sm:text-4xl">
        Cubic Yard Calculator: How Many Cubic Yards?
      </h1>
      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-600">
        Bulk material is sold by the cubic yard, but your project is measured
        in feet and inches. Enter your area and depth for cubic yards, cubic
        feet, and bag equivalents, with a waste allowance for settling and
        spreading. No sign-up; the math runs entirely in your browser.
      </p>
      <p className="mt-4 max-w-3xl leading-relaxed text-slate-600">
        For material-specific results (tons, bag sizes, and costs), use the
        matching calculator:{" "}
        <Link href="/mulch-calculator">mulch</Link>,{" "}
        <Link href="/gravel-calculator">gravel</Link>,{" "}
        <Link href="/topsoil-calculator">topsoil</Link>,{" "}
        <Link href="/sand-calculator">sand</Link>, or{" "}
        <Link href="/concrete-bags-calculator">concrete bags</Link>.
      </p>
      <div className="mt-4">
        <AuthorByline />
      </div>

      <div className="mt-8">
        <CubicYardCalculator />
      </div>

      <AdSlot label="Advertisement" className="my-8 h-28" />

      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <TableOfContents items={TOC_ITEMS} />
          </div>
        </aside>

        <div className="prose-hmb max-w-3xl">
          <h2 id="worked-example">Worked example: 20 x 10 ft bed, 3 in deep</h2>
          <p>Full arithmetic, step by step:</p>
          <ol>
            <li>
              <strong>Area:</strong> 20 ft x 10 ft = <strong>200 sq ft</strong>
            </li>
            <li>
              <strong>Volume:</strong> 200 x (3 / 12) = <strong>50 cu ft</strong>
            </li>
            <li>
              <strong>Cubic yards:</strong> 50 / 27 = <strong>1.85 cu yd</strong>
            </li>
            <li>
              <strong>With 10% allowance:</strong> 55 cu ft / 27 ={" "}
              <strong>2.04 cu yd</strong>
            </li>
            <li>
              <strong>Order:</strong> round up to the nearest half yard ={" "}
              <strong>2.5 cu yd</strong>, or 55 / 0.5 ={" "}
              <strong>110 bags</strong>
            </li>
          </ol>

          <h2 id="reference-table">Cubic yards per 100 sq ft, by depth</h2>
          <p>
            Exact volume for a 100 sq ft area at each depth, before any waste
            allowance:
          </p>
          <table>
            <thead>
              <tr>
                <th>Depth</th>
                <th>Cubic feet</th>
                <th>Cubic yards</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1 in</td>
                <td>8.33</td>
                <td>0.31</td>
              </tr>
              <tr>
                <td>2 in</td>
                <td>16.67</td>
                <td>0.62</td>
              </tr>
              <tr>
                <td>3 in</td>
                <td>25.00</td>
                <td>0.93</td>
              </tr>
              <tr>
                <td>4 in</td>
                <td>33.33</td>
                <td>1.23</td>
              </tr>
              <tr>
                <td>6 in</td>
                <td>50.00</td>
                <td>1.85</td>
              </tr>
            </tbody>
          </table>

          <h2 id="formulas">The formulas</h2>
          <h3>Volume</h3>
          <p>
            <strong>Rectangle: V = L x W x (depth in inches / 12)</strong> ·{" "}
            <strong>Circle: V = pi x r squared x (depth in inches / 12)</strong>{" "}
            - all lengths in feet, depth converted to feet.
          </p>
          <h3>Cubic yards</h3>
          <p>
            <strong>Cu yd = cu ft / 27</strong> - exact.
          </p>
          <h3>Bags</h3>
          <p>
            <strong>Bags = round up (cu ft / 0.5)</strong> - exact arithmetic
            for standard half-cubic-foot bags, always rounded up.
          </p>

          <h2 id="faqs">Frequently asked questions</h2>
          {FAQ_ITEMS.map((f) => (
            <div key={f.q} className="mb-6">
              <h3 className="!mt-6">{f.q}</h3>
              <p>{f.a}</p>
            </div>
          ))}
        </div>
      </div>

      <RelatedCalculators
        items={[
          {
            href: "/mulch-calculator",
            title: "Mulch Calculator",
            desc: "Cubic yards or bags of mulch for beds, with depth in inches.",
          },
          {
            href: "/gravel-calculator",
            title: "Gravel Calculator",
            desc: "Tons and cubic yards of crushed stone for driveways and beds.",
          },
          {
            href: "/topsoil-calculator",
            title: "Topsoil Calculator",
            desc: "Cubic yards and bags of topsoil for beds, lawns, and grading.",
          },
          {
            href: "/sand-calculator",
            title: "Sand Calculator",
            desc: "Sand by the ton or cubic yard for bases, bedding, and fill.",
          },
        ]}
      />
    </article>
  );
}
