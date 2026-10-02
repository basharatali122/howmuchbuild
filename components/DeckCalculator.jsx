"use client";

import { useMemo, useState } from "react";
import CostEstimator from "@/components/CostEstimator";

const BOARD_FACE_IN = 5.5; // actual face width of 5/4x6 and 2x6 decking
const BOARD_GAP_IN = 0.25; // typical decking gap, labeled below
const POST_MAX_SPACING_IN = 96; // 8 ft max post spacing, labeled typical
const PICKET_WIDTH_IN = 1.5; // actual width of a 2x2 baluster
const PICKET_GAP_IN = 3.5; // under the 4-inch IRC maximum, labeled below
const SCREWS_PER_BOARD_PER_JOIST = 2; // typical face-screw fastening

function FtInField({ label, ft, inch, onFt, onIn }) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-slate-700">
        {label}
      </label>
      <div className="flex gap-2">
        <div className="flex-1">
          <input
            type="number" min="0" step="1" value={ft}
            onChange={(e) => onFt(e.target.value)}
            aria-label={`${label} (feet)`} className="text-center"
          />
          <p className="mt-1 text-center text-xs text-slate-400">ft</p>
        </div>
        <div className="flex-1">
          <input
            type="number" min="0" max="11" step="1" value={inch}
            onChange={(e) => onIn(e.target.value)}
            aria-label={`${label} (inches)`} className="text-center"
          />
          <p className="mt-1 text-center text-xs text-slate-400">in</p>
        </div>
      </div>
    </div>
  );
}

function SelectField({ label, value, onChange, options, hint }) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-slate-700">
        {label}
      </label>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      {hint ? <p className="mt-1 text-xs text-slate-400">{hint}</p> : null}
    </div>
  );
}

function NumberField({ label, value, onChange, hint }) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-slate-700">
        {label}
      </label>
      <input
        type="number" min="0" step="any" value={value}
        onChange={(e) => onChange(e.target.value)}
        className="text-center"
      />
      {hint ? (
        <p className="mt-1 text-center text-xs text-slate-400">{hint}</p>
      ) : null}
    </div>
  );
}

/** Original hand-drawn plan-view deck diagram. */
function DeckDiagram() {
  const boards = [];
  for (let i = 0; i < 8; i++) {
    boards.push(
      <rect
        key={i}
        x="60"
        y={60 + i * 20}
        width="260"
        height="13"
        fill={i % 2 ? "#e7e5e4" : "#d6d3d1"}
        stroke="#a8a29e"
        strokeWidth="1"
      />
    );
  }
  const joists = [];
  for (let i = 0; i < 5; i++) {
    joists.push(
      <line
        key={i}
        x1={84 + i * 60}
        y1="52"
        x2={84 + i * 60}
        y2="232"
        stroke="#c2410c"
        strokeWidth="2.5"
        strokeDasharray="7 4"
      />
    );
  }
  return (
    <svg
      viewBox="0 0 380 300"
      role="img"
      aria-label="Plan-view diagram of a deck showing decking boards, joists, and posts"
      className="h-auto w-full"
    >
      <text x="190" y="28" textAnchor="middle" fontSize="14" fill="#44403c" fontWeight="700">
        Deck plan — example layout
      </text>
      {boards}
      {joists}
      {/* posts */}
      {[
        [60, 60], [320, 60], [60, 207], [320, 207], [190, 60], [190, 207],
      ].map(([x, y], i) => (
        <rect
          key={i}
          x={x - 8}
          y={y - 8}
          width="16"
          height="16"
          fill="#78716c"
          stroke="#44403c"
          strokeWidth="1.5"
        />
      ))}
      <text x="345" y="150" fontSize="12.5" fill="#c2410c" fontWeight="600">
        Joists
      </text>
      <text x="345" y="166" fontSize="12.5" fill="#57534e">
        16″ OC (typ.)
      </text>
      <text x="52" y="285" fontSize="12.5" fill="#57534e">
        Decking boards — ¼″ gap (typical)
      </text>
      <text x="240" y="285" fontSize="12.5" fill="#57534e">
        ▪ Posts ≤ 8 ft apart (typical)
      </text>
    </svg>
  );
}

