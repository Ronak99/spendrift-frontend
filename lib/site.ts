/**
 * Canonical site URL for metadata (Open Graph, JSON-LD, sitemap).
 * Prefer `NEXT_PUBLIC_SITE_URL` in production (e.g. https://spendrift.app).
 * On Vercel, `VERCEL_URL` is used when the public URL env is unset.
 */
function resolveSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (fromEnv) return fromEnv;
  const vercel = process.env.VERCEL_URL?.replace(/\/$/, "");
  if (vercel) return `https://${vercel}`;
  return "http://localhost:3000";
}

export const SITE_URL = resolveSiteUrl();

export const SITE_NAME = "Spendrift";

export const SITE_DESCRIPTION =
  "Spendrift is a privacy-first expense tracker for iPhone. Track spending on your device, import bank statements, use voice entry, and download free on the App Store.";

export const APP_STORE_URL = "https://apps.apple.com/us/app/spendrift/id6761763507";

export const APP_STORE_ID = "6761763507";

export const CREATOR_NAME = "Ronak Punase";

export const CREATOR_EMAIL = "me@ronakpunase.dev";

export const SEO_KEYWORDS = [
  "Spendrift",
  "Spendrift app",
  "expense tracker app for iOS",
  "expense tracker iPhone",
  "iOS expense tracker",
  "personal finance app iPhone",
  "privacy first budgeting app",
  "on-device finance app",
  "Ronak Punase",
  "bank statement import expenses",
  "voice expense entry",
] as const;
