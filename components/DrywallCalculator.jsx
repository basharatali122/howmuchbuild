"use client";

import { useMemo, useState } from "react";
import CostEstimator from "@/components/CostEstimator";

/* Drywall math constants:
   VERIFIABLE:
   - Standard sheet = 4 ft × 8 ft = 32 sq ft (exact geometry)
   - Wall area for a room = 2 × (L + W) × H (exact geometry)
   - Door allowance ≈ 21 sq ft, window ≈ 15 sq ft (labeled typical)
   - Sheets always rounded up (Math.ceil); default 10% waste allowance
   RULE-OF-THUMB ESTIMATES (explicitly labeled as estimates):
   - Screws ≈ 32 per 4×8 sheet (field fasteners ~12" apart, edges ~8")
   - Joint compound ≈ 1 gallon per 100 sq ft of drywall
   - Joint tape ≈ 1 roll (250 ft) per 250 sq ft of drywall
   Pros adjust mud/tape/screws on site — the calculator says so. */
const SHEET_W_FT = 4;
const SHEET_L_FT = 8;
const SHEET_SQ_FT = SHEET_W_FT * SHEET_L_FT;
const DOOR_SQ_FT = 21; // typical 3' × 7' door
const WINDOW_SQ_FT = 15; // typical window
const SCREWS_PER_SHEET = 32; // rule-of-thumb estimate
const COMPOUND_GAL_PER_100_SQFT = 1; // rough estimate
const TAPE_ROLL_FT = 250; // rough estimate: 1 roll per 250 sq ft

const MODES = [
  { id: "room", label: "Room" },
  { id: "area", label: "Enter area directly" },
];

const round2 = (n) => Math.round((Number(n) || 0) * 100) / 100;

function NumField({ label, value, onChange, hint }) {
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
      <p className="mt-1 text-center text-xs text-slate-400">{hint || ""}</p>
    </div>
  );
}

/** Original diagram: a 16×8 ft wall covered by 4×8 sheets hung horizontally. */
function SheetsDiagram() {
  return (
    <svg
      viewBox="0 0 360 220"
      role="img"
      aria-label="Diagram of drywall sheets hung on a wall"
      className="mx-auto h-auto w-full max-w-sm"
    >
      <rect x="20" y="14" width="320" height="160" fill="#f1f0ec" stroke="#57534e" strokeWidth="2" />
      <line x1="20" y1="94" x2="340" y2="94" stroke="#b45309" strokeWidth="1.6" strokeDasharray="7 4" />
      <line x1="180" y1="14" x2="180" y2="94" stroke="#b45309" strokeWidth="1.6" strokeDasharray="7 4" />
      <line x1="100" y1="94" x2="100" y2="174" stroke="#b45309" strokeWidth="1.6" strokeDasharray="7 4" />
      <line x1="260" y1="94" x2="260" y2="174" stroke="#b45309" strokeWidth="1.6" strokeDasharray="7 4" />
      <text x="100" y="60" textAnchor="middle" fontSize="12" fill="#9a3412" fontWeight="600">
        4′ × 8′ sheet
      </text>
      <text x="260" y="60" textAnchor="middle" fontSize="12" fill="#9a3412" fontWeight="600">
        4′ × 8′ sheet
      </text>
      <text x="180" y="140" textAnchor="middle" fontSize="12" fill="#9a3412" fontWeight="600">
        staggered seams
      </text>
      <line x1="20" y1="192" x2="340" y2="192" stroke="#57534e" strokeWidth="1.4" />
      <text x="180" y="188" textAnchor="middle" fontSize="12" fill="#44403c" fontWeight="600">
        16 ft wall = 4 sheets (2 rows × 2)
      </text>
      <text x="180" y="212" textAnchor="middle" fontSize="11" fill="#78716c">
        each 4×8 sheet covers exactly 32 sq ft
      </text>
    </svg>
  );
}

