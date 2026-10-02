import Link from "next/link";
import { SITE_NAME, AUTHOR_NAME } from "@/lib/siteConfig";
import TableOfContents from "@/components/TableOfContents";

export const metadata = {
  title: "About",
  description: `About ${SITE_NAME} — free DIY and contractor calculators built for accuracy. Our mission, coverage, and editorial standards.`,
};

const TOC_ITEMS = [
  { id: "mission", label: "Our mission" },
  { id: "coverage", label: "What the site covers" },
  { id: "standards", label: "Editorial standards" },
  { id: "not", label: "What this site is not" },
];

export default function AboutPage() {
  return (
    <article className="mx-auto max-w-content px-4 py-12 sm:px-6">
      <nav aria-label="Breadcrumb" className="mb-4 text-sm text-slate-500">
        <Link href="/">Home</Link> <span aria-hidden="true">›</span>{" "}
        <span aria-current="page">About</span>
      </nav>

      <p className="eyebrow">About</p>
      <h1 className="mt-2 text-3xl sm:text-4xl">About {SITE_NAME}</h1>

      <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_260px]">
        <div className="prose-hmb max-w-3xl">
        <p className="text-lg">
          {SITE_NAME} is a small, independent project by {AUTHOR_NAME}. We
          build free calculators for DIY builders, homeowners, and
          contractors who need straight answers to practical questions: how
          many bags of concrete, how many deck boards, how much mulch — and
          what it will all cost.
        </p>

        <h2 id="mission">Our mission</h2>
        <p>
          Home-improvement projects fail on arithmetic more often than on
          skill: the wrong bag count, the short load of gravel, the budget
          blown on a second delivery. Our mission is to make the math part
          of any project trivially easy — enter dimensions, get materials,
          estimate cost — and to show every step of the calculation so you
          never have to take our word for it.
        </p>

        <h2 id="coverage">What the site covers</h2>
        <p>
          Thirteen free calculators across the materials DIY builders buy
          most: concrete (bags and ready-mix volume), decking, fencing,
          mulch, paint, drywall, pavers, sod, topsoil, gravel, sand, and
          floor tile. Seven project guides pair with the tools —
          step-by-step build walkthroughs and cost-range breakdowns for
          the most common projects.
        </p>
        <p>
          <Link href="/calculators">Browse all calculators</Link> ·{" "}
          <Link href="/guides">Browse all guides</Link>
        </p>

        <h2 id="standards">Editorial standards</h2>
        <ul>
          <li>
            <strong>Standard math only.</strong> Every constant we use (bag
            yields, unit conversions, lumber dimensions) is a published,
            verifiable figure — never a guess. See our{" "}
            <Link href="/methodology">methodology page</Link> for the full
            list.
          </li>
          <li>
            <strong>Show the work.</strong> Each calculator displays its
            calculation steps, so you can verify the answer yourself.
          </li>
          <li>
            <strong>Round up, always.</strong> You can&apos;t buy half a
            bag. Every material count rounds up so you don&apos;t run
            short mid-project.
          </li>
          <li>
            <strong>Honest costs.</strong> We never invent prices. Cost
            estimators start empty for your local prices; cost guides cite
            ranges, never precise claims.
          </li>
          <li>
            <strong>Private by design.</strong> All calculations run in
            your browser. We have no accounts, and nothing you type is sent
            to our servers.
          </li>
        </ul>

        <h2 id="not">What this site is not</h2>
        <p>
          Our calculators are planning estimates, not engineering or
          professional advice. For structural work, permits, or anything
          load-bearing, consult a licensed professional in your area.
        </p>
        </div>
        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-5">
            <TableOfContents items={TOC_ITEMS} />
            <div className="card !p-5">
              <p className="eyebrow">Start here</p>
              <ul className="mt-3 space-y-2 text-sm">
                <li><Link href="/calculators" className="text-slate-600 hover:text-orange-700">All calculators</Link></li>
                <li><Link href="/guides" className="text-slate-600 hover:text-orange-700">Project guides</Link></li>
                <li><Link href="/methodology" className="text-slate-600 hover:text-orange-700">How we calculate</Link></li>
                <li><Link href="/contact" className="text-slate-600 hover:text-orange-700">Contact us</Link></li>
              </ul>
            </div>
          </div>
        </aside>
      </div>
    </article>
  );
}
