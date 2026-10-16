"use client";

import { useMemo, useState } from "react";
import CostEstimator from "@/components/CostEstimator";

/** Most US codes: a 4-inch sphere must not pass between balusters. */
const CODE_MAX_GAP_IN = 4;

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

export default function BalusterCalculator() {
  const [tab, setTab] = useState("level");

  const [lengthFt, setLengthFt] = useState("8");
  const [balusterW, setBalusterW] = useState("1.5");
  const [maxGap, setMaxGap] = useState("4");

  const result = useMemo(() => {
    const L = (parseFloat(lengthFt) || 0) * 12;
    const w = parseFloat(balusterW) || 0;
    const g = Math.min(6, Math.max(1, parseFloat(maxGap) || CODE_MAX_GAP_IN));
    let n = 0;
    let gap = 0;
    if (L > 0 && w >= 0) {
      n = Math.max(1, Math.floor((L + g) / (w + g)));
      gap = (L - n * w) / (n + 1);
    }
    const passes = gap <= CODE_MAX_GAP_IN + 1e-9;
    return {
      count: n,
      gap: Math.round(gap * 100) / 100,
      passes,
      totalIn: Math.round(L * 10) / 10,
    };
  }, [lengthFt, balusterW, maxGap]);

  return (
    <div className="card">
      <div className="mb-6 flex flex-wrap gap-2">
        <TabButton active={tab === "level"} onClick={() => setTab("level")}>
          Level railing
        </TabButton>
        <TabButton active={tab === "stair"} onClick={() => setTab("stair")}>
          Stair railing
        </TabButton>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <NumField
          label={tab === "level" ? "Railing length" : "Stair run length"}
          value={lengthFt}
          onChange={setLengthFt}
          hint={tab === "level" ? "feet, post to post" : "feet, horizontal run"}
        />
        <NumField label="Baluster width" value={balusterW} onChange={setBalusterW} hint="inches (2x2 = 1.5)" />
        <NumField label="Max allowed gap" value={maxGap} onChange={setMaxGap} hint="inches (code: 4)" />
      </div>

      <div className="mt-6 rounded-xl bg-slate-900 p-5 text-white">
        <p className="text-sm uppercase tracking-wide text-slate-400">
          You need
        </p>
        <p className="mt-1 text-5xl font-bold text-orange-400">
          {result.count}{" "}
          <span className="text-2xl font-semibold text-slate-300">balusters</span>
        </p>
        <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
          <div className="rounded-lg bg-slate-800 p-3">
            <p className="text-slate-400">Even spacing between balusters</p>
            <p className="mt-1 text-2xl font-bold">{result.gap}&Prime;</p>
          </div>
          <div className="rounded-lg bg-slate-800 p-3">
            <p className="text-slate-400">4-inch sphere rule</p>
            <p
              className={`mt-1 text-2xl font-bold ${
                result.passes ? "text-emerald-400" : "text-red-400"
              }`}
            >
              {result.passes ? "Passes" : "Fails — check code"}
            </p>
          </div>
        </div>
        <p className="mt-4 text-xs leading-relaxed text-slate-400">
          Steps: {result.totalIn}&Prime; total ÷ ({balusterW || 0}&Prime;
          baluster + {maxGap || 0}&Prime; max gap) → {result.count} balusters,
          evenly spaced at {result.gap}&Prime; on center gaps.
        </p>
        {tab === "stair" && (
          <p className="mt-2 text-xs leading-relaxed text-amber-300/90">
            Stair note: measure the horizontal run and space balusters evenly
            along it. The 4-inch sphere rule also applies to the triangular
            openings at treads — many inspectors check those separately.
          </p>
        )}
      </div>

      <div className="mt-6">
        <CostEstimator
          lines={[
            { id: "balusters", label: "Balusters", quantity: result.count, unit: "balusters", pricePlaceholder: "4.50" },
          ]}
        />
      </div>
    </div>
  );
}
