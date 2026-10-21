import Link from "next/link";
import LumberCalculator from "@/components/LumberCalculator";
import AdSlot from "@/components/AdSlot";
import JsonLd from "@/components/JsonLd";
import AuthorByline from "@/components/AuthorByline";
import TableOfContents from "@/components/TableOfContents";
import RelatedCalculators from "@/components/RelatedCalculators";
import { SITE_URL, SITE_NAME } from "@/lib/siteConfig";

export const metadata = {
  title: "Lumber Calculator: Board Feet, Studs & Board Counts",
  description:
    "Free lumber calculator: board feet from dimensions, wall-framing stud counts, and board quantities for any run — with a nominal vs. actual size table.",
  alternates: {
    canonical: `${SITE_URL}/lumber-calculator`,
  },
  openGraph: {
    title: "Lumber Calculator: Board Feet, Studs & Board Counts",
    description:
      "Board feet, framing studs, and board counts — with the nominal vs. actual size table built in.",
    url: `${SITE_URL}/lumber-calculator`,
    type: "article",
    images: [
      {
        url:
          "/og?title=" +
          encodeURIComponent("Lumber Calculator: Board Feet, Studs & Board Counts") +
          "&sub=" +
          encodeURIComponent("Board feet, framing studs, and board counts — with the nominal vs. actual size table built in."),
        width: 1200,
        height: 630,
        alt: "Lumber Calculator: Board Feet, Studs & Board Counts",
      },
    ],
  },
};

const PAGE_URL = `${SITE_URL}/lumber-calculator`;

const FAQ_ITEMS = [
  {
    q: "What is a board foot?",
    a: "A board foot is 144 cubic inches of wood — a board 12 inches wide, 12 inches long, and 1 inch thick. The formula is (thickness × width × length × pieces) ÷ 12, with thickness and width in inches and length in feet. Hardwood is commonly priced per board foot.",
  },
  {
    q: "How many board feet are in ten 2×4×8 boards?",
    a: "(10 × 2 × 4 × 8) ÷ 12 = 53.33 board feet, and 80 linear feet total. Note the formula uses nominal sizes (a 2×4 counts as 2 × 4), which is the standard convention for board-foot pricing.",
  },
  {
    q: "How many studs do I need for a 20-ft wall?",
    a: "At 16 inches on center: ⌈240 ÷ 16⌉ + 1 = 16 studs for the field, plus a bottom plate and double top plate (3 × 20 = 60 linear feet of plate stock). Add extra studs for corners, door and window openings, and headers — the calculator gives the field count.",
  },
  {
    q: "What is the difference between nominal and actual lumber sizes?",
    a: "Nominal is the name; actual is the size after milling. A 2×4 is actually 1½ × 3½ inches, a 2×6 is 1½ × 5½, and a 4×4 is 3½ × 3½. Use actual sizes when a board has to fit a gap (decking, shelving); board-foot math conventionally uses nominal.",
  },
  {
    q: "How many deck boards do I need for a 16-ft run?",
    a: "With 5½-in (actual) boards and a ¼-in gap: ⌈192 ÷ 5.75⌉ = 34 boards. Always measure with the actual board width — using the nominal 6 inches would leave you a board short.",
  },
  {
    q: "Should I buy extra lumber beyond the calculated count?",
    a: "Yes — lumber is the one material where culling matters more than math. Boards come warped, twisted, or split, so buy 10% extra (or hand-pick every board at the yard) for anything visible like decking or trim. Framing hidden inside walls can run closer to the calculated count.",
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
    { "@type": "ListItem", position: 2, name: "Lumber Calculator", item: PAGE_URL },
  ],
};

const TOC_ITEMS = [
  { id: "worked-example", label: "Worked example" },
  { id: "formulas", label: "The formulas" },
  { id: "faqs", label: "Frequently asked questions" },
];

export default function LumberCalculatorPage() {
  return (
    <article className="mx-auto max-w-content px-4 py-10 sm:px-6">
      <JsonLd data={faqJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <nav aria-label="Breadcrumb" className="mb-4 text-sm text-slate-500">
        <Link href="/">Home</Link> <span aria-hidden="true">›</span>{" "}
        <span aria-current="page">Lumber Calculator</span>
      </nav>

      <p className="eyebrow">Free calculator</p>
      <h1 className="mt-2 max-w-3xl text-3xl sm:text-4xl">
        Lumber Calculator: Board Feet, Studs & Board Counts
      </h1>
      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-600">
        Three tools in one: board feet from any dimensions, stud counts for
        wall framing, and board quantities for decking or fencing runs — with
        the nominal-vs.-actual size table so you never measure wrong. No
        sign-up; the math runs entirely in your browser.
      </p>
      <div className="mt-4">
        <AuthorByline />
      </div>

      <div className="mt-8">
        <LumberCalculator />
      </div>

      <AdSlot label="Advertisement" className="my-8 h-28" />

      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <TableOfContents items={TOC_ITEMS} />
          </div>
        </aside>

        <div className="prose-hmb max-w-3xl">
          <h2 id="worked-example">Worked example: ten 2×4×8 boards</h2>
          <p>Full arithmetic, step by step (matches the calculator defaults):</p>
          <ol>
            <li>
              <strong>Board feet:</strong> (10 × 2 × 4 × 8) ÷ 12 ={" "}
              <strong>53.33 bf</strong>
            </li>
            <li>
              <strong>Linear feet:</strong> 10 × 8 = <strong>80 ft</strong>
            </li>
            <li>
              <strong>Wall check:</strong> a 20-ft wall at 16″ on center needs
              ⌈240 ÷ 16⌉ + 1 = <strong>16 studs</strong> + 60 ft of plates
            </li>
            <li>
              <strong>Boards check:</strong> a 16-ft run at 5½″ + ¼″ gap needs
              ⌈192 ÷ 5.75⌉ = <strong>34 boards</strong>
            </li>
          </ol>

          <h2 id="formulas">The formulas</h2>
          <h3>Board feet</h3>
          <p>
            <strong>BF = (T × W × L × N) ÷ 12</strong> — thickness and width in
            inches (nominal), length in feet, N pieces. Exact by convention.
          </p>
          <h3>Wall studs</h3>
          <p>
            <strong>Studs = ⌈ (wall inches ÷ spacing) ⌉ + 1</strong>, plates ={" "}
            <strong>3 × wall length</strong> (bottom + double top). Field count
            — add for corners and openings.
          </p>
          <h3>Boards for a run</h3>
          <p>
            <strong>Boards = ⌈ run inches ÷ (actual width + gap) ⌉</strong> —
            always with the <em>actual</em> width, rounded up.
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
            desc: "Full deck takeoff: boards, joists, posts, and screws.",
          },
          {
            href: "/fence-calculator",
            title: "Fence Calculator",
            desc: "Posts, pickets, and rails from fence length.",
          },
          {
            href: "/drywall-calculator",
            title: "Drywall Calculator",
            desc: "Sheets and mud for the walls you just framed.",
          },
          {
            href: "/concrete-block-calculator",
            title: "Concrete Block Calculator",
            desc: "Block counts if the project starts with masonry.",
          },
        ]}
      />
    </article>
  );
}
