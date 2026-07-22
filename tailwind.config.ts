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
        // Identidade "Argila & Sálvia"
        background: "#F4EFE6", // Creme Quente (acolhimento)
        "background-soft": "#ECE6D8", // creme mais fundo p/ alternância suave
        "text-primary": "#2D241E", // Marrom Escuro (leitura, substitui preto)
        "text-secondary": "#5F564A",
        "text-muted": "#948A7C",
        // Verde Oliva Profundo (autoridade / estrutura)
        olive: "#3B4A3D",
        "olive-soft": "#E4E7DE",
        // Terracota (calor / acento / ação)
        terracotta: "#B85C38",
        "terracotta-soft": "#EAD6CC",
        // Sálvia (apoio)
        sage: "#A3B19B",
        "sage-soft": "#DCE1D4",
        "cream-line": "#DED8C7",
        // aliases de compatibilidade (não use em código novo)
        "rose-accent": "#B85C38",
        "rose-soft": "#DCE1D4",
      },
      fontFamily: {
        // classes mantidas, fontes trocadas por trás: Lora (títulos) + Lato (texto)
        playfair: ["var(--font-playfair)", "Georgia", "serif"],
        barlow: ["var(--font-barlow)", "system-ui", "sans-serif"],
        "barlow-condensed": ["var(--font-barlow)", "system-ui", "sans-serif"],
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
