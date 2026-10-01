"use client";

import { useMemo, useState } from "react";

/* Mulch math constants (standard, verifiable US figures):
   - 1 cubic yard = 27 cubic feet (exact)
   - Standard mulch bag = 2 cu ft (the size printed on most retail bags)
   - 27 ÷ 2 = 13.5 bags per cubic yard (exact arithmetic)
   - Coverage rule of thumb: 1 cu yd ≈ 100 sq ft at 3" deep
     (exact: 27 ÷ 0.25 ft = 108 sq ft, conservatively rounded) */
const CU_FT_PER_CU_YD = 27;
const BAG_CU_FT = 2;
const BAGS_PER_CU_YD = CU_FT_PER_CU_YD / BAG_CU_FT;

const MODES = [
  { id: "rect", label: "Rectangle bed" },
  { id: "circle", label: "Circle bed" },
  { id: "triangle", label: "Triangle bed" },
];

const round2 = (n) => Math.round((Number(n) || 0) * 100) / 100;

function NumField({ label, value, onChange, unit, hint }) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-slate-700">
        {label}
      </label>
      <input
        type="number"
        min="0"
        step="any"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="text-center"
      />
      <p className="mt-1 text-center text-xs text-slate-400">
        {hint || unit || "feet"}
      </p>
    </div>
  );
}

/** Side cross-section showing how depth turns into volume.
    Placed inside the bed diagrams via explicit x/y/width (nested SVG). */
function DepthSection({ depthIn, x, y, width }) {
  const height = (width * 150) / 200;
  return (
    <svg
      x={x}
      y={y}
      width={width}
      height={height}
      viewBox="0 0 200 150"
      role="img"
      aria-label="Cross-section of a mulch bed showing depth"
    >
      <rect x="20" y="18" width="160" height="34" fill="#c68a4b" stroke="#92600f" strokeWidth="1.5" />
      <circle cx="60" cy="32" r="4" fill="#a16207" opacity="0.6" />
      <circle cx="110" cy="40" r="5" fill="#a16207" opacity="0.6" />
      <circle cx="150" cy="28" r="3.5" fill="#a16207" opacity="0.6" />
      <rect x="20" y="52" width="160" height="78" fill="#d6d3d1" stroke="#a8a29e" strokeWidth="1.5" />
      <line x1="190" y1="18" x2="190" y2="52" stroke="#b45309" strokeWidth="1.6" />
      <line x1="186" y1="18" x2="194" y2="18" stroke="#b45309" strokeWidth="1.6" />
      <line x1="186" y1="52" x2="194" y2="52" stroke="#b45309" strokeWidth="1.6" />
      <text x="196" y="38" fontSize="12" fill="#92400e" fontWeight="600">
        {depthIn || 0}″
      </text>
      <text x="100" y="38" textAnchor="middle" fontSize="12" fill="#78350f" fontWeight="600">
        mulch
      </text>
      <text x="100" y="98" textAnchor="middle" fontSize="12" fill="#57534e">
        soil
      </text>
      <text x="100" y="142" textAnchor="middle" fontSize="11" fill="#78716c">
        V = area × depth ÷ 27
      </text>
    </svg>
  );
}

