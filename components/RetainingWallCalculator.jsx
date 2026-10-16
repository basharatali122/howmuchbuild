"use client";

import { useMemo, useState } from "react";
import CostEstimator from "@/components/CostEstimator";

/** Common DIY block presets: face length x face height, in inches. */
const BLOCK_PRESETS = [
  { id: "seg166", label: "Segmental block (16 in long × 6 in high)", lenIn: 16, hIn: 6 },
  { id: "land124", label: "Landscape block (12 in long × 4 in high)", lenIn: 12, hIn: 4 },
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
          <option key={o.id} value={o.id}>
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

export default function RetainingWallCalculator() {
  const [length, setLength] = useState("20");
  const [height, setHeight] = useState("2");
  const [presetId, setPresetId] = useState("land124");
  const [capLen, setCapLen] = useState("12");
  const [waste, setWaste] = useState("5");

  const result = useMemo(() => {
    const L = parseFloat(length) || 0;
    const H = parseFloat(height) || 0;
    const preset = BLOCK_PRESETS.find((p) => p.id === presetId) || BLOCK_PRESETS[0];
    const capL = parseFloat(capLen) || 12;
    const w = Math.min(50, Math.max(0, parseFloat(waste) || 0));

    const courses = Math.ceil((H * 12) / preset.hIn - 1e-9);
    const perCourse = Math.ceil((L * 12) / preset.lenIn - 1e-9);
    const blocks = Math.ceil(courses * perCourse * (1 + w / 100) - 1e-9);
    const caps = Math.ceil((L * 12) / capL - 1e-9);
    // Base: 6-in deep gravel trench, 2 ft wide
    const gravelCuYd = Math.round(((L * 2 * 0.5) / 27) * 100) / 100;
    // Drainage stone: 1 ft wide column behind the wall, full height
    const drainCuYd = Math.round(((L * 1 * H) / 27) * 100) / 100;

    return { courses, perCourse, blocks, caps, gravelCuYd, drainCuYd, wastePct: w };
  }, [length, height, presetId, capLen, waste]);

  return (
    <div className="card">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <NumField label="Wall length" value={length} onChange={setLength} hint="feet" />
        <NumField
          label="Wall height"
          value={height}
          onChange={setHeight}
          hint="feet, total incl. buried course"
        />
        <SelectField
          label="Block type"
          value={presetId}
          onChange={setPresetId}
          options={BLOCK_PRESETS}
          hint="face dimensions"
        />
        <NumField label="Cap length" value={capLen} onChange={setCapLen} hint="inches per cap unit" />
        <NumField label="Waste allowance" value={waste} onChange={setWaste} hint="% for cuts" />
      </div>

      <div className="mt-6 rounded-xl bg-slate-900 p-5 text-white">
        <p className="text-sm uppercase tracking-wide text-slate-400">
          You need
        </p>
        <p className="mt-1 text-5xl font-bold text-orange-400">
          {result.blocks.toLocaleString()}{" "}
          <span className="text-2xl font-semibold text-slate-300">blocks</span>
        </p>
        <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg bg-slate-800 p-3">
            <p className="text-slate-400">Courses</p>
            <p className="mt-1 text-2xl font-bold">{result.courses}</p>
          </div>
          <div className="rounded-lg bg-slate-800 p-3">
            <p className="text-slate-400">Cap units</p>
            <p className="mt-1 text-2xl font-bold">{result.caps}</p>
          </div>
          <div className="rounded-lg bg-slate-800 p-3">
            <p className="text-slate-400">Base gravel</p>
            <p className="mt-1 text-2xl font-bold">{result.gravelCuYd} cu yd</p>
          </div>
          <div className="rounded-lg bg-slate-800 p-3">
            <p className="text-slate-400">Drainage stone</p>
            <p className="mt-1 text-2xl font-bold">{result.drainCuYd} cu yd</p>
          </div>
        </div>
        <p className="mt-4 text-xs leading-relaxed text-slate-400">
          Steps: {result.courses} courses × {result.perCourse} blocks per course
          + {result.wastePct}% waste, rounded up. Base = {length || 0} ft × 2 ft
          × 6 in trench; drainage = 1 ft wide column behind the wall.
        </p>
        <p className="mt-2 text-xs leading-relaxed text-amber-300/90">
          Planning estimate. Walls over 3–4 ft tall (and any wall holding back a
          slope or driveway) usually need engineering and a permit — check your
          local code before stacking higher.
        </p>
      </div>

      <div className="mt-6">
        <CostEstimator
          lines={[
            { id: "blocks", label: "Wall blocks", quantity: result.blocks, unit: "blocks", pricePlaceholder: "3.50" },
            { id: "caps", label: "Cap units", quantity: result.caps, unit: "caps", pricePlaceholder: "4.00" },
            { id: "gravel", label: "Base gravel", quantity: result.gravelCuYd, unit: "cu yd", pricePlaceholder: "55.00" },
            { id: "drain", label: "Drainage stone", quantity: result.drainCuYd, unit: "cu yd", pricePlaceholder: "60.00" },
          ]}
        />
      </div>
    </div>
  );
}
