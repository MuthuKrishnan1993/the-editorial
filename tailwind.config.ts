import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // shadcn/ui CSS variable colors
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground, 0 0% 100%))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // THE EDITORIAL brand colors
        "editorial-surface": "#fff4f3",
        "editorial-surface-dim": "#ffc7c1",
        "editorial-surface-container": "#ffe2de",
        "editorial-surface-low": "#ffedeb",
        "editorial-surface-high": "#ffdad6",
        "editorial-surface-highest": "#ffd3ce",
        "editorial-primary": "#a03a0f",
        "editorial-primary-container": "#fe7e4f",
        "editorial-primary-dim": "#902e02",
        "editorial-secondary": "#a03833",
        "editorial-secondary-container": "#ffc3bd",
        "editorial-tertiary": "#863c96",
        "editorial-on-surface": "#4e211e",
        "editorial-on-surface-variant": "#834d48",
        "editorial-on-primary": "#ffefeb",
        "editorial-outline": "#a36761",
        "editorial-outline-variant": "#e09c95",
        "editorial-inverse-surface": "#240303",
        "editorial-error": "#b31b25",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        headline: ["Manrope", "sans-serif"],
        body: ["Inter", "sans-serif"],
        label: ["Inter", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xl: "0.75rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
        full: "9999px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