function RectBedDiagram({ depthIn }) {
  return (
    <svg
      viewBox="0 0 340 210"
      role="img"
      aria-label="Diagram of a rectangular mulch bed with length, width, and depth"
      className="mx-auto h-auto w-full max-w-sm"
    >
      <rect x="24" y="20" width="190" height="130" rx="6" fill="#e8d5b7" stroke="#92600f" strokeWidth="1.8" />
      <circle cx="70" cy="60" r="6" fill="#c68a4b" opacity="0.5" />
      <circle cx="130" cy="100" r="8" fill="#c68a4b" opacity="0.5" />
      <circle cx="180" cy="55" r="5" fill="#c68a4b" opacity="0.5" />
      <circle cx="105" cy="125" r="5" fill="#c68a4b" opacity="0.5" />
      <line x1="24" y1="166" x2="214" y2="166" stroke="#57534e" strokeWidth="1.4" />
      <line x1="24" y1="160" x2="24" y2="172" stroke="#57534e" strokeWidth="1.4" />
      <line x1="214" y1="160" x2="214" y2="172" stroke="#57534e" strokeWidth="1.4" />
      <text x="119" y="162" textAnchor="middle" fontSize="13" fill="#44403c" fontWeight="600">
        Length
      </text>
      <line x1="10" y1="20" x2="10" y2="150" stroke="#57534e" strokeWidth="1.4" />
      <line x1="4" y1="20" x2="16" y2="20" stroke="#57534e" strokeWidth="1.4" />
      <line x1="4" y1="150" x2="16" y2="150" stroke="#57534e" strokeWidth="1.4" />
      <text x="8" y="90" textAnchor="middle" fontSize="13" fill="#44403c" fontWeight="600" transform="rotate(-90 8 90)">
        Width
      </text>
      <DepthSection depthIn={depthIn} x={236} y={20} width={96} />
      <text x="284" y="112" textAnchor="middle" fontSize="12" fill="#92400e" fontWeight="600">
        depth = {depthIn || 0}″
      </text>
    </svg>
  );
}

function CircleBedDiagram({ depthIn }) {
  return (
    <svg
      viewBox="0 0 340 210"
      role="img"
      aria-label="Diagram of a circular mulch bed with diameter and depth"
      className="mx-auto h-auto w-full max-w-sm"
    >
      <circle cx="115" cy="92" r="72" fill="#e8d5b7" stroke="#92600f" strokeWidth="1.8" />
      <circle cx="90" cy="70" r="6" fill="#c68a4b" opacity="0.5" />
      <circle cx="140" cy="110" r="8" fill="#c68a4b" opacity="0.5" />
      <circle cx="125" cy="55" r="5" fill="#c68a4b" opacity="0.5" />
      <line x1="43" y1="92" x2="187" y2="92" stroke="#57534e" strokeWidth="1.4" />
      <text x="115" y="86" textAnchor="middle" fontSize="13" fill="#44403c" fontWeight="600">
        Diameter
      </text>
      <text x="115" y="126" textAnchor="middle" fontSize="12" fill="#57534e">
        Area = π × (d ÷ 2)²
      </text>
      <DepthSection depthIn={depthIn} x={236} y={20} width={96} />
      <text x="284" y="112" textAnchor="middle" fontSize="12" fill="#92400e" fontWeight="600">
        depth = {depthIn || 0}″
      </text>
    </svg>
  );
}

function TriangleBedDiagram({ depthIn }) {
  return (
    <svg
      viewBox="0 0 340 210"
      role="img"
      aria-label="Diagram of a triangular mulch bed with base, height, and depth"
      className="mx-auto h-auto w-full max-w-sm"
    >
      <polygon points="24,164 214,164 119,30" fill="#e8d5b7" stroke="#92600f" strokeWidth="1.8" />
      <circle cx="105" cy="120" r="6" fill="#c68a4b" opacity="0.5" />
      <circle cx="145" cy="105" r="7" fill="#c68a4b" opacity="0.5" />
      <line x1="119" y1="164" x2="119" y2="30" stroke="#57534e" strokeWidth="1.2" strokeDasharray="5 4" />
      <text x="128" y="100" fontSize="13" fill="#44403c" fontWeight="600">
        Height
      </text>
      <line x1="24" y1="180" x2="214" y2="180" stroke="#57534e" strokeWidth="1.4" />
      <line x1="24" y1="174" x2="24" y2="186" stroke="#57534e" strokeWidth="1.4" />
      <line x1="214" y1="174" x2="214" y2="186" stroke="#57534e" strokeWidth="1.4" />
      <text x="119" y="176" textAnchor="middle" fontSize="13" fill="#44403c" fontWeight="600">
        Base
      </text>
      <text x="119" y="144" textAnchor="middle" fontSize="12" fill="#57534e">
        Area = ½ × base × height
      </text>
      <DepthSection depthIn={depthIn} x={236} y={20} width={96} />
      <text x="284" y="112" textAnchor="middle" fontSize="12" fill="#92400e" fontWeight="600">
        depth = {depthIn || 0}″
      </text>
    </svg>
  );
}

