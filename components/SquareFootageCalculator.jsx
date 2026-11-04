"use client";

import { useMemo, useState } from "react";
import CostEstimator from "@/components/CostEstimator";

const SQ_FT_PER_SQ_YD = 9;
const SQ_FT_PER_ACRE = 43560;
const SQ_M_PER_SQ_FT = 0.092903;

const round2 = (n) => Math.round(n * 100) / 100;
const round4 = (n) => Math.round(n * 10000) / 10000;

function toFt(feet, inches) {
  return (Number(feet) || 0) + (Number(inches) || 0) / 12;
}

function FtInField({ label, feet, inches, onFeet, onInches }) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-slate-700">
        {label}
      </label>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <input
            type="number"
            min="0"
            step="any"
            value={feet}
            onChange={(e) => onFeet(e.target.value)}
            className="text-center"
            aria-label={`${label} feet`}
          />
          <p className="mt-1 text-center text-xs text-slate-400">feet</p>
        </div>
        <div>
          <input
            type="number"
            min="0"
            step="any"
            value={inches}
            onChange={(e) => onInches(e.target.value)}
            className="text-center"
            aria-label={`${label} inches`}
          />
          <p className="mt-1 text-center text-xs text-slate-400">inches</p>
        </div>
      </div>
    </div>
  );
}

function AreaDiagram({ shape }) {
  return (
    <svg
      viewBox="0 0 380 210"
      role="img"
      aria-label="Diagram of an area shape with its dimensions"
      className="h-auto w-full rounded-xl border border-stone-200 bg-white p-2"
    >
      <text x="190" y="22" textAnchor="middle" fontSize="14" fill="#44403c" fontWeight="700">
        Area shape - top view
      </text>
      {shape === "rectangle" && (
        <>
          <rect x="60" y="50" width="260" height="120" fill="#ffedd5" stroke="#c2410c" strokeWidth="1.5" />
          <line x1="60" y1="192" x2="320" y2="192" stroke="#57534e" strokeWidth="1.5" />
          <polygon points="60,192 70,188 70,196" fill="#57534e" />
          <polygon points="320,192 310,188 310,196" fill="#57534e" />
          <text x="190" y="206" textAnchor="middle" fontSize="12" fill="#57534e">length</text>
          <line x1="340" y1="50" x2="340" y2="170" stroke="#57534e" strokeWidth="1.5" />
          <polygon points="340,50 336,60 344,60" fill="#57534e" />
          <polygon points="340,170 336,160 344,160" fill="#57534e" />
          <text x="358" y="114" fontSize="12" fill="#57534e">width</text>
          <text x="190" y="114" textAnchor="middle" fontSize="13" fill="#57534e">Area = length x width</text>
        </>
      )}
      {shape === "triangle" && (
        <>
          <polygon points="190,50 60,170 320,170" fill="#ffedd5" stroke="#c2410c" strokeWidth="1.5" />
          <line x1="60" y1="192" x2="320" y2="192" stroke="#57534e" strokeWidth="1.5" />
          <polygon points="60,192 70,188 70,196" fill="#57534e" />
          <polygon points="320,192 310,188 310,196" fill="#57534e" />
          <text x="190" y="206" textAnchor="middle" fontSize="12" fill="#57534e">base</text>
          <text x="190" y="140" textAnchor="middle" fontSize="13" fill="#57534e">Area = 0.5 x base x height</text>
        </>
      )}
      {shape === "circle" && (
        <>
          <circle cx="190" cy="110" r="60" fill="#ffedd5" stroke="#c2410c" strokeWidth="1.5" />
          <line x1="130" y1="110" x2="250" y2="110" stroke="#57534e" strokeWidth="1.5" />
          <polygon points="130,110 140,106 140,114" fill="#57534e" />
          <polygon points="250,110 240,106 240,114" fill="#57534e" />
          <text x="190" y="130" textAnchor="middle" fontSize="12" fill="#57534e">diameter</text>
          <text x="190" y="95" textAnchor="middle" fontSize="13" fill="#57534e">Area = pi x r squared</text>
        </>
      )}
    </svg>
  );
}

