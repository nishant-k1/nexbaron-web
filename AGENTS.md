# AGENTS.md — nexbaron-web

> **Root contract:** See `nexbaron/AGENTS.md` §0 — **API is single source of truth (MANDATORY).** `nexbaron-web` must never hardcode business data; all copy relevant to pricing/business logic comes from `nexbaron-api` catalog endpoints.

Public marketing + customer site for Nexbaron (divisions: **Digital** — growth plans; **Print** — commercial printing). Next.js 16 App Router. Backend is `nexbaron-api` (`/Users/nishantkumar/dev/nexbaron-api`); staff CRM is `nexbaron-crm`.

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

- **Next.js 16 App Router, React 19, TypeScript strict** (+`noUncheckedIndexedAccess`). Code lives at repo root: `app/` (routes), `features/` (business logic), `components/` (shared UI), `lib/`, `hooks/`, `theme/`. **No `src/` folder.**
- **Division is derived from the URL path** (`lib/divisions.ts#getDivisionFromPath`) and scopes everything: nav, footer, accent colors (`lib/accents.ts` — digital=teal, print=amber), auth tokens, OG images, lead capture.
- **State: React Context + localStorage/sessionStorage only** (no Redux/React Query). `AuthProvider` (`components/auth/auth-context.tsx`) validates the division-scoped token and exposes `openSignIn()` — sign-in happens entirely on the **Hub** (`NEXT_PUBLIC_HUB_URL/{division}/login`), never on this marketing site. `PlansProvider` (`features/digital/catalog.tsx`) merges static plan defaults with remote catalog (`GET /digital/catalog`, cached in localStorage 15min).
- **API client** (`lib/api.ts`): native `fetch` via `apiRequest<T>()`, base `NEXT_PUBLIC_API_URL || http://localhost:3001`, Bearer token from the division-scoped localStorage key `nexbaron-auth-token-{division}`. Never add axios.
- **Dark mode only** — design decision; `theme/theme-provider.tsx` sets `defaultTheme="dark"` / `enableSystem={false}`. Don't add light theme without sign-off.
- Styling: Tailwind 4 with CSS-var tokens in `app/globals.css`; shadcn-style primitives in `components/ui/` (Radix + CVA + `cn()`); fonts Inter/Montserrat via next/font; framer-motion with reduced-motion support (`hooks/use-reveal-in-view.ts` works around a whileInView bug).

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
/digital/*                 landing, solutions, industries, process, pricing (plan builder),
                           automation, results, why-nexbaron, faq, contact, onboarding?plan=
/print/*                   landing, products (API-only catalog, dynamic [slug]),
                           quote (builder, sign-in-gated submit), specifications, quotes
```

Next API routes (proxies/handlers): `app/api/[division]/contact/route.ts` (proxy to backend lead endpoints), `app/api/digital/signup/route.ts` (creates the account + lead, then redirects to the Hub with the new token). Redirects in `next.config.js` (`/digital/services|plans` -> pricing, `/print/bulk-orders` -> quote).

### Auth (sign-in happens on the Hub)

- `openSignIn()` (`components/auth/auth-context.tsx`) navigates to the Hub's `/{division}/login` (OTP + Google) — this site has no login form of its own.
- Account creation starts on the pricing page: `PlanSignupForm` posts to `/api/digital/signup`, which creates the account, then routes the user to the Hub (with `?token=` for brand-new accounts, `/login` for existing ones).
- The `nexbaron-auth-token-{division}` key is web-local; a Hub session does not propagate back to this site, so `user` is usually `null` here.

Protected behavior (no middleware): `/digital/onboarding` shows a sign-in gate if unauthenticated (opens Hub login); `/print/quotes` similar; `/print/quote` submit with a signed-out user also routes to Hub.

### Money/logic

- Plan pricing computed client-side in `features/digital/plan-summary.ts` (tier inheritance, launch timeline `LAUNCH_FIXED_DAYS=4 + critical path`); server recomputes at checkout — keep them in sync with `nexbaron-api`'s `digital/catalog/catalog.ts`.
- Onboarding wizard (`features/digital/onboarding/components/onboarding-wizard.tsx`, ~1100 lines): plan confirm -> RHF+Zod business form with debounced server drafts (`lib/draft.ts` -> `/digital/drafts/{division}`) -> Razorpay checkout (`features/digital/razorpay.ts` loads checkout.js; `devMode` simulates payment without keys) -> success screen with launch date/milestones.
- Launch tracking: `components/tracking/launch-tracker.tsx`, `features/digital/onboarding/components/customer-project-tracker.tsx` (fetches real order via `/digital/payments/orders/mine`).
- Print quote estimate is a naive client-side formula — not authoritative.

### Conventions

- kebab-case files; PascalCase named exports (default exports only for Next pages/layouts); `@/` alias everywhere; type-only imports enforced by ESLint; Prettier: semi, double quotes, width 100.
- Server components for static pages with exported `metadata`; `"use client"` only where needed.
- Errors: `status: "idle"|"success"|"error"` state + inline banners; forms offer WhatsApp link fallback (`lib/divisions.ts#buildWhatsAppLink`).
- SEO: per-page metadata, JSON-LD (`lib/breadcrumbs.ts`), `app/sitemap.ts`, `app/robots.ts`, division OG images (`lib/og.ts`).

### Env (`.env.local`, mirroring `.env.example`)

`NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_API_URL_DIGITAL`/`_PRINT`, `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_HUB_URL` (Hub login/signup redirect base), `NEXT_PUBLIC_CHAT_URL` (dedicated chat service, default `https://chat.nexbaron.com`), `NEXT_PUBLIC_GOOGLE_VERIFICATION`, `NEXT_PUBLIC_WHATSAPP_DIGITAL`/`_PRINT`. (Google sign-in client IDs/secrets apply to the Hub and CRM, not this repo.)

### Gotchas

- `supply_demand_strategy.pine` at repo root is unrelated (TradingView script) — leave alone.
- `metadataBase` icons reference `/favicon.svg` (root) plus `/favicon-digital.svg`/`favicon-print.svg` per division — all SVG, present in `public/`.
- `docs/PRD-nexbaron-website.md` + `docs/nexbaron-digital-business-strategy.md` are the product source of truth.
- Radix `react-label`/`react-slot` are the only Radix deps (dialog/select were removed; UI is hand-rolled).

### Git

Branch `main`, remote `git@github.com:nishant-k1/nexbaron-web.git`. Imperative feature-sized commit messages.

### Brand Logo

The official logo is `public/icon.svg` — NX monogram in a rounded square with gradient border.
Corporate: teal→amber gradient. Digital: teal icon on teal gradient. Print: amber icon on amber gradient.

**Rules:**

- Every email template, PDF, or external asset must use this logo.
- `components/brand/brand-mark.tsx` is the canonical React component.
- Never create a different logo or text-based fallback.

## Design Standards

You are a world-class UX/UI designer. Every interface you build must reflect this.

### Layout

- Never stack everything in a single column. Use proper grid layouts (2-col, 3-col, 5-col depending on content).
- Primary content on the left/wider column, secondary/summary on the right/skinnier column.
- Page headers are clean: title + one-line description, no clutter.
- **No inline expansion in grids.** When a card in a CSS Grid needs to show additional controls (editors, pickers, actions), use an absolutely-positioned popover/dropdown — never expand the card inline. Inline expansion stretches the entire grid row (CSS Grid default `align-items: stretch`), making every card in the row grow to the tallest one. Instead: `relative` on the card, `absolute top-full z-30` on the popover, animated with `AnimatePresence` + `motion.div` (scale + opacity). Close on click outside (`mousedown` listener on `document`) and Escape key.
- Single-click to select + reveal: clicking a card should both select it and open its popover in one gesture. No two-step "first select, then click somewhere else to edit" flow.

### Surfaces

- Cards use `rounded-2xl` (not `rounded-lg`), `bg-neutral-surface`, `border border-border`.
- Tables and lists use `rounded-2xl overflow-hidden` with `divide-y divide-border/60`.
- Empty states: centred icon + title + description, never bare text.

### Typography

- Headings: `text-2xl font-bold text-heading`.
- Body: `text-sm text-body` or `text-heading`.
- Muted/secondary: `text-xs text-muted`.
- Never use font sizes below `text-[10px]` for badges/labels; `text-xs` for descriptions.

### Spacing

- Section gap: `space-y-6` or `space-y-8`.
- Card padding: `p-6` inside, `px-5 py-3.5` for rows.
- Grid gap: `gap-6` for main sections, `gap-4` for stat cards.

### States

- Loading: centred spinner (`animate-spin`), never bare "Loading..." text.
- Empty: rounded-2xl card with icon + message.
- Error: bordered card with message + retry.

### Buttons

- Primary: `bg-accent text-white rounded-xl font-bold hover:opacity-90`.
- Outline/secondary: `border border-muted rounded-xl`.
- Never use raw `<button>` without these classes.

### Animations

- Hover cards: `hover:border-accent/30 transition-colors`.
- Buttons: `transition-opacity` or `transition-all`.
- Progress bars: `transition-all duration-700`.
- List items: `hover:bg-neutral-bg transition-colors`.

### Forms

- Inputs always: `px-3 py-2.5 bg-neutral-bg border border-border rounded-xl text-sm text-heading placeholder:text-muted focus:outline-none focus:border-accent/50`.
- Labels: `text-xs text-muted` above the input.
- Modals: centred with `bg-black/50 backdrop-blur-sm` overlay.

### Detail panels (CRM)

- Width: `w-96`, pinned right (`border-l border-border`), `bg-neutral-bg`.
- Close button: `X` icon top-right, `w-8 h-8 rounded-lg hover:bg-neutral-surface`.
- Sections separated by `border-t border-border pt-4`.

### App Shell Layout

For CRM and Hub: **sidebar + topbar fixed, content scrolls independently.**

- Root wrapper: `h-screen flex bg-neutral-bg overflow-hidden` (NOT `min-h-screen`).
- Sidebar: fixed left, `h-full`.
- Main area: `flex-1 flex flex-col overflow-hidden`.
- Content: `flex-1 overflow-auto` — this is the ONLY element that scrolls.
- Topbar: inside main, fixed height, never scrolls.

This is the Stripe / Linear / Vercel pattern.

### Clickable Elements

**CRITICAL — Tailwind v4 preflight kills `cursor: pointer` on ALL elements.** Native browser cursors do NOT work. Every interactive element MUST have `cursor-pointer`:

- `<button>` — **REQUIRES `cursor-pointer`** in className. Tailwind v4 preflight removes the native `cursor: pointer`.
- `<a href="...">` — natively gets `cursor: pointer`, but add `cursor-pointer` for safety.
- `<div onClick={...}>`, `<span onClick={...}>`, `<tr onClick={...}>` — must include `cursor-pointer`.
- `<select>`, `<input type="checkbox">`, `<input type="radio">` — must include `cursor-pointer`.
- Any element with `onClick` — must include `cursor-pointer`.
- Button components (cva-based): add `cursor-pointer` to the base variant classes.
- `hover:` transitions on clickable rows: `hover:bg-neutral-bg cursor-pointer transition-colors`.

**Global CSS fix (do NOT remove):**

```css
@import "tailwindcss";
button,
[role="button"],
select,
input[type="checkbox"],
input[type="radio"] {
  cursor: pointer;
}
```

This lives in `app/globals.css` right after the tailwind import. Never delete it.

### Data Source of Truth

- **API is the single source of truth for ALL data.** Never hardcode prices, plan names, service lists, statuses, milestones, or any business data in the frontend.
- When building a feature that spans repos: always start with the API. Define the data model, the endpoint response shape, and the status flow FIRST. Then update all clients (web, hub, crm) to consume that data as-is.
- Frontend must display exactly what the API returns. No client-side mapping, no hardcoded defaults for business data, no fallback arrays for plan services or pricing.
- If a feature needs new data from the API, add the endpoint/field to the API first, then update all clients to use it.
- NEVER hardcode plan names ("Launch"), service lists, prices, progress percentages, or milestone labels. Read everything from the API response.

### Pre-Push Checklist

After every code change, run the build/typecheck before pushing:

- **API**: `npx tsc --noEmit`
- **Hub**: `npx tsc --noEmit`
- **CRM**: `npx tsc --noEmit`
- **Web**: `npm run build` (catches type errors + lint + format)

Never push code that fails the build. If a parser error occurs (OXC/Vite), verify with `npx tsc --noEmit` first — it catches real issues the bundler may miss.
