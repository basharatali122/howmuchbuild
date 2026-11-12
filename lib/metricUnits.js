// lib/metricUnits.js
// Pure conversions between the imperial inputs the calculators compute with
// (feet / inches) and the metric inputs shown when the unit toggle is on
// metric. Internal calculator state always stays imperial; metric is only
// a display and input layer, so all existing volume and area math is
// untouched and results do not change for the same physical size.

export const FT_TO_M = 0.3048;
export const IN_TO_CM = 2.54;

// Round to d decimals and return a plain string without trailing zeros.
export function fmt(n, d) {
  const num = Number(n);
  if (!Number.isFinite(num)) return "0";
  const rounded = Number(num.toFixed(d));
  return String(rounded);
}

export function round1(n) {
  return Math.round((Number(n) || 0) * 10) / 10;
}

// Feet + inches -> metres + centimetres (cm shown with 1 decimal).
export function ftInToMcm(ft, inch) {
  const totalCm = ((Number(ft) || 0) * 12 + (Number(inch) || 0)) * IN_TO_CM;
  let m = Math.floor(totalCm / 100);
  let cm = round1(totalCm - m * 100);
  if (cm >= 100) {
    m += 1;
    cm = 0;
  }
  return { m: String(m), cm: fmt(cm, 1) };
}

// Metres + centimetres -> feet + inches (inches shown with 1 decimal).
export function mcmToFtIn(m, cm) {
  const totalCm = (Number(m) || 0) * 100 + (Number(cm) || 0);
  const totalIn = totalCm / IN_TO_CM;
  let ft = Math.floor(totalIn / 12);
  let inch = round1(totalIn - ft * 12);
  if (inch >= 12) {
    ft += 1;
    inch = 0;
  }
  return { ft: String(ft), inch: fmt(inch, 1) };
}

// Inches-only field -> centimetres (1 decimal).
export function inchesToCm(v) {
  return fmt((Number(v) || 0) * IN_TO_CM, 1);
}

// Centimetres -> inches (2 decimals, for inches-only fields).
export function cmToInches(v) {
  return fmt((Number(v) || 0) / IN_TO_CM, 2);
}

// Feet-only field -> metres (2 decimals).
export function feetToMetres(v) {
  return fmt((Number(v) || 0) * FT_TO_M, 2);
}

// Metres -> feet (2 decimals, for feet-only fields).
export function metresToFeet(v) {
  return fmt((Number(v) || 0) / FT_TO_M, 2);
}
