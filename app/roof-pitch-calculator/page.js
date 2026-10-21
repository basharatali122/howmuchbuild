import Link from "next/link";
import RoofPitchCalculator from "@/components/RoofPitchCalculator";
import AdSlot from "@/components/AdSlot";
import JsonLd from "@/components/JsonLd";
import AuthorByline from "@/components/AuthorByline";
import TableOfContents from "@/components/TableOfContents";
import RelatedCalculators from "@/components/RelatedCalculators";
import { SITE_URL, SITE_NAME } from "@/lib/siteConfig";

export const metadata = {
  title: "Roof Pitch Calculator: Pitch, Angle & Rafter Length",
  description:
    "Free roof pitch calculator: convert rise and run to x-in-12 pitch, roof angle in degrees, and rafter length — plus a rafter-length mode from pitch.",
  alternates: {
    canonical: `${SITE_URL}/roof-pitch-calculator`,
  },
  openGraph: {
    title: "Roof Pitch Calculator: Pitch, Angle & Rafter Length",
    description:
      "Roof pitch in x/12, angle degrees, and rafter length from rise and run.",
    url: `${SITE_URL}/roof-pitch-calculator`,
    type: "article",
    images: [
      {
        url:
          "/og?title=" +
          encodeURIComponent("Roof Pitch Calculator: Pitch, Angle & Rafter Length") +
          "&sub=" +
          encodeURIComponent("Roof pitch in x/12, angle degrees, and rafter length from rise and run."),
        width: 1200,
        height: 630,
        alt: "Roof Pitch Calculator: Pitch, Angle & Rafter Length",
      },
    ],
  },
};

const PAGE_URL = `${SITE_URL}/roof-pitch-calculator`;

const FAQ_ITEMS = [
  {
    q: "What does a 6/12 roof pitch mean?",
    a: "The roof rises 6 inches for every 12 inches of horizontal run — about 26.57 degrees. Pitch is always written as x-in-12 in US construction, so 6/12, 8/12, 12/12 (a 45-degree roof) are all just rise-over-12-inches-of-run.",
  },
  {
    q: "How do you calculate roof pitch?",
    a: "Measure the vertical rise and the horizontal run in the same units, then: pitch = (rise ÷ run) × 12. A 6-ft rise over a 12-ft run gives (6 ÷ 12) × 12 = 6/12. The calculator also gives you the angle and rafter length from the same two numbers.",
  },
  {
    q: "What angle is a 6/12 roof pitch?",
    a: "26.57 degrees. Angle = arctan(rise ÷ run), so arctan(6 ÷ 12) = arctan(0.5) = 26.57°. Common pitches: 4/12 = 18.43°, 8/12 = 33.69°, 12/12 = 45°.",
  },
  {
    q: "What is a standard roof pitch for a house?",
    a: "4/12 to 9/12 covers most US residential roofs. Below 3/12 is low-slope and needs special roofing materials (shingles generally require at least 2/12, and perform best at 4/12+). Steeper pitches shed snow and water faster but cost more to build and roof.",
  },
  {
    q: "How long should my rafters be?",
    a: "Start with the slope length: √(rise² + run²). For a 6/12 pitch on a 12-ft run that's √(36 + 144) = 13.42 ft — then add your eave overhang and account for the ridge board and birdsmouth cuts in the real framing layout. The calculator gives the theoretical length; your cut list adjusts from there.",
  },
  {
    q: "How do you measure roof pitch on an existing roof?",
    a: "Hold a level horizontally against the roof underside (or on top with a straight edge), measure 12 inches along the level from a point, then measure straight down from that mark to the roof surface — that drop in inches is your x-in-12 pitch. Enter rise and run in the calculator to get the angle too.",
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
    { "@type": "ListItem", position: 2, name: "Roof Pitch Calculator", item: PAGE_URL },
  ],
};

const TOC_ITEMS = [
  { id: "worked-example", label: "Worked example" },
  { id: "formulas", label: "The formulas" },
  { id: "faqs", label: "Frequently asked questions" },
];

export default function RoofPitchCalculatorPage() {
  return (
    <article className="mx-auto max-w-content px-4 py-10 sm:px-6">
      <JsonLd data={faqJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <nav aria-label="Breadcrumb" className="mb-4 text-sm text-slate-500">
        <Link href="/">Home</Link> <span aria-hidden="true">›</span>{" "}
        <span aria-current="page">Roof Pitch Calculator</span>
      </nav>

      <p className="eyebrow">Free calculator</p>
      <h1 className="mt-2 max-w-3xl text-3xl sm:text-4xl">
        Roof Pitch Calculator: Pitch, Angle & Rafter Length
      </h1>
      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-600">
        Convert rise and run to x-in-12 pitch, roof angle in degrees, and
        rafter length — or work backwards from a known pitch. No sign-up; the
        math runs entirely in your browser.
      </p>
      <div className="mt-4">
        <AuthorByline />
      </div>

      <div className="mt-8">
        <RoofPitchCalculator />
      </div>

      <AdSlot label="Advertisement" className="my-8 h-28" />

      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <TableOfContents items={TOC_ITEMS} />
          </div>
        </aside>

        <div className="prose-hmb max-w-3xl">
          <h2 id="worked-example">Worked example: 6-ft rise, 12-ft run</h2>
          <p>Full arithmetic, step by step:</p>
          <ol>
            <li>
              <strong>Pitch:</strong> (6 ÷ 12) × 12 = <strong>6/12</strong>
            </li>
            <li>
              <strong>Angle:</strong> arctan(6 ÷ 12) = arctan(0.5) ={" "}
              <strong>26.57°</strong>
            </li>
            <li>
              <strong>Rafter:</strong> √(6² + 12²) = √180 ={" "}
              <strong>13.42 ft</strong>
            </li>
          </ol>

          <h2 id="formulas">The formulas</h2>
          <h3>Pitch</h3>
          <p>
            <strong>Pitch = (rise ÷ run) × 12</strong> — expressed as x-in-12.
          </p>
          <h3>Angle and rafter</h3>
          <p>
            <strong>Angle = arctan(rise ÷ run)</strong> in degrees;{" "}
            <strong>rafter = √(rise² + run²)</strong> — the Pythagorean slope
            length.
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
            href: "/stair-calculator",
            title: "Stair Calculator",
            desc: "Rise and run math for stairs uses the same triangle.",
          },
          {
            href: "/lumber-calculator",
            title: "Lumber Calculator",
            desc: "Board feet for rafters and ridge boards.",
          },
          {
            href: "/concrete-calculator",
            title: "Concrete Calculator",
            desc: "Footings for the structure under the roof.",
          },
        ]}
      />
    </article>
  );
}
