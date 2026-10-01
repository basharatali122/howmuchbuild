"use client";

import { useMemo, useState } from "react";
import CostEstimator from "@/components/CostEstimator";
import { postHoleConcrete } from "@/lib/concreteMath";

const PICKET_COVERAGE_IN = 5.5; // actual coverage of a 1x6 picket
const BAG_YIELD_80LB = 0.6; // cu ft per 80-lb bag, printed on the bag

function NumberField({ label, value, onChange, hint }) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-slate-700">
        {label}
      </label>
      <input
        type="number" min="0" step="any" value={value}
        onChange={(e) => onChange(e.target.value)}
        className="text-center"
      />
      {hint ? (
        <p className="mt-1 text-center text-xs text-slate-400">{hint}</p>
      ) : null}
    </div>
  );
}

function SelectField({ label, value, onChange, options, hint }) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-slate-700">
        {label}
      </label>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      {hint ? <p className="mt-1 text-xs text-slate-400">{hint}</p> : null}
    </div>
  );
}

/** Original hand-drawn fence elevation diagram. */
function FenceDiagram() {
  const pickets = [];
  for (let i = 0; i < 26; i++) {
    pickets.push(
      <rect
        key={i}
        x={38 + i * 11.5}
        y="70"
        width="10"
        height="120"
        fill={i % 2 ? "#e7e5e4" : "#d6d3d1"}
        stroke="#a8a29e"
        strokeWidth="0.8"
      />
    );
  }
  return (
    <svg
      viewBox="0 0 380 300"
      role="img"
      aria-label="Elevation diagram of a wood fence showing posts, horizontal rails, and vertical pickets"
      className="h-auto w-full"
    >
      {pickets}
      {/* rails */}
      {[95, 135, 175].map((y) => (
        <rect
          key={y}
          x="30"
          y={y}
          width="320"
          height="9"
          fill="#a8a29e"
          stroke="#78716c"
          strokeWidth="1.2"
        />
      ))}
      {/* posts */}
      {[30, 186, 342].map((x) => (
        <rect
          key={x}
          x={x - 7}
          y="58"
          width="14"
          height="170"
          fill="#78716c"
          stroke="#44403c"
          strokeWidth="1.5"
        />
      ))}
      {/* concrete in ground */}
      {[30, 186, 342].map((x) => (
        <path
          key={`c${x}`}
          d={`M${x - 22},228 L${x + 22},228 L${x + 14},262 L${x - 14},262 Z`}
          fill="#d6d3d1"
          stroke="#78716c"
          strokeWidth="1.2"
        />
      ))}
      <line x1="0" y1="228" x2="380" y2="228" stroke="#57534e" strokeWidth="2" strokeDasharray="6 4" />
      <text x="190" y="286" textAnchor="middle" fontSize="12.5" fill="#57534e">
        grade
      </text>
      {/* height dimension */}
      <line x1="362" y1="58" x2="362" y2="228" stroke="#57534e" strokeWidth="1.4" />
      <polygon points="362,58 358,68 366,68" fill="#57534e" />
      <polygon points="362,228 358,218 366,218" fill="#57534e" />
      <text x="372" y="150" fontSize="12.5" fill="#44403c" fontWeight="600">
        Ht
      </text>
      {/* spacing dimension */}
      <line x1="30" y1="40" x2="186" y2="40" stroke="#57534e" strokeWidth="1.4" />
      <polygon points="30,40 40,36 40,44" fill="#57534e" />
      <polygon points="186,40 176,36 176,44" fill="#57534e" />
      <text x="108" y="32" textAnchor="middle" fontSize="12.5" fill="#44403c" fontWeight="600">
        post spacing (8 ft typ.)
      </text>
      <text x="10" y="100" fontSize="12.5" fill="#57534e">
        2×4 rails — 3 per 6 ft section (typical)
      </text>
      <text x="10" y="208" fontSize="12.5" fill="#57534e">
        1×6 pickets — 5.5″ coverage each
      </text>
    </svg>
  );
}

