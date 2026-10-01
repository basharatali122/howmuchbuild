import { SITE_NAME, CONTACT_EMAIL } from "@/lib/siteConfig";

export const metadata = {
  title: "Contact",
  description: `Contact ${SITE_NAME} — corrections, suggestions, and feedback.`,
};

export default function ContactPage() {
  return (
    <article className="prose-hmb mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1>Contact</h1>
      <p>
        Found a math error, have a suggestion for the next calculator, or just
        want to say hello? We read everything.
      </p>
      <p>
        Email us at{" "}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
      </p>
      <p>
        If you are reporting a possible error in a calculator, please include
        the page URL, the inputs you used, and what you expected — it helps us
        fix things fast.
      </p>
    </article>
  );
}
