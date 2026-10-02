/**
 * components/SvgDiagrams.jsx
 *
 * Original hand-drawn SVG diagrams for the concrete calculator pages.
 * Every shape is drawn from scratch for this site — no stock art,
 * no copied images.
 */

function ArrowDefs({ id }) {
  return (
    <defs>
      <marker
        id={`arr-${id}`}
        markerWidth="8"
        markerHeight="8"
        refX="4"
        refY="4"
        orient="auto"
      >
        <path d="M0,0 L8,4 L0,8" fill="none" stroke="#57534e" strokeWidth="1.4" />
      </marker>
      <pattern
        id={`dots-${id}`}
        width="12"
        height="12"
        patternUnits="userSpaceOnUse"
      >
        <rect width="12" height="12" fill="#d6d3d1" />
        <circle cx="3" cy="4" r="1.6" fill="#a8a29e" />
        <circle cx="9" cy="9" r="1.6" fill="#a8a29e" />
      </pattern>
      <pattern
        id={`hatch-${id}`}
        width="14"
        height="14"
        patternUnits="userSpaceOnUse"
        patternTransform="rotate(45)"
      >
        <rect width="14" height="14" fill="#f5f0e8" />
        <line x1="0" y1="0" x2="0" y2="14" stroke="#e7e0d2" strokeWidth="4" />
      </pattern>
    </defs>
  );
}

/**
 * Isometric slab with labeled Length / Width / Thickness.
 */
export function SlabDiagram() {
  const id = "slab";
  return (
    <svg
      viewBox="0 0 460 320"
      role="img"
      aria-label="Diagram of a concrete slab showing length, width, and thickness dimensions"
      className="h-auto w-full"
    >
      <ArrowDefs id={id} />
      {/* top face */}
      <polygon
        points="120,150 320,150 370,100 170,100"
        fill="#e7e5e4"
        stroke="#78716c"
        strokeWidth="1.5"
      />
      {/* right face */}
      <polygon
        points="320,150 370,100 370,175 320,225"
        fill="#d6d3d1"
        stroke="#78716c"
        strokeWidth="1.5"
      />
      {/* front face */}
      <polygon
        points="120,150 320,150 320,225 120,225"
        fill={`url(#dots-${id})`}
        stroke="#78716c"
        strokeWidth="1.5"
      />
      {/* Length dimension (below front face) */}
      <line
        x1="120"
        y1="252"
        x2="320"
        y2="252"
        stroke="#57534e"
        strokeWidth="1.4"
        markerStart={`url(#arr-${id})`}
        markerEnd={`url(#arr-${id})`}
      />
      <text x="220" y="272" textAnchor="middle" fontSize="15" fill="#44403c" fontWeight="600">
        Length (L)
      </text>
      {/* Width dimension (along top-right edge) */}
      <line
        x1="332"
        y1="152"
        x2="382"
        y2="102"
        stroke="#57534e"
        strokeWidth="1.4"
        markerStart={`url(#arr-${id})`}
        markerEnd={`url(#arr-${id})`}
      />
      <text x="392" y="112" textAnchor="start" fontSize="15" fill="#44403c" fontWeight="600">
        Width (W)
      </text>
      {/* Thickness dimension (left of front face) */}
      <line
        x1="100"
        y1="150"
        x2="100"
        y2="225"
        stroke="#57534e"
        strokeWidth="1.4"
        markerStart={`url(#arr-${id})`}
        markerEnd={`url(#arr-${id})`}
      />
      <text x="88" y="192" textAnchor="end" fontSize="15" fill="#44403c" fontWeight="600">
        Thickness (T)
      </text>
      <text x="220" y="192" textAnchor="middle" fontSize="14" fill="#57534e">
        V = L × W × T
      </text>
    </svg>
  );
}

/**
 * Cross-section of a fence post hole: the post displaces concrete,
 * so concrete fill = hole volume − post volume.
 */
