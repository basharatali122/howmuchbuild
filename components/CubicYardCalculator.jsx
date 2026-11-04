"use client";

import { useMemo, useState } from "react";
import CostEstimator from "@/components/CostEstimator";

const CU_FT_PER_CU_YD = 27;
const CU_FT_PER_BAG = 0.5;

const round1 = (n) => Math.round(n * 10) / 10;
const round2 = (n) => Math.round(n * 100) / 100;

function FtField({ label, value, onChange, hint }) {
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
      <p className="mt-1 text-center text-xs text-slate-400">{hint || "feet"}</p>
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

function VolumeDiagram() {
  return (
    <svg
      viewBox="0 0 380 210"
      role="img"
      aria-label="Cross-section diagram of a material layer showing depth over an area"
      className="h-auto w-full rounded-xl border border-stone-200 bg-white p-2"
    >
      <text x="190" y="22" textAnchor="middle" fontSize="14" fill="#44403c" fontWeight="700">
        Volume - cross-section
      </text>
      {/* ground below */}
      <rect x="40" y="140" width="300" height="34" fill="#d8cfc0" stroke="#a8a29e" strokeWidth="1" />
      <text x="190" y="162" textAnchor="middle" fontSize="12" fill="#78716c">ground / compacted base</text>
      {/* material layer */}
      <rect x="40" y="106" width="300" height="34" fill="#d6b98a" stroke="#a16207" strokeWidth="1.5" />
      <text x="190" y="100" textAnchor="middle" fontSize="12.5" fill="#57534e" fontWeight="600">
        material layer - mulch, gravel, soil, sand, concrete
      </text>
      {/* depth arrow */}
      <line x1="356" y1="106" x2="356" y2="140" stroke="#c2410c" strokeWidth="2" />
      <polygon points="356,100 351,110 361,110" fill="#c2410c" />
      <polygon points="356,146 351,136 361,136" fill="#c2410c" />
      <text x="368" y="128" fontSize="12" fill="#c2410c" fontWeight="600">depth</text>
      {/* length dimension */}
      <line x1="40" y1="192" x2="340" y2="192" stroke="#57534e" strokeWidth="1.5" />
      <polygon points="40,192 50,188 50,196" fill="#57534e" />
      <polygon points="340,192 330,188 330,196" fill="#57534e" />
      <text x="190" y="206" textAnchor="middle" fontSize="12" fill="#57534e">area x depth = volume</text>
    </svg>
  );
}

export default function CubicYardCalculator() {
  const [shape, setShape] = useState("rectangle");
  const [length, setLength] = useState("20");
  const [width, setWidth] = useState("10");
  const [diameter, setDiameter] = useState("12");
  const [depth, setDepth] = useState("3");
  const [waste, setWaste] = useState(10);

  const calc = useMemo(() => {
    const steps = [];
    const dFt = (Number(depth) || 0) / 12;
    let areaSqFt = 0;

    if (shape === "rectangle") {
      const l = Number(length) || 0;
      const w = Number(width) || 0;
      areaSqFt = l * w;
      steps.push(
        `Area = ${round2(l)} ft x ${round2(w)} ft = ${round2(areaSqFt)} sq ft`
      );
    } else {
      const dia = Number(diameter) || 0;
      areaSqFt = Math.PI * (dia / 2) * (dia / 2);
      steps.push(
        `Area = pi x r squared = pi x ${round2(dia / 2)} squared = ${round2(areaSqFt)} sq ft`
      );
    }

    const volumeCuFt = areaSqFt * dFt;
    const withWasteCuFt = volumeCuFt * (1 + waste / 100);
    const volumeCuYd = withWasteCuFt / CU_FT_PER_CU_YD;
    // Round the order up to the nearest half yard, the way bulk yards sell.
    const orderCuYd = Math.ceil(volumeCuYd * 2) / 2;
    // Epsilon guard: float math can turn an exact 110 into 110.0000000001,
    // which would wrongly round up to 111 bags.
    const bags = Math.ceil(withWasteCuFt / CU_FT_PER_BAG - 1e-9);

    steps.push(
      `Volume = ${round2(areaSqFt)} sq ft x ${round2(dFt)} ft (${depth || 0} in) = ${round2(volumeCuFt)} cu ft`
    );
    steps.push(
      `With ${waste}% waste = ${round2(withWasteCuFt)} cu ft / ${CU_FT_PER_CU_YD} = ${round2(volumeCuYd)} cu yd`
    );
    steps.push(
      `Order (rounded up to the nearest half yard) = ${orderCuYd} cu yd`
    );
    steps.push(
      `As 0.5 cu ft bags: ${round2(withWasteCuFt)} / ${CU_FT_PER_BAG} = ${round2(withWasteCuFt / CU_FT_PER_BAG)} - round up = ${bags} bags`
    );

    return { areaSqFt, volumeCuFt, withWasteCuFt, volumeCuYd, orderCuYd, bags, steps };
  }, [shape, length, width, diameter, depth, waste]);

  return (
    <div className="card" id="calculator">
      <div
        role="tablist"
        aria-label="Area shape"
        className="mb-6 flex flex-wrap gap-2"
      >
        {[
          { id: "rectangle", label: "Rectangle" },
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
          {shape === "rectangle" ? (
            <>
              <FtField label="Area length" value={length} onChange={setLength} />
              <FtField label="Area width" value={width} onChange={setWidth} />
            </>
          ) : (
            <FtField
              label="Circle diameter"
              value={diameter}
              onChange={setDiameter}
            />
          )}
          <InchesField
            label="Material depth"
            value={depth}
            onChange={setDepth}
            hint="inches - 3 in is typical for a mulch bed"
          />

          <div>
            <label className="mb-1 flex items-center justify-between text-sm font-medium text-slate-700">
              <span>Settling and waste allowance</span>
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
              10% is a safe default - loose material settles and spreads
              unevenly.
            </p>
          </div>
        </div>

        {/* Results */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="space-y-5">
            <CostEstimator
              lines={[
                {
                  id: "bulk-yard",
                  label: "Bulk material (per cu yd)",
                  quantity: calc.orderCuYd,
                  unit: "cu yd",
                  pricePlaceholder: "45.00",
                },
                {
                  id: "material-bag",
                  label: "Bagged material (0.5 cu ft bags)",
                  quantity: calc.bags,
                  unit: "bags",
                  pricePlaceholder: "5.00",
                },
              ]}
            />

            <div className="rounded-xl bg-slate-900 p-5 text-white">
              <p className="text-sm uppercase tracking-wide text-slate-400">
                You need (estimate)
              </p>
              <p className="mt-1 text-5xl font-bold text-orange-400">
                {round2(calc.volumeCuYd)}
                <span className="ml-2 text-xl font-medium text-slate-300">
                  cu yd
                </span>
              </p>
              <p className="mt-2 text-sm text-slate-400">
                Cubic yards, with your waste allowance included. One cubic
                yard is 27 cubic feet, exact.
              </p>
              <p className="mt-3 border-t border-slate-700 pt-3 text-lg font-semibold">
                Order {calc.orderCuYd} cu yd{" "}
                <span className="text-sm font-normal text-slate-400">
                  (rounded up to the nearest half yard)
                </span>
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center">
              {[
                { v: round2(calc.withWasteCuFt), u: "cu ft" },
                { v: round2(calc.volumeCuYd), u: "cu yd (exact)" },
                { v: calc.bags, u: "0.5 cu ft bags" },
              ].map((x) => (
                <div
                  key={x.u}
                  className="rounded-xl border border-stone-200 bg-stone-50 p-3"
                >
                  <p className="text-2xl font-bold text-slate-900">{x.v}</p>
                  <p className="text-xs text-slate-500">with waste ({x.u})</p>
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

            <VolumeDiagram />

            <p className="disclaimer-strip">
              Estimates for planning. Bulk yards are sold by volume, so
              this number works for mulch, gravel, topsoil, sand, and
              concrete alike. For weight (tons), use the material-specific
              calculator, since density varies by material.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
