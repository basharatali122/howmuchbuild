import Link from "next/link";
import AdSlot from "@/components/AdSlot";
import JsonLd from "@/components/JsonLd";
import AuthorByline from "@/components/AuthorByline";
import { SITE_URL, SITE_NAME } from "@/lib/siteConfig";

export const metadata = {
  title: "How Much Does Drywall Cost? (2026 Cost Ranges)",
  description:
    "Typical drywall cost ranges: hanging and finishing per square foot, texture, DIY vs. pro, and a worked 12x12 ft room example.",
  alternates: {
    canonical: `${SITE_URL}/guides/drywall-cost-guide`,
  },
  openGraph: {
    title: `How Much Does Drywall Cost? | ${SITE_NAME} Guides`,
    description:
      "Typical price ranges for drywall installation and finishing, plus the factors that move your quote.",
    url: `${SITE_URL}/guides/drywall-cost-guide`,
    type: "article",
    images: [
      {
        url:
          "/og?title=" +
          encodeURIComponent(`How Much Does Drywall Cost? | ${SITE_NAME} Guides`) +
          "&sub=" +
          encodeURIComponent("Typical price ranges for drywall installation and finishing, plus the factors that move your quote."),
        width: 1200,
        height: 630,
        alt: `How Much Does Drywall Cost? | ${SITE_NAME} Guides`,
      },
    ],
  },
};

const PAGE_URL = `${SITE_URL}/guides/drywall-cost-guide`;
const GUIDES_URL = `${SITE_URL}/guides`;

const FAQ_ITEMS = [
  {
    q: "How much does drywall cost for a 12x12 room?",
    a: "A 12x12 room with 8 ft ceilings has about 528 sq ft of drywall surface (four walls plus ceiling). At typical installed rates of $1.50-$3.50 per sq ft for hanging and finishing, that runs roughly $790-$1,850 before texture and paint. Tall ceilings, closets, and lots of corners push toward the higher end.",
  },
  {
    q: "Is hanging or finishing the expensive part?",
    a: "Finishing usually costs more than hanging. Hanging boards is fast, heavy work; finishing (taping, mudding, and sanding through multiple coats) is where the skill lives and where most of the labor hours go. A smooth Level 5 finish costs more than a standard Level 4 finish.",
  },
  {
    q: "Is 5/8 inch drywall worth it over 1/2 inch?",
    a: "For most interior walls, 1/2 inch is standard and fine. 5/8 inch is required by code in some spots (garage ceilings, between units) and gives better sound resistance and stiffness on ceilings. It costs a bit more per sheet and is heavier to hang, so use it where code or sound matters, not everywhere by default.",
  },
  {
    q: "How much does drywall texture cost?",
    a: "As a typical range, texture adds about $0.50-$1.00 per sq ft on top of hanging and finishing. Knockdown and orange peel are the common choices; smooth finishes cost more because every flaw shows and the sanding must be near-perfect.",
  },
  {
    q: "Can I install drywall myself?",
    a: "Hanging is very doable with a helper, a drywall lift for ceilings, and a screw gun. Finishing is the hard part to learn: bad taping shows through paint and is miserable to fix. A common middle path is to hang it yourself and hire a finisher for the mudding and sanding.",
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
    { "@type": "ListItem", position: 2, name: "Guides", item: GUIDES_URL },
    { "@type": "ListItem", position: 3, name: "How Much Does Drywall Cost?", item: PAGE_URL },
  ],
};

