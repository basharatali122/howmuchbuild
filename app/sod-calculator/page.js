import Link from "next/link";
import SodCalculator from "@/components/SodCalculator";
import AdSlot from "@/components/AdSlot";
import JsonLd from "@/components/JsonLd";
import AuthorByline from "@/components/AuthorByline";
import TableOfContents from "@/components/TableOfContents";
import RelatedCalculators from "@/components/RelatedCalculators";
import { SITE_URL, SITE_NAME } from "@/lib/siteConfig";

export const metadata = {
  title: "Sod Calculator: How Many Pallets of Sod Do I Need?",
  description:
    "Free sod calculator: measure your lawn (rectangle or circle), pick your pallet coverage, and get pallets needed with cutting waste — plus sod-laying tips and a coverage chart.",
  alternates: {
    canonical: `${SITE_URL}/sod-calculator`,
  },
  openGraph: {
    title: "Sod Calculator: How Many Pallets of Sod Do I Need?",
    description:
      "Lawn area to pallet count with waste allowance, laying tips, and a pallet coverage chart.",
    url: `${SITE_URL}/sod-calculator`,
    type: "article",
  },
};

const PAGE_URL = `${SITE_URL}/sod-calculator`;

const FAQ_ITEMS = [
  {
    q: "How many square feet does a pallet of sod cover?",
    a: "Typically 450–500 sq ft, depending on the sod farm, roll size, and grass type. The calculator defaults to 450 (the conservative end) so you don't come up short — always confirm the exact coverage with your supplier before ordering.",
  },
  {
    q: "How many pallets of sod do I need for 1,000 sq ft?",
    a: "1,000 sq ft with a 5% waste allowance is 1,050 sq ft to cover. At 450 sq ft per pallet, that's 2.33 → 3 pallets.",
  },
  {
    q: "How much extra sod should I order for waste?",
    a: "5% is typical guidance for simple rectangles; plan 10% or more for curved, triangular, or otherwise irregular lawns where every edge needs cutting. Sod can't be patched seamlessly later, so under-ordering is the expensive mistake.",
  },
  {
    q: "Should I stagger the seams when laying sod?",
    a: "Yes — lay rolls like brickwork with staggered seams. Staggering keeps seams from opening into long cracks and helps the lawn knit together faster.",
  },
  {
    q: "How soon after laying sod should I water it?",
    a: "Immediately — water each section as you finish laying it, not after the whole lawn is done. Soak it thoroughly enough that moisture reaches through the sod into the soil below.",
  },
  {
    q: "How do I measure an irregularly shaped lawn?",
    a: "Divide it into rectangles and circles, measure each with this calculator, and add them up — then use a 10% waste allowance to cover the odd edges. For very curved lawns, measure a rectangle that contains the whole area and accept the extra waste.",
  },
  {
    q: "How many rolls come on a pallet of sod?",
    a: "Typically 45–50 rolls when rolls are the common ~10 sq ft (2×5 ft) size — simple arithmetic from the 450–500 sq ft pallet range. Slab-style sod is cut differently, so ask your supplier which format you're getting.",
  },
  {
    q: "Can I lay sod a day after delivery?",
    a: "Lay it the same day if you can. If you must wait, keep the rolls stacked in shade and watered — harvested sod heats up fast in the middle of a pallet and can go bad within a day or two in warm weather.",
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
      name: "Sod Calculator",
      item: PAGE_URL,
    },
  ],
};

const TOC_ITEMS = [
    { id: "calculator", label: "Calculator" },
    { id: "worked-example", label: "Worked example" },
    { id: "pallet-chart", label: "Pallet chart" },
    { id: "formulas", label: "Formulas" },
    { id: "faqs", label: "FAQs" }
];

const RELATED_ITEMS = [
    {
      href: "/topsoil-calculator",
      title: "Topsoil Calculator",
      desc: "Topsoil depth and volume before laying sod.",
    },
    {
      href: "/mulch-calculator",
      title: "Mulch Calculator",
      desc: "Mulch for the beds bordering your new lawn.",
    },
    {
      href: "/sand-calculator",
      title: "Sand Calculator",
      desc: "Leveling sand for prepping the sod base.",
    }
];

