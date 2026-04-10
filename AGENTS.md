<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Cursor Cloud specific instructions

**Product**: Spendrift — a marketing/landing page for a privacy-focused personal finance iOS app. Two routes: `/` (home) and `/privacy_policy`.

**Tech stack**: Next.js 16, React 19, Tailwind CSS 4, TypeScript 5. Package manager is **Bun** (`bun.lock`).

**Running services**: Only the Next.js dev server is needed (`bun run dev`, serves on `localhost:3000`). No databases, APIs, or external services.

**Key commands** (all from repo root):
- Install deps: `bun install`
- Dev server: `bun run dev`
- Build: `bun run build`
- Lint: `bun run lint`

**Caveats**:
- Bun must be installed (`curl -fsSL https://bun.sh/install | bash`) and on `PATH` (`$HOME/.bun/bin`).
- The repo has a pre-existing lint error in `app/privacy_policy/page.tsx` (uses `<a>` instead of `<Link>` for navigation to `/`). This is not introduced by agent changes.
- No `.env` files or secrets are required.