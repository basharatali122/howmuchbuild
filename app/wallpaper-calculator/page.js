import Link from "next/link";
import WallpaperCalculator from "@/components/WallpaperCalculator";
import AdSlot from "@/components/AdSlot";
import JsonLd from "@/components/JsonLd";
import AuthorByline from "@/components/AuthorByline";
import TableOfContents from "@/components/TableOfContents";
import RelatedCalculators from "@/components/RelatedCalculators";
import { SITE_URL, SITE_NAME } from "@/lib/siteConfig";

export const metadata = {
  title: "Wallpaper Calculator: How Many Rolls Do I Need?",
  description:
    "Free wallpaper calculator: roll counts for whole rooms or single walls — single and double rolls, openings subtracted, pattern-repeat waste included.",
  alternates: {
    canonical: `${SITE_URL}/wallpaper-calculator`,
  },
  openGraph: {
    title: "Wallpaper Calculator: How Many Rolls Do I Need?",
    description:
      "Wallpaper roll counts for rooms and walls — with pattern-repeat waste.",
    url: `${SITE_URL}/wallpaper-calculator`,
    type: "article",
  },
};

const PAGE_URL = `${SITE_URL}/wallpaper-calculator`;

const FAQ_ITEMS = [
  {
    q: "How many rolls of wallpaper do I need for a 12x14 room?",
    a: "With 8-ft ceilings and 40 sq ft of doors/windows: wall area is 2 × (12 + 14) × 8 = 416 sq ft, minus 40 = 376 sq ft. With 15% pattern waste that's 432.4 sq ft ÷ 100 per double roll = 4.32, so order 5 double rolls. The calculator does this for any room size.",
  },
  {
    q: "What is the difference between a single roll and a double roll?",
    a: "A double roll is simply twice the paper: roughly 100 sq ft of effective coverage versus about 50 sq ft for a single roll. Double rolls are the common retail unit in the US and usually cheaper per square foot — this calculator prices both.",
  },
  {
    q: "How much extra wallpaper do I need for pattern repeat?",
    a: "10 to 20% depending on the repeat size. Small all-over patterns waste little; large repeats (24 inches+) can eat 20% or more because every strip must start at the same point in the pattern. The 15% default is a safe middle ground — bump it up for big bold prints.",
  },
  {
    q: "Should I subtract doors and windows from wallpaper measurements?",
    a: "Yes — measure each opening and subtract the total square footage. But don't get greedy: the waste allowance already covers trimming around them, so subtract the openings once and let the waste percentage do the rest.",
  },
  {
    q: "Should I order an extra roll of wallpaper?",
    a: "Yes, one spare roll is cheap insurance. Wallpaper is printed in dye lots — if you run short mid-project, a new roll can be a visibly different shade. Order the spare with the original batch so the lot numbers match, and keep the receipt.",
  },
  {
    q: "How much does a roll of wallpaper cover?",
    a: "A US single roll (20.5 in × 33 ft) covers about 50 square feet effectively after trimming; a double roll covers about 100. Pattern matching reduces usable coverage, which is why the calculator adds a waste allowance on top.",
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
    { "@type": "ListItem", position: 2, name: "Wallpaper Calculator", item: PAGE_URL },
  ],
};

const TOC_ITEMS = [
  { id: "worked-example", label: "Worked example" },
  { id: "formulas", label: "The formulas" },
  { id: "faqs", label: "Frequently asked questions" },
];

export default function WallpaperCalculatorPage() {
  return (
    <article className="mx-auto max-w-content px-4 py-10 sm:px-6">
      <JsonLd data={faqJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <nav aria-label="Breadcrumb" className="mb-4 text-sm text-slate-500">
        <Link href="/">Home</Link> <span aria-hidden="true">›</span>{" "}
        <span aria-current="page">Wallpaper Calculator</span>
      </nav>

      <p className="eyebrow">Free calculator</p>
      <h1 className="mt-2 max-w-3xl text-3xl sm:text-4xl">
        Wallpaper Calculator: How Many Rolls Do I Need?
      </h1>
      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-600">
        Roll counts for whole rooms or single walls — single and double rolls,
        doors and windows subtracted, pattern-repeat waste included. No sign-up;
        the math runs entirely in your browser.
      </p>
      <div className="mt-4">
        <AuthorByline />
      </div>

      <div className="mt-8">
        <WallpaperCalculator />
      </div>

      <AdSlot label="Advertisement" className="my-8 h-28" />

      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <TableOfContents items={TOC_ITEMS} />
          </div>
        </aside>

        <div className="prose-hmb max-w-3xl">
          <h2 id="worked-example">Worked example: 12×14 ft room</h2>
          <p>
            Full arithmetic, step by step (8-ft ceilings, 40 sq ft of
            openings, double rolls, 15% waste):
          </p>
          <ol>
            <li>
              <strong>Wall area:</strong> 2 × (12 + 14) × 8 = 416 − 40 ={" "}
              <strong>376 sq ft</strong>
            </li>
            <li>
              <strong>With 15% waste:</strong> 376 × 1.15 ={" "}
              <strong>432.4 sq ft</strong>
            </li>
            <li>
              <strong>Double rolls:</strong> 432.4 ÷ 100 = 4.32 →{" "}
              <strong>5 rolls</strong>
            </li>
          </ol>

          <h2 id="formulas">The formulas</h2>
          <h3>Room mode</h3>
          <p>
            <strong>Area = 2 × (length + width) × height − openings</strong> —
            the four walls minus doors and windows.
          </p>
          <h3>Rolls</h3>
          <p>
            <strong>
              Rolls = ⌈ area × (1 + waste) ÷ coverage per roll ⌉
            </strong>{" "}
            — 50 sq ft per single roll, 100 per double, always rounded up.
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
            href: "/paint-calculator",
            title: "Paint Calculator",
            desc: "Paint coverage for the same walls — compare with wallpaper cost.",
          },
          {
            href: "/drywall-calculator",
            title: "Drywall Calculator",
            desc: "Wall area math for new drywall before papering.",
          },
          {
            href: "/tile-calculator",
            title: "Tile Calculator",
            desc: "Tile for the bathroom walls to go with the papered ones.",
          },
        ]}
      />
    </article>
  );
}
