"use client";

import { useMemo, useState } from "react";
import {
  BAG_YIELDS_CU_FT,
  CU_FT_PER_CU_M,
  CU_FT_PER_CU_YD,
  POST_ACTUAL_IN,
  bagsNeeded,
  cylinderVolumeCuFt,
  feetFromFtIn,
  postHoleConcrete,
  pourResults,
  rectVolumeCuFt,
  round2,
} from "@/lib/concreteMath";
import { FencePostDiagram, SlabDiagram } from "@/components/SvgDiagrams";

const MODES = [
  { id: "slab", label: "Slab / Patio" },
  { id: "wall", label: "Wall" },
  { id: "footing", label: "Footing" },
  { id: "column", label: "Column / Sonotube" },
  { id: "fence", label: "Fence Post Holes" },
];

function FtInField({ label, ft, inch, onFt, onIn, hint }) {
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
            step="1"
            value={ft}
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
            step="1"
            value={inch}
            onChange={(e) => onIn(e.target.value)}
            aria-label={`${label} (inches)`}
            className="text-center"
          />
          <p className="mt-1 text-center text-xs text-slate-400">in</p>
        </div>
      </div>
      {hint ? <p className="mt-1 text-xs text-slate-400">{hint}</p> : null}
    </div>
  );
}

function InchesField({ label, value, onChange, hint }) {
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
      <p className="mt-1 text-center text-xs text-slate-400">
        {hint || "inches"}
      </p>
    </div>
  );
}

/** Small inline cylinder diagram for the Column / Sonotube mode. */
function ColumnDiagram() {
  return (
    <svg
      viewBox="0 0 300 260"
      role="img"
      aria-label="Diagram of a round concrete column showing diameter and height"
      className="mx-auto h-auto w-full max-w-xs"
    >
      <defs>
        <pattern
          id="coldots"
          width="12"
          height="12"
          patternUnits="userSpaceOnUse"
        >
          <rect width="12" height="12" fill="#d6d3d1" />
          <circle cx="3" cy="4" r="1.6" fill="#a8a29e" />
          <circle cx="9" cy="9" r="1.6" fill="#a8a29e" />
        </pattern>
      </defs>
      <ellipse cx="150" cy="70" rx="70" ry="22" fill="#e7e5e4" stroke="#78716c" strokeWidth="1.5" />
      <rect x="80" y="70" width="140" height="140" fill="url(#coldots)" />
      <line x1="80" y1="70" x2="80" y2="210" stroke="#78716c" strokeWidth="1.5" />
      <line x1="220" y1="70" x2="220" y2="210" stroke="#78716c" strokeWidth="1.5" />
      <ellipse cx="150" cy="210" rx="70" ry="22" fill="#d6d3d1" stroke="#78716c" strokeWidth="1.5" />
      <line x1="252" y1="70" x2="252" y2="210" stroke="#57534e" strokeWidth="1.4" />
      <text x="264" y="145" fontSize="14" fill="#44403c" fontWeight="600">
        Height
      </text>
      <line x1="80" y1="248" x2="220" y2="248" stroke="#57534e" strokeWidth="1.4" />
      <text x="150" y="244" textAnchor="middle" fontSize="13" fill="#44403c">
        Diameter
      </text>
      <text x="150" y="150" textAnchor="middle" fontSize="13" fill="#57534e">
        V = π × r² × h
      </text>
    </svg>
  );
}

