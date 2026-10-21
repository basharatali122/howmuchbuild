import Link from "next/link";
import ExcavationCalculator from "@/components/ExcavationCalculator";
import AdSlot from "@/components/AdSlot";
import JsonLd from "@/components/JsonLd";
import AuthorByline from "@/components/AuthorByline";
import TableOfContents from "@/components/TableOfContents";
import RelatedCalculators from "@/components/RelatedCalculators";
import { SITE_URL, SITE_NAME } from "@/lib/siteConfig";

export const metadata = {
  title: "Excavation Calculator: Dirt Yards, Swell & Truckloads",
  description:
    "Free excavation calculator: bank yards, loose yards with soil swell factor, and dump-truck loads to haul the dirt away.",
  alternates: {
    canonical: `${SITE_URL}/excavation-calculator`,
  },
  openGraph: {
    title: "Excavation Calculator: Dirt Yards, Swell & Truckloads",
    description:
      "How much dirt to dig out? Bank yards, swell, and truckloads.",
    url: `${SITE_URL}/excavation-calculator`,
    type: "article",
    images: [
      {
        url:
          "/og?title=" +
          encodeURIComponent("Excavation Calculator: Dirt Yards, Swell & Truckloads") +
          "&sub=" +
          encodeURIComponent("How much dirt to dig out? Bank yards, swell, and truckloads."),
        width: 1200,
        height: 630,
        alt: "Excavation Calculator: Dirt Yards, Swell & Truckloads",
      },
    ],
  },
};

const PAGE_URL = `${SITE_URL}/excavation-calculator`;

const FAQ_ITEMS = [
  {
    q: "How do I calculate cubic yards of dirt to excavate?",
    a: "Multiply length x width x depth in feet, then divide by 27. A 20 x 20 ft area dug 2 ft deep is 800 cubic feet / 27 = 29.63 bank cubic yards — the size of the hole in the ground.",
  },
  {
    q: "What is the swell factor in excavation?",
    a: "Dug-up soil expands because packed earth breaks into clumps with air gaps. Common soil swells ~25%, so 1 bank yard becomes 1.25 loose yards. Sand and gravel swell 10-15%; dense clay and rock 30%+.",
  },
  {
    q: "How many cubic yards does a dump truck hold?",
    a: "A standard tandem-axle dump truck carries roughly 10-14 cubic yards of loose soil (12 is a good default). A smaller single-axle truck holds about 6-8. Always haul by loose yards, not bank yards.",
  },
  {
    q: "What is the difference between bank yards and loose yards?",
    a: "Bank yards measure dirt while still compacted in the ground — the hole. Loose yards measure it after digging, when it has swelled. You price the dig by bank yards but order trucks by loose yards.",
  },
  {
    q: "How many truckloads to remove 30 bank yards of soil?",
    a: "With 25% swell that's 37.5 loose yards; at 12 yards per truck, 37.5 / 12 = 3.13, so 4 truckloads — a partial load still needs a full trip. The calculator rounds up automatically.",
  },
  {
    q: "Does this work for a trench or a round hole?",
    a: "For a trench, enter its length, average width, and depth. For a round hole, use area = 3.14 x radius x radius as your length x width equivalent, or compute the area separately and enter matching L and W values.",
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
    { "@type": "ListItem", position: 2, name: "Excavation Calculator", item: PAGE_URL },
  ],
};

const TOC_ITEMS = [
  { id: "worked-example", label: "Worked example" },
  { id: "formulas", label: "The formulas" },
  { id: "faqs", label: "Frequently asked questions" },
];

export default function ExcavationCalculatorPage() {
  return (
    <article className="mx-auto max-w-content px-4 py-10 sm:px-6">
      <JsonLd data={faqJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <nav aria-label="Breadcrumb" className="mb-4 text-sm text-slate-500">
        <Link href="/">Home</Link> <span aria-hidden="true">›</span>{" "}
        <span aria-current="page">Excavation Calculator</span>
      </nav>

      <p className="eyebrow">Free calculator</p>
      <h1 className="mt-2 max-w-3xl text-3xl sm:text-4xl">
        Excavation Calculator: Dirt Yards, Swell & Truckloads
      </h1>
      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-600">
        Bank yards, loose yards with soil swell factor, and dump-truck loads to
        haul the dirt away. No sign-up; the math runs entirely in your browser.
      </p>
      <div className="mt-4">
        <AuthorByline />
      </div>

      <div className="mt-8">
        <ExcavationCalculator />
      </div>

      <AdSlot label="Advertisement" className="my-8 h-28" />

      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <TableOfContents items={TOC_ITEMS} />
          </div>
        </aside>

        <div className="prose-hmb max-w-3xl">
          <h2 id="worked-example">Worked example: 20×20 ft, 2 ft deep</h2>
          <p>Full arithmetic, step by step (common soil, 12-yd trucks):</p>
          <ol>
            <li>
              <strong>Bank yards:</strong> 20 × 20 × 2 / 27 ={" "}
              <strong>29.63 cu yd</strong>
            </li>
            <li>
              <strong>Loose yards:</strong> 29.63 × 1.25 ={" "}
              <strong>37.04 cu yd</strong>
            </li>
            <li>
              <strong>Truckloads:</strong> 37.04 / 12 = 3.09 →{" "}
              <strong>4 loads</strong>
            </li>
          </ol>

          <h2 id="formulas">The formulas</h2>
          <h3>Bank and loose yards</h3>
          <p>
            <strong>Bank = L × W × D / 27</strong>;{" "}
            <strong>loose = bank × (1 + swell)</strong> — 12% sand/gravel, 25%
            common soil, 35% clay/rock.
          </p>
          <h3>Truckloads</h3>
          <p>
            <strong>Loads = ceil(loose yards / truck capacity)</strong> —
            always round up; a partial load still needs a full trip.
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
            href: "/gravel-calculator",
            title: "Gravel Calculator",
            desc: "Fill going back in — gravel by tons and yards.",
          },
          {
            href: "/concrete-calculator",
            title: "Concrete Calculator",
            desc: "Footings and slabs for what goes in the hole.",
          },
          {
            href: "/retaining-wall-calculator",
            title: "Retaining Wall Calculator",
            desc: "Walls that often need excavation first.",
          },
        ]}
      />
    </article>
  );
}
