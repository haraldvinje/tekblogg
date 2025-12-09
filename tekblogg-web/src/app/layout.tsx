import "./globals.css";
import type { Metadata, Viewport } from "next";
import { generateCanonicalUrl } from "@/lib/text-utils";

const title = "TekBlogg";
const titleObject = {
  default: title,
  template: "%s - TekBlogg",
};
const description =
  "Velkommen til TekBlogg 🤓 Sjekk ut det nyeste innen teknologi og programmering her!";
const image = { url: "/harald_og.png", width: 800, height: 600 };

const url = generateCanonicalUrl();

const commonFields = {
  title,
  description,
  images: image,
  url,
};

export const metadata: Metadata = {
  manifest: "/manifest.json",
  metadataBase: url,
  alternates: {
    canonical: "/",
  },
  ...commonFields,
  openGraph: {
    type: "website",
    siteName: title,
    description,
    images: [image],
    url,
    title,
    ...titleObject,
  },
  twitter: {
    card: "summary",
    ...commonFields,
    ...titleObject,
  },
  appleWebApp: {
    statusBarStyle: "default",
    title,
  },
  formatDetection: {
    telephone: false,
  },
  other: {
    "mobile-web-app-capable": ["yes"],
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
  colorScheme: "light",
};

export default function RootLayout() {
  return (
    <html lang="nb">
      <body className="hello"></body>
    </html>
  );
}
