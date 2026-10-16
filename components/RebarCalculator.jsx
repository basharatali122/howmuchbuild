"use client";

import { useMemo, useState } from "react";
import CostEstimator from "@/components/CostEstimator";

/**
 * Rebar weight in lb per linear foot, by bar number.
 * Published standard values (#3 to #11).
 */
const BAR_WEIGHTS = {
  3: 0.376,
  4: 0.668,
  5: 1.043,
  6: 1.502,
  7: 2.044,
  8: 2.67,
  9: 3.4,
  10: 4.303,
  11: 5.313,
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

export default function RebarCalculator() {
  const [tab, setTab] = useState("slab");

  const [slabL, setSlabL] = useState("20");
  const [slabW, setSlabW] = useState("20");
  const [spacing, setSpacing] = useState("18");
  const [barSize, setBarSize] = useState("4");
  const [lap, setLap] = useState("5");

  const [trenchL, setTrenchL] = useState("40");
  const [barsPer, setBarsPer] = useState("3");

  const barOptions = Object.keys(BAR_WEIGHTS).map((n) => ({
    value: n,
    label: `#${n} (${BAR_WEIGHTS[n]} lb/ft)`,
  }));

  const slab = useMemo(() => {
    const L = parseFloat(slabL) || 0;
    const W = parseFloat(slabW) || 0;
    const s = parseFloat(spacing) || 1;
    const lapPct = Math.min(50, Math.max(0, parseFloat(lap) || 0));
    const wt = BAR_WEIGHTS[barSize] || 0;
    const n1 = Math.floor((W * 12) / s) + 1;
    const n2 = Math.floor((L * 12) / s) + 1;
    const rawLF = n1 * L + n2 * W;
    const totalLF = Math.round(rawLF * (1 + lapPct / 100) * 10) / 10;
    const weightLb = Math.round(totalLF * wt * 10) / 10;
    const tons = Math.round((weightLb / 2000) * 100) / 100;
    return { bars: n1 + n2, totalLF, weightLb, tons, lapPct };
  }, [slabL, slabW, spacing, barSize, lap]);

  const footing = useMemo(() => {
    const L = parseFloat(trenchL) || 0;
    const n = Math.max(1, Math.min(6, parseInt(barsPer, 10) || 0));
    const lapPct = Math.min(50, Math.max(0, parseFloat(lap) || 0));
    const wt = BAR_WEIGHTS[barSize] || 0;
    const rawLF = L * n;
    const totalLF = Math.round(rawLF * (1 + lapPct / 100) * 10) / 10;
    const weightLb = Math.round(totalLF * wt * 10) / 10;
    const tons = Math.round((weightLb / 2000) * 100) / 100;
    return { bars: n, totalLF, weightLb, tons, lapPct };
  }, [trenchL, barsPer, barSize, lap]);

  const active = tab === "slab" ? slab : footing;

  return (
    <div className="card">
      <div className="mb-6 flex flex-wrap gap-2">
        <TabButton active={tab === "slab"} onClick={() => setTab("slab")}>
          Slab grid
        </TabButton>
        <TabButton active={tab === "footing"} onClick={() => setTab("footing")}>
          Footing
        </TabButton>
      </div>

      {tab === "slab" && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <NumField label="Slab length" value={slabL} onChange={setSlabL} hint="feet" />
          <NumField label="Slab width" value={slabW} onChange={setSlabW} hint="feet" />
          <NumField label="Bar spacing" value={spacing} onChange={setSpacing} hint="inches on center" />
          <SelectField label="Bar size" value={barSize} onChange={setBarSize} options={barOptions} hint="weight per foot" />
          <NumField label="Lap allowance" value={lap} onChange={setLap} hint="% for overlaps" />
        </div>
      )}

      {tab === "footing" && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <NumField label="Trench length" value={trenchL} onChange={setTrenchL} hint="feet" />
          <NumField label="Bars per footing" value={barsPer} onChange={setBarsPer} hint="usually 2-4" />
          <SelectField label="Bar size" value={barSize} onChange={setBarSize} options={barOptions} hint="weight per foot" />
          <NumField label="Lap allowance" value={lap} onChange={setLap} hint="% for overlaps" />
        </div>
      )}

      <div className="mt-6 rounded-xl bg-slate-900 p-5 text-white">
        <p className="text-sm uppercase tracking-wide text-slate-400">
          You need
        </p>
        <p className="mt-1 text-5xl font-bold text-orange-400">
          {active.weightLb.toLocaleString()}{" "}
          <span className="text-2xl font-semibold text-slate-300">lb of rebar</span>
        </p>
        <div className="mt-4 grid gap-3 text-sm sm:grid-cols-3">
          <div className="rounded-lg bg-slate-800 p-3">
            <p className="text-slate-400">#{barSize} bars</p>
            <p className="mt-1 text-2xl font-bold">{active.bars}</p>
          </div>
          <div className="rounded-lg bg-slate-800 p-3">
            <p className="text-slate-400">Total length</p>
            <p className="mt-1 text-2xl font-bold">{active.totalLF.toLocaleString()} ft</p>
          </div>
          <div className="rounded-lg bg-slate-800 p-3">
            <p className="text-slate-400">Weight</p>
            <p className="mt-1 text-2xl font-bold">{active.tons} tons</p>
          </div>
        </div>
        <p className="mt-4 text-xs leading-relaxed text-slate-400">
          {tab === "slab"
            ? `Steps: bars each way = floor(span ÷ spacing) + 1, total length × (1 + ${active.lapPct}% lap) = ${active.totalLF} ft × ${BAR_WEIGHTS[barSize]} lb/ft (#${barSize}).`
            : `Steps: ${trenchL || 0} ft × ${active.bars} bars × (1 + ${active.lapPct}% lap) = ${active.totalLF} ft × ${BAR_WEIGHTS[barSize]} lb/ft (#${barSize}).`}
        </p>
        <p className="mt-2 text-xs leading-relaxed text-amber-300/90">
          Planning estimate. Rebar size and spacing for structural work should
          follow your local building code or an engineer&apos;s spec — #4 at
          18 in on center is common for residential slabs, not a rule.
        </p>
      </div>

      <div className="mt-6">
        <CostEstimator
          lines={[
            { id: "rebar", label: `Rebar #${barSize} (20-ft sticks)`, quantity: Math.ceil(active.totalLF / 20 - 1e-9), unit: "sticks", pricePlaceholder: "12.00" },
          ]}
        />
      </div>
    </div>
  );
}
