import type { Metadata } from "next";

// Link direto do PDF (nome secreto). Esta página é a entrega "bonita"
// para mandar no WhatsApp. É noindex e não fica linkada no site, então
// o formulário da seção Recursos continua obrigatório para quem chega
// pelo site.
const DOWNLOAD_URL =
  "https://nagiladecastro.netlify.app/guides/dl-71c61bf8c3f36a188763.pdf";
const DOWNLOAD_FILENAME = "Cartoes-de-Portugues-para-os-Pequenos.pdf";

export const metadata: Metadata = {
  title: "Cartões de Português para os Pequenos",
  robots: { index: false, follow: false },
};

export default function EntregaCartoes() {
  return (
    <main className="min-h-screen w-full bg-background flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-lg text-center">
        <span className="font-barlow-condensed text-[11px] tracking-[0.4em] uppercase text-text-secondary">
          Nagila Decastro
        </span>

        <div className="w-10 h-px bg-rose-accent mx-auto my-8" aria-hidden="true" />

        <span className="font-barlow-condensed text-[11px] tracking-[0.3em] uppercase text-rose-accent">
          Seu presente chegou
        </span>

        <h1
          className="font-playfair leading-tight mt-3 mb-6"
          style={{ fontSize: "clamp(30px, 5.5vw, 48px)" }}
        >
          <span className="font-bold text-text-primary block">Cartões de Português</span>
          <span className="italic text-rose-accent block">para os Pequenos</span>
        </h1>

        <p
          className="font-barlow text-text-secondary leading-relaxed mb-10 max-w-md mx-auto"
          style={{ fontSize: "clamp(15px, 1.4vw, 17px)" }}
        >
          São 20 cartões ilustrados para imprimir e ensinar as primeiras noções
          de português: substantivo, verbo, frase, pontuação, acentuação e
          sílaba tônica. Feito para brincar e aprender junto.
        </p>

        <a
          href={DOWNLOAD_URL}
          download={DOWNLOAD_FILENAME}
          className="inline-block font-barlow-condensed text-sm tracking-widest uppercase px-10 py-4 bg-rose-accent text-background font-semibold hover:bg-text-primary transition-colors duration-200"
        >
          Baixar os cartões (PDF)
        </a>

        <p className="font-barlow text-[13px] text-text-muted leading-relaxed mt-8 max-w-sm mx-auto">
          Imprima em papel comum ou um pouco mais grosso, recorte e brinque.
          Qualquer dúvida, é só me chamar no WhatsApp.
        </p>
      </div>
    </main>
  );
}
