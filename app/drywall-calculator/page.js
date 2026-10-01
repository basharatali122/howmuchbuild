import Link from "next/link";
import DrywallCalculator from "@/components/DrywallCalculator";
import AdSlot from "@/components/AdSlot";
import JsonLd from "@/components/JsonLd";
import { SITE_URL, SITE_NAME } from "@/lib/siteConfig";

export const metadata = {
  title: "Drywall Calculator — Sheets, Screws, Mud & Tape",
  description:
    "Free drywall calculator: get exact 4×8 sheet counts with waste allowance, plus estimated screws, joint compound, and tape rolls — with a worked example and materials chart.",
  alternates: {
    canonical: `${SITE_URL}/drywall-calculator`,
  },
  openGraph: {
    title: "Drywall Calculator — Sheets, Screws, Mud & Tape",
    description:
      "Enter your room or total area — get sheet counts rounded up, plus screw, mud, and tape estimates.",
    url: `${SITE_URL}/drywall-calculator`,
    type: "article",
  },
};

const PAGE_URL = `${SITE_URL}/drywall-calculator`;

const FAQ_ITEMS = [
  {
    q: "How many drywall sheets do I need for a 12×12 room?",
    a: "Walls are 2 × (12 + 12) × 8 = 384 sq ft; minus one door (~21) and two windows (~30) = 333 sq ft of walls. Add the 144 sq ft ceiling for 477 sq ft total. With 10% waste that's 524.7 ÷ 32 = 16.4 → 17 sheets of 4×8.",
  },
  {
    q: "What size drywall sheets should I buy?",
    a: "4×8 ft (32 sq ft) is the standard DIY sheet — it fits in most vehicles and one person can manage it. 4×12 ft sheets cover more with fewer seams but need a crew to carry and hang; pros use them on long walls.",
  },
  {
    q: "How many screws per sheet of drywall?",
    a: "About 32 screws per 4×8 sheet is the common rule of thumb — fasteners roughly every 12 inches in the field and every 8 inches along edges. It's an estimate: framing spacing and local code adjust the real number.",
  },
  {
    q: "How much joint compound do I need?",
    a: "A rough rule of thumb is about 1 gallon of joint compound per 100 square feet of drywall for taping plus finish coats. Heavier finish levels and lots of seams use more; a skim coat uses far more.",
  },
  {
    q: "How much drywall tape do I need?",
    a: "Roughly one 250-foot roll per 250 square feet of drywall. Tape follows seams, not area, so rooms with many corners and short walls use more than the estimate — pros buy an extra roll rather than run short mid-job.",
  },
  {
    q: "Why are screws, mud, and tape listed as estimates?",
    a: "Because they depend on things math can't see: framing spacing, how many seams your layout creates, the finish level you choose, and how much waste your cutting produces. Sheet count is exact geometry; the fasteners and finishing materials are field estimates that pros adjust on site.",
  },
  {
    q: "Should drywall be hung vertically or horizontally?",
    a: "General guidance: hang horizontally on walls 8 ft or shorter — the long tapered edges then run along the studs, giving fewer butt joints to finish. Taller walls or ceilings often go perpendicular to the framing. Either way, stagger the seams between rows.",
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
      name: "Drywall Calculator",
      item: PAGE_URL,
    },
  ],
};

