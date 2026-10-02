import Link from "next/link";

export const metadata = {
  title: "Page Not Found",
  description: "The page you're looking for doesn't exist. Browse our free calculators and guides instead.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="mx-auto max-w-content px-4 py-24 text-center sm:px-6">
      <p className="text-sm font-semibold uppercase tracking-widest text-orange-700">
        404
      </p>
      <h1 className="mt-3 text-4xl">That page wasn&apos;t in the plans</h1>
      <p className="mx-auto mt-4 max-w-xl text-slate-600">
        The page you&apos;re looking for doesn&apos;t exist or was moved. Here
        are some useful places to go instead:
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn-primary">
          Back to homepage
        </Link>
        <Link href="/calculators" className="btn-secondary">
          All calculators
        </Link>
        <Link href="/guides" className="btn-secondary">
          Project guides
        </Link>
      </div>
    </div>
  );
}
