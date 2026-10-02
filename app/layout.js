import { Inter } from "next/font/google";
import "./globals.css";
import Layout from "@/components/Layout";
import JsonLd from "@/components/JsonLd";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { SITE_URL, SITE_NAME } from "@/lib/siteConfig";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Free DIY & Contractor Calculators`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Free calculators for DIY builders and contractors: concrete bags, deck materials, fence materials, mulch, paint, and more. Client-side math, no sign-up.",
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  themeColor: "#ea580c",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    description:
      "Free, client-side calculators for DIY builders and contractors: concrete, decking, fencing, mulch, paint, and more.",
    sameAs: [],
  };

  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-stone-50 font-sans">
        <GoogleAnalytics />
        <JsonLd data={orgJsonLd} />
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
