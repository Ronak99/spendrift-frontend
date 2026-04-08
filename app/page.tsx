import Link from "next/link";

export default function Home() {
  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center px-5 text-center"
      style={{ backgroundColor: "var(--bg)" }}
    >
      {/* Logo mark */}
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8 text-2xl font-black"
        style={{ backgroundColor: "var(--accent)", color: "#fff" }}
      >
        S
      </div>

      <h1
        className="text-5xl font-bold tracking-tight leading-none mb-4"
        style={{ color: "var(--text-primary)" }}
      >
        Spendrift
      </h1>

      <p
        className="text-lg max-w-sm leading-relaxed mb-10"
        style={{ color: "var(--text-secondary)" }}
      >
        Your finances, on your device. Simple, private, and always in your control.
      </p>

      {/* App Store badge placeholder */}
      <a
        href="#"
        className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-sm transition-opacity hover:opacity-80"
        style={{ backgroundColor: "var(--accent)", color: "#fff" }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
        </svg>
        Download on the App Store
      </a>

      {/* Footer links */}
      <div
        className="mt-16 flex items-center gap-6 text-xs"
        style={{ color: "var(--text-secondary)" }}
      >
        <Link
          href="/privacy-policy"
          className="hover:opacity-70 transition-opacity"
          style={{ color: "var(--text-secondary)" }}
        >
          Privacy Policy
        </Link>
        <span style={{ color: "var(--border)" }}>·</span>
        <a
          href="mailto:punase.ronak99@gmail.com"
          className="hover:opacity-70 transition-opacity"
          style={{ color: "var(--text-secondary)" }}
        >
          Contact
        </a>
        <span style={{ color: "var(--border)" }}>·</span>
        <span>&copy; 2026 Spendrift</span>
      </div>
    </main>
  );
}
