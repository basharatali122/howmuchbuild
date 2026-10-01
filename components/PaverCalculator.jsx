"use client";

import { useMemo, useState } from "react";

const PATTERNS = [
  { id: "stack", label: "Stack bond", waste: 5, note: "grid layout, fewest cuts" },
  { id: "running", label: "Running bond", waste: 10, note: "brick-style offset" },
  { id: "herringbone", label: "Herringbone", waste: 15, note: "zigzag, most cuts" },
];

// --- Math constants ---
// Waste percentages above are labeled typical industry guidance.
// Gravel and sand conversions below are estimates — bulk density varies by
// supplier, stone type, and moisture.
const SQ_IN_PER_SQ_FT = 144;
const GRAVEL_SQFT_PER_TON_AT_2IN = 100; // rule of thumb: 1 ton ≈ 100 sq ft at 2" deep
const BEDDING_SAND_THICK_IN = 1; // standard bedding layer
const SAND_TONS_PER_CU_YD = 1.4; // estimate
const POLY_SQFT_PER_BAG = 80; // 1 fifty-lb bag of polymeric sand per 80 sq ft — estimate

const round2 = (n) => Math.round(n * 100) / 100;
const roundUp1 = (n) => Math.ceil(n * 10) / 10;

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

/** Original hand-drawn cross-section: patio build-up layers. */
function PaverLayersDiagram() {
  return (
    <svg
      viewBox="0 0 320 250"
      role="img"
      aria-label="Cross-section diagram of a paver patio showing pavers, one inch of bedding sand, and the gravel base over compacted soil"
      className="mx-auto h-auto w-full max-w-sm"
    >
      {/* pavers */}
      <g>
        <rect x="30" y="52" width="62" height="30" fill="#d6d3d1" stroke="#57534e" strokeWidth="1.5" />
        <rect x="96" y="52" width="62" height="30" fill="#e7e5e4" stroke="#57534e" strokeWidth="1.5" />
        <rect x="162" y="52" width="62" height="30" fill="#d6d3d1" stroke="#57534e" strokeWidth="1.5" />
        <rect x="228" y="52" width="62" height="30" fill="#e7e5e4" stroke="#57534e" strokeWidth="1.5" />
      </g>
      {/* bedding sand */}
      <rect x="30" y="84" width="260" height="14" fill="#fef3c7" stroke="#a8a29e" strokeWidth="1.2" />
      {/* gravel base */}
      <rect x="30" y="98" width="260" height="52" fill="#e2d5b8" stroke="#a8a29e" strokeWidth="1.2" />
      <g fill="#b9a888">
        <circle cx="60" cy="112" r="3" />
        <circle cx="95" cy="124" r="3.4" />
        <circle cx="130" cy="112" r="3" />
        <circle cx="165" cy="126" r="3.4" />
        <circle cx="200" cy="112" r="3" />
        <circle cx="235" cy="124" r="3.4" />
        <circle cx="270" cy="114" r="3" />
        <circle cx="75" cy="138" r="3.2" />
        <circle cx="150" cy="140" r="3.2" />
        <circle cx="220" cy="140" r="3.2" />
      </g>
      {/* compacted soil */}
      <rect x="30" y="150" width="260" height="40" fill="#cbb79e" stroke="#a8a29e" strokeWidth="1.2" />
      <g fill="#a68f6f">
        <circle cx="70" cy="165" r="2.4" />
        <circle cx="140" cy="172" r="2.4" />
        <circle cx="210" cy="165" r="2.4" />
        <circle cx="260" cy="174" r="2.4" />
      </g>

      {/* labels */}
      <text x="30" y="44" fontSize="13" fill="#44403c" fontWeight="600">Pavers</text>
      <text x="30" y="200" fontSize="13" fill="#44403c" fontWeight="600">Bedding sand — 1″</text>
      <text x="30" y="218" fontSize="13" fill="#44403c" fontWeight="600">
        Crushed-stone base — 4″ (patios) / 6″ (driveways)
      </text>
      <text x="30" y="236" fontSize="13" fill="#44403c" fontWeight="600">Compacted soil</text>
    </svg>
  );
}