export default function DrywallCostGuide() {
  return (
    <article className="mx-auto max-w-content px-4 py-10 sm:px-6">
      <JsonLd data={faqJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <nav aria-label="Breadcrumb" className="mb-4 text-sm text-slate-500">
        <Link href="/">Home</Link> <span aria-hidden="true">›</span>{" "}
        <Link href="/guides">Guides</Link> <span aria-hidden="true">›</span>{" "}
        <span aria-current="page">Drywall Cost Guide</span>
      </nav>

      <p className="eyebrow">Cost guide</p>
      <h1 className="mt-2 max-w-3xl text-3xl sm:text-4xl">
        How Much Does Drywall Cost?
      </h1>
      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-600">
        Drywall pricing is quoted per square foot of wall and ceiling
        surface, and the finish level matters as much as the board. Here
        are the typical ranges for hanging, finishing, and texture, plus
        what pushes any quote up or down.
      </p>
      <div className="mt-4">
        <AuthorByline />
      </div>

      <div className="prose-hmb mt-10 max-w-3xl">
        <div className="not-prose mb-8 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          <strong>Ranges, not quotes.</strong> All figures below are typical
          US ranges reported by contractors and home-improvement sources.
          Actual prices vary widely by region, site conditions, ceiling
          height, and finish level, use them to evaluate quotes, not
          replace them.
        </div>

        <h2>Quick answer: typical drywall cost ranges</h2>
        <table>
          <thead>
            <tr>
              <th>Work</th>
              <th>Typical range (per sq ft)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Materials only (board, mud, tape, screws)</td>
              <td>$0.40-$0.70</td>
            </tr>
            <tr>
              <td>Hanging and finishing, installed</td>
              <td>$1.50-$3.50</td>
            </tr>
            <tr>
              <td>Texture (knockdown, orange peel)</td>
              <td>$0.50-$1.00 extra</td>
            </tr>
            <tr>
              <td>Painting (primer + two coats)</td>
              <td>$1.00-$3.00 extra</td>
            </tr>
          </tbody>
        </table>
        <p>
          A 12x12 ft room with 8 ft ceilings has about{" "}
          <strong>528 sq ft of drywall surface</strong>, so hanging and
          finishing runs roughly <strong>$790-$1,850</strong>. Texture and
          paint are usually quoted separately, budget for them on top.
        </p>

        <AdSlot label="Advertisement" className="my-8 h-28" />

        <h2>What drives the price</h2>
        <ul>
          <li>
            <strong>Finish level.</strong> The biggest lever after area.
            Standard Level 4 (tape plus three coats) is the norm for
            textured or painted walls; Level 5 (a full skim coat) costs
            more and is what smooth, untextured walls need to look right.
          </li>
          <li>
            <strong>Ceiling height.</strong> Tall ceilings need scaffolding
            or stilts, longer boards, and slower work. Anything over 9 ft
            adds labor fast.
          </li>
          <li>
            <strong>Board type.</strong> Standard 1/2 inch board is the
            cheapest. Moisture-resistant board for bathrooms, fire-rated
            5/8 inch board where code requires it, and sound-dampening
            board all cost more per sheet.
          </li>
          <li>
            <strong>Corners, arches, and niches.</strong> Every inside
            corner, archway, and built-in niche adds taping and sanding
            time. A plain rectangular room is the cheapest shape to finish.
          </li>
          <li>
            <strong>Removal and repair.</strong> Tearing out old drywall,
            hauling it away, and fixing framing or insulation underneath
            are often separate line items.
          </li>
          <li>
            <strong>Texture.</strong> Texture hides small flaws, which is
            why it is cheaper than a smooth finish, but it still adds a
            full extra pass over every surface.
          </li>
        </ul>

        <h2>Worked example: 12x12 ft room, 8 ft ceilings</h2>
        <ol>
          <li>
            <strong>Surface area:</strong> walls (12 + 12 + 12 + 12) x 8 ={" "}
            <strong>384 sq ft</strong>, plus ceiling 12 x 12 ={" "}
            <strong>144 sq ft</strong>, total <strong>528 sq ft</strong>.
          </li>
          <li>
            <strong>Materials takeoff:</strong> run your dimensions through
            our <Link href="/drywall-calculator">drywall calculator</Link>{" "}
            for sheets, mud, tape, and screws.
          </li>
          <li>
            <strong>DIY materials:</strong> 528 x $0.40-$0.70 ={" "}
            <strong>$210-$370</strong>.
          </li>
          <li>
            <strong>Pro installed (hang + finish):</strong> 528 x
            $1.50-$3.50 = <strong>$790-$1,850</strong>.
          </li>
          <li>
            <strong>Add texture:</strong> 528 x $0.50-$1.00 ={" "}
            <strong>$265-$530</strong> more. Paint is another
            $530-$1,580 on top.
          </li>
        </ol>

        <h2>DIY vs. hiring a contractor</h2>
        <p>
          Hanging boards is heavy, awkward work but straightforward with
          a helper and a rented drywall lift for ceilings. Finishing is
          the skill bottleneck: tape bubbles, visible seams, and over-sanded
          joints all show through paint, and fixing them means re-mudding
          and re-sanding. If your budget is tight, hang the boards
          yourself and hire a finisher, you keep the savings where the
          work is simple and pay a pro where the quality shows. For smooth
          Level 5 walls, hire the whole job out.
        </p>

        <h2>Frequently asked questions</h2>
        {FAQ_ITEMS.map((f) => (
          <div key={f.q} className="mb-6">
            <h3 className="!mt-6">{f.q}</h3>
            <p>{f.a}</p>
          </div>
        ))}

        <p>
          Ready to size the job? Use the{" "}
          <Link href="/drywall-calculator">drywall calculator</Link> for
          sheet counts and mud estimates, then see the{" "}
          <Link href="/guides/paint-cost-guide">paint cost guide</Link>{" "}
          for what the finish coats will add.
        </p>
      </div>
    </article>
  );
}
