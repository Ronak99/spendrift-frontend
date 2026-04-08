import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — Spendrift",
  description: "Privacy Policy for the Spendrift mobile application.",
};

const sections = [
  {
    id: "summary",
    number: 1,
    title: "Summary",
    content: [
      "Spendrift is designed so your day-to-day financial records—such as transactions, accounts, and categories—are stored on your device. We do not operate our own servers to collect or host that database for you.",
      `Some optional features send content you choose (for example a bank statement file or a voice recording) to independent third-party artificial intelligence ("AI") services so the App can interpret that content and help you enter transactions. Those providers process the data you send according to their own policies.`,
    ],
  },
  {
    id: "device-storage",
    number: 2,
    title: "Data Stored on Your Device and iCloud",
    content: [
      "Your transaction history and related information you save in Spendrift are kept in local storage on your device (the App's on-device database). Spendrift does not upload that database to servers we control or to other third-party backends for the purpose of storing your financial records on our behalf.",
      "If you use Apple's iCloud services (for example iCloud Backup or other device backup and sync features available for your Apple ID), copies of your App data may be included in your personal iCloud account as part of how Apple backs up or syncs data across your devices. That handling is governed by Apple's privacy practices and your device and Apple ID settings—not by Spendrift operating a separate cloud copy of your data on non-Apple servers.",
    ],
  },
  {
    id: "ai-services",
    number: 3,
    title: "Third-Party AI Services",
    content: [
      "The App uses third-party AI models to power certain features. We do not name individual providers here; those providers may change over time. When you use a feature that relies on AI, the minimum content needed to perform that feature is sent to the AI provider over the network.",
    ],
  },
  {
    id: "import-statement",
    number: 4,
    title: "Import Statement Feature",
    content: [
      `Spendrift offers an optional "Import Statement" (or similar) flow that lets you select a bank or card statement file (for example a PDF) so the App can suggest transactions to add.`,
    ],
    callout:
      "Bank statements can contain highly sensitive information, including but not limited to account details, balances, merchant names, and transfer descriptions. When you use this feature, the statement file you select is transmitted to a third-party AI service so it can read the document and return structured suggestions (such as amounts, dates, and descriptions). That means sensitive information contained in the file may leave your device and be processed by the AI provider.",
    afterCallout: [
      "The App requires you to acknowledge this before you can proceed with import. You should only use this feature if you accept that risk. We are not responsible for the AI provider's processing, retention, or security practices; you should review that provider's terms and privacy policy where available.",
    ],
  },
  {
    id: "voice-entry",
    number: 5,
    title: "Voice and Other AI-Assisted Entry",
    content: [
      "If the App offers voice or similar input that is interpreted by AI, your audio (or other input) is sent to a third-party AI service for processing so the App can extract transaction details. Do not use these features with recordings that include information you are unwilling to share with an external AI provider.",
    ],
  },
  {
    id: "what-we-dont-do",
    number: 6,
    title: "What We Do Not Do (Transaction Database)",
    content: [
      "Except as described in Sections 3–5 for the specific content you send for AI processing, Spendrift does not store your complete transaction database on third-party application servers for our own centralized hosting of your financial data. Routine use of the App—adding, editing, and viewing transactions—relies on your on-device store and, where applicable, Apple's iCloud services tied to your account as described above.",
    ],
  },
  {
    id: "security",
    number: 7,
    title: "Security",
    content: [
      "We design the App to keep your data under your control on your device. No method of electronic storage or transmission is completely secure. You are responsible for protecting access to your device and your Apple ID.",
    ],
  },
  {
    id: "children",
    number: 8,
    title: "Children",
    content: [
      "The App is not directed at children under 13 (or the minimum age required in your region). We do not knowingly collect personal information from children.",
    ],
  },
  {
    id: "changes",
    number: 9,
    title: "Changes",
    content: [
      `We may update this Privacy Policy from time to time. The "Last updated" date at the top will change when we do. Continued use of the App after changes means you accept the updated policy.`,
    ],
  },
  {
    id: "contact",
    number: 10,
    title: "Contact",
    content: [],
    contactEmail: "punase.ronak99@gmail.com",
  },
];

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen py-12 px-5 pb-20" style={{ backgroundColor: "var(--bg)" }}>
      <div className="max-w-2xl mx-auto">
        <header className="mb-12 pb-8" style={{ borderBottom: "1px solid var(--border)" }}>
          <a
            href="/"
            className="inline-block text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-5 no-underline"
            style={{ color: "var(--accent)", backgroundColor: "var(--accent-light)" }}
          >
            ← Spendrift
          </a>
          <h1 className="text-4xl font-bold tracking-tight leading-tight mb-3" style={{ color: "var(--text-primary)" }}>
            Privacy Policy
          </h1>
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            Last updated: April 8, 2026
          </p>
        </header>

        <div
          className="rounded-xl px-6 py-5 mb-10 text-sm leading-relaxed"
          style={{ backgroundColor: "var(--surface)", border: "1px solid var(--border)", color: "var(--text-secondary)" }}
        >
          This Privacy Policy describes how Spendrift (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) handles information when
          you use the Spendrift mobile application (the &quot;App&quot;). By using the App, you agree to this policy.
        </div>

        <nav
          className="rounded-xl px-6 py-5 mb-12"
          style={{ backgroundColor: "var(--surface)", border: "1px solid var(--border)" }}
          aria-label="Table of contents"
        >
          <p className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: "var(--text-secondary)" }}>
            Contents
          </p>
          <ol className="flex flex-col gap-2 list-none">
            {sections.map((s) => (
              <li key={s.id} className="flex items-center gap-3">
                <span
                  className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold leading-none"
                  style={{ color: "var(--accent)", backgroundColor: "var(--accent-light)" }}
                >
                  {s.number}
                </span>
                <a
                  href={`#${s.id}`}
                  className="text-sm no-underline transition-colors hover:opacity-70"
                  style={{ color: "var(--text-primary)" }}
                >
                  {s.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="flex flex-col gap-11">
          {sections.map((s) => (
            <section key={s.id} id={s.id} style={{ scrollMarginTop: "1.5rem" }}>
              <span
                className="inline-block text-xs font-bold tracking-wider uppercase px-2.5 py-1 rounded-full mb-2"
                style={{ color: "var(--accent)", backgroundColor: "var(--accent-light)" }}
              >
                {s.number}
              </span>
              <h2 className="text-lg font-bold tracking-tight mb-3.5" style={{ color: "var(--text-primary)" }}>
                {s.title}
              </h2>

              {s.content.map((para, i) => (
                <p key={i} className="text-sm leading-relaxed mb-3.5 last:mb-0" style={{ color: "var(--text-secondary)" }}>
                  {para}
                </p>
              ))}

              {s.callout && (
                <div
                  className="rounded-r-lg px-5 py-4 my-4"
                  style={{
                    backgroundColor: "var(--surface)",
                    border: "1px solid var(--border)",
                    borderLeft: "3px solid var(--accent)",
                  }}
                >
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    {s.callout}
                  </p>
                </div>
              )}

              {s.afterCallout?.map((para, i) => (
                <p key={i} className="text-sm leading-relaxed mt-3.5" style={{ color: "var(--text-secondary)" }}>
                  {para}
                </p>
              ))}

              {s.contactEmail && (
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  If you have questions about this Privacy Policy, contact us at:{" "}
                  <a href={`mailto:${s.contactEmail}`} style={{ color: "var(--accent)" }}>
                    {s.contactEmail}
                  </a>
                </p>
              )}
            </section>
          ))}
        </div>

        <footer
          className="mt-16 pt-8 text-center text-xs"
          style={{ borderTop: "1px solid var(--border)", color: "var(--text-secondary)" }}
        >
          &copy; 2026 Spendrift. All rights reserved.
        </footer>
      </div>
    </main>
  );
}
