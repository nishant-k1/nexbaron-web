# Product Requirements Document (PRD)

## Nexbaron Private Limited — Corporate Website Redesign

| Field                 | Value                                                                                                                                                                           |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Product**           | nexbaron.com (Next.js 14 + TypeScript + Tailwind CSS + Framer Motion)                                                                                                           |
| **Document owner**    | Product Management                                                                                                                                                              |
| **Contributing team** | VP of Product, Brand Strategist, Senior UX Researcher, Staff Product Designer, Staff Frontend Engineer, Staff Backend Engineer, Technical Architect, SEO Specialist, CRO Expert |
| **Status**            | Draft for review                                                                                                                                                                |
| **Version**           | 1.0                                                                                                                                                                             |
| **Date**              | 2026-08-02                                                                                                                                                                      |

---

## 1. Executive Summary

Nexbaron Private Limited operates **two fully independent business divisions**:

1. **Nexbaron Digital** — websites, landing pages, local SEO / Google Business Profile, WhatsApp Business integration, AI chatbots & automation, CRM, analytics, hosting & maintenance for small businesses and SMEs.
2. **Nexbaron Print** — visiting cards, brochures, flyers, posters, flex banners, vinyl, sign boards, office branding, exhibition materials and marketing collaterals.

This project **repositions the website only** — it does **not** redesign the visual language. The current design system (dark glassmorphic surfaces, teal/amber division accents, Montserrat + Inter, blurred ambient glows, 300ms Framer Motion reveals, rounded cards) is intentionally premium and is preserved as-is. We change **what we say and how we route users**, not **how we look**.

The core product decision of this PRD is **strict division isolation**: a visitor arriving from a Google Ads click for Digital must never be distracted by Print, and vice versa. Each division behaves like its own premium website while sharing one brand system, one codebase, and one design system.

---

## 2. Current State Assessment (Code Audit)

Before writing requirements, the team audited the existing repository. This PRD is grounded in what already exists.

### 2.1 What already works (preserve)

| Asset                                                       | Location                                                                                             | Notes                                                                            |
| ----------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| Corporate gateway home (`/`) with dual division split-cards | `app/page.tsx`                                                                                       | Already implements the "One Enterprise. Two Autonomous Divisions" concept. Keep. |
| Digital landing page                                        | `app/digital/page.tsx`                                                                               | Hero, services grid, industry grid, CTA banner, metrics. Keep.                   |
| Print landing page                                          | `app/print/page.tsx`                                                                                 | Hero, product catalog, quote CTA, metrics. Keep.                                 |
| Interactive print quote builder                             | `app/print/quote/page.tsx`                                                                           | Working client-side estimator → WhatsApp confirm. Keep.                          |
| Router-based navigation switching                           | `features/navigation/components/navigation.tsx`                                                      | Picks corporate / digital / print header by `pathname`. Keep pattern.            |
| Router-based footer switching                               | `features/footer/components/footer.tsx`                                                              | Same pattern. Keep.                                                              |
| Design tokens                                               | `app/globals.css` + `tailwind.config.ts`                                                             | CSS-variable-driven color/radius/shadow/motion/spacing system. Keep.             |
| Motion primitives                                           | `components/motion/section-reveal.tsx`, `animated-mesh-background.tsx`, `global-mesh-background.tsx` | `SectionReveal` respects `prefers-reduced-motion`. Keep.                         |
| UI primitives                                               | `components/ui/` (button, input, textarea, label)                                                    | Radix + CVA + `tailwind-merge`. Keep.                                            |
| Contact form                                                | `features/contact/components/contact-form.tsx` + `app/api/contact/route.ts`                          | react-hook-form + Zod → proxied POST. Keep, wire backend.                        |
| Landing section components                                  | `components/landing/` (metrics-counter, services-matrix, industry-showcase, partner-testimonials)    | Reusable sections. Reuse patterns.                                               |

### 2.2 Critical issues found (fix in scope)

| #   | Severity    | Finding                                                                                                                                                                                                                                                                                                                                                                          |
| --- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | **Blocker** | **Stale corporate metadata.** `app/layout.tsx:37-93` still brands the site as _"Nexbaron Services Private Limited \| Leading Infrastructure Solutions"_ — the previous infrastructure positioning. Title, description, keywords, OG/Twitter and JSON-LD all contradict the two-division model.                                                                                   |
| 2   | **Blocker** | **WhatsApp CTAs are broken.** Every `wa.me` link uses `https://wa.me/?text=...` with **no phone number** (`app/digital/page.tsx:106`, `:191`, `:255`, `features/navigation/components/digital-navigation.tsx:97`, etc.). Clicking opens WhatsApp with no recipient. All must become `https://wa.me/<number>?text=...`.                                                           |
| 3   | **High**    | **Navigation references pages that do not exist.** Digital nav links to `/digital/services`, `/digital/industries`, `/digital/automation`, `/digital/contact`. Print nav links to `/print/products`, `/print/products/visiting-cards`, `/print/products/signage`, `/print/products/office-branding`, plus `/print/specifications` and `/print/bulk-orders`. All resolve to 404s. |
| 4   | **High**    | **Legacy infrastructure pages contradict the new positioning.** `/services`, `/industries`, `/projects`, `/downloads`, `/compliance`, `/careers` contain "engineering / compliance / infrastructure" content and are linked from the corporate footer and corporate nav. Must be retired or reworked.                                                                            |
| 5   | **High**    | **`/privacy` and `/terms` are linked in every footer but do not exist** (404).                                                                                                                                                                                                                                                                                                   |
| 6   | **Medium**  | **`sitemap.ts` omits `/digital`, `/print`, `/print/quote`, and all division sub-routes.**                                                                                                                                                                                                                                                                                        |
| 7   | **Medium**  | **`/api/contact` proxies to `http://localhost:3001` by default** (`app/api/contact/route.ts:17`). No production backend URL is configured; production submissions fail silently.                                                                                                                                                                                                 |
| 8   | **Medium**  | **Division isolation is leaky.** The Digital header prominently shows "Switch to Print Division ↗" and Digital footer promotes Print in a card. Under the isolation requirement this cross-promotion must be reduced to a muted, secondary affordance (see §8).                                                                                                                  |
| 9   | **Low**     | `Button` default variant is the blue-grey `--color-primary`; division pages bypass it with bespoke teal/amber classes. The accent system is not formalized as tokens/variants.                                                                                                                                                                                                   |
| 10  | **Low**     | No per-page OG images; `robots.ts` and sitemap are minimal.                                                                                                                                                                                                                                                                                                                      |