export default function MulchCalculator() {
  const [mode, setMode] = useState("rect");

  // Dimensions (feet) per shape
  const [rectL, setRectL] = useState("10");
  const [rectW, setRectW] = useState("12");
  const [dia, setDia] = useState("10");
  const [triBase, setTriBase] = useState("8");
  const [triH, setTriH] = useState("10");

  // Shared
  const [depth, setDepth] = useState("3");
  const [waste, setWaste] = useState(10);

  const calc = useMemo(() => {
    const steps = [];
    const depthFt = (Number(depth) || 0) / 12;
    let areaSqFt = 0;

    if (mode === "rect") {
      const L = Number(rectL) || 0;
      const W = Number(rectW) || 0;
      areaSqFt = L * W;
      steps.push(
        `Area = ${L} ft × ${W} ft = ${round2(areaSqFt)} sq ft`
      );
    } else if (mode === "circle") {
      const d = Number(dia) || 0;
      areaSqFt = Math.PI * Math.pow(d / 2, 2);
      steps.push(
        `Area = π × (${d} ÷ 2)² = π × ${round2(d / 2)}² = ${round2(areaSqFt)} sq ft`
      );
    } else {
      const b = Number(triBase) || 0;
      const h = Number(triH) || 0;
      areaSqFt = 0.5 * b * h;
      steps.push(
        `Area = ½ × ${b} ft × ${h} ft = ${round2(areaSqFt)} sq ft`
      );
    }

    const volumeCuFt = areaSqFt * depthFt;
    steps.push(
      `Volume = ${round2(areaSqFt)} sq ft × ${round2(depthFt)} ft (${depth || 0}″ deep) = ${round2(volumeCuFt)} cu ft`
    );

    const cuYd = volumeCuFt / CU_FT_PER_CU_YD;
    steps.push(
      `Cubic yards = ${round2(volumeCuFt)} ÷ ${CU_FT_PER_CU_YD} = ${round2(cuYd)} cu yd`
    );

    const withWasteCuFt = volumeCuFt * (1 + waste / 100);
    const cuYdWaste = withWasteCuFt / CU_FT_PER_CU_YD;
    steps.push(
      `With ${waste}% waste: ${round2(volumeCuFt)} × ${(1 + waste / 100).toFixed(2)} = ${round2(withWasteCuFt)} cu ft = ${round2(cuYdWaste)} cu yd`
    );

    const bagsExact = Math.ceil(volumeCuFt / BAG_CU_FT);
    const bagsWaste = Math.ceil(withWasteCuFt / BAG_CU_FT);
    steps.push(
      `Bags (${BAG_CU_FT} cu ft each): ${round2(withWasteCuFt)} ÷ ${BAG_CU_FT} = ${round2(withWasteCuFt / BAG_CU_FT)} → round up = ${bagsWaste} bags`
    );

    return {
      areaSqFt: round2(areaSqFt),
      cuYd: round2(cuYd),
      cuYdWaste: round2(cuYdWaste),
      bagsExact,
      bagsWaste,
      waste,
      steps,
    };
  }, [mode, rectL, rectW, dia, triBase, triH, depth, waste]);

  return (
    <div className="card" id="calculator">
      {/* Mode tabs */}
      <div
        role="tablist"
        aria-label="Bed shape"
        className="mb-6 flex flex-wrap gap-2"
      >
        {MODES.map((m) => (
          <button
            key={m.id}
            role="tab"
            aria-selected={mode === m.id}
            onClick={() => setMode(m.id)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              mode === m.id
                ? "bg-orange-600 text-white"
                : "border border-stone-300 bg-white text-slate-600 hover:border-orange-400 hover:text-orange-700"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Inputs */}
        <div className="space-y-5">
          {mode === "rect" && (
            <>
              <NumField label="Bed length" value={rectL} onChange={setRectL} hint="feet" />
              <NumField label="Bed width" value={rectW} onChange={setRectW} hint="feet" />
            </>
          )}
          {mode === "circle" && (
            <NumField label="Bed diameter" value={dia} onChange={setDia} hint="feet — measure straight across the widest point" />
          )}
          {mode === "triangle" && (
            <>
              <NumField label="Triangle base" value={triBase} onChange={setTriBase} hint="feet" />
              <NumField label="Triangle height" value={triH} onChange={setTriH} hint="feet — the perpendicular height, not the slanted edge" />
            </>
          )}

          <NumField
            label="Mulch depth"
            value={depth}
            onChange={setDepth}
            hint="inches — 2–3″ is typical for maintained beds"
          />

          <div className="border-t border-stone-200 pt-5">
            <label className="mb-1 flex items-center justify-between text-sm font-medium text-slate-700">
              <span>Waste &amp; settling allowance</span>
              <span className="rounded bg-orange-100 px-2 py-0.5 text-sm font-semibold text-orange-800">
                {waste}%
              </span>
            </label>
            <input
              type="range"
              min="0"
              max="25"
              step="1"
              value={waste}
              onChange={(e) => setWaste(Number(e.target.value))}
              aria-label="Waste percentage"
            />
            <p className="mt-1 text-xs text-slate-400">
              10% is a safe default — mulch settles and beds are rarely perfectly even.
            </p>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-5">
          <div className="rounded-xl bg-slate-900 p-5 text-white">
            <p className="text-sm uppercase tracking-wide text-slate-400">
              You need
            </p>
            <p className="mt-1 text-5xl font-bold text-orange-400">
              {calc.cuYdWaste}
              <span className="ml-2 text-xl font-medium text-slate-300">
                cu yd
              </span>
            </p>
            <p className="mt-2 text-sm text-slate-400">
              Exact volume: {calc.cuYd} cu yd · {calc.areaSqFt} sq ft at{" "}
              {depth || 0}″ deep
            </p>
            <p className="mt-3 border-t border-slate-700 pt-3 text-lg font-semibold">
              or {calc.bagsWaste} bags{" "}
              <span className="text-sm font-normal text-slate-400">
                ({BAG_CU_FT} cu ft bags · {BAGS_PER_CU_YD} bags per cu yd · exact
                pour needs {calc.bagsExact})
              </span>
            </p>
          </div>

          <div className="overflow-hidden rounded-xl border border-stone-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-stone-100 text-left">
                  <th className="px-4 py-2 font-semibold text-slate-700">Buy option</th>
                  <th className="px-4 py-2 font-semibold text-slate-700">Exact</th>
                  <th className="px-4 py-2 font-semibold text-slate-700">With {calc.waste}% waste</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-orange-50 font-semibold">
                  <td className="px-4 py-2">Bulk (cubic yards)</td>
                  <td className="px-4 py-2">{calc.cuYd} cu yd</td>
                  <td className="px-4 py-2">{calc.cuYdWaste} cu yd</td>
                </tr>
                <tr className="bg-white">
                  <td className="px-4 py-2">{BAG_CU_FT} cu ft bags</td>
                  <td className="px-4 py-2">{calc.bagsExact} bags</td>
                  <td className="px-4 py-2">{calc.bagsWaste} bags</td>
                </tr>
              </tbody>
            </table>
            <p className="border-t border-stone-200 bg-stone-50 px-4 py-2 text-xs text-slate-500">
              Rule of thumb: bags suit small beds; bulk usually wins past about
              2 cubic yards.
            </p>
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

          {mode === "rect" ? (
            <RectBedDiagram depthIn={depth} />
          ) : mode === "circle" ? (
            <CircleBedDiagram depthIn={depth} />
          ) : (
            <TriangleBedDiagram depthIn={depth} />
          )}

          <p className="disclaimer-strip">
            Estimates for planning. Bag sizes vary — check the cu ft printed on
            your bag (most are 2 cu ft). Bulk yards can run light if the pile
            has settled, so the waste allowance covers that too.
          </p>
        </div>
      </div>
    </div>
  );
}
