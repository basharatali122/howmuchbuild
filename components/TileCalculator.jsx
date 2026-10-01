/**
 * TileCalculator — how many floor tiles (and boxes) a room needs.
 *
 * Math basis:
 * - Area = length × width in feet (exact).
 * - Tile area: standard sizes in square inches ÷ 144 = sq ft (exact).
 * - Tiles = ceil(area ÷ tile area × (1 + waste)). Waste is guidance:
 *   10% standard, 15% for diagonal layouts or large-format tile.
 * - Boxes = ceil(tiles ÷ tiles per box) (exact arithmetic).
 * Everything rounded up — partial tiles and boxes don't exist at the register.
 */
"use client";

import { useMemo, useState } from "react";
import CostEstimator from "@/components/CostEstimator";

const round2 = (n) => Math.round(n * 100) / 100;

const TILE_SIZES = [
  { id: "12x12", label: "12″ × 12″", sqIn: 144 },
  { id: "12x24", label: "12″ × 24″", sqIn: 288 },
  { id: "18x18", label: "18″ × 18″", sqIn: 324 },
  { id: "24x24", label: "24″ × 24″", sqIn: 576 },
  { id: "custom", label: "Custom size…", sqIn: null },
];

function FeetField({ label, val, onFt, onIn }) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-slate-700">
        {label}
      </label>
      <div className="flex gap-2">
        <div className="flex-1">
          <input
            type="number"
            min="0"
            step="any"
            value={val.ft}
            onChange={(e) => onFt(e.target.value)}
            aria-label={`${label} (feet)`}
            className="text-center"
          />
          <p className="mt-1 text-center text-xs text-slate-400">ft</p>
        </div>
        <div className="flex-1">
          <input
            type="number"
            min="0"
            max="11"
            step="any"
            value={val.in}
            onChange={(e) => onIn(e.target.value)}
            aria-label={`${label} (inches)`}
            className="text-center"
          />
          <p className="mt-1 text-center text-xs text-slate-400">in</p>
        </div>
      </div>
    </div>
  );
}

/** Original hand-drawn diagram: tile grid with waste allowance note. */
function TileDiagram() {
  return (
    <svg
      viewBox="0 0 320 200"
      role="img"
      aria-label="Diagram of floor tiles laid in a grid with cut tiles at the edges"
      className="mx-auto h-auto w-full max-w-sm"
    >
      <rect x="40" y="20" width="240" height="150" fill="#f5f5f4" stroke="#57534e" strokeWidth="1.5" />
      {[100, 160, 220].map((x) => (
        <line key={x} x1={x} y1="20" x2={x} y2="170" stroke="#a8a29e" strokeWidth="1.5" />
      ))}
      {[65, 110, 155].map((y) => (
        <line key={y} x1="40" y1={y} x2="280" y2={y} stroke="#a8a29e" strokeWidth="1.5" />
      ))}
      {/* cut tiles at edge */}
      <polygon points="220,20 280,20 280,65 220,65" fill="#e7e5e4" stroke="#78716c" strokeWidth="1.2" strokeDasharray="5 3" />
      <text x="250" y="48" textAnchor="middle" fontSize="12" fill="#78716c">cuts</text>
      <text x="160" y="192" textAnchor="middle" fontSize="13" fill="#44403c" fontWeight="600">
        Tiles = ⌈ area ÷ tile size × (1 + waste) ⌉
      </text>
    </svg>
  );
}

