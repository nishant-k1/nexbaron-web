# Nexbaron Web

Frontend application for Nexbaron Services Private Limited built with Next.js 14+, TypeScript, and TailwindCSS.

## Features

- ✅ Next.js 14+ App Router
- ✅ TypeScript
- ✅ TailwindCSS with centralized theme system
- ✅ Dark mode support
- ✅ Framer Motion animations
- ✅ React Hook Form + Zod validation
- ✅ SEO optimized (metadata, JSON-LD, sitemap)
- ✅ Accessibility features (WCAG AA)
- ✅ Performance optimized

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Copy environment variables:
```bash
cp .env.example .env
```

3. Update `.env` with your configuration.

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
nexbaron-web/
├── app/                    # Next.js App Router pages
├── components/             # Reusable UI components
├── features/              # Feature-based modules
├── theme/                 # Theme system
├── lib/                   # Utilities
└── hooks/                 # Custom React hooks
```

## Build

```bash
npm run build
npm start
```

## Deployment

The application is optimized for deployment on Vercel or any VPS with Node.js support.

