"use client";

import { useMemo, useState } from "react";
import CostEstimator from "@/components/CostEstimator";

/**
 * One 8x8x16-in nominal block (block + one 3/8-in mortar joint) covers
 * (16/12) x (8/12) = 0.889 sq ft of wall face, so 1 / 0.889 = 1.125
 * blocks per sq ft. Published standard figure.
 */
const BLOCKS_PER_SQFT = 1.125;
/** 80-lb bag of Type S mortar lays roughly 25 standard 8x8x16 blocks (estimate). */
const BLOCKS_PER_MORTAR_BAG = 25;
/** Standard pallet holds about 90 8x8x16 blocks. */
const BLOCKS_PER_PALLET = 90;

function NumField({ label, value, onChange, hint, min = "0" }) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-slate-700">
        {label}
      </label>
      <input
        type="number"
        min={min}
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

export default function ConcreteBlockCalculator() {
  const [length, setLength] = useState("20");
  const [height, setHeight] = useState("4");
  const [openings, setOpenings] = useState("0");
  const [width, setWidth] = useState("8");
  const [waste, setWaste] = useState(5);

  const calc = useMemo(() => {
    const L = parseFloat(length) || 0;
    const H = parseFloat(height) || 0;
    const O = parseFloat(openings) || 0;
    const w = Math.min(50, Math.max(0, parseFloat(waste) || 0));
    const gross = L * H;
    const net = Math.max(0, gross - O);
    const rawBlocks = net * BLOCKS_PER_SQFT;
    const withWaste = rawBlocks * (1 + w / 100);
    const blocks = Math.ceil(withWaste - 1e-9);
    const mortarBags = Math.ceil(blocks / BLOCKS_PER_MORTAR_BAG - 1e-9);
    const pallets = Math.ceil(blocks / BLOCKS_PER_PALLET - 1e-9);
    return { gross, net, rawBlocks, blocks, mortarBags, pallets, wastePct: w };
  }, [length, height, openings, width, waste]);

  return (
    <div className="card">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <NumField label="Wall length" value={length} onChange={setLength} hint="feet" />
        <NumField label="Wall height" value={height} onChange={setHeight} hint="feet" />
        <NumField
          label="Openings area"
          value={openings}
          onChange={setOpenings}
          hint="sq ft (doors, windows)"
        />
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Block width
          </label>
          <select
            value={width}
            onChange={(e) => setWidth(e.target.value)}
            className="w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-center"
          >
            <option value="4">4 in</option>
            <option value="6">6 in</option>
            <option value="8">8 in (standard)</option>
            <option value="12">12 in</option>
          </select>
          <p className="mt-1 text-center text-xs text-slate-400">nominal</p>
        </div>
        <NumField
          label="Waste allowance"
          value={waste}
          onChange={setWaste}
          hint="%"
          min="0"
        />
      </div>

      <div className="mt-6 rounded-xl bg-slate-900 p-5 text-white">
        <p className="text-sm uppercase tracking-wide text-slate-400">
          You need
        </p>
        <p className="mt-1 text-5xl font-bold text-orange-400">
          {calc.blocks.toLocaleString()}{" "}
          <span className="text-2xl font-semibold text-slate-300">blocks</span>
        </p>
        <div className="mt-4 grid gap-3 text-sm sm:grid-cols-3">
          <div className="rounded-lg bg-slate-800 p-3">
            <p className="text-slate-400">Mortar (80-lb bags, est.)</p>
            <p className="mt-1 text-2xl font-bold">{calc.mortarBags}</p>
          </div>
          <div className="rounded-lg bg-slate-800 p-3">
            <p className="text-slate-400">Pallets (≈90 blocks each)</p>
            <p className="mt-1 text-2xl font-bold">{calc.pallets}</p>
          </div>
          <div className="rounded-lg bg-slate-800 p-3">
            <p className="text-slate-400">Net wall area</p>
            <p className="mt-1 text-2xl font-bold">
              {Math.round(calc.net * 10) / 10} sq ft
            </p>
          </div>
        </div>
        <p className="mt-4 text-xs leading-relaxed text-slate-400">
          Steps: {Math.round(calc.gross * 10) / 10} sq ft gross −{" "}
          {parseFloat(openings) || 0} sq ft openings ={" "}
          {Math.round(calc.net * 10) / 10} sq ft × 1.125 blocks/sq ft ={" "}
          {Math.round(calc.rawBlocks * 10) / 10} + {calc.wastePct}% waste, rounded
          up. Standard 8×8×16-in nominal block with ⅜-in mortar joints.
        </p>
      </div>

      <div className="mt-6">
        <CostEstimator
          lines={[
            { id: "blocks", label: `Concrete blocks (${width}-in)`, quantity: calc.blocks, unit: "blocks", pricePlaceholder: "2.50" },
            { id: "mortar", label: "Mortar mix (80-lb bags)", quantity: calc.mortarBags, unit: "bags", pricePlaceholder: "9.00" },
          ]}
        />
      </div>
    </div>
  );
}