export default function SodCalculatorPage() {
  return (
    <article className="mx-auto max-w-content px-4 py-10 sm:px-6">
      <JsonLd data={faqJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <nav aria-label="Breadcrumb" className="mb-4 text-sm text-slate-500">
        <Link href="/">Home</Link> <span aria-hidden="true">›</span>{" "}
        <span aria-current="page">Sod Calculator</span>
      </nav>

      <p className="eyebrow">Free calculator</p>
      <h1 className="max-w-3xl text-3xl sm:text-4xl">
        Sod Calculator: How Many Pallets of Sod Do I Need?
      </h1>
      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-600">
        Sod is sold by the pallet, and pallets don&apos;t come in fractions —
        so the math is area, plus a cutting allowance, rounded up to whole
        pallets. Measure your lawn below (rectangle or circle), pick your
        pallet coverage, and get the order quantity with a waste slider. No
        sign-up: the math runs entirely in your browser, and your inputs never leave your device.
      </p>

      <div className="mt-4">
        <AuthorByline />
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_260px]">
        <div className="min-w-0">
          <SodCalculator />

          <AdSlot label="Advertisement" className="my-8 h-28" />

          <div className="prose-hmb mt-12 max-w-3xl">
        <h2 id="worked-example">Worked example: 20×30 ft rectangular lawn</h2>
        <p>A standard suburban side yard. Full arithmetic, step by step:</p>
        <ol>
          <li>
            <strong>Area:</strong> 20 ft × 30 ft = <strong>600 sq ft</strong>
          </li>
          <li>
            <strong>With 5% waste:</strong> 600 × 1.05 ={" "}
            <strong>630 sq ft</strong> to cover
          </li>
          <li>
            <strong>Pallets:</strong> 630 ÷ 450 = 1.40 → round up ={" "}
            <strong>2 pallets</strong>
          </li>
        </ol>

        <h2 id="circular-example">Worked example: 40 ft diameter circular lawn</h2>
        <ol>
          <li>
            <strong>Area:</strong> π × 20² = <strong>1,256.64 sq ft</strong>
          </li>
          <li>
            <strong>With 5% waste:</strong> 1,256.64 × 1.05 ={" "}
            <strong>1,319.47 sq ft</strong>
          </li>
          <li>
            <strong>Pallets:</strong> 1,319.47 ÷ 450 = 2.93 → round up ={" "}
            <strong>3 pallets</strong>
          </li>
        </ol>

        <h2 id="pallet-chart">Sod pallet coverage chart</h2>
        <p>
          Pallets needed for common lawn sizes, including a 5% waste
          allowance, at both ends of the typical 450–500 sq ft pallet range:
        </p>
        <table>
          <thead>
            <tr>
              <th>Lawn size</th>
              <th>Area + 5% waste</th>
              <th>Pallets @ 450 sq ft</th>
              <th>Pallets @ 500 sq ft</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>500 sq ft</td>
              <td>525 sq ft</td>
              <td>2</td>
              <td>2</td>
            </tr>
            <tr>
              <td>1,000 sq ft</td>
              <td>1,050 sq ft</td>
              <td>3</td>
              <td>3</td>
            </tr>
            <tr>
              <td>2,000 sq ft</td>
              <td>2,100 sq ft</td>
              <td>5</td>
              <td>5</td>
            </tr>
            <tr>
              <td>3,000 sq ft</td>
              <td>3,150 sq ft</td>
              <td>7</td>
              <td>7</td>
            </tr>
            <tr>
              <td>5,000 sq ft</td>
              <td>5,250 sq ft</td>
              <td>12</td>
              <td>11</td>
            </tr>
          </tbody>
        </table>

        <h2 id="laying-tips">Laying tips</h2>
        <p>
          The following is guidance, not math — but it&apos;s what separates
          a lawn that takes from one that dies:
        </p>
        <ul>
          <li>
            <strong>Stagger the seams</strong> like brickwork — never line up
            the short ends of two rolls in a row.
          </li>
          <li>
            <strong>Butt edges tight.</strong> Gaps dry out and leave brown
            seams that never fully close.
          </li>
          <li>
            <strong>Water immediately</strong> — soak each finished section
            right away, enough that moisture reaches the soil underneath.
          </li>
          <li>
            <strong>Start along a straight edge</strong> (driveway or walkway)
            so your first row sets a clean line for everything else.
          </li>
          <li>
            <strong>Lay sod the day it arrives.</strong> If you must wait, keep
            rolls in shade; a pallet&apos;s core heats up quickly in warm
            weather.
          </li>
          <li>
            <strong>Grade and moisten the soil first.</strong> Sod laid on
            dry, lumpy ground roots slowly and unevenly.
          </li>
        </ul>

        <h2 id="formulas">The formulas</h2>
        <h3>Lawn area</h3>
        <p>
          <strong>A = Length × Width</strong> (rectangle) or{" "}
          <strong>A = π × r²</strong> (circle) — all in feet. For irregular
          lawns, split the area into rectangles and circles and add them.
        </p>
        <h3>Pallets needed</h3>
        <p>
          <strong>Pallets = ⌈ (A × (1 + waste)) ÷ pallet coverage ⌉</strong>{" "}
          — always round up to a whole pallet. Pallet coverage is 450–500 sq
          ft (typical); this calculator defaults to the conservative 450.
        </p>

        <h2 id="faqs">Frequently asked questions</h2>
        {FAQ_ITEMS.map((f) => (
          <div key={f.q} className="mb-6">
            <h3 className="!mt-6">{f.q}</h3>
            <p>{f.a}</p>
          </div>
        ))}

        <h2 id="delivery">Order timing and delivery</h2>
        <p>
          Sod is perishable — order it for the day you plan to lay it, not a
          week ahead. A pallet covers a meaningful chunk of lawn, so delivery
          placement matters: have the truck drop pallets as close to the work
          area as possible, because carrying roll after roll across the yard
          all day is miserable. Order the sod for the day you lay it — soil
          prep finished first, fresh product laid the same day.
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
