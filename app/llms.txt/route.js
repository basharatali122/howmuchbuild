import { SITE_URL, SITE_NAME } from "@/lib/siteConfig";

const BODY = `# ${SITE_NAME}

> Free calculators for DIY builders, homeowners, and contractors. Every tool
> shows its formulas, worked examples, and material tables. All calculations
> run in the visitor's browser; nothing entered is sent to a server.

${SITE_NAME} answers one question: how much material does a project need, and
what will it cost? Coverage: concrete (bags and ready-mix), stairs, asphalt,
decking, fencing, mulch, paint, drywall, pavers, sod, topsoil, gravel, sand,
and floor tile. Cost estimators on every calculator use prices the visitor
enters — the site never invents prices. Methodology: ${SITE_URL}/methodology

## Calculators

- [Concrete Bags Calculator](${SITE_URL}/concrete-bags-calculator): How many bags of concrete do I need? Slab, wall, footing, column/Sonotube, and fence-post modes with post displacement.
- [Concrete Calculator](${SITE_URL}/concrete-calculator): Concrete volume in cubic yards for slabs, walls, footings, and columns; ready-mix quantities and bag equivalents.
- [Stair Calculator](${SITE_URL}/stair-calculator): Stair rise, run, riser count, tread depth, stringer length, and stair angle from total rise.
- [Asphalt Calculator](${SITE_URL}/asphalt-calculator): Asphalt tonnage for driveways from area and thickness (hot-mix density).
- [Deck Calculator](${SITE_URL}/deck-calculator): Full deck material takeoff: decking boards, joists, rim boards, posts, footings, screws, rail balusters.
- [Fence Calculator](${SITE_URL}/fence-calculator): Fence posts, pickets, rails, concrete, and gates from length, height, and style.
- [Mulch Calculator](${SITE_URL}/mulch-calculator): Mulch in cubic yards or bags for beds, circles, and triangles at a chosen depth.
- [Paint Calculator](${SITE_URL}/paint-calculator): Paint gallons for rooms (doors/windows subtracted) or exterior, with coats compared.
- [Drywall Calculator](${SITE_URL}/drywall-calculator): Drywall sheets, screws, joint compound, and tape for walls and ceilings.
- [Paver Calculator](${SITE_URL}/paver-calculator): Paver counts with pattern waste, base gravel, bedding sand, and polymeric sand.
- [Sod Calculator](${SITE_URL}/sod-calculator): Sod pallets for rectangular or circular lawns, with waste allowance.
- [Topsoil Calculator](${SITE_URL}/topsoil-calculator): Topsoil in cubic yards or bags for lawns and raised beds.
- [Gravel Calculator](${SITE_URL}/gravel-calculator): Gravel tonnage and cubic yards for driveways, bases, and beds.
- [Sand Calculator](${SITE_URL}/sand-calculator): Sand tonnage and cubic yards for bases, bedding, and play areas.
- [Tile Calculator](${SITE_URL}/tile-calculator): Floor tile counts with waste allowance and boxes from tiles-per-box.

## Guides

- [How to Pour a Concrete Slab](${SITE_URL}/guides/how-to-pour-a-concrete-slab)
- [How Much Does a Concrete Slab Cost?](${SITE_URL}/guides/concrete-slab-cost-guide)
- [Concrete Bags vs. Ready-Mix](${SITE_URL}/guides/bags-vs-readymix-guide)
- [How Much Does a Deck Cost?](${SITE_URL}/guides/deck-cost-guide)
- [How Much Does a Fence Cost?](${SITE_URL}/guides/fence-cost-guide)
- [Fence Planning Guide](${SITE_URL}/guides/fence-planning-guide)
- [Mulch Installation Guide](${SITE_URL}/guides/mulch-installation-guide)

## Trust

- Methodology and constants: ${SITE_URL}/methodology
- About: ${SITE_URL}/about
- Contact: ${SITE_URL}/contact (contact@howmuchbuild.com)
`;

export function GET() {
  return new Response(BODY, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
