/**
 * lib/concreteMath.js
 *
 * Pure math for the concrete calculators. Every constant below is a
 * standard, verifiable figure — nothing is estimated or invented.
 *
 * Constants and their basis:
 * - 1 cubic yard = 27 cubic feet (exact, by definition: 3 ft × 3 ft × 3 ft)
 * - 1 cubic meter = 35.3147 cubic feet (exact conversion, NIST)
 * - Premix bag yields are the industry-standard cured-volume figures
 *   printed on US bagged concrete (e.g. Quikrete) packaging:
 *     80 lb bag → 0.60 cu ft
 *     60 lb bag → 0.45 cu ft
 *     40 lb bag → 0.30 cu ft
 *   (Each ≈ 0.0075 cu ft per lb; manufacturers round to these values.)
 * - Nominal vs. actual lumber: a nominal "4×4" post is actually 3.5×3.5 in,
 *   a nominal "6×6" is actually 5.5×5.5 in (US dressed lumber standard).
 *   Post displacement uses the ACTUAL dimensions so the concrete estimate
 *   isn't overstated.
 *
 * Bags are ALWAYS rounded up (Math.ceil): you cannot buy a fraction of a
 * bag, and running short mid-pour is the expensive failure mode.
 */

export const CU_FT_PER_CU_YD = 27;
export const CU_FT_PER_CU_M = 35.3147;

export const BAG_YIELDS_CU_FT = {
  40: 0.3,
  60: 0.45,
  80: 0.6,
};

/** Actual (dressed) dimensions, in inches, of nominal US lumber posts. */
export const POST_ACTUAL_IN = {
  "4x4": 3.5,
  "6x6": 5.5,
};

export const round2 = (n) => Math.round(n * 100) / 100;

/** Combine feet + inches inputs into decimal feet. */
export function feetFromFtIn(ft, inch) {
  return (Number(ft) || 0) + (Number(inch) || 0) / 12;
}

/** Rectangular volume in cubic feet. */
export function rectVolumeCuFt(lengthFt, widthFt, thicknessFt) {
  return lengthFt * widthFt * thicknessFt;
}

/** Cylinder volume in cubic feet from diameter and height (feet). */
export function cylinderVolumeCuFt(diameterFt, heightFt) {
  const r = diameterFt / 2;
  return Math.PI * r * r * heightFt;
}

/**
 * Concrete needed for fence/deck post holes.
 * A post sitting in the hole displaces concrete, so we subtract the
 * portion of the post that sits below grade (hole depth).
 * Returns { perHoleCuFt, totalCuFt, holeCuFt, postCuFt }.
 */
export function postHoleConcrete({
  holeShape, // "round" | "square"
  holeSizeIn, // diameter (round) or side (square), inches
  holeDepthIn, // inches
  postKind, // "square" | "round"
  postSizeLabel, // "4x4" | "6x6" (square posts)
  postDiameterIn, // round posts
  numHoles,
}) {
  const depthFt = (Number(holeDepthIn) || 0) / 12;

  let holeCuFt = 0;
  if (holeShape === "round") {
    holeCuFt = cylinderVolumeCuFt((Number(holeSizeIn) || 0) / 12, depthFt);
  } else {
    const s = (Number(holeSizeIn) || 0) / 12;
    holeCuFt = s * s * depthFt;
  }

  let postCuFt = 0;
  if (postKind === "square") {
    const actualIn = POST_ACTUAL_IN[postSizeLabel] ?? 3.5;
    const a = actualIn / 12;
    postCuFt = a * a * depthFt;
  } else {
    postCuFt = cylinderVolumeCuFt((Number(postDiameterIn) || 0) / 12, depthFt);
  }

  const perHoleCuFt = Math.max(holeCuFt - postCuFt, 0);
  const n = Math.max(Number(numHoles) || 0, 0);
  return {
    perHoleCuFt,
    totalCuFt: perHoleCuFt * n,
    holeCuFt,
    postCuFt,
  };
}

/** Bags of a given size for a volume — always rounded UP. */
export function bagsNeeded(volumeCuFt, bagLb) {
  const yieldCuFt = BAG_YIELDS_CU_FT[bagLb];
  if (!yieldCuFt || volumeCuFt <= 0) return 0;
  return Math.ceil(volumeCuFt / yieldCuFt - 1e-9);
}

/** Full result set for a pour volume: per-size bags, with and without waste. */
export function pourResults(volumeCuFt, wastePct) {
  const w = Math.min(Math.max(Number(wastePct) || 0, 0), 100);
  const withWasteCuFt = volumeCuFt * (1 + w / 100);
  const bags = {};
  for (const size of Object.keys(BAG_YIELDS_CU_FT)) {
    bags[size] = {
      exact: bagsNeeded(volumeCuFt, size),
      withWaste: bagsNeeded(withWasteCuFt, size),
    };
  }
  return {
    volumeCuFt,
    volumeCuYd: volumeCuFt / CU_FT_PER_CU_YD,
    volumeCuM: volumeCuFt / CU_FT_PER_CU_M,
    wastePct: w,
    withWasteCuFt,
    bags,
  };
}
