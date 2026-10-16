"use client";

import { useMemo, useState } from "react";
import CostEstimator from "@/components/CostEstimator";

const R_VALUES = [
  { value: "13", label: "R-13 (walls, warm)" },
  { value: "15", label: "R-15 (walls)" },
  { value: "19", label: "R-19 (walls / floors)" },
  { value: "21", label: "R-21 (walls, cold)" },
  { value: "30", label: "R-30 (attic, warm)" },
  { value: "38", label: "R-38 (attic, moderate)" },
  { value: "49", label: "R-49 (attic, cold)" },
  { value: "60", label: "R-60 (attic, very cold)" },
];

const MATERIALS = [
  { value: "cellulose", label: "Blown-in cellulose", rPerInch: 3.5, unit: "bags", defaultCoverage: "30" },
  { value: "fiberglass", label: "Blown-in fiberglass", rPerInch: 2.5, unit: "bags", defaultCoverage: "30" },
  { value: "batts", label: "Fiberglass batts", rPerInch: 3.2, unit: "bags", defaultCoverage: "64" },
  { value: "foam-closed", label: "Closed-cell spray foam", rPerInch: 6.5, unit: "kits/board-ft", defaultCoverage: "200" },
  { value: "foam-open", label: "Open-cell spray foam", rPerInch: 3.6, unit: "kits/board-ft", defaultCoverage: "200" },
  { value: "foam-board", label: "Rigid foam board", rPerInch: 5.0, unit: "sheets (4×8)", defaultCoverage: "32" },
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

export default function InsulationCalculator() {
  const [area, setArea] = useState("1000");
  const [rValue, setRValue] = useState("49");
  const [material, setMaterial] = useState("cellulose");
  const [coverage, setCoverage] = useState("");

  const mat = MATERIALS.find((m) => m.value === material) || MATERIALS[0];
  const coverageValue = coverage === "" ? mat.defaultCoverage : coverage;

  const result = useMemo(() => {
    const A = parseFloat(area) || 0;
    const R = parseFloat(rValue) || 0;
    const cov = Math.max(0.01, parseFloat(coverageValue) || 1);
    const inches = R / mat.rPerInch;
    const units = Math.ceil(A / cov - 1e-9);
    return {
      inches: Math.round(inches * 10) / 10,
      units,
      area: A,
      rValue: R,
      rPerInch: mat.rPerInch,
      unitLabel: mat.unit,
      coverage: cov,
      usedDefault: coverage === "",
    };
  }, [area, rValue, material, coverageValue, mat, coverage]);

  return (
    <div className="card">
      <div className="grid gap-4 sm:grid-cols-2">
        <NumField label="Area to insulate" value={area} onChange={setArea} hint="square feet" />
        <SelectField label="Target R-value" value={rValue} onChange={setRValue} options={R_VALUES} hint="by climate zone" />
        <SelectField label="Material" value={material} onChange={setMaterial} options={MATERIALS} hint={`R-${mat.rPerInch} per inch`} />
        <NumField
          label="Coverage per bag"
          value={coverage}
          onChange={setCoverage}
          hint={`sq ft — default ${mat.defaultCoverage}, check your product`}
        />
      </div>

      <div className="mt-6 rounded-xl bg-slate-900 p-5 text-white">
        <div className="grid gap-3 text-sm sm:grid-cols-2">
          <div className="rounded-lg bg-slate-800 p-3">
            <p className="text-slate-400">Thickness needed</p>
            <p className="mt-1 text-4xl font-bold text-orange-400">
              {result.inches} <span className="text-xl text-slate-300">in</span>
            </p>
          </div>
          <div className="rounded-lg bg-slate-800 p-3">
            <p className="text-slate-400">To buy</p>
            <p className="mt-1 text-4xl font-bold text-orange-400">
              {result.units}{" "}
              <span className="text-xl text-slate-300">{result.unitLabel}</span>
            </p>
          </div>
        </div>
        <p className="mt-4 text-xs leading-relaxed text-slate-400">
          Steps: {result.rValue} ÷ R-{result.rPerInch}/in = {result.inches}{" "}
          inches; {result.area} sq ft ÷ {result.coverage} sq ft per bag ={" "}
          {result.units} {result.unitLabel}, rounded up. Bag coverage varies by
          product and depth — confirm against your bag's chart.
        </p>
      </div>

      <div className="mt-6">
        <CostEstimator
          lines={[
            { id: "insulation", label: "Insulation", quantity: result.units, unit: result.unitLabel, pricePlaceholder: "35.00" },
          ]}
        />
      </div>
    </div>
  );
}
