"use client";

import { useMemo, useState } from "react";
import CostEstimator from "@/components/CostEstimator";

/**
 * US modular brick with 3/8-in mortar joints: nominal face 8 in x 2-2/3 in
 * = 21.33 sq in = 0.1481 sq ft -> 1 / 0.1481 = 6.75 bricks per sq ft.
 * Published standard figure.
 */
const BRICKS_PER_SQFT = 6.75;
/** 80-lb bag of Type N mortar lays roughly 40 standard bricks (estimate). */
const BRICKS_PER_MORTAR_BAG = 40;
/** Nominal brick length with joint, in inches, for the fire-pit ring mode. */
const BRICK_NOMINAL_LENGTH_IN = 8;

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

export default function BrickCalculator() {
  const [tab, setTab] = useState("wall");

  const [length, setLength] = useState("20");
  const [height, setHeight] = useState("4");
  const [openings, setOpenings] = useState("0");
  const [waste, setWaste] = useState(7);

  const [diameter, setDiameter] = useState("36");
  const [courses, setCourses] = useState("3");

  const wall = useMemo(() => {
    const L = parseFloat(length) || 0;
    const H = parseFloat(height) || 0;
    const O = parseFloat(openings) || 0;
    const w = Math.min(50, Math.max(0, parseFloat(waste) || 0));
    const net = Math.max(0, L * H - O);
    const raw = net * BRICKS_PER_SQFT;
    const bricks = Math.ceil(raw * (1 + w / 100) - 1e-9);
    const mortarBags = Math.ceil(bricks / BRICKS_PER_MORTAR_BAG - 1e-9);
    return { net: Math.round(net * 10) / 10, raw: Math.round(raw * 10) / 10, bricks, mortarBags, wastePct: w };
  }, [length, height, openings, waste]);

  const pit = useMemo(() => {
    const D = parseFloat(diameter) || 0;
    const C = parseFloat(courses) || 0;
    const circumference = Math.PI * D;
    const perCourse = Math.ceil(circumference / BRICK_NOMINAL_LENGTH_IN - 1e-9);
    const bricks = Math.ceil(perCourse * C - 1e-9);
    const mortarBags = Math.ceil(bricks / BRICKS_PER_MORTAR_BAG - 1e-9);
    return { perCourse, bricks, mortarBags, circumference: Math.round(circumference * 10) / 10 };
  }, [diameter, courses]);

  const active = tab === "wall" ? wall : pit;

  return (
    <div className="card">
      <div className="mb-6 flex flex-wrap gap-2">
        <TabButton active={tab === "wall"} onClick={() => setTab("wall")}>
          Brick wall
        </TabButton>
        <TabButton active={tab === "firepit"} onClick={() => setTab("firepit")}>
          Fire-pit ring
        </TabButton>
      </div>

      {tab === "wall" && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <NumField label="Wall length" value={length} onChange={setLength} hint="feet" />
          <NumField label="Wall height" value={height} onChange={setHeight} hint="feet" />
          <NumField label="Openings area" value={openings} onChange={setOpenings} hint="sq ft" />
          <NumField label="Waste allowance" value={waste} onChange={setWaste} hint="%" />
        </div>
      )}

      {tab === "firepit" && (
        <div className="grid gap-4 sm:grid-cols-2">
          <NumField label="Inside diameter" value={diameter} onChange={setDiameter} hint="inches" />
          <NumField label="Courses high" value={courses} onChange={setCourses} hint="layers of brick" />
        </div>
      )}

      <div className="mt-6 rounded-xl bg-slate-900 p-5 text-white">
        <p className="text-sm uppercase tracking-wide text-slate-400">
          You need
        </p>
        <p className="mt-1 text-5xl font-bold text-orange-400">
          {active.bricks.toLocaleString()}{" "}
          <span className="text-2xl font-semibold text-slate-300">bricks</span>
        </p>
        <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
          <div className="rounded-lg bg-slate-800 p-3">
            <p className="text-slate-400">Mortar (80-lb bags, est.)</p>
            <p className="mt-1 text-2xl font-bold">{active.mortarBags}</p>
          </div>
          <div className="rounded-lg bg-slate-800 p-3">
            <p className="text-slate-400">
              {tab === "wall" ? "Net wall area" : "Bricks per course"}
            </p>
            <p className="mt-1 text-2xl font-bold">
              {tab === "wall" ? `${wall.net} sq ft` : pit.perCourse}
            </p>
          </div>
        </div>
        <p className="mt-4 text-xs leading-relaxed text-slate-400">
          {tab === "wall"
            ? `Steps: ${wall.net} sq ft × 6.75 bricks/sq ft = ${wall.raw} + ${wall.wastePct}% waste, rounded up. US modular brick with ⅜-in mortar joints.`
            : `Steps: circumference π × ${diameter}″ = ${pit.circumference}″ ÷ 8″ nominal brick = ${pit.perCourse} bricks/course × ${courses} courses, rounded up per course.`}
        </p>
        {tab === "firepit" && (
          <p className="mt-2 text-xs leading-relaxed text-amber-300/90">
            Fire-pit note: use fire-rated refractory mortar for the inner
            courses that face direct flame — standard Type N is for the outer
            shell only.
          </p>
        )}
      </div>

      <div className="mt-6">
        <CostEstimator
          lines={[
            { id: "bricks", label: "Bricks (US modular)", quantity: active.bricks, unit: "bricks", pricePlaceholder: "0.65" },
            { id: "mortar", label: "Mortar mix (80-lb bags)", quantity: active.mortarBags, unit: "bags", pricePlaceholder: "9.00" },
          ]}
        />
      </div>
    </div>
  );
}