export default function TileCalculator() {
  const [length, setLength] = useState({ ft: "10", in: "0" });
  const [width, setWidth] = useState({ ft: "12", in: "0" });
  const [tileId, setTileId] = useState("12x24");
  const [customL, setCustomL] = useState("12");
  const [customW, setCustomW] = useState("12");
  const [waste, setWaste] = useState("10");
  const [perBox, setPerBox] = useState("8");

  const calc = useMemo(() => {
    const feet = (o) => (Number(o.ft) || 0) + (Number(o.in) || 0) / 12;
    const steps = [];
    const l = feet(length);
    const w = feet(width);
    const areaSqFt = l * w;
    steps.push(
      `Floor area = ${round2(l)} ft × ${round2(w)} ft = ${round2(areaSqFt)} sq ft`
    );

    let tileSqIn = 0;
    let tileLabel = "";
    if (tileId === "custom") {
      const cl = Number(customL) || 0;
      const cw = Number(customW) || 0;
      tileSqIn = cl * cw;
      tileLabel = `${cl}″ × ${cw}″ custom`;
    } else {
      const t = TILE_SIZES.find((t) => t.id === tileId);
      tileSqIn = t.sqIn;
      tileLabel = t.label;
    }
    const tileSqFt = tileSqIn / 144;
    steps.push(
      `Tile size = ${tileLabel} = ${round2(tileSqIn)} sq in ÷ 144 = ${round2(tileSqFt)} sq ft per tile`
    );

    const wastePct = Number(waste) || 0;
    const exactTiles = areaSqFt / tileSqFt;
    const tiles = tileSqFt > 0 ? Math.ceil(exactTiles * (1 + wastePct / 100) - 1e-9) : 0;
    steps.push(
      `Tiles = ${round2(areaSqFt)} ÷ ${round2(tileSqFt)} = ${round2(exactTiles)} × ${(1 + wastePct / 100).toFixed(2)} (${wastePct}% waste) → round up = ${tiles} tiles`
    );

    const boxCount = Number(perBox) || 0;
    const boxes = boxCount > 0 ? Math.ceil(tiles / boxCount - 1e-9) : 0;
    steps.push(
      `Boxes = ${tiles} tiles ÷ ${boxCount} per box → round up = ${boxes} boxes`
    );

    return { areaSqFt, tileSqFt, tileLabel, wastePct, tiles, boxes, steps };
  }, [length, width, tileId, customL, customW, waste, perBox]);

  return (
    <div className="card" id="calculator">
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Inputs */}
        <div className="space-y-5">
          <FeetField label="Room length" val={length}
            onFt={(v) => setLength({ ...length, ft: v })}
            onIn={(v) => setLength({ ...length, in: v })} />
          <FeetField label="Room width" val={width}
            onFt={(v) => setWidth({ ...width, ft: v })}
            onIn={(v) => setWidth({ ...width, in: v })} />

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Tile size
            </label>
            <select
              value={tileId}
              onChange={(e) => setTileId(e.target.value)}
              aria-label="Tile size"
            >
              {TILE_SIZES.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>

          {tileId === "custom" && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Tile length (in)
                </label>
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={customL}
                  onChange={(e) => setCustomL(e.target.value)}
                  className="text-center"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Tile width (in)
                </label>
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={customW}
                  onChange={(e) => setCustomW(e.target.value)}
                  className="text-center"
                />
              </div>
            </div>
          )}

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Waste allowance
            </label>
            <select
              value={waste}
              onChange={(e) => setWaste(e.target.value)}
              aria-label="Waste allowance"
            >
              <option value="10">10% — standard straight lay</option>
              <option value="15">15% — diagonal or large format</option>
            </select>
            <p className="mt-1 text-xs text-slate-400">
              Cuts, breakage, and a few spares for future repairs.
            </p>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Tiles per box
            </label>
            <input
              type="number"
              min="1"
              step="1"
              value={perBox}
              onChange={(e) => setPerBox(e.target.value)}
              className="text-center"
            />
            <p className="mt-1 text-center text-xs text-slate-400">
              printed on the box or product listing
            </p>
          </div>
        </div>

        {/* Results */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="space-y-5">
            <CostEstimator
              lines={[
                {
                  id: "tile-each",
                  label: "Tile (per tile)",
                  quantity: calc.tiles,
                  unit: "tiles",
                  pricePlaceholder: "2.50",
                },
                {
                  id: "tile-box",
                  label: "Tile (per box)",
                  quantity: calc.boxes,
                  unit: "boxes",
                  pricePlaceholder: "19.99",
                },
              ]}
            />

            <div className="rounded-xl bg-slate-900 p-5 text-white">
              <p className="text-sm uppercase tracking-wide text-slate-400">
                You need
              </p>
              <p className="mt-1 text-5xl font-bold text-orange-400">
                {calc.tiles}
                <span className="ml-2 text-xl font-medium text-slate-300">
                  tiles
                </span>
              </p>
              <p className="mt-2 text-sm text-slate-400">
                {round2(calc.areaSqFt)} sq ft · {calc.tileLabel} ·{" "}
                {calc.wastePct}% waste included
              </p>
              <p className="mt-3 border-t border-slate-700 pt-3 text-lg font-semibold">
                Buy {calc.boxes} boxes{" "}
                <span className="text-sm font-normal text-slate-400">
                  ({perBox || "—"} tiles per box, rounded up)
                </span>
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center">
              {[
                { v: round2(calc.areaSqFt), u: "sq ft", l: "floor area" },
                { v: calc.tiles, u: "tiles", l: "with waste" },
                { v: calc.boxes, u: "boxes", l: "to buy" },
              ].map((x) => (
                <div key={x.l} className="rounded-xl border border-stone-200 bg-stone-50 p-3">
                  <p className="text-2xl font-bold text-slate-900">{x.v}</p>
                  <p className="text-xs text-slate-500">{x.u} · {x.l}</p>
                </div>
              ))}
            </div>

            <div className="rounded-xl border border-stone-200 bg-stone-50 p-4">
              <p className="mb-2 text-sm font-semibold text-slate-800">
                How we calculated it
              </p>
              <ol className="list-decimal space-y-1.5 pl-5 font-mono text-[13px] leading-relaxed text-slate-600">
                {calc.steps.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ol>
            </div>

            <TileDiagram />

            <p className="disclaimer-strip">
              Estimates for planning. Keep a few spare tiles from the same
              dye lot for future repairs — shade varies between batches.
              Measure each room separately; L-shaped rooms need the area
              split into rectangles.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
