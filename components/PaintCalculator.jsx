"use client";

import { useMemo, useState } from "react";
import CostEstimator from "@/components/CostEstimator";

/* Paint math constants (standard, verifiable US figures):
   - Wall area for a rectangular room = 2 × (L + W) × H (exact geometry)
   - Door allowance ≈ 21 sq ft (typical 3 ft × 7 ft door — labeled typical)
   - Window allowance ≈ 15 sq ft (typical ~3 ft × 5 ft window — labeled typical)
   - Interior paint coverage: 350–400 sq ft per gallon is the range most
     manufacturers print on the can; 350 is the conservative default.
   - Gallons always rounded up (Math.ceil). */
const DOOR_SQ_FT = 21; // typical 3' × 7' door
const WINDOW_SQ_FT = 15; // typical window
const DEFAULT_COVERAGE = 350; // sq ft per gallon (conservative end of 350–400)

const MODES = [
  { id: "room", label: "Room" },
  { id: "exterior", label: "Exterior walls" },
];

const COVERAGE_OPTIONS = [
  { value: 350, label: "350 sq ft/gal — rough, textured, or unprimed (safer)" },
  { value: 400, label: "400 sq ft/gal — smooth, primed surface" },
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
        {hint || unit || ""}
      </p>
    </div>
  );
}

/** Original front-view diagram of a wall with a door and window cut out. */
function RoomPaintDiagram() {
  return (
    <svg
      viewBox="0 0 340 230"
      role="img"
      aria-label="Diagram of a wall with door and window areas subtracted"
      className="mx-auto h-auto w-full max-w-sm"
    >
      <rect x="30" y="14" width="250" height="170" fill="#fde8d8" stroke="#b45309" strokeWidth="1.8" />
      <rect x="180" y="84" width="56" height="100" fill="#fff" stroke="#78716c" strokeWidth="1.6" />
      <line x1="180" y1="134" x2="236" y2="134" stroke="#d6d3d1" strokeWidth="1.2" />
      <text x="208" y="170" textAnchor="middle" fontSize="11" fill="#78716c">
        door ≈ 21 sq ft
      </text>
      <rect x="62" y="60" width="64" height="52" fill="#fff" stroke="#78716c" strokeWidth="1.6" />
      <line x1="94" y1="60" x2="94" y2="112" stroke="#d6d3d1" strokeWidth="1.2" />
      <line x1="62" y1="86" x2="126" y2="86" stroke="#d6d3d1" strokeWidth="1.2" />
      <text x="94" y="130" textAnchor="middle" fontSize="11" fill="#78716c">
        window ≈ 15 sq ft
      </text>
      <line x1="30" y1="200" x2="280" y2="200" stroke="#57534e" strokeWidth="1.4" />
      <line x1="30" y1="194" x2="30" y2="206" stroke="#57534e" strokeWidth="1.4" />
      <line x1="280" y1="194" x2="280" y2="206" stroke="#57534e" strokeWidth="1.4" />
      <text x="155" y="196" textAnchor="middle" fontSize="13" fill="#44403c" fontWeight="600">
        Length
      </text>
      <line x1="296" y1="14" x2="296" y2="184" stroke="#57534e" strokeWidth="1.4" />
      <line x1="290" y1="14" x2="302" y2="14" stroke="#57534e" strokeWidth="1.4" />
      <line x1="290" y1="184" x2="302" y2="184" stroke="#57534e" strokeWidth="1.4" />
      <text x="312" y="105" textAnchor="middle" fontSize="13" fill="#44403c" fontWeight="600" transform="rotate(-90 312 105)">
        Height
      </text>
      <text x="155" y="50" textAnchor="middle" fontSize="12" fill="#9a3412" fontWeight="600">
        wall = L × H, minus openings
      </text>
      <text x="155" y="222" textAnchor="middle" fontSize="11" fill="#78716c">
        one wall = 2 × (L + W) × H total
      </text>
    </svg>
  );
}