export default function DrywallCalculator() {
  const [mode, setMode] = useState("room");

  // Room mode
  const [len, setLen] = useState("12");
  const [wid, setWid] = useState("15");
  const [hgt, setHgt] = useState("8");
  const [doors, setDoors] = useState("1");
  const [windows, setWindows] = useState("2");
  const [includeCeiling, setIncludeCeiling] = useState(true);

  // Direct area mode
  const [areaSqFt, setAreaSqFt] = useState("500");

  // Shared
  const [waste, setWaste] = useState(10);

  const calc = useMemo(() => {
    const steps = [];
    let area = 0;

    if (mode === "room") {
      const L = Number(len) || 0;
      const W = Number(wid) || 0;
      const H = Number(hgt) || 0;
      const d = Number(doors) || 0;
      const wn = Number(windows) || 0;
      const walls = 2 * (L + W) * H;
      const openings = d * DOOR_SQ_FT + wn * WINDOW_SQ_FT;
      const netWalls = Math.max(0, walls - openings);
      const ceiling = includeCeiling ? L * W : 0;
      area = netWalls + ceiling;
      steps.push(
        `Walls = 2 × (${L} + ${W}) × ${H} = ${round2(walls)} sq ft`
      );
      steps.push(
        `Openings (typical allowances) = ${d} × ${DOOR_SQ_FT} + ${wn} × ${WINDOW_SQ_FT} = ${round2(openings)} sq ft`
      );
      if (includeCeiling) {
        steps.push(
          `Ceiling = ${L} × ${W} = ${round2(ceiling)} sq ft`
        );
      }
      steps.push(
        `Drywall area = ${round2(netWalls)}${includeCeiling ? ` + ${round2(ceiling)}` : ""} = ${round2(area)} sq ft`
      );
    } else {
      area = Math.max(0, Number(areaSqFt) || 0);
      steps.push(
        `Drywall area = ${round2(area)} sq ft (entered directly)`
      );
    }

    const exactSheets = area / SHEET_SQ_FT;
    const wasteArea = area * (1 + waste / 100);
    const sheets = Math.ceil(wasteArea / SHEET_SQ_FT);
    steps.push(
      `Exact sheets = ${round2(area)} ÷ ${SHEET_SQ_FT} = ${round2(exactSheets)} → round up = ${Math.ceil(exactSheets)}`
    );
    steps.push(
      `With ${waste}% waste: ${round2(wasteArea)} ÷ ${SHEET_SQ_FT} = ${round2(wasteArea / SHEET_SQ_FT)} → round up = ${sheets} sheets`
    );

    // Estimates — explicitly labeled as such
    const screws = sheets * SCREWS_PER_SHEET;
    const compoundGal = Math.ceil(area / 100);
    const tapeRolls = Math.ceil(area / TAPE_ROLL_FT);
    steps.push(
      `Screws (rule-of-thumb estimate) = ${sheets} sheets × ~${SCREWS_PER_SHEET} = ≈ ${screws}`
    );
    steps.push(
      `Joint compound (rough estimate) = ⌈${round2(area)} ÷ 100⌉ = ${compoundGal} gal`
    );
    steps.push(
      `Joint tape (rough estimate) = ⌈${round2(area)} ÷ ${TAPE_ROLL_FT}⌉ = ${tapeRolls} × 250-ft rolls`
    );

    return {
      area: round2(area),
      sheets,
      exactSheetsRounded: Math.ceil(exactSheets),
      screws,
      compoundGal,
      tapeRolls,
      waste,
      steps,
    };
  }, [mode, len, wid, hgt, doors, windows, includeCeiling, areaSqFt, waste]);

  return (
    <div className="card" id="calculator">
      {/* Mode tabs */}
      <div
        role="tablist"
        aria-label="Input style"
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
              <div>
                <button
                  onClick={() => setIncludeCeiling((v) => !v)}
                  aria-pressed={includeCeiling}
                  className={`w-full rounded-lg border px-3 py-2 text-sm font-medium transition ${
                    includeCeiling
                      ? "border-orange-600 bg-orange-50 text-orange-800"
                      : "border-stone-300 bg-white text-slate-600"
                  }`}
                >
                  {includeCeiling ? "✓ Including ceiling" : "Include ceiling"}
                </button>
                <p className="mt-1 text-xs text-slate-400">
                  Uncheck if the ceiling is already finished.
                </p>
              </div>
            </>
          )}
          {mode === "area" && (
            <NumField
              label="Total drywall area"
              value={areaSqFt}
              onChange={setAreaSqFt}
              hint="square feet — walls plus ceiling, minus big openings"
            />
          )}

          <div className="border-t border-stone-200 pt-5">
            <p className="mb-2 text-sm font-medium text-slate-700">
              Sheet size <span className="font-normal text-slate-400">(fixed)</span>
            </p>
            <div className="rounded-lg border border-stone-300 bg-stone-50 px-3 py-2 text-sm font-semibold text-slate-700">
              4 ft × 8 ft = 32 sq ft
            </div>
            <p className="mt-1 text-xs text-slate-400">
              The standard US sheet. 4×12 sheets exist but need a crew to hang.
            </p>
          </div>

          <div>
            <label className="mb-1 flex items-center justify-between text-sm font-medium text-slate-700">
              <span>Waste &amp; cutting allowance</span>
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
              10% is a safe default — offcuts around windows and doors add up fast.
            </p>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-5 lg:sticky lg:top-24 self-start">
          <CostEstimator
            lines={[
              { id: "sheets", label: "Drywall sheets (4×8 ft)", quantity: calc.sheets, unit: "sheets", pricePlaceholder: "15.00" },
              { id: "compound", label: "Joint compound", quantity: calc.compoundGal, unit: "gal", pricePlaceholder: "20.00" },
              { id: "tape", label: "Joint tape", quantity: calc.tapeRolls, unit: "rolls", pricePlaceholder: "8.00" },
            ]}
          />
          <div className="rounded-xl bg-slate-900 p-5 text-white">
            <p className="text-sm uppercase tracking-wide text-slate-400">
              You need
            </p>
            <p className="mt-1 text-5xl font-bold text-orange-400">
              {calc.sheets}
              <span className="ml-2 text-xl font-medium text-slate-300">
                sheets
              </span>
            </p>
            <p className="mt-2 text-sm text-slate-400">
              4×8 ft sheets · {calc.area} sq ft total · includes {calc.waste}%
              waste (exact area needs {calc.exactSheetsRounded} sheets)
            </p>
          </div>

          <div className="overflow-hidden rounded-xl border border-stone-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-stone-100 text-left">
                  <th className="px-4 py-2 font-semibold text-slate-700">Material</th>
                  <th className="px-4 py-2 font-semibold text-slate-700">Amount</th>
                  <th className="px-4 py-2 font-semibold text-slate-700">Basis</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-orange-50 font-semibold">
                  <td className="px-4 py-2">4×8 sheets</td>
                  <td className="px-4 py-2">{calc.sheets}</td>
                  <td className="px-4 py-2">⌈area × 1.{String(calc.waste).padStart(2, "0")} ÷ 32⌉</td>
                </tr>
                <tr className="bg-white">
                  <td className="px-4 py-2">Drywall screws</td>
                  <td className="px-4 py-2">≈ {calc.screws}</td>
                  <td className="px-4 py-2">~32 per sheet (estimate)</td>
                </tr>
                <tr className="bg-white">
                  <td className="px-4 py-2">Joint compound</td>
                  <td className="px-4 py-2">≈ {calc.compoundGal} gal</td>
                  <td className="px-4 py-2">~1 gal per 100 sq ft (rough)</td>
                </tr>
                <tr className="bg-white">
                  <td className="px-4 py-2">Joint tape</td>
                  <td className="px-4 py-2">≈ {calc.tapeRolls} rolls</td>
                  <td className="px-4 py-2">250-ft rolls (rough)</td>
                </tr>
              </tbody>
            </table>
            <p className="border-t border-stone-200 bg-stone-50 px-4 py-2 text-xs text-slate-500">
              Screws, mud, and tape are field estimates — pros adjust on site.
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

          <SheetsDiagram />

          <p className="disclaimer-strip">
            Sheet counts are exact math rounded up; screws, joint compound,
            and tape are estimates based on common field rules of thumb. Finish
            level, framing spacing, and cutting waste change real usage — pros
            adjust on site.
          </p>
        </div>
      </div>
    </div>
  );
}
