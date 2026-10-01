# HowMuchBuild — Professional Redesign & Expansion Brief
Date: 2026-10-02. Repo: `~/workspace/howmuchbuild/` (Next.js 16, App Router, **.js/.jsx only**, Tailwind 3).

## 1. Goal
Make the site look and feel professional (current design is clean but plain), match the
content depth/structure of top ad-monetized competitors (InchCalculator, OmniCalculator),
and lean into the brand: **"how much does it cost to build"** — cost estimation becomes a
first-class feature on every calculator.

## 2. Non-goals / hard rules
- **Do NOT copy** any competitor's copy, branding, logos, images, or testimonials.
- **Do NOT invent** material prices, press features, testimonials, traffic stats, or author
  credentials. Every factual claim must be true of this site.
- **Do NOT change existing URLs.** Keep all slugs, titles/meta (may improve, never weaken),
  canonicals, JSON-LD schema (may extend), sitemap/robots/ads.txt behavior.
- **Do NOT break the math.** All existing calculator logic stays; upgrades are additive.
- No fake "admin", no new backend. Client-side only, as today.
- Check `tailwind.config.*` for existing tokens (e.g. `max-w-content`) and reuse them.

## 3. Design system (globals.css + tailwind)
Keep construction-orange brand (`orange-600 #ea580c` primary) but make it rich:
- Ink: slate-900. Deep sections: slate-950 with a subtle CSS blueprint-grid pattern
  (repeating-linear-gradient, no images).
- Accent on dark: amber-400. Page bg: keep stone-50. Cards: white, rounded-2xl,
  border-stone-200, soft shadow, hover lift (`hover:-translate-y-0.5 hover:shadow-md`).
- Eyebrow labels above section headings (uppercase, tracking-widest, orange-700, text-xs).
- Display headings: text-4xl/5xl tracking-tight; generous section spacing (py-16/20).
- Buttons: keep `.btn-primary`/`.btn-secondary`, add `.btn-dark` for dark sections.
- Focus states and mobile-first responsiveness everywhere. No emojis in UI.

## 4. Shared components to build (components/)
- `SiteSearch.jsx` — client-side search over a static index of all calculators + guides
  (title, href, desc, keywords). Used in hero and header.
- `StatStrip.jsx` — factual stats band (10→13 calculators, 100% free, no sign-up,
  private/client-side math). Only true claims.
- `AuthorByline.jsx` — "By HowMuchBuild Editorial Team · Calculation reviewed ·
  Updated October 2026". No fake person names.
- `TableOfContents.jsx` — jump links for long calculator/guide pages.
- `CostEstimator.jsx` — reusable: editable unit-price inputs + computed cost lines +
  "Estimate — prices vary by store and region" note. (See §6.)
- `MiniSlabCalculator.jsx` — compact concrete slab → bags widget for the homepage hero
  (length, width, thickness → 80/60/40-lb bags). Self-contained, reuse yield constants.
- Extend `SvgDiagrams.jsx` with a small **icon set** (one simple line icon per calculator:
  slab, wall, deck, fence, mulch pile, paint roller, drywall sheet, paver, sod roll,
  soil, gravel, sand, tile). Original SVGs only.
- `RelatedCalculators.jsx` — cross-link block (already exists in some form? check and
  standardize; every calculator page links 3–4 related tools).

## 5. Homepage rebuild (app/page.js)
Structure top to bottom:
1. **Hero (dark slate-950, blueprint grid):** eyebrow "FREE PROJECT CALCULATORS",
   H1 "How much will your project cost to build?", subcopy, `SiteSearch` prominent,
   CTA buttons. Right/below: `MiniSlabCalculator` card (live demo).
2. **StatStrip** (calculators count = final number, 100% free, no sign-up, private).
3. **Calculator grid** — cards with SVG icon, title, desc, "Open calculator →".
4. **"How it works"** — 3 steps (Enter dimensions → Get materials → Estimate cost).
5. **Cost-first band** — explain every tool estimates material cost; link to cost guides.
6. **Guides teaser** — 3–4 guide cards.
7. **Trust/methodology band** — "Every formula shown. Every result rounded up. No account,
   no tracking of your project data." + link to /methodology.
8. **FAQ** (4–5 questions, FAQ schema) + AdSlot.
Keep metadata; add FAQ JSON-LD if trivial.

