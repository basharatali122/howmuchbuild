"use client";

import { useMemo, useState } from "react";
import CostEstimator from "@/components/CostEstimator";

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

const round1 = (n) => Math.round(n * 10) / 10;
const round2 = (n) => Math.round(n * 100) / 100;

export default function RoofPitchCalculator() {
  const [tab, setTab] = useState("pitch");

  const [rise, setRise] = useState("6");
  const [run, setRun] = useState("12");

  const [pitchX, setPitchX] = useState("6");
  const [run2, setRun2] = useState("12");

  // Mode 1: rise + run -> pitch, angle, rafter length
  const fromRiseRun = useMemo(() => {
    const r = parseFloat(rise) || 0;
    const rn = parseFloat(run) || 0;
    if (rn <= 0) return null;
    const pitch = (r / rn) * 12;
    const angle = (Math.atan(r / rn) * 180) / Math.PI;
    const rafter = Math.sqrt(r * r + rn * rn);
    return { pitch: round2(pitch), angle: round2(angle), rafter: round2(rafter), rise: r, run: rn };
  }, [rise, run]);

  // Mode 2: pitch (x/12) + run -> rise, rafter, angle
  const fromPitch = useMemo(() => {
    const x = parseFloat(pitchX) || 0;
    const rn = parseFloat(run2) || 0;
    if (rn <= 0) return null;
    const r = (x / 12) * rn;
    const angle = (Math.atan(r / rn) * 180) / Math.PI;
    const rafter = Math.sqrt(r * r + rn * rn);
    return { rise: round2(r), angle: round2(angle), rafter: round2(rafter), pitchX: x, run: rn };
  }, [pitchX, run2]);

  return (
    <div className="card">
      <div className="mb-6 flex flex-wrap gap-2">
        <TabButton active={tab === "pitch"} onClick={() => setTab("pitch")}>
          Find pitch
        </TabButton>
        <TabButton active={tab === "rafter"} onClick={() => setTab("rafter")}>
          Rafter length
        </TabButton>
      </div>

      {tab === "pitch" && (
        <div className="grid gap-4 sm:grid-cols-2">
          <NumField label="Rise" value={rise} onChange={setRise} hint="feet (or any unit)" />
          <NumField label="Run" value={run} onChange={setRun} hint="feet (same unit)" />
        </div>
      )}

      {tab === "rafter" && (
        <div className="grid gap-4 sm:grid-cols-2">
          <NumField label="Roof pitch" value={pitchX} onChange={setPitchX} hint="x in 12 (e.g. 6)" />
          <NumField label="Run" value={run2} onChange={setRun2} hint="feet" />
        </div>
      )}

      <div className="mt-6 rounded-xl bg-slate-900 p-5 text-white">
        {tab === "pitch" && fromRiseRun && (
          <>
            <p className="text-sm uppercase tracking-wide text-slate-400">
              Roof pitch
            </p>
            <p className="mt-1 text-5xl font-bold text-orange-400">
              {fromRiseRun.pitch}
              <span className="text-2xl font-semibold text-slate-300"> / 12</span>
            </p>
            <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
              <div className="rounded-lg bg-slate-800 p-3">
                <p className="text-slate-400">Angle</p>
                <p className="mt-1 text-2xl font-bold">{fromRiseRun.angle}°</p>
              </div>
              <div className="rounded-lg bg-slate-800 p-3">
                <p className="text-slate-400">Rafter length</p>
                <p className="mt-1 text-2xl font-bold">{fromRiseRun.rafter} ft</p>
              </div>
            </div>
            <p className="mt-4 text-xs leading-relaxed text-slate-400">
              Steps: pitch = {fromRiseRun.rise} ÷ {fromRiseRun.run} × 12; angle
              = arctan(rise ÷ run); rafter = √(rise² + run²).
            </p>
          </>
        )}
        {tab === "rafter" && fromPitch && (
          <>
            <p className="text-sm uppercase tracking-wide text-slate-400">
              Rafter length
            </p>
            <p className="mt-1 text-5xl font-bold text-orange-400">
              {fromPitch.rafter}{" "}
              <span className="text-2xl font-semibold text-slate-300">ft</span>
            </p>
            <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
              <div className="rounded-lg bg-slate-800 p-3">
                <p className="text-slate-400">Total rise</p>
                <p className="mt-1 text-2xl font-bold">{fromPitch.rise} ft</p>
              </div>
              <div className="rounded-lg bg-slate-800 p-3">
                <p className="text-slate-400">Angle</p>
                <p className="mt-1 text-2xl font-bold">{fromPitch.angle}°</p>
              </div>
            </div>
            <p className="mt-4 text-xs leading-relaxed text-slate-400">
              Steps: rise = {fromPitch.pitchX} ÷ 12 × {fromPitch.run} ft;
              rafter = √(rise² + run²). Add overhang separately.
            </p>
          </>
        )}
        <p className="mt-2 text-xs leading-relaxed text-amber-300/90">
          Planning math only — rafter length here is the theoretical slope
          length. Real cuts need ridge and birdsmouth adjustments per your
          framing plan.
        </p>
      </div>

      <div className="mt-6">
        <CostEstimator
          lines={[
            { id: "rafters", label: "Rafters (by linear foot)", quantity: tab === "rafter" && fromPitch ? fromPitch.rafter : fromRiseRun ? fromRiseRun.rafter : 0, unit: "ft", pricePlaceholder: "3.00" },
          ]}
        />
      </div>
    </div>
  );
}
