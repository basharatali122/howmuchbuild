import Link from "next/link";
import FenceCalculator from "@/components/FenceCalculator";
import AdSlot from "@/components/AdSlot";
import JsonLd from "@/components/JsonLd";
import AuthorByline from "@/components/AuthorByline";
import TableOfContents from "@/components/TableOfContents";
import RelatedCalculators from "@/components/RelatedCalculators";
import { SITE_URL, SITE_NAME } from "@/lib/siteConfig";

export const metadata = {
  title: "Fence Calculator: Posts, Pickets, Rails & Concrete (Free)",
  description:
    "Free fence calculator: estimate posts, pickets, rails, gates, and concrete bags for a wood fence — with post spacing, picket coverage, and hole-volume math shown step by step.",
  alternates: {
    canonical: `${SITE_URL}/fence-calculator`,
  },
  openGraph: {
    title: "Fence Calculator: Posts, Pickets, Rails & Concrete (Free)",
    description:
      "Enter linear feet, height, and style — get posts, pickets, rails, and 80-lb concrete bags with the full arithmetic.",
    url: `${SITE_URL}/fence-calculator`,
    type: "article",
  },
};

const PAGE_URL = `${SITE_URL}/fence-calculator`;

const FAQ_ITEMS = [
  {
    q: "How many fence posts do I need for 100 feet?",
    a: "At the typical 8-ft post spacing, 100 linear feet gives ⌈100 ÷ 8⌉ = 13 sections and 14 line posts (one more than the number of sections). Add 2 posts per gate opening on top of that.",
  },
  {
    q: "How many pickets do I need for a 100 ft privacy fence?",
    a: "219. A nominal 1×6 picket covers 5.5″ of actual width, so ⌈1200″ ÷ 5.5″⌉ = 219 pickets for 100 linear feet with no gaps.",
  },
  {
    q: "How many rails per fence section?",
    a: "As a typical rule: 2 rails per section for fences up to 4 ft tall, 3 rails per section for 5–6 ft fences. Each rail runs the full section length between posts.",
  },
  {
    q: "How much concrete do I need per fence post?",
    a: "A 12″-diameter, 36″-deep hole holds 2.36 cu ft; a 4×4 post (actual 3.5″) displaces 0.26 cu ft, leaving 2.10 cu ft of concrete — that's 4 eighty-pound bags per post (0.60 cu ft each), always rounded up.",
  },
  {
    q: "How deep should fence post holes be?",
    a: "A common rule of thumb is about one-third of the post's total length below grade — so a 6-ft fence typically uses 8-ft posts set ~2 ft deep — but the hole must always pass below your local frost line. Frost depth varies by region, so confirm the minimum depth with local code.",
  },
  {
    q: "Should I use 4×4 or 6×6 fence posts?",
    a: "4×4 posts are the standard for most residential picket and privacy fences; 6×6 posts are the typical choice for taller fences, heavy double gates, and wind-exposed runs. Longer spans and taller fences may also need deeper holes — check local requirements.",
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
      name: "Fence Calculator",
      item: PAGE_URL,
    },
  ],
};

const TOC_ITEMS = [
    { id: "calculator", label: "Calculator" },
    { id: "worked-example", label: "Worked example" },
    { id: "posts-chart", label: "Material charts" },
    { id: "formulas", label: "Formulas" },
    { id: "faqs", label: "FAQs" }
];

const RELATED_ITEMS = [
    {
      href: "/concrete-bags-calculator",
      title: "Concrete Bags Calculator",
      desc: "Bags per post hole, with post displacement subtracted.",
    },
    {
      href: "/deck-calculator",
      title: "Deck Calculator",
      desc: "Material takeoff for the deck inside the fence.",
    },
    {
      href: "/paint-calculator",
      title: "Paint Calculator",
      desc: "Stain and paint gallons for the finished fence.",
    }
];

