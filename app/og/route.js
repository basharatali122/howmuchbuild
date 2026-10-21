import { ImageResponse } from "@vercel/og";

export const runtime = "edge";

// Dynamic social preview card (1200x630) for link shares.
// Usage: /og?title=...&sub=...  (URL-encoded)
export async function GET(request) {
  const { searchParams } = new URL(request.url);

  // User style rule: no em dashes anywhere in content - normalize them here.
  const clean = (s, max) =>
    (s || "")
      .replace(/[\u2014\u2013]/g, "-")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, max);

  const title = clean(searchParams.get("title"), 90) || "HowMuchBuild";
  const sub =
    clean(searchParams.get("sub"), 150) ||
    "Free DIY and contractor calculators. No sign-up.";

  const ticks = Array.from({ length: 34 });

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0A1628",
          backgroundImage:
            "linear-gradient(135deg, #0A1628 0%, #0F2240 55%, #12305A 100%)",
          padding: "64px 72px",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        {/* tape measure strip */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              flexShrink: 0,
              backgroundColor: "#EA580C",
              borderRadius: "10px",
              height: "56px",
              padding: "0 18px",
              overflow: "hidden",
            }}
          >
            {ticks.map((_, i) => (
              <div
                key={i}
                style={{
                  width: "3px",
                  height: i % 5 === 0 ? "30px" : "16px",
                  backgroundColor: "#0A1628",
                  marginRight: "11px",
                }}
              />
            ))}
          </div>
          <div
            style={{
              marginLeft: "24px",
              color: "#EA580C",
              fontSize: "30px",
              fontWeight: 800,
              letterSpacing: "4px",
            }}
          >
            HOWMUCHBUILD
          </div>
        </div>

        {/* title + subtitle */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              color: "#FFFFFF",
              fontSize: title.length > 55 ? "64px" : "76px",
              fontWeight: 800,
              lineHeight: 1.12,
              marginBottom: "22px",
            }}
          >
            {title}
          </div>
          <div
            style={{
              color: "#CBD5E1",
              fontSize: "33px",
              lineHeight: 1.35,
            }}
          >
            {sub}
          </div>
        </div>

        {/* footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              color: "#EA580C",
              fontSize: "30px",
              fontWeight: 800,
              letterSpacing: "2px",
            }}
          >
            HOWMUCHBUILD.COM
          </div>
          <div style={{ color: "#94A3B8", fontSize: "26px" }}>
            Free calculator - no sign-up
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