export default function DeckCalculator() {
  const [deckL, setDeckL] = useState({ ft: "12", inch: "0" });
  const [deckW, setDeckW] = useState({ ft: "10", inch: "0" });
  const [boardDir, setBoardDir] = useState("L");
  const [boardType, setBoardType] = useState("5/4x6");
  const [joistSpacing, setJoistSpacing] = useState("16");
  const [stockLen, setStockLen] = useState("12");
  const [railingLF, setRailingLF] = useState("20");
  const [postRows, setPostRows] = useState("2");

  const calc = useMemo(() => {
    const steps = [];
    const L = (Number(deckL.ft) || 0) + (Number(deckL.inch) || 0) / 12;
    const W = (Number(deckW.ft) || 0) + (Number(deckW.inch) || 0) / 12;
    const parallelFt = boardDir === "L" ? L : W; // boards run along this dim
    const perpFt = boardDir === "L" ? W : L;
    const parallelIn = parallelFt * 12;
    const perpIn = perpFt * 12;
    const spacingIn = Number(joistSpacing) || 16;
    const stock = Number(stockLen) || 12;
    const rows = Number(postRows) || 0;

    // Decking boards: rows across the perpendicular dimension
    const pitchIn = BOARD_FACE_IN + BOARD_GAP_IN;
    const boardRows = perpIn > 0 ? Math.ceil(perpIn / pitchIn) : 0;
    const deckingLF = boardRows * parallelFt;
    const deckingPieces = deckingLF > 0 ? Math.ceil(deckingLF / stock) : 0;
    steps.push(
      `Board rows = ⌈${Math.round(perpIn)}″ ÷ (${BOARD_FACE_IN}″ + ${BOARD_GAP_IN}″ gap)⌉ = ⌈${(perpIn / pitchIn).toFixed(2)}⌉ = ${boardRows}`
    );
    steps.push(
      `Decking = ${boardRows} rows × ${parallelFt.toFixed(2)} ft = ${deckingLF.toFixed(1)} lin ft → ⌈${deckingLF.toFixed(1)} ÷ ${stock}⌉ = ${deckingPieces} boards`
    );

    // Joists: spaced along the parallel dimension, each as long as the perpendicular dim.
    // Each joist must be ONE continuous board — a butt joint mid-span is not
    // structural — so pieces = joist count, never total-LF ÷ stock length.
    const joists = parallelIn > 0 ? Math.floor(parallelIn / spacingIn) + 1 : 0;
    const joistLF = joists * perpFt;
    const joistPieces = joists;
    const spanExceedsStock = perpFt > 0 && stock > 0 && perpFt > stock;
    steps.push(
      `Joists = ⌊${Math.round(parallelIn)}″ ÷ ${spacingIn}″⌋ + 1 = ${joists} joists × ${perpFt.toFixed(2)} ft = ${joistLF.toFixed(1)} lin ft → ${joistPieces} pieces (one continuous board per joist)`
    );

    // Rim / band boards around the perimeter
    const rimLF = 2 * (L + W);
    const rimPieces = rimLF > 0 ? Math.ceil(rimLF / stock) : 0;
    steps.push(
      `Rim boards = 2 × (${L.toFixed(2)} + ${W.toFixed(2)}) = ${rimLF.toFixed(1)} lin ft → ${rimPieces} pieces`
    );

    // Posts: max 8 ft apart along each post row
    const postsPerRow =
      parallelIn > 0 ? Math.ceil(parallelIn / POST_MAX_SPACING_IN) + 1 : 0;
    const posts = postsPerRow * rows;
    const footings = posts;
    steps.push(
      `Posts = ${rows} rows × (⌈${Math.round(parallelIn)}″ ÷ 96″⌉ + 1) = ${rows} × ${postsPerRow} = ${posts} posts; footings = 1 per post = ${footings}`
    );

    // Screws: 2 per board per joist crossing
    const screws = boardRows * joists * SCREWS_PER_BOARD_PER_JOIST;
    steps.push(
      `Screws = ${boardRows} boards × ${joists} joists × ${SCREWS_PER_BOARD_PER_JOIST} = ${screws} screws`
    );

    // Railing pickets: <4" gap per IRC → use 3.5" gap with 1.5" balusters
    const railIn = (Number(railingLF) || 0) * 12;
    const pickets =
      railIn > 0
        ? Math.ceil(railIn / (PICKET_WIDTH_IN + PICKET_GAP_IN))
        : 0;
    if (railIn > 0) {
      steps.push(
        `Pickets = ⌈${Math.round(railIn)}″ ÷ (${PICKET_WIDTH_IN}″ + ${PICKET_GAP_IN}″ gap)⌉ = ${pickets} balusters`
      );
    }

    return {
      boardRows, deckingLF, deckingPieces,
      joists, joistLF, joistPieces, spanExceedsStock,
      rimLF, rimPieces,
      postsPerRow, posts, footings,
      screws, pickets, steps,
    };
  }, [deckL, deckW, boardDir, joistSpacing, stockLen, railingLF, postRows]);

  return (
    <div className="card" id="calculator">
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Inputs */}
        <div className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <FtInField label="Deck length" ft={deckL.ft} inch={deckL.inch}
              onFt={(v) => setDeckL({ ...deckL, ft: v })}
              onIn={(v) => setDeckL({ ...deckL, inch: v })} />
            <FtInField label="Deck width" ft={deckW.ft} inch={deckW.inch}
              onFt={(v) => setDeckW({ ...deckW, ft: v })}
              onIn={(v) => setDeckW({ ...deckW, inch: v })} />
          </div>

          <SelectField
            label="Decking boards run along"
            value={boardDir}
            onChange={setBoardDir}
            options={[
              { value: "L", label: "The deck length" },
              { value: "W", label: "The deck width" },
            ]}
          />

          <SelectField
            label="Board choice"
            value={boardType}
            onChange={setBoardType}
            options={[
              { value: "5/4x6", label: "5/4×6 decking (actual 1″ × 5.5″)" },
              { value: "2x6", label: "2×6 decking (actual 1½″ × 5.5″)" },
            ]}
            hint="Both have a 5.5″ face, so the board count is the same — the 2×6 is thicker and stiffer."
          />

          <SelectField
            label="Joist spacing (on center)"
            value={joistSpacing}
            onChange={setJoistSpacing}
            options={[
              { value: "12", label: '12″ OC' },
              { value: "16", label: '16″ OC (standard)' },
              { value: "24", label: '24″ OC' },
            ]}
            hint="16″ OC is standard for decking run perpendicular to joists."
          />

          <SelectField
            label="Lumber lengths you can buy"
            value={stockLen}
            onChange={setStockLen}
            options={["8", "10", "12", "14", "16", "20"].map((l) => ({
              value: l,
              label: `${l} ft boards`,
            }))}
            hint="Decking and rim pieces are rounded up from total linear feet (butt joints land on framing). Each joist needs one continuous board — joists are never spliced mid-span."
          />

          <div className="grid grid-cols-2 gap-4">
            <NumberField
              label="Railing length (linear ft)"
              value={railingLF} onChange={setRailingLF}
              hint="0 if no railing — stairs excluded"
            />
            <NumberField
              label="Post rows (beam lines)"
              value={postRows} onChange={setPostRows}
              hint="2 is typical for a ledger + outer beam"
            />
          </div>
        </div>

        {/* Results */}
        <div className="space-y-5 lg:sticky lg:top-24 self-start">
          <CostEstimator
            lines={[
              { id: "decking", label: "Decking boards", quantity: calc.deckingPieces, unit: "boards", pricePlaceholder: "8.00" },
              { id: "joists", label: "Joists", quantity: calc.joistPieces, unit: "pieces", pricePlaceholder: "6.00" },
              { id: "rim", label: "Rim boards", quantity: calc.rimPieces, unit: "boards", pricePlaceholder: "8.00" },
              { id: "posts", label: "Posts", quantity: calc.posts, unit: "posts", pricePlaceholder: "12.00" },
            ]}
          />
          <div className="rounded-xl bg-slate-900 p-5 text-white">
            <p className="text-sm uppercase tracking-wide text-slate-400">
              Material takeoff
            </p>
            <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-4">
              {[
                { v: calc.deckingPieces, u: "decking boards" },
                { v: calc.joistPieces, u: "joist pieces" },
                { v: calc.rimPieces, u: "rim boards" },
                { v: calc.posts, u: "posts + footings" },
                { v: calc.screws, u: "deck screws" },
                { v: calc.pickets, u: "rail balusters" },
              ].map((x) => (
                <div key={x.u}>
                  <p className="text-3xl font-bold text-orange-400">{x.v}</p>
                  <p className="text-sm text-slate-300">{x.u}</p>
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs text-slate-400">
              Decking pieces are rounded up and include no cutting waste — add
              ~10% for offcuts and butt joints on the decking. Joists are
              counted as one continuous board each.
            </p>
            {calc.spanExceedsStock ? (
              <p className="mt-3 rounded-lg border border-amber-400/60 bg-amber-400/10 p-3 text-xs leading-relaxed text-amber-200">
                <strong>Heads up:</strong> your joist span is longer than the
                longest boards you selected. Use longer lumber or engineered
                joists, and verify spans with your local building department.
              </p>
            ) : null}
          </div>

          <div className="overflow-hidden rounded-xl border border-stone-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-stone-100 text-left">
                  <th className="px-4 py-2 font-semibold text-slate-700">Material</th>
                  <th className="px-4 py-2 font-semibold text-slate-700">Total lin. ft</th>
                  <th className="px-4 py-2 font-semibold text-slate-700">Pieces</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  <td className="px-4 py-2">Decking ({calc.boardRows} rows)</td>
                  <td className="px-4 py-2">{calc.deckingLF.toFixed(1)} ft</td>
                  <td className="px-4 py-2 font-semibold">{calc.deckingPieces}</td>
                </tr>
                <tr className="bg-stone-50/60">
                  <td className="px-4 py-2">Joists ({calc.joists})</td>
                  <td className="px-4 py-2">{calc.joistLF.toFixed(1)} ft</td>
                  <td className="px-4 py-2 font-semibold">{calc.joistPieces}</td>
                </tr>
                <tr className="bg-white">
                  <td className="px-4 py-2">Rim / band boards</td>
                  <td className="px-4 py-2">{calc.rimLF.toFixed(1)} ft</td>
                  <td className="px-4 py-2 font-semibold">{calc.rimPieces}</td>
                </tr>
                <tr className="bg-stone-50/60">
                  <td className="px-4 py-2">Posts ({calc.postsPerRow}/row × {postRows} rows)</td>
                  <td className="px-4 py-2">—</td>
                  <td className="px-4 py-2 font-semibold">{calc.posts}</td>
                </tr>
              </tbody>
            </table>
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

          <DeckDiagram />

          <p className="disclaimer-strip">
            <strong>Code check:</strong> joist, beam, and footing spans and
            sizes vary with lumber species, load, soil, and frost line, and this
            calculator does not size structural members — verify all framing
            with your local building department before you build. Baluster
            spacing follows the IRC 4-inch-sphere rule; confirm guardrail
            height and graspable-handrail requirements locally as well.
          </p>
        </div>
      </div>
    </div>
  );
}