### 2.3 Design system inventory (the "look" we must preserve)

- **Palette** — dark navy body `#192d33`; surfaces are translucent glass (`bg-white/[0.03–0.08]`) over `#192d33` with `backdrop-blur`; borders `border-white/10`; heading `#ffffff`; body `#e0e0e0`; muted `#8a949c`. Primary brand `#2a4a55`.
- **Division accents** — **Digital: teal/cyan** (`teal-400/500`, `cyan-300`, `from-teal-300 via-cyan-300 to-blue-400`). **Print: amber/orange** (`amber-400/500`, `orange-400`, `from-amber-300 via-orange-400 to-amber-500`). Corporate: neutral slate with mixed teal→amber hint.
- **Typography** — Montserrat (display/headings, weights 400–800) + Inter (body, 400–700). Mono accents (`font-mono`, uppercase, `tracking-widest`) for eyebrow labels and metrics.
- **Radius** — tokens 8px base; cards use `rounded-xl` (12) / `rounded-2xl` (16) / `rounded-3xl` (24).
- **Spacing** — `--spacing-section: 5rem`, `--spacing-component: 2rem`; container capped at 980px on `lg`.
- **Shadows** — soft `shadow-surface`/`shadow-elevated` plus signature colored glows: `shadow-teal-500/20`, `shadow-amber-500/20`.
- **Motion** — 300ms `cubic-bezier(0.4,0,0.2,1)`; `SectionReveal` fade+y20 on scroll with `once:true`; ambient blurred radial gradients; `animate-ping` status dots; animated counters.
- **Dark-only** — no theme switching (`globals.css:44` "Dark mode only").

**Hard rule: none of the above changes. All future work reuses these tokens, primitives and patterns.**

---

## 3. Business Goals & Objectives

### 3.1 North-star goal

> Make nexbaron.com a **lead-generation engine** for two independent revenue lines, while preserving the premium, trustworthy enterprise feel of the brand.

### 3.2 Goals by division

**Nexbaron Digital**

1. Position Nexbaron as the premium local-digital-growth partner for small businesses, clinics, restaurants, law firms, CA firms, salons, gyms, real estate, local services and startups.
2. Convert visitors into **WhatsApp audit requests / paid consultations** (highest-LTV Digital lead).
3. Drive targeted organic traffic for local-digital keywords per city/industry.
4. Set the stage for sellable products: websites, SEO retainers, WhatsApp CRM, AI automation.

**Nexbaron Print** 5. Position Nexbaron as a premium commercial-printing house (materials + craftsmanship, not commodity price). 6. Convert visitors into **quote requests** via the Instant Quote Builder, then WhatsApp confirmations (highest-LTV Print lead). 7. Rank for high-intent print keywords ("visiting cards printing near me", "flex banner printing", "acrylic signage"). 8. Capture bulk/B2B orders (offices, events, exhibitions).

**Corporate (holding)** 9. Present a coherent, credible holding identity without competing with either division. 10. Serve the small set of users who deliberately seek the parent company (legal, careers, partnerships). 11. Route every customer intent to the correct division with zero ambiguity.

### 3.3 Objectives & Key Results (first 6 months post-launch)

| #     | Objective           | Key Results                                                                                                               |
| ----- | ------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| OKR-1 | Digital lead growth | ≥ 25% lift in Digital WhatsApp conversations; CVR of visits→WhatsApp click ≥ 8% (mobile)                                  |
| OKR-2 | Print lead growth   | ≥ 20% of Print visitors reach the Quote Builder; builder→WhatsApp confirm ≥ 15%                                           |
| OKR-3 | Organic visibility  | Target 15+ non-branded keywords in top-10 for priority city+service pairs                                                 |
| OKR-4 | Division isolation  | Cross-division distraction rate (users who navigate Digital→Print from hero/CTAs) ≤ 2%; bounce on ads landing pages ≤ 55% |
| OKR-5 | Trust & conversion  | Per-division testimonials (3+) and proof metrics present; contact/quote failure rate = 0%                                 |
| OKR-6 | Performance         | LCP ≤ 2.5s, CLS ≤ 0.1, INP ≤ 200ms on all templates; Lighthouse performance ≥ 90                                          |

---

## 4. Target Audience

### 4.1 Digital division

- **Primary:** local service SMEs and professionals in India — restaurant owners, clinic/doctor practices, law & CA firms, salons/spas/gyms, real estate agents, small retail, startups & SMEs.
- **Decision maker profile:** owner-operator or a single decision-maker (usually non-technical), time-poor, phone-first, WhatsApp-native.
- **Buying triggers:** low online visibility, no/crappy website, losing customers to competitors ranking on Google, manual lead handling.
- **Objections to overcome:** cost, trust in an agency, whether "AI/automation" is real and safe, lock-in, response time.

### 4.2 Print division

