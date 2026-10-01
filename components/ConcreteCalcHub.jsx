"use client";

import { useMemo, useState } from "react";
import {
  BAG_YIELDS_CU_FT,
  CU_FT_PER_CU_YD,
  bagsNeeded,
  cylinderVolumeCuFt,
  feetFromFtIn,
  rectVolumeCuFt,
  round2,
} from "@/lib/concreteMath";

const MODES = [
  { id: "slab", label: "Slab / Patio" },
  { id: "wall", label: "Wall" },
  { id: "footing", label: "Footing" },
  { id: "column", label: "Column / Sonotube" },
];

function FtInField({ label, ft, inch, onFt, onIn }) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-slate-700">
        {label}
      </label>
      <div className="flex gap-2">
        <div className="flex-1">
          <input
            type="number"
            min="0"
            step="1"
            value={ft}
            onChange={(e) => onFt(e.target.value)}
            aria-label={`${label} (feet)`}
            className="text-center"
          />
          <p className="mt-1 text-center text-xs text-slate-400">ft</p>
        </div>
        <div className="flex-1">
          <input
            type="number"
            min="0"
            max="11"
            step="1"
            value={inch}
            onChange={(e) => onIn(e.target.value)}
            aria-label={`${label} (inches)`}
            className="text-center"
          />
          <p className="mt-1 text-center text-xs text-slate-400">in</p>
        </div>
      </div>
    </div>
  );
}

function InchesField({ label, value, onChange, hint }) {
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
        {hint || "inches"}
      </p>
    </div>
  );
}

/** Original hand-drawn diagram: slab plan view + what a cubic yard means. */
function VolumeDiagram() {
  const cells = [];
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      cells.push(
        <rect
          key={`${r}-${c}`}
          x={250 + c * 34}
          y={120 + r * 34}
          width="34"
          height="34"
          fill={r === 1 && c === 1 ? "#fed7aa" : "#ffedd5"}
          stroke="#c2410c"
          strokeWidth="1.4"
        />
      );
    }
  }
  return (
    <svg
      viewBox="0 0 420 300"
      role="img"
      aria-label="Diagram of a concrete slab plan view and a grid showing one cubic yard equals twenty seven cubic feet"
      className="h-auto w-full"
    >
      {/* plan-view slab */}
      <rect
        x="30"
        y="60"
        width="180"
        height="130"
        fill="#e7e5e4"
        stroke="#78716c"
        strokeWidth="1.6"
      />
      <line x1="30" y1="225" x2="210" y2="225" stroke="#57534e" strokeWidth="1.4" />
      <polygon points="30,225 40,221 40,229" fill="#57534e" />
      <polygon points="210,225 200,221 200,229" fill="#57534e" />
      <text x="120" y="244" textAnchor="middle" fontSize="14" fill="#44403c" fontWeight="600">
        Length
      </text>
      <line x1="228" y1="60" x2="228" y2="190" stroke="#57534e" strokeWidth="1.4" />
      <polygon points="228,60 224,70 232,70" fill="#57534e" />
      <polygon points="228,190 224,180 232,180" fill="#57534e" />
      <text x="244" y="130" fontSize="14" fill="#44403c" fontWeight="600">
        Width
      </text>
      {/* side-view thickness strip */}
      <rect x="30" y="258" width="180" height="18" fill="#d6d3d1" stroke="#78716c" strokeWidth="1.4" />
      <line x1="222" y1="258" x2="222" y2="276" stroke="#57534e" strokeWidth="1.4" />
      <polygon points="222,258 218,268 226,268" fill="#57534e" />
      <polygon points="222,276 218,266 226,266" fill="#57534e" />
      <text x="234" y="273" fontSize="13" fill="#44403c" fontWeight="600">
        Thickness
      </text>
      {/* cubic-yard explainer: 3x3 grid = 9 sq ft x 3 ft tall */}
      <text x="250" y="60" fontSize="15" fill="#44403c" fontWeight="700">
        1 cubic yard =
      </text>
      <text x="250" y="82" fontSize="15" fill="#44403c" fontWeight="700">
        27 cubic feet
      </text>
      {cells}
      <text x="250" y="240" fontSize="12.5" fill="#57534e">
        A 3 ft × 3 ft × 3 ft block:
      </text>
      <text x="250" y="258" fontSize="12.5" fill="#57534e">
        9 sq ft of surface × 3 ft deep
      </text>
    </svg>
  );
}

