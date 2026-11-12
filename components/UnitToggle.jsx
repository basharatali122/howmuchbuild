"use client";

// Unit toggle shown at the top of a calculator's inputs. Switches the
// length inputs between imperial (Feet / Inches) and metric (Metres / cm).
// The calculator keeps its imperial state internally; switching converts
// the currently entered values for display instead of resetting them.
export default function UnitToggle({ unit, onChange }) {
  return (
    <div className="mb-5">
      <p className="mb-2 text-sm font-medium text-slate-700">Units</p>
      <div
        role="group"
        aria-label="Measurement units"
        className="flex flex-wrap gap-2"
      >
        <button
          type="button"
          aria-pressed={unit === "imperial"}
          onClick={() => onChange("imperial")}
          className={`rounded-full px-4 py-2 text-sm font-medium transition ${
            unit === "imperial"
              ? "bg-orange-600 text-white"
              : "border border-stone-300 bg-white text-slate-600 hover:border-orange-400 hover:text-orange-700"
          }`}
        >
          Feet / Inches
        </button>
        <button
          type="button"
          aria-pressed={unit === "metric"}
          onClick={() => onChange("metric")}
          className={`rounded-full px-4 py-2 text-sm font-medium transition ${
            unit === "metric"
              ? "bg-orange-600 text-white"
              : "border border-stone-300 bg-white text-slate-600 hover:border-orange-400 hover:text-orange-700"
          }`}
        >
          Metres / cm
        </button>
      </div>
    </div>
  );
}
