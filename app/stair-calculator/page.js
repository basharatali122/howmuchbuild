import Link from "next/link";
import StairCalculator from "@/components/StairCalculator";
import AdSlot from "@/components/AdSlot";
import JsonLd from "@/components/JsonLd";
import AuthorByline from "@/components/AuthorByline";
import TableOfContents from "@/components/TableOfContents";
import RelatedCalculators from "@/components/RelatedCalculators";
import { SITE_URL, SITE_NAME } from "@/lib/siteConfig";

export const metadata = {
  title: "Stair Calculator: Rise, Run, Treads & Stringers (Free)",
  description:
    "Free stair calculator: riser count, tread depth, total run, stringer length and stair angle from your total rise — IRC-based stair math with every step shown.",
  alternates: {
    canonical: `${SITE_URL}/stair-calculator`,
  },
  openGraph: {
    title: "Stair Calculator: Rise, Run, Treads & Stringers (Free)",
    description:
      "Enter total rise and get risers, treads, total run, stringer length, and angle — with the full arithmetic shown.",
    url: `${SITE_URL}/stair-calculator`,
    type: "article",
  },
};

const PAGE_URL = `${SITE_URL}/stair-calculator`;

const FAQ_ITEMS = [
  {
    q: "What is the maximum riser height allowed by code?",
    a: "The International Residential Code (IRC) allows a maximum riser height of 7.75 inches and requires a minimum tread depth of 10 inches. The tallest and shortest risers in a flight must also be within 3/8 inch of each other. These are typical code figures — your local jurisdiction has the final word, so verify before you build.",
  },
  {
    q: "How many stringers does my stair need?",
    a: "As a typical layout, use 2 stringers for stairs up to 36 inches wide and 3 stringers for wider stairs. Very wide stairs may need more — stringer spacing rules vary, so check your local code. The calculator above applies the 2/3 rule from your stair width.",
  },
  {
    q: "What is a comfortable stair angle?",
    a: "Stair angle = arctangent(rise ÷ run). A 7-inch riser with an 11-inch tread gives about 32.5°, which most people find comfortable. Angles roughly between 30° and 37° feel normal for residential stairs; steeper than that starts to feel like a ladder.",
  },
  {
    q: "Do stairs need a landing?",
    a: "Typically, yes — the IRC generally requires landings at the top and bottom of a stairway, at least as wide as the stair and at least 36 inches deep in the direction of travel. Long straight runs may also need intermediate landings. Confirm landing rules locally before framing.",
  },
  {
    q: "What is the difference between a tread and a riser?",
    a: "The tread is the horizontal board you step on; the riser is the vertical face between treads. A flight with 5 risers has 4 treads — the top 'tread' is the upper floor or landing itself.",
  },
  {
    q: "What lumber should I use for stair stringers?",
    a: "2×12 lumber is the typical choice because the sawtooth cut removes a lot of material — you need the full 11¼-inch depth for strength. Use pressure-treated lumber for exterior stairs. Each stringer must be cut from one continuous board; never splice a stringer mid-span.",
  },
  {
    q: "How do I measure total rise?",
    a: "Measure vertically from the finished surface at the bottom (ground, patio, or lower floor) to the finished surface at the top (deck boards, upper floor). Use finished surfaces, not framing — flooring thickness changes the number.",
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
      name: "Stair Calculator",
      item: PAGE_URL,
    },
  ],
};

const TOC_ITEMS = [
  { id: "calculator", label: "Calculator" },
  { id: "worked-example", label: "Worked example" },
  { id: "riser-reference", label: "Riser reference" },
  { id: "formulas", label: "Formulas" },
  { id: "faqs", label: "FAQs" },
];

const RELATED_ITEMS = [
  {
    href: "/deck-calculator",
    title: "Deck Calculator",
    desc: "Stairs usually serve a deck — get the full framing takeoff.",
  },
  {
    href: "/concrete-bags-calculator",
    title: "Concrete Bags Calculator",
    desc: "Bag counts for a stair landing pad or footings.",
  },
  {
    href: "/gravel-calculator",
    title: "Gravel Calculator",
    desc: "Base gravel under a ground-level stair landing.",
  },
];

