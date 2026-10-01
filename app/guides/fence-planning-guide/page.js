import Link from "next/link";
import AdSlot from "@/components/AdSlot";
import JsonLd from "@/components/JsonLd";
import { SITE_URL, SITE_NAME } from "@/lib/siteConfig";

export const metadata = {
  title: "Fence Planning Guide: Layout, Post Spacing & Setting Posts",
  description:
    "A complete fence planning guide: choosing style and height, checking property lines and HOA rules, layout and post spacing, setting posts in concrete or gravel, gate planning, and material estimating.",
  alternates: {
    canonical: `${SITE_URL}/guides/fence-planning-guide`,
  },
  openGraph: {
    title: `Fence Planning Guide | ${SITE_NAME} Guides`,
    description:
      "From property lines to the last post cap: plan a fence that stands straight for years.",
    url: `${SITE_URL}/guides/fence-planning-guide`,
    type: "article",
  },
};

const PAGE_URL = `${SITE_URL}/guides/fence-planning-guide`;
const GUIDES_URL = `${SITE_URL}/guides`;

const FAQ_ITEMS = [
  {
    q: "How far apart should fence posts be?",
    a: "Eight feet on center is the typical spacing for most residential wood and vinyl fences, with posts set exactly along the fence line. Six-foot spacing is used for heavier fences or where extra rigidity is wanted; going wider than 8 feet usually makes the fence sag or flex.",
  },
  {
    q: "How deep should fence posts be set?",
    a: "A common rule of thumb is to bury at least one-third of the post's total length, with a minimum of about 2 feet for short fences. In frost-prone areas, the base of the post should extend below the local frost line. Check local codes for specific depth requirements.",
  },
  {
    q: "Should fence posts be set in concrete or gravel?",
    a: "Both work. Concrete gives the most rigid set and is standard practice for gate posts and corners. Compacted gravel drains better and makes future post replacement much easier, and it is a solid choice for line posts. See the guide above for when to choose each.",
  },
  {
    q: "Do I need a permit or HOA approval for a fence?",
    a: "Often yes — many municipalities and HOAs regulate fence height, style, and placement. Check your local zoning rules and HOA covenants before buying materials; approval can take weeks, so start early.",
  },
  {
    q: "Can I build a fence right on my property line?",
    a: "That depends on local rules and your survey. Some jurisdictions allow it, others require a setback, and building on a disputed line invites neighbor conflict. A recent survey or a copy of your plat from the county records removes the guesswork.",
  },
  {
    q: "How do I plan for a gate in my fence?",
    a: "Decide gate width and location during layout, before you set posts. Gate posts take more load than line posts, so set them deeper and in concrete, and use adjustable hinges so you can true up the gate as it settles.",
  },
  {
    q: "Call 811 before digging fence post holes?",
    a: "Yes — always. In the US, calling 811 before you dig is free, and utility locators will mark buried lines on your property. Post holes routinely go 2–3 feet deep, which is exactly where utilities live.",
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
      name: "Fence Planning Guide",
      item: PAGE_URL,
    },
  ],
};

