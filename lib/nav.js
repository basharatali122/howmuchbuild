/**
 * lib/nav.js
 *
 * Shared navigation data: calculators, guides, company pages.
 * Header, footer, homepage, hub pages, and search render from these lists.
 * iconName maps to an export in components/SvgDiagrams.jsx (e.g. "slab" -> IconSlab).
 */

export const calculatorNav = [
  {
    href: "/concrete-bags-calculator",
    title: "Concrete Bags Calculator",
    desc: "How many bags of concrete do I need? Slab, wall, footing, column & fence-post modes with post displacement.",
    iconName: "slab",
  },
  {
    href: "/concrete-calculator",
    title: "Concrete Calculator",
    desc: "Cubic yards, ready-mix quantities, and bag equivalents for any pour.",
    iconName: "wall",
  },
  {
    href: "/deck-calculator",
    title: "Deck Calculator",
    desc: "Boards, joists, posts, footings, screws & railing from your deck dimensions.",
    iconName: "deck",
  },
  {
    href: "/fence-calculator",
    title: "Fence Calculator",
    desc: "Posts, pickets, rails, concrete & gates from length, height, and style.",
    iconName: "fence",
  },
  {
    href: "/mulch-calculator",
    title: "Mulch Calculator",
    desc: "Beds, circles & triangles — cubic yards or bags, with depth in inches.",
    iconName: "mulch",
  },
  {
    href: "/paint-calculator",
    title: "Paint Calculator",
    desc: "Gallons for rooms, walls, and exteriors — doors & windows subtracted, coats compared.",
    iconName: "paint",
  },
  {
    href: "/drywall-calculator",
    title: "Drywall Calculator",
    desc: "Sheets, screws, joint compound & tape for walls and ceilings.",
    iconName: "drywall",
  },
  {
    href: "/paver-calculator",
    title: "Paver Calculator",
    desc: "Paver counts, base gravel, bedding sand & polymeric sand for patios and walkways.",
    iconName: "paver",
  },
  {
    href: "/sod-calculator",
    title: "Sod Calculator",
    desc: "Sod rolls and pallets to cover your lawn area, with waste allowance.",
    iconName: "sod",
  },
  {
    href: "/topsoil-calculator",
    title: "Topsoil Calculator",
    desc: "Cubic yards and bags of topsoil for beds, lawns, and grading.",
    iconName: "soil",
  },
  {
    href: "/gravel-calculator",
    title: "Gravel Calculator",
    desc: "How much gravel do I need — tons and cubic yards for driveways and beds.",
    iconName: "gravel",
  },
  {
    href: "/sand-calculator",
    title: "Sand Calculator",
    desc: "Sand by the ton or cubic yard for bases, bedding, and fill.",
    iconName: "sand",
  },
  {
    href: "/tile-calculator",
    title: "Tile Calculator",
    desc: "How many tiles do I need — tiles, waste, and boxes for floors.",
    iconName: "tile",
  },
  {
    href: "/stair-calculator",
    title: "Stair Calculator",
    desc: "Risers, treads, total run, stringer length & angle from your total rise.",
    iconName: "stair",
  },
  {
    href: "/asphalt-calculator",
    title: "Asphalt Calculator",
    desc: "How much asphalt do I need — tons and cubic yards for driveways and patches.",
    iconName: "asphalt",
  },
];

export const guideNav = [
  {
    href: "/guides/how-to-pour-a-concrete-slab",
    title: "How to Pour a Concrete Slab",
    desc: "Step-by-step DIY guide: planning, forms, base, pour, finish, and cure.",
  },
  {
    href: "/guides/fence-planning-guide",
    title: "Fence Planning Guide",
    desc: "Layout, post spacing, and setting posts that stay straight.",
  },
  {
    href: "/guides/mulch-installation-guide",
    title: "Mulch Installation Guide",
    desc: "Depth, bed prep, and how much mulch to buy.",
  },
  {
    href: "/guides/concrete-slab-cost-guide",
    title: "How Much Does a Concrete Slab Cost?",
    desc: "Cost ranges for a poured slab — and what drives the price up or down.",
  },
  {
    href: "/guides/deck-cost-guide",
    title: "How Much Does a Deck Cost?",
    desc: "Deck cost ranges by size and material, explained.",
  },
  {
    href: "/guides/fence-cost-guide",
    title: "How Much Does a Fence Cost?",
    desc: "Fence cost ranges by material and length.",
  },
  {
    href: "/guides/bags-vs-readymix-guide",
    title: "Concrete Bags vs. Ready-Mix: Which Is Cheaper?",
    desc: "The break-even math between bagged concrete and a ready-mix truck.",
  },
];

export const companyNav = [
  { href: "/about", title: "About" },
  { href: "/methodology", title: "Methodology" },
  { href: "/contact", title: "Contact" },
  { href: "/privacy", title: "Privacy Policy" },
  { href: "/terms", title: "Terms of Service" },
  { href: "/disclaimer", title: "Disclaimer" },
];
