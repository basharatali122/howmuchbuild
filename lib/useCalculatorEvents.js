"use client";

import { useEffect, useRef } from "react";
import {
  trackCalculatorCompleted,
  trackCalculatorError,
} from "@/lib/analytics";

// Fires calculator_completed / calculator_error for a calculator page.
// The calculators compute live with useMemo and have no Calculate button,
// so events are debounced (800ms after the last input change) and fire at
// most once per distinct input set. On first load with valid defaults this
// fires one completed event per calculator page view, which is intended.
export function useCalculatorEvents({ slug, valid, inputsKey, unit }) {
  const lastFiredRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!slug || inputsKey == null) return;
    const key = `${slug}|${valid ? "ok" : "err"}|${unit}|${inputsKey}`;
    if (lastFiredRef.current === key) return;
    timerRef.current = setTimeout(() => {
      if (lastFiredRef.current === key) return;
      lastFiredRef.current = key;
      if (valid) {
        trackCalculatorCompleted(slug, unit);
      } else {
        trackCalculatorError(slug, unit);
      }
    }, 800);
    return () => clearTimeout(timerRef.current);
  }, [slug, valid, inputsKey, unit]);
}