/** Original diagram for the exterior mode: a simple wall run. */
function ExteriorPaintDiagram() {
  return (
    <svg
      viewBox="0 0 340 200"
      role="img"
      aria-label="Diagram of an exterior wall measured as a plain area"
      className="mx-auto h-auto w-full max-w-sm"
    >
      <rect x="40" y="30" width="260" height="120" fill="#fde8d8" stroke="#b45309" strokeWidth="1.8" />
      <rect x="100" y="70" width="50" height="40" fill="#fff" stroke="#78716c" strokeWidth="1.6" />
      <rect x="190" y="70" width="50" height="40" fill="#fff" stroke="#78716c" strokeWidth="1.6" />
      <line x1="125" y1="70" x2="125" y2="110" stroke="#d6d3d1" strokeWidth="1.2" />
      <line x1="215" y1="70" x2="215" y2="110" stroke="#d6d3d1" strokeWidth="1.2" />
      <line x1="40" y1="166" x2="300" y2="166" stroke="#57534e" strokeWidth="1.4" />
      <text x="170" y="162" textAnchor="middle" fontSize="13" fill="#44403c" fontWeight="600">
        measure each wall, add them up
      </text>
      <text x="170" y="60" textAnchor="middle" fontSize="12" fill="#9a3412" fontWeight="600">
        enter total paintable area directly
      </text>
      <text x="170" y="192" textAnchor="middle" fontSize="11" fill="#78716c">
        subtract big openings, or let the waste rounding cover them
      </text>
    </svg>
  );
}

