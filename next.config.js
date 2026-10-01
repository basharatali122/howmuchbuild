/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // Fully static, client-side-only math — no server runtime needed for
  // computation. Pages remain Server Components purely for metadata/SEO.
  compress: true,
};

module.exports = nextConfig;