export default function ConcreteBagsCalculator() {
  const [mode, setMode] = useState("slab");

  // Slab / Wall / Footing dimensions
  const [slabL, setSlabL] = useState({ ft: "10", inch: "0" });
  const [slabW, setSlabW] = useState({ ft: "10", inch: "0" });
  const [slabT, setSlabT] = useState("4");
  const [wallL, setWallL] = useState({ ft: "20", inch: "0" });
  const [wallH, setWallH] = useState({ ft: "4", inch: "0" });
  const [wallT, setWallT] = useState("8");
  const [footL, setFootL] = useState({ ft: "20", inch: "0" });
  const [footW, setFootW] = useState({ ft: "2", inch: "0" });
  const [footD, setFootD] = useState("12");

  // Column
  const [colDia, setColDia] = useState("12");
  const [colH, setColH] = useState({ ft: "4", inch: "0" });

  // Fence post holes
  const [holeShape, setHoleShape] = useState("round");
  const [holeSize, setHoleSize] = useState("12");
  const [holeDepth, setHoleDepth] = useState("36");
  const [postKind, setPostKind] = useState("square");
  const [postSize, setPostSize] = useState("4x4");
  const [postDia, setPostDia] = useState("4");
  const [numHoles, setNumHoles] = useState("8");

  // Shared options
  const [bagSize, setBagSize] = useState("80");
  const [waste, setWaste] = useState(10);
  const [pricePerBag, setPricePerBag] = useState("");

  const calc = useMemo(() => {
    const steps = [];
    let volumeCuFt = 0;

    if (mode === "slab" || mode === "wall" || mode === "footing") {
      const dims =
        mode === "slab"
          ? { a: slabL, b: slabW, t: slabT, names: ["Length", "Width", "Thickness"] }
          : mode === "wall"
            ? { a: wallL, b: wallH, t: wallT, names: ["Length", "Height", "Thickness"] }
            : { a: footL, b: footW, t: footD, names: ["Length", "Width", "Depth"] };
      const aFt = feetFromFtIn(dims.a.ft, dims.a.inch);
      const bFt = feetFromFtIn(dims.b.ft, dims.b.inch);
      const tFt = (Number(dims.t) || 0) / 12;
      volumeCuFt = rectVolumeCuFt(aFt, bFt, tFt);
      steps.push(
        `Volume = ${dims.names[0]} × ${dims.names[1]} × ${dims.names[2]} = ${round2(aFt)} ft × ${round2(bFt)} ft × ${round2(tFt)} ft`
      );
      steps.push(
        `= ${round2(volumeCuFt)} cu ft ÷ ${CU_FT_PER_CU_YD} = ${round2(volumeCuFt / CU_FT_PER_CU_YD)} cu yd`
      );
    } else if (mode === "column") {
      const diaFt = (Number(colDia) || 0) / 12;
      const hFt = feetFromFtIn(colH.ft, colH.inch);
      volumeCuFt = cylinderVolumeCuFt(diaFt, hFt);
      steps.push(
        `Volume = π × r² × h = π × ${round2(diaFt / 2)}² × ${round2(hFt)} = ${round2(volumeCuFt)} cu ft`
      );
      steps.push(
        `= ${round2(volumeCuFt)} cu ft ÷ ${CU_FT_PER_CU_YD} = ${round2(volumeCuFt / CU_FT_PER_CU_YD)} cu yd`
      );
    } else {
      const res = postHoleConcrete({
        holeShape,
        holeSizeIn: holeSize,
        holeDepthIn: holeDepth,
        postKind,
        postSizeLabel: postSize,
        postDiameterIn: postDia,
        numHoles,
      });
      volumeCuFt = res.totalCuFt;
      const holeLabel =
        holeShape === "round"
          ? `π × ${(Number(holeSize) || 0) / 24}² × ${round2((Number(holeDepth) || 0) / 12)}`
          : `${round2((Number(holeSize) || 0) / 12)} × ${round2((Number(holeSize) || 0) / 12)} × ${round2((Number(holeDepth) || 0) / 12)}`;
      const postLabel =
        postKind === "square"
          ? `${POST_ACTUAL_IN[postSize]}″ × ${POST_ACTUAL_IN[postSize]}″ × ${round2((Number(holeDepth) || 0) / 12)} ft deep`
          : `π × ${(Number(postDia) || 0) / 24}² × ${round2((Number(holeDepth) || 0) / 12)}`;
      steps.push(
        `Hole volume = ${holeLabel} = ${round2(res.holeCuFt)} cu ft per hole`
      );
      steps.push(
        `Post displacement = ${postLabel} = ${round2(res.postCuFt)} cu ft per hole`
      );
      steps.push(
        `Concrete per hole = ${round2(res.holeCuFt)} − ${round2(res.postCuFt)} = ${round2(res.perHoleCuFt)} cu ft`
      );
      steps.push(
        `Total = ${round2(res.perHoleCuFt)} × ${numHoles || 0} holes = ${round2(volumeCuFt)} cu ft`
      );
    }

    const results = pourResults(volumeCuFt, waste);
    const y = BAG_YIELDS_CU_FT[bagSize];
    steps.push(
      `${bagSize} lb bags: ${round2(volumeCuFt)} cu ft ÷ ${y} cu ft/bag = ${round2(volumeCuFt / y)} → round up = ${bagsNeeded(volumeCuFt, bagSize)} bags`
    );
    steps.push(
      `With ${results.wastePct}% waste: ${round2(results.withWasteCuFt)} cu ft ÷ ${y} = ${round2(results.withWasteCuFt / y)} → round up = ${results.bags[bagSize].withWaste} bags`
    );

    return { results, steps };
  }, [
    mode, slabL, slabW, slabT, wallL, wallH, wallT, footL, footW, footD,
    colDia, colH, holeShape, holeSize, holeDepth, postKind, postSize,
    postDia, numHoles, bagSize, waste,
  ]);

  const { results, steps } = calc;
  const price = Number(pricePerBag) || 0;
  const cost =
    price > 0 ? results.bags[bagSize].withWaste * price : null;

  return (
    <div className="card" id="calculator">
      {/* Mode tabs */}
      <div
        role="tablist"
        aria-label="Project type"
        className="mb-6 flex flex-wrap gap-2"
      >
        {MODES.map((m) => (
          <button
            key={m.id}
            role="tab"
            aria-selected={mode === m.id}
            onClick={() => setMode(m.id)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              mode === m.id
                ? "bg-orange-600 text-white"
                : "border border-stone-300 bg-white text-slate-600 hover:border-orange-400 hover:text-orange-700"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Inputs */}
        <div className="space-y-5">
          {mode === "slab" && (
            <>
              <FtInField label="Slab length" ft={slabL.ft} inch={slabL.inch}
                onFt={(v) => setSlabL({ ...slabL, ft: v })}
                onIn={(v) => setSlabL({ ...slabL, inch: v })} />
              <FtInField label="Slab width" ft={slabW.ft} inch={slabW.inch}
                onFt={(v) => setSlabW({ ...slabW, ft: v })}
                onIn={(v) => setSlabW({ ...slabW, inch: v })} />
              <InchesField label="Slab thickness" value={slabT} onChange={setSlabT}
                hint="inches — 4″ is standard for patios & walkways" />
            </>
          )}
          {mode === "wall" && (
            <>
              <FtInField label="Wall length" ft={wallL.ft} inch={wallL.inch}
                onFt={(v) => setWallL({ ...wallL, ft: v })}
                onIn={(v) => setWallL({ ...wallL, inch: v })} />
              <FtInField label="Wall height" ft={wallH.ft} inch={wallH.inch}
                onFt={(v) => setWallH({ ...wallH, ft: v })}
                onIn={(v) => setWallH({ ...wallH, inch: v })} />
              <InchesField label="Wall thickness" value={wallT} onChange={setWallT}
                hint="inches — 8″ is a common block-wall thickness" />
            </>
          )}
          {mode === "footing" && (
            <>
              <FtInField label="Footing length" ft={footL.ft} inch={footL.inch}
                onFt={(v) => setFootL({ ...footL, ft: v })}
                onIn={(v) => setFootL({ ...footL, inch: v })} />
              <FtInField label="Footing width" ft={footW.ft} inch={footW.inch}
                onFt={(v) => setFootW({ ...footW, ft: v })}
                onIn={(v) => setFootW({ ...footW, inch: v })} />
              <InchesField label="Footing depth" value={footD} onChange={setFootD}
                hint="inches" />
            </>
          )}
          {mode === "column" && (
            <>
              <InchesField label="Column diameter" value={colDia} onChange={setColDia}
                hint="inches — a standard sonotube is 8″, 10″, or 12″" />
              <FtInField label="Column height" ft={colH.ft} inch={colH.inch}
                onFt={(v) => setColH({ ...colH, ft: v })}
                onIn={(v) => setColH({ ...colH, inch: v })} />
            </>
          )}
          {mode === "fence" && (
            <>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Hole shape
                </label>
                <div className="flex gap-2">
                  {["round", "square"].map((s) => (
                    <button
                      key={s}
                      onClick={() => setHoleShape(s)}
                      className={`flex-1 rounded-lg border px-3 py-2 text-sm font-medium capitalize transition ${
                        holeShape === s
                          ? "border-orange-600 bg-orange-50 text-orange-800"
                          : "border-stone-300 bg-white text-slate-600"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              <InchesField
                label={holeShape === "round" ? "Hole diameter" : "Hole side length"}
                value={holeSize} onChange={setHoleSize}
                hint="inches — dig holes ~3× the post width" />
              <InchesField label="Hole depth" value={holeDepth} onChange={setHoleDepth}
                hint="inches — go below your local frost line" />
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Post type
                </label>
                <div className="flex gap-2">
                  {["square", "round"].map((s) => (
                    <button
                      key={s}
                      onClick={() => setPostKind(s)}
                      className={`flex-1 rounded-lg border px-3 py-2 text-sm font-medium capitalize transition ${
                        postKind === s
                          ? "border-orange-600 bg-orange-50 text-orange-800"
                          : "border-stone-300 bg-white text-slate-600"
                      }`}
                    >
                      {s} post
                    </button>
                  ))}
                </div>
              </div>
              {postKind === "square" ? (
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    Post size (nominal)
                  </label>
                  <select value={postSize} onChange={(e) => setPostSize(e.target.value)}>
                    <option value="4x4">4×4 (actual 3.5″ × 3.5″)</option>
                    <option value="6x6">6×6 (actual 5.5″ × 5.5″)</option>
                  </select>
                  <p className="mt-1 text-xs text-slate-400">
                    We use actual lumber dimensions so the post displacement is accurate.
                  </p>
                </div>
              ) : (
                <InchesField label="Post diameter" value={postDia} onChange={setPostDia}
                  hint="inches" />
              )}
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Number of holes
                </label>
                <input
                  type="number" min="1" step="1" value={numHoles}
                  onChange={(e) => setNumHoles(e.target.value)}
                  className="text-center"
                />
              </div>
            </>
          )}

          {/* Shared options */}
          <div className="border-t border-stone-200 pt-5">
            <p className="mb-2 text-sm font-medium text-slate-700">Bag size</p>
            <div className="flex gap-2">
              {Object.keys(BAG_YIELDS_CU_FT).map((s) => (
                <button
                  key={s}
                  onClick={() => setBagSize(s)}
                  className={`flex-1 rounded-lg border px-3 py-2 text-sm font-semibold transition ${
                    bagSize === s
                      ? "border-orange-600 bg-orange-600 text-white"
                      : "border-stone-300 bg-white text-slate-600 hover:border-orange-400"
                  }`}
                >
                  {s} lb
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-1 flex items-center justify-between text-sm font-medium text-slate-700">
              <span>Waste &amp; spillage allowance</span>
              <span className="rounded bg-orange-100 px-2 py-0.5 text-sm font-semibold text-orange-800">
                {waste}%
              </span>
            </label>
            <input
              type="range" min="0" max="25" step="1" value={waste}
              onChange={(e) => setWaste(Number(e.target.value))}
              aria-label="Waste percentage"
            />
            <p className="mt-1 text-xs text-slate-400">
              10% is a safe default — uneven subgrade and spillage eat more than you think.
            </p>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Price per bag <span className="font-normal text-slate-400">(optional — for cost estimate)</span>
            </label>
            <input
              type="number" min="0" step="0.01" value={pricePerBag}
              onChange={(e) => setPricePerBag(e.target.value)}
              placeholder="$ e.g. 6.48"
            />
          </div>
        </div>

        {/* Results */}
        <div className="space-y-5">
          <div className="rounded-xl bg-slate-900 p-5 text-white">
            <p className="text-sm uppercase tracking-wide text-slate-400">
              You need
            </p>
            <p className="mt-1 text-5xl font-bold text-orange-400">
              {results.bags[bagSize].withWaste}
              <span className="ml-2 text-xl font-medium text-slate-300">
                {bagSize} lb bags
              </span>
            </p>
            <p className="mt-2 text-sm text-slate-400">
              Includes {results.wastePct}% waste · exact pour needs{" "}
              {results.bags[bagSize].exact} bags (always rounded up)
            </p>
            {cost !== null && (
              <p className="mt-3 border-t border-slate-700 pt-3 text-lg font-semibold">
                Est. cost: ${cost.toFixed(2)}{" "}
                <span className="text-sm font-normal text-slate-400">
                  ({results.bags[bagSize].withWaste} × ${price.toFixed(2)})
                </span>
              </p>
            )}
          </div>

          <div className="grid grid-cols-3 gap-3 text-center">
            {[
              { v: round2(results.volumeCuFt), u: "cu ft" },
              { v: round2(results.volumeCuYd), u: "cu yd" },
              { v: round2(results.volumeCuM), u: "cu m" },
            ].map((x) => (
              <div key={x.u} className="rounded-xl border border-stone-200 bg-stone-50 p-3">
                <p className="text-2xl font-bold text-slate-900">{x.v}</p>
                <p className="text-xs text-slate-500">total volume ({x.u})</p>
              </div>
            ))}
          </div>

          <div className="overflow-hidden rounded-xl border border-stone-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-stone-100 text-left">
                  <th className="px-4 py-2 font-semibold text-slate-700">Bag size</th>
                  <th className="px-4 py-2 font-semibold text-slate-700">Yield / bag</th>
                  <th className="px-4 py-2 font-semibold text-slate-700">Exact</th>
                  <th className="px-4 py-2 font-semibold text-slate-700">With {results.wastePct}% waste</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(BAG_YIELDS_CU_FT).map((s) => (
                  <tr
                    key={s}
                    className={s === bagSize ? "bg-orange-50 font-semibold" : "bg-white"}
                  >
                    <td className="px-4 py-2">{s} lb</td>
                    <td className="px-4 py-2">{BAG_YIELDS_CU_FT[s]} cu ft</td>
                    <td className="px-4 py-2">{results.bags[s].exact}</td>
                    <td className="px-4 py-2">{results.bags[s].withWaste}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="rounded-xl border border-stone-200 bg-stone-50 p-4">
            <p className="mb-2 text-sm font-semibold text-slate-800">
              How we calculated it
            </p>
            <ol className="list-decimal space-y-1.5 pl-5 font-mono text-[13px] leading-relaxed text-slate-600">
              {steps.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ol>
          </div>

          {mode === "fence" ? (
            <FencePostDiagram />
          ) : mode === "column" ? (
            <ColumnDiagram />
          ) : (
            <SlabDiagram />
          )}

          <p className="disclaimer-strip">
            Estimates for planning. Actual bag yields vary slightly by mix and
            conditions — always round up and confirm with your supplier for
            pours over a few cubic yards.
          </p>
        </div>
      </div>
    </div>
  );
}
