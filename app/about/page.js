import { SITE_NAME, AUTHOR_NAME } from "@/lib/siteConfig";

export const metadata = {
  title: "About",
  description: `About ${SITE_NAME} — free DIY and contractor calculators built for accuracy.`,
};

export default function AboutPage() {
  return (
    <article className="prose-hmb mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1>About {SITE_NAME}</h1>
      <p>
        {SITE_NAME} is a small, independent project by {AUTHOR_NAME}. We build
        free calculators for DIY builders, homeowners, and contractors who
        need straight answers to practical questions: how many bags of
        concrete, how many deck boards, how much mulch.
      </p>
      <h2>How we build our calculators</h2>
      <ul>
        <li>
          <strong>Standard math only.</strong> Every constant we use (bag
          yields, unit conversions, lumber dimensions) is a published,
          verifiable figure — never a guess.
        </li>
        <li>
          <strong>Show the work.</strong> Each calculator displays its
          calculation steps, so you can verify the answer yourself.
        </li>
        <li>
          <strong>Private by design.</strong> All calculations run in your
          browser. We have no accounts, and nothing you type is sent to our
          servers.
        </li>
      </ul>
      <h2>What this site is not</h2>
      <p>
        Our calculators are planning estimates, not engineering or
        professional advice. For structural work, permits, or anything
        load-bearing, consult a licensed professional in your area.
      </p>
    </article>
  );
}
