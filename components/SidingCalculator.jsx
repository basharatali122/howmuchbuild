"use client";

import { useMemo, useState } from "react";
import CostEstimator from "@/components/CostEstimator";

/** Vinyl/aluminum cartons typically cover ~200 sq ft (2 squares). */
const BOX_COVERAGE_SQFT = 200;

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

export default function SidingCalculator() {
  const [perimeter, setPerimeter] = useState("140");
  const [height, setHeight] = useState("10");
  const [gables, setGables] = useState("2");
  const [gableBase, setGableBase] = useState("30");
  const [gableRise, setGableRise] = useState("6");
  const [openings, setOpenings] = useState("300");
  const [waste, setWaste] = useState("10");

  const result = useMemo(() => {
    const P = parseFloat(perimeter) || 0;
    const H = parseFloat(height) || 0;
    const n = Math.max(0, parseInt(gables, 10) || 0);
    const gb = parseFloat(gableBase) || 0;
    const gr = parseFloat(gableRise) || 0;
    const O = parseFloat(openings) || 0;
    const w = Math.min(50, Math.max(0, parseFloat(waste) || 0));

    const walls = P * H;
    const gableArea = n * ((gb * gr) / 2);
    const net = Math.max(0, walls + gableArea - O);
    const withWaste = net * (1 + w / 100);
    const squares = withWaste / 100;
    const squaresToOrder = Math.ceil(squares - 1e-9);
    const boxes = Math.ceil(withWaste / BOX_COVERAGE_SQFT - 1e-9);

    return {
      walls: Math.round(walls * 10) / 10,
      gableArea: Math.round(gableArea * 10) / 10,
      net: Math.round(net * 10) / 10,
      withWaste: Math.round(withWaste * 10) / 10,
      squares: Math.round(squares * 100) / 100,
      squaresToOrder,
      boxes,
      wastePct: w,
    };
  }, [perimeter, height, gables, gableBase, gableRise, openings, waste]);

  return (
    <div className="card">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <NumField label="Wall perimeter" value={perimeter} onChange={setPerimeter} hint="feet, all walls" />
        <NumField label="Wall height" value={height} onChange={setHeight} hint="feet" />
        <NumField label="Gable ends" value={gables} onChange={setGables} hint="triangular tops" />
        <NumField label="Gable base" value={gableBase} onChange={setGableBase} hint="feet wide" />
        <NumField label="Gable rise" value={gableRise} onChange={setGableRise} hint="feet tall" />
        <NumField label="Doors/windows area" value={openings} onChange={setOpenings} hint="sq ft" />
        <NumField label="Waste allowance" value={waste} onChange={setWaste} hint="%, 10 typical" />
      </div>

      <div className="mt-6 rounded-xl bg-slate-900 p-5 text-white">
        <p className="text-sm uppercase tracking-wide text-slate-400">
          You need
        </p>
        <p className="mt-1 text-5xl font-bold text-orange-400">
          {result.squaresToOrder}{" "}
          <span className="text-2xl font-semibold text-slate-300">squares</span>
        </p>
        <div className="mt-4 grid gap-3 text-sm sm:grid-cols-3">
          <div className="rounded-lg bg-slate-800 p-3">
            <p className="text-slate-400">Wall area + waste</p>
            <p className="mt-1 text-2xl font-bold">{result.withWaste.toLocaleString()} sq ft</p>
          </div>
          <div className="rounded-lg bg-slate-800 p-3">
            <p className="text-slate-400">Exact squares</p>
            <p className="mt-1 text-2xl font-bold">{result.squares}</p>
          </div>
          <div className="rounded-lg bg-slate-800 p-3">
            <p className="text-slate-400">Boxes (~200 sq ft)</p>
            <p className="mt-1 text-2xl font-bold">{result.boxes}</p>
          </div>
        </div>
        <p className="mt-4 text-xs leading-relaxed text-slate-400">
          Steps: {result.walls} walls + {result.gableArea} gables − openings ={" "}
          {result.net} sq ft × (1 + {result.wastePct}% waste) = {result.withWaste}{" "}
          sq ft ÷ 100 = {result.squares} squares, rounded up. One square = 100
          sq ft.
        </p>
      </div>

      <div className="mt-6">
        <CostEstimator
          lines={[
            { id: "siding", label: "Siding", quantity: result.squaresToOrder, unit: "squares", pricePlaceholder: "250.00" },
          ]}
        />
      </div>
    </div>
  );
}
