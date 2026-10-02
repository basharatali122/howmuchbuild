/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // Fully static, client-side-only math — no server runtime needed for
  // computation. Pages remain Server Components purely for metadata/SEO.
  compress: true,
  async redirects() {
    return [
      {
        // Consolidate www → apex (canonical domain). Preview deployments
        // (*.vercel.app) are unaffected since this only matches the www host.
        source: "/:path*",
        has: [{ type: "host", value: "www.howmuchbuild.com" }],
        destination: "https://howmuchbuild.com/:path*",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
