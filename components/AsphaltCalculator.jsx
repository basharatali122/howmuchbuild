"use client";

import { useMemo, useState } from "react";
import CostEstimator from "@/components/CostEstimator";

/**
 * AsphaltCalculator — hot-mix asphalt quantity math.
 * 145 lb/cu ft is a typical compacted hot-mix density; it varies by mix
 * design and compaction, so weight and tonnage are labeled estimates.
 */
const LBS_PER_CU_FT = 145;

function NumberField({ label, value, onChange, hint, step = "any", min = "0" }) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-slate-700">
        {label}
      </label>
      <input
        type="number"
        min={min}
        step={step}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="text-center"
      />
      {hint ? (
        <p className="mt-1 text-center text-xs text-slate-400">{hint}</p>
      ) : null}
    </div>
  );
}

/** Original driveway cross-section diagram with thickness callout. */
function AsphaltDiagram() {
  // Layers (px): asphalt 30, gravel base 40, soil 40. Driveway x: 60–400.
  const x0 = 60;
  const x1 = 400;
  const asphaltTop = 118;
  const asphaltBot = 148;
  const baseBot = 188;
  const soilBot = 228;

  return (
    <svg
      viewBox="0 0 460 270"
      role="img"
      aria-label="Cross-section diagram of a driveway showing asphalt thickness over a gravel base"
      className="h-auto w-full"
    >
      <text x="230" y="22" textAnchor="middle" fontSize="14" fill="#44403c" fontWeight="700">
        Driveway cross-section (not to scale)
      </text>

      {/* soil */}
      <rect x={x0} y={baseBot} width={x1 - x0} height={soilBot - baseBot} fill="#d6c7a8" stroke="#a8a29e" strokeWidth="1" />
      {/* gravel base */}
      <rect x={x0} y={asphaltBot} width={x1 - x0} height={baseBot - asphaltBot} fill="#b8b2a7" stroke="#a8a29e" strokeWidth="1" />
      {/* asphalt */}
      <rect x={x0} y={asphaltTop} width={x1 - x0} height={asphaltBot - asphaltTop} fill="#44403c" stroke="#292524" strokeWidth="1" />

      {/* layer labels */}
      <text x={(x0 + x1) / 2} y={asphaltTop + 20} textAnchor="middle" fontSize="12.5" fill="#fafaf9" fontWeight="600">
        asphalt
      </text>
      <text x={(x0 + x1) / 2} y={asphaltBot + 25} textAnchor="middle" fontSize="12.5" fill="#44403c" fontWeight="600">
        compacted gravel base
      </text>
      <text x={(x0 + x1) / 2 + 118} y={asphaltBot + 25} fontSize="11" fill="#57534e">
        4–6″ typical
      </text>
      <text x={(x0 + x1) / 2} y={baseBot + 25} textAnchor="middle" fontSize="12.5" fill="#57534e" fontWeight="600">
        subgrade (soil)
      </text>

      {/* thickness callout arrow (right of driveway) */}
      <line x1={x1 + 26} y1={asphaltTop} x2={x1 + 26} y2={asphaltBot} stroke="#c2410c" strokeWidth="1.5" />
      <polygon points={`${x1 + 26},${asphaltTop} ${x1 + 22},${asphaltTop + 8} ${x1 + 30},${asphaltTop + 8}`} fill="#c2410c" />
      <polygon points={`${x1 + 26},${asphaltBot} ${x1 + 22},${asphaltBot - 8} ${x1 + 30},${asphaltBot - 8}`} fill="#c2410c" />
      <text x={x1 + 34} y={(asphaltTop + asphaltBot) / 2 - 6} fontSize="12" fill="#c2410c" fontWeight="600">
        thickness
      </text>
      <text x={x1 + 34} y={(asphaltTop + asphaltBot) / 2 + 10} fontSize="11" fill="#c2410c">
        2–3″ typical
      </text>

      {/* length/width hint */}
      <text x={(x0 + x1) / 2} y="258" textAnchor="middle" fontSize="11" fill="#78716c">
        Length × width set the area; thickness sets the depth — volume = area × depth.
      </text>
    </svg>
  );
}

