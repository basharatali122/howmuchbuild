"use client";

import { useMemo, useState } from "react";
import CostEstimator from "@/components/CostEstimator";

/**
 * Retail coverage figures (effective, after trim waste):
 * single roll ≈ 50 sq ft, double roll ≈ 100 sq ft.
 */
const ROLL_COVERAGE = {
  single: 50,
  double: 100,
};

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

function TabButton({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
        active
          ? "bg-slate-900 text-white"
          : "bg-stone-100 text-slate-600 hover:bg-stone-200"
      }`}
    >
      {children}
    </button>
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

export default function WallpaperCalculator() {
  const [tab, setTab] = useState("room");

  const [roomL, setRoomL] = useState("12");
  const [roomW, setRoomW] = useState("14");
  const [ceilH, setCeilH] = useState("8");
  const [roomOpenings, setRoomOpenings] = useState("40");

  const [wallL, setWallL] = useState("12");
  const [wallH, setWallH] = useState("8");
  const [wallOpenings, setWallOpenings] = useState("0");

  const [rollType, setRollType] = useState("double");
  const [waste, setWaste] = useState("15");

  const rollOptions = [
    { value: "single", label: "Single roll (~50 sq ft)" },
    { value: "double", label: "Double roll (~100 sq ft)" },
  ];

  const result = useMemo(() => {
    const w = Math.min(50, Math.max(0, parseFloat(waste) || 0));
    const coverage = ROLL_COVERAGE[rollType] || 50;
    let gross = 0;
    if (tab === "room") {
      const L = parseFloat(roomL) || 0;
      const Wd = parseFloat(roomW) || 0;
      const H = parseFloat(ceilH) || 0;
      const O = parseFloat(roomOpenings) || 0;
      gross = Math.max(0, 2 * (L + Wd) * H - O);
    } else {
      const L = parseFloat(wallL) || 0;
      const H = parseFloat(wallH) || 0;
      const O = parseFloat(wallOpenings) || 0;
      gross = Math.max(0, L * H - O);
    }
    const withWaste = gross * (1 + w / 100);
    const rolls = Math.ceil(withWaste / coverage - 1e-9);
    return {
      gross: Math.round(gross * 10) / 10,
      withWaste: Math.round(withWaste * 10) / 10,
      rolls,
      wastePct: w,
      coverage,
    };
  }, [tab, roomL, roomW, ceilH, roomOpenings, wallL, wallH, wallOpenings, rollType, waste]);

  return (
    <div className="card">
      <div className="mb-6 flex flex-wrap gap-2">
        <TabButton active={tab === "room"} onClick={() => setTab("room")}>
          Whole room
        </TabButton>
        <TabButton active={tab === "wall"} onClick={() => setTab("wall")}>
          Single wall
        </TabButton>
      </div>

      {tab === "room" && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <NumField label="Room length" value={roomL} onChange={setRoomL} hint="feet" />
          <NumField label="Room width" value={roomW} onChange={setRoomW} hint="feet" />
          <NumField label="Ceiling height" value={ceilH} onChange={setCeilH} hint="feet" />
          <NumField label="Doors/windows area" value={roomOpenings} onChange={setRoomOpenings} hint="sq ft" />
        </div>
      )}

      {tab === "wall" && (
        <div className="grid gap-4 sm:grid-cols-3">
          <NumField label="Wall length" value={wallL} onChange={setWallL} hint="feet" />
          <NumField label="Wall height" value={wallH} onChange={setWallH} hint="feet" />
          <NumField label="Openings area" value={wallOpenings} onChange={setWallOpenings} hint="sq ft" />
        </div>
      )}

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <SelectField label="Roll type" value={rollType} onChange={setRollType} options={rollOptions} hint="effective coverage" />
        <NumField label="Waste allowance" value={waste} onChange={setWaste} hint="% for pattern repeat" />
      </div>

      <div className="mt-6 rounded-xl bg-slate-900 p-5 text-white">
        <p className="text-sm uppercase tracking-wide text-slate-400">
          You need
        </p>
        <p className="mt-1 text-5xl font-bold text-orange-400">
          {result.rolls}{" "}
          <span className="text-2xl font-semibold text-slate-300">
            {rollType === "double" ? "double rolls" : "single rolls"}
          </span>
        </p>
        <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
          <div className="rounded-lg bg-slate-800 p-3">
            <p className="text-slate-400">Wall area to cover</p>
            <p className="mt-1 text-2xl font-bold">{result.gross} sq ft</p>
          </div>
          <div className="rounded-lg bg-slate-800 p-3">
            <p className="text-slate-400">With {result.wastePct}% waste</p>
            <p className="mt-1 text-2xl font-bold">{result.withWaste} sq ft</p>
          </div>
        </div>
        <p className="mt-4 text-xs leading-relaxed text-slate-400">
          Steps: {result.gross} sq ft ÷ {result.coverage} sq ft per {rollType}{" "}
          roll × (1 + {result.wastePct}% waste) = {result.rolls} rolls, rounded
          up. Pattern repeats eat more paper — 15% is a safe default.
        </p>
      </div>

      <div className="mt-6">
        <CostEstimator
          lines={[
            { id: "rolls", label: rollType === "double" ? "Wallpaper (double rolls)" : "Wallpaper (single rolls)", quantity: result.rolls, unit: "rolls", pricePlaceholder: "45.00" },
          ]}
        />
      </div>
    </div>
  );
}
