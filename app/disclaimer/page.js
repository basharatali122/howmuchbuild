import { SITE_NAME } from "@/lib/siteConfig";

export const metadata = {
  title: "Disclaimer",
  description: `${SITE_NAME} disclaimer — estimates for planning purposes, not professional advice.`,
};

export default function DisclaimerPage() {
  return (
    <article className="prose-hmb mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1>Disclaimer</h1>
      <p>Last updated: October 1, 2026</p>
      <h2>Estimates, not professional advice</h2>
      <p>
        All calculators on {SITE_NAME} produce estimates for planning purposes
        only. They are not engineering, architectural, construction, or other
        professional advice. Material yields vary by manufacturer, mix,
        weather, and site conditions; always round up and confirm quantities
        with your supplier.
      </p>
      <h2>Your responsibility</h2>
      <p>
        Building work must comply with your local building codes and permit
        requirements. For structural, load-bearing, electrical, plumbing, or
        gas work, hire a licensed professional. We are not liable for costs,
        delays, or damages arising from reliance on our estimates.
      </p>
      <h2>Advertising</h2>
      <p>
        This site may display third-party advertisements. Advertisers are
        responsible for their own content; their presence here is not an
        endorsement.
      </p>
    </article>
  );
}