export default function SquareFootageCalculator() {
  const [shape, setShape] = useState("rectangle");
  const [lenFt, setLenFt] = useState("20");
  const [lenIn, setLenIn] = useState("0");
  const [widFt, setWidFt] = useState("15");
  const [widIn, setWidIn] = useState("0");
  const [baseFt, setBaseFt] = useState("12");
  const [baseIn, setBaseIn] = useState("0");
  const [heightFt, setHeightFt] = useState("8");
  const [heightIn, setHeightIn] = useState("0");
  const [diaFt, setDiaFt] = useState("10");
  const [diaIn, setDiaIn] = useState("0");

  const calc = useMemo(() => {
    const steps = [];
    let areaSqFt = 0;

    if (shape === "rectangle") {
      const l = toFt(lenFt, lenIn);
      const w = toFt(widFt, widIn);
      areaSqFt = l * w;
      steps.push(`Length = ${lenFt || 0} ft ${lenIn || 0} in = ${round2(l)} ft`);
      steps.push(`Width = ${widFt || 0} ft ${widIn || 0} in = ${round2(w)} ft`);
      steps.push(`Area = ${round2(l)} ft x ${round2(w)} ft = ${round2(areaSqFt)} sq ft`);
    } else if (shape === "triangle") {
      const b = toFt(baseFt, baseIn);
      const h = toFt(heightFt, heightIn);
      areaSqFt = 0.5 * b * h;
      steps.push(`Base = ${baseFt || 0} ft ${baseIn || 0} in = ${round2(b)} ft`);
      steps.push(`Height = ${heightFt || 0} ft ${heightIn || 0} in = ${round2(h)} ft`);
      steps.push(`Area = 0.5 x ${round2(b)} ft x ${round2(h)} ft = ${round2(areaSqFt)} sq ft`);
    } else {
      const d = toFt(diaFt, diaIn);
      const r = d / 2;
      areaSqFt = Math.PI * r * r;
      steps.push(`Diameter = ${diaFt || 0} ft ${diaIn || 0} in = ${round2(d)} ft, so radius = ${round2(r)} ft`);
      steps.push(`Area = pi x ${round2(r)} squared = ${round2(areaSqFt)} sq ft`);
    }

    const sqYd = areaSqFt / SQ_FT_PER_SQ_YD;
    const acres = areaSqFt / SQ_FT_PER_ACRE;
    const sqM = areaSqFt * SQ_M_PER_SQ_FT;
    steps.push(`Square yards = ${round2(areaSqFt)} / 9 = ${round2(sqYd)} sq yd`);
    steps.push(`Acres = ${round2(areaSqFt)} / 43,560 = ${round4(acres)} acres`);
    steps.push(`Square meters = ${round2(areaSqFt)} x 0.092903 = ${round2(sqM)} sq m`);

    return { areaSqFt, sqYd, acres, sqM, steps };
  }, [shape, lenFt, lenIn, widFt, widIn, baseFt, baseIn, heightFt, heightIn, diaFt, diaIn]);

  return (
    <div className="card" id="calculator">
      <div
        role="tablist"
        aria-label="Area shape"
        className="mb-6 flex flex-wrap gap-2"
      >
        {[
          { id: "rectangle", label: "Rectangle" },
          { id: "triangle", label: "Triangle" },
          { id: "circle", label: "Circle" },
        ].map((m) => (
          <button
            key={m.id}
            role="tab"
            aria-selected={shape === m.id}
            onClick={() => setShape(m.id)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              shape === m.id
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
          {shape === "rectangle" && (
            <>
              <FtInField label="Length" feet={lenFt} inches={lenIn} onFeet={setLenFt} onInches={setLenIn} />
              <FtInField label="Width" feet={widFt} inches={widIn} onFeet={setWidFt} onInches={setWidIn} />
            </>
          )}
          {shape === "triangle" && (
            <>
              <FtInField label="Base" feet={baseFt} inches={baseIn} onFeet={setBaseFt} onInches={setBaseIn} />
              <FtInField label="Height" feet={heightFt} inches={heightIn} onFeet={setHeightFt} onInches={setHeightIn} />
            </>
          )}
          {shape === "circle" && (
            <FtInField label="Diameter" feet={diaFt} inches={diaIn} onFeet={setDiaFt} onInches={setDiaIn} />
          )}
          <p className="text-sm text-slate-500">
            Tip: for an odd-shaped room, split it into rectangles, measure
            each one, and add the areas together.
          </p>
        </div>

        {/* Results */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="space-y-5">
            <CostEstimator
              lines={[
                {
                  id: "sqft-cost",
                  label: "Project cost (per sq ft)",
                  quantity: round2(calc.areaSqFt),
                  unit: "sq ft",
                  pricePlaceholder: "3.00",
                },
              ]}
            />

            <div className="rounded-xl bg-slate-900 p-5 text-white">
              <p className="text-sm uppercase tracking-wide text-slate-400">
                Area
              </p>
              <p className="mt-1 text-5xl font-bold text-orange-400">
                {round2(calc.areaSqFt)}
                <span className="ml-2 text-xl font-medium text-slate-300">
                  sq ft
                </span>
              </p>
              <p className="mt-2 text-sm text-slate-400">
                Length times width, in square feet. Use this number for
                flooring, paint, sod, and tile estimates.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center">
              {[
                { v: round2(calc.sqYd), u: "sq yd" },
                { v: round4(calc.acres), u: "acres" },
                { v: round2(calc.sqM), u: "sq meters" },
              ].map((x) => (
                <div
                  key={x.u}
                  className="rounded-xl border border-stone-200 bg-stone-50 p-3"
                >
                  <p className="text-2xl font-bold text-slate-900">{x.v}</p>
                  <p className="text-xs text-slate-500">{x.u}</p>
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

            <AreaDiagram shape={shape} />

            <p className="disclaimer-strip">
              Area only, no waste allowance included. For flooring, paint,
              or sod, add a waste allowance (often 10%) on top of this
              area; the material calculators handle that math.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
