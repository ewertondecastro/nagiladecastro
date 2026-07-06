# Captura de leads — configuração

Fluxo: o site abre um formulário (Nome, E-mail, Cidade, Estado, País) antes de
qualquer material marcado como `gated`. Ao enviar, os dados vão para um **Google
Apps Script**, que **grava numa planilha** e **manda um e-mail** de aviso. Só
então o download é liberado.

## 1. Publicar o Apps Script

Siga os passos no topo de [`Code.gs`](./Code.gs). Ao final você terá uma **URL
que termina em `/exec`**.

## 2. Conectar o site à URL

Escolha **uma** das opções:

**Opção A — colar no código (mais simples)**
Em `src/lib/leadCapture.ts`, cole a URL em `FALLBACK_ENDPOINT`:

```ts
const FALLBACK_ENDPOINT = "https://script.google.com/macros/s/AKfy.../exec";
```

**Opção B — variável de ambiente no Netlify (recomendado)**
Site settings > Environment variables > `NEXT_PUBLIC_LEAD_ENDPOINT` = a URL `/exec`.
Depois refaça o deploy. A env tem prioridade sobre o `FALLBACK_ENDPOINT`.

## 3. Para onde vão os leads

- **Planilha:** aba `Leads`, criada automaticamente no primeiro envio.
- **E-mail:** definido em `NOTIFY_EMAIL` no topo do `Code.gs`
  (hoje `nagiladecastro@icloud.com`; troque ou adicione outros separados por vírgula).

## Como marcar um material como "gated"

Nos `src/locales/{pt,en,es}.json`, cada item de `products.items` aceita
`"gated": true`. Com `true`, o botão abre o formulário antes de entregar.
Hoje o guia gratuito está `gated` e o e-book vai direto pro WhatsApp.

## Observações

- Enquanto a URL não estiver configurada, o formulário ainda aparece e o
  download acontece, mas o lead **não é gravado** (aviso no console do navegador).
- O envio usa `mode: "no-cors"`, então o site não lê a resposta do script —
  ele assume sucesso e entrega o material. Confira a planilha para validar.
