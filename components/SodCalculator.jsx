"use client";

import { useMemo, useState } from "react";

// --- Math constants ---
// Sod pallet coverage varies by supplier, roll size, and grass type:
// 450–500 sq ft is the typical US range. The calculator defaults to 450
// (the conservative end) and lets you switch to 500.
// Sod rolls are typically ~2 ft × 5 ft = 10 sq ft — labeled as typical.
const PALLET_SQFT = { 450: 450, 500: 500 };
const TYPICAL_ROLL_SQFT = 10;

const round2 = (n) => Math.round(n * 100) / 100;

function FeetField({ label, val, onFt, onIn, hint }) {
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
            step="any"
            value={val.ft}
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
            step="any"
            value={val.in}
            onChange={(e) => onIn(e.target.value)}
            aria-label={`${label} (inches)`}
            className="text-center"
          />
          <p className="mt-1 text-center text-xs text-slate-400">in</p>
        </div>
      </div>
      {hint ? <p className="mt-1 text-xs text-slate-400">{hint}</p> : null}
    </div>
  );
}

/** Original hand-drawn diagram: sod laid with staggered seams. */
function SodLayDiagram() {
  const pxPerIn = 1.7;
  const lawnWIn = 160; // illustrative 13.3 ft lawn
  const lawnHIn = 120;
  const rollWIn = 60; // 5 ft roll
  const rollHIn = 24; // 2 ft roll
  const W = lawnWIn * pxPerIn;
  const H = lawnHIn * pxPerIn;
  const rows = Math.ceil(lawnHIn / rollHIn);
  const cols = Math.ceil(lawnWIn / rollWIn) + 1;
  const rolls = [];
  for (let r = 0; r < rows; r++) {
    const offset = r % 2 === 0 ? 0 : -rollWIn / 2;
    for (let c = 0; c < cols; c++) {
      const x = (offset + c * rollWIn) * pxPerIn;
      const y = r * rollHIn * pxPerIn;
      if (x + rollWIn * pxPerIn > 0 && x < W) {
        rolls.push(
          <rect
            key={`${r}-${c}`}
            x={x}
            y={y}
            width={rollWIn * pxPerIn}
            height={rollHIn * pxPerIn}
            fill={r % 2 === 0 ? "#dcfce7" : "#bbf7d0"}
            stroke="#15803d"
            strokeWidth="0.8"
          />
        );
      }
    }
  }
  return (
    <svg
      viewBox={`0 0 ${W + 60} ${H}`}
      role="img"
      aria-label="Top-down diagram of sod rolls laid with staggered seams like brickwork"
      className="mx-auto h-auto w-full max-w-xs"
    >
      <rect x="0" y="0" width={W} height={H} fill="#f0fdf4" stroke="#166534" strokeWidth="2" />
      <g>{rolls}</g>
      <rect x="0" y="0" width={W} height={H} fill="none" stroke="#166534" strokeWidth="2" />
      <text x={W + 8} y={H / 2 - 8} fontSize="12" fill="#166534" fontWeight="600">
        Stagger
      </text>
      <text x={W + 8} y={H / 2 + 8} fontSize="12" fill="#166534" fontWeight="600">
        seams
      </text>
      <text x={W + 8} y={H / 2 + 24} fontSize="11" fill="#4d7c0f">
        like brickwork
      </text>
    </svg>
  );
}