/** Original hand-drawn top view: running-bond paver layout. */
function PaverPlanDiagram() {
  const pxPerIn = 1.7;
  const patioWIn = 120; // illustrative 10 ft
  const patioHIn = 120;
  const pwIn = 8;
  const phIn = 4;
  const W = patioWIn * pxPerIn;
  const H = patioHIn * pxPerIn;
  const rows = Math.floor(patioHIn / phIn);
  const cols = Math.ceil(patioWIn / pwIn) + 1;
  const cells = [];
  for (let r = 0; r < rows; r++) {
    const offset = r % 2 === 0 ? 0 : -pwIn / 2;
    for (let c = 0; c < cols; c++) {
      const x = (offset + c * pwIn) * pxPerIn;
      const y = r * phIn * pxPerIn;
      if (x + pwIn * pxPerIn > 0 && x < W) {
        cells.push(
          <rect
            key={`${r}-${c}`}
            x={x}
            y={y}
            width={pwIn * pxPerIn}
            height={phIn * pxPerIn}
            fill={r % 2 === 0 ? "#e7e5e4" : "#d6d3d1"}
            stroke="#a8a29e"
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
      aria-label="Top-down diagram of pavers laid in a running bond pattern with staggered joints"
      className="mx-auto h-auto w-full max-w-xs"
    >
      <rect x="0" y="0" width={W} height={H} fill="#fafaf9" stroke="#57534e" strokeWidth="2" />
      <g transform="translate(0,0)">{cells}</g>
      <rect x="0" y="0" width={W} height={H} fill="none" stroke="#57534e" strokeWidth="2" />
      <text x={W + 8} y={H / 2 - 6} fontSize="12" fill="#57534e" fontWeight="600">
        Running
      </text>
      <text x={W + 8} y={H / 2 + 10} fontSize="12" fill="#57534e" fontWeight="600">
        bond
      </text>
      <text x={W + 8} y={H / 2 + 26} fontSize="11" fill="#78716c">
        staggered joints
      </text>
    </svg>
  );
}

export default function PaverCalculator() {
  const [shape, setShape] = useState("rectangle");
  const [rectL, setRectL] = useState({ ft: "12", in: "0" });
  const [rectW, setRectW] = useState({ ft: "10", in: "0" });
  const [dia, setDia] = useState({ ft: "10", in: "0" });
  const [paverL, setPaverL] = useState("8");
  const [paverW, setPaverW] = useState("4");
  const [pattern, setPattern] = useState("running");
  const [waste, setWaste] = useState(10);
  const [depth, setDepth] = useState("4");

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
    steps.push(`Patio area = ${areaLabel} = ${round2(areaSqFt)} sq ft`);

    const pl = Number(paverL) || 0;
    const pw = Number(paverW) || 0;
    const paverSqFt = (pl * pw) / SQ_IN_PER_SQ_FT;
    steps.push(
      `One paver covers ${pl}″ × ${pw}″ ÷ ${SQ_IN_PER_SQ_FT} = ${round2(paverSqFt)} sq ft`
    );

    const rawPavers = paverSqFt > 0 ? areaSqFt / paverSqFt : 0;
    const pavers = Math.ceil(rawPavers * (1 + waste / 100));
    const patternLabel = PATTERNS.find((p) => p.id === pattern)?.label || "";
    steps.push(
      `Raw paver count = ${round2(areaSqFt)} ÷ ${round2(paverSqFt)} = ${round2(rawPavers)}`
    );
    steps.push(
      `With ${waste}% waste (${patternLabel}, typical) = ${round2(rawPavers)} × ${round2(1 + waste / 100)} = ${round2(rawPavers * (1 + waste / 100))} → round up = ${pavers} pavers`
    );

    const depthIn = Number(depth) || 4;
    const gravelTons = (areaSqFt / GRAVEL_SQFT_PER_TON_AT_2IN) * (depthIn / 2);
    steps.push(
      `Gravel base = ${round2(areaSqFt)} sq ft ÷ ${GRAVEL_SQFT_PER_TON_AT_2IN} × (${depthIn}″ ÷ 2″) = ${round2(gravelTons)} tons (estimate)`
    );

    const beddingCuFt = (areaSqFt * BEDDING_SAND_THICK_IN) / 12;
    const beddingCuYd = beddingCuFt / 27;
    const beddingTons = beddingCuYd * SAND_TONS_PER_CU_YD;
    steps.push(
      `Bedding sand = ${round2(areaSqFt)} × ${BEDDING_SAND_THICK_IN}″÷12 = ${round2(beddingCuFt)} cu ft = ${round2(beddingCuYd)} cu yd × ${SAND_TONS_PER_CU_YD} = ${round2(beddingTons)} tons (estimate)`
    );

    const polyBags = Math.ceil(areaSqFt / POLY_SQFT_PER_BAG);
    steps.push(
      `Polymeric sand = ${round2(areaSqFt)} sq ft ÷ ${POLY_SQFT_PER_BAG} = ${round2(areaSqFt / POLY_SQFT_PER_BAG)} → round up = ${polyBags} fifty-lb bags (estimate)`
    );

    return {
      steps,
      areaSqFt,
      pavers,
      gravelTons,
      beddingTons,
      polyBags,
    };
  }, [shape, rectL, rectW, dia, paverL, paverW, pattern, waste, depth]);

  return (
    <div className="card" id="calculator">
      {/* Shape tabs */}
      <div
        role="tablist"
        aria-label="Patio shape"
        className="mb-6 flex flex-wrap gap-2"
      >
        {[
          { id: "rectangle", label: "Rectangle patio" },
          { id: "circle", label: "Circle patio" },
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
              <FeetField label="Patio length" val={rectL}
                onFt={(v) => setRectL({ ...rectL, ft: v })}
                onIn={(v) => setRectL({ ...rectL, in: v })} />
              <FeetField label="Patio width" val={rectW}
                onFt={(v) => setRectW({ ...rectW, ft: v })}
                onIn={(v) => setRectW({ ...rectW, in: v })} />
            </>
          ) : (
            <FeetField label="Patio diameter" val={dia}
              onFt={(v) => setDia({ ...dia, ft: v })}
              onIn={(v) => setDia({ ...dia, in: v })}
              hint="Measure straight across the middle" />
          )}

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Paver size (inches)
            </label>
            <div className="flex gap-2">
              <div className="flex-1">
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={paverL}
                  onChange={(e) => setPaverL(e.target.value)}
                  aria-label="Paver length in inches"
                  className="text-center"
                />
                <p className="mt-1 text-center text-xs text-slate-400">length ″</p>
              </div>
              <div className="flex-1">
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={paverW}
                  onChange={(e) => setPaverW(e.target.value)}
                  aria-label="Paver width in inches"
                  className="text-center"
                />
                <p className="mt-1 text-center text-xs text-slate-400">width ″</p>
              </div>
            </div>
            <p className="mt-1 text-xs text-slate-400">
              Nominal size — e.g. a 4″×8″ paver is the most common patio paver.
            </p>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Laying pattern <span className="font-normal text-slate-400">(sets typical waste)</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {PATTERNS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => {
                    setPattern(p.id);
                    setWaste(p.waste);
                  }}
                  className={`rounded-lg border px-3 py-2 text-sm font-medium transition ${
                    pattern === p.id
                      ? "border-orange-600 bg-orange-50 text-orange-800"
                      : "border-stone-300 bg-white text-slate-600 hover:border-orange-400"
                  }`}
                >
                  {p.label}
                  <span className="block text-xs font-normal text-slate-400">
                    ~{p.waste}% waste
                  </span>
                </button>
              ))}
            </div>
            <p className="mt-1 text-xs text-slate-400">
              Waste figures are typical — more cuts and curves mean more waste.
            </p>
          </div>

          <div>
            <label className="mb-1 flex items-center justify-between text-sm font-medium text-slate-700">
              <span>Waste &amp; cuts allowance</span>
              <span className="rounded bg-orange-100 px-2 py-0.5 text-sm font-semibold text-orange-800">
                {waste}%
              </span>
            </label>
            <input
              type="range"
              min="0"
              max="30"
              step="1"
              value={waste}
              onChange={(e) => setWaste(Number(e.target.value))}
              aria-label="Waste percentage"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Gravel base depth
            </label>
            <div className="flex gap-2">
              {["4", "6"].map((d) => (
                <button
                  key={d}
                  onClick={() => setDepth(d)}
                  className={`flex-1 rounded-lg border px-3 py-2 text-sm font-semibold transition ${
                    depth === d
                      ? "border-orange-600 bg-orange-600 text-white"
                      : "border-stone-300 bg-white text-slate-600 hover:border-orange-400"
                  }`}
                >
                  {d}″
                </button>
              ))}
            </div>
            <p className="mt-1 text-xs text-slate-400">
              4″ is standard for patios and walkways; 6″ for driveways.
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
              {calc.pavers}
              <span className="ml-2 text-xl font-medium text-slate-300">
                pavers
              </span>
            </p>
            <p className="mt-2 text-sm text-slate-400">
              Includes {waste}% waste ({PATTERNS.find((p) => p.id === pattern)?.label}) ·
              patio area {round2(calc.areaSqFt)} sq ft
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center">
            {[
              { v: roundUp1(calc.gravelTons), u: "tons", l: "gravel base (est.)" },
              { v: roundUp1(calc.beddingTons), u: "tons", l: "bedding sand (est.)" },
              { v: calc.polyBags, u: "bags", l: "50-lb poly sand (est.)" },
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

          <PaverLayersDiagram />
          <PaverPlanDiagram />

          <p className="disclaimer-strip">
            Material estimates for planning. Gravel and sand tonnage is an
            estimate — bulk density varies by supplier, stone type, and
            moisture. Always round up and confirm loads with your supplier.
          </p>
        </div>
      </div>
    </div>
  );
}
