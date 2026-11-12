// lib/analytics.js
// Safe GA4 event wrapper. gtag is loaded by components/GoogleAnalytics.jsx
// (Measurement ID G-8NY4Q65K7W). Every call is guarded so a blocked or
// missing gtag never throws and never breaks a calculator.

export function trackEvent(name, params) {
  try {
    if (typeof window === "undefined") return;
    if (typeof window.gtag !== "function") return;
    window.gtag("event", name, params || {});
  } catch {
    // Analytics must never break the page.
  }
}

export function trackCalculatorCompleted(slug, unitSystem) {
  trackEvent("calculator_completed", {
    calculator: slug,
    unit_system: unitSystem,
  });
}

export function trackCalculatorError(slug, unitSystem) {
  trackEvent("calculator_error", {
    calculator: slug,
    unit_system: unitSystem,
  });
}
