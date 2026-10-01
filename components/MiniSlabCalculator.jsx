/**
 * MiniSlabCalculator — compact concrete slab → bags widget for the homepage
 * hero. Self-contained live demo; yields come from lib/concreteMath.js.
 * Links out to the full /concrete-bags-calculator for more modes.
 */
"use client";

import { useState } from "react";
import Link from "next/link";
import { BAG_YIELDS_CU_FT } from "@/lib/concreteMath";

const BAG_SIZES = [80, 60, 40];

export default function MiniSlabCalculator() {
  const [length, setLength] = useState("10");
  const [width, setWidth] = useState("10");
  const [thickness, setThickness] = useState("4");

  const l = parseFloat(length) || 0;
  const w = parseFloat(width) || 0;
  const tIn = parseFloat(thickness) || 0;
  const cuFt = l * w * (tIn / 12);

  const bags = BAG_SIZES.map((size) => ({
    size,
    count: cuFt > 0 ? Math.ceil(cuFt / BAG_YIELDS_CU_FT[size] - 1e-9) : 0,
  }));

  const inputCls = "w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-slate-900";

  return (
    <div className="rounded-2xl border border-white/10 bg-white p-6 text-left shadow-2xl">
      <p className="eyebrow">Live demo</p>
      <h2 className="mt-1 text-xl text-slate-900">Try it: slab in seconds</h2>

      <div className="mt-4 grid grid-cols-3 gap-3">
        <label className="block">
          <span className="mb-1 block text-xs font-medium text-slate-500">
            Length (ft)
          </span>
          <input
            type="number"
            min="0"
            value={length}
            onChange={(e) => setLength(e.target.value)}
            className={inputCls}
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-xs font-medium text-slate-500">
            Width (ft)
          </span>
          <input
            type="number"
            min="0"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
            className={inputCls}
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-xs font-medium text-slate-500">
            Thick (in)
          </span>
          <input
            type="number"
            min="0"
            value={thickness}
            onChange={(e) => setThickness(e.target.value)}
            className={inputCls}
          />
        </label>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3">
        {bags.map((b) => (
          <div
            key={b.size}
            className="rounded-xl bg-stone-100 px-3 py-3 text-center"
          >
            <p className="text-2xl font-bold text-slate-900">{b.count}</p>
            <p className="mt-0.5 text-xs text-slate-500">{b.size}-lb bags</p>
          </div>
        ))}
      </div>
      <p className="mt-3 text-xs text-slate-500">
        Rounded up. Add ~10% waste for uneven ground — the full calculator
        handles that.
      </p>

      <Link
        href="/concrete-bags-calculator"
        className="btn-primary mt-4 w-full text-sm"
      >
        Open the full calculator →
      </Link>
    </div>
  );
}
