# AGENTS.md — nexbaron-web

Public marketing + customer site for Nexbaron (divisions: **Digital** — growth plans; **Print** — commercial printing). Next.js 14 App Router. Backend is `nexbaron-api` (`/Users/nishantkumar/dev/nexbaron-api`); staff CRM is `nexbaron-crm`.

## Commands

```bash
npm run dev         # next dev (needs nexbaron-api on :3001 or NEXT_PUBLIC_API_URL)
npm run build       # next build
npm run typecheck   # tsc --noEmit
npm run lint        # eslint .
npm run check       # typecheck && lint && format:check  <- full quality gate
npm run format      # prettier --write .
```

No tests. Husky: pre-commit runs lint-staged + typecheck; pre-push runs `check` + `build`.

## Architecture

- **Next.js 14 App Router, React 18, TypeScript strict** (+`noUncheckedIndexedAccess`). Code lives at repo root: `app/` (routes), `features/` (business logic), `components/` (shared UI), `lib/`, `hooks/`, `theme/`. **No `src/` folder.**
- **Division is derived from the URL path** (`lib/divisions.ts#getDivisionFromPath`) and scopes everything: nav, footer, accent colors (`lib/accents.ts` — digital=teal, print=amber), auth tokens, OG images, lead capture.
- **State: React Context + localStorage/sessionStorage only** (no Redux/React Query). `AuthProvider` (`features/auth/auth-context.tsx`) holds user + sign-in dialog state (`pendingPlan`, `openSignIn`); `PlansProvider` (`features/digital/lib/catalog.tsx`) merges static plan defaults with remote catalog (`GET /digital/catalog`, cached in localStorage 15min).
- **API client** (`lib/api.ts`): native `fetch` via `apiRequest<T>()`, base `NEXT_PUBLIC_API_URL || http://localhost:3001`, Bearer token from the division-scoped localStorage key `nexbaron-auth-token-{division}`. Never add axios.
- **Dark mode only** — design decision; `theme/theme-toggle.tsx` force-resets to dark on a 1s interval. Don't add light theme without sign-off.
- Styling: Tailwind 3 with CSS-var tokens in `app/globals.css`; shadcn-style primitives in `components/ui/` (Radix + CVA + `cn()`); fonts Inter/Montserrat via next/font; framer-motion with reduced-motion support (`hooks/use-reveal-in-view.ts` works around a whileInView bug).

**Theme rules (MUST follow):**

- The site is dark-only. Use `text-white`, `bg-slate-950`, `text-slate-400`, `border-white/10` etc. consistently.
- Division accent: digital = teal (`teal-400`/`teal-500`), print = amber (`amber-400`/`amber-500`).
- Never mix division accents on the wrong division's pages.
- Card/panel backgrounds: `bg-white/[0.03]` with `border-white/10` and `backdrop-blur-md`.
- Input backgrounds: `bg-slate-800` with `border-white/10`.

### Key routes

```
/                          corporate gateway (division split cards)
/about, /privacy, /terms
/auth/complete             OAuth landing (?token=&user= -> signIn, resume pending plan)
/digital/*                 landing, solutions, who-we-help, process, pricing (plan builder),
                           automation, results, why-nexbaron, faq, contact, onboarding?plan=
/print/*                   landing, products (+SSG [slug] from lib/data/print-products.ts),
                           quote (builder, sign-in-gated submit), specifications
```

Next API routes (proxies/handlers): `app/api/contact/route.ts`, `app/api/[division]/contact/route.ts` (proxy to backend lead endpoints), `app/api/auth/google/callback/route.ts` (OAuth code exchange using `GOOGLE_CLIENT_SECRET`). Redirects in `next.config.js` (`/digital/services|plans` -> pricing, `/digital/industries` -> who-we-help).

### Auth (passwordless, per-division)

1. Google One Tap (GSI) — `features/auth/components/google-one-tap.tsx`, credential posted to the selected brand's `/<division>/auth/google` endpoint.
2. Google OAuth2 authorization-code flow — state in sessionStorage, server-side code exchange, lands on `/auth/complete`.
3. Email/phone OTP — `features/auth/components/auth-gate.tsx` (dev mode shows `devCode` in UI).

All customer API calls use the selected brand's canonical `/<division>/*` path.

Protected behavior (no middleware): `/digital/onboarding` server-redirects without `?plan=`; wizard prompts sign-in before payment; `/print/quote` submission opens AuthGate then auto-resumes.

### Money/logic

- Plan pricing computed client-side in `features/digital/lib/plan-summary.ts` (tier inheritance, launch timeline `LAUNCH_FIXED_DAYS=4 + critical path`); server recomputes at checkout — keep them in sync with `nexbaron-api`'s `digital/catalog/catalog.ts`.
- Onboarding wizard (`features/onboarding/components/onboarding-wizard.tsx`, ~1100 lines): plan confirm -> RHF+Zod business form with debounced server drafts (`lib/draft.ts` -> `/digital/drafts/{division}`) -> Razorpay checkout (`features/digital/lib/razorpay.ts` loads checkout.js; `devMode` simulates payment without keys) -> success screen with launch date/milestones.
- Launch tracking: `components/tracking/launch-tracker.tsx`, `features/onboarding/components/customer-project-tracker.tsx` (fetches real order via `/digital/payments/orders/mine`).
- Print quote estimate is a naive client-side formula — not authoritative.

### Conventions

- kebab-case files; PascalCase named exports (default exports only for Next pages/layouts); `@/` alias everywhere; type-only imports enforced by ESLint; Prettier: semi, double quotes, width 100.
- Server components for static pages with exported `metadata`; `"use client"` only where needed.
- Errors: `status: "idle"|"success"|"error"` state + inline banners; forms offer WhatsApp link fallback (`lib/divisions.ts#buildWhatsAppLink`).
- SEO: per-page metadata, JSON-LD (`lib/breadcrumbs.ts`), `app/sitemap.ts`, `app/robots.ts`, division OG images (`lib/og.ts`).

### Env (`.env.local`; no `.env.example` despite README)

`NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` (server-only), `NEXT_PUBLIC_GOOGLE_VERIFICATION`, `NEXT_PUBLIC_WHATSAPP_DIGITAL`/`_PRINT` (currently unset).

### Gotchas

- `supply_demand_strategy.pine` at repo root is unrelated (TradingView script) — leave alone.
- `metadataBase` icons reference missing `/favicon.ico` + `/logo.png` (only SVG favicons exist).
- `docs/PRD-nexbaron-website.md` + `docs/nexbaron-digital-business-strategy.md` are the product source of truth.
- Radix dialog/select deps are mostly unused (hand-rolled instead).

### Git

Branch `main`, remote `git@github.com:nishant-k1/nexbaron-web.git`. Imperative feature-sized commit messages.
