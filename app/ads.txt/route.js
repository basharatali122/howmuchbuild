import { ADSENSE_PUBLISHER_ID } from "@/lib/siteConfig";

/**
 * GET /ads.txt — AdSense/authorized-seller declaration.
 * Served from config so the publisher ID is set via
 * NEXT_PUBLIC_ADSENSE_PUBLISHER_ID at build time.
 * Replace the placeholder ID with the real one after AdSense approval.
 */
export async function GET() {
  const body = `google.com, ${ADSENSE_PUBLISHER_ID}, DIRECT, f08c47fec0942fa0\n`;
  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
