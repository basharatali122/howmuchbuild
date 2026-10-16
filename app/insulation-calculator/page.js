import Link from "next/link";
import InsulationCalculator from "@/components/InsulationCalculator";
import AdSlot from "@/components/AdSlot";
import JsonLd from "@/components/JsonLd";
import AuthorByline from "@/components/AuthorByline";
import TableOfContents from "@/components/TableOfContents";
import RelatedCalculators from "@/components/RelatedCalculators";
import { SITE_URL, SITE_NAME } from "@/lib/siteConfig";

export const metadata = {
  title: "Insulation Calculator: R-Value, Thickness & Bags",
  description:
    "Free insulation calculator: thickness and bag counts for attics and walls — blown cellulose, fiberglass, batts, and spray foam with R-value targets.",
  alternates: {
    canonical: `${SITE_URL}/insulation-calculator`,
  },
  openGraph: {
    title: "Insulation Calculator: R-Value, Thickness & Bags",
    description:
      "How much insulation? Thickness, bag counts, and R-value targets.",
    url: `${SITE_URL}/insulation-calculator`,
    type: "article",
  },
};

const PAGE_URL = `${SITE_URL}/insulation-calculator`;

const FAQ_ITEMS = [
  {
    q: "How much insulation do I need for a 1,000 sq ft attic?",
    a: "At R-49 with blown cellulose (R-3.5/in): 49 / 3.5 = 14 inches deep. Bags: 1,000 sq ft / ~30 sq ft per bag = 34 bags, rounded up. Coverage per bag varies by product and installed depth, so confirm against your bag's coverage chart.",
  },
  {
    q: "What R-value do I need for my attic?",
    a: "Warm climates: R-30. Moderate: R-38. Cold: R-49. Very cold: R-60. Walls run lower: R-13 to R-21. Your local building code sets the minimum — the calculator covers R-13 through R-60 so you can match your zone.",
  },
  {
    q: "How thick does insulation need to be for R-49?",
    a: "Divide 49 by the material's R-value per inch: blown cellulose (R-3.5) needs 14 in, blown fiberglass (R-2.5) needs 19.6 in, closed-cell spray foam (R-6.5) needs 7.5 in. Higher R-per-inch means thinner installs in tight spaces.",
  },
  {
    q: "Can I install attic insulation myself?",
    a: "Yes — blown-in is one of the easiest DIY projects. Home Depot and Lowe's rent the blower machine free with a bag purchase, and a 1,000 sq ft attic takes 2-4 hours with two people. Spray foam should be left to professionals.",
  },
  {
    q: "Which is better: blown-in or batt insulation?",
    a: "Blown-in fills around obstacles and covers large open attics fast with fewer gaps; batts are simplest for small, straight runs between standard joists. For the same R-value, installed performance is close — coverage and air-sealing matter more than the format.",
  },
  {
    q: "Why does bag coverage vary so much?",
    a: "Because a bag covers less area at greater depths. The same bag might cover 40 sq ft at R-30 but only 25 sq ft at R-49. Always use the coverage chart printed for your target R-value, not the biggest number on the bag.",
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
    { "@type": "ListItem", position: 2, name: "Insulation Calculator", item: PAGE_URL },
  ],
};

const TOC_ITEMS = [
  { id: "worked-example", label: "Worked example" },
  { id: "formulas", label: "The formulas" },
  { id: "faqs", label: "Frequently asked questions" },
];

export default function InsulationCalculatorPage() {
  return (
    <article className="mx-auto max-w-content px-4 py-10 sm:px-6">
      <JsonLd data={faqJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <nav aria-label="Breadcrumb" className="mb-4 text-sm text-slate-500">
        <Link href="/">Home</Link> <span aria-hidden="true">›</span>{" "}
        <span aria-current="page">Insulation Calculator</span>
      </nav>

      <p className="eyebrow">Free calculator</p>
      <h1 className="mt-2 max-w-3xl text-3xl sm:text-4xl">
        Insulation Calculator: R-Value, Thickness & Bags
      </h1>
      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-600">
        Thickness and bag counts for attics and walls — blown cellulose,
        fiberglass, batts, and spray foam with R-value targets by climate. No
        sign-up; the math runs entirely in your browser.
      </p>
      <div className="mt-4">
        <AuthorByline />
      </div>

      <div className="mt-8">
        <InsulationCalculator />
      </div>

      <AdSlot label="Advertisement" className="my-8 h-28" />

      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <TableOfContents items={TOC_ITEMS} />
          </div>
        </aside>

        <div className="prose-hmb max-w-3xl">
          <h2 id="worked-example">Worked example: 1,000 sq ft attic at R-49</h2>
          <p>Full arithmetic, step by step (blown cellulose, R-3.5/in):</p>
          <ol>
            <li>
              <strong>Thickness:</strong> 49 / 3.5 = <strong>14 inches</strong>
            </li>
            <li>
              <strong>Bags:</strong> 1,000 / 30 = 33.3 →{" "}
              <strong>34 bags</strong>
            </li>
          </ol>

          <h2 id="formulas">The formulas</h2>
          <h3>Thickness</h3>
          <p>
            <strong>Thickness (in) = target R-value / R-value per inch</strong>{" "}
            — the physics is exact; only the bag yield varies by product.
          </p>
          <h3>Bags</h3>
          <p>
            <strong>Bags = ceil(area / coverage per bag)</strong> — use the
            coverage chart for your target R-value, not the headline number.
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
            href: "/drywall-calculator",
            title: "Drywall Calculator",
            desc: "Wall area math for the walls you're insulating.",
          },
          {
            href: "/paint-calculator",
            title: "Paint Calculator",
            desc: "Finish the insulated walls with paint.",
          },
          {
            href: "/lumber-calculator",
            title: "Lumber Calculator",
            desc: "Framing lumber for the walls and attic.",
          },
        ]}
      />
    </article>
  );
}
