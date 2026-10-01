import Link from "next/link";
import AdSlot from "@/components/AdSlot";
import JsonLd from "@/components/JsonLd";
import { SITE_URL, SITE_NAME } from "@/lib/siteConfig";

export const metadata = {
  title: "How to Pour a Concrete Slab: Step-by-Step Guide for DIYers",
  description:
    "A step-by-step guide to pouring a small concrete slab: planning, layout, excavation, forms, gravel base, rebar and wire mesh basics, ordering concrete, finishing, curing, and common mistakes to avoid.",
  alternates: {
    canonical: `${SITE_URL}/guides/how-to-pour-a-concrete-slab`,
  },
  openGraph: {
    title: `How to Pour a Concrete Slab | ${SITE_NAME} Guides`,
    description:
      "Plan, form, pour, finish, and cure a small concrete slab yourself — the full DIY sequence explained.",
    url: `${SITE_URL}/guides/how-to-pour-a-concrete-slab`,
    type: "article",
  },
};

const PAGE_URL = `${SITE_URL}/guides/how-to-pour-a-concrete-slab`;
const GUIDES_URL = `${SITE_URL}/guides`;

const FAQ_ITEMS = [
  {
    q: "How thick should a concrete slab be for a patio or shed?",
    a: "Four inches is the typical thickness for patios, walkways, and shed floors, and it is the thickness most DIY guides describe. Driveways and anything carrying vehicles usually go thicker — check your local building code before you commit.",
  },
  {
    q: "Do I need rebar or wire mesh in a slab?",
    a: "For crack control in a typical small slab, welded wire mesh is common practice; rebar is more common where loads or spans are higher. Neither is a universal requirement, and this is not engineering advice — when in doubt, ask your local building department what they expect.",
  },
  {
    q: "How long should concrete cure before I use the slab?",
    a: "Concrete reaches workable strength over roughly a month, but typical guidance is to keep foot traffic off for 24–48 hours and wait longer before driving on it or loading it. Keep the surface damp while it cures for the first several days for the best result.",
  },
  {
    q: "Should I use bagged concrete or order ready-mix for a slab?",
    a: "Bagged concrete is practical up to about 1–2 cubic yards (roughly 45–90 eighty-pound bags). Above that, ready-mix from a batch plant is usually cheaper per yard and dramatically less labor. Use our concrete bags calculator to get your bag count, then compare.",
  },
  {
    q: "Do I need a permit to pour a concrete slab?",
    a: "It depends on your location and the slab's size and purpose. Many areas require a permit for slabs above a certain size or for any structural work. Call your local building department before you dig — it takes minutes and avoids fines.",
  },
  {
    q: "What is the gravel base under a slab for?",
    a: "A compacted gravel or crushed-stone base (4 inches is typical) spreads the load, drains water away from the slab, and gives you a level, stable platform to work on. It also reduces the chance of the slab settling unevenly over time.",
  },
  {
    q: "Why did my slab crack?",
    a: "Most cracks come from a few usual suspects: no control joints, the slab drying too fast (poor curing), too much water in the mix, or an uneven/uncompacted base. Control joints, proper curing, and a solid base prevent most of them.",
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
      name: "How to Pour a Concrete Slab",
      item: PAGE_URL,
    },
  ],
};

