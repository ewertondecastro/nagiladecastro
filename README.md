# Nagila Decastro — Site

Landing page de marca pessoal da Nagila Decastro. Mesma stack do site do Ewerton (Next.js 14 + Tailwind + Framer Motion), com locales PT (default), EN e ES.

## Stack

- Next.js 14 App Router (static export)
- TypeScript
- Tailwind CSS
- Framer Motion
- Node 20 (via nvm)

## Rodando localmente

```bash
nvm use 20
npm install
npm run dev      # http://localhost:3000
npm run build    # static export em ./out
```

## Estrutura

```
src/
├── app/
│   ├── layout.tsx       fontes + html lang
│   ├── page.tsx         locale PT em /
│   ├── en/page.tsx      locale EN em /en
│   ├── es/page.tsx      locale ES em /es
│   ├── globals.css      paleta cream + tokens
├── components/          uma seção por arquivo
│   ├── HeroSection.tsx
│   ├── QuoteSection.tsx
│   ├── AboutSection.tsx
│   ├── ServicesSection.tsx
│   ├── InstagramSection.tsx
│   ├── Footer.tsx
│   ├── LanguageSwitcher.tsx
│   └── FadeIn.tsx
├── lib/getDict.ts       carrega o dicionário do locale
├── locales/             pt.json, en.json, es.json
└── types/locale.ts      tipagem do dicionário
```

## Paleta

- `background` `#FAF4EA` creme quente
- `background-soft` `#F2E8D8` creme mais profundo
- `text-primary` `#2C1F15` marrom profundo
- `text-secondary` `#6B5A4A`
- `rose-accent` `#B97A6B` terracota-rosado (destaques)
- `gold-accent` `#C9924E` dourado quente (linhas/secundário)

Fontes: Playfair Display (display), Barlow + Barlow Condensed.

## Imagens

Substitua os arquivos em `public/images/`:

- `hero.jpg` — retrato principal (4:5)
- `about.jpg` — foto secundária da seção Sobre (4:5)

## Editando textos

Toda a copy vive em `src/locales/{pt,en,es}.json`. Mude lá e a UI atualiza nos três idiomas.

## Deploy no Netlify

`netlify.toml` já configurado. Basta conectar o repositório a um site no Netlify.
