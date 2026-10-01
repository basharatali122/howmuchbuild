"use client";

import { useMemo, useState } from "react";

// --- Math constants ---
// 27 cubic feet = 1 cubic yard — exact arithmetic.
// Bag equivalents are exact arithmetic from those 27 cu ft.
// The settle allowance is guidance: bulk topsoil typically settles ~20–30%.
const CU_FT_PER_CU_YD = 27;
const BAG_SIZES = { 1: "1 cu ft bags", 1.5: "1.5 cu ft bags" };

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

/** Original hand-drawn cross-section: raised bed filled with topsoil. */
function RaisedBedDiagram() {
  return (
    <svg
      viewBox="0 0 320 240"
      role="img"
      aria-label="Cross-section diagram of a raised garden bed showing its length, width and soil depth"
      className="mx-auto h-auto w-full max-w-sm"
    >
      {/* soil fill */}
      <rect x="50" y="90" width="220" height="90" fill="#8a6f4d" stroke="#57534e" strokeWidth="1.5" />
      <g fill="#6f5739">
        <circle cx="90" cy="120" r="3" />
        <circle cx="140" cy="140" r="3.4" />
        <circle cx="190" cy="118" r="3" />
        <circle cx="230" cy="145" r="3.4" />
        <circle cx="120" cy="160" r="3" />
        <circle cx="170" cy="162" r="3" />
        <circle cx="245" cy="110" r="2.6" />
      </g>
      {/* bed walls */}
      <rect x="38" y="78" width="12" height="108" fill="#b08c5a" stroke="#57534e" strokeWidth="1.5" />
      <rect x="270" y="78" width="12" height="108" fill="#b08c5a" stroke="#57534e" strokeWidth="1.5" />
      <rect x="38" y="78" width="244" height="12" fill="#c7a26c" stroke="#57534e" strokeWidth="1.5" />
      {/* ground line */}
      <line x1="20" y1="186" x2="300" y2="186" stroke="#78716c" strokeWidth="2" />
      {/* depth dimension */}
      <line x1="292" y1="90" x2="292" y2="180" stroke="#57534e" strokeWidth="1.4" />
      <line x1="286" y1="90" x2="298" y2="90" stroke="#57534e" strokeWidth="1.4" />
      <line x1="286" y1="180" x2="298" y2="180" stroke="#57534e" strokeWidth="1.4" />
      <text x="300" y="140" fontSize="13" fill="#44403c" fontWeight="600">Depth</text>
      {/* length dimension */}
      <line x1="50" y1="206" x2="270" y2="206" stroke="#57534e" strokeWidth="1.4" />
      <line x1="50" y1="200" x2="50" y2="212" stroke="#57534e" strokeWidth="1.4" />
      <line x1="270" y1="200" x2="270" y2="212" stroke="#57534e" strokeWidth="1.4" />
      <text x="160" y="224" textAnchor="middle" fontSize="13" fill="#44403c" fontWeight="600">
        Length × Width
      </text>
      <text x="160" y="140" textAnchor="middle" fontSize="13" fill="#fef3c7" fontWeight="600">
        V = L × W × D ÷ 27 = cu yd
      </text>
    </svg>
  );
}

