import type { Metadata } from "next";
import LandingPage from "./components/LandingPage";
import { SEO_KEYWORDS, SITE_DESCRIPTION, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: `${SITE_NAME} — Expense tracker app for iOS`,
  description: SITE_DESCRIPTION,
  keywords: [...SEO_KEYWORDS],
  alternates: { canonical: "/" },
  openGraph: {
    url: "/",
    title: `${SITE_NAME} — Expense tracker app for iOS`,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    title: `${SITE_NAME} — Expense tracker app for iOS`,
    description: SITE_DESCRIPTION,
  },
};

export default function Home() {
  return <LandingPage />;
}
