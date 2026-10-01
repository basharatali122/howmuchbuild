import Link from "next/link";
import AdSlot from "@/components/AdSlot";
import JsonLd from "@/components/JsonLd";
import { SITE_URL, SITE_NAME } from "@/lib/siteConfig";

export const metadata = {
  title: "Mulch Installation Guide: Depth, Prep & How Much to Buy",
  description:
    "A complete mulch installation guide: choosing mulch type, prepping beds, edging, whether to use landscape fabric, 2–3 inch depth guidance, how much mulch to buy, spreading technique, and refresh timing.",
  alternates: {
    canonical: `${SITE_URL}/guides/mulch-installation-guide`,
  },
  openGraph: {
    title: `Mulch Installation Guide | ${SITE_NAME} Guides`,
    description:
      "Prep, depth, spreading technique, and exactly how much mulch to order — the full installation guide.",
    url: `${SITE_URL}/guides/mulch-installation-guide`,
    type: "article",
  },
};

const PAGE_URL = `${SITE_URL}/guides/mulch-installation-guide`;
const GUIDES_URL = `${SITE_URL}/guides`;

const FAQ_ITEMS = [
  {
    q: "How deep should mulch be?",
    a: "Two to three inches is the typical recommended depth for planting beds — enough to suppress weeds and hold moisture without smothering roots. Go a little deeper (around 3–4 inches) for weed suppression in beds with no plants yet, but keep mulch pulled back from stems and trunks.",
  },
  {
    q: "How much does one cubic yard of mulch cover?",
    a: "One cubic yard covers about 100 square feet at 3 inches deep (162 sq ft at 2 inches, 81 sq ft at 4 inches). This is the standard rule of thumb for estimating — measure your bed area and divide by 100 per yard at 3-inch depth.",
  },
  {
    q: "Should I put landscape fabric under mulch?",
    a: "It is a trade-off. Fabric suppresses weeds well at first but eventually clogs with soil, blocks water less evenly over time, and makes replanting harder. Many gardeners skip fabric and rely on 3 inches of mulch plus occasional hand-weeding instead. For more detail, see the bed prep section above.",
  },
  {
    q: "Should mulch touch tree trunks?",
    a: "No. Keep mulch 3–6 inches away from trunks and stems — the piled-against-the-trunk 'mulch volcano' traps moisture against bark and invites rot and pests. A flat donut shape around the tree is what you want.",
  },
  {
    q: "How often should I refresh mulch?",
    a: "Most beds need a top-up once a year, typically in spring. Shredded bark breaks down faster than nuggets or stone. Refresh when the depth drops below 2 inches or the color has faded — a light raking and a 1-inch top-up is often enough.",
  },
  {
    q: "Is dyed mulch safe for plants?",
    a: "Dyed mulches use colorants that are generally considered safe for landscape use, but the dyes fade and the underlying wood is often lower-grade. Natural bark mulch decomposes into better soil organic matter; dyed mulch is mostly a color choice.",
  },
  {
    q: "Bagged mulch or bulk delivery — which is cheaper?",
    a: "For small beds, bags are convenient. For larger projects, bulk delivery by the cubic yard is usually cheaper per yard. Use our mulch calculator to get your cubic yards first, then price both options — the crossover point is typically around a few cubic yards.",
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
      name: "Guides",
      item: GUIDES_URL,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Mulch Installation Guide",
      item: PAGE_URL,
    },
  ],
};

