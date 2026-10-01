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
