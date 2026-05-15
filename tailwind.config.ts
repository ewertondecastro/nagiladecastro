import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FAF4EA",
        "background-soft": "#F2E8D8",
        "text-primary": "#2C1F15",
        "text-secondary": "#6B5A4A",
        "text-muted": "#9C8A78",
        "gold-accent": "#C9924E",
        "gold-button": "#A77535",
        "rose-accent": "#B97A6B",
        "rose-soft": "#E4C7BE",
        "cream-line": "#E5D7C0",
      },
      fontFamily: {
        playfair: ["var(--font-playfair)", "Georgia", "serif"],
        barlow: ["var(--font-barlow)", "sans-serif"],
        "barlow-condensed": ["var(--font-barlow-condensed)", "sans-serif"],
      },
      fontSize: {
        "10xl": ["10rem", { lineHeight: "1" }],
        "11xl": ["12rem", { lineHeight: "1" }],
      },
    },
  },
  plugins: [],
};
export default config;