export default function SodCalculator() {
  const [shape, setShape] = useState("rectangle");
  const [rectL, setRectL] = useState({ ft: "20", in: "0" });
  const [rectW, setRectW] = useState({ ft: "30", in: "0" });
  const [dia, setDia] = useState({ ft: "20", in: "0" });
  const [pallet, setPallet] = useState("450");
  const [waste, setWaste] = useState(5);

  const calc = useMemo(() => {
    const feet = (o) => (Number(o.ft) || 0) + (Number(o.in) || 0) / 12;
    const steps = [];

    let areaSqFt = 0;
    let areaLabel = "";
    if (shape === "rectangle") {
      const l = feet(rectL);
      const w = feet(rectW);
      areaSqFt = l * w;
      areaLabel = `${round2(l)} ft × ${round2(w)} ft`;
    } else {
      const d = feet(dia);
      areaSqFt = Math.PI * Math.pow(d / 2, 2);
      areaLabel = `π × ${round2(d / 2)} ft²`;
    }
    steps.push(`Lawn area = ${areaLabel} = ${round2(areaSqFt)} sq ft`);

    const effective = areaSqFt * (1 + waste / 100);
    steps.push(
      `With ${waste}% cutting waste = ${round2(areaSqFt)} × ${round2(1 + waste / 100)} = ${round2(effective)} sq ft to cover`
    );

    const palletSqFt = PALLET_SQFT[pallet];
    const pallets = Math.ceil(effective / palletSqFt);
    steps.push(
      `Pallets = ${round2(effective)} sq ft ÷ ${palletSqFt} sq ft per pallet = ${round2(effective / palletSqFt)} → round up = ${pallets} pallets`
    );

    const rolls = Math.ceil(effective / TYPICAL_ROLL_SQFT);
    steps.push(
      `≈ ${rolls} rolls of the typical ${TYPICAL_ROLL_SQFT} sq ft (2×5 ft) roll — typical roll size, varies by supplier`
    );

    return { steps, areaSqFt, effective, pallets, rolls };
  }, [shape, rectL, rectW, dia, pallet, waste]);

  return (
    <div className="card" id="calculator">
      {/* Shape tabs */}
      <div
        role="tablist"
        aria-label="Lawn shape"
        className="mb-6 flex flex-wrap gap-2"
      >
        {[
          { id: "rectangle", label: "Rectangle lawn" },
          { id: "circle", label: "Circle lawn" },
        ].map((s) => (
          <button
            key={s.id}
            role="tab"
            aria-selected={shape === s.id}
            onClick={() => setShape(s.id)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              shape === s.id
                ? "bg-orange-600 text-white"
                : "border border-stone-300 bg-white text-slate-600 hover:border-orange-400 hover:text-orange-700"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Inputs */}
        <div className="space-y-5">
          {shape === "rectangle" ? (
            <>
              <FeetField label="Lawn length" val={rectL}
                onFt={(v) => setRectL({ ...rectL, ft: v })}
                onIn={(v) => setRectL({ ...rectL, in: v })} />
              <FeetField label="Lawn width" val={rectW}
                onFt={(v) => setRectW({ ...rectW, ft: v })}
                onIn={(v) => setRectW({ ...rectW, in: v })} />
            </>
          ) : (
            <FeetField label="Lawn diameter" val={dia}
              onFt={(v) => setDia({ ...dia, ft: v })}
              onIn={(v) => setDia({ ...dia, in: v })}
              hint="Measure straight across the widest point" />
          )}

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Sod coverage per pallet
            </label>
            <div className="flex gap-2">
              {Object.keys(PALLET_SQFT).map((p) => (
                <button
                  key={p}
                  onClick={() => setPallet(p)}
                  className={`flex-1 rounded-lg border px-3 py-2 text-sm font-semibold transition ${
                    pallet === p
                      ? "border-orange-600 bg-orange-600 text-white"
                      : "border-stone-300 bg-white text-slate-600 hover:border-orange-400"
                  }`}
                >
                  {p} sq ft
                </button>
              ))}
            </div>
            <p className="mt-1 text-xs text-slate-400">
              US pallets typically cover 450–500 sq ft. We default to 450 so you
              don&apos;t come up short — confirm with your sod farm.
            </p>
          </div>

          <div>
            <label className="mb-1 flex items-center justify-between text-sm font-medium text-slate-700">
              <span>Cutting waste allowance</span>
              <span className="rounded bg-orange-100 px-2 py-0.5 text-sm font-semibold text-orange-800">
                {waste}%
              </span>
            </label>
            <input
              type="range"
              min="0"
              max="20"
              step="1"
              value={waste}
              onChange={(e) => setWaste(Number(e.target.value))}
              aria-label="Waste percentage"
            />
            <p className="mt-1 text-xs text-slate-400">
              5% suits simple rectangles; use 10%+ for curved or irregular lawns
              (typical guidance).
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
              {calc.pallets}
              <span className="ml-2 text-xl font-medium text-slate-300">
                pallets
              </span>
            </p>
            <p className="mt-2 text-sm text-slate-400">
              {pallet} sq ft per pallet · includes {waste}% waste ·{" "}
              {round2(calc.effective)} sq ft total to cover
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center">
            {[
              { v: round2(calc.areaSqFt), u: "sq ft", l: "lawn area" },
              { v: round2(calc.effective), u: "sq ft", l: "area with waste" },
              { v: `≈ ${calc.rolls}`, u: "rolls", l: "10 sq ft rolls (typ.)" },
            ].map((x) => (
              <div key={x.l} className="rounded-xl border border-stone-200 bg-stone-50 p-3">
                <p className="text-2xl font-bold text-slate-900">{x.v}</p>
                <p className="text-xs text-slate-500">{x.u} · {x.l}</p>
              </div>
            ))}
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

          <SodLayDiagram />

          <p className="disclaimer-strip">
            Estimates for planning. Coverage per pallet varies by supplier,
            roll size, and grass type (450–500 sq ft is typical) — confirm with
            your sod farm before ordering.
          </p>
        </div>
      </div>
    </div>
  );
}