export default function StairCalculatorPage() {
  return (
    <article className="mx-auto max-w-content px-4 py-10 sm:px-6">
      <JsonLd data={faqJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <nav aria-label="Breadcrumb" className="mb-4 text-sm text-slate-500">
        <Link href="/">Home</Link> <span aria-hidden="true">›</span>{" "}
        <span aria-current="page">Stair Calculator</span>
      </nav>

      <p className="eyebrow">Free calculator</p>
      <h1 className="max-w-3xl text-3xl sm:text-4xl">
        Stair Calculator: Rise, Run, Treads & Stringers
      </h1>
      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-600">
        Enter your total rise and get the full stair layout — riser count and
        height, tread count, total run, stringer length, stair angle, and how
        many 2×12 stringers to buy. The math follows typical IRC guidance
        (7.75″ max riser) and every step is shown. The math runs entirely in
        your browser.
      </p>

      <div className="mt-4">
        <AuthorByline />
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_260px]">
        <div className="min-w-0">
          <StairCalculator />

          <AdSlot label="Advertisement" className="my-8 h-28" />

          <div className="prose-hmb mt-12 max-w-3xl">
            <h2 id="worked-example">
              Worked example: 36″ total rise, 11″ treads, 36″ wide
            </h2>
            <p>
              A small porch stair: 36 inches of total rise, 11-inch treads,
              36 inches wide. Step by step:
            </p>
            <ol>
              <li>
                <strong>Risers:</strong> ⌈36″ ÷ 7.75″⌉ = ⌈4.65⌉ ={" "}
                <strong>5 risers</strong>
              </li>
              <li>
                <strong>Actual riser height:</strong> 36″ ÷ 5 ={" "}
                <strong>7.20″</strong> each (under the 7.75″ max)
              </li>
              <li>
                <strong>Treads:</strong> 5 − 1 = <strong>4 treads</strong>;
                total run = 4 × 11″ = <strong>44″</strong> (3 ft 8 in)
              </li>
              <li>
                <strong>Stringer length:</strong> √(36² + 44²) = √3,232 ={" "}
                <strong>56.9″</strong> (4 ft 8.9 in)
              </li>
              <li>
                <strong>Stair angle:</strong> atan(36 ÷ 44) ={" "}
                <strong>39.3°</strong>
              </li>
              <li>
                <strong>Stringers:</strong> 36″ wide →{" "}
                <strong>2 stringers</strong>, cut from 2×12 lumber
              </li>
            </ol>

            <h2 id="riser-reference">Riser count reference (7.75″ max)</h2>
            <p>
              How many risers common total rises need, and how tall each one
              ends up:
            </p>
            <table>
              <thead>
                <tr>
                  <th>Total rise</th>
                  <th>Risers</th>
                  <th>Each riser</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>30″</td><td>4</td><td>7.50″</td></tr>
                <tr><td>36″</td><td>5</td><td>7.20″</td></tr>
                <tr><td>42″</td><td>6</td><td>7.00″</td></tr>
                <tr><td>48″</td><td>7</td><td>6.86″</td></tr>
                <tr><td>60″</td><td>8</td><td>7.50″</td></tr>
              </tbody>
            </table>

            <h2 id="formulas">The formulas</h2>
            <h3>Risers</h3>
            <p>
              <strong>Risers = ⌈ total rise ÷ 7.75″ ⌉</strong> — round up so no
              single riser exceeds the IRC maximum.{" "}
              <strong>Actual riser = total rise ÷ risers</strong> — always
              round up the count, never the height.
            </p>
            <h3>Treads and total run</h3>
            <p>
              <strong>Treads = risers − 1</strong> — the upper floor is the
              last “tread.” <strong>Total run = treads × tread depth</strong>.
              Deeper treads lengthen the run and flatten the stair angle.
            </p>
            <h3>Stringer length and angle</h3>
            <p>
              <strong>Stringer = √(rise² + run²)</strong> — the hypotenuse of
              the stair triangle.{" "}
              <strong>Angle = atan(rise ÷ run)</strong>, converted to
              degrees. Each stringer is cut from one continuous 2×12 board.
            </p>
            <h3>Stringer count</h3>
            <p>
              <strong>2 stringers up to 36″ wide, 3 for wider stairs</strong>{" "}
              — typical layout guidance. Wide stairs and heavy use may need
              more; your local code governs.
            </p>

            <h2 id="faqs">Frequently asked questions</h2>
            {FAQ_ITEMS.map((f) => (
              <div key={f.q} className="mb-6">
                <h3 className="!mt-6">{f.q}</h3>
                <p>{f.a}</p>
              </div>
            ))}

            <h2 id="limitations">What this calculator doesn&apos;t do</h2>
            <p>
              Layout math is geometry; a safe stair is code compliance.
              Handrail height and graspability, guard strength, headroom,
              nosing projection, and landing dimensions are all regulated and
              vary by jurisdiction — and the 3/8-inch uniformity rule means
              sloppy cuts can fail inspection even when the math is right. Use
              this page for the layout, then build to your local code (or hire
              a carpenter who does).
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
