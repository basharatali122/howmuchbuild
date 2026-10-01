"use client";

import { useMemo, useState } from "react";
import CostEstimator from "@/components/CostEstimator";

const CU_FT_PER_CU_YD = 27;
/** Tons of crushed gravel per cubic yard — published typical range, varies by stone type and moisture. */
const TONS_PER_CU_YD_LOW = 1.4;
const TONS_PER_CU_YD_HIGH = 1.5;
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

export default function GravelCalculator() {
  const [shape, setShape] = useState("rectangle");
  const [length, setLength] = useState("12");
  const [width, setWidth] = useState("10");
  const [diameter, setDiameter] = useState("8");
  const [depth, setDepth] = useState("4");
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
        `Area = ${round2(l)} ft × ${round2(w)} ft = ${round2(areaSqFt)} sq ft`
      );
    } else {
      const dia = Number(diameter) || 0;
      areaSqFt = Math.PI * (dia / 2) * (dia / 2);
      steps.push(
        `Area = π × r² = π × ${round2(dia / 2)}² = ${round2(areaSqFt)} sq ft`
      );
    }

    const volumeCuFt = areaSqFt * dFt;
    const withWasteCuFt = volumeCuFt * (1 + waste / 100);
    const volumeCuYd = withWasteCuFt / CU_FT_PER_CU_YD;
    const tonsLow = volumeCuYd * TONS_PER_CU_YD_LOW;
    const tonsHigh = volumeCuYd * TONS_PER_CU_YD_HIGH;
    // Round up to the nearest half ton for ordering — suppliers sell in half-ton increments.
    const orderTons = Math.ceil(tonsHigh * 2) / 2;
    const bags = Math.ceil(withWasteCuFt / CU_FT_PER_BAG);

    steps.push(
      `Volume = ${round2(areaSqFt)} sq ft × ${round2(dFt)} ft (${depth || 0}″) = ${round2(volumeCuFt)} cu ft`
    );
    steps.push(
      `With ${waste}% waste = ${round2(withWasteCuFt)} cu ft ÷ ${CU_FT_PER_CU_YD} = ${round2(volumeCuYd)} cu yd`
    );
    steps.push(
      `Weight estimate = ${round2(volumeCuYd)} cu yd × ${TONS_PER_CU_YD_LOW}–${TONS_PER_CU_YD_HIGH} tons/cu yd = ${round1(tonsLow)}–${round1(tonsHigh)} tons`
    );
    steps.push(
      `Rounded up to the nearest half ton = ${orderTons} tons (order this amount)`
    );
    steps.push(
      `As 0.5 cu ft bags: ${round2(withWasteCuFt)} ÷ ${CU_FT_PER_BAG} = ${round2(withWasteCuFt / CU_FT_PER_BAG)} → round up = ${bags} bags`
    );

    return { areaSqFt, volumeCuFt, withWasteCuFt, volumeCuYd, tonsLow, tonsHigh, orderTons, bags, steps };
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
            label="Gravel depth"
            value={depth}
            onChange={setDepth}
            hint="inches — 4″ is typical for driveways & patios"
          />

          <div>
            <label className="mb-1 flex items-center justify-between text-sm font-medium text-slate-700">
              <span>Compaction &amp; waste allowance</span>
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
              10% is a safe default — gravel settles and compacts after spreading.
            </p>
          </div>
        </div>

        {/* Results */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="space-y-5">
          <CostEstimator
            lines={[
              {
                id: "gravel-ton",
                label: "Gravel (bulk, per ton)",
                quantity: calc.orderTons,
                unit: "tons",
                pricePlaceholder: "45.00",
              },
              {
                id: "gravel-bag",
                label: "Gravel (0.5 cu ft bags)",
                quantity: calc.bags,
                unit: "bags",
                pricePlaceholder: "5.50",
              },
            ]}
          />

          <div className="rounded-xl bg-slate-900 p-5 text-white">
            <p className="text-sm uppercase tracking-wide text-slate-400">
              You need (estimate)
            </p>
            <p className="mt-1 text-5xl font-bold text-orange-400">
              {round1(calc.tonsLow)}–{round1(calc.tonsHigh)}
              <span className="ml-2 text-xl font-medium text-slate-300">
                tons
              </span>
            </p>
            <p className="mt-2 text-sm text-slate-400">
              Weight estimate — 1 cu yd of crushed gravel weighs roughly{" "}
              {TONS_PER_CU_YD_LOW}–{TONS_PER_CU_YD_HIGH} tons depending on stone
              type and moisture.
            </p>
            <p className="mt-3 border-t border-slate-700 pt-3 text-lg font-semibold">
              Order {calc.orderTons} tons{" "}
              <span className="text-sm font-normal text-slate-400">
                (rounded up to the nearest half ton)
              </span>
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center">
            {[
              { v: round2(calc.withWasteCuFt), u: "cu ft" },
              { v: round2(calc.volumeCuYd), u: "cu yd" },
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

          <p className="disclaimer-strip">
            Estimates for planning. Gravel weight varies by stone type, size,
            and moisture — suppliers round deliveries to the nearest half ton.
            Always round up: running short on a base layer means a second
            delivery fee.
          </p>
          </div>
        </div>
      </div>
    </div>
  );
}
