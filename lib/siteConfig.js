/**
 * lib/siteConfig.js
 *
 * Single source of truth for site-wide configuration.
 * Override any value at deploy time with the matching NEXT_PUBLIC_*
 * environment variable (e.g. NEXT_PUBLIC_SITE_URL).
 *
 * NOTE: NEXT_PUBLIC_* values are baked in at BUILD time, so changing an
 * env var requires a rebuild/redeploy to take effect.
 */

export const SITE_NAME = "HowMuchBuild";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://howmuchbuild.com";

export const CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL || "contact@howmuchbuild.com";

export const AUTHOR_NAME =
  process.env.NEXT_PUBLIC_AUTHOR_NAME || "The HowMuchBuild Team";

export const ADS_ENABLED =
  process.env.NEXT_PUBLIC_ADS_ENABLED === "true";

export const ADSENSE_PUBLISHER_ID =
  process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID || "pub-0000000000000000";
