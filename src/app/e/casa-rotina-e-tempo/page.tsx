import type { Metadata } from "next";

// Link de download direto do PDF (Google Drive). O arquivo fica no Drive,
// não no repositório, só este botão aponta para ele.
const DOWNLOAD_URL =
  "https://drive.google.com/uc?export=download&id=1UKdY5U3xZQvBUWWeu6a5hEWFvhDmaEnp";

export const metadata: Metadata = {
  title: "Casa, rotina e tempo: seu e-book",
  // Página de entrega: não deve aparecer no Google.
  robots: { index: false, follow: false },
};

export default function EntregaCasaRotinaTempo() {
  return (
    <main className="min-h-screen w-full bg-background flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-lg text-center">
        <span className="font-barlow-condensed text-[11px] tracking-[0.4em] uppercase text-text-secondary">
          Nagila Decastro
        </span>

        <div className="w-10 h-px bg-rose-accent mx-auto my-8" aria-hidden="true" />

        <span className="font-barlow-condensed text-[11px] tracking-[0.3em] uppercase text-rose-accent">
          Seu e-book chegou
        </span>

        <h1
          className="font-playfair leading-tight mt-3 mb-6"
          style={{ fontSize: "clamp(34px, 6vw, 52px)" }}
        >
          <span className="font-bold text-text-primary block">Casa, rotina</span>
          <span className="italic text-rose-accent block">e tempo</span>
        </h1>

        <p
          className="font-barlow text-text-secondary leading-relaxed mb-10 max-w-md mx-auto"
          style={{ fontSize: "clamp(17px, 1.4vw, 20px)" }}
        >
          Obrigada pela sua confiança. São 25 páginas pra você desenhar uma
          rotina de casa que sustenta o resto: sono, educação, casamento, fé.
          Leia em uma noite, aplique na semana.
        </p>

        <a
          href={DOWNLOAD_URL}
          className="inline-block font-barlow-condensed text-sm tracking-widest uppercase px-10 py-4 bg-rose-accent text-background font-semibold hover:bg-text-primary transition-colors duration-200"
        >
          Baixar o e-book (PDF)
        </a>

        <p className="font-barlow text-[14px] text-text-muted leading-relaxed mt-8 max-w-sm mx-auto">
          Guarde este link com carinho, ele é só seu. Qualquer problema com o
          download, é só me chamar no WhatsApp.
        </p>
      </div>
    </main>
  );
}
