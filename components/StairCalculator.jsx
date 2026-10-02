"use client";

import { useMemo, useState } from "react";
import CostEstimator from "@/components/CostEstimator";

/**
 * StairCalculator — IRC-based stair math.
 * 7.75" = IRC maximum riser height; 10" = IRC minimum tread depth.
 * Presented as typical code guidance, not engineering — verify locally.
 */
const MAX_RISER_IN = 7.75;
const MIN_TREAD_IN = 10;
const MAX_STOCK_FT = 16; // longest common 2x12 stock

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

/** Original side-view stair diagram: 4 treads / 5 risers, labeled. */
function StairDiagram() {
  // Geometry of the drawn example (px): 4 treads × 70px, 5 risers × 34px.
  const treadPx = 70;
  const riserPx = 34;
  const x0 = 70; // left edge of first step
  const yBase = 270; // ground line
  const steps = 4;

  const stepRects = [];
  for (let i = 0; i < steps; i++) {
    stepRects.push(
      <rect
        key={i}
        x={x0 + i * treadPx}
        y={yBase - (i + 1) * riserPx}
        width={treadPx}
        height={riserPx}
        fill={i % 2 ? "#e7e5e4" : "#d6d3d1"}
        stroke="#a8a29e"
        strokeWidth="1"
      />
    );
  }

  // Stringer: the sawtooth profile under the steps, drawn as a thick
  // orange line offset just below the step profile.
  const pts = [];
  pts.push(`${x0},${yBase + 12}`);
  for (let i = 0; i < steps; i++) {
    pts.push(`${x0 + i * treadPx},${yBase - (i + 1) * riserPx + 12}`);
    pts.push(`${x0 + (i + 1) * treadPx},${yBase - (i + 1) * riserPx + 12}`);
  }
  pts.push(`${x0 + steps * treadPx},${yBase - (steps + 1) * riserPx + 12}`);

  const topY = yBase - (steps + 1) * riserPx; // top landing level
  const runEnd = x0 + steps * treadPx;

  return (
    <svg
      viewBox="0 0 460 330"
      role="img"
      aria-label="Side-view diagram of a stair showing total rise, total run, treads, risers, and the stringer"
      className="h-auto w-full"
    >
      <text x="230" y="22" textAnchor="middle" fontSize="14" fill="#44403c" fontWeight="700">
        Stair side view — example
      </text>

      {/* ground + top landing */}
      <line x1="30" y1={yBase} x2={runEnd + 70} y2={yBase} stroke="#78716c" strokeWidth="2" />
      <line x1={runEnd} y1={topY} x2={runEnd + 70} y2={topY} stroke="#78716c" strokeWidth="2" />
      <text x={runEnd + 74} y={topY + 5} fontSize="11" fill="#57534e">upper floor</text>
      <text x="34" y={yBase + 18} fontSize="11" fill="#57534e">ground</text>

      {stepRects}
      <polyline
        points={pts.join(" ")}
        fill="none"
        stroke="#c2410c"
        strokeWidth="11"
        strokeLinejoin="round"
        strokeLinecap="round"
        opacity="0.85"
      />

      {/* total rise arrow (left) */}
      <line x1="44" y1={topY} x2="44" y2={yBase} stroke="#44403c" strokeWidth="1.5" />
      <polygon points={`44,${topY} 40,${topY + 8} 48,${topY + 8}`} fill="#44403c" />
      <polygon points={`44,${yBase} 40,${yBase - 8} 48,${yBase - 8}`} fill="#44403c" />
      <text x="36" y={(topY + yBase) / 2} fontSize="12" fill="#44403c" fontWeight="600"
        textAnchor="middle" transform={`rotate(-90 36 ${(topY + yBase) / 2})`}>
        total rise
      </text>

      {/* total run arrow (bottom) */}
      <line x1={x0} y1="300" x2={runEnd} y2="300" stroke="#44403c" strokeWidth="1.5" />
      <polygon points={`${x0},300 ${x0 + 8},296 ${x0 + 8},304`} fill="#44403c" />
      <polygon points={`${runEnd},300 ${runEnd - 8},296 ${runEnd - 8},304`} fill="#44403c" />
      <text x={(x0 + runEnd) / 2} y="318" textAnchor="middle" fontSize="12" fill="#44403c" fontWeight="600">
        total run
      </text>

      {/* tread label → top of second tread */}
      <line x1="200" y1="42" x2={x0 + 1.5 * treadPx} y2={yBase - 2 * riserPx - 4}
        stroke="#57534e" strokeWidth="1" />
      <circle cx={x0 + 1.5 * treadPx} cy={yBase - 2 * riserPx - 4} r="3" fill="#57534e" />
      <text x="200" y="36" textAnchor="middle" fontSize="12" fill="#57534e" fontWeight="600">
        tread
      </text>

      {/* riser label → face of third riser */}
      <line x1="330" y1="150" x2={x0 + 2 * treadPx + 4} y2={yBase - 2.5 * riserPx}
        stroke="#57534e" strokeWidth="1" />
      <circle cx={x0 + 2 * treadPx + 4} cy={yBase - 2.5 * riserPx} r="3" fill="#57534e" />
      <text x="330" y="144" textAnchor="middle" fontSize="12" fill="#57534e" fontWeight="600">
        riser
      </text>

      {/* stringer label → the orange sawtooth */}
      <line x1="392" y1="238" x2={x0 + 3 * treadPx + 10} y2={yBase - 3 * riserPx + 12}
        stroke="#c2410c" strokeWidth="1" />
      <circle cx={x0 + 3 * treadPx + 10} cy={yBase - 3 * riserPx + 12} r="3" fill="#c2410c" />
      <text x="392" y="232" textAnchor="middle" fontSize="12" fill="#c2410c" fontWeight="600">
        stringer
      </text>
      <text x="392" y="247" textAnchor="middle" fontSize="11" fill="#c2410c">
        (2×12 typ.)
      </text>
    </svg>
  );
}

