import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { FEATURE_VIDEO_SOURCES } from "@/lib/marketing-video-urls";
import {
  APP_STORE_ID,
  APP_STORE_URL,
  CREATOR_EMAIL,
  CREATOR_NAME,
  SEO_KEYWORDS,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
} from "@/lib/site";
import JsonLd from "./components/JsonLd";
import VideoPrefetch from "./components/VideoPrefetch";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Privacy-first expense tracker for iPhone`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: CREATOR_NAME, url: `mailto:${CREATOR_EMAIL}` }],
  creator: CREATOR_NAME,
  keywords: [...SEO_KEYWORDS],
  category: "finance",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Expense tracker for iOS`,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} — privacy-first expense tracking on iPhone`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Expense tracker for iOS`,
    description: SITE_DESCRIPTION,
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: [{ url: "/favicon.ico", type: "image/x-icon", sizes: "any" }],
    shortcut: "/favicon.ico",
  },
  appleWebApp: {
    title: SITE_NAME,
  },
  itunes: {
    appId: APP_STORE_ID,
    appArgument: APP_STORE_URL,
  },
  appLinks: {
    ios: { url: APP_STORE_URL, app_store_id: APP_STORE_ID, app_name: SITE_NAME },
    web: { url: SITE_URL, should_fallback: true },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {FEATURE_VIDEO_SOURCES.map((href) => (
          <link key={href} rel="preload" as="video" href={href} />
        ))}
      </head>
      <body className="min-h-full flex flex-col">
        <JsonLd />
        <VideoPrefetch />
        {children}
      </body>
    </html>
  );
}
