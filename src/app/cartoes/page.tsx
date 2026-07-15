import type { Metadata } from "next";
import { getDict } from "@/lib/getDict";
import CartoesDelivery from "./CartoesDelivery";

export const metadata: Metadata = {
  title: "Cartões de Português para os Pequenos",
  robots: { index: false, follow: false },
};

export default async function EntregaCartoes() {
  const dict = await getDict("pt");

  return (
    <main className="min-h-screen w-full bg-background flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-lg text-center">
        <span className="font-barlow-condensed text-[11px] tracking-[0.4em] uppercase text-text-secondary">
          Nagila Decastro
        </span>

        <div className="w-10 h-px bg-rose-accent mx-auto my-8" aria-hidden="true" />

        <span className="font-barlow-condensed text-[11px] tracking-[0.3em] uppercase text-rose-accent">
          Material gratuito
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
          sílaba tônica. Preencha abaixo e receba o PDF na hora.
        </p>

        <CartoesDelivery leadForm={dict.leadForm} />

        <p className="font-barlow text-[13px] text-text-muted leading-relaxed mt-8 max-w-sm mx-auto">
          Imprima em papel comum ou um pouco mais grosso, recorte e plastifique.
          Qualquer dúvida, é só me chamar no WhatsApp.
        </p>
      </div>
    </main>
  );
}