export default function AsphaltCalculator() {
  const [length, setLength] = useState("20");
  const [width, setWidth] = useState("12");
  const [thickness, setThickness] = useState("2.5");
  const [waste, setWaste] = useState("5");

  const calc = useMemo(() => {
    const steps = [];
    const L = Number(length) || 0;
    const W = Number(width) || 0;
    const t = Number(thickness) || 0;
    const wastePct = Number(waste) || 0;

    if (L <= 0 || W <= 0 || t <= 0) {
      return {
        cuFt: 0, cuYd: 0, lbs: 0, tons: 0, tonsRaw: 0,
        steps: ["Enter a length, width, and thickness above 0 to calculate."],
      };
    }

    const cuFt = L * W * (t / 12);
    const cuYd = cuFt / 27;
    // Weight is an estimate: 145 lb/cu ft is typical compacted hot-mix.
    const lbs = cuFt * LBS_PER_CU_FT;
    const tonsRaw = (lbs / 2000) * (1 + wastePct / 100);
    // Suppliers sell by the ton — round UP to the nearest half ton.
    const tons = Math.ceil(tonsRaw * 2) / 2;

    steps.push(
      `Volume = ${L} ft × ${W} ft × (${t}″ ÷ 12) = ${cuFt.toFixed(1)} cu ft`
    );
    steps.push(
      `Cubic yards = ${cuFt.toFixed(1)} ÷ 27 = ${cuYd.toFixed(2)} cu yd`
    );
    steps.push(
      `Weight ≈ ${cuFt.toFixed(1)} cu ft × ${LBS_PER_CU_FT} lb/cu ft (typical) = ${Math.round(lbs).toLocaleString("en-US")} lb`
    );
    steps.push(
      `Tons = ${Math.round(lbs).toLocaleString("en-US")} ÷ 2,000 × (1 + ${wastePct}% waste) = ${tonsRaw.toFixed(2)} → round UP to ${tons.toFixed(1)} tons`
    );

    return { cuFt, cuYd, lbs, tons, tonsRaw, steps };
  }, [length, width, thickness, waste]);

  return (
    <div className="card" id="calculator">
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Inputs */}
        <div className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <NumberField
              label="Length (feet)"
              value={length}
              onChange={setLength}
              hint="Longest driveway dimension."
            />
            <NumberField
              label="Width (feet)"
              value={width}
              onChange={setWidth}
              hint="Driveway width."
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <NumberField
              label="Thickness (inches)"
              value={thickness}
              onChange={setThickness}
              step="0.5"
              hint="2–3″ is typical for a residential driveway."
            />
            <NumberField
              label="Waste (%)"
              value={waste}
              onChange={setWaste}
              step="1"
              hint="5% covers edges and uneven base."
            />
          </div>
          <p className="rounded-lg bg-stone-100 p-3 text-xs leading-relaxed text-slate-500">
            Weight uses a typical compacted hot-mix density of 145 lb per
            cubic foot — actual density varies by mix design and compaction,
            so tonnage is an estimate. Order from a local plant or paver and
            confirm their minimum load.
          </p>
        </div>

        {/* Results */}
        <div className="space-y-5 lg:sticky lg:top-24 self-start">
          <CostEstimator
            lines={[
              {
                id: "asphalt",
                label: "Hot-mix asphalt",
                quantity: calc.tons,
                unit: "tons",
                pricePlaceholder: "95.00",
              },
            ]}
          />
          <div className="rounded-xl bg-slate-900 p-5 text-white">
            <p className="text-sm uppercase tracking-wide text-slate-400">
              Asphalt needed (estimate)
            </p>
            <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-4">
              {[
                { v: calc.tons.toFixed(1), u: "tons (rounded up)" },
                { v: calc.cuYd.toFixed(2), u: "cubic yards" },
                { v: calc.cuFt.toFixed(1), u: "cubic feet" },
                {
                  v: `${Math.round(calc.lbs).toLocaleString("en-US")} lb`,
                  u: "estimated weight",
                },
              ].map((x) => (
                <div key={x.u}>
                  <p className="text-3xl font-bold text-orange-400">{x.v}</p>
                  <p className="text-sm text-slate-300">{x.u}</p>
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs text-slate-400">
              Tons are rounded up to the nearest half ton — suppliers
              don&apos;t sell fractions smaller than that, and running short
              mid-pave is expensive.
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

          <AsphaltDiagram />

          <p className="disclaimer-strip">
            <strong>Estimate, not a quote:</strong> tonnage depends on the
            plant&apos;s mix and how well the base is compacted. For anything
            bigger than a small patch, get the paver or plant to confirm the
            order — and check local rules on driveway aprons, drainage, and
            permits before you pave.
          </p>
        </div>
      </div>
    </div>
  );
}
