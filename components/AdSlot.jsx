import { ADS_ENABLED } from "@/lib/siteConfig";

/**
 * AdSlot — a reserved ad placement that stays invisible until the site is
 * approved by an ad network. Render nothing while NEXT_PUBLIC_ADS_ENABLED
 * is not "true"; when enabled, the ad network's script fills this slot.
 */
export default function AdSlot({ label = "Advertisement", className = "" }) {
  if (!ADS_ENABLED) return null;
  return (
    <div
      role="complementary"
      aria-label={label}
      className={`ad-slot min-h-28 w-full ${className}`}
    >
      {label}
    </div>
  );
}
