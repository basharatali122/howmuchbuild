"use client";

import { useMemo, useState } from "react";
import CostEstimator from "@/components/CostEstimator";

const WASTE_OPTIONS = [
  { value: "10", label: "Straight lay — 10% waste" },
  { value: "15", label: "Diagonal lay — 15% waste" },
  { value: "20", label: "Herringbone / complex — 20% waste" },
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

export default function FlooringCalculator() {
  const [roomL, setRoomL] = useState("12");
  const [roomW, setRoomW] = useState("15");
  const [extra, setExtra] = useState("0");
  const [waste, setWaste] = useState("10");
  const [boxCoverage, setBoxCoverage] = useState("20");

  const result = useMemo(() => {
    const L = parseFloat(roomL) || 0;
    const W = parseFloat(roomW) || 0;
    const X = parseFloat(extra) || 0;
    const w = Math.min(50, Math.max(0, parseFloat(waste) || 0));
    const box = Math.max(0.01, parseFloat(boxCoverage) || 20);

    const area = L * W + X;
    const withWaste = area * (1 + w / 100);
    const boxes = Math.ceil(withWaste / box - 1e-9);

    return {
      area: Math.round(area * 10) / 10,
      withWaste: Math.round(withWaste * 10) / 10,
      boxes,
      wastePct: w,
      box,
    };
  }, [roomL, roomW, extra, waste, boxCoverage]);

  return (
    <div className="card">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <NumField label="Room length" value={roomL} onChange={setRoomL} hint="feet" />
        <NumField label="Room width" value={roomW} onChange={setRoomW} hint="feet" />
        <NumField label="Closets / alcoves" value={extra} onChange={setExtra} hint="extra sq ft" />
        <SelectField label="Layout" value={waste} onChange={setWaste} options={WASTE_OPTIONS} hint="sets waste %" />
        <NumField label="Coverage per box" value={boxCoverage} onChange={setBoxCoverage} hint="sq ft, on the box" />
      </div>

      <div className="mt-6 rounded-xl bg-slate-900 p-5 text-white">
        <p className="text-sm uppercase tracking-wide text-slate-400">
          You need
        </p>
        <p className="mt-1 text-5xl font-bold text-orange-400">
          {result.boxes}{" "}
          <span className="text-2xl font-semibold text-slate-300">boxes</span>
        </p>
        <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
          <div className="rounded-lg bg-slate-800 p-3">
            <p className="text-slate-400">Floor area</p>
            <p className="mt-1 text-2xl font-bold">{result.area} sq ft</p>
          </div>
          <div className="rounded-lg bg-slate-800 p-3">
            <p className="text-slate-400">With {result.wastePct}% waste</p>
            <p className="mt-1 text-2xl font-bold">{result.withWaste} sq ft</p>
          </div>
        </div>
        <p className="mt-4 text-xs leading-relaxed text-slate-400">
          Steps: {result.area} sq ft × (1 + {result.wastePct}% waste) ={" "}
          {result.withWaste} sq ft ÷ {result.box} per box = {result.boxes}{" "}
          boxes, rounded up. Buy 1–2 spare boxes for future repairs — dye lots
          change.
        </p>
      </div>

      <div className="mt-6">
        <CostEstimator
          lines={[
            { id: "flooring", label: "Flooring", quantity: result.boxes, unit: "boxes", pricePlaceholder: "60.00" },
          ]}
        />
      </div>
    </div>
  );
}
