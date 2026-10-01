import Link from "next/link";
import AdSlot from "@/components/AdSlot";
import JsonLd from "@/components/JsonLd";
import AuthorByline from "@/components/AuthorByline";
import { SITE_URL, SITE_NAME } from "@/lib/siteConfig";

export const metadata = {
  title: `Methodology: How ${SITE_NAME} Calculates`,
  description:
    "How HowMuchBuild calculates: published constants, manufacturer bag yields, rounding-up policy, cost-estimate rules, review process, and limitations.",
  alternates: {
    canonical: `${SITE_URL}/methodology`,
  },
  openGraph: {
    title: `Methodology | ${SITE_NAME}`,
    description:
      "Every formula shown, every result rounded up. How our calculators work.",
    url: `${SITE_URL}/methodology`,
    type: "article",
  },
};

const PAGE_URL = `${SITE_URL}/methodology`;

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Methodology", item: PAGE_URL },
  ],
};

export default function MethodologyPage() {
  return (
    <article className="mx-auto max-w-content px-4 py-10 sm:px-6">
      <JsonLd data={breadcrumbJsonLd} />

      <nav aria-label="Breadcrumb" className="mb-4 text-sm text-slate-500">
        <Link href="/">Home</Link> <span aria-hidden="true">›</span>{" "}
        <span aria-current="page">Methodology</span>
      </nav>

      <p className="eyebrow">How we calculate</p>
      <h1 className="mt-2 max-w-3xl text-3xl sm:text-4xl">
        Methodology: Every Formula Shown, Every Result Rounded Up
      </h1>
      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-600">
        A calculator you can&apos;t check is just an opinion with buttons.
        This page documents exactly how {SITE_NAME} calculators work — the
        constants we use, where they come from, and the rules every result
        follows.
      </p>
      <div className="mt-4">
        <AuthorByline />
      </div>

      <div className="prose-hmb mt-10 max-w-3xl">
        <h2>How the calculators work</h2>
        <p>
          Every calculator on this site follows the same pipeline: your
          dimensions go in, standard geometry converts them to a volume or
          area, published material constants convert that into quantities,
          and a waste or allowance factor adjusts for the real world. The
          calculation steps are displayed on the results panel of every
          tool, so you can verify the arithmetic yourself — bring your own
          calculator and check us.
        </p>
        <p>
          All math runs in your browser (client-side). Nothing you enter is
          sent to a server, stored, or tracked.
        </p>

        <AdSlot label="Advertisement" className="my-8 h-28" />

        <h2>Published constants we use</h2>
        <p>
          We use standard, verifiable figures — never guesses. The core
          constants:
        </p>
        <table>
          <thead>
            <tr>
              <th>Constant</th>
              <th>Value</th>
              <th>Basis</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Cubic feet per cubic yard</td>
              <td>27 (exact)</td>
              <td>Definition: 3 ft × 3 ft × 3 ft</td>
            </tr>
            <tr>
              <td>80-lb premix bag yield</td>
              <td>0.60 cu ft</td>
              <td>Manufacturer-published (e.g. Quikrete, Sakrete packaging)</td>
            </tr>
            <tr>
              <td>60-lb premix bag yield</td>
              <td>0.45 cu ft</td>
              <td>Manufacturer-published packaging</td>
            </tr>
            <tr>
              <td>40-lb premix bag yield</td>
              <td>0.30 cu ft</td>
              <td>Manufacturer-published packaging</td>
            </tr>
            <tr>
              <td>Nominal 4×4 post, actual</td>
              <td>3.5″ × 3.5″</td>
              <td>US dressed lumber standard</td>
            </tr>
            <tr>
              <td>Nominal 6×6 post, actual</td>
              <td>5.5″ × 5.5″</td>
              <td>US dressed lumber standard</td>
            </tr>
          </tbody>
        </table>
        <p>
          Weight conversions (gravel tons, sand tons) are presented as{" "}
          <strong>ranges</strong>, because bulk density genuinely varies by
          material type and moisture. Where a figure is an estimate rather
          than an exact conversion, the page says so.
        </p>

        <h2>Rounding-up policy</h2>
        <p>
          Bags, boards, sheets, tiles, and boxes are always rounded{" "}
          <strong>up</strong> — you cannot buy a fraction of a bag, and
          running short mid-project is the expensive failure mode. Volumes
          in cubic yards or cubic feet are shown to two decimals for
          ordering from bulk suppliers, who sell fractional yards.
        </p>

        <h2>Cost estimates</h2>
        <p>
          Cost figures follow strict honesty rules:
        </p>
        <ul>
          <li>
            <strong>We never invent prices.</strong> Cost estimator inputs
            start empty — you enter your local store&apos;s prices.
          </li>
          <li>
            <strong>Every cost is labeled an estimate</strong>, with a note
            that prices vary by store and region.
          </li>
          <li>
            <strong>Cost guides cite ranges</strong>, never precise
            figures, and always note that actual prices vary widely by
            region, site conditions, and finish level.
          </li>
        </ul>

        <h2>Review process</h2>
        <p>
          Every calculator is reviewed by the {SITE_NAME} editorial team
          before publishing: the formulas are checked against the
          documented constants, the worked examples are recomputed by hand,
          and edge cases (zero inputs, extreme values) are tested. Pages
          are re-reviewed when updated — the &ldquo;Updated&rdquo; date on
          each page reflects its last review.
        </p>

        <h2>Limitations</h2>
        <ul>
          <li>
            Results are <strong>planning estimates, not quotes</strong> and
            not engineering or professional advice.
          </li>
          <li>
            Real projects have irregular shapes, uneven ground, and waste
            beyond any allowance — the calculators model the ideal case
            plus a configurable margin.
          </li>
          <li>
            For structural work, permits, or anything load-bearing, consult
            a licensed professional in your area.
          </li>
        </ul>

        <p>
          Questions about our math? <Link href="/contact">Contact us</Link>{" "}
          — we&apos;d rather fix an error than defend one.
        </p>
      </div>
    </article>
  );
}
