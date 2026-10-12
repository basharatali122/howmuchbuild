"use client";

import { useMemo, useState } from "react";
import CostEstimator from "@/components/CostEstimator";

const NOMINAL_ACTUAL = [
  ["2×4", "1½ × 3½"],
  ["2×6", "1½ × 5½"],
  ["2×8", "1½ × 7¼"],
  ["2×10", "1½ × 9¼"],
  ["2×12", "1½ × 11¼"],
  ["4×4", "3½ × 3½"],
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

export default function LumberCalculator() {
  const [tab, setTab] = useState("boardfeet");

  // Board-feet tab
  const [pieces, setPieces] = useState("10");
  const [thick, setThick] = useState("2");
  const [wide, setWide] = useState("4");
  const [lenFt, setLenFt] = useState("8");

  // Wall framing tab
  const [wallLen, setWallLen] = useState("20");
  const [spacing, setSpacing] = useState("16");
  const [studSize, setStudSize] = useState("2×4");

  // Boards tab
  const [runLen, setRunLen] = useState("16");
  const [boardW, setBoardW] = useState("5.5");
  const [gap, setGap] = useState("0.25");
  const [boardLen, setBoardLen] = useState("8");

  const bf = useMemo(() => {
    const n = parseFloat(pieces) || 0;
    const t = parseFloat(thick) || 0;
    const w = parseFloat(wide) || 0;
    const l = parseFloat(lenFt) || 0;
    const boardFeet = (n * t * w * l) / 12;
    const linearFeet = n * l;
    return { boardFeet: Math.round(boardFeet * 100) / 100, linearFeet: Math.round(linearFeet * 100) / 100, pieces: n };
  }, [pieces, thick, wide, lenFt]);

  const wall = useMemo(() => {
    const L = parseFloat(wallLen) || 0;
    const s = parseFloat(spacing) || 16;
    const studs = Math.ceil(((L * 12) / s - 1e-9)) + 1;
    const platesLf = Math.round(L * 3 * 10) / 10; // bottom + double top plate
    return { studs, platesLf };
  }, [wallLen, spacing]);

  const boards = useMemo(() => {
    const run = parseFloat(runLen) || 0;
    const w = parseFloat(boardW) || 0;
    const g = parseFloat(gap) || 0;
    const bl = parseFloat(boardLen) || 0;
    const count = w + g > 0 ? Math.ceil(((run * 12) / (w + g) - 1e-9)) : 0;
    const linearFeet = Math.round(count * bl * 10) / 10;
    return { count, linearFeet };
  }, [runLen, boardW, gap, boardLen]);

  const costLines =
    tab === "boardfeet"
      ? [
          { id: "lumber", label: "Lumber", quantity: bf.pieces, unit: "pieces", pricePlaceholder: "8.00" },
        ]
      : tab === "wall"
        ? [
            { id: "studs", label: `Studs (${studSize})`, quantity: wall.studs, unit: "studs", pricePlaceholder: "5.00" },
            { id: "plates", label: "Plates (linear ft)", quantity: wall.platesLf, unit: "ft", pricePlaceholder: "1.20" },
          ]
        : [
            { id: "boards", label: "Boards", quantity: boards.count, unit: "boards", pricePlaceholder: "12.00" },
          ];

  return (
    <div className="card">
      <div className="mb-6 flex flex-wrap gap-2">
        <TabButton active={tab === "boardfeet"} onClick={() => setTab("boardfeet")}>
          Board feet
        </TabButton>
        <TabButton active={tab === "wall"} onClick={() => setTab("wall")}>
          Wall framing
        </TabButton>
        <TabButton active={tab === "boards"} onClick={() => setTab("boards")}>
          Boards for a run
        </TabButton>
      </div>

      {tab === "boardfeet" && (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <NumField label="Pieces" value={pieces} onChange={setPieces} hint="count" />
            <NumField label="Thickness" value={thick} onChange={setThick} hint="inches (nominal)" />
            <NumField label="Width" value={wide} onChange={setWide} hint="inches (nominal)" />
            <NumField label="Length" value={lenFt} onChange={setLenFt} hint="feet" />
          </div>
          <div className="mt-6 rounded-xl bg-slate-900 p-5 text-white">
            <p className="text-sm uppercase tracking-wide text-slate-400">You need</p>
            <p className="mt-1 text-5xl font-bold text-orange-400">
              {bf.boardFeet.toLocaleString()}{" "}
              <span className="text-2xl font-semibold text-slate-300">board feet</span>
            </p>
            <p className="mt-3 text-sm text-slate-300">
              = {bf.linearFeet.toLocaleString()} linear feet total
            </p>
            <p className="mt-4 text-xs leading-relaxed text-slate-400">
              Board feet = (thickness × width × length × pieces) ÷ 12, with
              thickness and width in inches and length in feet. One board foot
              is a 12″ × 12″ × 1″ volume of wood.
            </p>
          </div>
        </>
      )}

      {tab === "wall" && (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <NumField label="Wall length" value={wallLen} onChange={setWallLen} hint="feet" />
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Stud spacing
              </label>
              <select
                value={spacing}
                onChange={(e) => setSpacing(e.target.value)}
                className="w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-center"
              >
                <option value="16">16 in on center</option>
                <option value="24">24 in on center</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Stud size
              </label>
              <select
                value={studSize}
                onChange={(e) => setStudSize(e.target.value)}
                className="w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-center"
              >
                <option value="2×4">2×4</option>
                <option value="2×6">2×6</option>
              </select>
            </div>
          </div>
          <div className="mt-6 rounded-xl bg-slate-900 p-5 text-white">
            <p className="text-sm uppercase tracking-wide text-slate-400">You need</p>
            <p className="mt-1 text-5xl font-bold text-orange-400">
              {wall.studs} <span className="text-2xl font-semibold text-slate-300">studs</span>
            </p>
            <p className="mt-3 text-sm text-slate-300">
              + {wall.platesLf} linear feet of plate stock (bottom plate + double top plate)
            </p>
            <p className="mt-4 text-xs leading-relaxed text-slate-400">
              Studs = ⌈(wall length in inches ÷ spacing)⌉ + 1 end stud. Add
              extra studs for corners, door/window openings, and headers —
              this is the field count, not the full framing takeoff.
            </p>
          </div>
        </>
      )}

      {tab === "boards" && (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <NumField label="Run to cover" value={runLen} onChange={setRunLen} hint="feet" />
            <NumField label="Board width" value={boardW} onChange={setBoardW} hint="inches (actual)" />
            <NumField label="Gap between boards" value={gap} onChange={setGap} hint="inches" />
            <NumField label="Board length" value={boardLen} onChange={setBoardLen} hint="feet" />
          </div>
          <div className="mt-6 rounded-xl bg-slate-900 p-5 text-white">
            <p className="text-sm uppercase tracking-wide text-slate-400">You need</p>
            <p className="mt-1 text-5xl font-bold text-orange-400">
              {boards.count} <span className="text-2xl font-semibold text-slate-300">boards</span>
            </p>
            <p className="mt-3 text-sm text-slate-300">
              = {boards.linearFeet.toLocaleString()} linear feet total
            </p>
            <p className="mt-4 text-xs leading-relaxed text-slate-400">
              Boards = ⌈(run in inches ÷ (board width + gap))⌉, rounded up.
              Use the <em>actual</em> board width (a nominal 6-in deck board
              is 5½ in) — the table below converts nominal to actual.
            </p>
          </div>
        </>
      )}

      <div className="mt-6 overflow-x-auto">
        <table className="w-full max-w-md text-sm">
          <caption className="mb-2 text-left font-semibold text-slate-700">
            Nominal vs. actual lumber sizes (inches)
          </caption>
          <thead>
            <tr className="border-b border-stone-200 text-left text-slate-500">
              <th className="py-2 pr-4 font-medium">Nominal</th>
              <th className="py-2 font-medium">Actual</th>
            </tr>
          </thead>
          <tbody>
            {NOMINAL_ACTUAL.map(([n, a]) => (
              <tr key={n} className="border-b border-stone-100">
                <td className="py-1.5 pr-4">{n}</td>
                <td className="py-1.5">{a}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6">
        <CostEstimator lines={costLines} />
      </div>
    </div>
  );
}
