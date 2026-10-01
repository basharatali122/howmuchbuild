import { SITE_NAME } from "@/lib/siteConfig";

export const metadata = {
  title: "Terms of Service",
  description: `${SITE_NAME} terms of service.`,
};

export default function TermsPage() {
  return (
    <article className="prose-hmb mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1>Terms of Service</h1>
      <p>Last updated: October 1, 2026</p>
      <h2>Estimates, not advice</h2>
      <p>
        {SITE_NAME} provides free calculators whose results are estimates for
        planning purposes only. They are not engineering, construction, or
        professional advice. Material yields vary by product, mix, and site
        conditions.
      </p>
      <h2>Your responsibility</h2>
      <p>
        Always verify critical quantities with your supplier and follow local
        building codes. For structural, load-bearing, or permitted work,
        consult a licensed professional.
      </p>
      <h2>Acceptable use</h2>
      <p>
        Do not misuse the site, attempt to disrupt it, or scrape it
        aggressively. Content on this site (text, diagrams, and code) is
        ours; you may share links freely but may not republish our content
        without permission.
      </p>
      <h2>Changes</h2>
      <p>
        We may update these terms as the site grows; continued use after
        changes means you accept the updated terms.
      </p>
    </article>
  );
}
