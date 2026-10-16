"use client";

import { useMemo, useState } from "react";
import CostEstimator from "@/components/CostEstimator";

const ROOF_TYPES = [
  { value: "10", label: "Simple gable — 10% waste" },
  { value: "15", label: "Hip / complex — 15% waste" },
  { value: "20", label: "Cut-up / many valleys — 20% waste" },
];

const SHINGLE_TYPES = [
  { value: "3", label: "3-tab / architectural — 3 bundles per square" },
  { value: "4", label: "Premium / designer — 4 bundles per square" },
];

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
      {hint && (
        <p className="mt-1 text-center text-xs text-slate-400">{hint}</p>
      )}
    </div>
  );
}

function SelectField({ label, value, onChange, options, hint }) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-slate-700">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-center"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      {hint && (
        <p className="mt-1 text-center text-xs text-slate-400">{hint}</p>
      )}
    </div>
  );
}

export default function RoofShinglesCalculator() {
  const [houseL, setHouseL] = useState("40");
  const [houseW, setHouseW] = useState("30");
  const [pitchX, setPitchX] = useState("6");
  const [roofType, setRoofType] = useState("10");
  const [shingleType, setShingleType] = useState("3");

  const result = useMemo(() => {
    const L = parseFloat(houseL) || 0;
    const W = parseFloat(houseW) || 0;
    const x = Math.max(0, parseFloat(pitchX) || 0);
    const w = Math.min(50, Math.max(0, parseFloat(roofType) || 0));
    const bps = parseFloat(shingleType) || 3;

    const footprint = L * W;
    const pitchFactor = Math.sqrt(x * x + 144) / 12;
    const roofArea = footprint * pitchFactor;
    const withWaste = roofArea * (1 + w / 100);
    const squares = withWaste / 100;
    const bundles = Math.ceil(squares * bps - 1e-9);
    // 15-lb felt: ~432 sq ft per roll ≈ 4.32 squares
    const feltRolls = Math.ceil(squares / 4.32 - 1e-9);

    return {
      footprint: Math.round(footprint * 10) / 10,
      pitchFactor: Math.round(pitchFactor * 1000) / 1000,
      roofArea: Math.round(roofArea * 10) / 10,
      withWaste: Math.round(withWaste * 10) / 10,
      squares: Math.round(squares * 100) / 100,
      bundles,
      feltRolls,
      wastePct: w,
      bundlesPerSquare: bps,
      pitchX: x,
    };
  }, [houseL, houseW, pitchX, roofType, shingleType]);

  return (
    <div className="card">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <NumField label="House length" value={houseL} onChange={setHouseL} hint="feet" />
        <NumField label="House width" value={houseW} onChange={setHouseW} hint="feet" />
        <NumField label="Roof pitch" value={pitchX} onChange={setPitchX} hint="x in 12" />
        <SelectField label="Roof complexity" value={roofType} onChange={setRoofType} options={ROOF_TYPES} hint="sets waste %" />
        <SelectField label="Shingle type" value={shingleType} onChange={setShingleType} options={SHINGLE_TYPES} hint="bundles per square" />
      </div>

      <div className="mt-6 rounded-xl bg-slate-900 p-5 text-white">
        <p className="text-sm uppercase tracking-wide text-slate-400">
          You need
        </p>
        <p className="mt-1 text-5xl font-bold text-orange-400">
          {result.bundles}{" "}
          <span className="text-2xl font-semibold text-slate-300">bundles</span>
        </p>
        <div className="mt-4 grid gap-3 text-sm sm:grid-cols-3">
          <div className="rounded-lg bg-slate-800 p-3">
            <p className="text-slate-400">Roof area + waste</p>
            <p className="mt-1 text-2xl font-bold">{result.withWaste.toLocaleString()} sq ft</p>
          </div>
          <div className="rounded-lg bg-slate-800 p-3">
            <p className="text-slate-400">Squares</p>
            <p className="mt-1 text-2xl font-bold">{result.squares}</p>
          </div>
          <div className="rounded-lg bg-slate-800 p-3">
            <p className="text-slate-400">Underlayment rolls</p>
            <p className="mt-1 text-2xl font-bold">{result.feltRolls}</p>
          </div>
        </div>
        <p className="mt-4 text-xs leading-relaxed text-slate-400">
          Steps: {result.footprint} footprint × {result.pitchFactor} pitch
          factor = {result.roofArea} sq ft × (1 + {result.wastePct}% waste) ={" "}
          {result.withWaste} sq ft = {result.squares} squares ×{" "}
          {result.bundlesPerSquare} bundles = {result.bundles} bundles. One
          square = 100 sq ft.
        </p>
      </div>

      <div className="mt-6">
        <CostEstimator
          lines={[
            { id: "shingles", label: "Shingle bundles", quantity: result.bundles, unit: "bundles", pricePlaceholder: "35.00" },
            { id: "felt", label: "Underlayment rolls", quantity: result.feltRolls, unit: "rolls", pricePlaceholder: "25.00" },
          ]}
        />
      </div>
    </div>
  );
}