function fmtFtIn(inches) {
  if (!isFinite(inches) || inches < 0) return "—";
  const ft = Math.floor(inches / 12);
  const inch = inches - ft * 12;
  return `${ft} ft ${inch.toFixed(1)} in`;
}

export default function StairCalculator() {
  const [totalRise, setTotalRise] = useState("36");
  const [treadDepth, setTreadDepth] = useState("11");
  const [width, setWidth] = useState("36");

  const calc = useMemo(() => {
    const steps = [];
    const rise = Number(totalRise) || 0;
    const tread = Number(treadDepth) || 11;
    const w = Number(width) || 0;

    if (rise <= 0) {
      return {
        risers: 0, actualRiser: 0, treads: 0, totalRun: 0,
        stringerIn: 0, angleDeg: null, stringers: 0,
        stockTooShort: false, steps: ["Enter a total rise above 0 to calculate."],
      };
    }

    // Risers: enough so no single riser exceeds the 7.75" IRC maximum.
    const risers = Math.ceil(rise / MAX_RISER_IN);
    const actualRiser = rise / risers;
    const treads = Math.max(risers - 1, 0);
    const totalRun = treads * tread;
    const stringerIn = Math.sqrt(rise * rise + totalRun * totalRun);
    const angleDeg = totalRun > 0 ? (Math.atan(rise / totalRun) * 180) / Math.PI : null;
    // Typical layout: 2 stringers up to 36" wide, 3 for wider stairs.
    const stringers = w > 0 ? (w <= 36 ? 2 : 3) : 0;
    const stockTooShort = stringerIn > MAX_STOCK_FT * 12;

    steps.push(
      `Risers = ⌈${rise}″ ÷ ${MAX_RISER_IN}″ (IRC max)⌉ = ${risers} risers`
    );
    steps.push(
      `Actual riser = ${rise}″ ÷ ${risers} = ${actualRiser.toFixed(2)}″ each`
    );
    steps.push(
      `Treads = ${risers} − 1 = ${treads}; total run = ${treads} × ${tread}″ = ${totalRun.toFixed(1)}″`
    );
    steps.push(
      `Stringer length = √(${rise}² + ${totalRun.toFixed(1)}²) = ${stringerIn.toFixed(1)}″ (${fmtFtIn(stringerIn)})`
    );
    if (angleDeg !== null) {
      steps.push(
        `Stair angle = atan(${rise} ÷ ${totalRun.toFixed(1)}) = ${angleDeg.toFixed(1)}°`
      );
    }
    steps.push(
      `Stringers = ${stringers} (typical for a ${w || "—"}″ wide stair)`
    );

    return {
      risers, actualRiser, treads, totalRun, stringerIn, angleDeg,
      stringers, stockTooShort, steps,
    };
  }, [totalRise, treadDepth, width]);

  return (
    <div className="card" id="calculator">
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Inputs */}
        <div className="space-y-5">
          <NumberField
            label="Total rise (inches)"
            value={totalRise}
            onChange={setTotalRise}
            hint="Floor-to-floor (or ground-to-deck) height, measured vertically."
          />
          <div className="grid grid-cols-2 gap-4">
            <SelectField
              label="Tread depth"
              value={treadDepth}
              onChange={setTreadDepth}
              options={[
                { value: "10", label: '10″ (IRC minimum)' },
                { value: "11", label: '11″ (typical)' },
                { value: "12", label: '12″ (comfortable)' },
              ]}
              hint="Deeper treads = more comfortable, longer run."
            />
            <NumberField
              label="Stair width (inches)"
              value={width}
              onChange={setWidth}
              hint="36″ is a typical residential minimum."
            />
          </div>
          <p className="rounded-lg bg-stone-100 p-3 text-xs leading-relaxed text-slate-500">
            Based on typical International Residential Code guidance (7.75″
            max riser, 10″ min tread). Stairs are safety-critical — verify
            riser, tread, handrail, and guard requirements with your local
            building department before you build.
          </p>
        </div>

        {/* Results */}
        <div className="space-y-5 lg:sticky lg:top-24 self-start">
          <CostEstimator
            lines={[
              {
                id: "stringers",
                label: "2×12 stringer boards",
                quantity: calc.stringers,
                unit: "boards",
                pricePlaceholder: "14.00",
              },
            ]}
          />
          <div className="rounded-xl bg-slate-900 p-5 text-white">
            <p className="text-sm uppercase tracking-wide text-slate-400">
              Stair layout
            </p>
            <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-4">
              {[
                { v: calc.risers, u: "risers" },
                { v: calc.treads, u: "treads" },
                { v: `${calc.actualRiser.toFixed(2)}″`, u: "each riser" },
                { v: fmtFtIn(calc.totalRun), u: "total run" },
                { v: fmtFtIn(calc.stringerIn), u: "stringer length" },
                {
                  v: calc.angleDeg !== null ? `${calc.angleDeg.toFixed(1)}°` : "—",
                  u: "stair angle",
                },
                { v: calc.stringers, u: "stringers (2×12)" },
                { v: `${calc.totalRun > 0 ? (calc.totalRun / 12).toFixed(1) : "0"} ft`, u: "run in feet" },
              ].map((x) => (
                <div key={x.u}>
                  <p className="text-3xl font-bold text-orange-400">{x.v}</p>
                  <p className="text-sm text-slate-300">{x.u}</p>
                </div>
              ))}
            </div>
            {calc.stockTooShort ? (
              <p className="mt-3 rounded-lg border border-amber-400/60 bg-amber-400/10 p-3 text-xs leading-relaxed text-amber-200">
                <strong>Heads up:</strong> the stringer is longer than common
                16-ft 2×12 stock. Long stairs like this typically need an
                intermediate landing — check your local code.
              </p>
            ) : null}
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

          <StairDiagram />

          <p className="disclaimer-strip">
            <strong>Code check:</strong> this tool counts risers and treads —
            it does not approve your stair. Riser/tread limits, handrails,
            guards, headroom, and landings are all regulated; requirements
            vary by jurisdiction and by whether the stair is interior,
            exterior, or egress. Verify with your local building department
            before you cut stringers.
          </p>
        </div>
      </div>
    </div>
  );
}
