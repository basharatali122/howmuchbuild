# HowMuchBuild

Free calculators for DIY builders and contractors — concrete, decking,
fencing, mulch, paint, and more. Next.js 16 (App Router), Tailwind CSS,
fully static, client-side math.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (must pass before deploy)
npm run lint
```

## Configuration

Copy `.env.example` to `.env` (or set vars in your host) before building:

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical URL, no trailing slash |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Shown on the Contact page |
| `NEXT_PUBLIC_AUTHOR_NAME` | Footer credit |
| `NEXT_PUBLIC_ADS_ENABLED` | `"true"` only after ad-network approval — ad slots stay hidden otherwise |
| `NEXT_PUBLIC_ADSENSE_PUBLISHER_ID` | Publisher ID served by the `/ads.txt` route (placeholder until approval) |

`NEXT_PUBLIC_*` values are baked in at build time; rebuild after changing.

## Deploy (Vercel)

Standard Next.js build — no `output: export`. Push the repo, import in
Vercel, set the env vars above in the project dashboard, and point the
`howmuchbuild.com` DNS to Vercel. `/ads.txt` is a route handler reading
the publisher ID from config, so it works on Vercel without any static
file.

## Project map

- `app/concrete-bags-calculator/` — page #1: interactive calculator + worked
  examples, yield/coverage tables, formulas, FAQ with JSON-LD
- `app/calculators/` — calculators hub (live + coming-soon, no dead links)
- `app/ads.txt/route.js` — serves the AdSense authorization line from config
- `components/ConcreteBagsCalculator.jsx` — the client-side tool
  (slab / wall / footing / column / fence-post modes)
- `components/SvgDiagrams.jsx` — original hand-drawn SVG diagrams
- `lib/concreteMath.js` — pure math + documented constants
- `components/AdSlot.jsx` — ad placeholder, hidden unless `ADS_ENABLED`
- `app/about|contact|privacy|terms` — AdSense-readiness pages

## Math basis

- 1 cu yd = 27 cu ft (exact); 1 cu m = 35.3147 cu ft
- Premix bag yields (industry standard, printed on US bags):
  80 lb → 0.60 cu ft, 60 lb → 0.45 cu ft, 40 lb → 0.30 cu ft
- Nominal lumber: 4×4 → 3.5″×3.5″ actual, 6×6 → 5.5″×5.5″ actual
- Bags always rounded UP (`Math.ceil`)