export default function FenceCalculator() {
  const [totalLF, setTotalLF] = useState("100");
  const [height, setHeight] = useState("6");
  const [style, setStyle] = useState("privacy");
  const [gap, setGap] = useState("2");
  const [spacing, setSpacing] = useState("8");
  const [gates, setGates] = useState("1");
  const [holeDia, setHoleDia] = useState("12");
  const [holeDepth, setHoleDepth] = useState("36");
  const [postSize, setPostSize] = useState("4x4");

  const calc = useMemo(() => {
    const steps = [];
    const LF = Number(totalLF) || 0;
    const h = Number(height) || 0;
    const sp = Number(spacing) || 0;
    const g = Number(gates) || 0;

    // Sections & posts
    const sections = LF > 0 && sp > 0 ? Math.ceil(LF / sp) : 0;
    const actualSpacing = sections > 0 ? LF / sections : 0;
    const linePosts = sections > 0 ? sections + 1 : 0;
    const gatePosts = g * 2; // one post each side of each gate, typical
    const totalPosts = linePosts + gatePosts;
    steps.push(
      `Sections = ⌈${LF} ft ÷ ${sp} ft⌉ = ${sections} (actual spacing ≈ ${actualSpacing.toFixed(2)} ft)`
    );
    steps.push(
      `Posts = ${sections} + 1 line posts = ${linePosts}, plus ${g} × 2 gate posts = ${gatePosts} → ${totalPosts} total`
    );

    // Pickets
    let pickets = 0;
    if (style === "privacy") {
      pickets = LF > 0 ? Math.ceil((LF * 12) / PICKET_COVERAGE_IN) : 0;
      steps.push(
        `Pickets (privacy) = ⌈${Math.round(LF * 12)}″ ÷ ${PICKET_COVERAGE_IN}″ coverage⌉ = ${pickets}`
      );
    } else if (style === "spaced") {
      const gp = Number(gap) || 0;
      pickets = LF > 0 ? Math.ceil((LF * 12) / (PICKET_COVERAGE_IN + gp)) : 0;
      steps.push(
        `Pickets (spaced) = ⌈${Math.round(LF * 12)}″ ÷ (${PICKET_COVERAGE_IN}″ + ${gp}″ gap)⌉ = ${pickets}`
      );
    } else {
      steps.push(`Pickets = 0 — rail-only style has no pickets`);
    }

    // Rails: 2 per section up to 4 ft tall, 3 per section for taller (typical)
    const railsPerSection = h <= 4 ? 2 : 3;
    const rails = sections * railsPerSection;
    const railLF = rails * sp;
    steps.push(
      `Rails = ${sections} sections × ${railsPerSection} (${h} ft fence, typical) = ${rails} rails × ${sp} ft = ${railLF.toFixed(1)} lin ft`
    );

    // Concrete per post: hole volume minus post displacement, then 80-lb bags
    const conc = postHoleConcrete({
      holeShape: "round",
      holeSizeIn: holeDia,
      holeDepthIn: holeDepth,
      postKind: "square",
      postSizeLabel: postSize,
      numHoles: 1,
    });
    const bagsPerPost =
      conc.perHoleCuFt > 0
        ? Math.ceil(conc.perHoleCuFt / BAG_YIELD_80LB - 1e-9)
        : 0;
    const totalBags =
      totalPosts > 0
        ? Math.ceil((conc.perHoleCuFt * totalPosts) / BAG_YIELD_80LB - 1e-9)
        : 0;
    steps.push(
      `Concrete/post = ${conc.holeCuFt.toFixed(2)} (hole) − ${conc.postCuFt.toFixed(2)} (post) = ${conc.perHoleCuFt.toFixed(2)} cu ft → ⌈${conc.perHoleCuFt.toFixed(2)} ÷ 0.60⌉ = ${bagsPerPost} × 80-lb bags`
    );
    steps.push(
      `Total concrete = ${conc.perHoleCuFt.toFixed(2)} × ${totalPosts} posts = ${(conc.perHoleCuFt * totalPosts).toFixed(2)} cu ft → ${totalBags} × 80-lb bags`
    );

    return {
      sections, actualSpacing, linePosts, gatePosts, totalPosts,
      pickets, railsPerSection, rails, railLF,
      conc, bagsPerPost, totalBags, steps,
    };
  }, [totalLF, height, style, gap, spacing, gates, holeDia, holeDepth, postSize]);

  return (
    <div className="card" id="calculator">
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Inputs */}
        <div className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <NumberField label="Total fence length" value={totalLF} onChange={setTotalLF}
              hint="linear feet — measure the whole run" />
            <SelectField label="Fence height" value={height} onChange={setHeight}
              options={["4", "5", "6"].map((h) => ({ value: h, label: `${h} ft` }))} />
          </div>

          <SelectField label="Fence style" value={style} onChange={setStyle}
            options={[
              { value: "privacy", label: "Privacy picket (no gap)" },
              { value: "spaced", label: "Spaced picket" },
              { value: "rail", label: "Rail-only (split-rail style)" },
            ]} />

          {style === "spaced" && (
            <NumberField label="Gap between pickets" value={gap} onChange={setGap}
              hint="inches" />
          )}

          <div className="grid grid-cols-2 gap-4">
            <NumberField label="Post spacing" value={spacing} onChange={setSpacing}
              hint="feet — 8 ft is typical" />
            <NumberField label="Gates" value={gates} onChange={setGates}
              hint="number of gate openings" />
          </div>

          <div className="border-t border-stone-200 pt-5">
            <p className="mb-3 text-sm font-semibold text-slate-700">
              Post holes (for concrete)
            </p>
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Hole diameter" value={holeDia} onChange={setHoleDia}
                hint="inches — 12″ is typical" />
              <NumberField label="Hole depth" value={holeDepth} onChange={setHoleDepth}
                hint="inches — go below the frost line" />
            </div>
            <div className="mt-4">
              <SelectField label="Post size (nominal)" value={postSize} onChange={setPostSize}
                options={[
                  { value: "4x4", label: "4×4 (actual 3.5″ × 3.5″)" },
                  { value: "6x6", label: "6×6 (actual 5.5″ × 5.5″)" },
                ]}
                hint="We use actual lumber dimensions so the post displacement is accurate." />
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-5 lg:sticky lg:top-24 self-start">
          <CostEstimator
            lines={[
              { id: "posts", label: "Fence posts", quantity: calc.totalPosts, unit: "posts", pricePlaceholder: "10.00" },
              { id: "pickets", label: "Pickets", quantity: calc.pickets, unit: "pickets", pricePlaceholder: "3.00" },
              { id: "rails", label: "Rails", quantity: calc.rails, unit: "rails", pricePlaceholder: "6.00" },
              { id: "bags", label: "80-lb concrete bags", quantity: calc.totalBags, unit: "bags", pricePlaceholder: "6.50" },
            ]}
          />
          <div className="rounded-xl bg-slate-900 p-5 text-white">
            <p className="text-sm uppercase tracking-wide text-slate-400">
              Material takeoff
            </p>
            <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-4">
              {[
                { v: calc.totalPosts, u: `posts (${calc.linePosts} line + ${calc.gatePosts} gate)` },
                { v: calc.pickets, u: "pickets" },
                { v: calc.rails, u: `rails (${calc.railsPerSection}/section)` },
                { v: calc.totalBags, u: "80-lb bags of concrete" },
              ].map((x) => (
                <div key={x.u}>
                  <p className="text-3xl font-bold text-orange-400">{x.v}</p>
                  <p className="text-sm text-slate-300">{x.u}</p>
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs text-slate-400">
              Every count is rounded up. Concrete is per 12″-diameter hole minus
              post displacement; adjust hole size to match your dig.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-center">
            <div className="rounded-xl border border-stone-200 bg-stone-50 p-3">
              <p className="text-2xl font-bold text-slate-900">{calc.sections}</p>
              <p className="text-xs text-slate-500">
                sections · ≈ {calc.actualSpacing.toFixed(2)} ft apart
              </p>
            </div>
            <div className="rounded-xl border border-stone-200 bg-stone-50 p-3">
              <p className="text-2xl font-bold text-slate-900">
                {calc.railLF.toFixed(0)}
              </p>
              <p className="text-xs text-slate-500">linear ft of 2×4 rails</p>
            </div>
          </div>

          <div className="rounded-xl border border-stone-200 bg-stone-50 p-4">
            <p className="mb-2 text-sm font-semibold text-slate-800">
              How we calculated it
            </p>
            <ol className="list-decimal space-y-1.5 pl-5 font-mono text-[13px] leading-relaxed text-slate-600">
              {calc.steps.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ol>
          </div>

          <FenceDiagram />

          <p className="disclaimer-strip">
            Planning estimates — they don&apos;t include hardware, hinges,
            latches, or gate frames. Post depth should pass below your local
            frost line (a common rule of thumb is about one-third of the
            post&apos;s length below grade), and setback rules vary by
            municipality — check local code before you dig.
          </p>
        </div>
      </div>
    </div>
  );
}
