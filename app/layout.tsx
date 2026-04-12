import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { FEATURE_VIDEO_SOURCES } from "@/lib/marketing-video-urls";
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
  title: "Spendrift",
  description: "Your finances, on your device. Simple, private, and always in your control.",
  icons: {
    icon: "/favicon.ico",
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
        <VideoPrefetch />
        {children}
      </body>
    </html>
  );
}