export default function DrywallCalculatorPage() {
  return (
    <article className="mx-auto max-w-content px-4 py-10 sm:px-6">
      <JsonLd data={faqJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <nav aria-label="Breadcrumb" className="mb-4 text-sm text-slate-500">
        <Link href="/">Home</Link> <span aria-hidden="true">›</span>{" "}
        <span aria-current="page">Drywall Calculator</span>
      </nav>

      <h1 className="max-w-3xl text-3xl sm:text-4xl">
        Drywall Calculator: Sheets, Screws, Mud &amp; Tape
      </h1>
      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-600">
        Enter a room&apos;s dimensions — doors and windows subtracted with
        typical allowances, ceiling optional — or enter your total area
        directly. Get exact 4×8 sheet counts with a waste allowance, plus
        estimated screws, joint compound, and tape. Sheets are exact math;
        the fasteners and finishing materials are clearly labeled field
        estimates.
      </p>

      <div className="mt-8">
        <DrywallCalculator />
      </div>

      <AdSlot label="Advertisement" className="my-8 h-28" />

      <div className="prose-hmb mt-12 max-w-3xl">
        <h2>Worked example: 12×15 ft room with ceiling</h2>
        <p>Full arithmetic for a standard bedroom, walls plus ceiling:</p>
        <ol>
          <li>
            <strong>Walls:</strong> 2 × (12 + 15) × 8 ={" "}
            <strong>432 sq ft</strong>
          </li>
          <li>
            <strong>Openings (typical):</strong> 1 × 21 + 2 × 15 ={" "}
            <strong>51 sq ft</strong>
          </li>
          <li>
            <strong>Net walls:</strong> 432 − 51 = <strong>381 sq ft</strong>
          </li>
          <li>
            <strong>Ceiling:</strong> 12 × 15 = <strong>180 sq ft</strong>
          </li>
          <li>
            <strong>Total drywall:</strong> 381 + 180 ={" "}
            <strong>561 sq ft</strong>
          </li>
          <li>
            <strong>With 10% waste:</strong> 561 × 1.10 ={" "}
            <strong>617.1 sq ft</strong>
          </li>
          <li>
            <strong>Sheets:</strong> 617.1 ÷ 32 = 19.28 → round up ={" "}
            <strong>20 sheets</strong> (exact area alone needs 18)
          </li>
          <li>
            <strong>Screws (estimate):</strong> 20 × ~32 ={" "}
            <strong>≈ 640</strong>
          </li>
          <li>
            <strong>Joint compound (estimate):</strong> 561 ÷ 100 = 5.61 →
            round up = <strong>≈ 6 gallons</strong>
          </li>
          <li>
            <strong>Joint tape (estimate):</strong> 561 ÷ 250 = 2.24 → round
            up = <strong>≈ 3 rolls</strong> (250-ft rolls)
          </li>
        </ol>

        <h2>Drywall materials chart</h2>
        <p>
          Sheets use a 10% waste allowance and are rounded up; screws,
          compound, and tape are rule-of-thumb estimates:
        </p>
        <table>
          <thead>
            <tr>
              <th>Drywall area</th>
              <th>4×8 sheets</th>
              <th>Screws ≈</th>
              <th>Compound ≈</th>
              <th>Tape rolls ≈</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>100 sq ft</td>
              <td>4</td>
              <td>128</td>
              <td>1 gal</td>
              <td>1</td>
            </tr>
            <tr>
              <td>200 sq ft</td>
              <td>7</td>
              <td>224</td>
              <td>2 gal</td>
              <td>1</td>
            </tr>
            <tr>
              <td>300 sq ft</td>
              <td>11</td>
              <td>352</td>
              <td>3 gal</td>
              <td>2</td>
            </tr>
            <tr>
              <td>400 sq ft</td>
              <td>14</td>
              <td>448</td>
              <td>4 gal</td>
              <td>2</td>
            </tr>
            <tr>
              <td>500 sq ft</td>
              <td>18</td>
              <td>576</td>
              <td>5 gal</td>
              <td>2</td>
            </tr>
            <tr>
              <td>600 sq ft</td>
              <td>21</td>
              <td>672</td>
              <td>6 gal</td>
              <td>3</td>
            </tr>
            <tr>
              <td>800 sq ft</td>
              <td>28</td>
              <td>896</td>
              <td>8 gal</td>
              <td>4</td>
            </tr>
            <tr>
              <td>1,000 sq ft</td>
              <td>35</td>
              <td>1,120</td>
              <td>10 gal</td>
              <td>4</td>
            </tr>
          </tbody>
        </table>

        <h2>The formulas</h2>
        <h3>Room mode</h3>
        <p>
          <strong>Walls = 2 × (Length + Width) × Height</strong>, minus{" "}
          <strong>doors × 21 + windows × 15</strong> (typical allowances).
          Add <strong>ceiling = Length × Width</strong> when it needs
          drywall too.
        </p>
        <h3>Sheets</h3>
        <p>
          A 4×8 sheet is exactly 32 sq ft.{" "}
          <strong>
            Sheets = ⌈ (drywall area × (1 + waste%)) ÷ 32 ⌉
          </strong>{" "}
          — always rounded up, with 10% waste as the default.
        </p>
        <h3>Screws, mud, and tape (estimates)</h3>
        <p>
          <strong>Screws ≈ sheets × 32.</strong>{" "}
          <strong>Joint compound ≈ ⌈ area ÷ 100 ⌉ gallons.</strong>{" "}
          <strong>Tape ≈ ⌈ area ÷ 250 ⌉ rolls</strong> of 250-ft tape. All
          three are rough field rules of thumb, not exact math.
        </p>

        <h2>Frequently asked questions</h2>
        {FAQ_ITEMS.map((f) => (
          <div key={f.q} className="mb-6">
            <h3 className="!mt-6">{f.q}</h3>
            <p>{f.a}</p>
          </div>
        ))}

        <h2>Why screws, mud, and tape are estimates</h2>
        <p>
          Sheet count is pure geometry — area divided by 32, rounded up —
          which is why the calculator states it as a hard number. Screws,
          joint compound, and tape live in the real world: framing spaced 16
          vs. 24 inches changes screw counts, the number of seams and inside
          corners changes tape and mud usage, and a Level 5 skim coat can
          multiply compound several times over. The calculator uses the
          field rules of thumb pros quote (~32 screws per sheet, ~1 gallon of
          mud per 100 sq ft, ~1 roll of tape per 250 sq ft) to get you in the
          right aisle — then pros adjust on site based on the actual layout.
          When in doubt, buy the extra box of screws and the extra roll of
          tape; they are cheap insurance against a stalled job.
        </p>
      </div>
    </article>
  );
}