## 6. Calculator page upgrades (all 10 existing)
Apply to every calculator page + its component:
- **Cost estimator in results, at the TOP of the results panel** (like competitors'
  "Estimated Cost"): `CostEstimator` with editable unit prices.
  - **Honesty rule:** price inputs default EMPTY with placeholder examples
    (e.g. "8.50"). Show cost lines only after user enters a price. Helper text:
    "Check your local store — prices vary by region."
  - Exception: the two concrete pages keep their existing cited price ranges.
  - Always label: "Estimate".
- **Sticky results** on desktop (lg:sticky top-24) so inputs/results stay visible.
- Add `TableOfContents`, `AuthorByline` ("Updated October 2026"), related calculators.
- Keep all existing content (examples, tables, formulas, FAQs, schema). Improve visual
  hierarchy only: eyebrow labels, better tables, diagram placement.
- Verify each page still builds and its JSON-LD remains valid.

## 7. New calculators (3) — same quality bar as existing
Follow the existing page pattern: interactive tool above the fold, explanation, worked
example, data table, formulas/methodology, FAQs, internal links, unique meta, FAQ schema.
Math standards (estimates labeled as estimates):
- `/gravel-calculator` — "Gravel Calculator: How Much Gravel Do I Need". Shapes:
  rectangle, circle. Volume: cu ft → cu yd (÷27). Weight estimate: 1 cu yd crushed
  gravel ≈ 1.4–1.5 tons (2,800–3,000 lb); present as range, note varies by stone type and
  moisture. Include depth table (2", 4", 6" coverage per ton).
- `/sand-calculator` — "Sand Calculator". Same shapes. Weight estimate: 1 cu yd dry sand
  ≈ 1.3–1.4 tons; label estimate, varies by type/moisture.
- `/tile-calculator` — "Tile Calculator: How Many Tiles Do I Need". Area ÷ tile size,
  tile sizes: 12×12, 12×24, 18×18, 24×24 in + custom; waste selector 10% (default) /
  15% (diagonal or large format); boxes from tiles-per-box input. Round up everywhere.
All three get `CostEstimator` (§6 rules), TOC, byline, related links.

## 8. New guides (4) + trust pages
Same guide pattern as existing (intro, steps, tables, FAQs, calculator cross-links).
Cost guides use **typical US ranges only**, always framed as ranges with "varies widely
by region, site conditions, and finish level" — never precise claims, never fake
attribution:
- `/guides/concrete-slab-cost-guide` — "How Much Does a Concrete Slab Cost?"
- `/guides/deck-cost-guide` — "How Much Does a Deck Cost?"
- `/guides/fence-cost-guide` — "How Much Does a Fence Cost?"
- `/guides/bags-vs-readymix-guide` — "Concrete Bags vs. Ready-Mix: Which Is Cheaper?"
New `/methodology` page: how calculations work, bag yields (manufacturer-published
yields, e.g. Quikrete/Sakrete 80-lb ≈ 0.60 cu ft — already in lib/concreteMath.js),
rounding-up policy, review process, limitations, "estimates not quotes".
Expand `/about`: mission, what the site covers, editorial standards, link methodology.
Update `app/sitemap.js` (check how it lists routes — add all new URLs),
`/calculators` hub page (add 3 new), `/guides` hub (add 4 new), header/footer nav.

## 9. Layout (components/Layout.jsx)
- Sticky header: logo, nav (Calculators, Guides, Methodology, About), search icon link.
- Richer footer: columns (Calculators, Guides, Company), tagline, copyright,
  "Estimates only — not professional advice" line, Privacy/Terms/Disclaimer links.

## 10. Verification (per builder, then coordinator)
- `npm run build` passes; `npm run lint` clean (ignore the known eslint.config.js
  module-type warning).
- Every new/changed route returns 200 via `next start` smoke test; sitemap.xml lists
  all new URLs; no console errors on key pages.
- Do NOT push to git — leave a summary of changed files. Parent handles push + deploy.

## 11. Delegation
Spawn 3 builders in parallel, each owns its files end-to-end:
- **Builder A — design system & homepage:** §3, §4 (all components), §5, §9.
- **Builder B — calculator upgrades:** §6 for all 10 existing calculators.
- **Builder C — new pages:** §7 (3 calculators), §8 (4 guides + methodology + about
  expansion + hub/nav/sitemap updates).
Coordinator: resolve conflicts (shared components/APIs), run build+lint, smoke-test
routes, report changed files and any math/content concerns. Builders inherit this
brief via the repo file; keep responses concise.
