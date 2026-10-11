/**
 * AuthorByline — editorial byline used on calculator and guide pages.
 * Real founder name; never a fake persona.
 */
export default function AuthorByline({ updated = "October 2026" }) {
  return (
    <p className="text-sm text-slate-500">
      By{" "}
      <span className="font-medium text-slate-700">
        basharat ali, Founder
      </span>
      <span aria-hidden="true"> · </span>
      Calculation reviewed
      <span aria-hidden="true"> · </span>
      Updated {updated}
    </p>
  );
}
