import Link from "next/link";
import AdSlot from "@/components/AdSlot";
import CalculatorCard from "@/components/CalculatorCard";
import { calculatorNav } from "@/lib/nav";
import { SITE_URL, SITE_NAME } from "@/lib/siteConfig";
import {
  IconSlab,
  IconWall,
  IconDeck,
  IconFence,
  IconMulch,
  IconPaint,
  IconDrywall,
  IconPaver,
  IconSod,
  IconSoil,
  IconGravel,
  IconSand,
  IconTile,
} from "@/components/SvgDiagrams";

export const metadata = {
  title: "All Calculators",
  description:
    `Every ${SITE_NAME} calculator: concrete bags, concrete volume, deck, fence, mulch, paint, drywall, paver, sod, topsoil, gravel, sand & tile — each with full material takeoffs, waste allowances, cost estimates, and worked examples.`,
  alternates: {
    canonical: `${SITE_URL}/calculators`,
  },
};

const ICONS = {
  slab: IconSlab,
  wall: IconWall,
  deck: IconDeck,
  fence: IconFence,
  mulch: IconMulch,
  paint: IconPaint,
  drywall: IconDrywall,
  paver: IconPaver,
  sod: IconSod,
  soil: IconSoil,
  gravel: IconGravel,
  sand: IconSand,
  tile: IconTile,
};

export default function CalculatorsHubPage() {
  return (
    <div className="mx-auto max-w-content px-4 py-12 sm:px-6">
      <nav aria-label="Breadcrumb" className="mb-4 text-sm text-slate-500">
        <Link href="/">Home</Link> <span aria-hidden="true">›</span>{" "}
        <span aria-current="page">All Calculators</span>
      </nav>
      <p className="eyebrow">Free tools</p>
      <h1 className="mt-2 text-3xl sm:text-4xl">All Calculators</h1>
      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-600">
        Every {SITE_NAME} tool shows its work: full material takeoffs, waste
        allowances, cost estimates, and step-by-step arithmetic — not
        one-field widgets. Thirteen calculators, all free, no sign-up.
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {calculatorNav.map((c) => (
          <CalculatorCard
            key={c.href}
            href={c.href}
            title={c.title}
            desc={c.desc}
            icon={ICONS[c.iconName]}
          />
        ))}
      </div>

      <AdSlot label="Advertisement" className="mt-12 h-28" />
    </div>
  );
}