export default function HowToPourAConcreteSlabGuide() {
  return (
    <article className="mx-auto max-w-content px-4 py-10 sm:px-6">
      <JsonLd data={faqJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <nav aria-label="Breadcrumb" className="mb-4 text-sm text-slate-500">
        <Link href="/">Home</Link> <span aria-hidden="true">›</span>{" "}
        <Link href="/guides">Guides</Link> <span aria-hidden="true">›</span>{" "}
        <span aria-current="page">How to Pour a Concrete Slab</span>
      </nav>

      <h1 className="max-w-3xl text-3xl sm:text-4xl">
        How to Pour a Concrete Slab: A Step-by-Step Guide
      </h1>
      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-600">
        Pouring a small concrete slab — a patio, a shed floor, a pad for a
        generator or air conditioner — is one of the most rewarding DIY
        projects there is. Get the sequence right and it is straightforward;
        skip a step and you will live with the mistake for decades. Here is
        the full process in the order you should do it.
      </p>

      <div className="prose-hmb mt-10 max-w-3xl">
        <div className="not-prose mb-8 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          <strong>Guidance, not engineering advice.</strong> This guide
          describes typical DIY practice. Local building codes vary, and
          anything structural — foundations, load-bearing slabs, retaining
          walls — needs a professional engineer&apos;s sign-off. When in
          doubt, call your local building department before you start.
        </div>

        <h2>1. Plan and check before you dig</h2>
        <p>
          Before you buy a single bag, pin down the basics. Decide the
          slab&apos;s purpose (patio, shed, walkway), its finished size, and
          its thickness. Four inches is the typical thickness for patios,
          walkways, and shed floors. Anything that will carry vehicles or
          heavy loads usually goes thicker — and that is where a quick call
          to the building department pays for itself.
        </p>
        <p>
          <strong>Call 811 before you dig.</strong> In the US, 811 is the
          free national &ldquo;Call Before You Dig&rdquo; number. Utility
          locators will come out and mark buried gas, electric, water, and
          communications lines on your property, usually within a few
          business days. Digging into a gas line or a primary electric cable
          is not a mistake you get to make twice — and the locate service is
          free.
        </p>
        <p>
          While you are at it, check whether your project needs a permit.
          Requirements vary by location, but slabs above a certain size or
          any structural work commonly need one. A short phone call now is
          cheaper than a stop-work order later.
        </p>

        <h2>2. Lay out the slab</h2>
        <p>
          Mark the slab&apos;s outline with stakes and string, or spray the
          corners with marking paint. The classic 3-4-5 trick keeps corners
          square: measure 3 ft along one side from a corner, 4 ft along the
          adjacent side, and adjust until the diagonal between those points
          is exactly 5 ft. Check all four corners the same way.
        </p>
        <p>
          Slope matters. A slab that holds water will spall, grow algae, and
          make your patio miserable. Set your forms so the finished surface
          slopes gently away from the house — about 1/8 inch per foot is
          typical guidance, which works out to about an inch of drop over an
          8-foot run.
        </p>

        <AdSlot label="Advertisement" className="my-8 h-28" />

        <h2>3. Excavate and build the gravel base</h2>
        <p>
          Dig out the area to the full depth you need: slab thickness plus
          the base. For a 4-inch slab on a 4-inch gravel base, that is 8
          inches of excavation below the finished surface level. Strip off
          the topsoil and any soft organic material first — topsoil
          compresses over time and a slab poured over it will settle with
          it.
        </p>
        <p>
          Spread 4 inches of compactible gravel or crushed stone (not round
          pea gravel — you want angular material that locks together) and
          compact it in lifts with a hand tamper or a rented plate
          compactor. The base should be flat, level with your planned
          slope, and firm enough that you cannot easily shift it with your
          boot. This base does three jobs: it spreads the load, drains water
          away from the slab, and gives you a stable platform to set forms
          on.
        </p>

        <h2>4. Set the forms</h2>
        <p>
          Forms are usually 2×4 lumber (which actually measures 3.5 inches
          tall — close enough to 4 inches for a typical slab, or rip lumber
          to exact height) or 2×6s for thicker slabs. Set the form boards on
          edge along your string lines, stake them on the outside every 2–3
          feet, and screw through the stakes into the boards so nothing
          moves when the concrete pushes against them. Wet concrete is
          heavy — roughly 150 pounds per cubic foot — and it will blow out
          weak forms without hesitation.
        </p>
        <p>
          Double-check the slope with a level before you move on. Once the
          concrete is in the forms, there is no adjusting.
        </p>

        <h2>5. Reinforcement: wire mesh and rebar basics</h2>
        <p>
          Concrete is strong in compression and weak in tension, so
          reinforcement is what keeps it from pulling apart as it shrinks
          and settles. For a typical small slab, welded wire mesh is common
          practice for crack control. Rebar (usually #4 bar, 1/2-inch
          diameter, on a grid spacing) is more typical where loads or spans
          are higher.
        </p>
        <p>
          Whichever you use, it must sit <em>in</em> the concrete — about
          the middle of the slab&apos;s thickness, not lying on the gravel.
          Lay the mesh or rebar on chairs or dobies (small concrete or
          plastic supports) so it stays elevated while you pour. Reinforcement
          sitting on the ground does nothing; this is the single most common
          reinforcement mistake DIYers make.
        </p>
        <p>
          Plan your control joints while you are at it. Control joints are
          shallow grooves (cut with a groover while the concrete is still
          wet, or sawn later) that give shrinkage cracks a planned place to
          form instead of wandering across your slab. Typical guidance: one
          joint every 8–10 feet in each direction for a 4-inch slab, and
          never let a single panel get much longer than it is wide.
        </p>

        <h2>6. Order the concrete</h2>
        <p>
          Run your numbers before pour day. For bagged concrete, use our{" "}
          <Link href="/concrete-bags-calculator">
            concrete bags calculator
          </Link>{" "}
          to get exact counts for 40, 60, and 80 lb bags with a waste
          allowance — remember to add 5–10% extra for uneven subgrade and
          spillage. For a 10×10 ft slab at 4 inches, that is about 62
          eighty-pound bags with waste, which is a lot of mixing by hand.
        </p>
        <p>
          As a rule of thumb, bagged concrete makes sense up to about 1–2
          cubic yards. Beyond that, call a local batch plant for a ready-mix
          quote — it is usually cheaper per yard and you skip a full day of
          mixing. If you are not sure which route is cheaper, our{" "}
          <Link href="/concrete-calculator">concrete calculator</Link> gives
          you the volume in cubic yards, which is exactly what a batch plant
          will ask for.
        </p>
        <p>
          On pour day, have everything ready before the truck arrives or
          before you mix your first bag: wheelbarrows, screed board, floats,
          trowels, groover, and at least one helper. Concrete waits for no
          one.
        </p>

        <AdSlot label="Advertisement" className="my-8 h-28" />

        <h2>7. Pour, screed, and finish</h2>
        <p>
          Start at the far end and work back toward your exit so you never
          trap yourself. Fill the forms slightly proud of the top, then
          screed: rest a straight 2×4 across the form tops and saw it back
          and forth while pulling it along to level the concrete. Work in
          one pass and resist the urge to keep re-screeding — every pass
          pushes water and fine material to the surface.
        </p>
        <p>
          After screeding, float the surface with a magnesium or wood float
          to push down the aggregate and smooth the surface. Then wait. The
          critical finishing mistake is working the surface while bleed water
          is still on top — troweling too early traps water under the
          surface and weakens the top layer. When the surface sheen
          disappears and the concrete can hold your weight on kneeboards
          without sinking more than a quarter inch, cut your control joints
          and do the final finish: a light broom pass for a patio (traction
          without roughness) or a smooth trowel finish for a floor that will
          get paint or epoxy.
        </p>

        <h2>8. Cure properly — the step everyone skips</h2>
        <p>
          Curing is just keeping the concrete moist while it gains strength.
          Concrete that dries out in the first few days never reaches its
          full strength, and no amount of finishing skill compensates for
          it. Cover the slab with wet burlap, plastic sheeting, or a curing
          compound, and keep foot traffic off for at least 24–48 hours.
          Typical guidance is to wait longer — a week or more — before
          driving on it or loading it heavily. A month gets you to roughly
          full design strength.
        </p>

        <h2>Common mistakes to avoid</h2>
        <ul>
          <li>
            <strong>Adding too much water</strong> to make the mix flow
            easier. It weakens the concrete. Use a stiffer mix and a vibrator
            or rod to settle it instead.
          </li>
          <li>
            <strong>No control joints.</strong> Concrete will crack as it
            cures; joints decide where.
          </li>
          <li>
            <strong>Reinforcement on the ground.</strong> Mesh or rebar
            buried under the slab&apos;s surface, sitting on the gravel, is
            decoration.
          </li>
          <li>
            <strong>Troweling too early.</strong> Working the surface while
            bleed water sits on top traps weak material at the surface.
          </li>
          <li>
            <strong>Skipping curing.</strong> Letting the slab bake dry for
            the first few days caps its strength permanently.
          </li>
          <li>
            <strong>Under-ordering.</strong> Running out mid-pour creates a
            cold joint — a visible, weaker seam. Add 5–10% waste and round
            up.
          </li>
        </ul>

        <h2>Ready to plan your pour?</h2>
        <p>
          Get your material quantities right first: the{" "}
          <Link href="/concrete-bags-calculator">
            concrete bags calculator
          </Link>{" "}
          gives exact bag counts with waste for slabs, walls, footings, and
          post holes, and the{" "}
          <Link href="/concrete-calculator">concrete calculator</Link>{" "}
          gives cubic-yard volumes for ready-mix quotes. Measure twice, pour
          once.
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