export default function PaintCalculator() {
  const [mode, setMode] = useState("room");

  // Room mode
  const [len, setLen] = useState("12");
  const [wid, setWid] = useState("15");
  const [hgt, setHgt] = useState("8");
  const [doors, setDoors] = useState("1");
  const [windows, setWindows] = useState("2");

  // Exterior mode
  const [extArea, setExtArea] = useState("500");

  // Shared
  const [coats, setCoats] = useState(2);
  const [coverage, setCoverage] = useState(DEFAULT_COVERAGE);

  const calc = useMemo(() => {
    const steps = [];
    const cov = Number(coverage) || DEFAULT_COVERAGE;
    let paintable = 0;

    if (mode === "room") {
      const L = Number(len) || 0;
      const W = Number(wid) || 0;
      const H = Number(hgt) || 0;
      const d = Number(doors) || 0;
      const wn = Number(windows) || 0;
      const wallArea = 2 * (L + W) * H;
      const openings = d * DOOR_SQ_FT + wn * WINDOW_SQ_FT;
      paintable = Math.max(0, wallArea - openings);
      steps.push(
        `Wall area = 2 × (${L} + ${W}) × ${H} = ${round2(wallArea)} sq ft`
      );
      steps.push(
        `Openings (typical allowances) = ${d} × ${DOOR_SQ_FT} + ${wn} × ${WINDOW_SQ_FT} = ${round2(openings)} sq ft`
      );
      steps.push(
        `Paintable = ${round2(wallArea)} − ${round2(openings)} = ${round2(paintable)} sq ft`
      );
    } else {
      paintable = Math.max(0, Number(extArea) || 0);
      steps.push(
        `Paintable = ${round2(paintable)} sq ft (entered directly)`
      );
    }

    const totalSqFt = paintable * coats;
    const perCoatGal = paintable / cov;
    const gallons = Math.ceil(totalSqFt / cov);
    steps.push(
      `Total for ${coats} ${coats === 1 ? "coat" : "coats"} = ${round2(paintable)} × ${coats} = ${round2(totalSqFt)} sq ft`
    );
    steps.push(
      `Per coat ≈ ${round2(paintable)} ÷ ${cov} = ${round2(perCoatGal)} gal`
    );
    steps.push(
      `Gallons to buy = ⌈${round2(totalSqFt)} ÷ ${cov}⌉ = ${gallons} (always rounded up)`
    );

    return {
      paintable: round2(paintable),
      totalSqFt: round2(totalSqFt),
      perCoatGal: round2(perCoatGal),
      gallons,
      coats,
      cov,
      steps,
    };
  }, [mode, len, wid, hgt, doors, windows, extArea, coats, coverage]);

  return (
    <div className="card" id="calculator">
      {/* Mode tabs */}
      <div
        role="tablist"
        aria-label="Painting project type"
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
          {mode === "room" && (
            <>
              <NumField label="Room length" value={len} onChange={setLen} hint="feet" />
              <NumField label="Room width" value={wid} onChange={setWid} hint="feet" />
              <NumField label="Ceiling height" value={hgt} onChange={setHgt} hint="feet — 8 ft is standard" />
              <div className="grid grid-cols-2 gap-4">
                <NumField label="Doors" value={doors} onChange={setDoors} hint="≈ 21 sq ft each (typical)" />
                <NumField label="Windows" value={windows} onChange={setWindows} hint="≈ 15 sq ft each (typical)" />
              </div>
            </>
          )}
          {mode === "exterior" && (
            <NumField
              label="Total paintable wall area"
              value={extArea}
              onChange={setExtArea}
              hint="square feet — measure each wall and add them up"
            />
          )}

          <div className="border-t border-stone-200 pt-5">
            <p className="mb-2 text-sm font-medium text-slate-700">Coats</p>
            <div className="flex gap-2">
              {[1, 2].map((c) => (
                <button
                  key={c}
                  onClick={() => setCoats(c)}
                  className={`flex-1 rounded-lg border px-3 py-2 text-sm font-semibold transition ${
                    coats === c
                      ? "border-orange-600 bg-orange-600 text-white"
                      : "border-stone-300 bg-white text-slate-600 hover:border-orange-400"
                  }`}
                >
                  {c} {c === 1 ? "coat" : "coats"}
                </button>
              ))}
            </div>
            <p className="mt-1 text-xs text-slate-400">
              Two coats is the usual standard for coverage and durability.
            </p>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Paint coverage
            </label>
            <select
              value={coverage}
              onChange={(e) => setCoverage(Number(e.target.value))}
            >
              {COVERAGE_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
            <p className="mt-1 text-xs text-slate-400">
              Most cans print 350–400 sq ft per gallon; 350 is the safer default.
            </p>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-5 lg:sticky lg:top-24 self-start">
          <CostEstimator
            lines={[
              { id: "paint", label: "Paint", quantity: calc.gallons, unit: "gal", pricePlaceholder: "45.00" },
            ]}
          />
          <div className="rounded-xl bg-slate-900 p-5 text-white">
            <p className="text-sm uppercase tracking-wide text-slate-400">
              You need
            </p>
            <p className="mt-1 text-5xl font-bold text-orange-400">
              {calc.gallons}
              <span className="ml-2 text-xl font-medium text-slate-300">
                {calc.gallons === 1 ? "gallon" : "gallons"}
              </span>
            </p>
            <p className="mt-2 text-sm text-slate-400">
              {calc.totalSqFt} sq ft total ({calc.paintable} sq ft ×{" "}
              {calc.coats} {calc.coats === 1 ? "coat" : "coats"}) at{" "}
              {calc.cov} sq ft/gal — always rounded up
            </p>
          </div>

          <div className="overflow-hidden rounded-xl border border-stone-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-stone-100 text-left">
                  <th className="px-4 py-2 font-semibold text-slate-700">Coat</th>
                  <th className="px-4 py-2 font-semibold text-slate-700">Area</th>
                  <th className="px-4 py-2 font-semibold text-slate-700">Paint (unrounded)</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: calc.coats }, (_, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-stone-50"}>
                    <td className="px-4 py-2">Coat {i + 1}</td>
                    <td className="px-4 py-2">{calc.paintable} sq ft</td>
                    <td className="px-4 py-2">{calc.perCoatGal} gal</td>
                  </tr>
                ))}
                <tr className="bg-orange-50 font-semibold">
                  <td className="px-4 py-2">Total to buy</td>
                  <td className="px-4 py-2">{calc.totalSqFt} sq ft</td>
                  <td className="px-4 py-2">
                    {calc.gallons} gal (rounded up)
                  </td>
                </tr>
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

          {mode === "room" ? <RoomPaintDiagram /> : <ExteriorPaintDiagram />}

          <p className="disclaimer-strip">
            Estimates for planning. Coverage varies with surface texture,
            color change, and application — a dark-to-light change can take
            more paint. Always check the coverage printed on your specific
            can.
          </p>
        </div>
      </div>
    </div>
  );
}