export default function MulchInstallationGuide() {
  return (
    <article className="mx-auto max-w-content px-4 py-10 sm:px-6">
      <JsonLd data={faqJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <nav aria-label="Breadcrumb" className="mb-4 text-sm text-slate-500">
        <Link href="/">Home</Link> <span aria-hidden="true">›</span>{" "}
        <Link href="/guides">Guides</Link> <span aria-hidden="true">›</span>{" "}
        <span aria-current="page">Mulch Installation Guide</span>
      </nav>

      <h1 className="max-w-3xl text-3xl sm:text-4xl">
        Mulch Installation Guide: Prep, Depth, and How Much to Buy
      </h1>
      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-600">
        Mulch is the cheapest landscape upgrade there is — it suppresses
        weeds, holds soil moisture, evens out soil temperature, and makes
        beds look finished in an afternoon. The difference between good and
        bad mulching is almost entirely in the prep and the depth.
      </p>

      <div className="prose-hmb mt-10 max-w-3xl">
        <h2>1. Choose your mulch type</h2>
        <p>
          Not all mulches do the same job. Pick for your bed, not just for
          color:
        </p>
        <ul>
          <li>
            <strong>Shredded bark / hardwood mulch</strong> — the
            all-rounder. Knits together so it stays put on slopes, breaks
            down into good organic matter, and looks natural. Needs
            refreshing most years.
          </li>
          <li>
            <strong>Bark nuggets</strong> — chunkier, slower to decompose,
            and longer-lasting, but can float away in heavy rain and are
            harder to plant through.
          </li>
          <li>
            <strong>Pine straw</strong> — light, inexpensive where available,
            good for acid-loving plants; breaks down quickly and can be
            slippery on slopes when fresh.
          </li>
          <li>
            <strong>Wood chips</strong> — great free or cheap option from
            tree services; best for paths and natural areas rather than
            formal beds, and let fresh chips age before using around
            shallow-rooted plants.
          </li>
          <li>
            <strong>Stone / gravel</strong> — permanent, but it heats up in
            sun, migrates into soil, and makes future planting miserable.
            Fine for dry or modern landscapes, not for beds you will
            replant.
          </li>
        </ul>
        <p>
          Whatever you choose, avoid mulch with a sour or ammonia smell —
          that is anaerobic decomposition, and it can damage plants until it
          airs out.
        </p>

        <AdSlot label="Advertisement" className="my-8 h-28" />

        <h2>2. Prep the bed</h2>
        <p>
          Mulch over weeds just hides them for a few weeks. Do the prep
          once and the mulch works for a year:
        </p>
        <ol>
          <li>
            <strong>Clear the bed.</strong> Pull existing weeds, roots and
            all. For beds overrun with weeds, this is the step that decides
            the outcome.
          </li>
          <li>
            <strong>Cut a clean edge.</strong> A spade-cut trench edge
            (about 3–4 inches deep, angled) keeps mulch from migrating onto
            the lawn and gives the bed a crisp line. Do this before
            spreading — it is ten times harder after.
          </li>
          <li>
            <strong>Water first.</strong> If the soil is dry, soak it before
            mulching. Mulch slows evaporation but does not add water.
          </li>
        </ol>

        <h3>Weed barrier: the honest trade-off</h3>
        <p>
          Landscape fabric under mulch is one of those topics where both
          sides are right about something. Here is the balanced view so you
          can decide:
        </p>
        <ul>
          <li>
            <strong>Pros:</strong> suppresses weeds well in the first season
            or two; useful under stone mulch, where organic breakdown is
            not wanted.
          </li>
          <li>
            <strong>Cons:</strong> soil and mulch fines settle into it over
            time and weeds grow <em>on top</em> of it anyway; it makes
            replanting and dividing perennials harder; it slows the
            exchange of water and organic matter with the soil.
          </li>
        </ul>
        <p>
          Our take, as general guidance: skip the fabric in planting beds
          and rely on 3 inches of mulch plus a weed here and there. Use
          fabric mainly under stone or in beds you will not replant. And
          never use solid plastic sheeting under mulch — it traps water and
          suffocates soil.
        </p>

        <h2>3. How much mulch to buy</h2>
        <p>
          The standard rule of thumb: <strong>one cubic yard covers about
          100 square feet at 3 inches deep</strong> (roughly 162 sq ft at 2
          inches, 81 sq ft at 4 inches). Measure each bed&apos;s length and
          width, multiply for square footage, and divide by 100 per cubic
          yard at 3-inch depth.
        </p>
        <p>
          Rather than doing the arithmetic bed by bed, run your dimensions
          through our{" "}
          <Link href="/mulch-calculator">mulch calculator</Link> — it
          converts square footage and depth into cubic yards and bag counts,
          so you can price bagged mulch against a bulk delivery. As general
          guidance, bags win for small beds and bulk delivery by the cubic
          yard usually wins once you are ordering several yards; the
          calculator gives you the number to compare with.
        </p>
        <p>
          Order a little extra — mulch settles, and running short with one
          bed left is worse than having a wheelbarrow of spare.
        </p>

        <AdSlot label="Advertisement" className="my-8 h-28" />

        <h2>4. Spread it right</h2>
        <p>
          Dump mulch in piles around the bed with a wheelbarrow, then rake
          it out evenly — working from piles beats carrying shovelfuls
          across finished beds. Target <strong>2–3 inches deep</strong>
          after settling, which is the typical recommended depth for
          planting beds. Lay it a touch deeper to account for settling.
        </p>
        <p>
          The golden rule of placement: <strong>keep mulch off trunks and
          stems.</strong> Pull it back 3–6 inches from tree trunks, shrubs,
          and perennials. The piled-against-the-trunk &ldquo;mulch
          volcano&rdquo; traps moisture against bark and invites rot, pests,
          and girdling roots. Around a tree, aim for a flat donut, not a
          mountain. And do not bury the root flare — the base of the trunk
          should stay visible.
        </p>
        <p>
          Around new plantings, go a little thinner over the root ball
          itself and let the mulch ring out wider — roots spread outward,
          and the moisture ring should follow them. In vegetable beds, wait
          until seedlings are a few inches tall before mulching, and use a
          light material like straw so young stems are not smothered. Keep
          mulch a few inches away from vegetable stems for the same airflow
          reasons that apply to ornamentals.
        </p>

        <h2>5. Refresh schedule</h2>
        <p>
          Mulch decomposes — that is the point — so plan on topping up{" "}
          <strong>once a year, typically in spring</strong>, as general
          guidance. Shredded bark breaks down fastest; nuggets and pine bark
          last longer; stone never needs refreshing (but needs the
          occasional top-up from migration).
        </p>
        <p>
          You do not always need a full re-mulch. Rake the old mulch to
          break up any matted crust, check the depth, and add about an inch
          wherever it has dropped below 2 inches. A light annual top-up
          keeps the color fresh and the weeds down without burying your
          plants deeper every year — mulch that accumulates 6+ inches over
          time causes the same problems as a volcano.
        </p>

        <h2>Quick checklist</h2>
        <ul>
          <li>Clear weeds, cut a trench edge, water the soil first.</li>
          <li>Skip landscape fabric in planting beds (use it under stone).</li>
          <li>Buy by cubic yards: ~100 sq ft per yard at 3″ deep.</li>
          <li>Spread 2–3″ deep; keep it 3–6″ off trunks and stems.</li>
          <li>Top up ~1″ each spring; rake matted mulch before adding.</li>
        </ul>

        <h2>Ready to order?</h2>
        <p>
          Get your quantity right first with the{" "}
          <Link href="/mulch-calculator">mulch calculator</Link> — square
          footage and depth in, cubic yards and bag counts out. Then price
          bags against bulk delivery and order with confidence.
        </p>

        <h2>Frequently asked questions</h2>
        {FAQ_ITEMS.map((f) => (
          <div key={f.q} className="mb-6">
            <h3 className="!mt-6">{f.q}</h3>
            <p>{f.a}</p>
          </div>
        ))}
      </div>
    </article>
  );
}
