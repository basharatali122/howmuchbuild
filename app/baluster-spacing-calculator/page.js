import Link from "next/link";
import BalusterCalculator from "@/components/BalusterCalculator";
import AdSlot from "@/components/AdSlot";
import JsonLd from "@/components/JsonLd";
import AuthorByline from "@/components/AuthorByline";
import TableOfContents from "@/components/TableOfContents";
import RelatedCalculators from "@/components/RelatedCalculators";
import { SITE_URL, SITE_NAME } from "@/lib/siteConfig";

export const metadata = {
  title: "Baluster Spacing Calculator: Even Spacing That Passes Code",
  description:
    "Free baluster spacing calculator: baluster counts and even gaps for level and stair railings, checked against the 4-inch sphere code rule.",
  alternates: {
    canonical: `${SITE_URL}/baluster-spacing-calculator`,
  },
  openGraph: {
    title: "Baluster Spacing Calculator: Even Spacing That Passes Code",
    description:
      "Even baluster spacing for deck and stair railings — with the 4-inch sphere check.",
    url: `${SITE_URL}/baluster-spacing-calculator`,
    type: "article",
    images: [
      {
        url:
          "/og?title=" +
          encodeURIComponent("Baluster Spacing Calculator: Even Spacing That Passes Code") +
          "&sub=" +
          encodeURIComponent("Even baluster spacing for deck and stair railings — with the 4-inch sphere check."),
        width: 1200,
        height: 630,
        alt: "Baluster Spacing Calculator: Even Spacing That Passes Code",
      },
    ],
  },
};

const PAGE_URL = `${SITE_URL}/baluster-spacing-calculator`;

const FAQ_ITEMS = [
  {
    q: "What is the 4-inch sphere rule for railings?",
    a: "Most US building codes (IRC) require that a 4-inch-diameter sphere cannot pass through any opening in a guard railing. That means gaps between balusters must be under 4 inches everywhere — this calculator checks your even spacing against that limit and flags failures.",
  },
  {
    q: "How do you space balusters evenly?",
    a: "Divide the total run by (baluster width + max gap), round down to get the baluster count, then recompute the real gap: (total length − balusters × width) ÷ (balusters + 1). The leftover space distributes evenly, including both ends. The calculator does this in one step.",
  },
  {
    q: "How many balusters do I need for an 8-foot railing?",
    a: "With standard 2x2 balusters (1.5 in actual): floor((96 + 4) ÷ (1.5 + 4)) = floor(18.18) = 18 balusters, evenly spaced at 3.63-inch gaps — the largest count whose spacing stays under 4 inches. Always fit the count to the code, never round down to save balusters.",
  },
  {
    q: "What is the actual width of a 2x2 baluster?",
    a: "1.5 inches. Like all dimensional lumber, a nominal 2x2 is 1.5 × 1.5 inches actual. The calculator defaults to 1.5 — change it if you're using turned, metal, or cable-style balusters with a different width.",
  },
  {
    q: "How do you space balusters on stairs?",
    a: "Use the stair's horizontal run length and the same even-spacing math — switch the calculator to stair mode. Note that many inspectors separately check the triangular openings where balusters meet treads against the 4-inch (sometimes 6-inch) sphere rule, so verify with your local code.",
  },
  {
    q: "Does this work for cable railing?",
    a: "No — this calculator is for picket/baluster railings where each baluster has a fixed width. Cable railing spacing follows different rules (cable deflection under load matters as much as spacing), so use the manufacturer's spec for those systems.",
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
    { "@type": "ListItem", position: 2, name: "Baluster Spacing Calculator", item: PAGE_URL },
  ],
};

const TOC_ITEMS = [
  { id: "worked-example", label: "Worked example" },
  { id: "formulas", label: "The formulas" },
  { id: "faqs", label: "Frequently asked questions" },
];

export default function BalusterSpacingCalculatorPage() {
  return (
    <article className="mx-auto max-w-content px-4 py-10 sm:px-6">
      <JsonLd data={faqJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <nav aria-label="Breadcrumb" className="mb-4 text-sm text-slate-500">
        <Link href="/">Home</Link> <span aria-hidden="true">›</span>{" "}
        <span aria-current="page">Baluster Spacing Calculator</span>
      </nav>

      <p className="eyebrow">Free calculator</p>
      <h1 className="mt-2 max-w-3xl text-3xl sm:text-4xl">
        Baluster Spacing Calculator: Even Spacing That Passes Code
      </h1>
      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-600">
        Baluster counts and perfectly even gaps for level and stair railings —
        every layout checked against the 4-inch sphere rule. No sign-up; the
        math runs entirely in your browser.
      </p>
      <div className="mt-4">
        <AuthorByline />
      </div>

      <div className="mt-8">
        <BalusterCalculator />
      </div>

      <AdSlot label="Advertisement" className="my-8 h-28" />

      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <TableOfContents items={TOC_ITEMS} />
          </div>
        </aside>

        <div className="prose-hmb max-w-3xl">
          <h2 id="worked-example">Worked example: 8-ft deck railing</h2>
          <p>
            Full arithmetic, step by step (2x2 balusters = 1.5 in, 4-in max
            gap):
          </p>
          <ol>
            <li>
              <strong>Total inches:</strong> 8 × 12 = <strong>96&Prime;</strong>
            </li>
            <li>
              <strong>Baluster count:</strong> floor((96 + 4) ÷ (1.5 + 4)) =
              floor(18.18) = <strong>18 balusters</strong>
            </li>
            <li>
              <strong>Even gap:</strong> (96 − 18 × 1.5) ÷ 19 = 69 ÷ 19 ={" "}
              <strong>3.63&Prime;</strong> — under 4&Prime;, passes code
            </li>
          </ol>
          <p>
            End gaps match the middle gaps, so the railing looks symmetric —
            that&apos;s the whole point of computing from the count instead of
            guessing.
          </p>

          <h2 id="formulas">The formulas</h2>
          <h3>Baluster count</h3>
          <p>
            <strong>
              n = ⌊ (total inches + max gap) ÷ (baluster width + max gap) ⌋
            </strong>{" "}
            — the largest count that still fits within the max gap.
          </p>
          <h3>Even spacing</h3>
          <p>
            <strong>
              gap = (total inches − n × baluster width) ÷ (n + 1)
            </strong>{" "}
            — the +1 accounts for the gaps at both ends.
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
            href: "/deck-calculator",
            title: "Deck Calculator",
            desc: "Full deck material takeoff including railing.",
          },
          {
            href: "/stair-calculator",
            title: "Stair Calculator",
            desc: "Rise, run, and stringers for the stairs the railing guards.",
          },
          {
            href: "/fence-calculator",
            title: "Fence Calculator",
            desc: "Even picket spacing uses the same math.",
          },
          {
            href: "/lumber-calculator",
            title: "Lumber Calculator",
            desc: "Board feet for rails and balusters.",
          },
        ]}
      />
    </article>
  );
}
