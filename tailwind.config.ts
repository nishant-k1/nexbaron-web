import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class", '[data-theme="dark"]'],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./features/**/*.{js,ts,jsx,tsx,mdx}",
    "./theme/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./hooks/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.5rem",
        lg: "2rem",
      },
    },
    extend: {
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        surface: "var(--color-neutral-surface)",
        "neutral-bg": "var(--color-neutral-bg)",
        "neutral-surface": "var(--color-neutral-surface)",
        border: "var(--color-border)",
        muted: "var(--color-muted)",
        heading: "var(--color-heading)",
        body: "var(--color-body)",
      },
      borderRadius: {
        base: "var(--radius-base)",
      },
      fontFamily: {
        heading: "var(--font-heading)",
        body: "var(--font-body)",
      },
      spacing: {
        section: "var(--spacing-section)",
        component: "var(--spacing-component)",
      },
      boxShadow: {
        surface: "var(--shadow-surface)",
        elevated: "var(--shadow-elevated)",
      },
      transitionDuration: {
        motion: "var(--motion-duration)",
      },
      transitionTimingFunction: {
        motion: "var(--motion-easing)",
      },
    },
  },
  plugins: [],
};
export default config;