- **Primary:** same SME segment + corporate offices, event organizers, real estate/construction, hospitals, schools, and marketing managers buying bulk collateral.
- **Decision maker profile:** purchases in batches (launch, event, rebrand); cares about quality, finish options, turnaround time, and delivery.
- **Buying triggers:** an upcoming event/branding moment; compares 2–3 print shops; price-sensitive but quality-conscious.
- **Objections to overcome:** "will it match my brand?", proofing/revision process, delivery speed, hidden costs.

### 4.3 Corporate (holding)

- Investors, journalists, legal/compliance contacts, potential hires, and B2B partners. Low volume, high intent, informational.

---

## 5. User Personas

### P1 — "Rajesh," Owner of a Dental Clinic (Digital)

- **Context:** 45, non-technical, runs a 2-doctor clinic. Currently invisible on Google; relies on walk-ins.
- **Needs:** a modern site, #1 Google map ranking, and appointment booking via WhatsApp.
- **Behavior:** searches "dental clinic near me" and "dental clinic website design"; lands on `/digital` from a Google Ad or search; uses a phone; reacts to simple, concrete outcomes ("rank #1", "book 24/7").
- **Success metric:** sends a WhatsApp message to request a free audit.
- **Failure risk:** seeing "Print" content, seeing jargon, or a form that feels like an enterprise procurement process.

### P2 — "Meera," Owner of a Boutique (Digital / Print cross-over)

- **Context:** 32, digitally active, sells fashion and wants both a website and printed brochures for an upcoming store launch.
- **Need:** wants both divisions, but **separately, sequentially**. First website, later printed materials.
- **Behavior:** likely to land on Digital first; if she later wants print, she will _choose_ to visit Print — she should not be forced or distracted into it.
- **Success metric:** each visit converts in its own division without cross-sell noise.

### P3 — "Imran," Procurement Manager at a Real-Estate Developer (Print)

- **Context:** 38, buys bulk: flex banners, site hoarding, office signage, exhibition stalls.
- **Needs:** instant rough pricing, bulk discount clarity, quality/finish options, fast delivery.
- **Behavior:** searches "flex banner printing near me"; lands on `/print`; immediately wants the Quote Builder or a phone/WhatsApp quote.
- **Success metric:** configures an estimate and confirms via WhatsApp; requests bulk pricing.
- **Failure risk:** the Quote Builder being hard to use on mobile, or being re-routed to "Digital services."

### P4 — "Divya," HR Manager researching careers / legal contact (Corporate)

- **Context:** informational, rare.
- **Needs:** contact, careers, compliance/legal details, and clarity that Nexbaron is one company with two divisions.
- **Success metric:** finds the right contact route in < 30 seconds without being pulled into marketing CTAs.

---

## 6. Brand Strategy

### 6.1 Brand architecture

A **masterbrand–subbrand** hierarchy with deliberate autonomy:

- **Masterbrand:** Nexbaron Private Limited — the quiet, credible parent.
- **Subbrands (co-branded, autonomous):** Nexbaron Digital and Nexbaron Print.
- Each subbrand has its own voice, accent color, navigation, footer, CTAs, and conversion path — but shares the master design system, typography, and logo lockup pattern (wordmark + mono label: `Nexbaron <DIGITAL|PRINT>`).

### 6.2 Division positioning statements

**Nexbaron Digital** — _"The digital growth engine for local businesses."_
_For small businesses, clinics, restaurants, and professional firms who are invisible online, Nexbaron Digital builds high-converting websites, wins the Google 3-Pack, and automates customer leads on WhatsApp — so owners win more customers without tech headaches._

**Nexbaron Print** — _"Premium commercial print & office branding."_
_For businesses and brands that need their physical identity to feel as premium as their promise, Nexbaron Print manufactures high-grade visiting cards, collaterals, signage and office branding with uncompromising quality and express turnaround._

**Corporate (holding)** — _"One enterprise. Two autonomous divisions."_ — purely a routing/trust layer.

### 6.3 Voice & tone

- **Digital:** confident, outcome-led, modern ("rank #1," "24/7 lead machine," "free growth audit"). Avoid agency jargon; write in the owner's language.
- **Print:** craftsmanship-led, tactile, precise ("350 GSM," "spot UV," "weatherproof ink," "24-hour express"). Evoke materials and finish.
- **Corporate:** neutral, formal, minimal.
- Cross-division rule: **no division markets the other.** Each speaks only about itself.

### 6.4 Messaging guardrails

- No claims we cannot support (current metrics like "150+ websites," "500,000+ cards printed" must be verified before display; see §10.4).
- Numbers, where used, are specific and provable (turnaround hours, GSM, uptime).
- "AI" claims are scoped to real features (chatbot auto-reply, lead routing, CRM sync) — never vague hype.

---

## 7. Visual Strategy (Preserve, Extend — Don't Redesign)

### 7.1 Principles

