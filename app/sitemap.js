import { SITE_URL } from "@/lib/siteConfig";

const BASE_URL = SITE_URL;

const PAGES = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" },
  { path: "/calculators", priority: 0.9, changeFrequency: "weekly" },
  { path: "/concrete-bags-calculator", priority: 0.9, changeFrequency: "monthly" },
  { path: "/concrete-calculator", priority: 0.9, changeFrequency: "monthly" },
  { path: "/deck-calculator", priority: 0.9, changeFrequency: "monthly" },
  { path: "/fence-calculator", priority: 0.9, changeFrequency: "monthly" },
  { path: "/mulch-calculator", priority: 0.9, changeFrequency: "monthly" },
  { path: "/paint-calculator", priority: 0.9, changeFrequency: "monthly" },
  { path: "/drywall-calculator", priority: 0.9, changeFrequency: "monthly" },
  { path: "/paver-calculator", priority: 0.9, changeFrequency: "monthly" },
  { path: "/sod-calculator", priority: 0.9, changeFrequency: "monthly" },
  { path: "/topsoil-calculator", priority: 0.9, changeFrequency: "monthly" },
  { path: "/guides", priority: 0.8, changeFrequency: "weekly" },
  { path: "/guides/how-to-pour-a-concrete-slab", priority: 0.7, changeFrequency: "monthly" },
  { path: "/guides/fence-planning-guide", priority: 0.7, changeFrequency: "monthly" },
  { path: "/guides/mulch-installation-guide", priority: 0.7, changeFrequency: "monthly" },
  { path: "/about", priority: 0.4, changeFrequency: "yearly" },
  { path: "/contact", priority: 0.4, changeFrequency: "yearly" },
  { path: "/privacy", priority: 0.4, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.4, changeFrequency: "yearly" },
  { path: "/disclaimer", priority: 0.4, changeFrequency: "yearly" },
];

export default function sitemap() {
  const lastModified = new Date("2026-10-01");
  return PAGES.map((p) => ({
    url: `${BASE_URL}${p.path}`,
    lastModified,
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }));
}
