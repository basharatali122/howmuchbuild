import { SITE_NAME, CONTACT_EMAIL } from "@/lib/siteConfig";

export const metadata = {
  title: "Privacy Policy",
  description: `${SITE_NAME} privacy policy — what little data we collect and why.`,
};

export default function PrivacyPage() {
  return (
    <article className="prose-hmb mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1>Privacy Policy</h1>
      <p>Last updated: October 1, 2026</p>
      <h2>What we collect</h2>
      <p>
        Almost nothing. Our calculators run entirely in your browser — the
        dimensions you enter never leave your device and are never sent to our
        servers. We do not require accounts, and we do not ask for your name,
        email, or location to use any tool.
      </p>
      <h2>Analytics</h2>
      <p>
        We may use privacy-respecting, aggregated analytics to understand which
        pages are visited, so we know what to build next. This data cannot
        identify you personally.
      </p>
      <h2>Cookies</h2>
      <p>
        We do not set tracking cookies ourselves. If we enable advertising,
        the ad network may use cookies as described below.
      </p>
      <h2>Advertising</h2>
      <p>
        We intend to display ads served by Google AdSense and similar
        third-party advertising networks. Third-party vendors, including
        Google, use cookies to serve ads based on your prior visits to this
        website and other websites. Google&apos;s use of advertising cookies
        enables it and its partners to serve ads to you based on your visit
        to our site and/or other sites on the Internet. You may opt out of
        personalized advertising by visiting Google&apos;s Ads Settings
        (google.com/settings/ads). See also how Google uses information from
        sites that use its services:{" "}
        <a href="https://business.safety.google/partners/">
          business.safety.google/partners
        </a>
        . This disclosure is required for AdSense program participation.
      </p>
      <h2>Contact</h2>
      <p>
        Questions about this policy:{" "}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
      </p>
    </article>
  );
}