export default function FencePlanningGuide() {
  return (
    <article className="mx-auto max-w-content px-4 py-10 sm:px-6">
      <JsonLd data={faqJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <nav aria-label="Breadcrumb" className="mb-4 text-sm text-slate-500">
        <Link href="/">Home</Link> <span aria-hidden="true">›</span>{" "}
        <Link href="/guides">Guides</Link> <span aria-hidden="true">›</span>{" "}
        <span aria-current="page">Fence Planning Guide</span>
      </nav>

      <h1 className="max-w-3xl text-3xl sm:text-4xl">
        Fence Planning Guide: From Property Lines to the Last Post Cap
      </h1>
      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-600">
        A fence is simple in concept — posts, rails, pickets — but the
        planning decides whether it stands straight for fifteen years or
        starts leaning by the second. Here is how to plan the layout, pick
        materials, and set posts that stay put.
      </p>

      <div className="prose-hmb mt-10 max-w-3xl">
        <div className="not-prose mb-8 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          <strong>Guidance, not engineering advice.</strong> This guide
          covers typical residential practice. Local codes, HOA rules, and
          frost lines vary by area — confirm requirements with your local
          building department before you build.
        </div>

        <h2>1. Check rules, lines, and utilities first</h2>
        <p>
          Three checks before you buy a single post, and all of them are
          free or cheap:
        </p>
        <ul>
          <li>
            <strong>Property lines.</strong> Do not guess where your lot
            ends. A recent survey, your closing documents, or the plat on
            file with the county will show it. Building even a foot over
            the line can mean tearing the fence down.
          </li>
          <li>
            <strong>HOA and local rules.</strong> HOAs and municipalities
            commonly regulate fence height, style, material, and setback
            from the line or sidewalk. Approval can take weeks, so submit
            your plan early. Some areas also cap front-yard fence height
            lower than the backyard — check before you design.
          </li>
          <li>
            <strong>Utilities.</strong> <strong>Call 811 before you
            dig.</strong> In the US, 811 is the free national &ldquo;Call
            Before You Dig&rdquo; number. Fence post holes routinely go
            2–3 feet deep — exactly where gas, electric, and
            communications lines live. Locators will mark them on your
            property within a few business days.
          </li>
        </ul>

        <h2>2. Choose a style and height</h2>
        <p>
          Match the fence to the job it is doing. Privacy fences (typically
          6 ft) block sightlines and wind; picket or spaced-board fences
          mark boundaries while keeping views open; split-rail suits rural
          lots where the goal is a boundary, not screening. Taller is not
          always better — a 6-foot privacy fence catches a lot of wind, and
          wind is what eventually leans a poorly set post.
        </p>
        <p>
          Typical residential heights: 3–4 ft for front yards and pickets,
          6 ft for backyard privacy. Anything taller usually triggers a
          permit and sometimes an engineered design. Check your local
          height limits during the rules check above.
        </p>

        <AdSlot label="Advertisement" className="my-8 h-28" />

        <h2>3. Lay out the line and set post spacing</h2>
        <p>
          Run a string line between your end points — corners, gates, and
          property corners — and keep every post on that string. A fence
          that wanders off the line looks bad forever, and no amount of
          good workmanship later fixes a crooked layout.
        </p>
        <p>
          <strong>Post spacing:</strong> 8 feet on center is the typical
          spacing for residential wood and vinyl fences. Mark your post
          positions along the string, but plan around gates and corners
          first — gates get posts wherever the gate opening lands, and you
          never want a gate hinge post to be a compromise position. If a
          run does not divide evenly into 8-foot sections, shorten the
          last panel rather than stretching every spacing; an evenly spaced
          fence looks intentional, and rails that span too far will sag.
        </p>
        <p>
          Walk the line and mark every obstacle: trees, slopes, drainage
          swales, and utility flags from your 811 locate. Slopes need a
          decision up front — <em>stepped</em> fencing (each panel level,
          dropping in steps) is simpler and typical for privacy fences, while{" "}
          <em>racked</em> fencing (panels following the slope) works better
          for pickets and keeps small animals from slipping under.
        </p>

        <h2>4. Setting the posts: depth and footing</h2>
        <p>
          Posts fail at the ground line, so the footing is the whole
          project. A widely used rule of thumb: <strong>bury at least
          one-third of the post&apos;s total length</strong>, with about 2
          feet as a practical minimum for short fences. That means a 6-foot
          fence typically needs 8-foot posts set 2 feet deep or deeper. In
          frost-prone areas, the bottom of the post should sit below the
          local frost line — frost heave will push shallow posts up over
          winter. This is general guidance, not an engineering
          specification; gate posts and corners deserve more depth, and
          local codes may specify exact minimums.
        </p>
        <p>
          Dig holes roughly three times the post&apos;s width in diameter —
          for a 4×4 post, that is about a 10–12 inch hole — with straight
          sides and a flat or slightly belled bottom. Set the post plumb in
          two directions with a level before you backfill; a post that is
          out of plumb on day one never gets straighter.
        </p>

        <h3>Concrete vs. tamped gravel</h3>
        <p>
          Both are legitimate; pick based on the post&apos;s job:
        </p>
        <ul>
          <li>
            <strong>Concrete</strong> gives the most rigid set. It is the
            standard choice for gate posts, corner posts, and end posts —
            anywhere the fence takes pulling or twisting loads. Slope the
            top of the concrete away from the post so water sheds off
            instead of pooling against the wood.
          </li>
          <li>
            <strong>Compacted gravel</strong> drains better than concrete
            and makes a future post replacement a matter of digging rather
            than jackhammering. It is a solid choice for line posts on
            well-drained soil. Tamp in lifts — a few inches at a time — or
            it will settle and the post will loosen.
          </li>
        </ul>
        <p>
          Keep wood out of standing water either way. In chronically wet
          ground, consider steel or composite posts, or set wood posts on
          concrete piers above grade.
        </p>

        <AdSlot label="Advertisement" className="my-8 h-28" />

        <h2>5. Plan the gates</h2>
        <p>
          A gate is a fence section that moves, gets slammed, and carries
          its own weight on two hinges — plan it like a small project
          inside the project:
        </p>
        <ul>
          <li>
            <strong>Width:</strong> size for what has to pass through. A
            walk gate is usually 3–4 ft; a mower or trailer gate needs 5–6
            ft or a double gate. Measure your widest equipment, not your
            guess.
          </li>
          <li>
            <strong>Posts:</strong> gate posts take the gate&apos;s weight
            and every slam. Set them deeper than line posts, in concrete,
            and consider a 6×6 instead of a 4×4 for wide or heavy gates.
          </li>
          <li>
            <strong>Hardware:</strong> use hinges and latches rated for the
            gate&apos;s weight, and prefer adjustable hinges so you can true
            the gate up as posts settle. Cheap hardware is the most common
            reason a good gate starts dragging.
          </li>
          <li>
            <strong>Swing direction and clearance:</strong> decide which way
            the gate swings and confirm nothing — grade, steps, the fence
            itself — blocks it.
          </li>
        </ul>

        <h2>6. Estimate materials before you shop</h2>
        <p>
          With your layout done, count posts, rails, pickets, and concrete.
          The number that surprises most DIYers is the concrete: an
          ordinary 12-inch-diameter, 36-inch-deep hole with a 4×4 post needs
          about 4 eighty-pound bags per hole once you subtract the post
          itself — multiply that by 20 holes and you are at 80 bags. Run
          your numbers with our{" "}
          <Link href="/fence-calculator">fence calculator</Link>, which
          handles post spacing, post count, rail and picket estimates, and
          the concrete per hole with post displacement accounted for.
        </p>
        <p>
          Buy a few extra pickets and at least one extra post. Boards vary
          in quality, and a cracked picket discovered mid-build is not a
          reason to drive back to the store.
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