export function FencePostDiagram() {
  const id = "post";
  return (
    <svg
      viewBox="0 0 460 360"
      role="img"
      aria-label="Cross-section diagram of a fence post hole showing the post displacing concrete"
      className="h-auto w-full"
    >
      <ArrowDefs id={id} />
      {/* soil */}
      <rect x="20" y="80" width="420" height="260" fill={`url(#hatch-${id})`} />
      {/* grass line */}
      <rect x="20" y="74" width="420" height="8" fill="#86a860" rx="2" />
      <text x="30" y="66" fontSize="13" fill="#44403c" fontWeight="600">
        Ground level
      </text>
      {/* concrete fill (hole minus post is drawn as full hole, post on top) */}
      <rect
        x="160"
        y="80"
        width="140"
        height="230"
        rx="10"
        fill={`url(#dots-${id})`}
        stroke="#78716c"
        strokeWidth="1.5"
      />
      {/* wooden post */}
      <rect
        x="212"
        y="30"
        width="36"
        height="280"
        fill="#b07a45"
        stroke="#7c4a1e"
        strokeWidth="1.5"
      />
      <line x1="218" y1="40" x2="218" y2="300" stroke="#7c4a1e" strokeWidth="1" opacity="0.5" />
      <line x1="228" y1="40" x2="228" y2="300" stroke="#7c4a1e" strokeWidth="1" opacity="0.5" />
      <line x1="240" y1="40" x2="240" y2="300" stroke="#7c4a1e" strokeWidth="1" opacity="0.5" />
      {/* hole depth dimension */}
      <line
        x1="138"
        y1="80"
        x2="138"
        y2="310"
        stroke="#57534e"
        strokeWidth="1.4"
        markerStart={`url(#arr-${id})`}
        markerEnd={`url(#arr-${id})`}
      />
      <text x="126" y="200" textAnchor="end" fontSize="14" fill="#44403c" fontWeight="600">
        Hole depth
      </text>
      {/* hole diameter dimension */}
      <line
        x1="160"
        y1="96"
        x2="300"
        y2="96"
        stroke="#57534e"
        strokeWidth="1.4"
        markerStart={`url(#arr-${id})`}
        markerEnd={`url(#arr-${id})`}
      />
      <text x="230" y="88" textAnchor="middle" fontSize="13" fill="#44403c">
        Hole diameter
      </text>
      {/* post label */}
      <line x1="248" y1="180" x2="330" y2="180" stroke="#57534e" strokeWidth="1.2" />
      <circle cx="248" cy="180" r="3" fill="#57534e" />
      <text x="336" y="176" fontSize="13" fill="#44403c" fontWeight="600">
        4×4 post
      </text>
      <text x="336" y="192" fontSize="12" fill="#78716c">
        (actual 3.5″ × 3.5″)
      </text>
      {/* concrete label */}
      <line x1="160" y1="260" x2="90" y2="260" stroke="#57534e" strokeWidth="1.2" />
      <circle cx="160" cy="260" r="3" fill="#57534e" />
      <text x="84" y="256" textAnchor="end" fontSize="13" fill="#44403c" fontWeight="600">
        Concrete fill
      </text>
      {/* formula note */}
      <rect x="20" y="316" width="420" height="34" rx="8" fill="#fff7ed" stroke="#fdba74" />
      <text x="230" y="338" textAnchor="middle" fontSize="13.5" fill="#9a3412" fontWeight="600">
        Concrete needed = hole volume − post volume
      </text>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Calculator icon set — original line-art icons, one per calculator.  */
/* 48×48 viewBox, stroke="currentColor"; the parent sets the color.     */
/* ------------------------------------------------------------------ */

function IconSvg({ className = "h-8 w-8", children }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

/** Concrete slab (isometric). */
export function IconSlab({ className }) {
  return (
    <IconSvg className={className}>
      <path d="M8 20 L28 12 L42 18 L22 26 Z" />
      <path d="M8 20 L22 26 L22 37 L8 31 Z" />
      <path d="M22 26 L42 18 L42 29 L22 37 Z" />
    </IconSvg>
  );
}

/** Concrete wall / block wall. */
export function IconWall({ className }) {
  return (
    <IconSvg className={className}>
      <rect x="8" y="12" width="32" height="24" />
      <line x1="8" y1="20" x2="40" y2="20" />
      <line x1="8" y1="28" x2="40" y2="28" />
      <line x1="18" y1="12" x2="18" y2="20" />
      <line x1="30" y1="12" x2="30" y2="20" />
      <line x1="14" y1="20" x2="14" y2="28" />
      <line x1="26" y1="20" x2="26" y2="28" />
      <line x1="38" y1="20" x2="38" y2="28" />
      <line x1="18" y1="28" x2="18" y2="36" />
      <line x1="30" y1="28" x2="30" y2="36" />
    </IconSvg>
  );
}

/** Deck (boards on joists). */
export function IconDeck({ className }) {
  return (
    <IconSvg className={className}>
      <line x1="6" y1="14" x2="42" y2="14" />
      <line x1="6" y1="22" x2="42" y2="22" />
      <line x1="6" y1="30" x2="42" y2="30" />
      <line x1="14" y1="8" x2="14" y2="38" />
      <line x1="34" y1="8" x2="34" y2="38" />
    </IconSvg>
  );
}

/** Fence (pickets + rails). */
export function IconFence({ className }) {
  return (
    <IconSvg className={className}>
      <line x1="6" y1="18" x2="42" y2="18" />
      <line x1="6" y1="30" x2="42" y2="30" />
      <line x1="11" y1="10" x2="11" y2="38" />
      <line x1="19" y1="10" x2="19" y2="38" />
      <line x1="27" y1="10" x2="27" y2="38" />
      <line x1="35" y1="10" x2="35" y2="38" />
    </IconSvg>
  );
}

/** Mulch pile. */
export function IconMulch({ className }) {
  return (
    <IconSvg className={className}>
      <path d="M6 36 Q24 12 42 36" />
      <line x1="6" y1="36" x2="42" y2="36" />
      <circle cx="20" cy="28" r="1" fill="currentColor" />
      <circle cx="27" cy="24" r="1" fill="currentColor" />
      <circle cx="31" cy="31" r="1" fill="currentColor" />
      <circle cx="17" cy="33" r="1" fill="currentColor" />
    </IconSvg>
  );
}

/** Paint roller. */
export function IconPaint({ className }) {
  return (
    <IconSvg className={className}>
      <rect x="6" y="8" width="20" height="10" rx="2" />
      <path d="M16 18 L16 26 L30 26 L30 40" />
      <line x1="24" y1="40" x2="36" y2="40" />
    </IconSvg>
  );
}

/** Drywall sheet. */
export function IconDrywall({ className }) {
  return (
    <IconSvg className={className}>
      <rect x="10" y="6" width="28" height="36" />
      <circle cx="16" cy="12" r="1" fill="currentColor" />
      <circle cx="32" cy="12" r="1" fill="currentColor" />
      <circle cx="16" cy="36" r="1" fill="currentColor" />
      <circle cx="32" cy="36" r="1" fill="currentColor" />
    </IconSvg>
  );
}

/** Pavers. */
export function IconPaver({ className }) {
  return (
    <IconSvg className={className}>
      <rect x="8" y="8" width="14" height="14" />
      <rect x="26" y="8" width="14" height="14" />
      <rect x="8" y="26" width="14" height="14" />
      <rect x="26" y="26" width="14" height="14" />
    </IconSvg>
  );
}

/** Sod roll. */
export function IconSod({ className }) {
  return (
    <IconSvg className={className}>
      <circle cx="15" cy="30" r="9" />
      <path d="M15 30 m-4 0 a4 4 0 1 1 4 4" />
      <path d="M24 30 L42 30" />
      <path d="M42 30 L42 38 L24 38" />
    </IconSvg>
  );
}

/** Topsoil (layered ground). */
export function IconSoil({ className }) {
  return (
    <IconSvg className={className}>
      <line x1="6" y1="14" x2="42" y2="14" />
      <path d="M8 22 L40 22" strokeDasharray="4 3" />
      <path d="M8 30 L40 30" strokeDasharray="4 3" />
      <line x1="6" y1="38" x2="42" y2="38" />
      <circle cx="18" cy="26" r="1" fill="currentColor" />
      <circle cx="30" cy="34" r="1" fill="currentColor" />
    </IconSvg>
  );
}

/** Gravel (stone cluster). */
export function IconGravel({ className }) {
  return (
    <IconSvg className={className}>
      <polygon points="14,30 20,22 28,24 26,32" />
      <polygon points="28,32 34,24 40,28 36,36" />
      <polygon points="10,38 18,34 24,38 18,42" />
      <polygon points="28,40 36,38 40,42 32,44" />
    </IconSvg>
  );
}

/** Sand (dune + grains). */
export function IconSand({ className }) {
  return (
    <IconSvg className={className}>
      <path d="M6 34 Q18 22 30 30 Q38 35 42 28" />
      <line x1="6" y1="40" x2="42" y2="40" />
      <circle cx="16" cy="14" r="1" fill="currentColor" />
      <circle cx="24" cy="10" r="1" fill="currentColor" />
      <circle cx="32" cy="15" r="1" fill="currentColor" />
    </IconSvg>
  );
}

/** Floor tile. */
export function IconTile({ className }) {
  return (
    <IconSvg className={className}>
      <rect x="8" y="8" width="32" height="32" />
      <line x1="24" y1="8" x2="24" y2="40" />
      <line x1="8" y1="24" x2="40" y2="24" />
    </IconSvg>
  );
}

export function IconStair({ className }) {
  return (
    <IconSvg className={className}>
      <path d="M6 42 h9 v-9 h9 v-9 h9 v-9 h9" />
      <line x1="6" y1="42" x2="42" y2="42" />
    </IconSvg>
  );
}

export function IconAsphalt({ className }) {
  return (
    <IconSvg className={className}>
      <path d="M10 38 L20 12 h18 L28 38 Z" />
      <line x1="24" y1="16" x2="19" y2="34" strokeDasharray="4 3" />
    </IconSvg>
  );
}