export default function FenceCalculatorPage() {
  return (
    <article className="mx-auto max-w-content px-4 py-10 sm:px-6">
      <JsonLd data={faqJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <nav aria-label="Breadcrumb" className="mb-4 text-sm text-slate-500">
        <Link href="/">Home</Link> <span aria-hidden="true">›</span>{" "}
        <span aria-current="page">Fence Calculator</span>
      </nav>

      <p className="eyebrow">Free calculator</p>
      <h1 className="max-w-3xl text-3xl sm:text-4xl">
        Fence Calculator: Posts, Pickets, Rails &amp; Concrete
      </h1>
      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-600">
        Measure your run in linear feet and get a complete wood-fence material
        list: posts and sections, pickets, horizontal rails, gate posts, and
        the concrete per hole — with hole volume minus post displacement, so
        the bag count is honest. Everything is rounded up and the arithmetic
        is shown in full.
      </p>

      <div className="mt-4">
        <AuthorByline />
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_260px]">
        <div className="min-w-0">
          <FenceCalculator />

          <AdSlot label="Advertisement" className="my-8 h-28" />

          <div className="prose-hmb mt-12 max-w-3xl">
        <h2 id="worked-example">Worked example: 100 ft privacy fence, 6 ft tall</h2>
        <p>
          One straight 100-ft run, 8-ft post spacing, 1 gate, 12″-diameter
          holes 36″ deep, 4×4 posts:
        </p>
        <ol>
          <li>
            <strong>Sections:</strong> ⌈100 ÷ 8⌉ = <strong>13 sections</strong>{" "}
            (posts land ≈ 7.69 ft apart: 100 ÷ 13)
          </li>
          <li>
            <strong>Posts:</strong> 13 + 1 = 14 line posts, plus 1 × 2 = 2
            gate posts = <strong>16 posts total</strong>
          </li>
          <li>
            <strong>Pickets:</strong> ⌈(100 × 12)″ ÷ 5.5″⌉ = ⌈218.18⌉ ={" "}
            <strong>219 pickets</strong>
          </li>
          <li>
            <strong>Rails:</strong> 13 sections × 3 (6 ft fence, typical) ={" "}
            <strong>39 rails</strong> → 39 × 8 = <strong>312 lin ft</strong> of
            2×4
          </li>
          <li>
            <strong>Concrete per post:</strong> hole π × 0.5² × 3 = 2.3562 cu
            ft; post (3.5 ÷ 12)² × 3 = 0.2552 cu ft; net 2.3562 − 0.2552 ={" "}
            <strong>2.101 cu ft</strong>
          </li>
          <li>
            <strong>Bags:</strong> ⌈2.101 ÷ 0.60⌉ = <strong>4 × 80-lb bags per
            post</strong>; total ⌈16 × 2.101 ÷ 0.60⌉ ={" "}
            <strong>57 bags</strong>
          </li>
        </ol>

        <h2 id="posts-chart">Posts per 100 ft by spacing</h2>
        <table>
          <thead>
            <tr>
              <th>Post spacing</th>
              <th>Line posts per 100 ft</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>6 ft</td><td>18</td></tr>
            <tr><td>8 ft (typical)</td><td>14</td></tr>
            <tr><td>10 ft</td><td>11</td></tr>
            <tr><td>12 ft</td><td>10</td></tr>
          </tbody>
        </table>

        <h2 id="pickets-chart">Pickets per 100 ft by style</h2>
        <table>
          <thead>
            <tr>
              <th>Style</th>
              <th>Pickets per 100 ft</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Privacy (no gap)</td><td>219</td></tr>
            <tr><td>Spaced, 2″ gap</td><td>160</td></tr>
            <tr><td>Spaced, 3.5″ gap</td><td>134</td></tr>
          </tbody>
        </table>

        <h2 id="bags-chart">80-lb bags per post (12″ dia × 36″ deep hole)</h2>
        <table>
          <thead>
            <tr>
              <th>Post size</th>
              <th>Concrete per post</th>
              <th>80-lb bags (rounded up)</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>4×4 (actual 3.5″)</td><td>2.10 cu ft</td><td>4</td></tr>
            <tr><td>6×6 (actual 5.5″)</td><td>1.73 cu ft</td><td>3</td></tr>
          </tbody>
        </table>

        <h2 id="formulas">The formulas</h2>
        <h3>Sections and posts</h3>
        <p>
          <strong>Sections = ⌈ total feet ÷ post spacing ⌉</strong>;{" "}
          <strong>line posts = sections + 1</strong>;{" "}
          <strong>total posts = line posts + (gates × 2)</strong>. Two extra
          posts per gate (one each side) is the typical allowance.
        </p>
        <h3>Pickets</h3>
        <p>
          <strong>Pickets = ⌈ (total feet × 12) ÷ 5.5″ ⌉</strong> for privacy
          style — a 1×6 board covers 5.5″ of actual width. For spaced pickets:
          ⌈ (total feet × 12) ÷ (5.5″ + gap) ⌉.
        </p>
        <h3>Rails</h3>
        <p>
          <strong>Rails = sections × 2</strong> for fences up to 4 ft, × 3 for
          5–6 ft (typical). Each rail is one post-spacing long.
        </p>
        <h3>Concrete per post</h3>
        <p>
          <strong>V = hole volume − post volume.</strong> Round hole: π × r² ×
          depth, minus the post&apos;s actual cross-section (a 4×4 is really
          3.5″ × 3.5″) times depth.{" "}
          <strong>Bags = ⌈ V ÷ 0.60 ⌉</strong> for 80-lb bags.
        </p>

        <h2 id="faqs">Frequently asked questions</h2>
        {FAQ_ITEMS.map((f) => (
          <div key={f.q} className="mb-6">
            <h3 className="!mt-6">{f.q}</h3>
            <p>{f.a}</p>
          </div>
        ))}

        <h2 id="before-you-dig">Before you dig</h2>
        <p>
          Call your local utility-locating service (811 in most US states)
          before any post hole goes in the ground. Confirm property lines and
          setback rules with your municipality — many towns require permits
          or neighbor notification for fences, and height limits are common
          along sidewalks and corners. Hardware, hinges, latches, and gate
          frames aren&apos;t in the material list above, so budget for those
          separately.
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