export default function TopsoilCalculator() {
  const [mode, setMode] = useState("lawn");

  // Lawn mode
  const [lawnL, setLawnL] = useState({ ft: "20", in: "0" });
  const [lawnW, setLawnW] = useState({ ft: "30", in: "0" });
  const [lawnDepth, setLawnDepth] = useState("3");

  // Raised bed mode
  const [bedL, setBedL] = useState({ ft: "4", in: "0" });
  const [bedW, setBedW] = useState({ ft: "8", in: "0" });
  const [bedH, setBedH] = useState("12");

  const [allowance, setAllowance] = useState(10);

  const calc = useMemo(() => {
    const feet = (o) => (Number(o.ft) || 0) + (Number(o.in) || 0) / 12;
    const steps = [];

    let lengthFt = 0;
    let widthFt = 0;
    let depthIn = 0;
    let dimLabel = "";
    if (mode === "lawn") {
      lengthFt = feet(lawnL);
      widthFt = feet(lawnW);
      depthIn = Number(lawnDepth) || 0;
      dimLabel = "topsoil depth";
    } else {
      lengthFt = feet(bedL);
      widthFt = feet(bedW);
      depthIn = Number(bedH) || 0;
      dimLabel = "bed depth";
    }

    const cuFt = lengthFt * widthFt * (depthIn / 12);
    steps.push(
      `Volume = ${round2(lengthFt)} ft × ${round2(widthFt)} ft × (${depthIn}″ ${dimLabel} ÷ 12) = ${round2(cuFt)} cu ft`
    );
    const cuYd = cuFt / CU_FT_PER_CU_YD;
    steps.push(
      `= ${round2(cuFt)} cu ft ÷ ${CU_FT_PER_CU_YD} = ${round2(cuYd)} cu yd`
    );

    const withAllowCuFt = cuFt * (1 + allowance / 100);
    const withAllowCuYd = withAllowCuFt / CU_FT_PER_CU_YD;
    steps.push(
      `With ${allowance}% order-over allowance (for settling) = ${round2(withAllowCuFt)} cu ft = ${round2(withAllowCuYd)} cu yd`
    );

    const bags1 = Math.ceil(withAllowCuFt);
    const bags15 = Math.ceil(withAllowCuFt / 1.5);
    steps.push(
      `1 cu ft bags = ${round2(withAllowCuFt)} ÷ 1 = ${round2(withAllowCuFt)} → round up = ${bags1} bags`
    );
    steps.push(
      `1.5 cu ft bags = ${round2(withAllowCuFt)} ÷ 1.5 = ${round2(withAllowCuFt / 1.5)} → round up = ${bags15} bags`
    );

    return { steps, cuFt, cuYd, withAllowCuFt, withAllowCuYd, bags1, bags15 };
  }, [mode, lawnL, lawnW, lawnDepth, bedL, bedW, bedH, allowance]);

  return (
    <div className="card" id="calculator">
      {/* Mode tabs */}
      <div
        role="tablist"
        aria-label="Project type"
        className="mb-6 flex flex-wrap gap-2"
      >
        {[
          { id: "lawn", label: "Lawn / garden area" },
          { id: "bed", label: "Raised bed" },
        ].map((m) => (
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
          {mode === "lawn" ? (
            <>
              <FeetField label="Area length" val={lawnL}
                onFt={(v) => setLawnL({ ...lawnL, ft: v })}
                onIn={(v) => setLawnL({ ...lawnL, in: v })} />
              <FeetField label="Area width" val={lawnW}
                onFt={(v) => setLawnW({ ...lawnW, ft: v })}
                onIn={(v) => setLawnW({ ...lawnW, in: v })} />
              <InchesField label="Topsoil depth" value={lawnDepth} onChange={setLawnDepth}
                hint="inches — 3–4″ is a common rule of thumb for topdressing" />
            </>
          ) : (
            <>
              <FeetField label="Bed length" val={bedL}
                onFt={(v) => setBedL({ ...bedL, ft: v })}
                onIn={(v) => setBedL({ ...bedL, in: v })} />
              <FeetField label="Bed width" val={bedW}
                onFt={(v) => setBedW({ ...bedW, ft: v })}
                onIn={(v) => setBedW({ ...bedW, in: v })} />
              <InchesField label="Bed depth (soil fill)" value={bedH} onChange={setBedH}
                hint="inches — 12″ suits most vegetables" />
            </>
          )}

          <div>
            <label className="mb-1 flex items-center justify-between text-sm font-medium text-slate-700">
              <span>Order-over allowance (for settling)</span>
              <span className="rounded bg-orange-100 px-2 py-0.5 text-sm font-semibold text-orange-800">
                {allowance}%
              </span>
            </label>
            <input
              type="range"
              min="0"
              max="30"
              step="1"
              value={allowance}
              onChange={(e) => setAllowance(Number(e.target.value))}
              aria-label="Order-over allowance percentage"
            />
            <p className="mt-1 text-xs text-slate-400">
              Bulk topsoil typically settles ~20–30% as it compacts — ordering
              a little over is cheap insurance.
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
              {round2(calc.withAllowCuYd)}
              <span className="ml-2 text-xl font-medium text-slate-300">
                cubic yards
              </span>
            </p>
            <p className="mt-2 text-sm text-slate-400">
              Exact volume {round2(calc.cuYd)} cu yd ({round2(calc.cuFt)} cu ft) ·
              includes {allowance}% order-over allowance
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center">
            {[
              { v: round2(calc.cuFt), u: "cu ft", l: "exact volume" },
              { v: calc.bags1, u: "bags", l: "1 cu ft bags" },
              { v: calc.bags15, u: "bags", l: "1.5 cu ft bags" },
            ].map((x) => (
              <div key={x.l} className="rounded-xl border border-stone-200 bg-stone-50 p-3">
                <p className="text-2xl font-bold text-slate-900">{x.v}</p>
                <p className="text-xs text-slate-500">{x.u} · {x.l}</p>
              </div>
            ))}
          </div>

          <div className="overflow-hidden rounded-xl border border-stone-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-stone-100 text-left">
                  <th className="px-4 py-2 font-semibold text-slate-700">Bag size</th>
                  <th className="px-4 py-2 font-semibold text-slate-700">Bags needed</th>
                  <th className="px-4 py-2 font-semibold text-slate-700">Bags per yard</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  <td className="px-4 py-2">1 cu ft</td>
                  <td className="px-4 py-2 font-semibold">{calc.bags1}</td>
                  <td className="px-4 py-2">27</td>
                </tr>
                <tr className="bg-stone-50">
                  <td className="px-4 py-2">1.5 cu ft</td>
                  <td className="px-4 py-2 font-semibold">{calc.bags15}</td>
                  <td className="px-4 py-2">18</td>
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

          <RaisedBedDiagram />

          <p className="disclaimer-strip">
            Estimates for planning. Bag equivalents are exact arithmetic (27
            cu ft = 1 cu yd). Bulk topsoil typically settles ~20–30% — the
            order-over allowance covers that; confirm delivery sizing with
            your supplier.
          </p>
        </div>
      </div>
    </div>
  );
}
