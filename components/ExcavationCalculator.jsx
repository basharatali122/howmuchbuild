"use client";

import { useMemo, useState } from "react";
import CostEstimator from "@/components/CostEstimator";

const SOIL_OPTIONS = [
  { value: "12", label: "Sand / gravel — 12% swell" },
  { value: "25", label: "Common soil / loam — 25% swell" },
  { value: "35", label: "Dense clay / rock — 35% swell" },
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

export default function ExcavationCalculator() {
  const [length, setLength] = useState("20");
  const [width, setWidth] = useState("20");
  const [depth, setDepth] = useState("2");
  const [swell, setSwell] = useState("25");
  const [truck, setTruck] = useState("12");

  const result = useMemo(() => {
    const L = parseFloat(length) || 0;
    const W = parseFloat(width) || 0;
    const D = parseFloat(depth) || 0;
    const s = Math.min(100, Math.max(0, parseFloat(swell) || 0));
    const T = Math.max(0.1, parseFloat(truck) || 12);

    const bank = (L * W * D) / 27;
    const loose = bank * (1 + s / 100);
    const loads = Math.ceil(loose / T - 1e-9);

    return {
      bank: Math.round(bank * 100) / 100,
      loose: Math.round(loose * 100) / 100,
      loads,
      swellPct: s,
      truckCap: T,
    };
  }, [length, width, depth, swell, truck]);

  return (
    <div className="card">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <NumField label="Length" value={length} onChange={setLength} hint="feet" />
        <NumField label="Width" value={width} onChange={setWidth} hint="feet" />
        <NumField label="Depth" value={depth} onChange={setDepth} hint="feet" />
        <SelectField label="Soil type" value={swell} onChange={setSwell} options={SOIL_OPTIONS} hint="swell factor" />
        <NumField label="Truck capacity" value={truck} onChange={setTruck} hint="cubic yards" />
      </div>

      <div className="mt-6 rounded-xl bg-slate-900 p-5 text-white">
        <p className="text-sm uppercase tracking-wide text-slate-400">
          Truckloads to haul away
        </p>
        <p className="mt-1 text-5xl font-bold text-orange-400">
          {result.loads}{" "}
          <span className="text-2xl font-semibold text-slate-300">loads</span>
        </p>
        <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
          <div className="rounded-lg bg-slate-800 p-3">
            <p className="text-slate-400">In the ground (bank yards)</p>
            <p className="mt-1 text-2xl font-bold">{result.bank} cu yd</p>
          </div>
          <div className="rounded-lg bg-slate-800 p-3">
            <p className="text-slate-400">Loose, after {result.swellPct}% swell</p>
            <p className="mt-1 text-2xl font-bold">{result.loose} cu yd</p>
          </div>
        </div>
        <p className="mt-4 text-xs leading-relaxed text-slate-400">
          Steps: bank = L × W × D ÷ 27; loose = bank × (1 + {result.swellPct}%
          swell); loads = ceil({result.loose} ÷ {result.truckCap} per truck).
          You dig bank yards but haul loose yards — the pile is always bigger
          than the hole.
        </p>
      </div>

      <div className="mt-6">
        <CostEstimator
          lines={[
            { id: "haul", label: "Haul-off (truckloads)", quantity: result.loads, unit: "loads", pricePlaceholder: "350.00" },
          ]}
        />
      </div>
    </div>
  );
}
