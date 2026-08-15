import FadeIn from "./FadeIn";
import type { LocaleDict } from "@/types/locale";

interface Props {
  dict: LocaleDict;
}

export default function QuoteSection({ dict }: Props) {
  const { quote } = dict;

  // Faixa sólida em oliva, no mesmo padrão do rodapé e da frase-capítulo.
  // A foto em parallax que ficava atrás como marca d'água foi removida:
  // sobre fundo sólido ela não apareceria e só pesaria no carregamento.
  return (
    <section className="relative w-full overflow-hidden py-32 md:py-48 px-8 md:px-16 lg:px-20 bg-olive">
      <FadeIn className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center gap-7">
        <div className="w-12 h-px bg-terracotta" aria-hidden="true" />
        <blockquote
          className="font-playfair italic text-background leading-tight text-balance"
          style={{ fontSize: "clamp(26px, 3.2vw, 44px)" }}
        >
          &ldquo;{quote.text}&rdquo;
        </blockquote>
        <p className="font-barlow-condensed text-[11px] tracking-[0.3em] text-background/70 uppercase">
          {quote.attribution}
        </p>
      </FadeIn>
    </section>
  );
}
