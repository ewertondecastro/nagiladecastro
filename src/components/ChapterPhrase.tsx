import FadeIn from "./FadeIn";

interface Props {
  text: string;
  // Variante em fundo escuro (verde-oliva) para respiros mais dramáticos.
  dark?: boolean;
}

// Respiro editorial entre seções: uma frase grande em Lora itálico, sem imagem
// nem botão, funcionando como "capítulo" da narrativa (referência Typeform,
// adaptado à identidade calma e terrosa da marca).
export default function ChapterPhrase({ text, dark = false }: Props) {
  const body = (
    <FadeIn className="max-w-4xl mx-auto text-center flex flex-col items-center">
      <img src="/images/brand/star-mark.png" alt="" aria-hidden="true" className="w-6 h-6 mb-8" />
      <p
        className={`font-playfair italic leading-[1.15] ${dark ? "text-background" : "text-text-primary"}`}
        style={{ fontSize: "clamp(28px, 4.5vw, 54px)" }}
      >
        {text}
      </p>
    </FadeIn>
  );

  return (
    <section
      className={`w-full px-8 md:px-16 lg:px-20 py-24 md:py-36 ${dark ? "bg-olive" : "bg-background"}`}
    >
      {body}
    </section>
  );
}
