import next from "eslint-config-next";

/**
 * Flat ESLint config for Next.js 16 (ESLint 9).
 * `next lint` was removed in Next 16 — run via `npm run lint` (= `eslint .`).
 */
const config = [
  ...next,
  {
    ignores: [".next/**", "node_modules/**", "out/**"],
  },
];

export default config;