1. **Preserve the design system.** Tokens, typography, glass surfaces, radius, motion, shadows, glow effects: unchanged.
2. **Formalize the accent system.** Teal = Digital, amber = Print is already the de-facto rule; make it a first-class token/variant so pages stop hard-coding classes (issue #9).
3. **Division surfaces share the DNA, differ only in accent.** Same shells, same section types, same card anatomy — different accent hue. This is what makes each division feel premium _and_ distinct.
4. **No layout experiments.** No new frameworks, no new design motifs, no light-mode.

### 7.2 Token extensions (additive only)

Add to `globals.css`:

```css
:root {
  --color-accent-digital: #14b8a6; /* teal-500 */
  --color-accent-digital-strong: #22d3ee; /* cyan-400 */
  --color-accent-print: #f59e0b; /* amber-500 */
  --color-accent-print-strong: #fb923c; /* orange-400 */
}
```

Map to Tailwind via `tailwind.config.ts` (`accentDigital`, `accentPrint`, plus per-division border/shadow/glow helpers). This is **additive**: existing hard-coded `teal-*`/`amber-*` utilities remain valid.

### 7.3 Design tokens — "freeze list" (do not touch)

| System  | Frozen values                                                                                                                                                                                                                 |
| ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Colors  | `--color-primary #2a4a55`, `--color-secondary #8a949c`, `--color-neutral-bg #192d33`, `--color-neutral-surface #f1f9fa`, `--color-heading #ffffff`, `--color-body #e0e0e0`, `--color-border #2a3a40`, `--color-muted #8a949c` |
| Fonts   | Montserrat (heading), Inter (body), mono eyebrow labels                                                                                                                                                                       |
| Spacing | `--spacing-section 5rem`, `--spacing-component 2rem`, container max-w 980px (lg)                                                                                                                                              |
| Radius  | base 8px; `rounded-xl/2xl/3xl` for cards/CTAs                                                                                                                                                                                 |
| Shadows | `shadow-surface`, `shadow-elevated`, colored glows (`shadow-{teal                                                                                                                                                             | amber}-500/20`) |
| Motion  | 300ms, `cubic-bezier(0.4,0,0.2,1)`, scroll reveals `once:true`, reduced-motion honored                                                                                                                                        |
| Glass   | `bg-white/[0.03–0.08]`, `border-white/10`, `backdrop-blur-{md,xl}`                                                                                                                                                            |
| Theme   | Dark-only, no theme switcher                                                                                                                                                                                                  |

### 7.4 Page-level visual direction per division

- **Digital:** teal glow fields, `from-teal-300 via-cyan-300 to-blue-400` gradient hero text, teal hover borders, cyan status dots. Already correct in `app/digital/page.tsx`.
- **Print:** amber glow fields, `from-amber-300 via-orange-400 to-amber-500` gradient, amber hover borders. Already correct.
- **Corporate:** neutral slate hero with a subtle teal→amber gradient hint on the headline, dual split-cards (teal card / amber card). Already correct in `app/page.tsx`.

**Actionable outcome:** no visual redesign work. Visual work = formalizing tokens + building the shared section primitives (§17) so new pages render identically by construction.

---

## 8. Information Architecture (IA)

### 8.1 Isolation rule (the governing constraint)

- A visitor on `/digital/**` sees **Digital content only** in: hero, primary nav, CTAs, related-sections, and footer service links.
- A visitor on `/print/**` sees **Print content only** in the same slots.
- The **only** allowed cross-division affordances:
  1. A **muted, edge-aligned** micro-link in the header (e.g. "A Nexbaron Private Limited company" → corporate, or "Print ↗" in tiny mono text at the far edge) — **not** a styled CTA.
  2. A small **"Other division" box in the footer** (already exists in both division footers).
  3. The corporate home `/` is the explicit gateway that surfaces both — this is the _only_ page where divisions are presented side-by-side.
- Rationale: a Google Ads visitor on a Digital campaign must have a single, unambiguous conversion path. Every extra choice is a leak in the funnel (CRO principle: one primary CTA, no competing exits).

### 8.2 Sitemap (target state)

```
/                                 Corporate gateway (router)
├── /about                        Corporate / group story
├── /contact                      Corporate contact
├── /privacy                      [NEW] Legal
├── /terms                        [NEW] Legal
├── /careers                      [REWORK or REMOVE] (see §8.4)
│
├── /digital                      Digital landing
│   ├── /digital/services         Digital services deep-dive
│   ├── /digital/industries       Industry solutions
│   ├── /digital/automation       AI & WhatsApp CRM
│   ├── /digital/contact          Digital lead form + WhatsApp
│   ├── /digital/portfolio        [P1] Case studies
│   ├── /digital/resources        [P2] Blog / growth guides
│   └── /digital/locations/[city] [P2] City landing pages
│
└── /print                        Print landing
    ├── /print/quote              Instant Quote Builder (exists)
    ├── /print/products           Print catalog hub
    │   ├── /print/products/visiting-cards
    │   ├── /print/products/collaterals        (brochures/flyers/posters)
    │   ├── /print/products/signage            (flex/vinyl/sign boards)
    │   ├── /print/products/office-branding    (acrylic, wall, reception)
    │   └── /print/products/exhibitions        (stalls/backdrops)
    ├── /print/specifications     Paper stocks & finish options
    └── /print/bulk-orders        Bulk/B2B pricing
```

### 8.3 Information architecture principles

- **3-clicks-to-quote:** any Digital or Print landing visitor can reach their conversion action (WhatsApp / quote) in ≤ 3 clicks.
- **Services are the spine** of each division; industries are the personalization layer; automation/specs are depth pages.
- **No orphan pages:** every page reachable, every footer link resolves (fixes issues #3, #4, #5).
- **URL discipline:** lowercase, kebab-case, under `/digital` and `/print` prefixes. Never mix a Digital and Print concern in one URL.

### 8.4 Legacy pages disposition

| Page                                                  | Disposition                                                                                                      |
| ----------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `/services`, `/industries`, `/projects`, `/downloads` | **Remove** (old infrastructure positioning; superseded by division pages). 301 → relevant division route or `/`. |
| `/compliance`                                         | **Remove.** Not relevant to Digital/Print.                                                                       |
| `/careers`                                            | **Keep only if hiring is real.** Otherwise remove and drop from footer.                                          |
| `/about`                                              | **Rework** into a corporate/group page (company story, two divisions, trust).                                    |
| `/contact`                                            | **Keep** as corporate contact; Digital and Print get their **own** contact routes.                               |
| `/privacy`, `/terms`                                  | **Create** (currently 404).                                                                                      |

---

## 9. Navigation Strategy

### 9.1 Router-based switching (keep)

`features/navigation/components/navigation.tsx` and `features/footer/components/footer.tsx` already route by `pathname`. Keep this exact pattern — it guarantees only one header/footer ever renders per page.

### 9.2 Digital header

```
[Nexbaron DIGITAL]  Overview | Digital Services | Industry Solutions | AI & WhatsApp CRM | Contact  [WhatsApp Growth Audit]  [·print·]
```

- Active state: teal text + underline. Scroll state: `bg-slate-950/90 backdrop-blur-xl border-teal-500/20`.
- Primary CTA: **WhatsApp Growth Audit** (fixed phone number — issue #2).
- Cross-division affordance: single tiny mono link at far edge (`print ↗`), styled `text-slate-500 hover:text-amber-400` — muted, not a pill/button (issue #8).
- Mobile: menu with the same links; CTA button full-width at bottom; the tiny print link remains but de-emphasized.

### 9.3 Print header

```
[Nexbaron PRINT]  Overview | Print Collaterals | Visiting Cards | Flex & Signage | Office Branding | Instant Quote  [Quote Builder]  [·digital·]
```

- Active state: amber. Primary CTA: **Instant Quote**.
- Cross-division affordance: muted `digital ↗` micro-link, `text-slate-500 hover:text-teal-400`.
- Note: current nav labels are longer than Digital's; audit for overflow on md screens. Consider a "Products" hub pattern to keep the bar ≤ 6 items.

### 9.4 Corporate header

```
[Nexbaron PRIVATE LIMITED]  Corporate Home | Nexbaron Digital | Nexbaron Print | About Group | Contact   [Digital Portal] [Print Portal]
```

- Keep the two portal pills (teal/amber) — this is the _gateway_ page header, so direct division access is correct here.
- Drop links to legacy pages (`/services`, `/industries`, `/projects`, `/compliance`, `/downloads`).

### 9.5 Footers

- Division footers: brand blurb, services, industries/products, contact, and the muted "Other division" card (already present — keep). Remove broken `/privacy`/`/terms` links until pages exist, then re-add.
- Footer legal row must link to real pages only (issue #5).

---

## 10. SEO Strategy

### 10.1 Architecture & indexing

- Every page has unique, division-scoped metadata (title, description, OG, Twitter, canonical). Build a metadata helper to kill duplication.
- **Corporate `layout.tsx` metadata must be rewritten first** (issue #1): default title → _"Nexbaron Private Limited \| Digital & Print Solutions"_, description reflecting the two divisions. JSON-LD `Organization` updated with both division URLs.
- **Sitemap** (`app/sitemap.ts`): enumerate every route including `/digital`, `/print`, `/print/quote`, division sub-pages (issue #6). Priority: division landings 0.9, quote builder 0.9, sub-pages 0.7, corporate 0.8, legal 0.3. Consider two sitemap sections or one unified sitemap with clear priorities — unified is sufficient at this scale.
- `robots.txt`: allow all except `/api/` (keep).
- Division pages carry their own `ProfessionalService`/`LocalBusiness` JSON-LD; print product pages carry `Product` + `Offer`; FAQ blocks use `FAQPage`.

### 10.2 Keyword strategy

**Digital (priority city × service pairs):** `{business} website design [city]`, `local SEO agency [city]`, `Google Business Profile optimization`, `WhatsApp Business integration`, `AI chatbot for restaurants/clinics`, `landing page design for [industry]`, `website maintenance for small business`.

**Print (high-intent transactional):** `visiting cards printing [city]`, `brochure printing near me`, `flex banner printing`, `acrylic sign board manufacturer`, `office signage [city]`, `exhibition stall design`, `bulk flyer printing`.

**Corporate:** `Nexbaron Private Limited` (brand), `Nexbaron Digital`, `Nexbaron Print`.

### 10.3 On-page mechanics

- One H1 per page; division keyword in H1 and title; eyebrow label + descriptive H2s.
- Descriptive, keyword-bearing URLs (already good).
- Descriptive `alt` on all imagery (placeholder/Unsplash currently — replace with real brand-consistent imagery, alt text first).
- **No index-follow cross-division confusion:** cross-division micro-links are `rel="nofollow"` or excluded from being treated as navigational signals, so Google sees Digital and Print as independent topical entities. (Technical detail for the SEO specialist to validate; recommended default: keep them follow but ensure anchor text is division-neutral.)
- Structured data: `Organization` (corporate), `ProfessionalService` (Digital), `LocalBusiness`/`Store` (Print), `BreadcrumbList` on all depth pages, `FAQPage` on services/products pages, `Product` on print catalog pages.

### 10.4 Content & trust

- Verify every displayed metric before launch (e.g. "150+ websites," "500,000+ cards printed," "99.9% uptime," "24-hour express"). Undersell rather than risk a false claim.
- Launch with 3+ genuine testimonials per division (replace the current generic placeholders in `partner-testimonials.tsx` with division-specific, honest ones).
- P1: 4–6 blog/resource articles per division ("How to rank #1 on Google Maps," "Which paper stock should your brand use?") to earn topical authority.
- P2: city landing pages driven by real service areas.

### 10.5 Technical SEO / performance

- Static generation (SSG) everywhere possible; division pages are static — keep them static.
- Core Web Vitals targets (LCP ≤ 2.5s, CLS ≤ 0.1, INP ≤ 200ms) — currently achievable given the static, lightweight stack.
- Preconnect already present for Pixabay CDN; replace external imagery with optimized local assets (compressed WebP/AVIF, `next/image`) to control LCP.
- Add `generator` no; add OG images per division (teal-themed for Digital, amber-themed for Print).

---

## 11. Lead Generation Strategy

### 11.1 Principle: two independent lead funnels, never mixed

Each division owns a separate funnel with separate contact identity (WhatsApp number, phone, email), because a mixed funnel corrupts attribution and confuses reps.

### 11.2 Digital funnel

| Stage   | Asset                                         | Detail                                                                                                                                                       |
| ------- | --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Capture | **WhatsApp deep-link** (primary)              | `https://wa.me/<DigitalNumber>?text=<prefilled>` — prefilled messages per context ("free growth audit", "service inquiry"). **Fix phone number (issue #2).** |
| Capture | **Digital contact form** (`/digital/contact`) | Name, business type, city, goal (dropdown), phone, WhatsApp-ok checkbox. Zod-validated; posts to `/api/contact` with a `division=digital` field.             |
| Capture | **Free Audit CTA**                            | "Get a free video audit within 2 hours" — hero + CTA banner.                                                                                                 |
| Nurture | Email capture on `/digital/resources` (P2)    | Newsletter for growth content.                                                                                                                               |
| Routing | `division` + `utm_*` fields                   | Stored on every lead; CRM routes to Digital team.                                                                                                            |

### 11.3 Print funnel

| Stage   | Asset                                      | Detail                                                                                                                                                               |
| ------- | ------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Capture | **Instant Quote Builder** (primary)        | Exists (`/print/quote`). Enhance: capture name/phone/company before/at confirm step (currently jumps straight to WhatsApp with no contact details captured on-site). |
| Capture | **Bulk-order form** (`/print/bulk-orders`) | Company, requirement, quantity, deadline, delivery pincode.                                                                                                          |
| Capture | **Call / WhatsApp**                        | Dedicated Print number, displayed in header/footer/CTA banner.                                                                                                       |
| Routing | `division=print` + `utm_*`                 | Stored on leads; CRM routes to Print team.                                                                                                                           |

### 11.4 Cross-cutting lead infrastructure

- **UTM capture** on every landing URL → persisted in sessionStorage → injected into WhatsApp prefill and hidden form fields. Enables paid-search measurement (Ads → WhatsApp is currently unmeasurable).
- **Analytics:** GA4 events for `wa_click`, `form_submit`, `quote_builder_complete`, `quote_confirm`. Tag the WhatsApp links with `data-` attributes for GTM.
- **Conversion tracking:** Google Ads conversion tags for `wa_click`/`form_submit` per division (separate actions for Digital vs Print so budgets optimize independently).
- **CRM/backend:** `/api/contact` must accept a `division` enum and a stable `leadSource`; configure `NEXT_PUBLIC_API_URL` for production (issue #7). Failure → graceful client-side fallback (mailto/WhatsApp) so no lead is lost.
- **Two phone/email identities** (Digital vs Print) — never one shared "info@" box that creates confusion.

---

## 12. Conversion Strategy (CRO)

### 12.1 Funnel framing

Both divisions follow: **Promise (hero) → Proof (metrics/testimonials) → Offer (service/product) → Action (WhatsApp/quote)**. One primary CTA per viewport, repeated at the three decision points (hero, mid, end).

### 12.2 Digital conversion tactics

- **Hero:** outcome headline + WhatsApp button (primary, emerald/teal) + secondary "Explore services." Trust strip under CTA (rank #1, 24/7, uptime).
- **Services grid:** each card's "Inquire About Service" → WhatsApp deep-link **with prefilled service name** (currently generic prefill — issue).
- **Industry section:** per-industry micro-CTAs ("Get a clinic website audit") so visitors self-identify and convert on relevance.
- **End-of-page CTA banner:** free audit pitch (exists) — add deadline/urgency framing ("within 2 hours").
- **Sticky mobile bar (P1):** "WhatsApp Us" floating button on mobile after 30% scroll — the highest-impact CRO lever for a WhatsApp-native audience.
- **Form length:** ≥7 fields only on `/digital/contact`; every other surface is WhatsApp-first.

### 12.3 Print conversion tactics

- **Quote Builder is the conversion engine.** Reduce clicks: default sensible values, show estimated price live (exists), add **contact capture step** before WhatsApp confirm, add trust line ("Express 24-hour turnaround").
- **Product cards → "Configure Dimensions & Quantity"** → quote pre-filled with that product (currently generic).
- **Bulk pricing** teaser on `/print` for Imran-type buyers.
- **Turnaround & delivery proof** near every CTA (24h express, quality match guarantee).

### 12.4 Trust & objection handling

- Testimonials (real, division-specific), metrics (verified), guarantees ("quality match" / "within 2 hours").
- FAQ on services/product pages answering price, turnaround, process, revisions.
- Visible contact redundancy: WhatsApp + phone + form (failsafe if one channel fails).

### 12.5 Experiment roadmap (CRO)

| Experiment | Hypothesis                                      | Measure                       |
| ---------- | ----------------------------------------------- | ----------------------------- |
| E1         | Hero CTA color vs. neutral                      | `wa_click` CTR                |
| E2         | WhatsApp-first hero vs. form-first              | `wa_click` / form submit rate |
| E3         | Quote builder: add contact step before WhatsApp | Lead capture rate vs. abandon |
| E4         | Sticky mobile WhatsApp bar on/off               | Mobile `wa_click` lift        |
| E5         | Testimonial placement (hero vs. mid-page)       | Scroll depth → conversion     |

Instrument with GA4 + GTM now so experiments can run post-launch without re-tagging.

---

## 13. User Journeys

### J1 — Digital from Google Ads (primary money path)

`Ad (WhatsApp Growth Audit) → /digital` → hero value + trust strip → WhatsApp deep-link (prefilled "free growth audit", UTM captured) → conversation with Digital rep → sale.
**Isolation check:** no Print content in hero/nav/CTAs at any point.

### J2 — Digital from organic search

`Search "restaurant website design [city]" → /digital#services` or `/digital/industries` → industry card → WhatsApp prefilled with industry+service → audit → sale.

### J3 — Print from search (primary money path)

`Search "visiting cards printing near me" → /print` or `/print/products/visiting-cards` → Quote Builder (product pre-selected) → contact capture → WhatsApp confirm → order.
**Isolation check:** no Digital CTAs in path.

### J4 — Print bulk buyer

`Search "flex banner printing near me" → /print` → `/print/bulk-orders` → bulk form → WhatsApp/phone → quote → order.

### J5 — Corporate gateway

`nexbaron.com → /` → dual split-cards → selects Digital or Print portal → continues in that division. Optionally `/about` for group trust.

### J6 — Returning client (support)

`/digital` or `/print` footer → contact (dedicated number) → support.

---

## 14. Technical Architecture & Future Scalability

### 14.1 Stack (unchanged)

Next.js 14 App Router (SSG-first), TypeScript, Tailwind CSS 3, Framer Motion, Radix UI primitives, react-hook-form + Zod, lucide-react icons. Node/Vercel/VPS deploy (per README).

### 14.2 Architecture principles

- **Static by default.** All marketing pages are static; only interaction components are client-side. Keeps CWV excellent and CDN-friendly.
- **Data-driven content.** Services, industries, products, testimonials, and nav config live in typed data modules (`lib/data/*` or `content/*`), not inline in pages. Pages render from data → adding a product/industry is a data change, not a page change. (Refactor: move the inline arrays in `digital/page.tsx`, `print/page.tsx`, nav/footer components into shared data modules.)
- **Division config object.** One `lib/divisions.ts` exporting `{ digital, print }` configs (name, slug, accent classes, WhatsApp number, nav, footer links, phone, email). Navigation/Footer read from it — removing the three hard-coded nav arrays.
- **Accent theming via variant + token, not repetition.** `Button` gains `accent="digital" | "print"` variants; new shared primitives accept an accent prop (see §15).
- **API surface** stays minimal (`/api/contact`) with `division` enum; future `/api/quote` if the builder needs server-side pricing.

### 14.3 Scalability roadmap

| Phase                 | Scope                                                                                                                                                                                     |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **P0 (this project)** | Correct positioning, fix blockers, division sub-pages, isolation, SEO, lead infra.                                                                                                        |
| **P1**                | `/digital/portfolio`, `/digital/resources` (blog), sticky mobile WhatsApp bar, quote-builder contact capture, city landing pages (first 3 cities), OG images, real imagery.               |
| **P2**                | E-commerce for print (cart + payment), customer order tracking portal, multi-city programmatic pages, Hindi locale (i18n), A/B testing enabled.                                           |
| **P3**                | If divisions outgrow one repo: split deploys while sharing a `@nexbaron/ui` design-system package; WhatsApp Business API automation (conversation → CRM → proposal); CRM/backend scaling. |

---

## 15. Component Reuse Strategy

### 15.1 Strategy: "shared primitives + division flavor"

One set of primitives; division identity injected via an **accent config**, never by duplicating components. This keeps the two divisions visually cohesive (same premium system) yet clearly distinct (teal vs amber), with near-zero duplicated UI code.

### 15.2 Shared primitives to build (thin wrappers over existing patterns)

| Primitive             | Replaces / uses                                                            | Accent-aware? |
| --------------------- | -------------------------------------------------------------------------- | ------------- |
| `SectionShell`        | container + py padding + ambient glow                                      | accent        |
| `SectionHeading`      | eyebrow pill + title + subtitle                                            | accent        |
| `EyebrowBadge`        | the `text-xs uppercase font-mono tracking-widest` pill                     | accent        |
| `ServiceCard`         | card pattern from `digital/page.tsx`/`print/page.tsx`                      | accent        |
| `IndustryCard`        | pattern from `digital/page.tsx` industries                                 | accent        |
| `ProductCard`         | pattern from `print/page.tsx` catalog                                      | accent        |
| `CTABanner`           | gradient CTA band                                                          | accent        |
| `MetricGrid`          | `components/landing/metrics-counter.tsx` (reuse counter)                   | accent        |
| `TestimonialCarousel` | `components/landing/partner-testimonials.tsx` pattern                      | accent        |
| `FaqAccordion`        | new (Radix Collapsible)                                                    | accent        |
| `ContactCtaBar`       | WhatsApp + phone + form hybrid                                             | accent        |
| `WhatsAppLink`        | **single source of truth for `wa.me` links** — fixes issue #2 in one place | n/a           |

### 15.3 Reuse inventory (existing assets to keep using)

- `SectionReveal`, `GlobalMeshBackground`, `AnimatedMeshBackground` (motion layer) — reuse everywhere.
- `Button` + new accent variants; `Input`, `Textarea`, `Label`.
- `navigation.tsx`/`footer.tsx` routers + `usePathname` division detection.
- `use-reduced-motion` hook.

### 15.4 Refactor rules

- No component larger than ~150 lines; data stays out of components.
- Accent comes from a prop or division config — **never** a hard-coded hue inside a shared component.
- Shared components render **both** divisions; a shared component may not import division-specific data.

---

## 16. Folder Structure Strategy

### 16.1 Target structure (evolution, not revolution)

```
app/
  layout.tsx                      # rewrite corporate metadata (issue #1)
  globals.css                     # + accent tokens (additive)
  page.tsx                        # corporate gateway (keep, polish copy)
  about/page.tsx                  # rework
  contact/page.tsx                # corporate contact (keep)
  privacy/page.tsx                # NEW
  terms/page.tsx                  # NEW
  sitemap.ts                      # expand (issue #6)
  robots.ts
  digital/
    page.tsx
    services/page.tsx             # NEW
    industries/page.tsx           # NEW
    automation/page.tsx           # NEW
    contact/page.tsx              # NEW
  print/
    page.tsx
    quote/page.tsx                # keep, add contact capture
    products/page.tsx             # NEW hub
    products/visiting-cards/page.tsx
    products/collaterals/page.tsx
    products/signage/page.tsx
    products/office-branding/page.tsx
    products/exhibitions/page.tsx
    specifications/page.tsx       # NEW
    bulk-orders/page.tsx          # NEW
  api/contact/route.ts            # add division enum, env URL

components/
  ui/        # primitives (add accent variants to Button)
  motion/    # unchanged
  landing/   # refactor to accent-aware shared sections

features/
  navigation/  # keep routers; drive data from lib/divisions.ts
  footer/      # keep routers; drive data from lib/divisions.ts
  contact/     # keep form; add division field
  digital/     # division-scoped widgets (new)
  print/       # division-scoped widgets (new)

lib/
  divisions.ts        # NEW: single source of division config (incl. WhatsApp numbers)
  seo.ts              # NEW: metadata builder per page
  utils.ts
lib/data/
  digital-services.ts # NEW: move arrays out of page.tsx
  digital-industries.ts
  print-products.ts
  testimonials.ts     # division-scoped, real
  metrics.ts
```

### 16.2 Rules

- **Route = page; content = data.** Keep `lib/data/*` as the content layer (type-safe, `satisfies` typed arrays).
- **Division-boundaries in the folder structure.** Anything Digital-only lives under `app/digital`, `features/digital`, or `lib/data/digital-*`. Print likewise. Shared UI lives in `components/`/`features/shared`-equivalent.
- **No `src/` migration** — keep the existing root-level `app/` convention to minimize churn and diff noise.
- Naming: PascalCase for components, kebab-case for routes/files, typed exports everywhere.

---

## 17. Requirements — Phase P0 (Definition of Done)

### 17.1 Content & positioning

- [ ] Corporate metadata rewritten (title/description/OG/Twitter/JSON-LD) to two-division positioning.
- [ ] `/about` reworked to corporate group story.
- [ ] Legacy infra pages (`/services`, `/industries`, `/projects`, `/downloads`, `/compliance`) removed with 301s.
- [ ] `/privacy` and `/terms` created and linked.
- [ ] Division copy audit: every division page speaks only about itself; no cross-marketing.

### 17.2 Routing & pages

- [ ] All nav-referenced pages exist: `/digital/services`, `/digital/industries`, `/digital/automation`, `/digital/contact`; `/print/products/{5}`, `/print/specifications`, `/print/bulk-orders`.
- [ ] Division isolation verified: Digital pages expose Print only via muted micro-link + footer card; Print mirrored.
- [ ] Every internal link resolves; no 404s reachable from nav/footer/body.

### 17.3 Lead generation & conversion

- [ ] All `wa.me` links include real division phone numbers with context-aware prefilled text.
- [ ] UTM capture + GA4 events (`wa_click`, `form_submit`, `quote_builder_complete`, `quote_confirm`).
- [ ] `/api/contact` accepts `division`; production `NEXT_PUBLIC_API_URL` configured; graceful failure fallback.
- [ ] Quote Builder captures contact before WhatsApp confirm.
- [ ] Verified metrics and real testimonials per division (no unverified claims).

### 17.4 SEO & performance

- [ ] Sitemap includes all routes with sensible priorities; robots valid.
- [ ] Per-page metadata + canonical; division JSON-LD; BreadcrumbList; FAQPage where applicable.
- [ ] CWV within targets on all templates; Lighthouse ≥ 90 perf.
- [ ] OG images per division (teal/amber themed).

---

## 18. Risks & Mitigations

| Risk                                  | Impact                                     | Mitigation                                                          |
| ------------------------------------- | ------------------------------------------ | ------------------------------------------------------------------- |
| Metrics/testimonials are unverifiable | Trust damage, legal exposure               | Validate before launch; undersell; replace placeholders             |
| WhatsApp number not ready             | All primary CTAs dead                      | Number as config value in `lib/divisions.ts`; gate launch on it     |
| Backend API not live                  | Form leads lost                            | Fallback path (mailto/WhatsApp) + clear error UX                    |
| Scope creep into visual redesign      | Violates mandate                           | Freeze-list (§7.3); review gate on any visual change                |
| Cross-division ad confusion           | Wasted ad spend, bad landing quality score | Isolated landing pages; no cross-CTAs; separate conversion actions  |
| Legacy content leftover in codebase   | Stale brand exposure                       | 301 + delete from nav/footer; archive route cleanup in PR checklist |

---

## 19. Open Questions (for stakeholders)

1. Confirm **dedicated WhatsApp/phone numbers** for Digital and Print (blocker for issue #2).
2. Confirm production **backend API URL** for `/api/contact` (blocker for form).
3. Verify **claims/metrics** ("150+ websites", "500,000+ cards", "99.9% uptime", "24h express").
4. Keep or remove `/careers` (is hiring real?).
5. Primary service cities for the first city-landing-page batch (SEO P1).
6. Do we keep the muted in-header cross-division micro-link, or footer-only? (Recommended: keep micro-link, remove styled pill/CTA.)
7. Confirm `rel="nofollow"` policy on cross-division links with the SEO specialist.

---

_End of PRD. Next step: convert to engineering tickets; implementation preserves the existing design system per §7 and follows the P0 checklist in §17._
