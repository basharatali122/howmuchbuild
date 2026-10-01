import Link from "next/link";
import { SITE_NAME, AUTHOR_NAME } from "@/lib/siteConfig";

export const metadata = {
  title: "About",
  description: `About ${SITE_NAME} — free DIY and contractor calculators built for accuracy. Our mission, coverage, and editorial standards.`,
};

export default function AboutPage() {
  return (
    <article className="mx-auto max-w-content px-4 py-12 sm:px-6">
      <nav aria-label="Breadcrumb" className="mb-4 text-sm text-slate-500">
        <Link href="/">Home</Link> <span aria-hidden="true">›</span>{" "}
        <span aria-current="page">About</span>
      </nav>

      <p className="eyebrow">About</p>
      <h1 className="mt-2 text-3xl sm:text-4xl">About {SITE_NAME}</h1>

      <div className="prose-hmb mt-6 max-w-3xl">
        <p className="text-lg">
          {SITE_NAME} is a small, independent project by {AUTHOR_NAME}. We
          build free calculators for DIY builders, homeowners, and
          contractors who need straight answers to practical questions: how
          many bags of concrete, how many deck boards, how much mulch — and
          what it will all cost.
        </p>

        <h2>Our mission</h2>
        <p>
          Home-improvement projects fail on arithmetic more often than on
          skill: the wrong bag count, the short load of gravel, the budget
          blown on a second delivery. Our mission is to make the math part
          of any project trivially easy — enter dimensions, get materials,
          estimate cost — and to show every step of the calculation so you
          never have to take our word for it.
        </p>

        <h2>What the site covers</h2>
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

        <h2>Editorial standards</h2>
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

        <h2>What this site is not</h2>
        <p>
          Our calculators are planning estimates, not engineering or
          professional advice. For structural work, permits, or anything
          load-bearing, consult a licensed professional in your area.
        </p>
      </div>
    </article>
  );
}