export default function ConcreteCalcHub() {
  const [mode, setMode] = useState("slab");

  const [slabL, setSlabL] = useState({ ft: "12", inch: "0" });
  const [slabW, setSlabW] = useState({ ft: "12", inch: "0" });
  const [slabT, setSlabT] = useState("6");
  const [wallL, setWallL] = useState({ ft: "24", inch: "0" });
  const [wallH, setWallH] = useState({ ft: "4", inch: "0" });
  const [wallT, setWallT] = useState("8");
  const [footL, setFootL] = useState({ ft: "30", inch: "0" });
  const [footW, setFootW] = useState({ ft: "1", inch: "4" });
  const [footD, setFootD] = useState("12");
  const [colDia, setColDia] = useState("12");
  const [colH, setColH] = useState({ ft: "4", inch: "0" });

  const [waste, setWaste] = useState(10);
  const [pricePerYard, setPricePerYard] = useState("");

  const calc = useMemo(() => {
    const steps = [];
    let volumeCuFt = 0;

    if (mode === "slab" || mode === "wall" || mode === "footing") {
      const dims =
        mode === "slab"
          ? { a: slabL, b: slabW, t: slabT, names: ["Length", "Width", "Thickness"] }
          : mode === "wall"
            ? { a: wallL, b: wallH, t: wallT, names: ["Length", "Height", "Thickness"] }
            : { a: footL, b: footW, t: footD, names: ["Length", "Width", "Depth"] };
      const aFt = feetFromFtIn(dims.a.ft, dims.a.inch);
      const bFt = feetFromFtIn(dims.b.ft, dims.b.inch);
      const tFt = (Number(dims.t) || 0) / 12;
      volumeCuFt = rectVolumeCuFt(aFt, bFt, tFt);
      steps.push(
        `Volume = ${round2(aFt)} ft × ${round2(bFt)} ft × ${round2(tFt)} ft = ${round2(volumeCuFt)} cu ft`
      );
    } else {
      const diaFt = (Number(colDia) || 0) / 12;
      const hFt = feetFromFtIn(colH.ft, colH.inch);
      volumeCuFt = cylinderVolumeCuFt(diaFt, hFt);
      steps.push(
        `Volume = π × ${round2(diaFt / 2)}² × ${round2(hFt)} = ${round2(volumeCuFt)} cu ft`
      );
    }

    const yards = volumeCuFt / CU_FT_PER_CU_YD;
    steps.push(
      `In cubic yards: ${round2(volumeCuFt)} ÷ ${CU_FT_PER_CU_YD} = ${round2(yards)} cu yd`
    );

    const w = Math.min(Math.max(Number(waste) || 0, 0), 100);
    const withWasteCuFt = volumeCuFt * (1 + w / 100);
    const withWasteYd = withWasteCuFt / CU_FT_PER_CU_YD;
    steps.push(
      `With ${w}% waste: ${round2(withWasteCuFt)} cu ft = ${round2(withWasteYd)} cu yd`
    );
    steps.push(
      `Bag equivalents: ⌈${round2(withWasteCuFt)} ÷ 0.60⌉ = ${bagsNeeded(withWasteCuFt, 80)} × 80-lb bags (or ${bagsNeeded(withWasteCuFt, 60)} × 60-lb / ${bagsNeeded(withWasteCuFt, 40)} × 40-lb)`
    );

    const bags = {};
    for (const size of Object.keys(BAG_YIELDS_CU_FT)) {
      bags[size] = bagsNeeded(withWasteCuFt, size);
    }

    return {
      volumeCuFt,
      yards,
      wastePct: w,
      withWasteCuFt,
      withWasteYd,
      bags,
      steps,
    };
  }, [
    mode, slabL, slabW, slabT, wallL, wallH, wallT, footL, footW, footD,
    colDia, colH, waste,
  ]);

  const price = Number(pricePerYard) || 0;
  const cost = price > 0 ? calc.withWasteYd * price : null;
  const readyMix = calc.withWasteYd >= 2 ? "truck" : calc.withWasteYd > 1 ? "borderline" : "bags";

  return (
    <div className="card" id="calculator">
      <div
        role="tablist"
        aria-label="Project type"
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
          {mode === "slab" && (
            <>
              <FtInField label="Slab length" ft={slabL.ft} inch={slabL.inch}
                onFt={(v) => setSlabL({ ...slabL, ft: v })}
                onIn={(v) => setSlabL({ ...slabL, inch: v })} />
              <FtInField label="Slab width" ft={slabW.ft} inch={slabW.inch}
                onFt={(v) => setSlabW({ ...slabW, ft: v })}
                onIn={(v) => setSlabW({ ...slabW, inch: v })} />
              <InchesField label="Slab thickness" value={slabT} onChange={setSlabT}
                hint="inches — 4″ for patios & walkways, 6″ for driveways" />
            </>
          )}
          {mode === "wall" && (
            <>
              <FtInField label="Wall length" ft={wallL.ft} inch={wallL.inch}
                onFt={(v) => setWallL({ ...wallL, ft: v })}
                onIn={(v) => setWallL({ ...wallL, inch: v })} />
              <FtInField label="Wall height" ft={wallH.ft} inch={wallH.inch}
                onFt={(v) => setWallH({ ...wallH, ft: v })}
                onIn={(v) => setWallH({ ...wallH, inch: v })} />
              <InchesField label="Wall thickness" value={wallT} onChange={setWallT}
                hint="inches — 8″ is a common poured-wall thickness" />
            </>
          )}
          {mode === "footing" && (
            <>
              <FtInField label="Footing length" ft={footL.ft} inch={footL.inch}
                onFt={(v) => setFootL({ ...footL, ft: v })}
                onIn={(v) => setFootL({ ...footL, inch: v })} />
              <FtInField label="Footing width" ft={footW.ft} inch={footW.inch}
                onFt={(v) => setFootW({ ...footW, ft: v })}
                onIn={(v) => setFootW({ ...footW, inch: v })} />
              <InchesField label="Footing depth" value={footD} onChange={setFootD}
                hint="inches — check local code for minimum depth" />
            </>
          )}
          {mode === "column" && (
            <>
              <InchesField label="Column diameter" value={colDia} onChange={setColDia}
                hint="inches — standard sonotubes are 8″, 10″, or 12″" />
              <FtInField label="Column height" ft={colH.ft} inch={colH.inch}
                onFt={(v) => setColH({ ...colH, ft: v })}
                onIn={(v) => setColH({ ...colH, inch: v })} />
            </>
          )}

          <div>
            <label className="mb-1 flex items-center justify-between text-sm font-medium text-slate-700">
              <span>Waste &amp; overage allowance</span>
              <span className="rounded bg-orange-100 px-2 py-0.5 text-sm font-semibold text-orange-800">
                {calc.wastePct}%
              </span>
            </label>
            <input
              type="range" min="0" max="25" step="1" value={waste}
              onChange={(e) => setWaste(Number(e.target.value))}
              aria-label="Waste percentage"
            />
            <p className="mt-1 text-xs text-slate-400">
              5–10% is typical — forms flex, subgrade is never perfectly level.
            </p>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Ready-mix price per cubic yard{" "}
              <span className="font-normal text-slate-400">(optional — for cost estimate)</span>
            </label>
            <input
              type="number" min="0" step="0.01" value={pricePerYard}
              onChange={(e) => setPricePerYard(e.target.value)}
              placeholder="$ e.g. 180"
            />
          </div>
        </div>

        {/* Results */}
        <div className="space-y-5">
          <div className="rounded-xl bg-slate-900 p-5 text-white">
            <p className="text-sm uppercase tracking-wide text-slate-400">
              You need (with {calc.wastePct}% waste)
            </p>
            <p className="mt-1 text-5xl font-bold text-orange-400">
              {round2(calc.withWasteYd)}
              <span className="ml-2 text-xl font-medium text-slate-300">
                cubic yards
              </span>
            </p>
            <p className="mt-2 text-sm text-slate-400">
              = {round2(calc.withWasteCuFt)} cu ft · exact pour {round2(calc.yards)} yd³
              ({round2(calc.volumeCuFt)} cu ft)
            </p>
            {cost !== null && (
              <p className="mt-3 border-t border-slate-700 pt-3 text-lg font-semibold">
                Est. ready-mix cost: ${cost.toFixed(2)}{" "}
                <span className="text-sm font-normal text-slate-400">
                  ({round2(calc.withWasteYd)} yd³ × ${price.toFixed(2)})
                </span>
              </p>
            )}
          </div>

          <div
            className={`rounded-xl border p-4 text-sm leading-relaxed ${
              readyMix === "truck"
                ? "border-orange-300 bg-orange-50 text-orange-900"
                : "border-stone-200 bg-stone-50 text-slate-700"
            }`}
          >
            <p className="font-semibold">
              {readyMix === "truck"
                ? "🚚 Ready-mix territory — call a batch plant"
                : readyMix === "borderline"
                  ? "⚖️ Bags or ready-mix — get a quote both ways"
                  : "🛒 Bagged concrete is probably easier here"}
            </p>
            <p className="mt-1">
              {readyMix === "truck"
                ? `At ${round2(calc.withWasteYd)} cubic yards, a ready-mix truck is usually cheaper per yard and far less labor than mixing ${calc.bags[80]} eighty-pound bags.`
                : readyMix === "borderline"
                  ? "Around 1–2 cubic yards is the break-even zone: bags mean no minimum-order or short-load fees, but the labor adds up fast."
                  : "Under about 1 cubic yard, bagged premix is typically the simplest path — no truck scheduling, no minimum orders."}
            </p>
          </div>

          <div className="overflow-hidden rounded-xl border border-stone-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-stone-100 text-left">
                  <th className="px-4 py-2 font-semibold text-slate-700">Bag size</th>
                  <th className="px-4 py-2 font-semibold text-slate-700">Yield / bag</th>
                  <th className="px-4 py-2 font-semibold text-slate-700">Bags (with waste)</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(BAG_YIELDS_CU_FT).map((s) => (
                  <tr key={s} className="bg-white odd:bg-stone-50/50">
                    <td className="px-4 py-2">{s} lb</td>
                    <td className="px-4 py-2">{BAG_YIELDS_CU_FT[s]} cu ft</td>
                    <td className="px-4 py-2 font-semibold">{calc.bags[s]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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

          <VolumeDiagram />

          <p className="disclaimer-strip">
            Planning estimates only. Cost is volume × your quoted price per yard —
            delivery, short-load, and fuel fees vary by plant and aren&apos;t included.
            Ready-mix is usually sold in whole or quarter-yard increments; confirm the
            minimum order and increment with your batch plant before ordering.
          </p>
        </div>
      </div>
    </div>
  );
}
