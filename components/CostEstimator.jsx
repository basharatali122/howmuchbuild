/**
 * CostEstimator — reusable "Estimated Cost" panel for calculator results.
 *
 * Honesty rules (site-wide):
 * - Price inputs default EMPTY with placeholder examples. Cost lines appear
 *   only after the visitor enters a price — we never invent material prices.
 * - Every figure is labeled an estimate; prices vary by store and region.
 *
 * props: lines = [{ id, label, quantity, unit, pricePlaceholder }]
 */
"use client";

import { useState } from "react";

function fmt(n) {
  if (!isFinite(n)) return "—";
  const r = Math.round(n * 100) / 100;
  return r.toLocaleString("en-US", { maximumFractionDigits: 2 });
}

export default function CostEstimator({ lines = [] }) {
  const [prices, setPrices] = useState({});

  const setPrice = (id, value) =>
    setPrices((prev) => ({ ...prev, [id]: value }));

  const pricedLines = lines
    .map((line) => ({ ...line, price: parseFloat(prices[line.id]) }))
    .filter((line) => line.price > 0);

  const total = pricedLines.reduce(
    (sum, line) => sum + line.price * line.quantity,
    0
  );

  if (!lines.length) return null;

  return (
    <section
      aria-label="Estimated cost"
      className="rounded-2xl border border-amber-300/60 bg-amber-50/60 p-5"
    >
      <p className="eyebrow">Estimated cost</p>
      <h3 className="mt-1 text-lg text-slate-900">What will it cost?</h3>
      <p className="mt-1 text-sm text-slate-600">
        Enter your local store prices — prices vary by region.
      </p>

      <ul className="mt-4 space-y-3">
        {lines.map((line) => {
          const price = parseFloat(prices[line.id]);
          const hasPrice = price > 0;
          return (
            <li
              key={line.id}
              className="flex flex-wrap items-center gap-x-3 gap-y-2 border-b border-amber-200/60 pb-3 last:border-0 last:pb-0"
            >
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-slate-800">
                  {line.label}
                </p>
                <p className="text-xs text-slate-500">
                  {fmt(line.quantity)} {line.unit}
                </p>
              </div>
              <label className="flex items-center gap-1.5 text-sm">
                <span className="sr-only">Unit price for {line.label}</span>
                <span aria-hidden="true" className="text-slate-500">
                  $
                </span>
                <input
                  type="number"
                  min="0"
                  step="any"
                  inputMode="decimal"
                  placeholder={line.pricePlaceholder || "0.00"}
                  value={prices[line.id] ?? ""}
                  onChange={(e) => setPrice(line.id, e.target.value)}
                  className="!w-24 !py-1.5 text-right"
                />
              </label>
              <p className="w-24 text-right text-sm font-semibold text-slate-900">
                {hasPrice ? `$${fmt(price * line.quantity)}` : "—"}
              </p>
            </li>
          );
        })}
      </ul>

      {pricedLines.length > 0 && (
        <div className="mt-4 flex items-baseline justify-between border-t border-amber-300/70 pt-3">
          <p className="text-sm font-semibold text-slate-800">
            Estimated total
          </p>
          <p className="text-xl font-bold text-slate-900">${fmt(total)}</p>
        </div>
      )}

      <p className="mt-3 text-xs leading-relaxed text-slate-500">
        Estimate — prices vary by store and region. Check your local store
        for current pricing.
      </p>
    </section>
  );
}
