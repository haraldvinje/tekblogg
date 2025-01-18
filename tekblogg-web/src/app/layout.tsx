import "normalize.css";
import "./globals.css";
import type { ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/react";
import { GoogleTagManager } from "@next/third-parties/google";
import { ThemeProvider } from "next-themes";
import { generateCanonicalUrl } from "@/lib/text-utils";
import { Navbar } from "@/components/navbar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

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

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const gtmId = process.env.NEXT_PUBLIC_GTM_CONTAINER_ID ?? "";

  return (
    <html lang="nb" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased transition duration-500 dark:bg-dark`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableColorScheme={false}
        >
          <Navbar />
          <main className="m-auto my-10 flex w-[calc(100vw-2rem)] justify-center xl:w-[60%]">
            {children}
          </main>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
        <GoogleTagManager gtmId={gtmId} />
      </body>
    </html>
  );
}
